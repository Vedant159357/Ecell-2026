const Contact = () => {
    return (
        <section className="section-padding bg-[#050505] text-center border-t border-[var(--color-surface)]">
            <div className="container max-w-2xl">
                <h2 className="text-4xl md:text-6xl mb-8 text-[var(--color-gold)] neon-text">Let’s Talk Business</h2>
                <p className="text-xl text-[var(--color-text-muted)] mb-12">
                    Opportunities don't come knocking. You build a door.
                </p>

                <a
                    href="mailto:contact@econclave.com"
                    className="inline-block px-10 py-4 border border-[var(--color-gold)] text-[var(--color-gold)] font-bold tracking-widest hover:bg-[var(--color-gold)] hover:text-[var(--color-bg)] transition-all duration-300"
                >
                    GET IN TOUCH
                </a>
            </div>
        </section>
    );
};

export default Contact;
