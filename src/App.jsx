import { Routes, Route } from "react-router-dom"; 
import Header from './components/Header/Header.jsx';
import Footer from "./components/Footer/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProgramsAndInitiatives from "./pages/ProgramsAndInitiatives/ProgramsAndInitiatives.jsx";
import GetInvolved from "./pages/GetInvolved/GetInvolved.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse.jsx";
import Home from "./pages/Home/Home.jsx";
import Gallery from "./pages/Gallery/Gallery.jsx";
import UBApp from "./pages/UBApp/UBApp.jsx";
import BIUSTApp from "./pages/BIUSTApp/BIUSTApp.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy.jsx";
import './App.css';

const blobImages = [
  '/src/assets/fixed/icons/blob1.webp',
  '/src/assets/fixed/icons/blob3.webp',
  '/src/assets/fixed/icons/blob4.webp',
  '/src/assets/fixed/icons/blob2.webp',
];

function App() {
  return (
    <>
      <div className="background-blobs">
        {blobImages.map((blob, index) => (
          <img
            key={index}
            src={blob}
            alt={`Decorative blob ${index + 1}`}
            className={`blob blob-${index + 1}`}
          />
        ))}
      </div>
      <div className="app-content">
        <ScrollToTop /> {/* Ensures scroll-to-top functionality */}
        <Header />
        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs-and-initiatives" element={<ProgramsAndInitiatives />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/ablehearts-ub" element={<UBApp />} />
          <Route path="/ablehearts-biust" element={<BIUSTApp />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
