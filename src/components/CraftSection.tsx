import React, { useRef, useState, useCallback, useEffect } from 'react';

const archImages = [
  { src: '/p2 img3.JPG', alt: '舒適溫馨的沙發成品', caption: '舒適溫馨的沙發成品' },
  { src: '/p2 img2.JPG', alt: '明亮整潔的工作環境', caption: '明亮整潔的工作環境' },
  { src: '/p2 img1.JPG', alt: '專業的師傅精湛的工法', caption: '專業的師傅精湛的工法' },
];

const CraftSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 滑鼠按下事件
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    
    // 改變游標樣式
    scrollRef.current.style.cursor = 'grabbing';
  }, []);

  // 滑鼠移動事件
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // 調整拖拽敏感度
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  // 滑鼠放開事件
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  }, []);

  // 滑鼠離開事件
  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    setHoveredIndex(null);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  }, []);

  // 滾動監聽器 - 計算滾動進度
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollPosition = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    // 計算滾動進度 (0 到 1)
    const progress = maxScroll > 0 ? scrollPosition / maxScroll : 0;
    setScrollProgress(Math.max(0, Math.min(1, progress)));
  }, []);

  // 監聽滾動事件
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    
    // 初始化滾動進度
    handleScroll();
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <section className="py-44 w-full relative" style={{ 
      backgroundColor: '#F8F6F0',
      position: 'relative'
    }}>
      {/* 材質圖 overlay - 提高透明度讓材質更明顯 */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'url(/sova-home/texture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.4,
          mixBlendMode: 'multiply'
        }}
      />
      {/* 顆粒材質 SVG overlay */}
      <div className="absolute inset-0 pointer-events-none z-1" style={{mixBlendMode:'multiply'}}>
        <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.12"/>
        </svg>
      </div>

      {/* 專業左右分區結構 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex">
          {/* 左側：圖片橫向滾動區塊 (60% 寬度) - 添加邊界控制 */}
          <div className="w-[60%] relative" style={{ overflow: 'hidden' }}>
            <div className="flex flex-col items-center justify-center h-full">
              {/* 圖片滾動容器 - 隱藏原生滾動條 */}
              <div 
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto select-none"
                style={{ 
                  scrollSnapType: 'x mandatory', 
                  scrollBehavior: isDragging ? 'auto' : 'smooth',
                  width: '100%',
                  maxWidth: '100%',
                  cursor: 'grab',
                  paddingBottom: '1rem',
                  paddingTop: '3rem',
                  paddingLeft: '2rem',
                  paddingRight: '2rem',
                  // 隱藏所有瀏覽器的原生滾動條
                  scrollbarWidth: 'none', // Firefox
                  msOverflowStyle: 'none', // IE and Edge
                  WebkitOverflowScrolling: 'touch', // iOS
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {/* 左邊間距，讓第一張圖被裁切 */}
                <div className="flex-none w-8"></div>
                
                {archImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col items-center flex-none w-56 md:w-72 relative"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      // 為每個圖片容器設置適當的空間
                      padding: '1rem 0.5rem',
                      scrollSnapAlign: 'center'
                    }}
                  >
                    <div
                      className="relative h-80 md:h-96 bg-white border-4 border-[#B97A56] mb-4 transition-all duration-300 ease-out"
                      style={{
                        borderTopLeftRadius: '9999px',
                        borderTopRightRadius: '9999px',
                        borderBottomLeftRadius: '0',
                        borderBottomRightRadius: '0',
                        objectFit: 'cover',
                        boxShadow: hoveredIndex === idx 
                          ? '0 15px 35px rgba(0,0,0,0.2), 0 8px 15px rgba(0,0,0,0.12)'
                          : '0 6px 20px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08)',
                        // 調整放大效果：減少放大倍數，主要向上和左右均勻放大
                        transform: hoveredIndex === idx 
                          ? 'scale(1.05) translateY(-8px)' 
                          : 'scale(1)',
                        // 降低 z-index，避免擋到右側內容
                        zIndex: hoveredIndex === idx ? 20 : 10,
                        // 確保放大不會超出左側區域邊界
                        maxWidth: '100%'
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover pointer-events-none"
                        style={{
                          borderTopLeftRadius: '9999px',
                          borderTopRightRadius: '9999px',
                          borderBottomLeftRadius: '0',
                          borderBottomRightRadius: '0',
                        }}
                        draggable={false}
                      />
                      
                      {/* 懸停時的微妙光暈效果 */}
                      {hoveredIndex === idx && (
                        <div 
                          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                          style={{
                            background: 'linear-gradient(135deg, rgba(185, 122, 86, 0.08) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(185, 122, 86, 0.08) 100%)',
                            borderTopLeftRadius: '9999px',
                            borderTopRightRadius: '9999px',
                            borderBottomLeftRadius: '0',
                            borderBottomRightRadius: '0',
                          }}
                        />
                      )}
                    </div>
                    <div 
                      className="text-center text-base font-semibold text-[#7B4B27] pointer-events-none transition-all duration-300"
                      style={{
                        transform: hoveredIndex === idx ? 'translateY(-3px)' : 'translateY(0)',
                        opacity: hoveredIndex === idx ? 0.9 : 1
                      }}
                    >
                      {img.caption}
                    </div>
                  </div>
                ))}
                
                {/* 右邊間距 */}
                <div className="flex-none w-8"></div>
              </div>
              
              {/* 品牌色系短進度條 */}
              <div className="flex justify-center mt-6">
                <div className="relative">
                  {/* 背景軌道 */}
                  <div 
                    className="h-1 rounded-full"
                    style={{
                      width: '80px', // 較短的進度條
                      backgroundColor: '#D4C4B0',
                      opacity: 0.4
                    }}
                  />
                  {/* 進度指示 */}
                  <div 
                    className="absolute top-0 left-0 h-1 rounded-full transition-all duration-200 ease-out"
                    style={{
                      width: `${scrollProgress * 80}px`, // 根據滾動進度調整寬度
                      backgroundColor: '#B97A56',
                      boxShadow: '0 0 6px rgba(185, 122, 86, 0.4)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 右側：cozy 內容區塊 (40% 寬度) - 確保不被遮擋 */}
          <div className="w-[40%] relative pl-8" style={{ zIndex: 30 }}>
            <div className="relative" style={{minHeight:'320px'}}>
              {/* 背後大 cozy 字與紅圈圈，只在 cozy 內容區塊內，調整位置避免過度重疊 */}
              <span
                className="absolute left-[-20px] top-[-60px] text-[4rem] md:text-[6rem] font-extrabold select-none pointer-events-none z-0"
                style={{
                  background: 'linear-gradient(135deg, #F7E18B 0%, #E6C77E 30%, #B47B2D 70%, #8B5A2B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 'bold',
                  opacity: 0.2,
                  lineHeight: 1,
                  fontFamily: 'inherit',
                  zIndex: 0
                }}
              >
                cozy
              </span>
              {/* 環環相扣的圓圈組合 - 在大字右側的右上角區域，不蓋到任何文字 */}
              <svg width="300" height="200" className="absolute left-[180px] top-[-120px] z-0" style={{overflow:'visible', pointerEvents:'none'}}>
                {/* 大正圓形 - 起始點，在大字右側 */}
                <circle cx="60" cy="60" r="40" stroke="#A94442" strokeWidth="2" fill="none" opacity="0.6"/>
                {/* 中橢圓形 - 往右上方 */}
                <ellipse cx="110" cy="30" rx="28" ry="18" stroke="#A94442" strokeWidth="2" fill="none" opacity="0.7"/>
                {/* 小正圓形 - 再往右上方 */}
                <circle cx="150" cy="5" r="15" stroke="#A94442" strokeWidth="2" fill="none" opacity="0.8"/>
                {/* 小橢圓形 - 最右上方 */}
                <ellipse cx="180" cy="-15" rx="12" ry="8" stroke="#A94442" strokeWidth="2" fill="none" opacity="0.9"/>
              </svg>
              
              {/* cozy 主標題、Comfort is more than a feeling、副標、內文 全部左對齊 */}
              <div className="relative flex flex-col items-start z-10 mt-12 w-full">
                <span className="text-[2.5rem] md:text-[3.5rem] font-extrabold text-[#222] leading-none">cozy</span>
                <div className="text-lg font-semibold text-[#222] mt-4 mb-1">Comfort is more than a feeling</div>
                <div className="text-sm italic text-[#A94442] mb-4">—it's a lifestyle</div>
                <div className="text-[#222] text-base leading-relaxed max-w-full z-20">
                  「每一張沙發的背後，都凝聚了工匠數十年的技藝與對品質的執著。我們堅信，真正的舒適來自於細節的用心，從框架的結構設計到面料的挑選，每一道工序都經過嚴格把控。為了達到極致的舒適感，我們堅持採用高密度海綿與進口材料，並結合工匠的純熟手工技術，確保沙發不僅外觀精美，內在結構也同樣耐用穩固。」
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftSection;
