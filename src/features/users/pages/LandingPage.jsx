import HeroSection from "../components/landing/HeroSection";
import TrustedCompanies from "../components/landing/TrustedCompanies";
import StatsSection from "../components/landing/StatsSection";
import LearningPaths from "../components/landing/LearningPaths";
import CategoriesSection from "../components/landing/CategoriesSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import FAQSection from "../components/landing/FAQSection";
import MobileAppCTA from "../components/landing/MobileAppCTA";
import FinalCTA from "../components/landing/FinalCTA";
import "../components/landing/Landing.css";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-white via-gray-50 to-white font-sans">
      <HeroSection />
      {/* <TrustedCompanies /> */}
      <StatsSection />
      {/* <LearningPaths /> */}
      {/* <CategoriesSection /> */}
      <FeaturesSection />
      <FAQSection />
      <MobileAppCTA />
      <FinalCTA />
    </div>
  );
}
