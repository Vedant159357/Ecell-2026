import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import ayush from "../assets/sponcors/Ayush Motors (YAMAHA).jpeg";
import bbs from "../assets/sponcors/BBS.png";
import bisleri from "../assets/sponcors/Bisleri.png";
import bramha from "../assets/sponcors/Bramha Pure Veg.jpg";
import burgerify from "../assets/sponcors/Burgerify.png";
import cyberking from "../assets/sponcors/Cyberking.png";
import glint from "../assets/sponcors/Glint.png";
import grabon from "../assets/sponcors/Grabon.png";
import kds from "../assets/sponcors/KD's Blackwood Cafe.jpg";
import hackersera from "../assets/sponcors/hackersera.png";
import khadad from "../assets/sponcors/Khadad Punekar.jpg";
import massit from "../assets/sponcors/MASSIT.png";
import offroute from "../assets/sponcors/Off Route Adventure.jpg";
import paradox from "../assets/sponcors/Paradox Entertainment.svg";
import reliance from "../assets/sponcors/Reliance digital.png";
import phoenix from "../assets/sponcors/phoenix.png";
import skulz from "../assets/sponcors/Skulz Energy.jpeg";
import stockgro from "../assets/sponcors/Stockgrow.png";
import studx from "../assets/sponcors/StudX.jpg";
import taxiwars from "../assets/sponcors/Taxiwars.png";
import juicr from "../assets/sponcors/The juicr farm.jpeg";
import king from "../assets/sponcors/The king sharma.png";
import trueel from "../assets/sponcors/True elements.webp";
import zebronics from "../assets/sponcors/Zebronics.png";
import ubereats from "../assets/sponcors/Uber Eats.png";
import cordan from "../assets/sponcors/cordan.jpg";
import techvision from "../assets/sponcors/techvision.png";

const sponsors = [
  { id: 1, name: "Ayush Motors", image: ayush },
  { id: 2, name: "BBS", image: bbs },
  { id: 3, name: "Bisleri", image: bisleri },
  { id: 4, name: "Bramha Pure Veg", image: bramha },
  { id: 5, name: "Burgerify", image: burgerify },
  { id: 6, name: "Cyberking Capitals", image: cyberking },
  { id: 7, name: "Glint Logic Pvt. Ltd.", image: glint },
  { id: 8, name: "GrabOn", image: grabon },
  { id: 9, name: "KD's Blackwood Cafe", image: kds },
  { id: 10, name: "Hackersera", image: hackersera },
  { id: 11, name: "Khadad Punekar", image: khadad },
  { id: 12, name: "Mass IT Solution", image: massit },
  { id: 13, name: "Off Route Adventure", image: offroute },
  { id: 14, name: "Paradox Entertainment", image: paradox },
  { id: 15, name: "Reliance Digital", image: reliance },
  { id: 16, name: "Phoenix Infotech", image: phoenix },
  { id: 17, name: "Skulz Energy", image: skulz },
  { id: 18, name: "StockGro", image: stockgro },
  { id: 19, name: "StudX", image: studx },
  { id: 20, name: "Taxiwars", image: taxiwars },
  { id: 21, name: "The Juicr Farm", image: juicr },
  { id: 22, name: "The King Sharma", image: king },
  { id: 23, name: "True Elements", image: trueel },
  { id: 24, name: "Zebronics", image: zebronics },
  { id: 25, name: "Uber Eats", image: ubereats },
  { id: 26, name: "cordon technologies", image: cordan },
  { id: 27, name: "techvision", image: techvision },

];


const SponsorCard = ({ sponsor }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Specific check for techvision to fit it correctly
  const isTechvision = sponsor.name.toLowerCase().includes("techvision");

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-48 mx-6 transition-all duration-300"
    >
      {/* Circular Image */}
      <div className="relative mb-4 group">
        <div className={`w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#434343]/30 transition-all duration-500 ${isHovered ? 'border-[#434343] scale-110 shadow-2xl shadow-[#434343]/50' : ''
          } ${isTechvision ? 'bg-white' : ''}`}> {/* Add white background for techvision if needed */}
          <img
            src={sponsor.image}
            alt={sponsor.name}
            className={`w-full h-full transition-all duration-700 ${isHovered ? 'scale-110 rotate-6' : 'scale-100 rotate-0'
              } ${isTechvision ? 'object-contain p-2' : 'object-cover'}`} // Use contain for techvision
          />
        </div>

        {/* Glow effect on hover */}
        <div className={`absolute inset-0 rounded-full bg-[#434343]/20 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>
      </div>

      {/* Sponsor Name */}
      <div className="text-center">
        <h3 className={`text-white font-bold text-lg transition-all duration-300 ${isHovered ? 'text-gray-300 scale-105' : ''
          }`}>
          {sponsor.name}
        </h3>
      </div>
    </div>
  );
};


export default function Sponsors() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Duplicate sponsors for seamless infinite scroll
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #434343 100%)'
      }}
      id='Sponsors'
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="inline-block mb-4">
            <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase flex items-center gap-2 justify-center">
              <Award size={16} />
              Our
            </span>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-2"></div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 relative inline-block">
            Sponsors
            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto">
            Proud to be supported by industry-leading organizations
          </p>
        </div>

        {/* Scrolling Sponsors Container */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#434343] to-transparent z-10"></div>

          {/* Scrolling animation container */}
          <div className="flex overflow-hidden">
            <div className="flex animate-scroll">
              {duplicatedSponsors.map((sponsor, index) => (
                <SponsorCard key={`${sponsor.id}-${index}`} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#434343]/50 to-[#434343]/50"></div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-[#434343] rounded-full"></div>
              <div className="w-2 h-2 bg-[#434343]/50 rounded-full"></div>
              <div className="w-2 h-2 bg-[#434343]/30 rounded-full"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#434343]/50 to-[#434343]/50"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}