import { motion } from "framer-motion";

export default function WobblyButton({ children, onClick }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative w-60 h-16"
        >
            <motion.svg
                viewBox="0 0 260 70"
                className="absolute inset-0 w-full h-full"
                animate={{
                    d: [
                        "M18 18 C45 3 215 8 242 20 C258 29 257 53 239 61 C213 69 42 67 18 57 C5 50 4 28 18 18 Z",
                        "M14 22 C52 5 220 4 246 16 C260 26 256 54 236 62 C210 68 46 69 20 59 C6 52 3 33 14 22 Z",
                        "M19 16 C43 8 216 6 243 21 C258 31 255 51 238 58 C212 66 44 64 17 56 C5 48 7 26 19 16 Z",
                        "M18 18 C45 3 215 8 242 20 C258 29 257 53 239 61 C213 69 42 67 18 57 C5 50 4 28 18 18 Z",
                    ],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <motion.path
                    fill="#000"
                    stroke="#000"
                    strokeWidth="2"
                />
            </motion.svg>

            <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold tracking-[0.25em]">
                {children}
            </span>
        </motion.button>
    );
}