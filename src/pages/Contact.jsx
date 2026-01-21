import React, { useState, useEffect } from 'react';
import { MapPin, Send, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Clear form immediately after submission
      setFormData({ name: '', email: '', message: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #434343 100%)' }}
    >
      {/* ===== HELMET FOR SEO ===== */}
      <Helmet>
        <title>Contact Us | E-Cell SKNCOE</title>
        <meta
          name="description"
          content="Get in touch with E-Cell SKNCOE. Send us your queries, feedback, or collaboration proposals."
        />
        <meta name="keywords" content="Contact E-Cell SKNCOE, E-Cell Contact, SKNCOE Entrepreneurship" />
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
            className={`text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <div className="h-1 w-24 bg-[#434343] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#434343]/30 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              <div className="space-y-5">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full bg-[#0a0a0a] border ${errors.name ? 'border-red-500' : 'border-[#434343]/50'} rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#434343] transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`w-full bg-[#0a0a0a] border ${errors.email ? 'border-red-500' : 'border-[#434343]/50'} rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#434343] transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-gray-400 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows="5"
                    className={`w-full bg-[#0a0a0a] border ${errors.message ? 'border-red-500' : 'border-[#434343]/50'} rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#434343] transition-colors resize-none`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#434343] hover:bg-[#666666] text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </button>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 flex items-center gap-3 animate-pulse">
                    <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                    <p className="text-green-400 font-medium text-sm">Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#434343]/30 rounded-2xl overflow-hidden h-[500px] relative">
              {/* Address Overlay on Map */}
              <div className="absolute top-4 left-4 bg-[#000000]/90 backdrop-blur-sm border border-[#434343]/50 rounded-lg p-4 z-10 max-w-[280px]">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#434343] mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Visit Us</p>
                    <p className="text-white text-sm font-medium leading-relaxed">
                      Smt. Kashibai Navale College of Engineering<br />
                      Vadgaon (BK), Pune<br />
                      Maharashtra 411041
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Google Map - Exact location of SKNCOE */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.528728776234!2d73.85363857495807!3d18.456398982625394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eaa49c89b78f%3A0x6f25f74b8e0b2db3!2sSmt.%20Kashibai%20Navale%20College%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1705147320123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="E-Cell SKNCOE Location"
                className="w-full h-full"
              ></iframe>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}