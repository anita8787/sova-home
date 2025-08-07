import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AnimatedContent from '@/components/AnimatedContent';

const Hero = () => {
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowLine1(true), 200);
    setTimeout(() => setShowLine2(true), 900);
  }, []);

  const handleExploreProducts = () => {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero img.JPG')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-left text-white max-w-lg ml-16 px-4 flex flex-col items-start">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className={`block transition-all duration-700 ${showLine1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>生活的儀式感</span>
          <span className={`block transition-all duration-700 mt-[20px] ${showLine2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>從沙發開始</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90 leading-relaxed">
          融合北歐簡約與現代美式溫暖，為您打造質感居家空間
        </p>
        <AnimatedContent distance={60} direction="vertical" duration={0.8} ease="power3.out">
          <Button
            size="lg"
            onClick={handleExploreProducts}
            className="group flex items-center gap-2 px-6 py-2 rounded-full shadow transition-colors duration-200"
            style={{
              background: '#B57E4F',
              color: '#FFF8EE',
              fontWeight: 600,
              fontSize: '1.1rem',
              border: 'none',
              boxShadow: '0 2px 8px 0 rgba(181,126,79,0.08)',
              minHeight: '44px',
              minWidth: 'fit-content',
              letterSpacing: '0.02em',
              borderRadius: '999px',
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#FAB44F'; e.currentTarget.style.color = '#432818'; }}
            onMouseOut={e => { e.currentTarget.style.background = '#B57E4F'; e.currentTarget.style.color = '#FFF8EE'; }}
          >
            探索產品
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-[0.3rem]" />
          </Button>
        </AnimatedContent>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;