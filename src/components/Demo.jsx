import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Demo() {
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);
  const scrollBoxRef = useRef(null);
  const progressBarRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);

  // 1. Hero Animation on Mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });

      gsap.from('.hero-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'back.out(1.7)'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 2. Stagger Animation for Cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.8
      });
    });

    return () => ctx.revert();
  }, []);

  // 3. Timeline Animation (Sequential)
  const runTimeline = () => {
    if (timelineRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setIsPlaying(false)
      });

      tl.to(timelineRef.current, {
        x: 200,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(timelineRef.current, {
        rotation: 360,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(timelineRef.current, {
        scale: 1.5,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
      .to(timelineRef.current, {
        x: 0,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
      });

      setIsPlaying(true);
    }
  };

  // 4. Counter Animation
  const animateCounter = () => {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: 1000,
      duration: 2,
      ease: 'power1.out',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(obj.value);
        }
      }
    });
  };

  // 5. Text Split Animation
  const animateText = () => {
    if (textRef.current) {
      const text = textRef.current.textContent;
      const letters = text.split('');
      textRef.current.innerHTML = letters.map(letter => 
        `<span class="inline-block">${letter === ' ' ? '&nbsp;' : letter}</span>`
      ).join('');

      gsap.from(textRef.current.children, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      });
    }
  };

  // 6. Scroll Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (scrollBoxRef.current) {
        gsap.to(scrollBoxRef.current, {
          scrollTrigger: {
            trigger: scrollBoxRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
            markers: false
          },
          x: 300,
          rotation: 360,
          ease: 'none'
        });
      }

      // Progress bar
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5
          },
          scaleX: 1,
          transformOrigin: 'left',
          ease: 'none'
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Progress Bar */}
      <div 
        ref={progressBarRef}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 z-50 origin-left"
        style={{ transform: 'scaleX(0)', width: '100%' }}
      />

      <div className="max-w-6xl mx-auto px-8 py-12 space-y-16">
        
        {/* Hero Section */}
        <div ref={heroRef} className="text-center space-y-6 py-12">
          <div className="hero-badge inline-block px-6 py-2 bg-purple-500/20 rounded-full border border-purple-500/50 mb-4">
            <span className="text-purple-300 font-semibold">GSAP Powered</span>
          </div>
          <h1 className="hero-title text-6xl font-bold text-white">
            GSAP Animation Mastery
          </h1>
          <p className="hero-subtitle text-xl text-gray-300 max-w-2xl mx-auto">
            Professional animations for production-ready React apps
          </p>
        </div>

        {/* Feature Cards with Stagger */}
        <div className="grid md:grid-cols-3 gap-6">
          {['Timeline', 'ScrollTrigger', 'Easing'].map((feature, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature}</h3>
              <p className="text-gray-300">Professional-grade animation control</p>
            </div>
          ))}
        </div>

        {/* Timeline Animation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">
            1️⃣ Timeline Animation (Sequential)
          </h2>
          <p className="text-gray-300 mb-6">
            Chain multiple animations in sequence with perfect timing
          </p>
          <div className="bg-slate-800/50 rounded-xl p-8 h-32 relative overflow-hidden">
            <div
              ref={timelineRef}
              className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-xl"
            >
              BOX
            </div>
          </div>
          <button
            onClick={runTimeline}
            disabled={isPlaying}
            className={`mt-4 px-8 py-3 rounded-lg font-semibold transition-all ${
              isPlaying 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/50'
            } text-white`}
          >
            {isPlaying ? 'Playing...' : 'Run Timeline'}
          </button>
        </div>

        {/* Counter Animation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">
            2️⃣ Counter Animation
          </h2>
          <p className="text-gray-300 mb-6">
            Smooth number transitions for dashboards and stats
          </p>
          <div className="bg-slate-800/50 rounded-xl p-8 text-center">
            <div 
              ref={counterRef}
              className="text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
            >
              0
            </div>
            <p className="text-gray-400 mt-2">Users Reached</p>
          </div>
          <button
            onClick={animateCounter}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-green-500/50 transition-all"
          >
            Animate Counter
          </button>
        </div>

        {/* Text Animation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">
            3️⃣ Text Split Animation
          </h2>
          <p className="text-gray-300 mb-6">
            Animate text letter by letter for dramatic reveals
          </p>
          <div className="bg-slate-800/50 rounded-xl p-8">
            <h3 
              ref={textRef}
              className="text-4xl font-bold text-white text-center"
            >
              GSAP is Amazing!
            </h3>
          </div>
          <button
            onClick={animateText}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-pink-500/50 transition-all"
          >
            Animate Text
          </button>
        </div>

        {/* Scroll Animation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">
            4️⃣ ScrollTrigger Animation
          </h2>
          <p className="text-gray-300 mb-6">
            Scroll down to see the box move and rotate! (Most powerful GSAP feature)
          </p>
          <div className="bg-slate-800/50 rounded-xl p-8 h-96 relative overflow-hidden">
            <div
              ref={scrollBoxRef}
              className="w-24 h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-xl flex items-center justify-center text-white font-bold shadow-xl"
            >
              SCROLL
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            💡 Why GSAP is Industry Standard
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              <span><strong className="text-white">Timeline Control:</strong> Chain complex animations with precise timing</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              <span><strong className="text-white">ScrollTrigger:</strong> Scroll-based animations for landing pages</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              <span><strong className="text-white">Performance:</strong> Hardware-accelerated, 60fps animations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 mt-1">▹</span>
              <span><strong className="text-white">Used by:</strong> Apple, Google, Nike, Tesla landing pages</span>
            </li>
          </ul>
        </div>

        {/* Spacer for scroll */}
        <div className="h-32"></div>
      </div>
    </div>
  );
}