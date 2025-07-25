import React from 'react';
import { Button } from '@/components/ui/button';

const UIShowcaseSimple: React.FC = () => {
  return (
    <div className="min-h-screen bg-sova-linen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-sova-primary mb-8">UI/UX 增強展示</h1>
        
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-sova-primary mb-4">基本測試</h2>
          <p className="text-sova-mocha mb-4">
            如果您能看到這個頁面，說明基本路由正常運作。
          </p>
          <Button className="bg-sova-accent hover:bg-sova-primary text-white">
            測試按鈕
          </Button>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-sova-primary mb-4">色彩系統測試</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-sova-primary h-16 rounded flex items-center justify-center text-white text-sm">
              Primary
            </div>
            <div className="bg-sova-secondary h-16 rounded flex items-center justify-center text-sova-mocha text-sm">
              Secondary
            </div>
            <div className="bg-sova-accent h-16 rounded flex items-center justify-center text-white text-sm">
              Accent
            </div>
            <div className="bg-sova-linen h-16 rounded flex items-center justify-center text-sova-mocha text-sm">
              Linen
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-sova-primary mb-4">下一步</h2>
          <p className="text-sova-mocha">
            如果這個簡化版本正常顯示，我們將逐步添加更複雜的組件。
          </p>
        </div>
      </div>
    </div>
  );
};

export default UIShowcaseSimple;