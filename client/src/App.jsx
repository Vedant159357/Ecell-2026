import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import StartupLoader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

<<<<<<< HEAD
const Home = lazy(() => import("./pages/Home"));
const Team = lazy(() => import("./pages/Team"));
const Eachevent = lazy(() => import("./pages/Eachevent"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Fusion = lazy(() => import("./pages/Fusion/Fusion"));
const Ideathon = lazy(() => import("./pages/Ideathon"));
const Econclave = lazy(() => import("./pages/Econclave/Econclave"));
const InternshipFair = lazy(() => import("./pages/InternshipFair"));
=======
import Home from "./pages/Home";
import Team from "./pages/Team";

import Eachevent from "./pages/Eachevent";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Fusion from "./pages/Fusion/Fusion";
>>>>>>> cff47177eef15fee4d208eff51cccc8dfbbe6d4b

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
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Layout>
<<<<<<< HEAD
            <Suspense fallback={<StartupLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Eachevent/:slug" element={<Eachevent />} />
                <Route path="/Team" element={<Team />} />
                <Route path="/Gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/fusion" element={<Fusion />} />
                <Route path="/ideathon" element={<Ideathon />} />
                <Route path="/econclave" element={<Econclave />} />
                <Route path="/internship-fair" element={<InternshipFair />} />
              </Routes>
            </Suspense>
=======
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Eachevent/:slug" element={<Eachevent />} />
              <Route path="/Team" element={<Team />} />
              <Route path="/Gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/fusion" element={<Fusion />} />
            </Routes>
>>>>>>> cff47177eef15fee4d208eff51cccc8dfbbe6d4b
          </Layout>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;