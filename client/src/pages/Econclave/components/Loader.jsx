import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Loader = ({ onComplete }) => {
    const [count, setCount] = useState(2015);
    const [showSuit, setShowSuit] = useState(false);

    useEffect(() => {
        // Counter animation: 2015 to 2026
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 2026) {
                    clearInterval(interval);
                    setShowSuit(true); // Show suit when counter hits 2026
                    return 2026;
                }
                return prev + 1;
            });
        }, 200);

        // Trigger completion (opening doors)
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 4000); // Wait a bit after showing suit before opening

        return () => {
            clearInterval(interval);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
        >
            {/* Left Door */}
            <motion.div
                initial={{ x: '0%' }}
                exit={{ x: '-100%' }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                className="absolute left-0 top-0 w-1/2 h-full bg-black z-20 border-r border-white/10 flex items-center justify-end overflow-hidden"
            >
                {/* Left Half of Suit */}
                <AnimatePresence>
                    {showSuit && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute right-0 w-[150px] h-[400px] flex justify-end"
                        >
                            <svg width="150" height="400" viewBox="0 0 150 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Left Lapel */}
                                <path d="M150 0 L0 0 L50 400 L150 400 Z" fill="#1a1a1a" />
                                <path d="M150 80 L80 80 L100 250 L150 300 Z" fill="#2a2a2a" />
                                {/* Left Shirt Collar */}
                                <path d="M150 40 L110 10 L80 30 L150 80 Z" fill="white" />
                                {/* Left Tie Half */}
                                <path d="M150 40 L150 350 L100 330 L120 40 Z" fill="var(--color-gold)" />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Right Door */}
            <motion.div
                initial={{ x: '0%' }}
                exit={{ x: '100%' }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                className="absolute right-0 top-0 w-1/2 h-full bg-black z-20 border-l border-white/10 flex items-center justify-start overflow-hidden"
            >
                {/* Right Half of Suit */}
                <AnimatePresence>
                    {showSuit && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute left-0 w-[150px] h-[400px]"
                        >
                            <svg width="150" height="400" viewBox="0 0 150 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Right Lapel */}
                                <path d="M0 0 L150 0 L100 400 L0 400 Z" fill="#1a1a1a" />
                                <path d="M0 80 L70 80 L50 250 L0 300 Z" fill="#2a2a2a" />
                                {/* Right Shirt Collar */}
                                <path d="M0 40 L40 10 L70 30 L0 80 Z" fill="white" />
                                {/* Right Tie Half */}
                                <path d="M0 40 L0 350 L50 330 L30 40 Z" fill="var(--color-gold)" />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Counter (Fades out when suit appears) */}
            <AnimatePresence>
                {!showSuit && (
                    <motion.div
                        className="relative z-30 flex flex-col items-center"
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex flex-col items-center mb-6 text-center">
                            <h2 className="text-xl md:text-2xl text-white font-serif tracking-widest uppercase mb-2">
                                Welcome to
                            </h2>
                            <h1 className="text-4xl md:text-6xl text-[var(--color-gold)] font-serif tracking-widest uppercase neon-text">
                                E-Conclave
                            </h1>
                        </div>
                        <div className="text-8xl md:text-9xl font-bold text-[var(--color-gold)] font-serif">
                            {count}
                        </div>
                        <p className="text-white/60 text-sm md:text-base font-serif italic tracking-wider mt-4">
                            Where ambition meets execution.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Loader;
