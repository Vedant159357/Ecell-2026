import { Mail, MapPin, Instagram, Linkedin, Twitter, Youtube, ArrowUpRight, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#050505] pt-0 pb-10 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-gold)] opacity-[0.03] blur-[100px] pointer-events-none" />

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 lg:mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-5 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                            E-Conclave<span className="text-[var(--color-gold)]">.</span>
                        </h2>
                        <p className="text-[var(--color-text-muted)] max-w-md text-lg leading-relaxed">
                            Where visionaries converge to redefine the future of business and innovation. Join the revolution.
                        </p>
                        <div className="pt-4">
                            <a
                                href="mailto:iicecellskncoe@gmail.com"
                                className="inline-flex items-center gap-3 px-6 py-3 border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black transition-all duration-300 group"
                            >
                                <Mail size={18} />
                                <span className="font-medium tracking-wide">Get in Touch</span>
                                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <h3 className="text-white font-serif text-xl tracking-wide border-l-2 border-[var(--color-gold)] pl-4">Contact Information</h3>
                        <div className="space-y-6 pl-4">
                            <div className="group flex items-start gap-4">
                                <div className="mt-1 p-2 rounded-full bg-white/5 group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors duration-300 text-[var(--color-gold)]">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--color-slate)] uppercase tracking-wider mb-1">Email Us</p>
                                    <a href="mailto:iicecellskncoe@gmail.com" className="text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors text-lg">
                                        iicecellskncoe@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="group flex items-start gap-4">
                                <div className="mt-1 p-2 rounded-full bg-white/5 group-hover:bg-[var(--color-gold)] group-hover:text-black transition-colors duration-300 text-[var(--color-gold)]">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-[var(--color-slate)] uppercase tracking-wider mb-1">Visit Us</p>
                                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                                        Smt. Kashibai Navale College of Engineering,<br />
                                        Vadgaon (Bk), Pune - 411041,<br />
                                        Maharashtra, India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="lg:col-span-3 space-y-8">
                        <h3 className="text-white font-serif text-xl tracking-wide border-l-2 border-[var(--color-gold)] pl-4">Follow Us</h3>
                        <div className="flex flex-col gap-4 pl-4">
                            {[
                                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/iic_ecellskncoe/" },
                                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/iic-ecell-skncoe-official/" },
                                { icon: Twitter, label: "Twitter (X)", href: "https://x.com/EcellSkncoe50" },
                                { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/channel/UCRQcbHIFApOqtkZ10PgggYA" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-transparent hover:border-[var(--color-gold)] transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <social.icon size={20} className="text-[var(--color-gold)] group-hover:scale-110 transition-transform" />
                                        <span className="text-[var(--color-text)] group-hover:text-white transition-colors">{social.label}</span>
                                    </div>
                                    <ArrowUpRight size={16} className="text-[var(--color-slate)] group-hover:text-[var(--color-gold)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-slate)]">
                    <p>&copy; {currentYear} E-Conclave. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
