import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock } from "lucide-react";

export default function Schedule() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const agenda = [
        { time: "08:00 AM", event: "Registration & Briefing", details: "All teams check in and receive event details." },
        { time: "09:30 AM", event: "Evaluation Round", details: "Panel evaluations and technical assessment." },
        { time: "01:00 PM", event: "Lunch Break", details: "Networking lunch for all participants." },
        { time: "02:00 PM", event: "Shortlist Announcement", details: "Top 20 finalists announced." },
        { time: "02:30 PM", event: "Final Presentations", details: "Main stage pitches by finalists." },
        { time: "05:00 PM", event: "Winner Announcement", details: "Award ceremony and closing remarks." },
        { time: "26th Feb", event: "Prize Distribution Ceremony", details: "Grand celebration and handover of cash prizes." },
    ];

    return (
        <section id="agenda" ref={ref} className="py-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-12 md:px-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-1 bg-[#ED1C24]" />
                        <h2 className="text-white text-sm font-black tracking-[0.5em] uppercase">Event Schedule</h2>
                    </div>
                    <h3 className="suits-title text-white">THE DAY.</h3>
                </motion.div>

                {/* Notebook Cover Container */}
                <div className="relative max-w-5xl mx-auto bg-[#1a1a1a] p-1 md:p-6 rounded-r-xl md:rounded-r-2xl shadow-xl md:shadow-2xl skew-x-0 md:skew-x-1 rotate-0 md:rotate-1 border-r-4 md:border-r-8 border-b-4 md:border-b-8 border-[#0a0a0a]">

                    {/* The Page */}
                    <div
                        className="relative bg-neutral-200 min-h-[600px] md:min-h-[800px] flex shadow-inner rounded-r-md overflow-hidden"
                        style={{
                            backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #94a3b8 31px, #94a3b8 32px)",
                            backgroundAttachment: "local",
                            backgroundPosition: "0 4px" // Offset lines slightly to match text baseline
                        }}
                    >
                        {/* Spiral Binding Section (Left) */}
                        <div className="w-8 md:w-16 bg-[#1a1a1a] relative flex-shrink-0 border-r border-black/50 z-20">
                            {/* Spiral Loops */}
                            <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-evenly py-4 overflow-hidden">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="relative h-6 md:h-8 w-full">
                                        {/* The Hole in Page */}
                                        <div className="absolute right-[-6px] md:right-[-8px] top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-[#1a1a1a] rounded-full z-10 box-content border-2 border-neutral-400/20"></div>
                                        {/* The Metal Ring */}
                                        <div className="absolute left-1 md:left-2 right-[-4px] md:right-[-6px] top-1/2 -translate-y-1/2 h-1.5 md:h-2 bg-gradient-to-b from-zinc-600 via-zinc-300 to-zinc-600 rounded-full shadow-md z-30 transform -rotate-3"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content Section (Right) */}
                        <div className="flex-1 p-4 md:p-12 relative pt-[6px]"> {/* Added precise top padding for alignment */}
                            {/* Continuous Margin Line */}
                            <div className="absolute left-[20px] md:left-[50px] top-0 bottom-0 w-[2px] md:w-[4px] bg-[#ED1C24] opacity-80 z-20 mix-blend-multiply"></div>

                            {agenda.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative pl-8 md:pl-20 mb-8 last:mb-0 group"
                                >
                                    {/* Dot - Centered on margin line */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ delay: i * 0.1 + 0.2 }}
                                        className="absolute left-[17px] md:left-[46px] top-[10px] w-2 h-2 md:w-3 md:h-3 rounded-full bg-white border md:border-2 border-[#ED1C24] z-30 shadow-sm"
                                    />

                                    <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
                                        <div className="text-[#ED1C24] font-black text-lg md:text-xl italic tracking-tighter w-24 md:w-32 shrink-0 font-serif h-[2rem] flex items-center -translate-y-[4px]">
                                            {item.time}
                                        </div>
                                        <div className="flex-1 space-y-0">
                                            {/* Aligning text to lines: line-height 2rem (32px) */}
                                            <h4 className="text-black text-xl md:text-2xl font-bold uppercase tracking-tight font-serif leading-[2rem] min-h-[2rem] -translate-y-[4px]">{item.event}</h4>
                                            <p className="text-zinc-800 text-xs md:text-sm font-medium italic font-serif leading-[2rem] tracking-wide">{item.details}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
