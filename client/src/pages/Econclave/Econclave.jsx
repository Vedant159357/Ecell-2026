import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Guests from './components/Guests';
import Events from './components/Events';
import Speakers from './components/Speakers';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Navigation from './components/Navigation';

import { ThemeProvider } from './context/ThemeContext';
import TieInteraction from './components/TieInteraction';

import './index.css';

function Econclave() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <div className="font-modern relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] selection:bg-[var(--color-gold)] selection:text-black transition-colors duration-500 ease-in-out">
        <TieInteraction />
        <AnimatePresence>
          {loading && <Loader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <>
            <Navigation />
            <div id="hero"><Hero /></div>
            <div id="about"><About /></div>
            <div id="stats"><Stats /></div>
            <div id="guests"><Guests /></div>
            <div id="events"><Events /></div>
            <div id="speakers"><Speakers /></div>
            <div id="sponsors"><Sponsors /></div>
            <div id="contact"><Contact /></div>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default Econclave;
