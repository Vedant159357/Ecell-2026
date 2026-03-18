import { motion } from 'framer-motion';

const sponsors = [
    "/Econclave-2026/ASHTAPAILU.jpeg",
    "/Econclave-2026/Alpha.jpeg",
    "/Econclave-2026/B Square Prints & Gifts.jpeg",
    "/Econclave-2026/ClintHunt SkiLiX.jpeg",
    "/Econclave-2026/Elements Decor.jpeg",
    "/Econclave-2026/GymKhana Kothrud.jpeg",
    "/Econclave-2026/MITCON.jpeg",
    "/Econclave-2026/Mahatma Gandhi Cancer Hospital.jpeg",
    "/Econclave-2026/Pops Kitchen.jpeg",
    "/Econclave-2026/SFL.jpeg",
    "/Econclave-2026/Sinhgad Sports Association.jpeg",
    "/Econclave-2026/Unique Trading.jpeg",
    "/Econclave-2026/Vyapar Sankool.jpeg",
    "/Econclave-2026/Wet n Joy.jpeg",
    "/Econclave-2026/Z+ Security.jpeg"
];

const Sponsors = () => {
    return (
        <section className="pt-10 pb-20 md:pt-20 md:pb-40 bg-[var(--color-bg)] border-y border-[var(--color-surface)] overflow-hidden">
            <div className="container mb-12 text-center">
                <h2 className="text-4xl md:text-5xl mb-4 font-serif font-bold text-[var(--color-gold)] neon-text">Sponsors</h2>
                <div className="h-1 w-24 bg-[var(--color-gold)] mx-auto opacity-70" />
            </div>

            <div className="flex relative mask-gradient">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10" />

                    <motion.div
                        className="flex gap-16 whitespace-nowrap"
                        animate={{ x: [0, -6960] }} // 15 items * (400px width + 64px gap) = 6960px exact seamless loop
                        transition={{
                            repeat: Infinity,
                            duration: 65,
                            ease: "linear"
                        }}
                    >
                        {[...sponsors, ...sponsors, ...sponsors].map((sponsorImg, index) => (
                            <div key={index} className="flex items-center justify-center min-w-[400px] h-[260px] transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-[1.03]">
                                <div className="w-[400px] h-[240px] bg-[var(--color-surface)] border border-[var(--color-slate)] overflow-hidden flex items-center justify-center rounded-xl hover:border-[var(--color-gold)] hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all p-6">
                                    <img src={sponsorImg} alt={`E-Conclave Sponsor ${index}`} className="w-full h-full object-contain" loading="lazy" />
                                </div>
                            </div>
                        ))}
                    </motion.div>
            </div>
        </section>
    );
};

export default Sponsors;
