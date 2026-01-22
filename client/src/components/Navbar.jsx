import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import logo from "../assets/elogo.avif";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { client, urlFor } from "@/lib/sanity";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await client.fetch('*[_type == "siteSettings"][0]');
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching navbar settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const menuItems = [
    { name: "Home", to: "/" },
    { name: "About", hash: "#about" },
    { name: "Events", hash: "#events" },
    { name: "Guests", hash: "#guests" },
    { name: "Sponsors", hash: "#sponsors" },
    { name: "Alumni", hash: "#alumni" },
    { name: "Team", to: "/Team" },
    { name: "Gallery", to: "/Gallery" },
    { name: "Contact", to: "/Contact" },
    { name: "Ideathon", to: "/ideathon" },
    { name: "Fusion", to: "/fusion" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const handleHashClick = (hash) => {
    if (location.pathname !== "/") {
      // go to home WITH hash
      navigate("/" + hash);
    } else {
      // already on home → scroll
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  return (
    <>
      {/* LOGO */}
      <div className="absolute top-8 left-8 z-40">
        <NavLink to="/">
          <img
            src={settings?.logo ? urlFor(settings.logo).url() : logo}
            alt="Logo"
            className="h-14 md:h-24 w-auto cursor-pointer"
          />
        </NavLink>
      </div>

      {/* MENU BUTTON (HAMBURGER ICON) */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-3 group"
        >
          <span className="text-white text-sm font-medium">Menu</span>

          {/* THREE HORIZONTAL LINES */}
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "w-8 rotate-45 translate-y-2" : "w-8"
                }`}
            />
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : "w-8"
                }`}
            />
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "w-8 -rotate-45 -translate-y-2" : "w-8"
                }`}
            />
          </div>
        </button>
      </div>

      {/* OVERLAY */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMenu}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 w-80 h-full z-50 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)",
        }}
      >
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">ECell</h2>
          <button onClick={closeMenu}>
            <X size={24} className="text-white" />
          </button>
        </div>

        <nav className="p-6">
          {menuItems.map((item, i) =>
            item.hash ? (
              <button
                key={i}
                onClick={() => handleHashClick(item.hash)}
                className="block w-full text-left py-3 px-4 rounded-lg text-white hover:bg-white/10"
              >
                {item.name}
              </button>
            ) : (
              <NavLink
                key={i}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg ${isActive
                    ? "bg-white/20 text-white"
                    : "text-white hover:bg-white/10"
                  }`
                }
              >
                {item.name}
              </NavLink>
            )
          )}
        </nav>
      </div>
    </>
  );
}
