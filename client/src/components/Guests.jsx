import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Linkedin, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import rajshamani from "../assets/Guest/Raj_Shamani_DSC00824_BG.avif";
import prajaktakoli from "../assets/Guest/prajakta koli.avif";
import pranitmore from "../assets/Guest/more pranit.avif";
import ishansharma from "../assets/Guest/ishan sharma.avif";
import ashish from "../assets/Guest/ashish bharatvanshi.avif";
import smonk from "../assets/Guest/radheshyam das.avif";

const teamMembers = [
  {
    id: 1,
    name: "Raj Shamani",
    role: "Founder, Shamani Industries & Host of the Figuring Out Podcast.",
    image: rajshamani,
    linkedin: "linkedin.com/in/rajshamani",
  },
  {
    id: 2,
    name: "Prajakta Koli",
    role: " Digital Content Creator & Actress",
    image: prajaktakoli,
    linkedin: "https://linkedin.com/in/michaelchen",
  },
  {
    id: 3,
    name: "Pranit More",
    role: "Stand-up Comedian & Professional Content Creator",
    image: pranitmore,

    linkedin: "https://linkedin.com/in/emilyrodriguez",
  },
  {
    id: 4,
    name: "Ishan Sharma",
    role: " Co-founder, MarkitUp & Educational YouTuber",
    image: ishansharma,
    linkedin: "https://linkedin.com/in/davidpark",
  },
  {
    id: 5,
    name: "Radheshyam Das Ji",

    role: " President, ISKCON Pune & Founder of VOICE",
    image: smonk,
    instagram: "https://instagram.com/aishapatel",
    linkedin: "https://linkedin.com/in/aishapatel",
    email: "aisha@company.com",
  },
  {
    id: 6,
    name: "Ashish Bharatvanshi",
    role: "Historian, Digital Educator, and TEDx Speaker.",
    image: ashish,
    linkedin: "https://linkedin.com/in/aishapatel",
  },
];

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
      className="relative w-full h-[500px] cursor-pointer"
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
          className="absolute inset-x-4 top-4 h-[350px] rounded-2xl overflow-hidden shadow-lg border-2 border-[#434343]/20"
        >
          <img
            src={member.image}
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
          <div className="absolute top-[-40px] left-6 flex items-center gap-2 bg-gradient-to-r from-[#434343]/90 to-[#666666]/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-white/10">
            <Sparkles size={14} className="text-white" />
            <span className="text-xs font-bold text-white uppercase tracking-wider truncate max-w-[200px]">
              {member.role}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
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
      id="Guests"
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

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 relative inline-block">
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
          {/* Main Card Display with Side Arrows */}
          <div className="flex items-center justify-center mb-12">
            {/* Previous Card (Preview) - Hidden on smaller screens */}
            <div
              className="hidden lg:block w-64 opacity-30 hover:opacity-50 transition-opacity cursor-pointer"
              onClick={goToPrevious}
            >
              <TeamCard
                member={
                  teamMembers[
                  (currentIndex - 1 + teamMembers.length) % teamMembers.length
                  ]
                }
                isActive={false}
              />
            </div>

            {/* Left Arrow Button - Next to Current Card */}
            <button
              onClick={goToPrevious}
              className="bg-[#434343] hover:bg-[#666666] text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10 mx-4"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Current Card */}
            <div className="w-full max-w-sm">
              <TeamCard member={teamMembers[currentIndex]} isActive={true} />
            </div>

            {/* Right Arrow Button - Next to Current Card */}
            <button
              onClick={goToNext}
              className="bg-[#434343] hover:bg-[#666666] text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10 mx-4"
            >
              <ChevronRight size={28} />
            </button>

            {/* Next Card (Preview) - Hidden on smaller screens */}
            <div
              className="hidden lg:block w-64 opacity-30 hover:opacity-50 transition-opacity cursor-pointer"
              onClick={goToNext}
            >
              <TeamCard
                member={teamMembers[(currentIndex + 1) % teamMembers.length]}
                isActive={false}
              />
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3">
            {teamMembers.map((_, index) => (
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
        </div>
      </div>
    </section>
  );
}
