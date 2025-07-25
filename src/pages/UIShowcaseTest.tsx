import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

// 逐步測試導入
// import EnhancedNavigation from '@/components/EnhancedNavigation';
// import EnhancedHero from '@/components/EnhancedHero';
// import EnhancedProductCard from '@/components/EnhancedProductCard';
// import EnhancedFilter from '@/components/EnhancedFilter';
import EnhancedButton from '@/components/EnhancedButton';
// import { NotificationProvider, useNotify } from '@/components/NotificationSystem';

const UIShowcaseTest: React.FC = () => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonSuccess, setButtonSuccess] = useState(false);

  const handleTestButton = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
      setButtonSuccess(true);
      setTimeout(() => setButtonSuccess(false), 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-sova-linen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-sova-primary mb-8 text-center">
            UI/UX 增強功能測試
          </h1>
          <p className="text-sova-mocha text-center mb-8">
            逐步測試新的 UI 組件功能
          </p>
        </div>

        {/* 測試增強按鈕 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-sova-primary mb-6">增強按鈕測試</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 基本按鈕 */}
            <div className="space-y-4">
              <h3 className="font-medium text-sova-mocha">基本增強按鈕</h3>
              <EnhancedButton
                className="w-full bg-sova-accent hover:bg-sova-primary"
                ripple
                glowOnHover
                pulseOnClick
              >
                特效按鈕
              </EnhancedButton>
            </div>

            {/* 載入狀態按鈕 */}
            <div className="space-y-4">
              <h3 className="font-medium text-sova-mocha">載入狀態</h3>
              <EnhancedButton
                loading={buttonLoading}
                success={buttonSuccess}
                loadingText="處理中..."
                successText="完成！"
                onClick={handleTestButton}
                className="w-full"
              >
                測試載入
              </EnhancedButton>
            </div>

            {/* 傳統按鈕對比 */}
            <div className="space-y-4">
              <h3 className="font-medium text-sova-mocha">傳統按鈕對比</h3>
              <Button className="w-full bg-gray-500 hover:bg-gray-600">
                普通按鈕
              </Button>
            </div>
          </div>
        </div>

        {/* 色彩系統展示 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-sova-primary mb-6">SOVA 色彩系統</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-sova-primary h-20 rounded-xl flex items-center justify-center text-white font-medium shadow-lg transform hover:scale-105 transition-transform duration-300">
              Primary
            </div>
            <div className="bg-sova-secondary h-20 rounded-xl flex items-center justify-center text-sova-mocha font-medium shadow-lg transform hover:scale-105 transition-transform duration-300">
              Secondary
            </div>
            <div className="bg-sova-accent h-20 rounded-xl flex items-center justify-center text-white font-medium shadow-lg transform hover:scale-105 transition-transform duration-300">
              Accent
            </div>
            <div className="bg-sova-mocha h-20 rounded-xl flex items-center justify-center text-white font-medium shadow-lg transform hover:scale-105 transition-transform duration-300">
              Mocha
            </div>
          </div>
        </div>

        {/* 動畫效果展示 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-sova-primary mb-6">微互動效果</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 懸停卡片 */}
            <div className="bg-sova-linen rounded-xl p-6 transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <h3 className="font-semibold text-sova-primary mb-2">懸停縮放效果</h3>
              <p className="text-sova-mocha text-sm">滑鼠懸停時會有縮放和陰影效果</p>
            </div>

            {/* 脈衝效果 */}
            <div className="bg-sova-accent/10 rounded-xl p-6 border-2 border-sova-accent animate-pulse">
              <h3 className="font-semibold text-sova-accent mb-2">脈衝動畫</h3>
              <p className="text-sova-mocha text-sm">持續的脈衝動畫效果</p>
            </div>
          </div>
        </div>

        {/* 成功訊息 */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-green-800">基本組件測試成功！</h3>
              <p className="text-green-600 text-sm">如果您能看到這些效果，說明基礎 UI 增強功能正常運作。</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UIShowcaseTest;