import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SuitsNavbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-transparent backdrop-blur-md border-b border-white/5"
        >
            <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-1 bg-[#ED1C24]" />
                <span className="text-white font-black italic tracking-tighter text-xl">SUITS <span className="font-light not-italic tracking-normal text-sm border-l border-white/20 ml-2 pl-2">IDEATHON</span></span>
            </Link>

            <div className="hidden md:flex items-center gap-12">
                {["Overview", "The Rounds", "Prize", "FAQ"].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase().replace(" ", "-")}`}
                        className="text-white/60 hover:text-[#ED1C24] text-xs font-bold uppercase tracking-[0.2em] transition-colors"
                    >
                        {item}
                    </a>
                ))}
            </div>

            <button className="bg-white text-black px-6 py-2 text-xs font-black uppercase tracking-widest hover:bg-[#ED1C24] hover:text-white transition-all">
                The Closing
            </button>
        </motion.nav>
    );
}
