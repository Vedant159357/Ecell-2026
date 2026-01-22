import { useEffect, useState } from "react";

const words = ["Dream.", "Discover.", "Disrupt."];

// ============================================
// LOADER COMPONENT (Original - No changes)
// ============================================
export default function StartupLoader({ onComplete }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    if (currentWord < words.length - 1) {
      const timer = setTimeout(() => {
        setCurrentWord((prev) => prev + 1);
      }, 1200);

      return () => clearTimeout(timer);
    } else {
      // After last word → slide loader away
      const exitTimer = setTimeout(() => {
        setExit(true);
      }, 1200);

      const completeTimer = setTimeout(() => {
        onComplete();
      }, 2000);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [currentWord, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center
        transition-transform duration-1000 ease-in-out
        ${exit ? "-translate-y-full" : "translate-y-0"}`}
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #434343 100%)'
      }}
    >
      <h1
        key={currentWord}
        className="
          font-extrabold tracking-wide text-center
          transition-all duration-700 ease-in-out
          text-transparent bg-clip-text
          bg-gradient-to-r from-gray-600 via-gray-400 to-gray-200

          text-5xl
          sm:text-6xl
          md:text-7xl
          lg:text-8xl
          xl:text-9xl
        "
      >
        {words[currentWord]}
      </h1>
    </div>
  );
}

// ============================================
// BLINKING BULB COMPONENT (Use anywhere in website)
// Usage: <BlinkingBulb />
// ============================================
export function BlinkingBulb() {
  return (
    <div className="relative inline-block">
      {/* Glow effect */}
      <div className="absolute inset-0 animate-pulse">
        <div className="w-32 h-32 bg-[#434343]/40 rounded-full blur-3xl"></div>
      </div>
      
      {/* Bulb SVG */}
      <div className="relative">
        <svg
          width="128"
          height="128"
          viewBox="0 0 100 100"
          className="animate-blink"
        >
          {/* Bulb Shape */}
          <ellipse
            cx="50"
            cy="35"
            rx="22"
            ry="28"
            fill="currentColor"
            className="text-gray-300 transition-colors duration-300"
          />
          
          {/* Inner glow */}
          <ellipse
            cx="50"
            cy="32"
            rx="16"
            ry="20"
            fill="currentColor"
            className="text-white/30"
          />
          
          {/* Bulb Base */}
          <rect
            x="44"
            y="58"
            width="12"
            height="10"
            fill="currentColor"
            className="text-[#434343]"
          />
          <rect
            x="42"
            y="68"
            width="16"
            height="4"
            fill="currentColor"
            className="text-gray-600"
          />
          <rect
            x="42"
            y="73"
            width="16"
            height="4"
            fill="currentColor"
            className="text-gray-600"
          />
          <rect
            x="42"
            y="78"
            width="16"
            height="4"
            fill="currentColor"
            className="text-gray-700"
          />
          
          {/* Light rays */}
          <g className="opacity-70">
            <line x1="50" y1="8" x2="50" y2="2" stroke="currentColor" strokeWidth="3" className="text-gray-400" />
            <line x1="73" y1="14" x2="78" y2="9" stroke="currentColor" strokeWidth="3" className="text-gray-400" />
            <line x1="27" y1="14" x2="22" y2="9" stroke="currentColor" strokeWidth="3" className="text-gray-400" />
            <line x1="82" y1="35" x2="88" y2="35" stroke="currentColor" strokeWidth="3" className="text-gray-400" />
            <line x1="18" y1="35" x2="12" y2="35" stroke="currentColor" strokeWidth="3" className="text-gray-400" />
            <line x1="73" y1="56" x2="78" y2="61" stroke="currentColor" strokeWidth="3" className="text-gray-400" />
            <line x1="27" y1="56" x2="22" y2="61" stroke="currentColor" strokeWidth="3" className="text-gray-400" />
          </g>
        </svg>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
        }

        .animate-blink {
          animation: blink 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}