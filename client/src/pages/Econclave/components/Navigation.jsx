import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { title: "Home", href: "#hero" },
    { title: "About", href: "#about" },
    { title: "Current Guests", href: "#guests" },
    { title: "Schedule", href: "#events" },
    { title: "Past Guests", href: "#speakers" },
    { title: "Sponsors", href: "#sponsors" },
    { title: "Contact", href: "#contact" },
];

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Menu Button */}
            <button
                onClick={toggleMenu}
                className="fixed top-8 left-8 z-50 flex flex-col gap-1.5 p-4 mix-blend-difference cursor-pointer group"
            >
                <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8 group-hover:w-10'}`} />
                <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-6 group-hover:w-10'}`} />
                <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-4 group-hover:w-10'}`} />
                <span className="sr-only">Menu</span>
            </button>

            {/* Back to Ecell Button */}
            <Link
                to="/"
                className="fixed top-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-32 z-50 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium hover:bg-white hover:text-black transition-all duration-300 mix-blend-difference"
            >
                Ecell
            </Link>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex items-center justify-center"
                    >
                        <nav className="flex flex-col items-center gap-6">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.title}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="text-3xl md:text-6xl font-serif font-bold text-white hover:text-[var(--color-gold)] transition-colors tracking-tight"
                                >
                                    {item.title}
                                </motion.a>
                            ))}
                        </nav>

                        {/* Decorative Elements */}
                        <div className="absolute bottom-10 left-0 w-full text-center">
                            <p className="text-[var(--color-slate)] text-xs uppercase tracking-[0.3em]">
                                E-Conclave • 10th Edition
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
