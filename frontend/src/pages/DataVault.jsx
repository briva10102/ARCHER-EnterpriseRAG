import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../styles/DataVault.css";

import { uploadPDF } from "../api/api";
import FloatingFooter from "../components/Footer/FloatingFooter";

function DataVault() {

    const navigate = useNavigate();

    const [category, setCategory] = useState("");

    const [allowedRole, setAllowedRole] = useState("employee");

    const [files, setFiles] = useState([]);

    const [uploading, setUploading] = useState(false);

    

    return (

        <div className="vault-page">

            <header className="vault-header">

                <button
                    className="back-btn"
                    onClick={() => navigate("/chat")}
                >
                    ← Workspace
                </button>

                <h1>DATA VAULT</h1>

            </header>


            <section className="vault-top">

                {/* Profile */}

                <div className="vault-card profile-card">

                    <h2>Profile</h2>

                    <div className="profile-avatar">

                        A

                    </div>

                    <h3>Administrator</h3>

                    <p>ARCHER Workspace</p>

                    <div className="profile-info">

                        <span>Username</span>

                        <strong>Current User</strong>

                    </div>

                    <div className="profile-info">

                        <span>Role</span>

                        <strong>Admin</strong>

                    </div>

                    <div className="profile-info">

                        <span>Status</span>

                        <strong>Authenticated</strong>

                    </div>

                    <div className="profile-info">

                        <span>Workspace</span>

                        <strong>Assistant</strong>

                    </div>

                </div>


                {/* Documents */}

                <div className="vault-card document-card">

                    <div className="card-header">

                        <h2>Accessible Documents</h2>

                        <input
                            type="text"
                            placeholder="Search documents..."
                        />

                    </div>

                    <div className="document-list">

                        <div className="document-item">

                            <div>

                                <strong>Installation Manual.pdf</strong>

                                <p>Installation</p>

                            </div>

                            <span>Employee</span>

                        </div>

                        <div className="document-item">

                            <div>

                                Warranty_Guide.pdf

                            </div>

                            <span>Employee</span>

                        </div>

                        <div className="document-item">

                            <div>

                                Internal_Pricing.pdf

                            </div>

                            <span>Admin</span>

                        </div>

                        <div className="document-item">

                            <div>

                                Installation_Guide.pdf

                            </div>

                            <span>Employee</span>

                        </div>

                    </div>

                </div>


                {/* Stats */}

                {/* System */}

                <div className="vault-card system-card">

                    <h2>ARCHER System</h2>

                    <div className="system-item">

                        <span>AI Model</span>

                        <strong>Gemini 2.5 Flash</strong>

                    </div>

                    <div className="system-item">

                        <span>Vector Database</span>

                        <strong>ChromaDB</strong>

                    </div>

                    <div className="system-item">

                        <span>Neon Database</span>

                        <strong>PostgreSQL</strong>

                    </div>

                    <div className="system-item">

                        <span>Authentication</span>

                        <strong>JWT</strong>

                    </div>

                    <div className="system-item">

                        <span>Authorization</span>

                        <strong>Role Based Strictly</strong>

                    </div>

                    <div className="system-item">

                        <span>Search Engine</span>

                        <strong>Semantic RAG</strong>

                    </div>

                </div>

            </section>


            <section className="vault-upload">

                <div className="upload-card">

                    <div className="upload-header">

                        <h2>Upload Company Documents</h2>

                        <p>
                            Upload PDF manuals, warranty guides and internal company documents.
                        </p>

                    </div>

                    <div className="upload-form">

                        <div className="form-group">

                            <label>Document Category</label>

                            <input
                                type="text"
                                placeholder="Installation Manuals"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />

                        </div>


                        <div className="form-group">

                            <label>Accessible Role</label>

                            <select
                                value={allowedRole}
                                onChange={(e) => setAllowedRole(e.target.value)}
                            >

                                <option value="employee">
                                    Employee
                                </option>

                                <option value="admin">
                                    Admin
                                </option>

                                <option value="admin,employee">
                                    Admin + Employee
                                </option>

                            </select>

                        </div>


                        <div className="upload-zone">

                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFiles([...e.target.files])}
                            />

                            <h3>Drop PDF here</h3>

                            <p>or click to browse</p>

                        </div>


                        {

                            files.length > 0 &&

                            <div className="selected-files">

                                {

                                    files.map((file, index) => (

                                        <div
                                            key={index}
                                            className="selected-file"
                                        >

                                            📄 {file.name}

                                        </div>

                                    ))

                                }

                            </div>

                        }


                        <button

                            className="upload-button"

                            disabled={uploading}

                            onClick={async () => {

                                if (files.length === 0) {

                                    alert("Choose a PDF");

                                    return;

                                }

                                setUploading(true);

                                try {

                                    for (const file of files) {

                                        await uploadPDF(

                                            file,

                                            category,

                                            allowedRole

                                        );

                                    }

                                    alert("Upload Successful");

                                    setFiles([]);

                                    setCategory("");

                                }

                                catch (err) {

                                    console.log(err);

                                    alert("Upload Failed");

                                }

                                setUploading(false);

                            }}

                        >

                            {

                                uploading

                                    ?

                                    "Uploading..."

                                    :

                                    "Upload Documents"

                            }

                        </button>

                    </div>

                </div>

            </section>
            <FloatingFooter />
        </div>

    );

}

export default DataVault;

