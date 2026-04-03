import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const SubscriptionPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show popup shortly after mount
        const showTimer = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        // Hide popup after 10 seconds of being visible (10.5 seconds total)
        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 10500);

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -50, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, y: 20, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-6 left-6 z-[100] max-w-[340px] w-[calc(100%-3rem)] bg-black/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                        <a
                            href="https://thesubscription.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-[30px] h-[30px]"
                            >
                                <path d="M5 15V7L11 4H18L26 12V16H22L15 9H12L8 11V15H5Z" fill="white" />
                                <path d="M27 17V25L21 28H14L6 20V16H10L17 23H20L24 21V17H27Z" fill="white" />
                            </svg>
                            <span className="text-white font-sans text-[13px] md:text-[15px] tracking-[0.2em] font-medium whitespace-nowrap pt-[3px]">
                                THE SUBSCRIPTION
                            </span>
                        </a>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors ml-4"
                            aria-label="Close"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Content */}
                    <p className="text-gray-300 text-sm leading-relaxed mt-4 font-sans tracking-wide font-light">
                        a subscription management platform that allows you to share subscriptions efficiently with friends and family.
                    </p>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SubscriptionPopup;
