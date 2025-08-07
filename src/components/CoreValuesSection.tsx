import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

interface CoreValue {
  id: number;
  title: string;
  englishTitle: string;
  description: string;
  image: string;
  corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CoreValuesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const coreValues: CoreValue[] = [
    { id: 1, title: "品質堅持", englishTitle: "QUALITY", description: "只為打造一張真正能陪伴生活的沙發\n我們選用高品質結構與面料，強調木作基底的穩定性與職人工藝，讓沙發不只是風格，更是生活裡可靠的依靠。", image: "/sova-home/品質堅持.jpg", corner: "bottom-right" },
    { id: 2, title: "以人為本", englishTitle: "HUMAN-CENTERED", description: "從使用者出發，設計你真正需要的沙發\n不管是租屋族、小家庭，或是重視生活品味的人，我們從實際使用情境出發，關注日常習慣與細節設計，讓沙發真正貼近你的日常。", image: "/sova-home/以人為本.jpg", corner: "top-right" },
    { id: 3, title: "設計美學", englishTitle: "AESTHETICS", description: "北歐線條 × 美式溫暖 × 圓潤親和力\n融合北歐的簡約美學與美式的溫暖氛圍，沙發設計講究比例與觸感，展現低調卻不單調的風格，無論任何空間都能成為視覺亮點。", image: "/sova-home/設計美學.jpg", corner: "top-left" },
    { id: 4, title: "靈動模組", englishTitle: "MODULAR", description: "因空間而變，為生活而動\n跳脫傳統模組沙發僅能「換位置」的框架，打造真正能自由變形、輕鬆拼接的靈活設計。不只移動，還能應對各種租屋場景與空間限制，讓小坪數也能創造最大可能。", image: "/sova-home/北歐.png", corner: "bottom-left" }
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(Math.floor(latest * coreValues.length), coreValues.length - 1);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, coreValues.length, currentIndex]);

  const currentItem = coreValues[currentIndex];

  const getImagePosition = (corner: CoreValue['corner']): React.CSSProperties => {
    const width = '65%';
    const height = '65%';
    
    switch (corner) {
      case 'top-left':     return { top: '0%', left: '0%', width, height };
      case 'top-right':    return { top: '0%', right: '0%', width, height };
      case 'bottom-left':  return { bottom: '0%', left: '0%', width, height };
      case 'bottom-right': return { bottom: '0%', right: '0%', width, height };
    }
  };

  const getSquareLinePosition = (corner: CoreValue['corner']): React.CSSProperties => {
    return getImagePosition(corner); // Keep them identical
  };

  const getBorderRadius = (corner: CoreValue['corner']): React.CSSProperties => {
    const radius = "80px";
    switch (corner) {
      case 'top-left':     return { borderBottomRightRadius: radius };
      case 'top-right':    return { borderBottomLeftRadius: radius };
      case 'bottom-left':  return { borderTopRightRadius: radius };
      case 'bottom-right': return { borderTopLeftRadius: radius };
    }
  };

  // 1. Corrected Border Definitions based on visual design
  const getBorderStyles = (corner: CoreValue['corner']): React.CSSProperties => {
    const borderStyle = '4px solid white';
    switch (corner) {
      // "品質堅持" - L-border is top-left
      case 'bottom-right': return { borderTop: borderStyle, borderLeft: borderStyle };
      // "以人為本" - L-border is bottom-left
      case 'top-right':    return { borderBottom: borderStyle, borderLeft: borderStyle };
      // "設計美學" - L-border is bottom-right
      case 'top-left':     return { borderBottom: borderStyle, borderRight: borderStyle };
      // "靈動模組" - L-border is top-right
      case 'bottom-left':  return { borderTop: borderStyle, borderRight: borderStyle };
    }
  };

  // 2. UNIFIED Line Extension Logic, adapted for each corner from the working "品質堅持" case
  const getExtendedLines = (corner: CoreValue['corner']) => {
    const lineStyle = {
      position: 'absolute' as const,
      backgroundColor: 'white',
      zIndex: 5
    };
    const BORDER_WIDTH = '4px';

    switch (corner) {
      case 'bottom-right': // Correct logic for "品質堅持" (Borders: Top, Left) -> Extend from Top-Right and Bottom-Left
        return [
          { ...lineStyle, top: '0px', left: `calc(100% - ${BORDER_WIDTH})`, width: '100vw', height: BORDER_WIDTH },
          { ...lineStyle, top: `calc(100% - ${BORDER_WIDTH})`, left: '0px', width: BORDER_WIDTH, height: '100vh' }
        ];
      case 'top-right':    // Borders: Bottom, Left -> Extend from Bottom-Right and Top-Left
        return [
          { ...lineStyle, bottom: '0px', left: `calc(100% - ${BORDER_WIDTH})`, width: '100vw', height: BORDER_WIDTH },
          { ...lineStyle, bottom: `calc(100% - ${BORDER_WIDTH})`, left: '0px', width: BORDER_WIDTH, height: '100vh' }
        ];
      case 'top-left':     // Borders: Bottom, Right -> Extend from Bottom-Left and Top-Right
        return [
           { ...lineStyle, bottom: '0px', right: `calc(100% - ${BORDER_WIDTH})`, width: '100vw', height: BORDER_WIDTH },
           { ...lineStyle, bottom: `calc(100% - ${BORDER_WIDTH})`, right: '0px', width: BORDER_WIDTH, height: '100vh' }
        ];
      case 'bottom-left':  // Borders: Top, Right -> Extend from Top-Left and Bottom-Right
        return [
           { ...lineStyle, top: '0px', right: `calc(100% - ${BORDER_WIDTH})`, width: '100vw', height: BORDER_WIDTH },
           { ...lineStyle, top: `calc(100% - ${BORDER_WIDTH})`, right: '0px', width: BORDER_WIDTH, height: '100vh' }
        ];
      default: return [];
    }
  };

  const getTitlePosition = (corner: CoreValue['corner']): React.CSSProperties => {
    switch (corner) {
      case 'bottom-right': return { top: '30%', left: '10%' };
      case 'top-right': return { bottom: '30%', left: '10%' };
      case 'top-left': return { bottom: '30%', right: '10%' };
      case 'bottom-left': return { top: '30%', right: '10%' };
    }
  };

  const getDescriptionPosition = (corner: CoreValue['corner']): React.CSSProperties => {
    const circleRadius = 37.5; // 75vmin / 2 = 37.5vmin
    const gap = 8; // 1.5-2公分的間隔，約8vmin
    const textDistance = circleRadius + gap; // 總距離
    
    switch (corner) {
      case 'bottom-right': return { 
        top: '60%',
        left: `calc(50% + ${textDistance}vmin)`,
        transform: 'translateY(-50%)',
        textAlign: 'left' as const
      };
      case 'top-right': return { 
        top: '40%',
        left: `calc(50% + ${textDistance}vmin)`,
        transform: 'translateY(-50%)',
        textAlign: 'left' as const
      };
      case 'top-left': return { 
        top: '40%',
        right: `calc(50% + ${textDistance}vmin)`,
        transform: 'translateY(-50%)',
        textAlign: 'left' as const
      };
      case 'bottom-left': return { 
        top: '60%',
        right: `calc(50% + ${textDistance}vmin)`,
        transform: 'translateY(-50%)',
        textAlign: 'left' as const
      };
    }
  };

  return (
    <section 
      ref={containerRef} 
      style={{ 
        position: 'relative', 
        backgroundColor: '#2C211B',
        height: `${coreValues.length * 150}vh`
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'relative',
          width: '75vmin',
          height: '75vmin'
        }}>
          
          <div
            style={{
              position: 'absolute',
              ...getSquareLinePosition(currentItem.corner),
              zIndex: 15
            }}
          >
             <div style={{
                position: 'absolute',
                inset: 0,
                ...getBorderRadius(currentItem.corner),
                ...getBorderStyles(currentItem.corner),
             }}/>
            {getExtendedLines(currentItem.corner).map((lineStyle, index) => (
              <motion.div
                key={index}
                style={lineStyle}
                initial={{
                  ...(index === 0 ? { width: 0, height: '4px' } : { width: '4px', height: 0 })
                }}
                animate={{
                   ...(index === 0 ? { width: '100vw' } : { height: '100vh' })
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            ))}
          </div>
          
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            overflow: 'hidden',
            zIndex: 10
          }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={`image-${currentIndex}`}
                style={{
                  position: 'absolute',
                  ...getImagePosition(currentItem.corner),
                  ...getBorderRadius(currentItem.corner),
                  overflow: 'hidden'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${currentItem.image})`,
                    borderRadius: 'inherit',
                    transition: 'transform 0.3s ease-out',
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              overflow: 'hidden'
            }}>
              {Array.from({length: 4}).map((_, i) => (
                <React.Fragment key={i}>
                  <div style={{position: 'absolute', top: `${(i + 1) * 20}%`, left: 0, width: '100%', height: '2px', backgroundColor: 'rgba(255, 255, 255, 0.3)'}}></div>
                  <div style={{position: 'absolute', left: `${(i + 1) * 20}%`, top: 0, width: '2px', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.3)'}}></div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '4px solid white'
            }}></div>
          </div>

          <div style={{ position: 'absolute', width: '200%', height: '200%', top: '-50%', left: '-50%', zIndex: 15 }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={`title-mask-${currentIndex}`}
                style={{
                  position: 'absolute',
                  backgroundColor: '#2C211B',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  ...getTitlePosition(currentItem.corner)
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </AnimatePresence>
          </div>

          <div style={{ position: 'absolute', width: '200%', height: '200%', top: '-50%', left: '-50%', zIndex: 25, pointerEvents: 'none' }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={`title-${currentIndex}`}
                style={{
                  position: 'absolute',
                  color: 'white',
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  ...getTitlePosition(currentItem.corner)
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {currentItem.englishTitle}
              </motion.div>
              <motion.div
                key={`desc-${currentIndex}`}
                style={{
                  position: 'absolute',
                  color: 'white',
                  width: '240px',
                  textAlign: 'left',
                  ...getDescriptionPosition(currentItem.corner)
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px' }}>
                  {currentItem.title}
                </h3>
                <p style={{ 
                  fontSize: '0.875rem', 
                  lineHeight: '1.5', 
                  whiteSpace: 'pre-line', 
                  color: 'rgba(255, 255, 255, 0.8)',
                  textAlign: 'left',
                  wordBreak: 'break-word',
                  hyphens: 'auto'
                }}>
                  {currentItem.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
