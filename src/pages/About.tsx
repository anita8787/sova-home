import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CoreValuesSection from '@/components/CoreValuesSection';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Award, Leaf } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [animatePhilosophy, setAnimatePhilosophy] = useState(false);
  const [showHeroTitle, setShowHeroTitle] = useState(false);
  const [philosophyImgAnim, setPhilosophyImgAnim] = useState([false, false, false]);
  const [showStory, setShowStory] = useState(false);

  const philosophyTriggered = useRef(false);
  useEffect(() => {
    const handleScroll = () => {
      const philosophySection = document.getElementById('design-philosophy');
      if (philosophySection && !philosophyTriggered.current) {
        const rect = philosophySection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setAnimatePhilosophy(true);
          setPhilosophyImgAnim([true, true, true]);
          philosophyTriggered.current = true;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero 標題進場動畫
  useEffect(() => {
    setTimeout(() => setShowHeroTitle(true), 800);
  }, []);

  // Our Story 進場動畫
  useEffect(() => {
    setTimeout(() => setShowStory(true), 800);
  }, []);


  return (
    <div className="min-h-screen bg-sova-creamy">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-48 overflow-hidden">
        {/* 背景圖片 - 原本的品牌理念圖片，移除暗色遮罩 */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/sova-home/理念首圖.JPG)' }}>
        </div>
        
        {/* 文字層 - 放在背景和去背圖片之間，位置調整到沙發背後 */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="text-center transform translate-y-4">
            <h1
              className={`text-7xl md:text-9xl font-bold text-white tracking-wider transition-all duration-2000 hover:-translate-y-2 cursor-pointer ${showHeroTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ 
                transition: 'opacity 2s ease-out, transform 2s ease-out, all 0.3s ease-in-out',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                mixBlendMode: 'overlay'
              }}
            >
              about sova
            </h1>
          </div>
        </div>
        
        {/* 去背沙發圖片 - 疊加在最前面，與背景沙發完全重疊 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            <img 
              src="/sova-home/理念首圖去背.png" 
              alt="Sova Sofa" 
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 20 }}
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32 bg-gradient-to-br from-sova-linen via-sova-secondary to-sova-creamy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold text-sova-terracotta mb-6 tracking-wide transition-all duration-700 ${showStory ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transition: 'opacity 0.7s, transform 0.7s' }}
            >
              Our Story
            </h2>
            <div
              className={`w-24 h-px bg-gradient-to-r from-sova-accent to-sova-brick mx-auto mb-8 origin-left transition-transform duration-700 ${showStory ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
              style={{ transition: 'transform 0.7s, opacity 0.7s' }}
            ></div>
          </div>
          
          <div className="prose prose-lg mx-auto text-sova-cocoa leading-relaxed text-center">
            <p className="text-lg mb-6">
              SOVA 誕生於對美好生活的追求。我們相信，一張好的沙發不僅是家具，更是家庭情感的載體。
              從最初的設計理念到最終的成品，每一個細節都承載著我們對品質的堅持。
            </p>
            <p className="text-lg mb-6">
              我們選擇北歐設計的簡約美學，融合台灣在地的生活習慣，創造出既美觀又實用的沙發作品。
              每一件作品都經過無數次的測試與調整，確保能夠陪伴您的家庭度過無數美好的時光。
            </p>
            <p className="text-lg">
              在 SOVA，我們不只是製作沙發，我們在創造回憶的容器，讓每個家庭都能擁有屬於自己的溫暖角落。
            </p>
          </div>
        </div>
      </section>
      {/* Core Values - 新設計 */}
      <CoreValuesSection />
              {/* 設計理念 */}
        <section id="design-philosophy" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">設計理念</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                我們相信設計不僅是美學的追求，更是對生活品質的承諾。每一件作品都承載著我們對完美的不懈追求。
              </p>
            </div>
          </div>
          
          <motion.div
            className={`grid md:grid-cols-3 -mx-4 sm:-mx-6 lg:-mx-8`}
          >
          {/* 簡約而不簡單 */}
          <motion.div
            className="group relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, x: -80 }}
            animate={philosophyImgAnim[0] ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            <div className="w-full h-[500px]">
              <img 
                src="/sova-home/c1.jpg" 
                alt="簡約而不簡單" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* 懸停遮罩 - 從底部開始 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
              <div className="text-white p-10 w-full min-h-[200px] flex flex-col justify-end">
                <h3 className="text-lg font-bold mb-4">簡約而不簡單</h3>
                <p className="text-sm leading-relaxed">
                  我們相信真正的美來自於簡約的設計。每一條線條、每一個角度都經過精心計算，
                  去除多餘的裝飾，讓沙發本身的美感自然流露。
                </p>
              </div>
            </div>
          </motion.div>

          {/* 功能與美學並重 */}
          <motion.div
            className="group relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: -80 }}
            animate={philosophyImgAnim[1] ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            <div className="w-full h-[500px]">
              <img 
                src="/sova-home/c2.jpg" 
                alt="功能與美學並重" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* 懸停遮罩 - 從底部開始 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
              <div className="text-white p-10 w-full min-h-[200px] flex flex-col justify-end">
                <h3 className="text-lg font-bold mb-4">功能與美學並重</h3>
                <p className="text-sm leading-relaxed">
                  除了視覺上的美感，我們更注重實用性。從人體工學的角度出發，
                  確保每一張沙發都能提供最佳的舒適度，讓使用者真正享受放鬆的時光。
                </p>
              </div>
            </div>
          </motion.div>

          {/* 永續的設計思維 */}
          <motion.div
            className="group relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, x: 80 }}
            animate={philosophyImgAnim[2] ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            <div className="w-full h-[500px]">
              <img 
                src="/sova-home/c3.jpg" 
                alt="永續的設計思維" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* 懸停遮罩 - 從底部開始 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
              <div className="text-white p-10 w-full min-h-[200px] flex flex-col justify-end">
                <h3 className="text-lg font-bold mb-4">永續的設計思維</h3>
                <p className="text-sm leading-relaxed">
                  我們選擇環保材質，採用可持續的生產方式，讓每一件作品都能陪伴您更久，
                  同時也為地球盡一份心力。
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;