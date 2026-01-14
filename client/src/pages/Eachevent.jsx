import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEventBySlug } from '../data/eventsdata';
import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, Award } from 'lucide-react';

function Eachevent() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = getEventBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#000000] to-[#434343] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Event Not Found</h1>
          <button 
            onClick={() => navigate('/events')}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={20} />
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] to-[#434343]">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={event.heroImage} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {/* Lighter gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-transparent to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto w-full px-6 pb-12">
            <div className="inline-block px-4 py-1.5 bg-[#434343]/80 rounded-full mb-4">
              <span className="text-white text-sm font-semibold">{event.category}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{event.title}</h1>
            
            <div className="flex flex-wrap gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {event.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#434343]/50 to-[#000000]/50 border border-[#434343]/30 rounded-2xl p-6 text-center backdrop-blur-sm"
            >
              {/* Icon  */}
              {stat.label.toLowerCase().includes('participant') ? (
                <Users className="mx-auto mb-2 text-white" size={32} />
              ) : (
                <Award className="mx-auto mb-2 text-white" size={32} />
              )}

              <p className="text-4xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-gradient-to-br from-[#434343]/30 to-[#000000]/30 border border-[#434343]/30 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-6">About the Event</h2>
              {event.fullDescription.map((paragraph, index) => (
                <p key={index} className="text-gray-300 mb-4 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Objectives */}
            <div className="bg-gradient-to-br from-[#434343]/30 to-[#000000]/30 border border-[#434343]/30 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-6">Highlights & Objectives</h2>
              <ul className="space-y-4">
                {event.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#434343] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-300 text-lg">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gallery */}
            <div className="bg-gradient-to-br from-[#434343]/30 to-[#000000]/30 border border-[#434343]/30 rounded-2xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-6">Event Gallery</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {event.gallery.map((image) => (
                  <div 
                    key={image.id}
                    className="relative group cursor-pointer overflow-hidden rounded-xl"
                    onClick={() => setSelectedImage(image)}
                  >
                    <img 
                      src={image.url} 
                      alt={image.caption}
                      loading='lazy'
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organizers */}
            <div className="bg-gradient-to-br from-[#434343]/30 to-[#000000]/30 border border-[#434343]/30 rounded-2xl p-6 backdrop-blur-sm sticky top-6">
              <h3 className="text-xl font-bold text-white mb-4">Organized By</h3>
              <ul className="space-y-3">
                {event.organizers.map((org, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <span className="text-gray-300">{org}</span>
                  </li>
                ))}
              </ul>

              <div className="h-px bg-[#434343]/50 my-6"></div>

              <h3 className="text-xl font-bold text-white mb-4">Sponsors</h3>
              <ul className="space-y-3">
                {event.sponsors.map((sponsor, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#434343]"></div>
                    <span className="text-gray-300">{sponsor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-5xl w-full">
            <img 
              src={selectedImage.url} 
              alt={selectedImage.caption}
            
              className="w-full rounded-2xl"
            />
            <p className="text-white text-center mt-6 text-lg">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Eachevent;