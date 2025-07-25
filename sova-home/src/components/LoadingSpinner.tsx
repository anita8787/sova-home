import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  submessage?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "載入中...", 
  submessage = "正在為您準備溫暖的居家體驗",
  fullScreen = true 
}) => {
  const containerClass = fullScreen 
    ? "flex items-center justify-center min-h-screen bg-sova-linen" 
    : "flex items-center justify-center py-12";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center space-y-6">
        {/* SOVA 品牌風格的載入動畫 */}
        <div className="relative">
          {/* 外圈 - 脈動效果 */}
          <div className="absolute inset-0 w-20 h-20 border-4 border-sova-sand rounded-full animate-pulse opacity-40"></div>
          
          {/* 中圈 - 旋轉效果 */}
          <div className="absolute inset-2 w-16 h-16 border-4 border-sova-primary border-t-transparent rounded-full animate-spin"></div>
          
          {/* 內圈 - 反向旋轉 */}
          <div className="absolute inset-4 w-12 h-12 border-2 border-sova-mocha border-b-transparent rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          
          {/* 中心點 - 跳動效果 */}
          <div className="absolute inset-6 w-8 h-8 bg-sova-accent rounded-full animate-bounce opacity-80"></div>
          
          {/* 裝飾性小點 */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-sova-primary rounded-full animate-pulse"></div>
        </div>
        
        {/* 載入文字 */}
        <div className="text-center space-y-2">
          <p className="text-sova-primary font-semibold text-xl tracking-wide">{message}</p>
          <p className="text-sova-mocha text-sm font-light max-w-xs leading-relaxed">{submessage}</p>
          
          {/* 進度指示器 */}
          <div className="flex space-x-1 justify-center mt-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div 
                key={index}
                className="w-2 h-2 bg-sova-accent rounded-full animate-bounce"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;