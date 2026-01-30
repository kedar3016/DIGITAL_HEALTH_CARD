import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Roles from "../components/Roles";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import ChatWidget from "../components/ChatWidget";

export default function Landing() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)"
    }}>
      <Navbar />
      <Hero />
      <Features />
      <AboutUs />
      <Roles />
      <HowItWorks />
      <Testimonials />
      <ContactUs />
      <Footer />
      {/* Gemini AI Studio API key is now set */}
      <ChatWidget />
    </div>
  );
}
