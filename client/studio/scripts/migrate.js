const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// CONFIGURATION
const PROJECT_ID = 'fkn204nu';
const DATASET = 'production';
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!TOKEN) {
    console.error('❌ Error: SANITY_WRITE_TOKEN is missing.');
    process.exit(1);
}

const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    token: TOKEN,
    useCdn: false,
    apiVersion: '2024-03-21',
});

const BASE_PATH = './client';
const PUBLIC_PATH = path.join(BASE_PATH, 'public');
const SRC_PATH = path.join(BASE_PATH, 'src');

async function uploadImage(filePath) {
    try {
        if (!fs.existsSync(filePath)) return null;
        const asset = await client.assets.upload('image', fs.createReadStream(filePath));
        return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
    } catch (err) {
        console.error(`❌ Error uploading image ${filePath}:`, err.message);
        return null;
    }
}

async function migrateEvents() {
    console.log('🚀 Migrating Events with Custom Ordering...');

    // Explicitly delete potential duplicates from previous migration attempts
    try {
        await client.delete('event-startup-sutra');
        console.log('🗑️ Cleaned up potential duplicate: event-startup-sutra');
    } catch (e) { }

    const allGalleryImages = [];
    const events = [
        {
            order: 1,
            slug: "econclave",
            title: "E-Conclave",
            description: "A convergence of visionary leaders, industry experts, and aspiring entrepreneurs.",
            category: "Summit",
            highlight: "Flagship Event",
            shortDescription: "India's premier entrepreneurship and innovation summit.",
            date: "March 15-16, 2024",
            location: "Tech Campus, Main Auditorium",
            imagePath: path.join(PUBLIC_PATH, 'event/econclave/hero.avif'),
            fullDescription: [
                "E-Conclave is the flagship and most prestigious event of E-Cell SKNCOE, designed to celebrate entrepreneurship, innovation, and leadership on a large scale.",
                "It brings together renowned speakers, industry experts, successful startup founders, investors, and enthusiastic participants from across Maharashtra, creating a vibrant ecosystem of ideas and inspiration."
            ],
            objectives: ["Cultivate entrepreneurial mindset", "Spread awareness about startups", "Connect students with industry experts", "Provide practical exposure through sessions"],
            stats: [{ value: "1200+", label: "Participants" }, { value: "50+", label: "Speakers" }, { value: "80+", label: "Startups" }, { value: "15+", label: "Investors" }],
            organizers: ["E-Cell SKNCOE Core Team", "IIC SKNCOE", "Faculty Coordinators"],
            sponsors: ["Ayush Motors", "Reliance Digital", "Bisleri", "GrabOn"],
            galleryCount: 10
        },
        {
            order: 2,
            slug: "startupsutra",
            title: "Startup Sutra",
            description: "Startup Sutra is a competitive, entrepreneurial event providing real-world pitching experience.",
            category: "competition",
            highlight: "Learn & Build",
            shortDescription: "Startup Sutra is a competitive, entrepreneurial event providing real-world pitching experience.",
            date: "May 10-12, 2024",
            location: "Old building Skncoe, pune",
            imagePath: path.join(PUBLIC_PATH, 'event/startupsutra/hero.avif'),
            fullDescription: [
                "Startup Sutra is a competitive, entrepreneurial event that provides a real-world startup pitching experience for aspiring founders.",
                "Students compete by pitching their startup ideas before a panel of judges, mentors, and industry experts. The goal is to evaluate ideas and understand expectations."
            ],
            objectives: ["Evaluate startup ideas", "Understand real-world expectations", "Enhance pitching and communication skills", "Connect with potential mentors"],
            stats: [{ value: "200+", label: "Participants" }, { value: "20+", label: "Pitches" }, { value: "6", label: "Investors" }, { value: "5", label: "Winners" }],
            organizers: ["Start-up Incubation Head", "E-Cell Core Team"],
            sponsors: ["Cyberking Capitals", "StockGro", "StudX", "Taxiwars"],
            galleryCount: 11
        },
        {
            order: 3,
            slug: "fusion-hackathon",
            title: "Fusion Hackathon",
            description: "24 hours of intense coding, creativity, and collaboration.",
            category: "Competition",
            highlight: "Tech Marathon",
            shortDescription: "Non-stop 24-hour coding marathon where developers build innovative solutions.",
            date: "9th & 10th Oct, 2025",
            location: "SIOM Auditorium, SKNCOE Campus",
            imagePath: path.join(PUBLIC_PATH, 'event/fusion/hero.avif'),
            fullDescription: [
                "The Institution’s Innovation Council (IIC) – E-Cell of Smt. Kashibai Navale College of Engineering (SKNCOE), in collaboration with the IEEE Student Branch, successfully organised a National Level 24-Hour Hackathon – “Fusion”.",
                "Fusion provided a dynamic platform for tech enthusiasts to ideate and create solutions for real-world problems. The event witnessed a massive footfall and high-quality submissions."
            ],
            objectives: ["Foster innovation and creativity", "Provide hands-on technical experience", "Enhance collaboration and team spirit", "Provide a platform for national talent"],
            stats: [{ value: "450+", label: "Participants" }, { value: "150+", label: "Teams" }, { value: "24h", label: "Duration" }, { value: "10+", label: "Mentors" }],
            organizers: ["IIC SKNCOE", "IEEE Student Branch", "Technical Team"],
            sponsors: ["Mass IT Solution", "Phoenix Infotech", "Glint Logic", "Hackersera"],
            galleryCount: 12
        },
        {
            order: 4,
            slug: "aarambh",
            title: "Aarambh",
            description: "Aarambh marked the foundational beginning of E-Cell SKNCOE’s entrepreneurial journey.",
            category: "Launch Pad",
            highlight: "New Beginnings",
            shortDescription: "Aarambh marked the foundational beginning of E-Cell SKNCOE’s entrepreneurial journey.",
            date: "June 5, 2024",
            location: "Main Auditorium",
            imagePath: path.join(PUBLIC_PATH, 'event/aarambh/hero.avif'),
            fullDescription: [
                "Aarambh marked the foundational beginning of E-Cell SKNCOE’s entrepreneurial journey, setting the stage for innovation and startup culture.",
                "The event introduced students to the core mission of E-Cell and inspired them to explore their entrepreneurial potential through various workshops."
            ],
            objectives: ["Introduce fundamentals of entrepreneurship", "Inspire young minds to innovate", "Create awareness about E-Cell missions", "Foster a spirit of leadership"],
            stats: [{ value: "50+", label: "Participants" }, { value: "15", label: "Speakers" }, { value: "1", label: "Day" }],
            organizers: ["E-Cell Founders", "Faculty Members"],
            sponsors: ["True Elements", "Bisleri", "StudX"],
            galleryCount: 10
        },
        {
            order: 5,
            slug: "sinhgad-forum",
            title: "Sinhgad Forum",
            description: "Sinhgad Forum brought thought leaders together to discuss innovation and leadership.",
            category: "Forum",
            highlight: "Leadership Talk",
            shortDescription: "Annual leadership forum connecting academia and industry.",
            date: "July 18, 2024",
            location: "Convention Hall",
            imagePath: path.join(PUBLIC_PATH, 'event/forum/hero.avif'),
            fullDescription: [
                "Sinhgad Forum brought thought leaders together from various domains to share insights on the future of innovation.",
                "Discussions focused on leadership, emerging technologies, and bridging the gap between academic learning and industry requirements."
            ],
            objectives: ["Bridge academia and industry gap", "Inspire students through leadership talks", "Foster industry collaboration", "Showcase institutional innovation"],
            stats: [{ value: "600+", label: "Participants" }, { value: "20", label: "Speakers" }, { value: "5", label: "Panels" }],
            organizers: ["Sinhgad Institutes", "E-Cell SKNCOE"],
            sponsors: ["Reliance Digital", "Ayush Motors", "Zebronics"],
            galleryCount: 10
        }
    ];

    for (const ev of events) {
        process.stdout.write(`  Event: ${ev.title}... `);
        const image = await uploadImage(ev.imagePath);
        const gallery = [];
        for (let i = 1; i <= ev.galleryCount; i++) {
            const gImg = await uploadImage(path.join(PUBLIC_PATH, `event/${ev.slug}/${i}.avif`));
            if (gImg) {
                gallery.push(gImg);
                allGalleryImages.push(gImg);
            }
        }
        await client.createOrReplace({
            _type: 'event',
            _id: `event-${ev.slug}`,
            title: ev.title,
            slug: { _type: 'slug', current: ev.slug },
            description: ev.description,
            shortDescription: ev.shortDescription,
            category: ev.category,
            highlight: ev.highlight,
            date: ev.date,
            location: ev.location,
            mainImage: image,
            fullDescription: ev.fullDescription,
            objectives: ev.objectives,
            stats: ev.stats,
            organizers: ev.organizers || [],
            sponsors: ev.sponsors || [],
            gallery: gallery,
            order: ev.order
        });
        console.log('✅');
    }

    // Create a main gallery document
    console.log('🚀 Finalizing Main Gallery...');
    await client.createOrReplace({
        _id: 'gallery-main',
        _type: 'gallery',
        title: 'Main Gallery',
        images: allGalleryImages.slice(0, 50)
    });
    console.log('✅ Gallery document created.');
}

async function migrateTeam() {
    console.log('🚀 Migrating Team...');
    const faculty = [
        { name: "Dr. K. R. Borole", pos: "IIC President", file: "borole.avif", hier: "president" },
        { name: "Prof. R. G. Dave", pos: "IIC Vice-President", file: "ruchiDave.avif", hier: "vicePresident" },
        { name: "Dr. P. N. Railkar", pos: "IIC Convener", file: "Prailkar.avif", hier: "convener" },
        { name: "Prof. S. A. Nagtilak", pos: "ARIIA Coordinator", file: "SNagtalik.avif", hier: "coordinator" },
        { name: "Dr. Prabhat Ranjan", pos: "IIC Member", file: "prabhat.avif", hier: "coordinator" }
    ];

    const core = [
        { name: "Tanishq Shroff", pos: "President", file: "Tanishq Shroff.avif" },
        { name: "Anjali Kumhar", pos: "Vice President", file: "Anjali Kumhar.avif" },
        { name: "Shivam Ghuge", pos: "General secretary", file: "Shivam Ghuge.avif" },
        { name: "Shantanu Mapare", pos: "Cheif of operation", file: "Shantanu Mapre.avif" },
        { name: "Ram Burange", pos: "Tresurer", file: "Ram Burange.avif" },
        { name: "Shubham Sharma", pos: "Tresurer", file: "Shubham Sharma.avif" },
        { name: "Yukta Patil", pos: "PR Head", file: "Yukta Patil.avif" },
        { name: "Dhruv Unhale", pos: "PR Head", file: "DHRUV UNHALE.avif" },
        { name: "Jayesh Jadhav", pos: "PR Head", file: "jayesh jadhav.avif" },
        { name: "Neel Rawal", pos: "Start-up Incubation Head", file: "Neel Rawal.avif" },
        { name: "Rutuja Yelgate", pos: "Sponsorship Head", file: "Rutuja Yelgate.avif" },
        { name: "Rajshri Dhage", pos: "Sponsorship Head", file: "Rajshri Dhage.avif" },
        { name: "Vedika Kharate", pos: "Sponsorship Head", file: "Vedika Kharate.avif" },
        { name: "Ketan Patil", pos: "Digital Media Head", file: "Ketan Patil.avif" },
        { name: "Aryan Agarwal", pos: "Digital Media Head", file: "Aryan Agrawal.avif" },
        { name: "Ragini Devkar", pos: "Administrative Affairs Head", file: "Ragini Devkar.avif" },
        { name: "Vedant Satpute", pos: "Technical Head", file: "Vedant satpute.avif" },
        { name: "Shyam Talekar", pos: "Technical Head", file: "Shyam.avif" },
        { name: "Vinit Limkar", pos: "Technical Head", file: "Vinit Limkar.avif" },
        { name: "kaushal Masare", pos: "Technical Head", file: "Kaushal Masare.avif" }
    ];

    for (const f of faculty) {
        process.stdout.write(`  Faculty: ${f.name}... `);
        const img = await uploadImage(path.join(SRC_PATH, 'assets/Co-ordinators', f.file));
        const safeId = `team-f-${f.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        await client.createOrReplace({
            _id: safeId, _type: 'teamMember', name: f.name, position: f.pos, category: 'Faculty', profileImage: img, hierarchy: f.hier
        });
        console.log('✅');
    }

    let orderNum = 1;
    for (const c of core) {
        process.stdout.write(`  Core: ${c.name}... `);
        const img = await uploadImage(path.join(SRC_PATH, 'assets/core-members', c.file));
        const safeId = `team-c-${c.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        await client.createOrReplace({
            _id: safeId, _type: 'teamMember', name: c.name, position: c.pos, category: 'Core Team', profileImage: img, order: orderNum++
        });
        console.log('✅');
    }
}

async function migrateSponsors() {
    console.log('🚀 Migrating Sponsors...');
    const sponsors = [
        { name: "Ayush Motors", file: "Ayush Motors (YAMAHA).avif" },
        { name: "BBS", file: "BBS.avif" },
        { name: "Bisleri", file: "Bisleri.avif" },
        { name: "Bramha Pure Veg", file: "Bramha Pure Veg.avif" },
        { name: "Burgerify", file: "Burgerify.avif" },
        { name: "Cyberking Capitals", file: "Cyberking.avif" },
        { name: "Glint Logic", file: "Glint.avif" },
        { name: "GrabOn", file: "Grabon.avif" },
        { name: "KD's Blackwood Cafe", file: "KD's Blackwood Cafe.avif" },
        { name: "Hackersera", file: "hackersera_logo.avif" },
        { name: "Khadad Punekar", file: "Khadad Punekar.avif" },
        { name: "Mass IT Solution", file: "MASSIT.avif" },
        { name: "Off Route Adventure", file: "Off Route Adventure.avif" },
        { name: "Paradox Entertainment", file: "Paradox Entertainment.svg" },
        { name: "Reliance Digital", file: "Reliance digital.avif" },
        { name: "Phoenix Infotech", file: "phoenix_logo.avif" },
        { name: "Skulz Energy", file: "Skulz Energy.avif" },
        { name: "StockGro", file: "Stockgrow.avif" },
        { name: "StudX", file: "StudX.avif" },
        { name: "Taxiwars", file: "Taxiwars.avif" },
        { name: "The Juicr Farm", file: "The juicr farm.avif" },
        { name: "The King Sharma", file: "The king sharma.avif" },
        { name: "True Elements", file: "True elements.webp" },
        { name: "Zebronics", file: "Zebronics.avif" },
        { name: "Uber Eats", file: "Uber Eats.avif" },
        { name: "cordon technologies", file: "cordan.avif" },
        { name: "techvision", file: "techvision.avif" }
    ];

    for (const s of sponsors) {
        process.stdout.write(`  Sponsor: ${s.name}... `);
        const img = await uploadImage(path.join(SRC_PATH, 'assets/sponcors', s.file));
        const safeId = `sponsor-${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        await client.createOrReplace({
            _id: safeId, _type: 'sponsor', name: s.name, category: 'partner', logo: img
        });
        console.log('✅');
    }
}

async function migrateGuests() {
    console.log('🚀 Migrating Guests...');
    const guests = [
        { name: "Raj Shamani", role: "Founder, Shamani Industries", file: "Raj_Shamani_DSC00824_BG.avif" },
        { name: "Prajakta Koli", role: "Digital Content Creator", file: "prajakta koli.avif" },
        { name: "Pranit More", role: "Stand-up Comedian", file: "more pranit.avif" },
        { name: "Ishan Sharma", role: "Co-founder, MarkitUp", file: "ishan sharma.avif" },
        { name: "Radheshyam Das Ji", role: "President, ISKCON Pune", file: "radheshyam das.avif" },
        { name: "Ashish Bharatvanshi", role: "Historian & TEDx Speaker", file: "ashish bharatvanshi.avif" }
    ];

    for (const g of guests) {
        process.stdout.write(`  Guest: ${g.name}... `);
        const img = await uploadImage(path.join(SRC_PATH, 'assets/Guest', g.file));
        const safeId = `guest-${g.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        await client.createOrReplace({
            _id: safeId, _type: 'guest', name: g.name, role: g.role, image: img, linkedin: "#"
        });
        console.log('✅');
    }
}

async function migrateAlumni() {
    console.log('🚀 Migrating Alumni...');
    const alumni = [
        {
            id: "adesh-kolhe",
            name: "Adesh Kolhe",
            role: "Co-Founder",
            company: "BoomPanda",
            tagline: "India's Coolest Student Community",
            imageFile: "Adeshkolhe.avif",
            description: "Adesh Kolhe is a visionary entrepreneur and the co-founder of BoomPanda, India's coolest student community.",
            journey: [
                { year: "2018", title: "Joined Ecell SKNCOE", desc: "Started as an enthusiastic member." },
                { year: "2019", title: "Public Relations Head", desc: "Led relationship building." },
                { year: "2020", title: "Founded BoomPanda", desc: "Co-founded with Rudra Ghodke." }
            ],
            email: "adesh@boompanda.in",
            linkedin: "https://www.linkedin.com/in/adesh-kolhe/",
            color: "from-[#434343] to-[#000000]"
        },
        {
            id: "vikash-chaudhary",
            name: "Vikash Chaudhary",
            role: "Founder & CEO",
            company: "HackersEra",
            tagline: "Pioneering Cybersecurity Services",
            imageFile: "vikash.avif",
            description: "Vikash Chaudhary is the Founder and CEO of HackersEra, a pioneering cybersecurity service provider.",
            journey: [
                { year: "2015", title: "Founded HackersEra", desc: "Established a pioneering cybersecurity service provider." },
                { year: "Courses", title: "Developed Training Programs", desc: "Created 'Offensive Bug Bounty Hunter 2.0'." },
                { year: "2023", title: "Revenue Milestone", desc: "Annual revenue of ???2.29 crore for FY ending March 31, 2023." }
            ],
            email: "vikash@hackersera.com",
            linkedin: "https://www.linkedin.com/in/offensivehunter/",
            color: "from-[#000000] to-[#434343]"
        }
    ];

    for (const a of alumni) {
        process.stdout.write(`  Alumni: ${a.name}... `);
        const img = await uploadImage(path.join(SRC_PATH, 'assets', a.imageFile));
        await client.createOrReplace({
            _id: `alumni-${a.id}`,
            _type: 'alumni',
            name: a.name,
            role: a.role,
            company: a.company,
            tagline: a.tagline,
            profileImage: img,
            description: a.description,
            journey: a.journey,
            email: a.email,
            linkedin: a.linkedin,
            color: a.color
        });
        console.log('✅');
    }
}

async function migrateSettings() {
    console.log('🚀 Migrating Settings...');
    await client.createOrReplace({
        _id: 'siteSettings', _type: 'siteSettings', siteName: 'E-Cell SKNCOE',
        hero: {
            tagline: 'Dream. Discover. Disrupt.',
            title: 'Entrepreneurship Cell',
            subtitle: 'SKNCOE Pune',
            description: 'Empowering the next generation of innovators and leaders.'
        },
        about: {
            mission: 'Nurturing Entrepreneurial Spirit',
            description: 'E-Cell SKNCOE creates a vibrant ecosystem of learning, collaboration, and growth.',
            stats: [{ label: 'Events Participated', value: 1000, suffix: '+' }, { label: 'Events Organized', value: 10, suffix: '+' }, { label: 'Active Members', value: 150, suffix: '+' }]
        }
    });
}

async function run() {
    try {
        await migrateSettings();
        await migrateEvents();
        await migrateTeam();
        await migrateSponsors();
        await migrateGuests();
        await migrateAlumni();
        console.log('\n✨ ALL DATA RESTORED CORRECTLY! Refresh your site. 🚀');
    } catch (err) {
        console.error('\n❌ Fatal Error:', err.message);
    }
}

run();
