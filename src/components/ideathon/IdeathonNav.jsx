import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function IdeathonNav() {
    const [isVisible, setIsVisible] = useState(true);
    const { scrollY } = useScroll();

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            // Hide navigation when scrolled more than 100px
            if (latest > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        });
    }, [scrollY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-full z-[100] pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent h-32" />

            {/* Navigation content */}
            <div className="relative px-8 py-6 flex justify-between items-start">
                {/* Ideathon Logo - Top Left */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 pointer-events-auto"
                >
                    <div className="w-1 h-8 bg-[#ED1C24]" />
                    <span className="text-white font-black italic tracking-tighter text-2xl">
                        IDEATHON <span className="text-[#ED1C24]">2026</span>
                    </span>
                </motion.div>

                {/* E-Cell Button - Top Right */}
                {/* E-Cell Button - Top Right */}
                <Link to="/" className="pointer-events-auto group">
                    <div className="relative">
                        {/* Double Boundary - Outer/Offset */}
                        <div className="absolute inset-0 border border-white/20 translate-x-1 translate-y-1 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:border-[#ED1C24]/50" />

                        {/* Main Button Container */}
                        <div className="relative bg-black/50 backdrop-blur-sm border border-white/20 px-8 py-3 overflow-hidden transition-all duration-300 group-hover:border-[#ED1C24] group-hover:bg-[#ED1C24]/10">

                            {/* Text "E-Cell" - Comes out on hover */}
                            <div className="relative z-10 overflow-hidden">
                                <span className="block text-white font-black uppercase tracking-widest text-sm transition-transform duration-500 group-hover:-translate-y-[150%]">
                                    E-Cell
                                </span>
                                <span className="absolute inset-0 block text-[#ED1C24] font-black uppercase tracking-widest text-sm translate-y-[150%] transition-transform duration-500 group-hover:translate-y-0">
                                    E-Cell
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </motion.div>
    );
}
