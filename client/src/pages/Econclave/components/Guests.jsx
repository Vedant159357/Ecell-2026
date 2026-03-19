import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

const guests = [
    { name: "CEO Panel", image: "/Econclave-2026/ceo panel.jpeg" },
    { name: "Ashish Bharatvanshi", image: "/Econclave-2026/Ashish Bharatvanshi.png" },
    { name: "Arjun Pandey", image: "/Econclave-2026/arjun pandey.jpeg" },
    { name: "Marathi Legends Panel", image: "/Econclave-2026/marathi legendsi.jpeg" },
    { name: "Rohit Raut", image: "/Econclave-2026/rohit raut.png" }
];

const GuestCard = ({ guest, index }) => {
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
            className={`group relative col-span-1 md:col-span-2 ${index === 4 ? "md:col-start-2 lg:col-start-auto" : ""} ${index === 3 ? "lg:col-start-2" : ""}`}
        >
            <div className="relative overflow-hidden rounded-xl border border-white/10 hover:border-[var(--color-gold)] transition-colors duration-500 h-[400px] flex items-center justify-center bg-black">
                
                {/* Image Background */}
                <img
                    src={guest.image}
                    alt={guest.name}
                    className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105 ${guest.name.includes("Marathi") ? "object-contain" : "object-cover"}`}
                />

                {/* Gradient Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                {/* Guest Name */}
                <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:text-[var(--color-gold)] transition-colors duration-300">
                        {guest.name}
                    </h3>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 -translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0">
                    <ArrowUpRight className="text-[var(--color-gold)]" size={28} />
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
                        Presenting our incredible lineup of visionaries and legends.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {guests.map((guest, index) => (
                        <GuestCard key={index} guest={guest} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Guests;
