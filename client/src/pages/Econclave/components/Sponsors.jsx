import { motion } from 'framer-motion';

const sponsors = Array(8).fill(null); // Create 8 placeholders

const Sponsors = () => {
    return (
        <section className="py-20 md:py-40 bg-[var(--color-bg)] border-y border-[var(--color-surface)] overflow-hidden">
            <div className="container mb-24 text-center">
                <h2 className="text-4xl md:text-5xl mb-4 font-serif font-bold text-[var(--color-gold)] neon-text">Sponsors</h2>
                <div className="h-1 w-24 bg-[var(--color-gold)] mx-auto opacity-70" />
            </div>

            <div className="flex relative mask-gradient">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10" />

                <motion.div
                    className="flex gap-16 whitespace-nowrap"
                    animate={{ x: [0, -1920] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear"
                    }}
                >
                    {[...sponsors, ...sponsors, ...sponsors].map((_, index) => (
                        <div key={index} className="flex items-center justify-center min-w-[250px] h-[160px] grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                            <div className="w-[250px] h-[140px] bg-[var(--color-surface)] border border-[var(--color-slate)] flex items-center justify-center rounded-md hover:border-[var(--color-gold)] transition-colors">
                                <span className="text-[var(--color-text-muted)] text-lg uppercase tracking-widest">Logo Here</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Sponsors;
