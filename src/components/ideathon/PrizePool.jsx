import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Gavel, IndianRupee } from "lucide-react";

export default function PrizePool() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const settlements = [
        {
            rank: "1st",
            value: "₹50,000",
            label: "First Place Winner",
            icon: Briefcase,
            tieColor: "#ED1C24", // Red Tie (Harvey/Mike)
        },
        {
            rank: "2nd",
            value: "₹20,000",
            label: "Second Place Winner",
            icon: Gavel,
            tieColor: "#555", // Grey Tie (Louis)
        },
        {
            rank: "3rd-8th",
            value: "₹5,000",
            label: "Each Winner",
            icon: IndianRupee,
            tieColor: "#ffffff", // White Tie
        }
    ];

    return (
        <section id="prize" ref={ref} className="py-24 bg-black overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-12 md:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="mb-20"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-1 bg-[#ED1C24]" />
                        <h2 className="text-white text-sm font-black tracking-[0.5em] uppercase">Prize Pool</h2>
                    </div>
                    <h3 className="suits-title text-white">WIN BIG.</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {settlements.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.2 }}
                            className="relative group cursor-default"
                        >
                            {/* Suit Jacket Container */}
                            <div className="relative bg-[#111] overflow-hidden border border-white/5 h-[500px] flex flex-col items-center pt-16 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(237,28,36,0.1)]">

                                {/* Lapels (CSS Shapes) */}
                                <div className="absolute top-0 left-0 w-1/2 h-[300px] bg-[#1a1a1a] origin-top-left -skew-y-[20deg] z-10 border-r border-white/5 shadow-2xl" />
                                <div className="absolute top-0 right-0 w-1/2 h-[300px] bg-[#1a1a1a] origin-top-right skew-y-[20deg] z-10 border-l border-white/5 shadow-2xl" />

                                {/* Shirt Area (White triangle) */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] h-[120px] bg-white clip-path-polygon-[50%_100%,_0_0,_100%_0] z-0 shadow-[inset_0_10px_20px_rgba(0,0,0,0.1)]" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />

                                {/* Tie */}
                                <div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[180px] z-20 shadow-lg"
                                >
                                    {/* Tie Knot */}
                                    <div className="w-full h-10" style={{ backgroundColor: s.tieColor }} />
                                    {/* Tie Body */}
                                    <div className="w-full h-full clip-path-polygon-[15%_0,_85%_0,_100%_100%,_50%_90%,_0_100%]" style={{ backgroundColor: s.tieColor, clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 50% 90%, 0 100%)' }} />
                                </div>

                                {/* Content (Pocket Square / Data) */}
                                <div className="mt-auto mb-16 relative z-30 text-center w-full px-6">
                                    <div className="mb-6 flex justify-center">
                                        <div className="w-16 h-1 bg-white/10" />
                                    </div>

                                    <s.icon className="w-8 h-8 text-white/40 mx-auto mb-4" />

                                    <h4 className="text-white text-5xl font-black italic tracking-tighter mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {s.value}
                                    </h4>
                                    <div className="text-[#ED1C24] font-bold uppercase tracking-[0.2em] text-sm">
                                        {s.rank} Place
                                    </div>
                                    <p className="text-white/30 text-xs font-light mt-2 tracking-widest uppercase">{s.label}</p>
                                </div>

                                {/* Handkerchief/Pocket Square Accent */}
                                <div className="absolute top-[200px] left-[40px] w-20 h-2 bg-white/10 rotate-[-15deg] z-20" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    className="mt-16 text-center"
                >
                    <p className="text-white/40 font-light italic tracking-widest leading-relaxed">
                        *All settlements are subject to final validation by the presiding panel of experts.
                        <br /> Non-negotiable terms of entry apply.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
