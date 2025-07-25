import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* 圖片區域骨架 */}
      <div className="aspect-square bg-gradient-to-r from-sova-sand via-sova-secondary to-sova-sand rounded-lg mb-4"></div>
      
      {/* 文字內容骨架 */}
      <div className="space-y-3">
        {/* 產品名稱 */}
        <div className="h-4 bg-sova-sand rounded-md w-3/4"></div>
        
        {/* 價格 */}
        <div className="h-3 bg-sova-secondary rounded-md w-1/2"></div>
        
        {/* 描述 */}
        <div className="space-y-2">
          <div className="h-3 bg-sova-sand rounded-md"></div>
          <div className="h-3 bg-sova-sand rounded-md w-2/3"></div>
        </div>
        
        {/* 按鈕 */}
        <div className="h-8 bg-sova-mocha rounded-md w-full opacity-30"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;