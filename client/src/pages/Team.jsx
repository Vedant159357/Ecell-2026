import React, { useState, useEffect } from 'react';
import { Linkedin, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { teamData } from '../data/Teamdata';

// ============================================
// Simple Team Member Card (IIC Style)
// Clean card with: Image → Name → Position → LinkedIn
// ============================================
const TeamMemberCard = ({ member, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#434343]/30 rounded-2xl overflow-hidden hover:border-[#434343]/60 transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      {/* Image with Hover Overlay */}
      <div className="relative h-64 overflow-hidden group">
        <img
          src={member.image}
          alt={member.name}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'} ${member.alignment || 'object-center'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/30 to-transparent"></div>

        {/* Social Icons Overlay - Shows on Hover */}
        <div
          className={`absolute inset-0 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center gap-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#434343] hover:bg-[#434343]/80 p-3 rounded-full transition-all duration-300 hover:scale-110"
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin size={20} className="text-white" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 text-center">
        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
          {member.name}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2">
          {member.position}
        </p>
      </div>
    </div>
  );
};

// ============================================
// Section Header Component
// ============================================
const SectionHeader = ({ title }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {title}
      </h2>
      <div className="h-1 w-24 bg-[#434343] mx-auto rounded-full"></div>
    </div>
  );
};

// ============================================
// MAIN TEAM PAGE COMPONENT
// ============================================
export default function Team() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #434343 100%)' }}
    >
      {/* ===== HELMET FOR SEO ===== */}
      <Helmet>
        <title>Our Team | E-Cell SKNCOE</title>
        <meta
          name="description"
          content="Meet the passionate faculty coordinators and core team members of E-Cell SKNCOE who drive innovation, entrepreneurship, and student leadership."
        />
        <meta name="keywords" content="E-Cell SKNCOE Team, E-Cell Members, Entrepreneurship Cell SKNCOE" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              Our Team
            </h1>
            <div className="h-1 w-24 bg-[#434343] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Passionate individuals driving innovation and entrepreneurship
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Faculty Coordinators" />

          {/* Hierarchy Layout */}

          {/* 1. President */}
          {teamData.faculty.filter(m => m.hierarchy === "president").map((member, index) => (
            <div key={member.id} className="flex justify-center mb-10">
              <div className="w-full max-w-sm">
                <TeamMemberCard member={member} index={index} />
              </div>
            </div>
          ))}

          {/* 2. VP & Convener */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {teamData.faculty.filter(m => m.hierarchy === "vicePresident" || m.hierarchy === "convener").map((member, index) => (
              <div key={member.id} className="w-full max-w-xs">
                <TeamMemberCard member={member} index={index} />
              </div>
            ))}
          </div>

          {/* 3. Coordinators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {teamData.faculty.filter(m => m.hierarchy === "coordinator").map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>

        </div>
      </section>

      {/* Core Team Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Core Team" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-6">
            {teamData.coreTeam.slice(0, 1).map((member, index) => (
              <div key={member.id} className="sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center">
                <div className="w-full max-w-[280px] sm:max-w-xs">
                  <TeamMemberCard member={member} index={index} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-6">
            {teamData.coreTeam.slice(1, 4).map((member, index) => (
              <div key={member.id} className="flex justify-center">
                <div className="w-full max-w-[280px] sm:max-w-xs">
                  <TeamMemberCard member={member} index={index + 1} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-6">
            {teamData.coreTeam.slice(4, 8).map((member, index) => (
              <div key={member.id} className="flex justify-center">
                <div className="w-full max-w-[280px] sm:max-w-xs">
                  <TeamMemberCard member={member} index={index + 4} />
                </div>
              </div>
            ))}
          </div>

          {teamData.coreTeam.length > 8 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {teamData.coreTeam.slice(8, teamData.coreTeam.length).map((member, index) => (
                <div key={member.id} className="flex justify-center">
                  <div className="w-full max-w-[280px] sm:max-w-xs">
                    <TeamMemberCard member={member} index={index + 8} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}