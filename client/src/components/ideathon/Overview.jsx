import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Scale, Gavel, Briefcase, Award } from "lucide-react";

export default function Overview() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const highlights = [
        {
            icon: Gavel,
            title: "The Verdict",
            code: "POCKET #01",
            description: "Submit your evidence. We provide the platform for the most innovative solutions.",
            fabric: "bg-[#111]",
            accent: "bg-white" // White Hanky
        },
        {
            icon: Scale,
            title: "Fair Trial",
            code: "POCKET #02",
            description: "Evaluated by industry seniors who know exactly what a winning case looks like.",
            fabric: "bg-[#161616]",
            accent: "bg-[#ED1C24]" // Red Hanky
        },
        {
            icon: Briefcase,
            title: "The Firm",
            code: "POCKET #03",
            description: "Network with the elite cohort of Pune's most ambitious student founders.",
            fabric: "bg-[#0f0f0f]",
            accent: "bg-[#888]" // Grey Hanky
        },
        {
            icon: Award,
            title: "The Closing",
            code: "POCKET #04",
            description: "A cash settlement of ₹1,00,000 for those who can defend their vision.",
            fabric: "bg-[#181818]",
            accent: "bg-[#222]" // Dark Hanky
        },
    ];

    return (
        <section id="overview" ref={ref} className="relative py-24 bg-black overflow-hidden section-suits">
            <div className="max-w-7xl mx-auto px-12 md:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-1 bg-[#ED1C24]" />
                        <h2 className="text-white text-sm font-black tracking-[0.5em] uppercase">About the Event</h2>
                    </div>
                    <h3 className="suits-title text-white text-4xl md:text-6xl mb-8">
                        WHERE IDEAS BECOME <br />
                        <span className="suits-red-text">REALITY</span>
                    </h3>
                    <p className="text-white/60 text-lg max-w-3xl font-light tracking-wide leading-relaxed">
                        Mega Ideathon 2026 is where innovative ideas meet opportunity.
                        Showcase your vision, compete with the best, and win exciting prizes.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-default"
                        >
                            {/* Suit Fabric Background */}
                            <div className={`relative h-[320px] ${item.fabric} p-6 flex items-end justify-center overflow-hidden shadow-2xl rounded-sm`}>
                                {/* Texture */}
                                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:10px_10px]" />

                                {/* The "Card" inside the Pocket (Content) */}
                                <div className="absolute bottom-[80px] w-[80%] bg-white text-black p-6 shadow-lg transform translate-y-8 group-hover:translate-y-[-20px] transition-transform duration-500 ease-out z-10 border border-t-4 border-t-[#ED1C24]">
                                    <div className="flex justify-between items-start mb-2">
                                        <item.icon className="w-6 h-6 text-[#ED1C24]" />
                                        <div className="text-[9px] font-bold uppercase tracking-widest opacity-40">{item.code}</div>
                                    </div>
                                    <h4 className="text-xl font-black uppercase tracking-tight mb-2 leading-none">{item.title}</h4>
                                    <p className="text-[11px] font-medium leading-relaxed opacity-60">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Pocket Square Accent (Decorative) */}
                                <div className={`absolute bottom-[180px] right-[40px] w-16 h-16 ${item.accent} rotate-[15deg] shadow-md z-0 group-hover:translate-y-[-30px] transition-transform duration-700`} />

                                {/* The Pocket Front (Sewn Layer) */}
                                <div className={`absolute bottom-0 w-[90%] h-[100px] ${item.fabric} brightness-110 border-t border-white/10 shadow-[0_-5px_15px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center`}>
                                    {/* Stitching Line */}
                                    <div className="absolute top-2 w-[90%] border-t border-dashed border-white/20" />

                                    {/* Button on Pocket if needed, but keeping it clean */}
                                    <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                                        E-CELL SUIT
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
