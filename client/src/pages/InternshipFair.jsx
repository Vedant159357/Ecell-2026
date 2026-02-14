import React, { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Calendar, Clock, MapPin, FileText, CheckCircle, AlertCircle, Briefcase, ExternalLink, User, Phone, Zap } from 'lucide-react';
import InternshipLoader from '../components/InternshipLoader';

// --- 3D Components ---

function ParticleNetwork(props) {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function FloatingGeometry() {
    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
            <mesh position={[2, 0, -2]} rotation={[0, 0, 0]} scale={0.5}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
            </mesh>
            <mesh position={[-2, 1, -3]} rotation={[1, 1, 0]} scale={0.3}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#a855f7" wireframe transparent opacity={0.3} />
            </mesh>
        </Float>
    )
}

// --- Main Page Component ---

const InternshipFair = () => {
    const [loading, setLoading] = useState(true);

    if (loading) {
        return <InternshipLoader onComplete={() => setLoading(false)} />;
    }

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    return (
        <div className="relative min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">

            {/* 3D Background Layer */}
            <div className="fixed inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 3] }}>
                    <ambientLight intensity={0.5} />
                    <ParticleNetwork />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <FloatingGeometry />
                </Canvas>
                {/* Gradient Overlays for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] opacity-80" />
            </div>

            {/* Scrollable Content Layer */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-between items-center mb-16"
                >
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        E-Conclave <span className="text-white">2026</span>
                    </div>
                    <a href="/" className="px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm backdrop-blur-md">
                        Return Home
                    </a>
                </motion.header>

                {/* Hero Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="text-center mb-24 mt-10"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium backdrop-blur-md">
                        <Zap size={16} className="fill-blue-500" /> Connecting Talent with Opportunity
                    </motion.div>

                    <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-tight">
                        Internship <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x">
                            Fair 2026
                        </span>
                    </motion.h1>

                    <motion.p variants={fadeInUp} className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                        Join the premier networking event connecting ambitious students with industry leaders.
                        Launch your career with top-tier internships.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
                        <a
                            href="https://forms.gle/wtSmTkatmgSrnqZm8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.5)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative flex items-center gap-2">Register Now <ExternalLink size={20} /></span>
                        </a>
                        <a
                            href="#details"
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-lg transition-all backdrop-blur-md"
                        >
                            View Details
                        </a>
                    </motion.div>
                </motion.div>

                {/* Info Cards Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
                >
                    {[
                        { icon: Calendar, title: "February 26, 2026", sub: "Save the Date", color: "text-blue-400" },
                        { icon: MapPin, title: "Sinhgad Institute", sub: "Vadgaon (SKNCOE)", color: "text-purple-400" },
                        { icon: Clock, title: "9:00 AM – 4:00 PM", sub: "Full Day Event", color: "text-pink-400" }
                    ].map((item, i) => (
                        <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                            <div className={`w-14 h-14 ${item.color} bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-400">{item.sub}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Main Content Area */}
                <div id="details" className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">

                    {/* Left: Requirements (8 cols) */}
                    <div className="lg:col-span-7 space-y-12">
                        <section>
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                                <span className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <FileText size={24} />
                                </span>
                                Registration Details
                            </h2>

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md space-y-8">
                                {[
                                    { title: "Eligibility", desc: "Open to all currently enrolled students." },
                                    { title: "Resume Guidelines", desc: "Submit a single updated PDF (Max 10 MB). Include LinkedIn & Portfolio links." },
                                    { title: "Shortlisting Process", desc: "Resume-based screening first. Only shortlisted candidates receive updates." },
                                    { title: "Important Note", desc: "Apply for only ONE registration. Multiple applications may lead to disqualification.", alert: true }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-5">
                                        <div className="flex-shrink-0 mt-1">
                                            {item.alert ? <AlertCircle className="text-yellow-500" size={24} /> : <CheckCircle className="text-green-500" size={24} />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                                <span className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                                    <Briefcase size={24} />
                                </span>
                                Internship Domains
                            </h2>
                            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-3xl p-8 backdrop-blur-md">
                                <p className="text-lg text-gray-300 mb-6">
                                    Select domains you are genuinely interested in and knowledgeable about.
                                </p>
                                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex items-center gap-3">
                                    <Zap size={20} className="text-purple-400" />
                                    <p className="text-purple-300 font-medium">
                                        Tip: List them in priority order (1st = Highest Priority).
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Sidebar / Sticky CTA (4 cols) */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* Pricing Card */}
                        <div className="sticky top-8">
                            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-8 backdrop-blur-xl text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <h3 className="text-xl font-bold mb-2 text-blue-200">Registration Fee</h3>
                                <div className="text-6xl font-bold text-white mb-8 tracking-tight">
                                    ₹99<span className="text-2xl text-gray-400 font-normal">/-</span>
                                </div>

                                <a
                                    href="https://forms.gle/wtSmTkatmgSrnqZm8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-5 bg-white text-black hover:bg-gray-100 rounded-xl font-bold text-xl mb-6 transition-all transform hover:-translate-y-1 shadow-lg shadow-white/10"
                                >
                                    Register Now
                                </a>

                                <p className="text-xs text-gray-400 mb-6 px-4">
                                    submission does not guarantee internship. selection by companies only.
                                </p>

                                <div className="border-t border-white/10 pt-6">
                                    <p className="text-sm text-blue-300 font-medium flex items-center justify-center gap-2">
                                        <Zap size={16} /> Join WhatsApp group after form
                                    </p>
                                </div>
                            </div>

                            {/* Contact Card */}
                            <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <Phone size={20} className="text-gray-400" />
                                    Support
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { name: "Kaushal Masare", phone: "84323 02983" },
                                        { name: "Vaishnavi", phone: "86690 00702" },
                                        { name: "Yash", phone: "94208 48812" }
                                    ].map((contact, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <User size={16} className="text-gray-500" />
                                                <span className="font-medium text-sm">{contact.name}</span>
                                            </div>
                                            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-blue-400 hover:text-blue-300 font-mono text-sm">
                                                {contact.phone}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-white/10 pt-12 pb-8 text-center">
                    <p className="text-gray-500 text-sm tracking-widest uppercase">© 2026 E-Cell SKNCOE. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default InternshipFair;
