import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { client, urlFor } from '@/lib/sanity';

// Event Card Component
const EventCard = ({ event, index }) => {
  const navigate = useNavigate();

  // Motion values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animation
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  // Rotation transforms
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleClick = () => {
    const slug = event.slug?.current || event.slug;
    navigate(`/Eachevent/${slug}`);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center of card (-0.5 to 0.5)
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
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative h-[28rem] w-full cursor-pointer group rounded-3xl border border-[#434343]/50 p-4 bg-black/20"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#000000] to-[#434343] shadow-2xl overflow-hidden"
      >
        {/* Card Content Container with Parallax */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden" style={{ transform: "translateZ(0)" }}>
          {/* Image Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent z-10" />
            <motion.img
              src={event.mainImage ? urlFor(event.mainImage).url() : event.image}
              alt={event.title}
              style={{ transform: "translateZ(-50px) scale(1.2)" }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Glare Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 z-20 pointer-events-none"
            style={{
              opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.3])
            }}
          />

          {/* Content Layer */}
          <div className="absolute inset-0 z-30 p-6 flex flex-col justify-end">
            <motion.div style={{ transform: "translateZ(60px)" }}>
              {/* Badges */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-1.5 bg-[#434343]/90 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                  <Sparkles size={12} className="text-white" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{event.category}</span>
                </div>
                {event.highlight && (
                  <div className="bg-[#000000]/80 px-3 py-1 rounded-full border border-[#434343]/50 backdrop-blur-sm">
                    <span className="text-xs font-semibold text-white">{event.highlight}</span>
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-white mb-2 shadow-black drop-shadow-lg">
                {event.title}
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2 drop-shadow-md">
                {event.description}
              </p>

              {/* Decorative Line */}
              <div className="flex items-center gap-2 mb-4 opacity-50">
                <div className="flex-1 h-px bg-gradient-to-r from-white/50 to-transparent"></div>
                <Zap size={14} className="text-white" />
                <div className="flex-1 h-px bg-gradient-to-l from-white/50 to-transparent"></div>
              </div>

              {/* Button */}
              <motion.div
                style={{ transform: "translateZ(40px)" }}
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-lg text-sm font-bold shadow-lg hover:bg-gray-200 transition-colors w-fit"
              >
                Explore Event
                <ArrowRight size={16} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Main Events Section Component
export default function EventsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const fetchEvents = async () => {
      try {
        const query = '*[_type == "event"] | order(order asc)';
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section
      className="relative min-h-screen py-20 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #434343 100%)'
      }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="inline-block mb-4">
            <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">

            </span>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-2"></div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 relative inline-block">
            Events
            <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto">
            Experience innovation, collaboration, and growth through our flagship events
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {events.length > 0 ? (
            events.map((event, index) => (
              <EventCard key={event._id || event.id} event={event} index={index} />
            ))
          ) : !loading ? (
            <div className="col-span-full text-center text-gray-400 py-20 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
              <Sparkles className="mx-auto mb-4 opacity-50" size={48} />
              <h3 className="text-xl font-bold text-white mb-2">No Events Published Yet</h3>
              <p className="max-w-md mx-auto">
                Once you add events in your <span className="text-white">Sanity Studio</span>, they will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="col-span-full text-center text-gray-400 py-10">
              Loading events...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
