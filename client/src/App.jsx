import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import StartupLoader, { PageLoader } from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Team = lazy(() => import("./pages/Team"));
const Eachevent = lazy(() => import("./pages/Eachevent"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Fusion = lazy(() => import("./pages/Fusion/Fusion"));
const Ideathon = lazy(() => import("./pages/Ideathon"));
const Econclave = lazy(() => import("./pages/Econclave/Econclave"));
const InternshipFair = lazy(() => import("./pages/InternshipFair"));

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
  const isStandalonePage = [
    '/fusion',
    '/econclave',
    '/ideathon',
    '/internship-fair'
  ].includes(location.pathname);

  return (
    <>
      {!isStandalonePage && <Navbar />}
      <div className={!isStandalonePage ? "min-h-screen" : ""}>
        {children}
      </div>
      {!isStandalonePage && <Footer />}
    </>
  );
}

function App() {
  // Show global loader ONLY for the home page
  const isHome = window.location.pathname === '/';
  const [loading, setLoading] = useState(isHome);

  return (
    <div className="bg-[#213448] min-h-screen">
      {loading && isHome && <StartupLoader onComplete={() => setLoading(false)} />}

      {(!loading || !isHome) && (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Layout>
            <Suspense fallback={<PageLoader />}>
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
          </Layout>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;