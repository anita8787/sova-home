import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, Home, Info, Package, Palette, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartDrawer from '@/pages/CartDrawer';
import { useIsMobile } from '@/hooks/use-mobile';

const EnhancedNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  // 導航項目配置
  const navigationItems = [
    { name: '首頁', nameEn: 'Home', path: '/', icon: Home },
    { name: '品牌理念', nameEn: 'About', path: '/about', icon: Info },
    { name: '產品', nameEn: 'Products', path: '/products', icon: Package },
    { name: '客製化', nameEn: 'Custom', path: '/customization', icon: Palette },
    { name: '預約參觀', nameEn: 'Visit', path: '/visit', icon: MapPin },
  ];

  // 滾動監聽
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 路由變化時關閉手機選單
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* 主導航欄 */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl border-b border-sova-sand shadow-lg' 
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="SOVA 溫感家居" 
                  className={`transition-all duration-300 ${
                    isScrolled ? 'h-8 md:h-10' : 'h-10 md:h-12'
                  } w-auto group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-sova-accent opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300"></div>
              </div>
              <div className="hidden md:block">
                <div className="text-sova-primary font-bold text-lg tracking-wide">SOVA</div>
                <div className="text-sova-mocha text-xs tracking-widest">溫感家居</div>
              </div>
            </Link>

            {/* 桌面端導航選單 */}
            {!isMobile && (
              <div className="hidden md:flex items-center space-x-1">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative px-4 py-2 rounded-lg transition-all duration-300 group ${
                        isActive 
                          ? 'text-sova-primary bg-sova-linen' 
                          : 'text-sova-mocha hover:text-sova-primary hover:bg-sova-linen/50'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-sm font-medium transition-transform group-hover:scale-105">
                          {item.name}
                        </span>
                        <span className="text-xs opacity-60 group-hover:opacity-80">
                          {item.nameEn}
                        </span>
                      </div>
                      
                      {/* 活動指示器 */}
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-sova-accent rounded-full"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}

            {/* 右側功能區 */}
            <div className="flex items-center space-x-2">
              
              {/* 搜尋按鈕 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`relative p-2 rounded-lg transition-all duration-300 ${
                  isSearchOpen 
                    ? 'bg-sova-accent text-white scale-105' 
                    : 'text-sova-mocha hover:text-sova-primary hover:bg-sova-linen'
                }`}
              >
                <Search className="w-5 h-5" />
                <span className="sr-only">搜尋</span>
              </Button>

              {/* 個人資料 */}
              <Link 
                to="/profile"
                className="p-2 rounded-lg text-sova-mocha hover:text-sova-primary hover:bg-sova-linen transition-all duration-300"
              >
                <User className="w-5 h-5" />
                <span className="sr-only">個人資料</span>
              </Link>

              {/* 購物車 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-lg text-sova-mocha hover:text-sova-primary hover:bg-sova-linen transition-all duration-300"
              >
                <ShoppingBag className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-sova-accent rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">2</span>
                </div>
                <span className="sr-only">購物車</span>
              </Button>

              {/* 手機選單按鈕 */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                    isMobileMenuOpen 
                      ? 'bg-sova-primary text-white rotate-90' 
                      : 'text-sova-mocha hover:text-sova-primary hover:bg-sova-linen'
                  }`}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  <span className="sr-only">選單</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 搜尋欄 */}
        {isSearchOpen && (
          <div className="border-t border-sova-sand bg-white/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sova-mocha w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜尋產品、風格或靈感..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-sova-sand focus:border-sova-primary focus:ring-2 focus:ring-sova-primary/20 outline-none transition-all duration-300"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 手機選單 */}
      {isMobile && (
        <div 
          className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* 背景遮罩 */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* 選單內容 */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              
              {/* 選單標題 */}
              <div className="flex items-center justify-between p-6 border-b border-sova-sand">
                <div>
                  <h2 className="text-lg font-semibold text-sova-primary">選單</h2>
                  <p className="text-sm text-sova-mocha">探索溫感家居</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-sova-mocha hover:bg-sova-linen"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* 導航項目 */}
              <div className="flex-1 p-6">
                <div className="space-y-3">
                  {navigationItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-sova-primary text-white shadow-lg' 
                            : 'text-sova-mocha hover:bg-sova-linen hover:text-sova-primary'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm opacity-70">{item.nameEn}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* 底部資訊 */}
              <div className="p-6 border-t border-sova-sand bg-sova-linen/30">
                <div className="text-center">
                  <p className="text-sm text-sova-mocha">需要幫助嗎？</p>
                  <p className="text-lg font-medium text-sova-primary mt-1">📞 0800-SOVA-123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 購物車抽屜 */}
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* 導航高度佔位 */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default EnhancedNavigation;