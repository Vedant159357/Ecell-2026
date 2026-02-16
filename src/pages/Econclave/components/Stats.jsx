import { motion, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const StatItem = ({ value, label, suffix = "+" }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    // Simple counter animation
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = parseInt(value);
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [inView, value]);

    return (
        <div ref={ref} className="text-center p-6 border border-[var(--color-surface)] bg-[var(--color-bg)] hover:border-[var(--color-gold)] transition-colors duration-300">
            <div className="text-4xl md:text-6xl font-bold text-[var(--color-gold)] mb-2 font-serif">
                {count}{suffix}
            </div>
            <div className="text-sm uppercase tracking-widest text-[var(--color-slate)] font-semibold">
                {label}
            </div>
        </div>
    );
};

const Stats = () => {
    return (
        <section className="pb-24 pt-12 bg-[var(--color-bg)]">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <StatItem value="10000" label="Attendees" />
                    <StatItem value="50" label="Speakers" />
                    <StatItem value="10" label="Years of Legacy" suffix="" />
                    <StatItem value="25" label="National Events" />
                </div>
            </div>
        </section>
    );
};

export default Stats;
