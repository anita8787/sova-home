import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CraftSection from '@/components/CraftSection';
import StyleShowcase from '@/components/StyleShowcase';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <CraftSection />
      <StyleShowcase />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Index;
