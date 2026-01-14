
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

// Import images
import boroleImg from "../assets/Co-ordinators/borole.jpeg";
import daveImg from "../assets/Co-ordinators/ruchiDave.jpeg";
import railkarImg from "../assets/Co-ordinators/Prailkar.jpeg";
import nagtilakImg from "../assets/Co-ordinators/SNagtalik.jpeg";
import ranjanImg from "../assets/Co-ordinators/prabhat.jpeg";
// Placeholder for missing images or map remaining numbered images if known
// import img1 from "../assets/Co-ordinators/1.jpeg"; 
// import img2 from "../assets/Co-ordinators/2.jpeg";
// import img3 from "../assets/Co-ordinators/3.jpeg";

const facultyData = {
  president: {
    name: "Dr. K. R. Borole",
    role: "IIC President",
    department: "",
    image: boroleImg,
  },
  vicePresident: [
    {
      name: "Prof. R. G. Dave",
      role: "IIC Vice-President & Start-up Activity Coordinator",
      department: "",
      image: daveImg,
    },
  ],
  convener: [
    {
      name: "Dr. P. N. Railkar",
      role: "IIC Convener & Computer Dept. Coordinator",
      department: "Computer Department",
      image: railkarImg,
    },
  ],
  coordinators: [
    {
      name: "Prof. S. A. Nagtilak",
      role: "ARIIA Coordinator & IT Dept. Coordinator",
      department: "IT Department",
      image: nagtilakImg,
    },
    {
      name: "Dr. Prabhat Ranjan",
      role: "IIC Member & Mechanical Dept. Coordinator",
      department: "Mechanical Department",
      image: ranjanImg,
    },
    {
      name: "Prof. S.R. Patil",
      role: "IPR Activity Coordinator & E&TC Dept. Coordinator",
      department: "E&TC Department",
      image: null, // Image to be uploaded
    },
    {
      name: "Dr. S. L. Charkha",
      role: "Internship Activity Coordinator & MBA Dept. Coordinator",
      department: "MBA Department",
      image: null, // Image to be uploaded
    },
    {
      name: "Dr. G. S. Dave",
      role: "Innovation Activity Coordinator",
      department: "",
      image: null, // Image to be uploaded
    },
    {
      name: "Prof. Ashish Dharme",
      role: "Social Media Coordinator",
      department: "",
      image: null, // Image to be uploaded
    },
    {
      name: "Mrs. K. S. Borgave",
      role: "NIRF Coordinator",
      department: "",
      image: null, // Image to be uploaded
    },
  ],
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const FacultyCard = ({ member, size = "md" }) => {
  const isLarge = size === "lg";
  return (
    <Card className={`p - 6 bg - [#0e0e0e] / 80 border - white / 10 hover: border - [#00eaff] transition - all rounded - xl text - center flex flex - col items - center justify - center ${isLarge ? "py-10" : ""} `}>
      <Avatar className={`${isLarge ? "w-32 h-32" : "w-24 h-24"} mb - 4 shadow - md border - 2 border - white / 10`}>
        <AvatarImage
          src={member.image}
          alt={member.name}
          className="object-cover"
        />
        <AvatarFallback className="bg-gray-800 text-white text-lg">
          {getInitials(member.name)}
        </AvatarFallback>
      </Avatar>

      <h3 className={`${isLarge ? "text-2xl" : "text-xl"} font - semibold text - white`}>
        {member.name}
      </h3>
      <p className="text-[#00eaff] text-sm mt-1">{member.role}</p>
      {member.department && (
        <p className="text-gray-400 text-xs mt-1">{member.department}</p>
      )}
    </Card>
  );
};

export default function Faculty() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 px-6 pb-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Faculty <span className="text-[#00eaff]">Coordinators</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Guiding us with experience, leadership, and vision.
          </p>
        </div>

        {/* President */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <FacultyCard member={facultyData.president} size="lg" />
        </motion.div>

        {/* Vice President & Convener */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          {facultyData.vicePresident.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FacultyCard member={member} />
            </motion.div>
          ))}
          {facultyData.convener.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FacultyCard member={member} />
            </motion.div>
          ))}
        </div>

        {/* Coordinators */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {facultyData.coordinators.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <FacultyCard member={member} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
