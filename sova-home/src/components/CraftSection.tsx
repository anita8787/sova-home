import React, { useRef } from 'react';

const archImages = [
  { src: '/p2 img3.JPG', alt: '舒適溫馨的沙發成品', caption: '舒適溫馨的沙發成品' },
  { src: '/p2 img2.JPG', alt: '明亮整潔的工作環境', caption: '明亮整潔的工作環境' },
  { src: '/p2 img1.JPG', alt: '專業的師傅精湛的工法', caption: '專業的師傅精湛的工法' },
];

const CraftSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-44 w-full relative" style={{ 
      backgroundColor: '#F8F6F0',
      position: 'relative'
    }}>
      {/* 材質圖 overlay - 提高透明度讓材質更明顯 */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'url(/texture.jpg)',
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
          {/* 左側：圖片橫向滾動區塊 (60% 寬度) */}
          <div className="w-[60%] relative">
            <div className="flex flex-col items-center justify-center h-full">
              {/* 圖片滾動容器 - 確保可以滾動 */}
              <div 
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto horizontal-scroll pb-2"
                style={{ 
                  scrollSnapType: 'x mandatory', 
                  scrollBehavior: 'smooth',
                  width: '100%',
                  maxWidth: '100%'
                }}
              >
                {/* 左邊間距，讓第一張圖被裁切 */}
                <div className="flex-none w-16"></div>
                
                {archImages.map((img, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-none w-56 md:w-72">
                    <div
                      className="h-80 md:h-96 bg-white border-4 border-[#B97A56] mb-4"
                      style={{
                        borderTopLeftRadius: '9999px',
                        borderTopRightRadius: '9999px',
                        borderBottomLeftRadius: '0',
                        borderBottomRightRadius: '0',
                        objectFit: 'cover',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.12), 0 3px 10px rgba(0,0,0,0.08)'
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                        style={{
                          borderTopLeftRadius: '9999px',
                          borderTopRightRadius: '9999px',
                          borderBottomLeftRadius: '0',
                          borderBottomRightRadius: '0',
                        }}
                      />
                    </div>
                    <div className="text-center text-base font-semibold text-[#7B4B27]">{img.caption}</div>
                  </div>
                ))}
                
                {/* 右邊間距 */}
                <div className="flex-none w-16"></div>
              </div>
            </div>
          </div>

          {/* 右側：cozy 內容區塊 (40% 寬度) */}
          <div className="w-[40%] relative pl-8">
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