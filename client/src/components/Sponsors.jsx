import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import { client, urlFor } from "@/lib/sanity";

const SponsorCard = ({ sponsor }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Specific check for techvision to fit it correctly
  const isTechvision = sponsor.name?.toLowerCase().includes("techvision");

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
            src={sponsor.logo && sponsor.logo.asset ? urlFor(sponsor.logo).url() : sponsor.image}
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
  const [sponsorsData, setSponsorsData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const fetchSponsors = async () => {
      try {
        const query = '*[_type == "sponsor"]';
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setSponsorsData(data);
        }
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, []);

  // Duplicate sponsors for seamless infinite scroll
  const duplicatedSponsors = sponsorsData.length > 0 ? [...sponsorsData, ...sponsorsData, ...sponsorsData] : [];

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

        {/* Header content unchanged ... past lines */}

        {/* Categorized Sponsors (Tiers) */}
        {!loading && ['gold', 'silver', 'bronze'].some(tier => sponsorsData.some(s => s.category === tier)) && (
          <div className="max-w-7xl mx-auto px-6 mb-20 space-y-16">
            {['gold', 'silver', 'bronze'].map(tier => {
              const tieredSponsors = sponsorsData.filter(s => s.category === tier);
              if (tieredSponsors.length === 0) return null;

              return (
                <div key={tier} className="text-center">
                  <h3 className="text-2xl font-bold text-gray-400 uppercase tracking-[0.3em] mb-10 flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-gray-600"></div>
                    {tier} Partners
                    <div className="h-px w-12 bg-gray-600"></div>
                  </h3>
                  <div className="flex flex-wrap justify-center gap-12">
                    {tieredSponsors.map(sponsor => (
                      <SponsorCard key={sponsor._id} sponsor={sponsor} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Scrolling Sponsors Container (For 'Partner' tier or all if no tiers) */}
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#434343] to-transparent z-10"></div>

          {/* Scrolling animation container */}
          <div className="flex overflow-hidden">
            {loading ? (
              <div className="text-center text-gray-400 py-10 w-full font-bold">Loading sponsors...</div>
            ) : duplicatedSponsors.length > 0 ? (
              <div className="flex animate-scroll">
                {(sponsorsData.some(s => s.category) ?
                  [...sponsorsData.filter(s => !['gold', 'silver', 'bronze'].includes(s.category)),
                  ...sponsorsData.filter(s => !['gold', 'silver', 'bronze'].includes(s.category)),
                  ...sponsorsData.filter(s => !['gold', 'silver', 'bronze'].includes(s.category))]
                  : duplicatedSponsors).map((sponsor, index) => (
                    <SponsorCard key={`${sponsor._id || sponsor.id}-${index}`} sponsor={sponsor} />
                  ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-10 w-full">No sponsors found in CMS.</div>
            )}
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

      <style>{`
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