import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";

export default function HeroSection() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date("2026-02-22T23:59:59").getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            if (distance < 0) {
                clearInterval(interval);
                return;
            }
            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20">
            {/* Background NYC Skyline (B&W) */}
            <div className="absolute inset-0 z-0 bg-black">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1546436836-07a91091f160?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center grayscale shadow-[inset_0_-200px_100px_rgba(0,0,0,1)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-12 md:px-24 w-full">
                {/* The Badge */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <div className="w-12 h-0.5 bg-[#ED1C24]" />
                    <span className="text-sm font-bold tracking-[0.4em] text-white/60 uppercase">
                        E-Cell SKNCOE Presents
                    </span>
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <h1 className="hero-title text-white">
                        MEGA <br />
                        <span className="suits-red-text">IDEATHON</span> <br />
                        2026
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl font-light tracking-widest text-white/70 uppercase">
                        Pune's Biggest <span className="suits-serif border-l border-white/20 ml-4 pl-4 italic">Innovation Challenge</span>
                    </p>
                </motion.div>

                {/* Settlement Prize */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block border border-[#ED1C24]/30 bg-[#ED1C24]/5 p-8 mb-12 backdrop-blur-sm"
                >
                    <p className="text-[#ED1C24] text-xs font-black tracking-[0.5em] uppercase mb-4">Cash Prize Pool</p>
                    <h2 className="text-white text-5xl md:text-7xl font-black italic tracking-tighter">
                        ₹1,00,000
                    </h2>
                </motion.div>

                {/* Countdown */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-8 md:gap-16 mb-12"
                >
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="text-center">
                            <div className="text-white text-3xl md:text-5xl font-black leading-none mb-1">
                                {String(value).padStart(2, "0")}
                            </div>
                            <div className="text-[#ED1C24] text-[10px] font-bold uppercase tracking-widest">{unit}</div>
                        </div>
                    ))}
                </motion.div>

                {/* CTA Button */}
                <motion.a
                    href="https://forms.gle/mKUNzeZ3CwewBaZD6"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="suits-button text-xl flex items-center gap-4 group inline-flex"
                >
                    Register Now
                    <Trophy className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </motion.a>
            </div>

            {/* Corporate Accent Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ED1C24] to-transparent" />
        </section>
    );
}
