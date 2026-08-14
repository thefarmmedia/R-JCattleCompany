import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import Hero from "@/components/home/Hero";
import QuickHaulTool from "@/components/home/QuickHaulTool";
import CattleHaulingSection from "@/components/home/CattleHaulingSection";
import MileageCalculator from "@/components/home/MileageCalculator";
import ServiceAreaMap from "@/components/home/ServiceAreaMap";
import SaleBarnSection from "@/components/home/SaleBarnSection";
import FarmToFarmSection from "@/components/home/FarmToFarmSection";
import EquipmentHaulingTool from "@/components/home/EquipmentHaulingTool";
import CanWeHaulIt from "@/components/home/CanWeHaulIt";
import AgriculturalSection from "@/components/home/AgriculturalSection";
import AvailabilitySection from "@/components/home/AvailabilitySection";
import TextUsSection from "@/components/home/TextUsSection";
import HowItWorks from "@/components/home/HowItWorks";
import WhyPemberton from "@/components/home/WhyPemberton";
import Gallery from "@/components/home/Gallery";
import AutomationDemo from "@/components/home/AutomationDemo";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <QuickHaulTool />
        <CattleHaulingSection />
        <MileageCalculator />
        <ServiceAreaMap />
        <SaleBarnSection />
        <FarmToFarmSection />
        <EquipmentHaulingTool />
        <CanWeHaulIt />
        <AgriculturalSection />
        <AvailabilitySection />
        <TextUsSection />
        <HowItWorks />
        <WhyPemberton />
        <Gallery />
        <AutomationDemo />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
