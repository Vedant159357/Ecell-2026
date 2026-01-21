import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Linkedin, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { client, urlFor } from "@/lib/sanity";


// Team Member Card Component
const TeamCard = ({ member, isActive }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation for rotation
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseXPct = (e.clientX - rect.left) / width - 0.5;
    const mouseYPct = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPct);
    y.set(mouseYPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={false}
      animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.5 }}
      transition={{ duration: 0.5 }}
      style={{
        perspective: 1000,
      }}
      className="relative w-full h-[400px] md:h-[500px] cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#434343]/30 shadow-2xl overflow-hidden"
      >
        {/* Dynamic Spotlight Effect */}
        <motion.div
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(circle at ${x * 100 + 50}% ${y * 100 + 50}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
            ),
            transform: "translateZ(1px)"
          }}
          className="absolute inset-0 z-10 pointer-events-none"
        />

        {/* Image Container Floating in 3D */}
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          className="absolute inset-x-3 md:inset-x-4 top-3 md:top-4 h-[280px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg border-2 border-[#434343]/20"
        >
          <img
            src={member.image && member.image.asset ? urlFor(member.image).url() : member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent"></div>
        </motion.div>

        {/* Floating Badges & Content */}
        <motion.div
          style={{ transform: "translateZ(80px)" }}
          className="absolute bottom-0 left-0 right-0 p-6 z-20"
        >
          {/* Role Badge */}
          <div className="absolute top-[-25px] md:top-[-40px] left-4 md:left-6 flex items-center gap-2 bg-gradient-to-r from-[#434343]/90 to-[#666666]/90 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-xl border border-white/10">
            <Sparkles size={12} className="text-white md:size-[14px]" />
            <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-wider truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px]">
              {member.role}
            </span>
          </div>

          <h3 className="text-xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
            {member.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-1 bg-[#434343] rounded-full"></div>
              <div className="w-2 h-2 bg-[#434343]/50 rounded-full"></div>
            </div>

            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors backdrop-blur-sm border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin size={20} className="text-white" />
            </a>
          </div>
        </motion.div>


      </motion.div>
    </motion.div>
  );
};

// Main Carousel Component
export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const fetchGuests = async () => {
      try {
        const query = '*[_type == "guest"]';
        const data = await client.fetch(query);
        if (data) {
          setGuests(data);
        }
      } catch (error) {
        console.error("Error fetching guests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGuests();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || guests.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % guests.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, guests]);

  const goToNext = () => {
    if (guests.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % guests.length);
  };

  const goToPrevious = () => {
    if (guests.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + guests.length) % guests.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section
      className="relative min-h-screen py-20 px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #434343 100%)",
      }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-40 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-40 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
        >
          <div className="inline-block mb-4">
            <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
              Our
            </span>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-2"></div>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 relative inline-block">
            Guests
            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto"></p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {loading ? (
            <div className="text-center text-gray-400 py-20">Loading guests...</div>
          ) : guests.length > 0 ? (
            <>
              {/* Main Card Display with Side Arrows */}
              <div className="flex items-center justify-center mb-12">
                {/* Previous Card (Preview) - Hidden on smaller screens */}
                <div
                  className="hidden lg:block w-64 opacity-30 hover:opacity-50 transition-opacity cursor-pointer"
                  onClick={goToPrevious}
                >
                  <TeamCard
                    member={
                      guests[
                      (currentIndex - 1 + guests.length) % guests.length
                      ]
                    }
                    isActive={false}
                  />
                </div>

                {/* Left Arrow Button - Next to Current Card */}
                <button
                  onClick={goToPrevious}
                  className="bg-[#434343] hover:bg-[#666666] text-white p-2.5 md:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10 mx-2 md:mx-4"
                >
                  <ChevronLeft size={24} className="md:size-[28px]" />
                </button>

                {/* Current Card */}
                <div className="w-full max-w-[280px] md:max-w-sm">
                  <TeamCard member={guests[currentIndex]} isActive={true} />
                </div>

                {/* Right Arrow Button - Next to Current Card */}
                <button
                  onClick={goToNext}
                  className="bg-[#434343] hover:bg-[#666666] text-white p-2.5 md:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10 mx-2 md:mx-4"
                >
                  <ChevronRight size={24} className="md:size-[28px]" />
                </button>

                {/* Next Card (Preview) - Hidden on smaller screens */}
                <div
                  className="hidden lg:block w-64 opacity-30 hover:opacity-50 transition-opacity cursor-pointer"
                  onClick={goToNext}
                >
                  <TeamCard
                    member={guests[(currentIndex + 1) % guests.length]}
                    isActive={false}
                  />
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-3">
                {guests.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${index === currentIndex
                      ? "w-12 h-3 bg-[#434343]"
                      : "w-3 h-3 bg-[#434343]/30 hover:bg-[#434343]/50"
                      }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 py-20">No guests found in CMS.</div>
          )}
        </div>
      </div>
    </section>
  );
}
