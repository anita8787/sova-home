import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CartDrawer from '@/pages/CartDrawer';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: '首頁', path: '/' },
    { name: '品牌理念', path: '/about' },
    { name: '產品目錄', path: '/products' },
    { name: '客製化服務', path: '/customization' },
    { name: '預約參觀', path: '/visit' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft"
      style={{
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 2px 16px 0 rgba(0,0,0,0.04)',
      }}
    >
      <div className="flex items-center h-16 justify-between">
        {/* Logo + NavItems 靠左 */}
        <div className="flex items-center space-x-8 ml-6">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/sova-home/logo.png" 
              alt="SOVA Logo" 
              className="h-20 md:h-32 w-auto object-contain"
              style={{ filter: 'brightness(0) saturate(100%) sepia(60%) hue-rotate(-20deg) brightness(0.7)' }}
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const enMap = {
                '首頁': 'Home',
                '品牌理念': 'About',
                '產品目錄': 'Products',
                '客製化服務': 'Customization',
                '預約參觀': 'Visit',
              };
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-warm relative group",
                    isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <span className="block group-hover:hidden">{item.name}</span>
                  <span className="block group-hover:inline hidden">{enMap[item.name] || item.name}</span>
                  {isActive(item.path) && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
        {/* 右側三個icon */}
        <div className="flex items-center space-x-4 mr-6">
          {/* 搜尋功能 */}
          <div className="relative flex items-center">
            {showSearch && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-gray-200 shadow-lg transition-all duration-300 ease-in-out" style={{ borderRadius: '9999px', zIndex: 100 }}>
                <input
                  type="text"
                  className="w-40 h-10 bg-transparent border-none outline-none px-4 text-gray-900 placeholder-gray-400"
                  placeholder="Searching..."
                  autoFocus
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  onBlur={() => setShowSearch(false)}
                  style={{ borderRadius: '9999px' }}
                />
                <div className="w-8 h-8 rounded-full bg-amber-200 hover:bg-amber-300 transition-colors duration-200 flex items-center justify-center mr-1">
                  <Search className="h-4 w-4 text-gray-700" />
                </div>
              </div>
            )}
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-110"
              aria-label="搜尋"
              onClick={() => {
                if (showSearch) {
                  setShowSearch(false);
                  setSearchValue("");
                } else {
                  setShowSearch(true);
                }
              }}
            >
              <Search className="h-5 w-5 text-sova-cocoa" />
            </button>
          </div>
          {/* 個人資料頁跳轉 */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors transform transition-transform duration-200"
            aria-label="個人資料"
            style={{ transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => navigate('/profile')}
          >
            <User className="h-5 w-5 text-sova-cocoa" />
          </button>
          {/* 購物車側欄觸發 */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors transform transition-transform duration-200"
            aria-label="購物車"
            style={{ transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            onClick={() => setCartOpen(true)}
          >
             <ShoppingCart className="h-5 w-5 text-sova-cocoa" />
           </button>
        </div>
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden mr-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-warm px-2 py-1 rounded-md",
                    isActive(item.path)
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-primary hover:bg-muted"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default Navigation;