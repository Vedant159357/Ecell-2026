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
import Fusion from "./pages/Fusion/Fusion";

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout component to handle conditional rendering of Navbar and Footer
function Layout({ children }) {
  const location = useLocation();
  const isFusionPage = location.pathname === '/fusion';

  return (
    <>
      {!isFusionPage && <Navbar />}
      <div className={!isFusionPage ? "min-h-screen" : ""}>
        {children}
      </div>
      {!isFusionPage && <Footer />}
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#213448] min-h-screen">
      {loading && <StartupLoader onComplete={() => setLoading(false)} />}

      {!loading && (
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Eachevent/:slug" element={<Eachevent />} />
              <Route path="/Team" element={<Team />} />
              <Route path="/Gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/fusion" element={<Fusion />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;