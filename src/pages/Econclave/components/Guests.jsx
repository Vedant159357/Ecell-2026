import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const guests = [1, 2, 3];

const GuestCard = ({ index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative"
        >
            <div className="relative overflow-hidden bg-[#121212] border border-white/10 hover:border-[var(--color-gold)] transition-colors duration-500 h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-5 group-hover:opacity-10 transition-opacity duration-500" />

                <h3 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-text-muted)] group-hover:text-[var(--color-gold)] transition-colors duration-300 text-center px-4">
                    Revealing Soon
                </h3>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 z-20 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="text-[var(--color-gold)]" size={24} />
                </div>
            </div>
        </motion.div>
    );
};

const Guests = () => {
    return (
        <section className="section-padding bg-[var(--color-bg)] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-gold)] opacity-[0.02] blur-[150px] pointer-events-none" />

            <div className="container relative z-10">
                <div className="mb-20 text-center">
                    <h2 className="text-5xl md:text-6xl mb-6 font-serif text-[var(--color-gold)] neon-text">Current Guests</h2>
                    <div className="h-1 w-32 bg-[var(--color-gold)] mx-auto mb-6 opacity-70" />
                    <p className="text-[var(--color-text-muted)] text-lg tracking-wide max-w-2xl mx-auto">
                        The name’s not on the wall yet. But trust me — it’s worth the wait.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {guests.map((_, index) => (
                        <GuestCard key={index} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Guests;
