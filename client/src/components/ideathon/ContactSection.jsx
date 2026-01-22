import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-black relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-[#ED1C24]/5 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto px-12 md:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-[#ED1C24] text-sm font-black tracking-[0.5em] uppercase mb-8">Contact Us</h2>
                            <h3 className="suits-title text-white mb-12 italic">GET IN TOUCH.</h3>
                        </motion.div>

                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#ED1C24]/50 transition-colors">
                                    <Mail className="w-6 h-6 text-[#ED1C24]" />
                                </div>
                                <div>
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Email Address</p>
                                    <p className="text-white text-xl font-black italic tracking-tight underline decoration-[#ED1C24]/30">skncoeecell@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#ED1C24]/50 transition-colors">
                                    <Phone className="w-6 h-6 text-[#ED1C24]" />
                                </div>
                                <div>
                                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Phone Number</p>
                                    <p className="text-white text-xl font-black italic tracking-tight">+91 9763560645</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-6 mt-16 mt-20">
                            {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -5, color: "#ED1C24" }}
                                    className="text-white/20 transition-colors"
                                >
                                    <Icon className="w-8 h-8" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-[#ED1C24] p-12 md:p-16 relative group cursor-pointer overflow-hidden"
                    >
                        <div className="relative z-10">
                            <h4 className="text-white text-5xl font-black italic tracking-tighter mb-4">READY TO <br /> COMPETE?</h4>
                            <p className="text-white/80 font-bold uppercase tracking-widest text-sm mb-12">Registration closes on Feb 22nd.</p>
                            <button className="bg-white text-black px-12 py-4 font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all">
                                REGISTER NOW
                            </button>
                        </div>

                        {/* Background Text Accent */}
                        <div className="absolute right-[-20%] top-[-20%] text-white/10 text-[200px] font-black italic leading-none pointer-events-none">
                            WIN
                        </div>
                    </motion.div>
                </div>

                <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-white/40 text-[10px] font-bold uppercase tracking-[0.5em]">
                        MEGA IDEATHON 2026
                    </div>
                    <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">
                        © 2026 E-CELL SKNCOE. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </section>
    );
}
