import { useState, lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Palette, Layers, Settings, ArrowLeft, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import sofaNordic from '@/assets/sofa-nordic-1.jpg';
import sofaLeather from '@/assets/sofa-leather-1.jpg';
import sofaModular from '@/assets/sofa-modular-1.jpg';
import sofaLoveseat from '@/assets/sofa-loveseat-1.jpg';
import ShinyText from '@/components/ShinyText';
import Loading3D from '@/components/Loading3D';

// 懶加載 3D 組件
const Sofa3D = lazy(() => import('@/components/Sofa3D'));

const Customization = () => {
  const { toast } = useToast();
  
  // 模擬從產品頁面傳來的產品資訊
  const [selectedProduct, setSelectedProduct] = useState({
    id: 1,
    name: '北歐簡約三人沙發',
    nameEn: 'Modern Wood Furniture',
    price: 35000,
    image: sofaNordic,
    category: 'three-seater'
  });

  // 3D旋轉狀態
  const [rotation, setRotation] = useState(0);
  
  const [selectedOptions, setSelectedOptions] = useState({
    material: '',
    color: '',
    size: '',
    modules: [] as string[]
  });
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const materials = [
    { id: 'linen', name: '亞麻布料', price: '+NT$ 0', description: '天然透氣，觸感柔軟', color: '#F5F0E8' },
    { id: 'leather', name: '頂級牛皮', price: '+NT$ 15,000', description: '經典耐用，越用越美', color: '#8B4513' },
    { id: 'velvet', name: '絨布材質', price: '+NT$ 8,000', description: '奢華質感，溫暖舒適', color: '#9CAF9C' },
    { id: 'performance', name: '科技布料', price: '+NT$ 5,000', description: '防潑水，易清潔', color: '#4A4A4A' }
  ];

  const colors = [
    { id: 'cream', name: '米白色', hex: '#F5F0E8' },
    { id: 'sage', name: '抹茶綠', hex: '#9CAF9C' },
    { id: 'charcoal', name: '深灰色', hex: '#4A4A4A' },
    { id: 'navy', name: '深藍色', hex: '#2C3E50' },
    { id: 'brown', name: '咖啡色', hex: '#8B4513' },
    { id: 'beige', name: '米色', hex: '#D2B48C' }
  ];

  const sizes = [
    { id: 'compact', name: '緊湊型', dimensions: 'W160 × D75 × H75 cm', price: 'NT$ 38,000' },
    { id: 'standard', name: '標準型', dimensions: 'W200 × D85 × H80 cm', price: 'NT$ 45,000' },
    { id: 'large', name: '大型', dimensions: 'W240 × D95 × H85 cm', price: 'NT$ 52,000' }
  ];

  const modules = [
    { id: 'chaise', name: '貴妃椅', price: '+NT$ 12,000' },
    { id: 'ottoman', name: '腳凳', price: '+NT$ 8,000' },
    { id: 'corner', name: '轉角座', price: '+NT$ 15,000' },
    { id: 'armrest', name: '扶手桌', price: '+NT$ 5,000' }
  ];

  const handleOptionChange = (category: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleModuleToggle = (moduleId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      modules: prev.modules.includes(moduleId)
        ? prev.modules.filter(id => id !== moduleId)
        : [...prev.modules, moduleId]
    }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "諮詢申請已送出！",
      description: "我們的設計顧問將在24小時內與您聯繫。",
    });
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const calculatePrice = () => {
    let basePrice = 0;
    let additionalCost = 0;

    const selectedSize = sizes.find(s => s.id === selectedOptions.size);
    if (selectedSize) {
      basePrice = parseInt(selectedSize.price.replace(/[^0-9]/g, ''));
    }

    const selectedMaterial = materials.find(m => m.id === selectedOptions.material);
    if (selectedMaterial) {
      additionalCost += parseInt(selectedMaterial.price.replace(/[^0-9]/g, ''));
    }

    selectedOptions.modules.forEach(moduleId => {
      const module = modules.find(m => m.id === moduleId);
      if (module) {
        additionalCost += parseInt(module.price.replace(/[^0-9]/g, ''));
      }
    });

    return basePrice + additionalCost;
  };



  // 處理3D旋轉
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: 'linear-gradient(to bottom, #C9AE95 0%, #F0E8DD 100%)',
        position: 'relative',
      }}
    >
      {/* 紋理材質層 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "url('/water texture.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.28,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Navigation />
      {/* 拱門造型區塊 */}
      <div
        className="relative w-full"
        style={{
          width: '100%',
          minHeight: '100vh',
          background: '#F8F6F0',
          borderTopLeftRadius: '9999px',
          borderTopRightRadius: '9999px',
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          zIndex: 1,
          paddingBottom: '4rem',
          marginTop: '3rem',
        }}
      >
        {/* Hero Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mt-16">
              <ShinyText
                text="客製化服務"
                speed={2.5}
                className="text-6xl md:text-7xl font-extrabold mb-4 tracking-wide"
                style={{ color: '#6D3B1E' }}
              />
              <p className="text-lg text-sova-cocoa max-w-3xl mx-auto leading-relaxed mt-4">
                打造專屬於您的完美沙發，每個細節都依照您的喜好量身訂做
              </p>
            </div>
          </div>
        </section>
        {/* Navigation Bar */}
        {/* 移除原本的返回產品目錄區塊 */}
        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 返回產品目錄按鈕，單獨一行在主內容最上方 */}
            <div className="flex items-center mb-8 pl-2">
              <Link 
                to="/products"
                className="flex items-center gap-2 px-6 py-2 rounded-full shadow transition-colors duration-200 group"
                style={{
                  background: '#B57E4F',
                  color: '#FFF8EE',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  border: 'none',
                  boxShadow: '0 2px 8px 0 rgba(181,126,79,0.08)',
                  minHeight: '44px',
                  minWidth: 'fit-content',
                  letterSpacing: '0.02em',
                  borderRadius: '999px',
                }}
                onMouseOver={e => { e.currentTarget.style.background = '#FAB44F'; }}
                onMouseOut={e => { e.currentTarget.style.background = '#B57E4F'; }}
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-2" />
                <span>返回產品目錄</span>
              </Link>
            </div>
            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {/* Left Column - Options */}
              <div className="lg:col-span-2 space-y-8">
                {/* Product Preview */}
                <div className="bg-white rounded-2xl shadow p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-gray-900">產品預覽</h3>
                    <Button
                      onClick={handleRotate}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <RotateCw className="h-4 w-4" />
                      旋轉視角
                    </Button>
                  </div>
                  <div className="flex flex-col items-center">
                    {/* 3D沙發模型 */}
                    <div className="w-full mb-4 mt-6">
                      <Suspense fallback={<Loading3D />}>
                        <Sofa3D 
                          material={selectedOptions.material}
                          color={selectedOptions.color}
                          rotation={rotation}
                          onRotate={handleRotate}
                        />
                      </Suspense>
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h4>
                      <p className="text-sm text-gray-500">{selectedProduct.nameEn}</p>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    點擊沙發圖片來查看不同角度
                  </p>
                </div>
                
                {/* Materials */}
                <div className="bg-white rounded-2xl shadow p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-sova-linen flex items-center justify-center">
                      <Layers className="h-6 w-6 text-sova-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">選擇材質</h3>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    {materials.map((material) => (
                      <div
                        key={material.id}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                          selectedOptions.material === material.id
                            ? 'border-sova-primary bg-sova-linen'
                            : 'border-gray-200 hover:border-sova-sand'
                        }`}
                        onClick={() => handleOptionChange('material', material.id)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-gray-900">{material.name}</h4>
                          {selectedOptions.material === material.id && (
                            <Check className="h-5 w-5 text-sova-primary" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {material.description}
                        </p>
                        <p className="text-sm font-bold text-sova-primary">
                          {material.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="bg-white rounded-2xl shadow p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-sova-linen flex items-center justify-center">
                      <Palette className="h-6 w-6 text-sova-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">選擇顏色</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {colors.map((color) => (
                      <div
                        key={color.id}
                        className={`relative cursor-pointer transition-all duration-300 ${
                          selectedOptions.color === color.id ? 'scale-110' : 'hover:scale-105'
                        }`}
                        onClick={() => handleOptionChange('color', color.id)}
                      >
                        <div
                          className="w-20 h-20 rounded-xl border-2 shadow-sm"
                          style={{ 
                            backgroundColor: color.hex,
                            borderColor: selectedOptions.color === color.id ? '#B57E4F' : '#e5e7eb'
                          }}
                        />
                        {selectedOptions.color === color.id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="h-8 w-8 text-white drop-shadow-lg" />
                          </div>
                        )}
                        <p className="text-sm text-center mt-3 text-gray-700 font-medium">
                          {color.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="bg-white rounded-2xl shadow p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-full bg-sova-linen flex items-center justify-center">
                      <Settings className="h-6 w-6 text-sova-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">選擇尺寸</h3>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    {sizes.map((size) => (
                      <div
                        key={size.id}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                          selectedOptions.size === size.id
                            ? 'border-sova-primary bg-sova-linen'
                            : 'border-gray-200 hover:border-sova-sand'
                        }`}
                        onClick={() => handleOptionChange('size', size.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">{size.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{size.dimensions}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">{size.price}</p>
                            {selectedOptions.size === size.id && (
                              <Check className="h-5 w-5 ml-auto mt-2 text-sova-primary" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modules */}
                <div className="bg-white rounded-2xl shadow p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">加購模組</h3>
                  <p className="mb-8 text-gray-600">選擇額外的模組來完善您的沙發組合</p>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    {modules.map((module) => (
                      <div
                        key={module.id}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                          selectedOptions.modules.includes(module.id)
                            ? 'border-sova-primary bg-sova-linen'
                            : 'border-gray-200 hover:border-sova-sand'
                        }`}
                        onClick={() => handleModuleToggle(module.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">{module.name}</h4>
                            <p className="text-sm font-bold text-sova-primary mt-1">{module.price}</p>
                          </div>
                          {selectedOptions.modules.includes(module.id) && (
                            <Check className="h-5 w-5 text-sova-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="space-y-6 pt-2">
                {/* Price Summary */}
                <div className="bg-white rounded-2xl shadow p-8 flex flex-col">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center w-full flex-1 flex items-center justify-center">客製化摘要</h3>
                  
                  <div className="space-y-4 mb-8">
                    {selectedOptions.material && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">材質</span>
                        <span className="text-gray-900 font-medium">{materials.find(m => m.id === selectedOptions.material)?.name}</span>
                      </div>
                    )}
                    {selectedOptions.color && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">顏色</span>
                        <span className="text-gray-900 font-medium">{colors.find(c => c.id === selectedOptions.color)?.name}</span>
                      </div>
                    )}
                    {selectedOptions.size && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">尺寸</span>
                        <span className="text-gray-900 font-medium">{sizes.find(s => s.id === selectedOptions.size)?.name}</span>
                      </div>
                    )}
                    {selectedOptions.modules.length > 0 && (
                      <div className="text-sm">
                        <span className="text-gray-600">加購模組</span>
                        <div className="ml-4 mt-2 space-y-2">
                          {selectedOptions.modules.map(moduleId => (
                            <div key={moduleId} className="text-gray-700">
                              • {modules.find(m => m.id === moduleId)?.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {selectedOptions.size && (
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">預估總價</span>
                        <span className="text-2xl font-bold text-sova-primary">
                          NT$ {calculatePrice().toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs mt-3 text-gray-500">
                        *最終價格以實際報價為準
                      </p>
                    </div>
                  )}
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl shadow p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">預約諮詢</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 font-medium">姓名 *</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="border-gray-200 focus:border-sova-primary focus:ring-sova-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="border-gray-200 focus:border-sova-primary focus:ring-sova-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">聯絡電話</Label>
                      <Input
                        id="phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="border-gray-200 focus:border-sova-primary focus:ring-sova-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 font-medium">需求說明</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        className="border-gray-200 focus:border-sova-primary focus:ring-sova-primary"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-sova-primary hover:bg-sova-terracotta text-white font-medium py-3"
                    >
                      提交諮詢申請
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Customization;