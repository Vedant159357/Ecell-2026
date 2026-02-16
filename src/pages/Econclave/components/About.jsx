import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <section className="pt-24 pb-12 bg-[var(--color-bg)] relative" ref={ref}>
            <div className="container relative z-10">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <motion.div
                        className="md:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="border-l-4 border-[var(--color-gold)] pl-6">
                            <h2 className="text-4xl md:text-5xl mb-6 text-[var(--color-gold)] neon-text">About E-Conclave</h2>
                            <p className="text-lg text-[var(--color-text-muted)] mb-6">
                                E-Conclave is not just an event; it is a convergence of visionaries, disruptors, and leaders. For a decade, we have been the crucible where raw ideas are forged into industry-defining ventures.
                            </p>
                            <p className="text-lg text-[var(--color-text-muted)]">
                                Hosted by IIC E-Cell SKNCOE, this flagship event stands as a testament to the power of execution. We bring together the sharpest minds to challenge the status quo and redefine the future of business.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="md:w-1/2 flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Abstract visual representation instead of a generic image */}
                        <div className="relative w-full max-w-md aspect-square border border-[var(--color-slate)] p-8 rotate-3">
                            <div className="absolute inset-0 border border-[var(--color-gold)] opacity-30 -rotate-6" />
                            <div className="h-full w-full bg-[var(--color-navy)] flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
                                <span className="text-9xl font-serif text-[var(--color-bg)] opacity-20 font-bold select-none">10</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
