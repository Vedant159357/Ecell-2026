import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "../components/ideathon/HeroSection";
import Overview from "../components/ideathon/Overview";
import RoundsTimeline from "../components/ideathon/RoundsTimeline";
import PrizePool from "../components/ideathon/PrizePool";
import Schedule from "../components/ideathon/Schedule";
import Registration from "../components/ideathon/Registration";
import Venue from "../components/ideathon/Venue";
import FAQ from "../components/ideathon/FAQ";
import ContactSection from "../components/ideathon/ContactSection";
import SuitsLoader from "../components/ideathon/SuitsLoader";
import IdeathonNav from "../components/ideathon/IdeathonNav";
import IdeathonFooter from "../components/ideathon/IdeathonFooter";
import "../components/ideathon/ideathon.css";

export default function Ideathon() {
    const [loading, setLoading] = useState(true);

    return (
        <div className="suits-theme bg-black text-white min-h-screen">
            <AnimatePresence>
                {loading && <SuitsLoader onComplete={() => setLoading(false)} />}
            </AnimatePresence>

            {!loading && (
                <>
                    <IdeathonNav />
                    <div className="nyc-overlay pinstripe-overlay">
                        <HeroSection />
                        <Overview />
                        <RoundsTimeline />
                        <PrizePool />
                        <Schedule />
                        <Registration />
                        <Venue />
                        <FAQ />
                    </div>
                    <IdeathonFooter />
                </>
            )}
        </div>
    );
}
