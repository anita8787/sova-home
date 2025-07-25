import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Share2 } from 'lucide-react';
import Navigation from '@/components/Navigation';

const ProductDetail = () => {
  const { id } = useParams();
  
  // 模擬產品資料
  const products = [
    {
      id: 1,
      name: '現代舒適三人沙發',
      price: 'NT$ 45,800',
      image: '/sofa1.png',
      description: '寬敞座位，繽紛抱枕，適合現代家居',
      sku: 'SF001-MOD',
      color: '絢暖白',
      shipping: '單件運費2,200元',
      brand: 'SOVA - 溫暖舒適的居家生活'
    },
    {
      id: 2,
      name: '多功能模組沙發',
      price: 'NT$ 68,000',
      image: '/sofa2.png',
      description: '靈活組合，適合各種空間配置',
      sku: 'SF002-MOD',
      color: '深灰藍',
      shipping: '單件運費2,200元',
      brand: 'SOVA - 溫暖舒適的居家生活'
    },
    {
      id: 3,
      name: '簡約雙人沙發',
      price: 'NT$ 52,500',
      image: '/sofa3.png',
      description: '極簡設計，舒適靠墊，適合小家庭',
      sku: 'SF003-SIM',
      color: '米白',
      shipping: '單件運費2,200元',
      brand: 'SOVA - 溫暖舒適的居家生活'
    },
    {
      id: 4,
      name: 'Cozy Loveseat 雙人沙發',
      price: 'NT$ 32,800',
      image: '/sofa4.png',
      description: '溫馨雙人設計，完美小空間選擇',
      sku: 'SF004-COZ',
      color: '淺棕',
      shipping: '單件運費2,200元',
      brand: 'SOVA - 溫暖舒適的居家生活'
    }
  ];

  const product = products.find(p => p.id === parseInt(id || '1'));

  if (!product) {
    return (
      <div>
        <Navigation />
        <div className="text-center py-20">產品不存在</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* 麵包屑導航 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">首頁</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">沙發</Link>
            <span>/</span>
            <span className="text-primary">{product.name}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 主要產品展示區 */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* 產品圖片 */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex space-x-2">
              <div className="w-20 h-20 bg-gray-50 rounded border-2 border-primary"></div>
              <div className="w-20 h-20 bg-gray-50 rounded border-2 border-gray-200"></div>
              <div className="w-20 h-20 bg-gray-50 rounded border-2 border-gray-200"></div>
            </div>
          </div>

          {/* 產品資訊 */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="text-3xl font-bold text-primary">{product.price}</div>
              <div className="text-sm text-gray-600">{product.shipping}</div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">SKU:</span>
                <span className="font-medium">{product.sku}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">顏色:</span>
                <span className="font-medium">{product.color}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button className="flex-1 bg-gray-800 hover:bg-gray-900">
                  <Heart className="h-4 w-4 mr-2" />
                  預訂
                </Button>
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  願望清單
                </Button>
              </div>
              <p className="text-sm text-gray-600">預購中請來電</p>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-gray-600 mb-4">{product.brand}</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span>2~3天出貨</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span>4~6天出貨</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <span>搬上樓服務</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 