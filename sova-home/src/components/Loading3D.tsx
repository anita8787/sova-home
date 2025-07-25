import React from 'react';
import { RotateCw } from 'lucide-react';

const Loading3D = () => {
  return (
    <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-sova-linen to-sova-secondary rounded-lg border-2 border-sova-sand">
      <div className="flex flex-col items-center space-y-4">
        {/* 3D 載入動畫 */}
        <div className="relative">
          <RotateCw className="w-12 h-12 text-sova-primary animate-spin" />
          <div className="absolute inset-0 w-12 h-12 border-2 border-sova-accent border-t-transparent rounded-full animate-pulse"></div>
        </div>
        
        {/* 載入文字 */}
        <div className="text-center">
          <p className="text-sova-primary font-medium">載入 3D 模型中...</p>
          <p className="text-sova-mocha text-sm mt-1">正在準備您的專屬沙發預覽</p>
        </div>
      </div>
    </div>
  );
};

export default Loading3D;