import "./ProfileDrawer.css";
import {
    FiX,
    FiUser,
    FiMail,
    FiShield,
    FiLogOut,
} from "react-icons/fi";

function ProfileDrawer({
    isOpen,
    onClose,
    user = {
        username: "Employee",
        email: "employee@company.com",
        role: "Employee",
    },
}) {
    return (
        <>
            <div
                className={`profile-backdrop ${isOpen ? "show" : ""}`}
                onClick={onClose}
            />

            <aside
                className={`profile-drawer ${isOpen ? "open" : ""}`}
            >

                <div className="profile-header">

                    <div>

                        <h2>Profile</h2>

                        <p>Your Archer account</p>

                    </div>

                    <button
                        className="profile-close"
                        onClick={onClose}
                    >
                        <FiX />
                    </button>

                </div>

                <div className="profile-content">

                    <div className="profile-avatar">

                        <FiUser />

                    </div>

                    <h3>{user.username}</h3>

                    <span className="role-badge">

                        {user.role}

                    </span>

                    <div className="profile-card">

                        <div className="profile-row">

                            <FiMail />

                            <div>

                                <small>Email</small>

                                <p>{user.email}</p>

                            </div>

                        </div>

                        <div className="profile-row">

                            <FiShield />

                            <div>

                                <small>Access Level</small>

                                <p>{user.role}</p>

                            </div>

                        </div>

                    </div>

                    <button className="logout-btn">

                        <FiLogOut />

                        Logout

                    </button>

                </div>

            </aside>

        </>
    );
}

export default ProfileDrawer;