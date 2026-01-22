import React, { useState, useEffect } from 'react';
import { X, Instagram, ExternalLink, Camera } from 'lucide-react';
import { client, urlFor } from '@/lib/sanity';


// ============================================
// Photo Grid Item
// ============================================
const PhotoItem = ({ photo, index, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 50);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(photo)}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-500 border border-[#434343]/20 hover:border-[#434343]/50 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
    >
      <img
        src={urlFor(photo).url()}
        alt="Gallery"
        className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'
          }`}
      />

      {/* Hover Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/40 to-transparent transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#434343]/50 p-4 rounded-full backdrop-blur-sm">
            <Camera size={32} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Lightbox Modal
// ============================================
const Lightbox = ({ photo, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-[#000000]/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >

      <button
        onClick={onClose}
        className="absolute top-6 right-6 bg-[#434343] hover:bg-[#434343]/80 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 border border-[#434343]/50"
      >
        <X size={24} className="text-white" />
      </button>


      <img
        src={urlFor(photo).url()}
        alt="Gallery"
        className="max-w-full max-h-full object-contain rounded-2xl border border-[#434343]/30"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

// ============================================
// MAIN GALLERY PAGE
// ============================================
export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const fetchPhotos = async () => {
      try {
        const query = '*[_type == "gallery"]';
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          // Flatten all images from all gallery documents
          const allImages = data.reduce((acc, current) => {
            return acc.concat(current.images || []);
          }, []);
          setPhotos(allImages);
        }
      } catch (error) {
        console.error("Error fetching gallery photos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #000000 0%, #434343 100%)' }}>

      {/* Hero Section */}
      <section className="relative py-16 px-6 overflow-hidden">
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
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="inline-flex items-center gap-2 mb-4">
              <Camera size={20} className="text-[#434343]" />
              <span className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
                Memories
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              Gallery
            </h1>
            <div className="h-1 w-24 bg-[#434343] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Capturing the energy, innovation, and vibes of our events
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid - PHOTOS FIRST */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-gray-400 py-10 font-bold">Loading memories...</div>
          ) : photos.length > 0 ? (
            /* Masonry Grid Layout */
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
              {photos.map((photo, index) => (
                <div key={photo._key || index} className="mb-5 break-inside-avoid">
                  <PhotoItem
                    photo={photo}
                    index={index}
                    onClick={setSelectedPhoto}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-10">No photos found in gallery.</div>
          )}
        </div>
      </section>



      {/* Lightbox */}
      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}