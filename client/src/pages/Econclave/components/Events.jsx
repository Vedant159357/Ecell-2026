import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import scheduleBg from '../assets/schedule-bg.png';

const day1Events = [
    { time: "09:30 AM", title: "EVALUATION ROUND", location: "Auditorium", description: "Panel evaluations and technical assessment." },
    { time: "01:00 PM", title: "LUNCH BREAK", location: "Banquet", description: "Networking lunch for all participants." },
    { time: "02:30 PM", title: "FINAL PRESENTATIONS", location: "Auditorium", description: "Main stage pitches by finalists." },
];

const day2Events = [
    { time: "10:00 AM", title: "Startup Pitching: Round 1", location: "Hub", description: "20 Startups. 3 Minutes Each." },
    { time: "01:00 PM", title: "Lunch Break", location: "Banquet", description: "Networking & Refreshments" },
    { time: "02:30 PM", title: "The Final Showdown", location: "Auditorium", description: "Top 5 Startups Battle for Glory" },
    { time: "05:00 PM", title: "Valedictory & Awards", location: "Auditorium", description: "Closing Ceremony & Prize Distribution" }
];

const ChequeCard = ({ event, index, day }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const [isFlipped, setIsFlipped] = useState(false);

    // Additional details mapping for Day 2 events or general use
    const details = {
        "Startup Pitching: Round 1": "Watch 20 exciting startups pitch their innovative ideas in a rapid-fire round. Each startup gets 3 minutes to impress the judges.",
        "Lunch Break": "Enjoy a delicious networking lunch with fellow attendees, speakers, and industry leaders at the Banquet hall.",
        "The Final Showdown": "The top 5 finalists from the pitching rounds battle it out for the grand prize. High stakes, high energy!",
        "Valedictory & Awards": "Celebrate the winners and innovative spirits. Closing remarks by distinguished guests and prize distribution.",
        "Startup Expo": "Explore a vibrant marketplace of innovation. Interact with founders, see product demos, and network with 50+ startups showcasing their solutions.",
        "Internship Fair": "Kickstart your career with a structured interview process! Connect with top companies and startups hiring for various roles. The fair includes resume screening, technical/HR rounds, and potential on-spot offers. Bring your resume and your A-game.",
        "Econclave Main Event": "The grand finale of Econclave featuring keynote speakers, panel discussions, and the culmination of the summit's competitions."
    };

    const eventDetail = details[event.title] || "Join us for this exciting event. More details coming soon.";


    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="w-full perspective-1000"
            style={{ perspective: '1000px' }}
        >
            <div
                className={`relative w-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* --- FRONT FACE --- */}
                <div
                    className="relative w-full bg-[#1a1a1a] border border-[var(--color-gold)] p-6 md:p-8 rounded-sm shadow-2xl backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                >

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{ backgroundImage: `radial-gradient(circle at center, #d4af37 1px, transparent 1px)`, backgroundSize: '15px 15px' }}
                    />

                    {/* Watermark */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[6rem] font-serif font-bold text-[var(--color-gold)] opacity-5 pointer-events-none select-none">
                        {day}-{index + 1}
                    </div>

                    {/* Top Row: Date/Time only */}
                    <div className="flex justify-end items-start mb-6 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-2">
                            <div className="border-b border-[var(--color-text-muted)] w-24 text-center pb-1">
                                <span className="font-mono text-[var(--color-gold)] text-lg font-bold">{event.time}</span>
                            </div>
                        </div>
                    </div>

                    {/* Middle Row: Pay To & Amount */}
                    <div className="flex flex-col gap-6 mb-8">
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[var(--color-slate)] text-[10px] font-bold whitespace-nowrap tracking-wider">PAY TO THE EVENT OF</span>
                                <div className="border-b border-[var(--color-text-muted)] relative pb-1">
                                    <span className="text-3xl font-serif font-bold text-white group-hover:text-[var(--color-gold)] transition-colors">
                                        {event.title}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-[var(--color-slate)] text-[10px] font-bold whitespace-nowrap tracking-wider">THE SUM OF</span>
                                <div className="border-b border-[var(--color-text-muted)] relative pb-1">
                                    <span className="text-sm font-mono text-[var(--color-text-muted)] uppercase">
                                        {event.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* More Info Button - Only for Day 2 */}
                        {day === '02' && (
                            <div className="flex justify-start">
                                <button
                                    onClick={() => setIsFlipped(true)}
                                    className="text-[var(--color-gold)] text-xs font-bold uppercase tracking-widest border border-[var(--color-gold)] px-3 py-1 hover:bg-[var(--color-gold)] hover:text-black transition-colors cursor-pointer z-20"
                                >
                                    + More info
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Bottom Row: Memo & Signature */}
                    <div className="flex justify-between items-end mt-2">
                        <div className="w-1/2">
                            <span className="text-[var(--color-slate)] text-[10px] font-bold uppercase tracking-wider">LOCATION</span>
                            <div className="border-b border-[var(--color-text-muted)] w-full mt-1 pb-1">
                                <span className="font-mono text-base text-white">{event.location}</span>
                            </div>
                        </div>

                        <div className="w-1/3 text-right relative">
                            <div className="absolute bottom-2 right-2 w-full text-center pointer-events-none">
                                <span className="text-2xl text-[var(--color-gold)] opacity-80 rotate-[-5deg] inline-block" style={{ fontFamily: "'Great Vibes', cursive" }}>
                                    ecell skncoe
                                </span>
                            </div>
                            <div className="border-b border-[var(--color-gold)] w-full mt-8" />
                            <span className="text-[var(--color-slate)] text-[10px] font-bold uppercase mt-1 inline-block tracking-wider">AUTHORIZED SIGNATURE</span>
                        </div>
                    </div>

                </div>

                {/* --- BACK FACE --- */}
                <div
                    className="absolute inset-0 w-full h-full bg-[#111] border border-[var(--color-gold)] p-8 rounded-sm shadow-2xl rotate-y-180 backface-hidden flex flex-col justify-between"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{ backgroundImage: `radial-gradient(circle at center, #d4af37 1px, transparent 1px)`, backgroundSize: '15px 15px' }}
                    />

                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <h4 className="text-2xl font-serif text-[var(--color-gold)]">{event.title}</h4>
                            <span className="font-mono text-[var(--color-text-muted)] text-sm">{event.time}</span>
                        </div>

                        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                            <p className="text-[var(--color-text-muted)] leading-relaxed text-sm md:text-base">
                                {eventDetail}
                            </p>
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-[var(--color-gold)] text-xs font-bold uppercase tracking-wider w-20">Location:</span>
                                    <span className="text-white text-sm">{event.location}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[var(--color-gold)] text-xs font-bold uppercase tracking-wider w-20">Type:</span>
                                    <span className="text-white text-sm">Offline Event</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setIsFlipped(false)}
                                className="text-white text-xs font-bold uppercase tracking-widest hover:text-[var(--color-gold)] transition-colors flex items-center gap-2 group cursor-pointer"
                            >
                                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Events = () => {
    return (
        <section
            className="section-padding relative overflow-hidden"
            style={{
                backgroundImage: `url(${scheduleBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/70 pointer-events-none" />

            <div className="container relative z-10">
                <div className="mb-20 text-center">
                    <h2 className="text-5xl md:text-6xl mb-6 font-serif text-[var(--color-gold)] neon-text">The Schedule</h2>
                    <div className="h-1 w-32 bg-[var(--color-gold)] mx-auto mb-6 opacity-70" />
                    <p className="text-[var(--color-text-muted)] text-lg tracking-wide">Cheques Issued by E-Conclave Bank</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Day 1 Column */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center justify-center mb-4">
                            <div className="flex items-center justify-center">
                                <div className="h-[1px] bg-[var(--color-gold)] w-12 opacity-50"></div>
                                <h3 className="text-3xl font-serif text-[var(--color-gold)] mx-6">Day 01</h3>
                                <div className="h-[1px] bg-[var(--color-gold)] w-12 opacity-50"></div>
                            </div>
                            <span className="text-[var(--color-text-muted)] text-xl font-serif mt-2">Ideathon</span>
                        </div>
                        {day1Events.map((event, index) => (
                            <ChequeCard key={`day1-${index}`} event={event} index={index} day="01" />
                        ))}
                    </div>

                    {/* Day 2 Column */}
                    <div className="flex flex-col gap-6 relative">
                        <div className="flex items-center justify-center mb-4 relative z-10">
                            <div className="h-[1px] bg-[var(--color-gold)] w-12 opacity-50"></div>
                            <h3 className="text-3xl font-serif text-[var(--color-gold)] mx-6">Day 02</h3>
                            <div className="h-[1px] bg-[var(--color-gold)] w-12 opacity-50"></div>
                        </div>

                        {/* Tree Structure Container */}
                        <div className="relative flex flex-col items-center">
                            {/* Vertical line from Day 2 header */}
                            <div className="hidden md:block w-[1px] h-8 bg-[var(--color-gold)] opacity-50 absolute -top-6 left-1/2 -translate-x-1/2"></div>

                            {/* Horizontal branching line */}
                            <div className="hidden md:block w-[50%] h-[1px] bg-[var(--color-gold)] opacity-50 mb-8 relative">
                                {/* Vertical lines down to parallel events */}
                                <div className="absolute left-0 top-0 w-[1px] h-8 bg-[var(--color-gold)] opacity-50"></div>
                                <div className="absolute right-0 top-0 w-[1px] h-8 bg-[var(--color-gold)] opacity-50"></div>
                            </div>

                            {/* Parallel Events Row */}
                            <div className="flex flex-col md:flex-row gap-6 w-full mb-8 relative">
                                <div className="w-full md:w-1/2">
                                    <ChequeCard
                                        event={{
                                            time: "09:00 AM - 04:00 PM",
                                            title: "Startup Expo",
                                            location: "Hub",
                                            description: "Showcase of Innovative Startups"
                                        }}
                                        index={0}
                                        day="02"
                                    />
                                    {/* Vertical line down from Startup Expo (Desktop) */}
                                    <div className="hidden md:block w-[1px] h-8 bg-[var(--color-gold)] opacity-50 mx-auto mt-0"></div>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <ChequeCard
                                        event={{
                                            time: "09:00 AM - 04:00 PM",
                                            title: "Internship Fair",
                                            location: "Banquet",
                                            description: "Connect with Top Companies"
                                        }}
                                        index={1}
                                        day="02"
                                    />
                                    {/* Vertical line down from Internship Fair (Desktop) */}
                                    <div className="hidden md:block w-[1px] h-8 bg-[var(--color-gold)] opacity-50 mx-auto mt-0"></div>
                                </div>
                            </div>

                            {/* Horizontal combining line (Desktop only) */}
                            <div className="hidden md:block w-[50%] h-[1px] bg-[var(--color-gold)] opacity-50 mb-0 relative">
                                {/* Vertical line down to final event */}
                                <div className="absolute left-1/2 top-0 w-[1px] h-8 bg-[var(--color-gold)] opacity-50 -translate-x-1/2"></div>
                            </div>

                            {/* Final Event */}
                            <div className="w-full mt-8 md:mt-0">
                                <ChequeCard
                                    event={{
                                        time: "04:00 PM - 09:00 PM",
                                        title: "Econclave Main Event",
                                        location: "Auditorium",
                                        description: "Closing Ceremony & Prize Distribution"
                                    }}
                                    index={2}
                                    day="02"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Events;
