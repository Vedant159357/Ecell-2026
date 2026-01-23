import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation } from "lucide-react";

export default function Venue() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="venue" ref={ref} className="py-24 bg-black relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="max-w-7xl mx-auto px-12 md:px-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="flex flex-col md:flex-row gap-16 items-center"
                >
                    {/* Visual/Map Placeholder */}
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-video bg-[#1a1a1a] border border-white/10 p-2 group overflow-hidden">
                            {/* Map Overlay */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.5761897254206!2d73.83182367503796!3d18.45754208262334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2953272d561a9%3A0x779b062970d4737a!2sSmt.%20Kashibai%20Navale%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1709664583214!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            ></iframe>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#ED1C24]" />
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#ED1C24]" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#ED1C24]" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#ED1C24]" />
                        </div>
                    </div>

                    {/* Venue Details */}
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-1 bg-[#ED1C24]" />
                            <h2 className="text-white text-sm font-black tracking-[0.5em] uppercase">The Location</h2>
                        </div>

                        <h3 className="suits-title text-white mb-8">
                            THE <span className="text-[#ED1C24]">VENUE</span>
                        </h3>

                        <div className="space-y-8">
                            <div>
                                <h4 className="flex items-center gap-3 text-white text-xl font-bold uppercase mb-2">
                                    <MapPin className="text-[#ED1C24] w-6 h-6" />
                                    Address
                                </h4>
                                <p className="text-white/60 font-light leading-relaxed pl-9">
                                    Smt. Kashibai Navale College of Engineering (New Building),<br />
                                    Vadgaon (Bk.), Sinhgad Road,<br />
                                    Pune – 411041
                                </p>
                            </div>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Smt.+Kashibai+Navale+College+of+Engineering+Vadgaon+Bk+Pune"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:bg-[#ED1C24] hover:border-[#ED1C24] transition-all group"
                            >
                                <Navigation className="w-5 h-5 text-[#ED1C24] group-hover:text-white" />
                                <span className="text-white font-bold uppercase tracking-widest text-sm">Get Directions</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
