import "./Header.css";
import { FiDatabase, FiUser } from "react-icons/fi";

function Header({ onDatabaseClick, onProfileClick }) {
    return (
        <header className="archer-header">

            <div className="header-left">

                <div className="brand">

                    <div className="brand-line">

                        <div className="arrow-line">

                            <div className="moving-arrow"></div>

                        </div>

                    </div>

                    <span className="tagline">
                        On Target.
                    </span>

                </div>

            </div>

            <div className="header-right">

                <button
                    className="header-btn"
                    onClick={onDatabaseClick}
                >
                    <FiDatabase />
                    <span>Database</span>
                </button>

                <button
                    className="header-btn"
                    onClick={onProfileClick}
                >
                    <FiUser />
                    <span>Profile</span>
                </button>

            </div>

        </header>
    );
}

export default Header;