import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import About from "@/components/About";
import TitlePage from "../components/TitlePage";
import Events from "@/components/Events";
import Guests from "@/components/Guests";
import Sponsors from "@/components/Sponsors";
import Chatbot from "@/components/Chatbot";
import Alumni from "@/components/Alumni";

export default function Home() {
  const location = useLocation();

  // 🔹 HASH SCROLL FIX (CORE LOGIC)
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // small delay ensures DOM is ready
      }
    }
  }, [location]);

  return (
    <>
      <Chatbot />

      {/* HERO / TITLE */}
      <section id="home">
        <TitlePage />
      </section>

      {/* ABOUT */}
      <section id="about">
        <About />
      </section>

      {/* EVENTS */}
      <section id="events">
        <Events />
      </section>

      {/* SPONSORS */}
      <section id="sponsors">
        <Sponsors />
      </section>

      {/* GUESTS */}
      <section id="guests">
        <Guests />
      </section>

      {/* ALUMNI */}
      <section id="alumni">
        <Alumni />
      </section>
    </>
  );
}
