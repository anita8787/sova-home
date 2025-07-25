import React, { useState } from 'react';
import EnhancedNavigation from '@/components/EnhancedNavigation';
import EnhancedHero from '@/components/EnhancedHero';
import EnhancedProductCard from '@/components/EnhancedProductCard';
import EnhancedFilter from '@/components/EnhancedFilter';
import EnhancedButton from '@/components/EnhancedButton';
import { NotificationProvider, useNotify } from '@/components/NotificationSystem';
import { Button } from '@/components/ui/button';

// 示範數據
const demoProducts = [
  {
    id: 1,
    name: '北歐簡約三人沙發',
    nameEn: 'Nordic Minimalist Sofa',
    price: 'NT$ 45,800',
    originalPrice: 'NT$ 52,000',
    image: '/sofa1.png',
    images: ['/sofa1.png', '/sofa2.png', '/sofa3.png'],
    description: '採用頂級義大利皮革，結合人體工學設計，為您帶來極致舒適體驗。',
    rating: 4.8,
    reviewCount: 156,
    isNew: true,
    tags: ['北歐風格', '真皮', '三人座'],
    material: '真皮',
    style: '北歐'
  },
  {
    id: 2,
    name: '現代美式雙人沙發',
    nameEn: 'Modern American Loveseat',
    price: 'NT$ 35,600',
    image: '/sofa2.png',
    description: '融合美式經典與現代設計，打造溫馨舒適的居家氛圍。',
    rating: 4.6,
    reviewCount: 89,
    isPopular: true,
    tags: ['美式風格', '布藝', '雙人座'],
    material: '布藝',
    style: '美式'
  },
  {
    id: 3,
    name: '模組化組合沙發',
    nameEn: 'Modular Sectional Sofa',
    price: 'NT$ 68,000',
    image: '/sofa3.png',
    description: '靈活組合設計，可根據空間需求自由調整配置。',
    rating: 4.9,
    reviewCount: 234,
    tags: ['模組化', '可調整', '大尺寸'],
    material: '混合材質',
    style: '現代'
  }
];

const demoFilterGroups = [
  {
    id: 'category',
    name: '產品類別',
    type: 'checkbox' as const,
    options: [
      { id: 'sofa', name: '沙發', count: 24 },
      { id: 'chair', name: '單椅', count: 18 },
      { id: 'ottoman', name: '腳凳', count: 12 }
    ]
  },
  {
    id: 'material',
    name: '材質',
    type: 'checkbox' as const,
    options: [
      { id: 'leather', name: '真皮', count: 15 },
      { id: 'fabric', name: '布藝', count: 28 },
      { id: 'mixed', name: '混合材質', count: 8 }
    ]
  },
  {
    id: 'color',
    name: '顏色',
    type: 'color' as const,
    options: [
      { id: 'brown', name: '棕色', color: '#8B4513', count: 12 },
      { id: 'beige', name: '米色', color: '#F5F5DC', count: 20 },
      { id: 'gray', name: '灰色', color: '#808080', count: 15 },
      { id: 'navy', name: '深藍', color: '#000080', count: 8 }
    ]
  }
];

const UIShowcaseContent: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [buttonStates, setButtonStates] = useState({
    loading: false,
    success: false,
    error: false
  });
  
  const notify = useNotify();

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setActiveFilters(prev => {
      const currentFilters = prev[groupId] || [];
      if (checked) {
        return { ...prev, [groupId]: [...currentFilters, optionId] };
      } else {
        return { ...prev, [groupId]: currentFilters.filter(id => id !== optionId) };
      }
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({});
  };

  const handleButtonDemo = (type: 'loading' | 'success' | 'error') => {
    setButtonStates(prev => ({ ...prev, [type]: true }));
    
    if (type === 'loading') {
      setTimeout(() => {
        setButtonStates(prev => ({ ...prev, loading: false, success: true }));
        notify.success('操作成功！', '您的請求已經處理完成。');
        setTimeout(() => {
          setButtonStates(prev => ({ ...prev, success: false }));
        }, 2000);
      }, 3000);
    } else {
      setTimeout(() => {
        setButtonStates(prev => ({ ...prev, [type]: false }));
      }, 2000);
    }
  };

  const handleNotificationDemo = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: { title: '操作成功', message: '您的沙發已成功加入購物車！' },
      error: { title: '操作失敗', message: '網路連線異常，請稍後再試。' },
      warning: { title: '庫存不足', message: '此商品僅剩 2 件，建議盡快下單。' },
      info: { title: '新功能上線', message: '我們推出了 3D 客製化功能，快來體驗吧！' }
    };

    notify[type](messages[type].title, messages[type].message, {
      action: type === 'info' ? {
        label: '立即體驗',
        onClick: () => console.log('Navigate to customization')
      } : undefined
    });
  };

  return (
    <div className="min-h-screen bg-sova-linen">
      {/* 增強導航欄 */}
      <EnhancedNavigation />

      {/* 增強 Hero 區塊 */}
      <EnhancedHero />

      {/* 示範區域 */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        
        {/* 按鈕示範 */}
        <section>
          <h2 className="text-3xl font-bold text-sova-primary mb-8">增強按鈕系統</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-sova-mocha">載入狀態</h3>
              <EnhancedButton
                loading={buttonStates.loading}
                loadingText="處理中..."
                onClick={() => handleButtonDemo('loading')}
                className="w-full"
              >
                開始載入
              </EnhancedButton>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sova-mocha">成功狀態</h3>
              <EnhancedButton
                success={buttonStates.success}
                successText="完成！"
                onClick={() => handleButtonDemo('success')}
                className="w-full"
              >
                觸發成功
              </EnhancedButton>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sova-mocha">錯誤狀態</h3>
              <EnhancedButton
                error={buttonStates.error}
                errorText="失敗"
                onClick={() => handleButtonDemo('error')}
                className="w-full"
                variant="destructive"
              >
                觸發錯誤
              </EnhancedButton>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-sova-mocha">特效按鈕</h3>
              <EnhancedButton
                glowOnHover
                pulseOnClick
                ripple
                className="w-full bg-sova-accent hover:bg-sova-primary"
              >
                特效按鈕
              </EnhancedButton>
            </div>
          </div>
        </section>

        {/* 通知示範 */}
        <section>
          <h2 className="text-3xl font-bold text-sova-primary mb-8">智能通知系統</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => handleNotificationDemo('success')}
              className="bg-green-500 hover:bg-green-600"
            >
              成功通知
            </Button>
            <Button 
              onClick={() => handleNotificationDemo('error')}
              variant="destructive"
            >
              錯誤通知
            </Button>
            <Button 
              onClick={() => handleNotificationDemo('warning')}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              警告通知
            </Button>
            <Button 
              onClick={() => handleNotificationDemo('info')}
              className="bg-blue-500 hover:bg-blue-600"
            >
              資訊通知
            </Button>
          </div>
        </section>

        {/* 產品展示 */}
        <section>
          <h2 className="text-3xl font-bold text-sova-primary mb-8">增強產品卡片</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demoProducts.map((product) => (
              <EnhancedProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 篩選器展示 */}
        <section>
          <h2 className="text-3xl font-bold text-sova-primary mb-8">智能篩選系統</h2>
          <div className="max-w-md">
            <EnhancedFilter
              filterGroups={demoFilterGroups}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

const UIShowcase: React.FC = () => {
  return (
    <NotificationProvider>
      <UIShowcaseContent />
    </NotificationProvider>
  );
};

export default UIShowcase;