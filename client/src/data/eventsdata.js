
///  we are fetching images from the public/events for each event data 


const generateGallery = (slug, count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    url: `/event/${slug}/${i + 1}.jpg`,
    caption: `Event moment ${i + 1}`
  }));

export const eventsData = [
  {
    id: 1,
    slug: "econclave",
    title: "E-Conclave",
    description:
      "A convergence of visionary leaders, industry experts, and aspiring entrepreneurs discussing the future of innovation and business transformation.",
    category: "Summit",
    highlight: "Flagship Event",

    shortDescription:
      "India's premier entrepreneurship and innovation summit bringing together leaders, startups, and investors.",
    date: "March 15-16, 2024",
    location: "Tech Campus, Main Auditorium",

    image: "/event/econclave/hero.jpg",
    heroImage: "/event/econclave/hero.jpg",

    fullDescription: [
"E-Conclave is the flagship and most prestigious event of E-Cell SKNCOE, designed to celebrate entrepreneurship, innovation, and leadership on a large scale. It brings together renowned speakers, industry experts, successful startup founders, investors, and enthusiastic participants from across Maharashtra, creating a vibrant ecosystem of ideas and inspiration. The event serves as a powerful platform where students and aspiring entrepreneurs gain first-hand exposure to the realities of the startup world. Through a well-curated mix of keynote sessions, panel discussions, startup pitching forums, and interactive workshops, E-Conclave enables participants to learn directly from real entrepreneurial journeys, understand current industry trends, and explore emerging technologies. Beyond learning, the event strongly emphasizes networking and collaboration, allowing attendees to connect with professionals, mentors, and like-minded innovators, thereby bridging the gap between ambition and execution and motivating young minds to take confident steps toward building impactful ventures."
    ],

    objectives: [
      "To cultivate an entrepreneurial mindset and innovative thinking among students.",
"To spread awareness about startups, funding, and the real-world startup ecosystem.",
"To connect students directly with entrepreneurs, founders, and industry experts.",
"To provide practical exposure to business building, ideation, and problem solving.",
"To develop essential entrepreneurial skills such as leadership, pitching, and strategic thinking.",
   "Startup expo featuring innovative startups and student ventures.",
"One-to-one networking and mentorship sessions with entrepreneurs.",
"Opportunity zone for internships, incubations, and startup collaborations.",
"Recognition and rewards for innovative ideas and entrepreneurial excellence."
    ],

    stats: [
      { value: "1200+", label: "Participants" },
      { value: "20", label: "Workshops" },
      { value: "50+", label: "Speakers" },
      { value: "80", label: "Startups" }
    ],

    gallery: generateGallery("econclave", 10),

    organizers: ["E-Cell"],
    sponsors: [
      "",
      "",
      "",
      ""
    ]
  },

  {
    id: 2,
    slug: "fusion-hackathon",
    title: "Fusion Hackathon",
    description:
      "24 hours of intense coding, creativity, and collaboration.",
    category: "Competition",
    highlight: "Tech Marathon",

    shortDescription:
      "Non-stop 24-hour coding marathon where developers build innovative solutions.",
    date: "9th & 10th Oct, 2025",
    location: "SIOM Auditorium, SKNCOE Campus",

    image: "/event/fusion/hero.jpg",
    heroImage: "/event/fusion/hero.jpg",

    fullDescription: [
   "The Institution’s Innovation Council (IIC) – E-Cell of Smt. Kashibai Navale College of Engineering (SKNCOE), in collaboration with the IEEE Student Branch, successfully organised a National Level 24-Hour Hackathon – “Fusion”. This event aimed to encourage innovation, creativity, and problem-solving among students by providing a platform to develop real-world solutions using emerging technologies such as AI/ML, Cybersecurity, FinTech, BioTech, HealthTech, and Web3. The Hackathon marked a historic milestone as it was the first 24-hour overnight Hackathon conducted in Sinhgad Institutes, engaging brilliant minds from across Maharashtra and India."
    ],

    objectives: [
      " To foster innovation and technological creativity among students",
" To provide hands-on experience in developing solutions to real-world challenges.",
" To enhance collaboration, teamwork, and interdisciplinary learning.",
" To strengthen the entrepreneurial ecosystem within the institute.",
" To build a bridge between academia, industry experts, and innovators"
    ],

    stats: [
      { value: "450+", label: "Participants" },
      { value: "150+", label: "Teams" },
      { value: "50", label: "On Hold Teams" },
      { value: "7", label: "Domains" }
    ],

    gallery: generateGallery("fusion", 12),

    organizers: ["E-Cell", "IEEE SKNCOE"],
    sponsors: [
      "Burgerify",
      "Cardon Technologies",
      "Off Route Adventure",
      "Reliance Digital",
      "Skulz Energy"
    ]
  },

  {
    id: 3,
    slug: "startup-sutra",
    title: "Startup Sutra",
    description:"Startup Sutra is a competitive, entrepreneurial event that provides a real-world startup pitching experience for aspiring founders",
    category: "competition",
    highlight: "Learn & Build",

    shortDescription:" Startup Sutra is a competitive, entrepreneurial event that provides a real-world startup pitching experience for aspiring founders",
    date: "May 10-12, 2024",
    location: "Old building Skncoe ,pune",

    image: "/event/startupsutra/hero.jpg",
    heroImage: "/event/startupsutra/hero.jpg",

    fullDescription: [
     "Startup Sutra is a competitive, entrepreneurial event that provides a real-world startup pitching experience for aspiring founders. The event is centered around startup ideas, innovation, and business viability, where participants present their concepts before a panel of judges, mentors, and industry experts. Students compete by pitching their startup ideas, explaining their business models, target markets, revenue strategies, and growth potential. Startup Sutra challenges participants to think strategically, defend their ideas confidently, and adapt based on expert feedback. Through this competitive platform, the event simulates the pressures and expectations of the actual startup ecosystem, offering participants invaluable exposure to how startups are evaluated, refined, and scaled in the real world."
    ],

    objectives: [
     "To evaluate startup ideas based on innovation, feasibility, scalability, and impact.",
"To help participants understand real-world startup expectations and investor perspectives.",
"To enhance pitching, communication, and business presentation skills.",
"To offer expert feedback and constructive criticism for idea refinement.",
"To encourage competitive thinking and entrepreneurial decision-making under pressure.",
"To expose students to business models, market analysis, and revenue strategies.",
"To motivate participants to transform strong ideas into execution-ready ventures."
    ],

    stats: [
      { value: "200+", label: "Participants" },
      { value: "50+", label: "Teams" },
      { value: "3", label: "winners" },
      { value: "6", label: "Investors" }
    ],

    gallery: generateGallery("startupsutra", 11),

    organizers: [
      "Startup Cell",
      "Entrepreneurship Club"
    ],
    sponsors: ["Growwmore", "Angel Network", "Business School"]
  },

  {
    id: 4,
    slug: "aarambh",
    title: "Aarambh",
    description:"Aarambh marked the foundational beginning of E-Cell SKNCOE’s entrepreneurial journey",
    category: "Launch Pad",
    highlight: "New Beginnings",

    shortDescription:
      "Aarambh marked the foundational beginning of E-Cell SKNCOE’s entrepreneurial journey",
    date: "June 5, 2024",
    location: "Main Auditorium",

    image: "/event/aarambh/hero.jpg",
    heroImage: "/event/aarambh/hero.jpg",

    fullDescription: [
   "Aarambh marked the foundational beginning of E-Cell SKNCOE’s entrepreneurial journey, setting the stage for innovation, leadership, and startup culture within the institution. The event was designed to ignite curiosity and entrepreneurial thinking among students by introducing them to the fundamentals of entrepreneurship and the startup ecosystem. Through expert talks, interactive discussions, and experience-sharing sessions, Aarambh provided students with early exposure to how ideas evolve into ventures. The event emphasized motivation, awareness, and mindset-building, encouraging participants to explore innovation, leadership, and problem-solving while taking their first confident steps into the world of entrepreneurship."
    ],

    objectives: [
      "To introduce students to the fundamentals of entrepreneurship and startup culture.",
"To inspire young minds through expert talks and real-world entrepreneurial experiences.",
"To create awareness about innovation, leadership, and problem-solving.",
"To engage students through interactive discussions and knowledge-sharing sessions.",
"To provide foundational guidance for aspiring entrepreneurs.",
"To expose participants to the broader startup ecosystem and opportunities.",
"To motivate students to explore entrepreneurship as a career path.",
"To lay a strong foundation for future entrepreneurial initiatives under E-Cell SKNCOE."
    ],

    stats: [
      { value: "50+", label: "Participants" },
      { value: "8", label: "Workshops" },
      { value: "15", label: "Speakers" },
      { value: "35", label: "Startups" }
    ],

    gallery: generateGallery("aarambh", 10),

    organizers: ["E-Cell", "Startup Incubator"],
    sponsors: [
      "KD's Blackhoods Cafe",
      "Cyberking Capitals",
      "Khadad Punekar",
      "Paradox Entertainment"
    ]
  },

  {
    id: 5,
    slug: "sinhgad-forum",
    title: "Sinhgad Forum",
 description:      "Sinhgad Forum brought thought leaders together.",
    category: "Forum",
    highlight: "Leadership Talk",

    shortDescription:
      "Annual leadership forum connecting academia and industry.",
    date: "July 18, 2024",
    location: "Convention Hall",

    image: "/event/forum/hero.jpg",
    heroImage: "/event/forum/hero.jpg",

    fullDescription: [
      "Sinhgad Forum brought thought leaders together.",
      "Discussions focused on innovation and leadership."
    ],

    objectives: [
      "Bridge academia and industry",
      "Inspire students",
      "Foster collaboration"
    ],

    stats: [
      { value: "600+", label: "Participants" },
      { value: "10", label: "Workshops" },
      { value: "20", label: "Speakers" },
      { value: "6", label: "Panels" }
    ],

    gallery: generateGallery("forum",10),

    organizers: [
      "Sinhgad Institutes",
      "Alumni Association",
      "Industry Relations Cell"
    ],
    sponsors: [
      "Corporate Partners",
      "Alumni Network",
      "Education Foundation"
    ]
  }
];

// Helperfunctions 

export const getEventBySlug = (slug) =>
  eventsData.find((event) => event.slug === slug);

export const getEventById = (id) =>
  eventsData.find((event) => event.id === id);
