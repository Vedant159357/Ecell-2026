
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import hero from "../assets/hero.jpg";
// Import your local image like this:
// import backgroundImage from './assets/your-image.jpg';

export default function TitlePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Replace this URL with your imported image variable
  // const bgImage = backgroundImage; // Use this if importing locally
  const bgImage = hero; // Current fallback

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
          Dream. Discover. Disrupt.
        </h3>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-10 animate-slide-up">
          Entrepreneurship Cell
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
            SKNCOE Pune
          </span>
        </h1>

        <div className="animate-fade-in-delay">
          <a
            href="#about"
            className="inline-block bg-white text-black px-10 py-4 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all"
          >
            Explore
          </a>
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
      <style jsx>{`
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

/*import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function TitlePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #434343 100%)'
      }}
    >
     
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      
      <div className="absolute top-10 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      
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
          Dream. Discover. Disrupt.
        </h3>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-10 animate-slide-up">
          Entrepreneurship Cell
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
            SKNCOE Pune
          </span>
        </h1>

        <div className="animate-fade-in-delay">
          <a
            href="#about"
            className="inline-block bg-white text-black px-10 py-4 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all"
          >
            Explore
          </a>
        </div>
      </div>

      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" className="text-gray-300 text-center hover:text-white transition-colors">
          <span className="block text-xs mb-2 font-medium">Scroll Down</span>
          <ChevronDown size={26} className="mx-auto" />
        </a>
      </div>

    
      <style jsx>{`
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
}*/
