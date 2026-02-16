import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InternshipLoader = ({ onComplete }) => {
    const [textIndex, setTextIndex] = useState(0);
    const loadingTexts = [
        "Screening Profiles...",
        "Matching Domains...",
        "Shortlisting Candidates...",
        "Preparing Opportunities..."
    ];

    useEffect(() => {
        // Rotate text every 1.5s
        const textInterval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % loadingTexts.length);
        }, 1500);

        // Finish loading after showing all texts (approx 6 seconds)
        const completionTimer = setTimeout(() => {
            onComplete();
        }, 6000);

        return () => {
            clearInterval(textInterval);
            clearTimeout(completionTimer);
        };
    }, [onComplete]);

    // Network nodes configuration
    const nodes = [
        { x: -80, y: -50, delay: 0.2 },
        { x: 80, y: -50, delay: 0.4 },
        { x: -80, y: 50, delay: 0.6 },
        { x: 80, y: 50, delay: 0.8 },
        { x: 0, y: -90, delay: 1.0 },
        { x: 0, y: 90, delay: 1.2 },
    ];

    return (
        <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center font-sans text-white overflow-hidden">

            {/* Network Animation Area */}
            <div className="relative w-80 h-80 flex items-center justify-center mb-12">

                {/* Connecting Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    {nodes.map((node, i) => (
                        <motion.line
                            key={i}
                            x1="50%"
                            y1="50%"
                            x2={`calc(50% + ${node.x}px)`}
                            y2={`calc(50% + ${node.y}px)`}
                            stroke="url(#grad)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{ duration: 0.8, delay: node.delay, ease: "easeOut" }}
                        />
                    ))}
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" /> {/* Blue */}
                            <stop offset="100%" stopColor="#a855f7" /> {/* Purple */}
                        </linearGradient>
                    </defs>
                </svg>

                {/* Central Node (Student) */}
                <motion.div
                    className="absolute w-6 h-6 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] z-20"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="absolute inset-0 bg-white/50 rounded-full animate-ping" />
                </motion.div>

                {/* Surrounding Nodes (Companies) */}
                {nodes.map((node, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.6)] z-10"
                        style={{ x: node.x, y: node.y }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: node.delay }}
                    />
                ))}
            </div>

            {/* Text Content */}
            <div className="text-center z-20 space-y-6">

                {/* Title Section */}
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"
                    >
                        E-Conclave 2026 Internship Fair
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-gray-400 text-lg md:text-xl mt-3 font-light tracking-wide"
                    >
                        Connecting Talent with Opportunity
                    </motion.p>
                </div>

                {/* Changing Loader Text */}
                <div className="h-8 overflow-hidden">
                    <AnimatePresence mode='wait'>
                        <motion.p
                            key={textIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-blue-300 font-mono text-sm uppercase tracking-widest"
                        >
                            {loadingTexts[textIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>

            </div>

            {/* Bottom Branding */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 text-gray-600 text-xs tracking-[0.2em] font-medium"
            >
                IIC E-CELL SKNCOE
            </motion.div>

        </div>
    );
};

export default InternshipLoader;
