import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Menu, X, Calendar, MapPin, ExternalLink, Award, Users, Clock, Shield, Cpu, Globe, Zap, HeartPulse } from 'lucide-react';
import FusionBackground from './FusionBackground';
import './Fusion.css';

// Sponsor Images
import techvision from "../../assets/sponcors/techvision-new.png";
import burgerify from "../../assets/sponcors/Burgerify.avif";
import cardon from "../../assets/sponcors/cordan.avif";
import offroute from "../../assets/sponcors/Off Route Adventure.avif";
import reliance from "../../assets/sponcors/Reliance digital.avif";
import skulz from "../../assets/sponcors/Skulz Energy.avif";


// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const DomainCard = ({ icon: Icon, title, description, color }) => (
    <motion.div
        variants={fadeInUp}
        className="group relative p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden will-change-transform"
    >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        <Icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
);

const Fusion = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lightboxSrc, setLightboxSrc] = useState(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Navigation Items
    const navItems = [
        { label: "Home", href: "#hero" },
        { label: "About", href: "#about" },
        { label: "Highlights", href: "#highlights" },
        { label: "Domains", href: "#domains" },
        { label: "Sponsors", href: "#sponsors" }
    ];

    return (
        <div className="relative min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500/30">
            {/* 3D Background */}
            <FusionBackground />

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4 bg-[#020617]/80 backdrop-blur-lg border-b border-white/10">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.img
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        src="/fusion/fusion_logo.png"
                        alt="Fusion Logo"
                        className="h-[72px] w-auto object-contain -my-4"
                    />

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 items-center">
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                href={item.href}
                                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors uppercase tracking-widest"
                            >
                                {item.label}
                            </motion.a>
                        ))}
                        <motion.a
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            href="/"
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-bold text-cyan-400 transition-all hover:scale-105"
                        >
                            Ecell
                        </motion.a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-white" onClick={toggleMenu}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        className="fixed inset-0 z-40 bg-[#020617] md:hidden pt-24 px-6"
                    >
                        <div className="flex flex-col gap-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-2xl font-bold text-white hover:text-cyan-400"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href="/"
                                className="text-2xl font-bold text-cyan-400 hover:text-white"
                            >
                                Back to Main Site
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10 pt-20">
                {/* Hero Section */}
                <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-4 -mt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative px-4 will-change-transform"
                    >
                        <div className="absolute -inset-10 bg-cyan-500/20 blur-[100px] rounded-full" />
                        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-4 leading-none">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-gray-400">
                                FUSION
                            </span>
                        </h1>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-8">
                            2K25
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-12 font-light"
                    >
                        24 Hour National Level Hackathon
                        <br />
                        <span className="text-cyan-400 font-mono text-sm mt-2 block">Innovate. Build. Compete. Conquer.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center w-full px-4"
                    >
                        <a href="#highlights" className="group relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto">
                            View Highlights
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#sponsors" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold rounded-full backdrop-blur-md transition-all hover:scale-105 w-full sm:w-auto">
                            Our Partners
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute bottom-10"
                    >
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
                        </div>
                    </motion.div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 px-6">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden will-change-transform"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px]" />
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="flex-1">
                                    <h2 className="text-4xl md:text-5xl font-bold mb-6">About The Event</h2>
                                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                        Fusion 2K25 is a flagship 24-hour national level hackathon organized by IIC E-Cell SKNCOE and SKNISB IEEE Student Branch. It brings together the brightest minds to solve real-world problems through technology.
                                    </p>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                            <Calendar className="text-cyan-400 mb-2" />
                                            <div className="text-sm text-gray-400">Date</div>
                                            <div className="font-bold">Oct 9-10, 2025</div>
                                        </div>
                                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                            <MapPin className="text-purple-400 mb-2" />
                                            <div className="text-sm text-gray-400">Venue</div>
                                            <div className="font-bold">SKNCOE, Pune</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 grid grid-cols-2 gap-4">
                                    {[
                                        { label: "Participants", val: "450+", color: "text-cyan-400" },
                                        { label: "Teams", val: "115+", color: "text-purple-400" },
                                        { label: "Hours", val: "24", color: "text-pink-400" },
                                        { label: "Prize Pool", val: "₹2L+", color: "text-yellow-400" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-black/40 p-4 md:p-6 rounded-2xl border border-white/10 text-center hover:bg-white/5 transition-colors">
                                            <div className={`text-2xl md:text-4xl font-black ${stat.color} mb-2`}>{stat.val}</div>
                                            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Highlights Section - Cinematic Video Overlay */}
                {/* Highlights Section - Cinematic Video Overlay */}
                <section id="highlights" className="py-20 bg-black">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.h2
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black text-center mb-16 tracking-tight"
                        >
                            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Highlights</span>
                        </motion.h2>
                    </div>

                    {/* Cinematic Area: Images + Video */}
                    <div className="relative w-full h-[600px] overflow-hidden border-y border-white/10 bg-[#020617]">
                        {/* Background Marquee */}
                        <div className="absolute inset-0 z-0 opacity-100 flex flex-col justify-between py-8 gap-4">
                            {/* Row 1 - Left */}
                            <div className="flex overflow-hidden whitespace-nowrap">
                                <motion.div
                                    className="flex gap-4"
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                                >
                                    {[
                                        "/fusion/h1.webp", "/fusion/h2.webp", "/fusion/h3.webp", "/fusion/h4.webp",
                                        "/fusion/h5.webp", "/fusion/h6.webp", "/fusion/h7.webp", "/fusion/h8.webp",
                                        "/fusion/h1.webp", "/fusion/h2.webp", "/fusion/h3.webp", "/fusion/h4.webp",
                                        "/fusion/h5.webp", "/fusion/h6.webp", "/fusion/h7.webp", "/fusion/h8.webp"
                                    ].map((src, i) => (
                                        <div key={i} className="relative w-80 h-48 flex-shrink-0 group overflow-hidden rounded-xl">
                                            <img
                                                src={src}
                                                alt=""
                                                className="w-full h-full object-cover filter grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Row 2 - Right */}
                            <div className="flex overflow-hidden whitespace-nowrap">
                                <motion.div
                                    className="flex gap-4"
                                    animate={{ x: ["-50%", "0%"] }}
                                    transition={{ ease: "linear", duration: 45, repeat: Infinity }}
                                >
                                    {[
                                        "/fusion/h8.webp", "/fusion/h7.webp", "/fusion/h6.webp", "/fusion/h5.webp",
                                        "/fusion/h4.webp", "/fusion/h3.webp", "/fusion/h2.webp", "/fusion/h1.webp",
                                        "/fusion/h8.webp", "/fusion/h7.webp", "/fusion/h6.webp", "/fusion/h5.webp",
                                        "/fusion/h4.webp", "/fusion/h3.webp", "/fusion/h2.webp", "/fusion/h1.webp"
                                    ].map((src, i) => (
                                        <div key={i} className="relative w-80 h-48 flex-shrink-0 group overflow-hidden rounded-xl">
                                            <img
                                                src={src}
                                                alt=""
                                                className="w-full h-full object-cover filter grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* Row 3 - Left */}
                            <div className="flex overflow-hidden whitespace-nowrap">
                                <motion.div
                                    className="flex gap-4"
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{ ease: "linear", duration: 35, repeat: Infinity }}
                                >
                                    {[
                                        "/fusion/h3.webp", "/fusion/h5.webp", "/fusion/h1.webp", "/fusion/h7.webp",
                                        "/fusion/h2.webp", "/fusion/h8.webp", "/fusion/h4.webp", "/fusion/h6.webp",
                                        "/fusion/h3.webp", "/fusion/h5.webp", "/fusion/h1.webp", "/fusion/h7.webp",
                                        "/fusion/h2.webp", "/fusion/h8.webp", "/fusion/h4.webp", "/fusion/h6.webp"
                                    ].map((src, i) => (
                                        <div key={i} className="relative w-80 h-48 flex-shrink-0 group overflow-hidden rounded-xl">
                                            <img
                                                src={src}
                                                alt=""
                                                className="w-full h-full object-cover filter grayscale transition-all duration-500 ease-in-out group-hover:grayscale-0 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />

                        {/* Centered Video */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="w-full max-w-2xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.3)] border border-white/10 pointer-events-auto"
                            >
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/gi5dJFVD4CQ?si=si7Pzxvp_OnlmAfF&autoplay=0&rel=0"
                                    title="Fusion Highlights"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Domains Section */}
                <section id="domains" className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-bold text-center mb-16"
                        >
                            Hackathon <span className="text-cyan-400">Domains</span>
                        </motion.h2>

                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <DomainCard
                                icon={Globe}
                                title="Web3 & Blockchain"
                                description="Decentralized apps, Smart contracts, and DeFi solutions."
                                color="from-orange-500/20 to-red-500/20"
                            />
                            <DomainCard
                                icon={Cpu}
                                title="AI & ML"
                                description="Generative AI, Predictive models, and Intelligent automation."
                                color="from-blue-500/20 to-cyan-500/20"
                            />
                            <DomainCard
                                icon={Shield}
                                title="Cybersecurity"
                                description="Network security, Privacy protection, and Threat detection."
                                color="from-green-500/20 to-emerald-500/20"
                            />
                            <DomainCard
                                icon={Zap}
                                title="FinTech"
                                description="Digital banking, Payment systems, and Financial inclusion."
                                color="from-yellow-500/20 to-amber-500/20"
                            />
                            <DomainCard
                                icon={HeartPulse}
                                title="HealthTech"
                                description="Telemedicine, Wearables, and AI diagnosis."
                                color="from-pink-500/20 to-rose-500/20"
                            />
                            <DomainCard
                                icon={Cpu}
                                title="Hardware & IoT"
                                description="Smart devices, Embedded systems, and Automation."
                                color="from-indigo-500/20 to-violet-500/20"
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Quick Info Grid */}
                <section id="quick-info" className="py-20 px-6 bg-gradient-to-b from-transparent to-black/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="bg-[#0f172a] p-8 rounded-3xl border border-cyan-500/20 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Users size={100} />
                                </div>
                                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Team Size</h3>
                                <p className="text-gray-300 text-lg">Max 4 Members</p>
                                <p className="text-sm text-gray-500 mt-2">Inter-college teams allowed</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -10 }}
                                className="bg-[#0f172a] p-8 rounded-3xl border border-purple-500/20 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Award size={100} />
                                </div>
                                <h3 className="text-2xl font-bold text-purple-400 mb-4">Registration</h3>
                                <p className="text-gray-300 text-lg">₹1000 per team</p>
                                <p className="text-sm text-gray-500 mt-2">Includes swag & food</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -10 }}
                                className="bg-[#0f172a] p-8 rounded-3xl border border-yellow-500/20 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Award size={100} />
                                </div>
                                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Prizes</h3>
                                <p className="text-gray-300 text-lg">₹2,00,000+</p>
                                <p className="text-sm text-gray-500 mt-2">Cash + Incubation</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Timeline - Styled as vertical path */}
                <section id="timeline" className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="text-4xl font-bold text-center mb-16"
                        >
                            Timeline
                        </motion.h2>
                        <div className="space-y-8">
                            {[
                                { title: "Inauguration", time: "9th Oct, 9:00 AM", desc: "Opening ceremony and kit distribution." },
                                { title: "Hackathon Kickoff", time: "9th Oct, 11:00 AM", desc: "Problem statements released." },
                                { title: "Mentoring Round 1", time: "9th Oct, 4:00 PM", desc: "Expert guidance and validation." },
                                { title: "Midnight Energy", time: "10th Oct, 12:00 AM", desc: "Fun activities and snacks." },
                                { title: "Final Evaluation", time: "10th Oct, 10:00 AM", desc: "Top 10 teams presentation." },
                                { title: "Prize Distribution", time: "10th Oct, 2:00 PM", desc: "Awards and closing ceremony." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex gap-4 md:gap-6 group"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-4 h-4 bg-cyan-500 rounded-full box-content border-4 border-[#020617] group-hover:scale-125 transition-transform" />
                                        {index !== 5 && <div className="flex-1 w-0.5 bg-gradient-to-b from-cyan-500 to-transparent my-2" />}
                                    </div>
                                    <div className="pb-8">
                                        <div className="text-cyan-400 font-mono text-sm mb-1">{item.time}</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-400">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sponsors Section - Marquee Style */}
                <section id="sponsors" className="py-20 bg-white/5 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <motion.h2
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="text-4xl font-bold mb-12"
                        >
                            Our Partners
                        </motion.h2>

                        {/* Title Sponsor */}
                        <div className="mb-16">
                            <p className="text-sm text-cyan-400 uppercase tracking-widest mb-6">Title Sponsor</p>
                            <div className="inline-block p-8 bg-white rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                                <a href="https://www.linkedin.com/company/techvision-skills-academy-llp/" target="_blank" rel="noopener noreferrer">
                                    <img src={techvision} alt="TechVision" className="h-24 object-contain" />
                                </a>
                            </div>
                        </div>

                        {/* Other Sponsors Grid */}
                        <div className="flex flex-wrap justify-center gap-8 items-center opacity-80">
                            {[burgerify, cardon, reliance, skulz].map((logo, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.1, opacity: 1 }}
                                    className="w-40 h-24 bg-white/10 rounded-xl flex items-center justify-center p-4 backdrop-blur-sm transition-all cursor-pointer"
                                >
                                    <img src={logo} alt="Sponsor" className="max-h-full max-w-full object-contain" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-6 border-t border-white/10 bg-[#020617]">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col gap-2 text-center md:text-left">
                            <div className="text-gray-400 text-sm">
                                © 2025 E-Cell SKNCOE. All rights reserved.
                            </div>
                            <a href="mailto:ecellskncoe.mail@gmail.com" className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                                ecellskncoe.mail@gmail.com
                            </a>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="https://www.instagram.com/iic_ecellskncoe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">Instagram</a>
                            <a href="https://www.linkedin.com/company/e-cell-skncoe-pune" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
                            <a href="https://x.com/EcellSkncoe50" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">Twitter (X)</a>
                            <a href="https://www.youtube.com/channel/UCRQcbHIFApOqtkZ10PgggYA" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">YouTube</a>
                        </div>
                    </div>
                </footer>
            </main>

            {/* Simple Lightbox */}
            {lightboxSrc && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setLightboxSrc(null)}
                >
                    <img src={lightboxSrc} alt="Zoomed" className="max-w-full max-h-full rounded-lg shadow-2xl" />
                </div>
            )}
        </div>
    );
};

export default Fusion;
