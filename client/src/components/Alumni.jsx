import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Briefcase, TrendingUp, ExternalLink } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import vikaschaudhary from "../assets/vikash.avif";
import adeshkolhe from "../assets/Adeshkolhe.avif"

const alumniData = [
  {
    id: 1,
    name: "Adesh Kolhe",
    role: "Co-Founder",
    company: "BoomPanda",
    tagline: "India's Coolest Student Community",
    image: adeshkolhe,
    description: "Adesh Kolhe is a visionary entrepreneur and the co-founder of BoomPanda, India's coolest student community.",
    journey: [
      {
        year: "2018",
        title: "Joined Ecell SKNCOE",
        desc: "Started as an enthusiastic member, eager to contribute to promoting entrepreneurship among students."
      },
      {
        year: "2019",
        title: "Public Relations Head",
        desc: "Led relationship building, organized impactful events, and significantly boosted Ecell SKNCOE's visibility."
      },
      {
        year: "2020",
        title: "Founded BoomPanda",
        desc: "Co-founded with Rudra Ghodke. As of November 2024, operates as a bootstrapped company."
      }
    ],
    email: "adesh@boompanda.in",
    linkedin: "https://www.linkedin.com/in/adesh-kolhe/",
    color: "from-[#434343] to-[#000000]"
  },
  {
    id: 2,
    name: "Vikash Chaudhary",
    role: "Founder & CEO",
    company: "HackersEra",
    tagline: "Pioneering Cybersecurity Services",
    image: vikaschaudhary,
    description: "Vikash Chaudhary is the Founder and CEO of HackersEra, a pioneering cybersecurity service provider established in 2015.",
    journey: [
      {
        year: "2015",
        title: "Founded HackersEra",
        desc: "Established a pioneering cybersecurity service provider focused on protecting digital assets."
      },
      {
        year: "Courses",
        title: "Developed Training Programs",
        desc: "Created 'Offensive Bug Bounty Hunter 2.0', 'SDR Exploitation', and 'Offensive Approach to Hunt Bugs'."
      },
      {
        year: "2023",
        title: "Revenue Milestone",
        desc: "Annual revenue of ₹2.29 crore (~$286,000) for FY ending March 31, 2023. Bootstrapped company."
      }
    ],
    email: "vikash@hackersera.com",
    linkedin: "https://www.linkedin.com/in/offensivehunter/",
    color: "from-[#000000] to-[#434343]"
  }
];

const AlumniProfile = ({ alumni, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  // 3D tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

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

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 300);
    return () => clearTimeout(timer);
  }, [index]);

  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>

        {/* Image Side with 3D Effect */}
        <div className="lg:w-1/2 relative">
          <motion.div
            style={{
              perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer"
          >
            {/* Decorative Background - Static outer border */}
            <div className={`absolute inset-0 bg-gradient-to-br ${alumni.color} rounded-[3rem]`}></div>

            {/* 3D Tilting Image Container */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative z-10 p-4"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-[#434343]/30">
                <motion.img
                  style={{ transform: "translateZ(40px)" }}
                  src={alumni.image}
                  alt={alumni.name}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-transparent"></div>

                {/* Name Overlay - Floating */}
                <motion.div
                  style={{ transform: "translateZ(60px)" }}
                  className="absolute bottom-0 left-0 right-0 p-6"
                >
                  <div className="inline-block px-4 py-2 bg-[#434343]/90 backdrop-blur-sm rounded-full mb-2">
                    <span className="text-white text-sm font-semibold">{alumni.company}</span>
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-1">{alumni.name}</h3>
                  <p className="text-gray-300 text-lg">{alumni.role}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-[#434343] border-4 border-[#000000] rounded-2xl p-4 shadow-2xl z-20">
              <Briefcase size={32} className="text-white" />
            </div>
          </motion.div>
        </div>

        {/* Content Side */}
        <div className="lg:w-1/2 space-y-6">
          {/* Tagline */}
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#434343]"></div>
            <div className="pl-6">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">About {alumni.name}</p>
              <p className="text-2xl font-bold text-white mb-3">{alumni.company}</p>
              <p className="text-gray-400 text-lg leading-relaxed">{alumni.description}</p>
            </div>
          </div>

          {/* Journey Timeline - Animated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-[#434343]/20 to-[#000000]/20 border border-[#434343]/30 rounded-2xl p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={20} className="text-[#434343]" />
              <h4 className="text-white font-bold text-lg">Journey Timeline</h4>
            </div>

            <div className="relative space-y-6">
              {/* Animated White Progress Line */}
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                className="absolute left-0 top-0 w-0.5 bg-white z-10"
                style={{ marginLeft: "7px" }}
              />

              {/* Gray Background Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#434343]/30" style={{ marginLeft: "7px" }}></div>

              {alumni.journey.map((milestone, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + idx * 0.2 }}
                  className="relative pl-8"
                >
                  {/* Animated Timeline Dot */}
                  <motion.div
                    initial={{ backgroundColor: "#434343", scale: 1 }}
                    whileInView={{ backgroundColor: "#ffffff", scale: 1.2 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + idx * 0.2 }}
                    className="absolute left-0 top-0 w-4 h-4 rounded-full border-2 border-[#000000] transform -translate-x-[9px]"
                  ></motion.div>

                  {/* Year Badge */}
                  <div className="inline-block px-3 py-1 bg-[#434343] rounded-full text-xs font-bold text-white mb-2">
                    {milestone.year}
                  </div>

                  {/* Content */}
                  <h5 className="font-bold text-white text-base mb-1">
                    {milestone.title}
                  </h5>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {milestone.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Links */}
          <div className="flex gap-4">
            <a
              href={`mailto:${alumni.email}`}
              className="flex-1 flex items-center justify-center gap-2 bg-[#434343] hover:bg-[#434343]/80 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group"
            >
              <Mail size={20} />
              <span className="hidden sm:inline">Email</span>
              <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href={alumni.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#434343] hover:bg-[#434343]/80 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group"
            >
              <Linkedin size={20} />
              <span className="hidden sm:inline">LinkedIn</span>
              <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      {index < alumniData.length - 1 && (
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#434343] to-transparent"></div>
          <div className="w-3 h-3 rounded-full bg-[#434343]"></div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#434343] to-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default function Alumni() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000000 0%, #434343 100%)' }}>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="inline-block mb-4">
              <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
                Success Stories
              </span>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[#434343] to-transparent mt-2"></div>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 relative inline-block">
              Our Alumni
              <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#434343] to-transparent"></div>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto">
              Celebrating the entrepreneurial journeys of our inspiring alumni who are making waves in their industries
            </p>
          </div>
        </div>
      </section>

      {/* Alumni Profiles */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-8">
          {alumniData.map((alumni, index) => (
            <AlumniProfile key={alumni.id} alumni={alumni} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}