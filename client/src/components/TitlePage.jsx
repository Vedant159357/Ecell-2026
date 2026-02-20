import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { client, urlFor } from "@/lib/sanity";
import hero from "../assets/hero.avif";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 500, default: 200 }, // Lighter range for subtitle
  title: { min: 400, max: 900, default: 700 },   // Bold range for main title
};

const renderText = (text, className, baseWeight = 400) => {
  if (!text) return null;
  const words = text.split(" ");
  return words.map((word, wIdx) => (
    <span key={wIdx} className="inline-flex whitespace-nowrap gap-x-0.5 md:gap-x-1">
      {[...word].map((char, i) => (
        <span
          key={`${wIdx}-${i}`}
          className={`${className} inline-block transition-colors duration-200 char`}
          style={{
            fontVariationSettings: `'wght' ${baseWeight}`,
            display: 'inline-block',
          }}
        >
          {char}
        </span>
      ))}
      {wIdx !== words.length - 1 && (
        <span
          className={`${className} inline-block transition-colors duration-200 char`}
          style={{
            fontVariationSettings: `'wght' ${baseWeight}`,
            display: 'inline-block',
            width: '0.3em'
          }}
        >
          &nbsp;
        </span>
      )}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => { };

  const letters = container.querySelectorAll("span.char");

  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetters = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${Math.max(min, Math.min(max, weight))}`, // Clamp value
    });
  };

  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      // Calculate distance from mouse to center of the letter
      // The container-relative left position of the letter is l - rect.left
      const letterCenterX = (l - rect.left) + w / 2;
      const distance = Math.abs(mouseX - letterCenterX);

      // Adjust the sensitivity (denominator) as needed. 
      // User code had 2000, which is quite sensitive.
      // Larger denominator = wider spread of effect.
      const intensity = Math.exp(-(distance ** 2) / 2500);

      const targetWeight = base + (max - base) * intensity; // Interpolate from base towards max
      // If we want it to go from min to max based on intensity (where base is usually min):
      // const targetWeight = min + (max - min) * intensity; 

      // However, if base is default (e.g. 700) and we want it to go to 900 or 400?
      // User code: min + (max - min) * intensity. This implies at 0 intensity (far away), weight is min.
      // But we want it to return to 'base' (default) when far away.
      // If base == min, then user code is correct.
      // Let's assume default is the resting state.

      // Let's stick to user logic: animate to min + range * intensity
      // BUT renderText sets initial style to baseWeight.
      // So resting state should be baseWeight.
      // If default != min, user code might jump. 

      // Let's adjust:
      // We want to interpolate between `base` and `max` (or `min` if we want to go thinner).
      // Assuming we want to get BOLDER on hover (standard effect):
      // resting = base
      // hover peak = max

      // If we use the user's setupTextHover logic exactly:
      // animateLetters(letter, min + (max - min) * intensity);
      // This means resting state is implicitly `min` (when intensity is near 0).
      // handleMouseLeave animates back to `base`.

      // So if base != min, there will be a jump or shift when mouse enters.
      // I will set min = base for simplicity in FONT_WEIGHTS for now, or just use user logic.
      // User config: subtitle: { min: 100, max: 400, default: 100 } -> base=min.
      // title: { min: 400, max: 900, default: 400 } -> base=min.
      // So I will align my FONT_WEIGHTS similarly.

      animateLetters(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetters(letter, base, 0.3));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

export default function TitlePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  // Replace this URL with your imported image variable
  // const bgImage = backgroundImage; // Use this if importing locally
  const bgImage = heroData?.backgroundImage ? urlFor(heroData.backgroundImage).url() : hero; // Current fallback

  useGSAP(() => {
    // Only set up if we have data or fallback (which we always render)
    // We need to wait for loading to finish if we want to attach to the final DOM elements?
    // Actually, the refs are attached to the elements which are rendered conditionally or always.
    // The hero title logic switches between heroData.title and default.
    // We should make sure refs are attached to the rendered elements.

    // Since we output the refs on the container of the text, safe to run.
    // But if data loads later, the content changes. The refs persist on the container 
    // but the spans inside might change (re-render).
    // setupTextHover queries spans once on mount. If content changes, we need to re-run.
    // So include heroData in dependencies.

    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      subtitleCleanup();
      titleCleanup();
    };
  }, [heroData, loading]); // wrapper dependency

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const fetchHeroData = async () => {
      try {
        const query = '*[_type == "siteSettings"][0].hero';
        const data = await client.fetch(query);
        if (data) {
          setHeroData(data);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    fetchHeroData();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Text content to render
  const mainTitle = heroData?.title || "Entrepreneurship Cell";
  const subTitle = heroData?.subtitle || "SKNCOE Pune";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #434343 100%)'
      }}
    >
      {/* Background image with minimal opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${bgImage}")`,
          opacity: 0.08
        }}
      ></div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Mouse spotlight effect */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 25%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full">
        <h3 className="text-gray-300 tracking-widest uppercase mb-6 animate-fade-in text-sm md:text-base">
          {heroData?.tagline || "Dream. Discover. Disrupt."}
        </h3>

        {/* GSAP Hover Effect Title */}
        <div className="flex flex-col items-center justify-center mb-10 overflow-visible">

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 cursor-default flex flex-wrap justify-center gap-x-0.5 md:gap-x-1"
            aria-label={mainTitle}
          >
            {renderText(mainTitle, "hover:text-gray-100", FONT_WEIGHTS.title.default)}
          </h1>

          {/* Subtitle */}
          <h2
            ref={subtitleRef}
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white cursor-default flex flex-wrap justify-center gap-x-0.5 md:gap-x-1 mt-2"
            aria-label={subTitle}
          >
            {renderText(subTitle, "", FONT_WEIGHTS.subtitle.default)}
          </h2>

        </div>

        <div className="animate-fade-in-delay">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/econclave"
              className="inline-block bg-yellow-500/20 text-yellow-100 border border-yellow-500/30 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500/30 hover:scale-105 hover:shadow-lg transition-all backdrop-blur-sm"
            >
              E-Conclave
            </a>
            <a
              href="/ideathon"
              className="inline-block bg-red-600/20 text-red-100 border border-red-600/30 px-8 py-3 rounded-full font-semibold hover:bg-red-600/30 hover:scale-105 hover:shadow-lg transition-all backdrop-blur-sm"
            >
              Ideathon
            </a>
            <a
              href="/internship-fair"
              className="inline-block bg-blue-600/20 text-blue-100 border border-blue-600/30 px-8 py-3 rounded-full font-semibold hover:bg-blue-600/30 hover:scale-105 hover:shadow-lg transition-all backdrop-blur-sm"
            >
              Internship Fair
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" className="text-gray-300 text-center hover:text-white transition-colors">
          <span className="block text-xs mb-2 font-medium">Scroll Down</span>
          <ChevronDown size={26} className="mx-auto" />
        </a>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
      `}</style>
    </section>
  );
}
