import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Landmark, FileCheck, ShieldAlert } from "lucide-react";

export default function Registration() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="registration" ref={ref} className="py-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-12 md:px-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    className="mb-16 text-center"
                >
                    <h2 className="text-[#ED1C24] text-sm font-black tracking-[0.5em] uppercase mb-6">Registration Details</h2>
                    <h3 className="suits-title text-white">HOW TO JOIN.</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Fees */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        className="suits-card border-white/10"
                    >
                        <Landmark className="w-8 h-8 text-[#ED1C24] mb-6" />
                        <h4 className="text-white text-2xl font-black uppercase mb-4">Registration Fee</h4>
                        <p className="text-white/60 mb-6 font-light">
                            Each team must pay the registration fee to secure their spot in the competition.
                        </p>
                        <div className="text-4xl font-black italic tracking-tighter text-white mb-2">₹599.00</div>
                        <p className="text-[#ED1C24] text-xs font-bold tracking-[0.2em] uppercase">Per Team (2-4 Members)</p>
                    </motion.div>

                    {/* Refund Check */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="suits-card border-[#ED1C24]"
                    >
                        <FileCheck className="w-8 h-8 text-[#ED1C24] mb-6" />
                        <h4 className="text-white text-2xl font-black uppercase mb-4">Refund Policy</h4>
                        <p className="text-white/60 mb-8 font-light italic">
                            "Fair play guaranteed for all participants."
                        </p>
                        <div className="bg-white/5 p-6 border-l-4 border-[#ED1C24]">
                            <p className="text-white text-sm font-bold uppercase mb-2">Partial Refund Available</p>
                            <p className="text-white/40 text-xs font-light leading-relaxed">
                                Teams eliminated in the online round will receive a <span className="text-white font-bold">₹199 refund</span> to their accounts.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Register Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mt-12"
                >
                    <a
                        href="https://forms.gle/mKUNzeZ3CwewBaZD6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="suits-button text-xl flex items-center gap-4 group"
                    >
                        Register Now
                    </a>
                </motion.div>

                {/* Alert Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="mt-12 p-8 bg-[#ED1C24]/10 border border-[#ED1C24]/30 flex flex-col md:flex-row items-center gap-8"
                >
                    <ShieldAlert className="w-12 h-12 text-[#ED1C24] shrink-0" />
                    <div>
                        <h5 className="text-white font-black uppercase tracking-tight text-lg mb-2">Important Notice</h5>
                        <p className="text-white/60 text-sm font-light">
                            Refunds will not be processed for teams that qualify for Round 2 but fail to attend the offline evaluation.
                            By registering, you agree to the terms and conditions of MEGA IDEATHON 2026.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
