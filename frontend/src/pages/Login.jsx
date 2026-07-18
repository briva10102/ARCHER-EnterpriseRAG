import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GridScanLogin from "../components/GridScanLogin";
import { login, register } from "../api/api";
import FloatingFooter from "../components/Footer/FloatingFooter";

export default function Login() {
    const navigate = useNavigate();

    const archerSectionRef = useRef(null);

    const [activeTab, setActiveTab] = useState("login");

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const [signupData, setSignupData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        role: "",
    });
    
    const handleLogin = async () => {
        try {
            const data = await login(
                loginData.username,
                loginData.password
            );
            if (data.access_token) {

                localStorage.setItem("token", data.access_token);

                navigate("/workspace");

            } else {

                alert(data.message || "Login failed.");

            }

        } catch (error) {

            console.error(error);
            alert("Couldn't connect to the server.");

        }
    };
    const handleSignup = async () => {

        try {

            const data = await register(
                signupData.username,
                signupData.password,
                signupData.role
            );

            alert(data.message || "Registration successful.");

        } catch (error) {

            console.error(error);
            alert("Couldn't connect to the server.");

        }

    };
    return (
        <main className="relative min-h-screen overflow-hidden bg-white border-[8px] border-black">

            {/* Background */}
            <GridScanLogin />

            {/* Foreground */}
            <div className="relative z-10">

                {/* ================================================= */}
                {/* LOGIN SECTION */}
                {/* ================================================= */}

                <section className="min-h-screen flex flex-col items-center justify-center px-6">

                    {/* Tabs */}

                    <motion.div
                        initial={{ opacity: 0, y: -25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex gap-20"
                    >
                        {["login", "signup"].map((tab) => (

                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className="relative pb-3"
                            >

                                <span
                                    className={`uppercase tracking-[0.45em] text-sm transition-colors duration-300 ${activeTab === tab
                                            ? "text-black"
                                            : "text-black/35 hover:text-black"
                                        }`}
                                >
                                    {tab === "login"
                                        ? "LOGIN"
                                        : "SIGN UP"}
                                </span>

                                {activeTab === tab && (

                                    <motion.div
                                        layoutId="underline"
                                        transition={{
                                            type: "spring",
                                            stiffness: 450,
                                            damping: 35,
                                        }}
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                                    />

                                )}

                            </button>

                        ))}
                    </motion.div>

                    {/* Form Container */}

                    <div className="mt-20 w-full flex justify-center">

                        <AnimatePresence mode="wait">
                            {activeTab === "login" ? (

                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 40 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-[430px] flex flex-col gap-8"
                                >

                                    <input
                                        type="email"
                                        placeholder="Username"
                                        value={loginData.username}
                                        onChange={(e) =>
                                            setLoginData({
                                                ...loginData,
                                                username: e.target.value,
                                            })
                                        }
                                        className="
                                            bg-transparent
                                            border-b
                                            border-black/25
                                            pb-3
                                            outline-none
                                            text-lg
                                            placeholder:text-black/35
                                            focus:border-black
                                            transition
                                        "
                                    />
                                    
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={loginData.password}
                                        onChange={(e) =>
                                            setLoginData({
                                                ...loginData,
                                                password: e.target.value,
                                            })
                                        }
                                        className="
                                            bg-transparent
                                            border-b
                                            border-black/25
                                            pb-3
                                            outline-none
                                            text-lg
                                            placeholder:text-black/35
                                            focus:border-black
                                            transition
                                        "
                                    />

                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={handleLogin}
                                        className="
                                            mt-6
                                            h-14
                                            border-2
                                            border-black
                                            rounded-[18px]
                                            uppercase
                                            tracking-[0.35em]
                                            hover:bg-black
                                            hover:text-white
                                            transition
                                        "
                                    >
                                        Login →
                                    </motion.button>

                                </motion.div>

                            ) : (
                                <motion.div
                                    key="signup"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-[430px] flex flex-col gap-8"
                                >

                                    

                                    <input
                                        type="email"
                                            placeholder="Username"
                                            value={signupData.username}
                                        onChange={(e) =>
                                            setSignupData({
                                                ...signupData,
                                                username: e.target.value,
                                            })
                                        }
                                        className="
                                            bg-transparent
                                            border-b
                                            border-black/25
                                            pb-3
                                            outline-none
                                            text-lg
                                            placeholder:text-black/35
                                            focus:border-black
                                            transition
                                        "
                                    />
                                        <select
                                            value={signupData.role}
                                            onChange={(e) =>
                                                setSignupData({
                                                    ...signupData,
                                                    role: e.target.value,
                                                })
                                            }
                                            className="
        bg-transparent
        border-b
        border-black/25
        pb-3
        outline-none
        text-lg
        focus:border-black
        transition
    "
                                        >
                                            <option value="">Select Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="employee">Employee</option>
                                        </select>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={signupData.password}
                                        onChange={(e) =>
                                            setSignupData({
                                                ...signupData,
                                                password: e.target.value,
                                            })
                                        }
                                        className="
                                            bg-transparent
                                            border-b
                                            border-black/25
                                            pb-3
                                            outline-none
                                            text-lg
                                            placeholder:text-black/35
                                            focus:border-black
                                            transition
                                        "
                                    />

                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={signupData.confirmPassword}
                                        onChange={(e) =>
                                            setSignupData({
                                                ...signupData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className="
                                            bg-transparent
                                            border-b
                                            border-black/25
                                            pb-3
                                            outline-none
                                            text-lg
                                            placeholder:text-black/35
                                            focus:border-black
                                            transition
                                        "
                                    />

                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                            onClick={handleSignup}
                                        className="
                                            mt-6
                                            h-14
                                            border-2
                                            border-black
                                            rounded-[18px]
                                            uppercase
                                            tracking-[0.35em]
                                            hover:bg-black
                                            hover:text-white
                                            transition
                                        "
                                    >
                                        Create Account →
                                    </motion.button>

                                </motion.div>

                            )}

                        </AnimatePresence>

                    </div>

                </section>

                {/* ================================================= */}
                {/* ARCHER SECTION */}
                {/* ================================================= */}

                <section
                    ref={archerSectionRef}
                    className="
                        min-h-screen
                        flex
                        flex-col
                        items-center
                        justify-end
                        pb-32
                        px-6
                        relative
                        overflow-hidden
                    "
                >
                    <div className="relative inline-flex items-center justify-center">

                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                            className="
            text-[5rem]
            md:text-[8rem]
            font-light
            tracking-[0.38em]
            text-black
            select-none
            relative
            z-10
        "
                        >
                            ARCHER
                        </motion.h1>

                        <motion.div
                            initial={{ x: "-120vw" }}
                            animate={{ x: "120vw" }}
                            transition={{
                                duration: 4,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                            className="
            absolute
            inset-0
            flex
            items-center
            z-20
            pointer-events-none
        "
                        >
                            {/* Feather */}
                            <div className="relative mr-1">
                                <div className="absolute -top-[5px] left-0 w-3 h-[2px] bg-black rotate-[-35deg]" />
                                <div className="absolute top-[5px] left-0 w-3 h-[2px] bg-black rotate-[35deg]" />
                            </div>

                            {/* Shaft */}
                            <div className="w-56 h-[2px] bg-black" />

                            {/* Arrow Head */}
                            <div
                                className="
                w-0
                h-0
                border-t-[7px]
                border-b-[7px]
                border-l-[16px]
                border-t-transparent
                border-b-transparent
                border-l-black
            "
                            />
                        </motion.div>

                    </div>

                    <motion.button
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.25,
                            duration: 0.7,
                        }}
                        whileHover={{
                            scale: 1.04,
                        }}
                        whileTap={{
                            scale: 0.97,
                        }}
                        onClick={() => navigate("/workspace")}
                        className="
                            relative
                            z-20
                            mt-16
                            h-14
                            px-10
                            border-5
                            border-black
                            rounded-[18px]
                            uppercase
                            tracking-[0.35em]
                            hover:bg-black
                            hover:text-white
                            transition
                        "
                    >
                        ENTER WORKSPACE
                    </motion.button>

                </section>
                
            </div>
            <FloatingFooter />
        </main>

    );
}