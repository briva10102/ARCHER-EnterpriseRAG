import GridScan from "../components/GridScan";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FloatingFooter from "../components/Footer/FloatingFooter";


export default function Landing() {
    return (
        <main className="relative min-h-screen overflow-hidden border-[8px] border-black bg-white">
            {/* Background */}
            <GridScan />

            {/* Floating Navigation */}
            <header className="fixed top-5 left-5 right-5 z-50">
                <div
                    className="
      h-16
      rounded-[22px]
      border border-white/5
      bg-black/12
      backdrop-blur-[28px]
      shadow-[0_20px_60px_rgba(0,0,0,0.22)]
      flex
      items-center
      justify-center
    "
                >
                    <nav className="flex items-center gap-24">
                        <a
                            href="#architecture"
                            className="text-white text-[13px] tracking-[0.35em] uppercase transition duration-300 hover:opacity-70"
                        >
                            Architecture
                        </a>

                        <a
                            href="#about"
                            className="text-white text-[13px] tracking-[0.35em] uppercase transition duration-300 hover:opacity-70"
                        >
                            About
                        </a>

                        <Link
                            to="/login"
                            className="text-white text-[13px] tracking-[0.35em] uppercase transition duration-300 hover:opacity-70"
                        >
                            Login
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
                <div className="relative flex flex-col items-center">

                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                        }}
                        className="
            text-7xl
            font-bold
            tracking-[0.25em]
            text-black
            select-none
            z-20
        "
                    >
                        ARCHER
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 0.25,
                        }}
                        className="mt-6 text-lg text-gray-600"
                    >
                        On Target.
                    </motion.p>

                    {/* Flying Arrow */}

                    <div className="relative mt-10 w-[700px] h-12 overflow-hidden">

                        <motion.div
                            initial={{ x: "-110%" }}
                            animate={{ x: "110%" }}
                            transition={{
                                duration: 3.8,
                                ease: "linear",
                                repeat: Infinity,
                                repeatDelay: 0,
                            }}
                            className="absolute top-1/2 -translate-y-1/2 flex items-center"
                        >
                            {/* Feather */}
                            <div className="relative mr-1">
                                <div className="absolute -top-[5px] left-0 w-3 h-[2px] bg-black rotate-[-35deg]" />
                                <div className="absolute top-[5px] left-0 w-3 h-[2px] bg-black rotate-[35deg]" />
                            </div>

                            {/* Shaft */}
                            <div className="w-80 h-[2px] bg-black" />

                            {/* Arrow Head */}
                            <div
                                className="
            w-0
            h-0
            border-t-[8px]
            border-b-[8px]
            border-l-[18px]
            border-t-transparent
            border-b-transparent
            border-l-black
        "
                            />
                        </motion.div>

                    </div>

                </div>

                <div className="mt-36">
                    <Link to="/login">
                        <motion.button
                            animate={{
                                borderRadius: [
                                    "8px 58px 10px 54px / 52px 12px 48px 10px",
                                    "56px 10px 60px 8px / 10px 52px 12px 48px",
                                    "12px 56px 8px 60px / 48px 10px 52px 12px",
                                    "8px 58px 10px 54px / 52px 12px 48px 10px",
                                ],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            whileHover={{ scale: 2 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-56 h-14 bg-black text-white text-lg font-semibold tracking-widest border border-black shadow-xl"
                        >
                            ENTER →
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Architecture */}

            {/* ==================== AUTHENTICATED SECTION ==================== */}

            <section
                id="architecture"
                className="relative z-10 min-h-screen px-8 py-32"
            >

                <div className="max-w-7xl mx-auto">

                    <div className="mb-24 flex flex-col items-center">

                        <h2 className="architecture-title">
                            AUTHORIZED
                        </h2>

                        <p className="architecture-subtitle">
                            RAG EXECUTION
                        </p>

                    </div>
                    <div className="architecture-container">

                        <div className="arch-grid">

                            <div className="arch-card">
                                <span className="arch-label">01</span>
                                <h3>USER</h3>
                                <p>Employee · Admin</p>
                            </div>

                            <div className="arch-card">
                                <span className="arch-label">02</span>
                                <h3>JWT</h3>
                                <p>Authentication</p>
                            </div>

                            <div className="arch-card">
                                <span className="arch-label">03</span>
                                <h3>RBAC</h3>
                                <p>Role-Based Access</p>
                            </div>

                            <div className="arch-card">
                                <span className="arch-label">04</span>
                                <h3>FASTAPI</h3>
                                <p>Backend API</p>
                            </div>

                            <div className="arch-card">
                                <span className="arch-label">05</span>
                                <h3>PDF ENGINE</h3>
                                <p>Extract · Chunk</p>
                            </div>

                            <div className="arch-card">
                                <span className="arch-label">06</span>
                                <h3>EMBEDDINGS</h3>
                                <p>MiniLM-L6-v2</p>
                            </div>

                            <div className="arch-card chroma">
                                <span className="arch-label">07</span>
                                <h3>CHROMADB</h3>
                                <p>Vector Search</p>
                            </div>

                            <div className="arch-card gemini">
                                <span className="arch-label">08</span>
                                <h3>GEMINI</h3>
                                <p>LLM Retrieval</p>
                            </div>

                        </div>

                    </div>
                    {/* Architecture Diagram comes here */}

                    

                </div>

            </section>
            {/* ==================== ABOUT ==================== */}

            <section
                id="about"
                className="relative z-10 flex justify-center px-8 pt-64 pb-56 mb-[24rem]"
            >

                <div className="max-w-4xl text-center">

                    <p className="about-label">
                        ABOUT
                    </p>

                    <h2 className="about-title">
                        Built for enterprise teams that need AUTHENTIC retrieval, not searches.
                    </h2>

                    <p className="about-text">
                        ARCHER is an RAG assistant designed for role - based (STRICTLY)
                        knowledge retrieval. Powered by semantic
                        search, JWT authorization and on the spot
                        inference, it answers
                        from valid documentation.
                    </p>

                </div>

            </section>

            <div className="h-[20rem]" />
            {/* ==================== ABOUT ME ==================== */}

            <section
                id="creator"
                className="relative z-10 flex justify-center px-8 pt-[32rem] pb-96">

                <div className="max-w-4xl text-center">

                    <p className="about-label">
                        CREATOR
                    </p>

                    <h2 className="about-title">
                        Designed & Developed by Briva P.
                    </h2>

                    <div className="creator-links">

                        <span>•</span>
                        <a
                            href="https://www.linkedin.com/in/briva-puri"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>

                        <span>•</span>

                        <a
                            href="briva.10102@gmail.com"
                        >
                            Gmail
                        </a>

                        <span>•</span>

                    </div>


                </div>

            </section>
            <div className="h-[20rem]" />
            <FloatingFooter />

        </main>
    );
}