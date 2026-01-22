import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Instagram, Twitter, Youtube } from "lucide-react";

export default function IdeathonFooter() {
    return (
        <footer className="relative py-24 bg-[#050505] border-t-4 border-[#ED1C24] overflow-hidden mt-20">
            <div className="relative z-10 max-w-7xl mx-auto px-12 md:px-24">
                {/* Get in Touch Section */}
                <div className="mb-12">
                    <h3 className="text-[#ED1C24] text-sm font-black tracking-[0.5em] uppercase mb-8">Get in Touch</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {/* Email */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-[#ED1C24]" />
                            </div>
                            <div>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Official Contact Email</p>
                                <a href="mailto:ecellskncoe.mail@gmail.com" className="text-white text-lg font-bold hover:text-[#ED1C24] transition-colors">
                                    ecellskncoe.mail@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-[#ED1C24]" />
                            </div>
                            <div>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Contact Numbers</p>
                                <div className="flex flex-col gap-1">
                                    <a href="tel:+919579933943" className="text-white text-base font-bold hover:text-[#ED1C24] transition-colors">
                                        Shivam Ghuge: +91 95799 33943
                                    </a>
                                    <a href="tel:+919307448321" className="text-white text-base font-bold hover:text-[#ED1C24] transition-colors">
                                        Shantanu Mapare: +91 93074 48321
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-6">
                        <p className="sr-only">Official Social Media Handles</p>
                        {[
                            { Icon: Linkedin, href: "https://www.linkedin.com/company/e-cell-skncoe-pune" },
                            { Icon: Instagram, href: "https://www.instagram.com/iic_ecellskncoe" },
                            { Icon: Twitter, href: "https://x.com/EcellSkncoe50" },
                            { Icon: Youtube, href: "https://www.youtube.com/channel/UCRQcbHIFApOqtkZ10PgggYA" }
                        ].map(({ Icon, href }, i) => (
                            <motion.a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -3, color: "#ED1C24" }}
                                className="text-white/20 transition-colors"
                            >
                                <Icon className="w-6 h-6" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/5 mb-8" />

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Ideathon Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-[#ED1C24]" />
                        <span className="text-white/60 font-black italic tracking-tighter text-lg">
                            IDEATHON <span className="text-[#ED1C24]">2026</span>
                        </span>
                    </div>

                    {/* Copyright */}
                    <p className="text-white/20 text-xs uppercase font-bold tracking-widest">
                        © 2026 E-CELL SKNCOE. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
}
