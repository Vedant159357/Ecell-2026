import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import StartupLoader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Team from "./pages/Team";

import Eachevent from "./pages/Eachevent";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#213448] min-h-screen">
      {loading && <StartupLoader onComplete={() => setLoading(false)} />}

      {!loading && (
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Eachevent/:slug" element={<Eachevent />} />
              <Route path="/Team" element={<Team />} />
              <Route path="/Gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;