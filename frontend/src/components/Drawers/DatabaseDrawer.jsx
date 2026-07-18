import "./DatabaseDrawer.css";
import { FiX, FiUpload, FiFileText } from "react-icons/fi";

function DatabaseDrawer({
    isOpen,
    onClose,
    selectedFiles,
    fileInputRef,
    setSelectedFiles,
    handleUpload,
    category,
    setCategory,
    allowedRoles,
    setAllowedRoles,
}) {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`drawer-backdrop ${isOpen ? "show" : ""}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <aside className={`database-drawer ${isOpen ? "open" : ""}`}>

                <div className="drawer-header">

                    <div>
                        <h2>Database</h2>
                        <p>Manage your company documents.</p>
                    </div>

                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        <FiX />
                    </button>

                </div>

                <div className="drawer-content">

                    <label>Category</label>

                    <input
                        type="text"
                        placeholder="e.g. Solar Manuals"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <label>Allowed Roles</label>

                    <select
                        value={allowedRoles}
                        onChange={(e) => setAllowedRoles(e.target.value)}
                    >
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                        <option value="admin,employee">Admin + Employee</option>
                    </select>

                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf"
                        style={{ display: "none" }}
                        onChange={(e) =>
                            setSelectedFiles(Array.from(e.target.files))
                        }
                    />

                    <button
                        className="upload-pdf-btn"
                        onClick={() => {
                            if (selectedFiles.length === 0) {
                                fileInputRef.current.click();
                            } else {
                                handleUpload();
                            }
                        }}
                    >
                        <FiUpload />

                        {selectedFiles.length === 0
                            ? "Upload PDFs"
                            : "Process Documents"}
                    </button>

                    <div className="uploaded-files">

                        <h3>Selected Files</h3>

                        {selectedFiles.length === 0 ? (

                            <div className="empty-files">
                                No files selected.
                            </div>

                        ) : (

                            selectedFiles.map((file, index) => (

                                <div
                                    className="file-item"
                                    key={index}
                                >
                                    <FiFileText />

                                    <span>{file.name}</span>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </aside>
        </>
    );
}

export default DatabaseDrawer;