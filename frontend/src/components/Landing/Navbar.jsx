import { Link } from "react-router-dom";
import Container from "../layout/Container";

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#0F1117]/70 border-b border-[#49494D]">
            <Container className="flex items-center justify-between h-20">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl font-bold text-[#ECEDE1]"
                    style={{ fontFamily: "Red Hat Display" }}
                >
                    ARCHER
                </Link>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-10">

                    <a
                        href="#architecture"
                        className="text-[#BDBDBD] hover:text-[#ECEDE1] transition"
                    >
                        Architecture
                    </a>

                    <a
                        href="#security"
                        className="text-[#BDBDBD] hover:text-[#ECEDE1] transition"
                    >
                        Security
                    </a>

                    <a
                        href="#about"
                        className="text-[#BDBDBD] hover:text-[#ECEDE1] transition"
                    >
                        About
                    </a>

                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4">

                    <Link
                        to="/login"
                        className="text-[#ECEDE1] hover:text-[#C8A951] transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/login"
                        className="bg-[#C8A951] text-black px-5 py-2 rounded-xl font-medium hover:scale-105 transition-all duration-300"
                    >
                        Enter
                    </Link>

                </div>

            </Container>
        </nav>
    );
}

export default Navbar;