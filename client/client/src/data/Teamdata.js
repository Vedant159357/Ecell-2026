// src/data/teamData.js
// Simple structure like IIC E-Cell SKNCOE
import tanishq from "../assets/core-members/Tanishq Shroff.avif";
import anjali from "../assets/core-members/Anjali Kumhar.avif";
import ghuge from "../assets/core-members/Shivam Ghuge.avif";
import yukta from "../assets/core-members/Yukta Patil.avif";
import dhruv from "../assets/core-members/DHRUV UNHALE.avif";
import jayesh from "../assets/core-members/jayesh jadhav.avif";
import neel from "../assets/core-members/Neel Rawal.avif";
import ram from "../assets/core-members/Ram Burange.avif";
import vedika from "../assets/core-members/Vedika Kharate.avif";
import aryan from "../assets/core-members/Aryan Agrawal.avif";
import ragini from "../assets/core-members/Ragini Devkar.avif";
import vinit from "../assets/core-members/Vinit Limkar.avif";
import rajshri from "../assets/core-members/Rajshri Dhage.avif";
import shyam from "../assets/core-members/Shyam.avif";
import kaushal from "../assets/core-members/Kaushal Masare.avif";
import shubh from "../assets/core-members/Shubham Sharma.avif";
import shantanu from "../assets/core-members/Shantanu Mapre.avif";
import ketan from "../assets/core-members/Ketan Patil.avif";
import vedant from "../assets/core-members/Vedant satpute.avif";
import rutu from "../assets/core-members/Rutuja Yelgate.avif";

// Faculty Images
import boroleImg from "../assets/Co-ordinators/borole.avif";
import daveImg from "../assets/Co-ordinators/ruchiDave.avif";
import railkarImg from "../assets/Co-ordinators/Prailkar.avif";
import nagtilakImg from "../assets/Co-ordinators/SNagtalik.avif";
import ranjanImg from "../assets/Co-ordinators/prabhat.avif";
export const teamData = {
  // Faculty/Mentors
  faculty: [
    {
      id: 1,
      name: "Dr. K. R. Borole",
      position: "IIC President",
      image: boroleImg,
      linkedin: "#",
      hierarchy: "president",
    },
    {
      id: 2,
      name: "Prof. R. G. Dave",
      position: "IIC Vice-President & Start-up Activity Coordinator",
      image: daveImg,
      linkedin: "#",
      hierarchy: "vicePresident",
    },
    {
      id: 3,
      name: "Dr. P. N. Railkar",
      position: "IIC Convener & Computer Dept. Coordinator",
      image: railkarImg,
      linkedin: "#",
      hierarchy: "convener",
      alignment: "object-top",
    },
    {
      id: 4,
      name: "Prof. S. A. Nagtilak",
      position: "ARIIA Coordinator & IT Dept. Coordinator",
      image: nagtilakImg,
      linkedin: "#",
      hierarchy: "coordinator",
    },
    {
      id: 5,
      name: "Dr. Prabhat Ranjan",
      position: "IIC Member & Mechanical Dept. Coordinator",
      image: ranjanImg,
      linkedin: "#",
      hierarchy: "coordinator",
    },
    {
      id: 6,
      name: "Prof. S.R. Patil",
      position: "IPR Activity Coordinator & E&TC Dept. Coordinator",
      image: "https://ui-avatars.com/api/?name=S+R+Patil&background=random", // Placeholder or use a local placeholder if available
      linkedin: "#",
      hierarchy: "coordinator",
    },
    {
      id: 7,
      name: "Dr. S. L. Charkha",
      position: "Internship Activity Coordinator & MBA Dept. Coordinator",
      image: "https://ui-avatars.com/api/?name=S+L+Charkha&background=random",
      linkedin: "#",
      hierarchy: "coordinator",
    },
    {
      id: 8,
      name: "Dr. G. S. Dave",
      position: "Innovation Activity Coordinator",
      image: "https://ui-avatars.com/api/?name=G+S+Dave&background=random",
      linkedin: "#",
      hierarchy: "coordinator",
    },
    {
      id: 9,
      name: "Prof. Ashish Dharme",
      position: "Social Media Coordinator",
      image: "https://ui-avatars.com/api/?name=Ashish+Dharme&background=random",
      linkedin: "#",
      hierarchy: "coordinator",
    },
    {
      id: 10,
      name: "Mrs. K. S. Borgave",
      position: "NIRF Coordinator",
      image: "https://ui-avatars.com/api/?name=K+S+Borgave&background=random",
      linkedin: "#",
      hierarchy: "coordinator",
    },
  ],

  // Core Team Members
  coreTeam: [
    {
      id: 1,
      name: "Tanishq Shroff",
      position: "President",
      image: tanishq,
      linkedin: "https://www.linkedin.com/in/tanishqshroff/",
    },
    {
      id: 2,
      name: "Anjali Kumhar",
      position: "Vice President",
      image: anjali,
      linkedin: "https://linkedin.com/in/snehapatel",
    },
    {
      id: 3,
      name: "Shivam Ghuge",
      position: "General secretary",
      image: ghuge,
      linkedin: "https://linkedin.com/in/rahulverma",
    },
    {
      id: 4,
      name: "Shantanu Mapare",
      position: "Cheif of operation",
      image: shantanu,
      linkedin: "https://linkedin.com/in/ananyasingh",
    },
    {
      id: 5,
      name: "Ram Burange",
      position: "Tresurer",
      image: ram,
      linkedin: "https://linkedin.com/in/vikramjoshi",
    },
    {
      id: 6,
      name: "Shubham Sharma",
      position: "Tresurer",
      image: shubh,
      linkedin: "https://linkedin.com/in/ananyasingh",
    },
    {
      id: 7,
      name: "Yukta Patil",
      position: "PR Head",
      image: yukta,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 8,
      name: "Dhruv Unhale",
      position: "PR Head",
      image: dhruv,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 9,
      name: "Jayesh Jadhav",
      position: "PR Head",
      image: jayesh,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 10,
      name: "Neel Rawal",
      position: "Start-up Incubation Head",
      image: neel,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 11,
      name: "Rutuja Yelgate",
      position: "Sponsorship Head",
      image: rutu,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },

    {
      id: 12,
      name: "Rajshri Dhage",
      position: "Sponsorship Head",
      image: rajshri,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 13,
      name: "Vedika Kharate",
      position: "Sponsorship Head",
      image: vedika,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 14,
      name: "Ketan Patil",
      position: "Digital Media Head",
      image: ketan,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 15,
      name: "Aryan Agarwal",
      position: "Digital Media Head",
      image: aryan,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 16,
      name: "Ragini Devkar",
      position: "Administrative Affairs Head",
      image: ragini,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 17,
      name: "Vedant Satpute",
      position: "Technical Head",
      image: vedant,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 18,
      name: "Shyam Talekar",
      position: "Technical Head",
      image: shyam,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 19,
      name: "Vinit Limkar",
      position: "Technical Head",
      image: vinit,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
    {
      id: 20,
      name: "kaushal Masare",
      position: "Technical Head",
      image: kaushal,
      linkedin: "https://linkedin.com/in/riyakapoor",
    },
  ],
};

// Helper functions
export const getAllMembers = () => {
  return {
    faculty: teamData.faculty,
    coreTeam: teamData.coreTeam,
  };
};

export const getCoreTeam = () => teamData.coreTeam;
export const getFaculty = () => teamData.faculty;
