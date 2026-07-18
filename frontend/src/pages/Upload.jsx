import { useState } from "react";
import { uploadPDF } from "../api/api";

function Upload() {
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("");
    const [allowedRoles, setAllowedRoles] = useState("employee");
    

    const handleUpload = async () => {

        if (!file) {
            alert("Please select a PDF.");
            return;
        }

        const data = await uploadPDF(
            file,
            category,
            allowedRoles
        );

        alert(data.message);
    };

    return (
        <div className="p-8 flex flex-col gap-5 max-w-md">

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <select
                value={allowedRoles}
                onChange={(e) => setAllowedRoles(e.target.value)}
            >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="admin,employee">Admin + Employee</option>
            </select>

            <button onClick={handleUpload}>
                Upload PDF
            </button>

        </div>
    );
}

export default Upload;