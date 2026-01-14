import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Facebook, ChevronRight } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/ecell-skncoe', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/ecell_skncoe', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/ecell_skncoe', label: 'Twitter' },
    { icon: Facebook, href: 'https://www.facebook.com/ecell.skncoe', label: 'Facebook' }
  ];

  return (
    <footer 
      className="relative overflow-hidden"
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
      <div className="absolute top-0 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Top Section - Main Content */}
        <div className="grid lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                E-Cell <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">SKNCOE</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Empowering the next generation of entrepreneurs and innovators through learning, mentorship, and community.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-white to-transparent"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Get In Touch
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-white to-transparent"></div>
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:ecell@skncoe.ac.in"
                className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Email</div>
                  <div className="font-semibold">ecell@skncoe.ac.in</div>
                </div>
              </a>

              <a 
                href="tel:+919876543210"
                className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Phone</div>
                  <div className="font-semibold">+91 98765 43210</div>
                </div>
              </a>

              <div className="flex items-start gap-3 text-gray-300">
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Location</div>
                  <div className="font-semibold">SKNCOE, Vadgaon (BK) Pune<br />Maharashtra, India</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Social & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl flex items-center justify-center transition-all duration-300 group"
              >
                <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} E-Cell SKNCOE. All rights reserved.
            </p>
            <div className="flex items-center justify-center md:justify-end gap-4 mt-2">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/10"></div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </footer>
  );
}