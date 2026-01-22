import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            q: "Who is eligible to participate?",
            a: "Any undergraduate or postgraduate student team of 2-4 members can participate. All domains and ideas are welcome.",
        },
        {
            q: "What is the registration deadline?",
            a: "Registration closes on 22nd Feb 2026. Late registrations will not be accepted.",
        },
        {
            q: "When will the prizes be distributed?",
            a: "Winners will receive their cash prizes during the award ceremony on 26th Feb 2026.",
        },
        {
            q: "How will judging be conducted?",
            a: "All judges are independent industry experts. Teams found engaging in plagiarism or unethical practices will be disqualified.",
        },
        {
            q: "Can teams from outside Pune participate?",
            a: "Yes, but Round 2 (Offline Evaluation) requires physical presence at SKNCOE, Pune.",
        },
    ];

    return (
        <section id="faq" className="py-24 bg-black relative">
            <div className="max-w-4xl mx-auto px-12 md:px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-[#ED1C24] text-sm font-black tracking-[0.5em] uppercase mb-6 text-center">Frequently Asked</h2>
                    <h3 className="suits-title text-white text-center">QUESTIONS.</h3>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="suits-faq-item">
                            <button
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                className="w-full py-8 flex items-center justify-between text-left group"
                            >
                                <span className={`text-xl font-bold uppercase tracking-tight transition-colors ${activeIndex === i ? 'text-[#ED1C24]' : 'text-white'}`}>
                                    {faq.q}
                                </span>
                                {activeIndex === i ? <Minus className="text-[#ED1C24] w-6 h-6" /> : <Plus className="text-white/20 group-hover:text-white w-6 h-6" />}
                            </button>
                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-8 text-white/40 font-light italic text-lg leading-relaxed max-w-2xl">
                                            "{faq.a}"
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
