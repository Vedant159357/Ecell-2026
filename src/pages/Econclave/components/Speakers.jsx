import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { client, urlFor } from "@/lib/sanity";

const Speakers = () => {
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                // Fetch all guests to ensure we can find the specific ones requested
                const query = '*[_type == "guest"]';
                const data = await client.fetch(query);

                if (data) {
                    // Find specific guests by name (case-insensitive)
                    const pranit = data.find(g => g.name && g.name.toLowerCase().includes("pranit"));
                    const ashish = data.find(g => g.name && g.name.toLowerCase().includes("ashish"));

                    // Filter out the specific guests to get the "others" list
                    const others = data.filter(g =>
                        (!g.name || !g.name.toLowerCase().includes("pranit")) &&
                        (!g.name || !g.name.toLowerCase().includes("ashish"))
                    );

                    const reorderedGuests = [];

                    // Position 1: Pranit
                    if (pranit) reorderedGuests.push(pranit);

                    // Position 2 & 3: Fill with others (need 2 spots filled before index 3/4th pos)
                    // Note: If Pranit is missing, we still fill from start. Loop condition handles logic dynamically.
                    let othersIndex = 0;

                    // We want Ashish at index 3 (4th item). So we need 3 items before him.
                    // If Pranit is there, we need 2 more. If Pranit is NOT there, we need 3 more.
                    // The target index for Ashish is 3.

                    while (reorderedGuests.length < 3 && othersIndex < others.length) {
                        reorderedGuests.push(others[othersIndex++]);
                    }

                    // Position 4: Ashish
                    if (ashish) reorderedGuests.push(ashish);

                    // Fill the rest until we have 6 guests
                    while (reorderedGuests.length < 6 && othersIndex < others.length) {
                        reorderedGuests.push(others[othersIndex++]);
                    }

                    setGuests(reorderedGuests);
                }
            } catch (error) {
                console.error("Error fetching guests:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGuests();
    }, []);

    return (
        <section className="section-padding bg-[var(--color-surface)]">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[var(--color-slate)] pb-6">
                    <h2 className="text-4xl md:text-5xl text-[var(--color-gold)] neon-text">Past Guests</h2>
                    <p className="text-[var(--color-text-muted)] mt-4 md:mt-0">Legends who have graced the floor.</p>
                </div>

                {loading ? (
                    <div className="text-center text-[var(--color-text-muted)] py-20">Loading guests...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guests.map((speaker, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="group relative overflow-hidden bg-[var(--color-bg)] max-w-xs mx-auto"
                            >
                                <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                    <img
                                        src={speaker.image && speaker.image.asset ? urlFor(speaker.image).url() : speaker.image}
                                        alt={speaker.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                                </div>

                                <div className="absolute bottom-0 left-0 w-full p-6 border-t border-[var(--color-gold)] transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                    <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
                                    <p className="text-[var(--color-gold)] text-sm uppercase tracking-wider">{speaker.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Speakers;
