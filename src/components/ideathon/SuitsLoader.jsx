import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SuitsLoader({ onComplete }) {
    const [stage, setStage] = useState("entering"); // entering, combined, exit

    useEffect(() => {
        const sequence = async () => {
            // 1. Entering phase (0-1.2s)
            await new Promise(r => setTimeout(r, 1200));
            setStage("combined");

            // 2. Combined/Destruction phase (1.2-3.0s)
            await new Promise(r => setTimeout(r, 1800));
            setStage("exit");

            // 3. Trigger parent callback
            setTimeout(onComplete, 800);
        };

        sequence();
    }, [onComplete]);

    // Shake animation for impact
    const shake = {
        x: [0, -20, 20, -15, 15, -10, 10, -5, 5, 0],
        y: [0, -15, 15, -10, 10, -5, 5, 0],
        transition: { duration: 0.5 }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
                scale: 1.5,
                opacity: 0,
                filter: "blur(20px)",
                transition: { duration: 0.8, ease: "circIn" }
            }}
        >
            <div className="relative flex flex-col items-center">
                {/* Main Text Container */}
                <motion.div
                    className="flex items-center"
                    animate={stage === "combined" ? shake : {}}
                >
                    {/* IDEA - Slams from Left with massive force */}
                    <motion.div
                        initial={{ x: "-200%", opacity: 0, skewX: 20 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            skewX: 0
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 1.5 }}
                        className="text-6xl md:text-9xl font-black text-white italic tracking-tighter mix-blend-difference z-10"
                    >
                        IDEA
                    </motion.div>

                    {/* THON - Slams from Right with massive force */}
                    <motion.div
                        initial={{ x: "200%", opacity: 0, skewX: -20 }}
                        animate={{
                            x: 0,
                            opacity: 1,
                            skewX: 0
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 1.5 }}
                        className="text-6xl md:text-9xl font-black text-white italic tracking-tighter mix-blend-difference z-10"
                    >
                        THON
                    </motion.div>
                </motion.div>

                {/* Destructive Impact Flash - Multiple layers for intensity */}
                {stage === "combined" && (
                    <>
                        {/* Core Flash */}
                        <motion.div
                            initial={{ opacity: 1, scale: 0.5 }}
                            animate={{ opacity: 0, scale: 4 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white blur-[50px] z-20 rounded-full"
                        />
                        {/* Red Shockwave */}
                        <motion.div
                            initial={{ opacity: 1, scale: 1, border: "10px solid #ED1C24" }}
                            animate={{ opacity: 0, scale: 3, borderWidth: "0px" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full z-0"
                        />
                    </>
                )}

                {/* 2026 - Explodes out from the impact */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: stage === "entering" ? 0 : 1,
                        opacity: stage === "entering" ? 0 : 1
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="text-[#ED1C24] text-3xl md:text-5xl font-black tracking-[0.5em] mt-2 relative z-10 drop-shadow-[0_0_15px_rgba(237,28,36,0.8)]"
                >
                    2026
                </motion.div>

                {/* Removed the separator line as requested */}
            </div>

            {/* Background Glitch Effects on Impact */}
            {stage === "combined" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0, 0.2, 0] }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-[#ED1C24] mix-blend-overlay pointer-events-none"
                />
            )}
        </motion.div>
    );
}
