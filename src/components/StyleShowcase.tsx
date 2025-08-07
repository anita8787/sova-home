import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import styleScandinavian from '@/assets/style-scandinavian.jpg';
import styleAmerican from '@/assets/style-american.jpg';
import styleModern from '@/assets/style-modern.jpg';

const StyleShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const styles = [
    {
      id: 'scandinavian',
      name: '北歐簡約',
      description: '清新自然，注重功能與美感的平衡',
      image: styleScandinavian,
      link: '/products?style=scandinavian'
    },
    {
      id: 'american',
      name: '現代美式',
      description: '溫暖舒適，融合經典與當代元素',
      image: styleAmerican,
      link: '/products?style=american'
    },
    {
      id: 'modern',
      name: '當代簡約',
      description: '俐落線條，展現都會生活品味',
      image: styleModern,
      link: '/products?style=modern'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 水平排列，帶有傾斜角度
  const getCardPosition = (index: number) => {
    if (!isVisible) {
      return {
        transform: 'translateY(-50%) scale(0.8)',
        left: '50%',
        zIndex: 10 - index
      };
    }
    // 水平排列位置，帶有傾斜角度
    const positions = [
      { left: '20%', top: '50%', rotate: '-5deg' },   // 左邊：逆時針傾斜
      { left: '50%', top: '50%', rotate: '0deg' },    // 中間：不傾斜
      { left: '80%', top: '50%', rotate: '5deg' }     // 右邊：順時針傾斜
    ];
    return {
      left: positions[index].left,
      top: positions[index].top,
      transform: `translate(-50%, -50%) scale(1) rotate(${positions[index].rotate})`,
      zIndex: index
    };
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: "url('/sova-home/wood texture.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center" style={{ marginBottom: '10px' }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            多元風格選擇
          </h2>
          <p className="text-lg text-sova-secondary max-w-2xl mx-auto">
            無論您偏愛哪種居家風格，我們都能為您找到完美的沙發
          </p>
        </div>

        {/* 動態卡片展示區塊 - 增加高度避免切到 */}
        <div className="relative h-[600px] flex items-center justify-center">
          {/* 三張卡片的容器 */}
          <div className="relative w-full max-w-6xl h-full">
            {styles.map((style, index) => (
              <Link
                key={style.id}
                to={style.link}
                className={cn(
                  "absolute transition-all duration-1000 ease-out",
                  "group overflow-hidden rounded-2xl shadow-2xl",
                  "aspect-[3/4] w-56 md:w-72",
                  isVisible ? "opacity-100" : "opacity-0"
                )}
                style={{
                  ...getCardPosition(index),
                  transitionDelay: `${index * 200}ms`
                }}
                onMouseEnter={() => setHoveredStyle(style.id)}
                onMouseLeave={() => setHoveredStyle(null)}
              >
                {/* 背景圖片 */}
                <div className="absolute inset-0">
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>

                {/* 內容 */}
                <div className="relative z-10 p-4 h-full flex flex-col justify-end text-white">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#FAB44F] transition-colors duration-300">
                    {style.name}
                  </h3>
                  <p className="text-xs text-white/90 leading-relaxed mb-3">
                    {style.description}
                  </p>
                  {/* 懸停指示器 */}
                  <div className={cn(
                    "text-xs font-medium transition-all duration-300 flex items-center gap-1",
                    hoveredStyle === style.id 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-2"
                  )}>
                    探索風格
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                {/* 懸停時的邊框效果 */}
                <div className={cn(
                  "absolute inset-0 border-2 rounded-2xl transition-all duration-300",
                  hoveredStyle === style.id 
                    ? "border-[#FAB44F]/60 scale-105" 
                    : "border-transparent"
                )} />
                {/* 卡片陰影效果 */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl transition-all duration-300",
                  hoveredStyle === style.id 
                    ? "shadow-[0_25px_60px_rgba(185,122,86,0.4)]" 
                    : "shadow-[0_15px_40px_rgba(185,122,86,0.2)]"
                )} />
              </Link>
            ))}
          </div>
        </div>
        {/* 底部說明文字 */}
        <div className={cn(
          "text-center transition-all duration-1000 delay-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )} style={{ marginTop: '10px' }}>
          <p className="text-sova-secondary text-sm">
            點擊任一風格，探索更多相關商品
          </p>
        </div>
      </div>
    </section>
  );
};

export default StyleShowcase;