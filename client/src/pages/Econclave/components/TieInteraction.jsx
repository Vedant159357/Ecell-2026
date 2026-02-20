import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const TieInteraction = () => {
    const { cycleTheme } = useTheme();
    const controls = useAnimation();
    const y = useMotionValue(0);
    const stretch = useTransform(y, [0, 200], [1, 1.05]);

    // Gloss/Sheen effect that moves as you pull
    const sheenY = useTransform(y, [0, 200], ["0%", "100%"]);

    const handleDragEnd = async (event, info) => {
        const threshold = 80;
        if (info.offset.y > threshold) {
            cycleTheme();
        }

        controls.start({
            y: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 1.2
            }
        });
    };

    return (
        <div className="absolute -top-2 right-6 md:right-16 z-50 flex flex-col items-center scale-75 md:scale-100 origin-top">

            {/* The Knot (Anchored at the top) */}
            <div className="relative z-20" style={{ filter: 'drop-shadow(0 0 8px var(--color-gold))' }}>
                <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Knot Shape */}
                    <path
                        d="M4 0H36L30 30C30 32 28 34 26 34H14C12 34 10 32 10 30L4 0Z"
                        fill="url(#knot-gradient)"
                        className="transition-all duration-500"
                    />
                    <defs>
                        <linearGradient id="knot-gradient" x1="20" y1="0" x2="20" y2="34" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="var(--color-surface)" />
                            <stop offset="50%" stopColor="var(--color-bg)" />
                            <stop offset="100%" stopColor="var(--color-surface)" />
                        </linearGradient>
                    </defs>
                    {/* Knot Border/Detail */}
                    <path d="M4 0H36L30 30C30 32 28 34 26 34H14C12 34 10 32 10 30L4 0Z" stroke="var(--color-gold)" strokeOpacity="0.8" strokeWidth="1.5" />
                </svg>
            </div>

            {/* The Blade (Draggable Part) - Positioned slightly under the knot */}
            <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 200 }}
                dragElastic={0.08}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                animate={controls}
                style={{ y, scaleY: stretch, marginTop: -10, filter: 'drop-shadow(0 0 10px var(--color-gold))' }} // Negative margin to tuck under knot
                whileHover={{ cursor: "grab", filter: "drop-shadow(0 0 15px var(--color-gold)) brightness(1.2)" }}
                whileTap={{ cursor: "grabbing" }}
                className="relative z-10 origin-top touch-none"
            >
                <svg width="44" height="300" viewBox="0 0 44 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                    <defs>
                        <linearGradient id="tie-gradient" x1="22" y1="0" x2="22" y2="300" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="var(--color-surface)" />
                            <stop offset="100%" stopColor="var(--color-bg)" />
                        </linearGradient>
                        <linearGradient id="sheen-gradient" x1="0" y1="0" x2="44" y2="300" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                            <stop offset="40%" stopColor="rgba(255,255,255,0.02)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" /> {/* The sheen line */}
                            <stop offset="60%" stopColor="rgba(255,255,255,0.02)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                        <filter id="fabric-texture">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                            <feColorMatrix type="saturate" values="0" />
                            <feComponentTransfer><feFuncA type="linear" slope="0.1" /></feComponentTransfer>
                            <feComposite operator="in" in2="SourceGraphic" />
                        </filter>
                    </defs>

                    {/* Tie Blade Body */}
                    {/* Starts width of knot bottom (approx 20px), widens to ~40px, then point */}
                    <path
                        d="M12 2 L32 2 L40 240 L22 290 L4 240 L12 2 Z"
                        fill="url(#tie-gradient)"
                        stroke="var(--color-gold)"
                        strokeOpacity="0.2"
                        strokeWidth="0.5"
                    />

                    {/* Texture Overlay */}
                    <path d="M12 2 L32 2 L40 240 L22 290 L4 240 L12 2 Z" fill="var(--color-gold)" fillOpacity="0.03" style={{ filter: 'url(#fabric-texture)' }} />

                    {/* Dynamic Sheen Effect */}
                    <motion.path
                        d="M12 2 L32 2 L40 240 L22 290 L4 240 L12 2 Z"
                        fill="url(#sheen-gradient)"
                        style={{ y: sheenY }}
                    />

                </svg>
            </motion.div>
        </div>
    );
};

export default TieInteraction;
