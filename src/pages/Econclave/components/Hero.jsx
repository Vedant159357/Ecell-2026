import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import TieInteraction from './TieInteraction';

const quotes = [
    "When you’re backed into a corner, you don’t fold. You negotiate.",
    "Power is earned. Influence is built.",
    "Ideas don’t change the world. People who execute them do."
];

const TieScrollIndicator = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        >
            <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold)] mb-2 opacity-80">Scroll</span>
            {/* Stylized Tie SVG */}
            <motion.svg
                width="30"
                height="80"
                viewBox="0 0 30 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <path d="M5 0 L25 0 L20 10 L10 10 Z" fill="var(--color-gold)" />
                <path d="M10 12 L20 12 L25 70 L15 80 L5 70 Z" fill="url(#tie-gradient)" opacity="0.8" />
                <defs>
                    <linearGradient id="tie-gradient" x1="15" y1="12" x2="15" y2="80" gradientUnits="userSpaceOnUse">
                        <stop stopColor="var(--color-gold)" />
                        <stop offset="1" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </motion.svg>
        </motion.div>
    );
};

const AnimatedTitle = ({ text }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex justify-center overflow-visible mb-6">
            <h1
                className="text-4xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-white leading-none drop-shadow-2xl flex select-none flex-wrap justify-center gap-x-1 md:gap-x-0"
                style={{ color: '#ffffff' }}
            >
                {text.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 100, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={isLoaded ? {
                            type: "spring", stiffness: 600, damping: 10
                        } : {
                            duration: 1.5,
                            delay: 0.2 + index * 0.05,
                            ease: [0.6, 0.01, 0.05, 0.9]
                        }}
                        style={{ color: '#ffffff' }}
                        whileHover={{
                            scale: 1.15,
                            y: -20,
                            rotate: index % 2 === 0 ? 5 : -5,
                            color: "#d4af37",
                            textShadow: "0 0 30px rgba(212, 175, 55, 0.6)",
                            transition: { type: "spring", stiffness: 600, damping: 10 }
                        }}
                        className="inline-block cursor-pointer origin-bottom transition-colors duration-200"
                    >
                        {char}
                    </motion.span>
                ))}
            </h1>
        </div>
    );
};

const Hero = () => {
    const [currentQuote, setCurrentQuote] = useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={ref} className="relative h-screen flex flex-col justify-center items-center overflow-hidden">

            {/* The Tie - Now absolute inside relative Hero */}
            <TieInteraction />

            {/* Cinematic Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url("https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--color-bg)]" />
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="z-10 text-center px-4 max-w-5xl relative"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.6, 0.01, 0.05, 0.9] }}
                    className="mb-6 flex flex-col items-center gap-2"
                >
                    <span
                        className="text-white/80 text-sm md:text-lg tracking-[0.2em] md:tracking-[0.3em] uppercase font-light"
                        style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                    >
                        IIC E-Cell SKNCOE Presents
                    </span>
                    <span className="text-[var(--color-gold)] text-base md:text-xl font-serif italic tracking-wider">
                        10th Edition
                    </span>
                </motion.div>

                <AnimatedTitle text="E-CONCLAVE" />

                <div className="h-px w-48 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent mx-auto mb-12" />

                <div className="h-24 flex items-center justify-center">
                    <motion.p
                        key={currentQuote}
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="text-xl md:text-3xl font-serif italic text-gray-400 max-w-3xl leading-relaxed"
                    >
                        "{quotes[currentQuote]}"
                    </motion.p>
                </div>
            </motion.div>

            <TieScrollIndicator />
        </section>
    );
};

export default Hero;
