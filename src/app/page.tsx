import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BentoAboutSection from '@/components/BentoAboutSection';
import CareerJourney from '@/components/CareerJourney';
import ProjectShowcase from '@/components/ProjectShowcase';
import ContactSection from '@/components/ContactSection';
import HRDDock from '@/components/HRDDock';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <HeroSection />
      <BentoAboutSection />
      <CareerJourney />
      <ProjectShowcase />
      <ContactSection />
      <HRDDock />
    </main>
  );
}
