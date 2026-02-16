import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Users, Trophy, CheckSquare } from "lucide-react";

export default function RoundsTimeline() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const rounds = [
        {
            number: "01",
            title: "Online Elimination Round",
            mode: "Online Submission",
            icon: FileText,
            selection: "Top 100 Teams Qualify",
            details: [
                "Submit idea summary via registration form",
                "Top 100 teams announced on 23rd Feb, 12:00 PM",
                "₹199 refund for online eliminated teams",
            ],
        },
        {
            number: "02",
            title: "Offline Evaluation Round",
            mode: "Offline Evaluation",
            icon: Users,
            selection: "Top 20 Teams Advance",
            details: [
                "6 individual panel evaluations",
                "Rigorous judging by industry experts",
                "Finalists announced by 2:00 PM",
            ],
        },
        {
            number: "03",
            title: "Final Pitch Round",
            mode: "Main Stage Presentation",
            icon: Trophy,
            selection: "Winners Announced",
            details: [
                "Final 20 teams present on main stage",
                "6 expert judges per panel",
                "Winners announced on 26th Feb",
            ],
        },
    ];

    return (
        <section id="the-rounds" ref={ref} className="py-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-12 md:px-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    className="mb-20 text-right"
                >
                    <div className="flex items-center justify-end gap-4 mb-6">
                        <h2 className="text-white text-sm font-black tracking-[0.5em] uppercase">Competition Rounds</h2>
                        <div className="w-12 h-1 bg-[#ED1C24]" />
                    </div>
                    <h3 className="suits-title text-white">THE JOURNEY.</h3>
                </motion.div>

                <div className="space-y-1 bg-white/5 border-t border-b border-white/10">
                    {rounds.map((round, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.2 }}
                            className="group relative flex flex-col md:flex-row items-stretch border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                        >
                            {/* Number Section */}
                            <div className="w-full md:w-32 bg-black flex items-center justify-center p-8 border-r border-white/10">
                                <span className="text-4xl font-black text-[#ED1C24] italic tracking-tighter opacity-50 group-hover:opacity-100 transition-opacity">
                                    {round.number}
                                </span>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 p-8 md:p-12">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div>
                                        <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{round.title}</h4>
                                        <p className="text-[#ED1C24] text-xs font-bold tracking-widest uppercase">{round.mode}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-white/40 text-sm font-light uppercase tracking-widest italic">{round.selection}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {round.details.map((detail, d) => (
                                        <div key={d} className="flex gap-3">
                                            <CheckSquare className="w-4 h-4 text-[#ED1C24] flex-shrink-0 mt-1" />
                                            <p className="text-white/60 text-sm font-light leading-relaxed">{detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Edge Glow */}
                            <div className="absolute right-0 top-0 w-1 h-full bg-[#ED1C24] scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
