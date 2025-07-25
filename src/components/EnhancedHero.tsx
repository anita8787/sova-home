import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // 背景圖片輪播
  const heroSlides = [
    {
      image: '/hero img.JPG',
      title: '生活的儀式感',
      subtitle: '從沙發開始',
      description: '每一個溫暖的午後，都值得一張完美的沙發來承載',
      cta: '探索產品',
      ctaLink: '/products'
    },
    {
      image: '/理念首圖.JPG',
      title: '北歐簡約',
      subtitle: '溫暖設計',
      description: '融合斯堪地納維亞的純淨美學與東方的溫潤情懷',
      cta: '品牌理念',
      ctaLink: '/about'
    },
    {
      image: '/品牌理念核心圖.JPG',
      title: '專屬訂製',
      subtitle: '獨一無二',
      description: '為您的空間量身打造，讓每個角落都散發個人風格',
      cta: '立即客製',
      ctaLink: '/customization'
    }
  ];

  // 滾動視差效果
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 元素可見性檢測
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 自動輪播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 背景圖片與視差效果 */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          >
            <img
              src={slide.image}
              alt="SOVA 溫感家居"
              className="w-full h-full object-cover scale-110"
            />
            {/* 多層次遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          </div>
        ))}
      </div>

      {/* 浮動裝飾元素 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 左上裝飾 */}
        <div 
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-sova-accent/10 backdrop-blur-sm"
          style={{
            transform: `translate(${scrollY * -0.3}px, ${scrollY * 0.2}px)`,
          }}
        />
        
        {/* 右下裝飾 */}
        <div 
          className="absolute bottom-32 right-32 w-24 h-24 rounded-full bg-sova-primary/10 backdrop-blur-sm"
          style={{
            transform: `translate(${scrollY * 0.2}px, ${scrollY * -0.1}px)`,
          }}
        />

        {/* 飄浮光點 */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-sova-accent opacity-20 animate-pulse"
            style={{
              top: `${20 + i * 15}%`,
              right: `${10 + i * 8}%`,
              animationDelay: `${i * 0.8}s`,
              transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`,
            }}
          />
        ))}
      </div>

      {/* 主要內容 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* 品牌標誌 */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <Sparkles className="w-5 h-5 text-sova-accent" />
              <span className="text-white font-medium tracking-wide">SOVA 溫感家居</span>
              <Heart className="w-5 h-5 text-sova-accent animate-pulse" />
            </div>
          </div>

          {/* 主標題 */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            <span className="block">{currentSlideData.title}</span>
            <span 
              className="block text-sova-accent mt-2"
              style={{
                transform: `translateY(${scrollY * -0.15}px)`,
              }}
            >
              {currentSlideData.subtitle}
            </span>
          </h1>

          {/* 描述文字 */}
          <p 
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
            }}
          >
            {currentSlideData.description}
          </p>

          {/* CTA 按鈕群 */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            style={{
              transform: `translateY(${scrollY * -0.08}px)`,
            }}
          >
            <Link to={currentSlideData.ctaLink}>
              <Button 
                size="lg" 
                className="bg-sova-accent hover:bg-sova-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
              >
                {currentSlideData.cta}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-sova-primary px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm bg-white/10 transition-all duration-300 group"
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              品牌故事
            </Button>
          </div>
        </div>
      </div>

      {/* 滑動指示點 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-sova-accent scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`切換到第 ${index + 1} 張圖片`}
          />
        ))}
      </div>

      {/* 滾動提示 */}
      <div 
        className="absolute bottom-8 right-8 text-white/70 text-sm animate-bounce"
        style={{
          transform: `translateY(${scrollY * -0.3}px)`,
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="tracking-wide">探索更多</span>
        </div>
      </div>

      {/* 背景紋理 */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default EnhancedHero;