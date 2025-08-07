import { useState, useEffect } from 'react';
import { ChevronDown, Grid, List, Heart, ShoppingBag, Star, Info } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import sofaNordic from '@/assets/sofa-nordic-1.jpg';
import sofaLeather from '@/assets/sofa-leather-1.jpg';
import sofaModular from '@/assets/sofa-modular-1.jpg';
import sofaLoveseat from '@/assets/sofa-loveseat-1.jpg';
import LazyImage from '@/components/LazyImage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// 品牌色彩定義 - 更新為新的設計規範
const COLORS = {
  primary: '#B57E4F',      // 主色
  background: '#EEE8E0',   // 新的背景色 - 淺米膚色調
  cardBg: '#FFFFFF',       // 卡片背景 - 純白色
  secondary: '#F4F0E7',    // 次背景色
  text: '#2C2C2C',         // 新的文字主色 - 深棕灰色
  accent: '#432818',       // 點綴色
  border: '#D4C4B0',       // 邊框色
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [quickFilter, setQuickFilter] = useState<string | null>('newest');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredMaterial, setHoveredMaterial] = useState<string | null>(null);

  useEffect(() => {
    if (quickFilter) {
      setSelectedCategory('all');
      setSelectedMaterial('all');
      setSortBy(quickFilter);
    }
  }, [quickFilter]);

  // 材質類別配置（包含 tooltip 資訊）
  const materials = [
    { id: 'all', name: '全部材質', tooltip: '查看所有材質類型' },
    { id: 'fabric', name: '布藝', tooltip: '透氣舒適，易於清潔維護' },
    { id: 'leather', name: '皮革', tooltip: '奢華質感，越用越有韻味' },
    { id: 'velvet', name: '天鵝絨', tooltip: '柔軟絲滑，極致觸感體驗' },
    { id: 'linen', name: '亞麻', tooltip: '天然環保，四季適宜' },
    { id: 'cotton', name: '棉質', tooltip: '親膚透氣，自然舒適' },
    { id: 'synthetic', name: '合成材質', tooltip: '耐用防污，現代工藝' }
  ];

  // 款式類別配置
  const categories = [
    { id: 'all', name: '全部款式' },
    { id: 'three-seater', name: '三人沙發' },
    { id: 'two-seater', name: '雙人沙發' },
    { id: 'modular', name: '模組沙發' },
    { id: 'loveseat', name: '單人沙發' }
  ];

  // 排序選項
  const sortOptions = [
    { value: 'newest', label: '最新上架' },
    { value: 'price-low', label: '價格由低到高' },
    { value: 'price-high', label: '價格由高到低' },
    { value: 'popular', label: '熱門程度' }
  ];

  // 商品資料（擴充版本）
  const products = [
    {
      id: 1,
      name: '北歐風雙人沙發',
      englishName: 'Nordic Two-Seater Sofa',
      price: 35800,
      originalPrice: 42000,
      image: sofaNordic,
      images: [sofaNordic, sofaLeather, sofaModular],
      category: 'two-seater',
      material: 'fabric',
      rating: 4.8,
      reviewCount: 124,
      isNew: false,
      isPopular: true,
      tags: ['熱銷'],
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: '意式皮革三人沙發',
      englishName: 'Italian Leather Three-Seater',
      price: 68900,
      originalPrice: 78000,
      image: sofaLeather,
      images: [sofaLeather, sofaNordic, sofaLoveseat],
      category: 'three-seater',
      material: 'leather',
      rating: 4.9,
      reviewCount: 89,
      isNew: true,
      isPopular: true,
      tags: ['NEW', '限時優惠'],
      createdAt: '2024-02-01'
    },
    {
      id: 3,
      name: '模組化組合沙發',
      englishName: 'Modular Sectional Sofa',
      price: 45600,
      originalPrice: null,
      image: sofaModular,
      images: [sofaModular, sofaNordic, sofaLeather],
      category: 'modular',
      material: 'cotton',
      rating: 4.7,
      reviewCount: 156,
      isNew: false,
      isPopular: false,
      tags: [],
      createdAt: '2024-01-20'
    },
    {
      id: 4,
      name: '經典愛之座',
      englishName: 'Classic Loveseat',
      price: 28900,
      originalPrice: 32000,
      image: sofaLoveseat,
      images: [sofaLoveseat, sofaModular, sofaNordic],
      category: 'loveseat',
      material: 'velvet',
      rating: 4.6,
      reviewCount: 203,
      isNew: false,
      isPopular: true,
      tags: ['熱銷'],
      createdAt: '2024-01-10'
    },
    {
      id: 5,
      name: '現代簡約三人沙發',
      englishName: 'Modern Minimalist Three-Seater',
      price: 52800,
      originalPrice: null,
      image: sofaNordic,
      images: [sofaNordic, sofaLeather],
      category: 'three-seater',
      material: 'linen',
      rating: 4.8,
      reviewCount: 97,
      isNew: true,
      isPopular: false,
      tags: ['NEW'],
      createdAt: '2024-02-10'
    },
    {
      id: 6,
      name: '奢華天鵝絨沙發',
      englishName: 'Luxury Velvet Sofa',
      price: 72000,
      originalPrice: 85000,
      image: sofaLeather,
      images: [sofaLeather, sofaLoveseat],
      category: 'three-seater',
      material: 'velvet',
      rating: 4.9,
      reviewCount: 45,
      isNew: true,
      isPopular: true,
      tags: ['NEW', '限時優惠'],
      createdAt: '2024-02-15'
    },
    {
      id: 7,
      name: '工業風皮革沙發',
      englishName: 'Industrial Leather Sofa',
      price: 58900,
      originalPrice: null,
      image: sofaModular,
      images: [sofaModular, sofaNordic],
      category: 'two-seater',
      material: 'leather',
      rating: 4.7,
      reviewCount: 78,
      isNew: false,
      isPopular: false,
      tags: [],
      createdAt: '2024-01-25'
    },
    {
      id: 8,
      name: '多功能收納沙發',
      englishName: 'Multi-functional Storage Sofa',
      price: 39800,
      originalPrice: 45000,
      image: sofaLoveseat,
      images: [sofaLoveseat, sofaModular],
      category: 'loveseat',
      material: 'synthetic',
      rating: 4.5,
      reviewCount: 132,
      isNew: false,
      isPopular: true,
      tags: ['熱銷'],
      createdAt: '2024-01-08'
    }
  ];

  // 推薦商品（固定顯示前4個）
  const recommendedProducts = products.slice(0, 4);

  // 篩選和排序邏輯
  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .filter(product => selectedMaterial === 'all' || product.material === selectedMaterial)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
          return b.reviewCount - a.reviewCount;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  // 收藏功能
  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // 清除所有篩選
  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedMaterial('all');
    setSortBy('newest');
  };

  // 判斷是否有啟用的篩選條件
  const hasActiveFilters = selectedCategory !== 'all' || selectedMaterial !== 'all';

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      <Navigation />
      
      {/* Hero 區塊 */}
      <section className="w-full">
        {/* 標題區塊 - 移到圖片上方 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 text-center">
          {/* 主標題 */}
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6"
            style={{ 
              color: COLORS.accent, // 使用深咖啡色
              fontFamily: '"Noto Sans TC", sans-serif'
            }}
          >
                精選沙發系列
              </h1>
              
          {/* 英文標語文字 - 字體粗細變化 */}
          <div className="max-w-4xl mx-auto">
            <p 
              className="text-lg sm:text-xl lg:text-2xl leading-relaxed"
              style={{ 
                color: COLORS.text,
                fontFamily: '"Inter", "Playfair Display", serif'
              }}
            >
              <span className="font-bold">Create</span>
              <span className="font-light mx-2">a space in which</span>
              <span className="font-bold">you want to live</span>
            </p>
          </div>
        </div>

        {/* 背景圖片 */}
        <div className="relative w-full h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden">
          <img
            src="/sova-home/產品形象照.jpg"
            alt="精選沙發系列"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* 呼吸感的間距 */}
        <div className="h-16 sm:h-20 lg:h-24"></div>
      </section>

      {/* 面包屑導航 */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
            首頁
          </Link>
          <span className="text-gray-400">›</span>
          <span style={{ color: COLORS.text }} className="font-medium">
            產品目錄
          </span>
          {hasActiveFilters && (
            <>
              <span className="text-gray-400">›</span>
              <span className="text-gray-600">
                {selectedCategory !== 'all' && categories.find(cat => cat.id === selectedCategory)?.name}
                {selectedCategory !== 'all' && selectedMaterial !== 'all' && ' · '}
                {selectedMaterial !== 'all' && materials.find(mat => mat.id === selectedMaterial)?.name}
              </span>
            </>
          )}
        </div>
      </nav>

      {/* 主要內容區域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 fade-in">
        
        {/* 快速導購區域 */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 py-6">
            {/* 左側：快速篩選 */}
            <div className="flex flex-wrap gap-3">
              <span className="text-sm font-medium" style={{ color: COLORS.text }}>快速篩選：</span>
              <button
                onClick={() => setQuickFilter('popular')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  quickFilter === 'popular' ? 'bg-[#B57E4F] text-white shadow-md' : 'bg-white text-[#2C2C2C] hover:bg-[#F4F0E7]'
                }`}
              >
                🔥 熱門推薦
              </button>
              <button
                onClick={() => setQuickFilter('newest')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  quickFilter === 'newest' ? 'bg-[#B57E4F] text-white shadow-md' : 'bg-white text-[#2C2C2C] hover:bg-[#F4F0E7]'
                }`}
              >
                ✨ 最新上架
              </button>
              <button
                onClick={() => setQuickFilter('price-low')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  quickFilter === 'price-low' ? 'bg-[#B57E4F] text-white shadow-md' : 'bg-white text-[#2C2C2C] hover:bg-[#F4F0E7]'
                }`}
              >
                💰 超值優選
              </button>
            </div>
            
            {/* 右側：商品統計 */}
            <div className="flex items-center gap-4 text-sm">
              <span style={{ color: COLORS.text }}>
                共 <span className="font-semibold text-lg" style={{ color: COLORS.accent }}>{filteredProducts.length}</span> 件商品
              </span>
              <div className="h-4 w-px" style={{ backgroundColor: COLORS.border }}></div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white"
                style={{ focusRingColor: COLORS.primary }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* 詳細篩選區域 - 可折疊 */}
        <section className="mb-12">
          <details className="group">
            <summary className="flex items-center gap-2 py-4 cursor-pointer transition-colors duration-200">
              <span className="text-lg font-semibold" style={{ color: COLORS.text }}>
                🔍 詳細篩選條件
              </span>
              <ChevronDown className="w-5 h-5 transition-transform duration-200 group-open:rotate-180" style={{ color: COLORS.text }} />
            </summary>
            
            <div className="mt-4 py-6">
              {/* 材質篩選 */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3" style={{ color: COLORS.text, fontFamily: '"Inter", "Noto Sans TC", sans-serif' }}>
                  材質類別
                </h3>
                          <div className="flex flex-wrap gap-3 lg:gap-4">
                {materials.map((material) => (
                  <div key={material.id} className="relative">
                  <button
                    onClick={() => setSelectedMaterial(material.id)}
                      onMouseEnter={() => setHoveredMaterial(material.id)}
                      onMouseLeave={() => setHoveredMaterial(null)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                        ${selectedMaterial === material.id
                          ? 'text-white shadow-md'
                          : `text-${COLORS.text} bg-white border border-gray-300 hover:border-${COLORS.primary} hover:shadow-sm`
                    }`}
                    style={{ 
                        backgroundColor: selectedMaterial === material.id ? COLORS.primary : undefined,
                        fontFamily: '"Inter", "Noto Sans TC", sans-serif'
                    }}
                  >
                      {material.name}
                  </button>
                    {/* Tooltip - 只在hover當前材質時顯示 */}
                    {hoveredMaterial === material.id && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        {material.tooltip}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
               {/* 款式篩選 */}
               <div className="mb-6">
                 <h3 className="text-base font-semibold mb-3" style={{ color: COLORS.text, fontFamily: '"Inter", "Noto Sans TC", sans-serif' }}>
                   沙發款式
                 </h3>
                 <div className="flex flex-wrap gap-3 lg:gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                         ${selectedCategory === category.id
                           ? 'text-white shadow-md'
                           : `text-${COLORS.text} bg-white border border-gray-300 hover:border-${COLORS.primary} hover:shadow-sm`
                  }`}
                  style={{ 
                         backgroundColor: selectedCategory === category.id ? COLORS.primary : undefined,
                         fontFamily: '"Inter", "Noto Sans TC", sans-serif'
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

               {/* 當前篩選條件提示列 */}
               {hasActiveFilters && (
                 <div className="flex flex-wrap items-center gap-2 py-4">
                   <span className="text-sm font-medium" style={{ color: COLORS.text }}>當前篩選：</span>
                   
                   {selectedCategory !== 'all' && (
                     <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                       {categories.find(cat => cat.id === selectedCategory)?.name}
                     </Badge>
                   )}
                   
                   {selectedMaterial !== 'all' && (
                     <Badge variant="secondary" className="bg-green-100 text-green-800">
                       {materials.find(mat => mat.id === selectedMaterial)?.name}
                     </Badge>
                   )}
                   
                   <button
                     onClick={clearAllFilters}
                     className="text-sm ml-2 underline"
                     style={{ color: COLORS.text }}
                   >
                     清除篩選
                   </button>
                 </div>
               )}
        </div>
           </details>
      </section>

        {/* 商品網格 - 響應式設計 */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg border product-card-shadow"
                style={{ 
                  borderColor: COLORS.border,
                  backgroundColor: COLORS.cardBg
                }}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                                 {/* 商品圖片 */}
                 <div className="relative aspect-square overflow-hidden product-image-container">
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                     className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                   />
                  
                  {/* 商品標籤 - 已移除 */}

                  {/* 愛心收藏按鈕 */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors duration-200 ${
                        favorites.includes(product.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`}
                    />
                  </button>

                                     {/* 快速查看按鈕 - 只在 hover 時顯示，且在大螢幕上才顯示 */}
                   {hoveredCard === product.id && (
                     <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                                               <Button
                          asChild
                          size="sm"
                          className="w-full rounded-full product-quick-view-btn text-white border-0"
                        >
                         <Link to={`/products/${product.id}`} className="flex items-center justify-center">
                           快速查看
                  </Link>
                       </Button>
                     </div>
                   )}
                </div>

                {/* 商品資訊 */}
                <div className="p-4 sm:p-5">

                  {/* 商品名稱 */}
                  <h3 
                    className="font-semibold text-base sm:text-lg mb-1 line-clamp-2"
                      style={{ 
                      color: COLORS.text,
                      fontFamily: '"Inter", "Noto Sans TC", sans-serif'
                      }}
                    >
                      {product.name}
                    </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-1">
                    {product.englishName}
                  </p>

                  {/* 價格信息 */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-base sm:text-lg font-semibold"
                        style={{ color: COLORS.accent }}
                      >
                        NT$ {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          NT$ {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                                     {/* 手機版快速查看按鈕 */}
                   <div className="block sm:hidden">
                     <Button
                       asChild
                       size="sm"
                       className="w-full rounded-full product-quick-view-btn text-white border-0"
                     >
                       <Link to={`/products/${product.id}`} className="flex items-center justify-center">
                         查看詳情
                       </Link>
                     </Button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 推薦你也喜歡 */}
        <section>
          <h2 
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
            style={{ 
              color: COLORS.text,
              fontFamily: '"Noto Sans TC", sans-serif'
            }}
          >
            推薦你也喜歡
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {recommendedProducts.map((product) => (
              <div
                key={`rec-${product.id}`}
                className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg border product-card-shadow"
                      style={{ 
                  borderColor: COLORS.border,
                  backgroundColor: COLORS.cardBg
                }}
              >
                {/* 簡化的推薦商品卡片 */}
                <div className="relative aspect-square overflow-hidden product-image-container">
                  <LazyImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 
                    className="font-semibold text-base mb-2 line-clamp-2"
                      style={{ 
                      color: COLORS.text,
                      fontFamily: '"Inter", "Noto Sans TC", sans-serif'
                    }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-lg font-bold"
                      style={{ color: COLORS.accent }}
                    >
                      NT$ {product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
