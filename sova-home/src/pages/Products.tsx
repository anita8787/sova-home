import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import sofaNordic from '@/assets/sofa-nordic-1.jpg';
import sofaLeather from '@/assets/sofa-leather-1.jpg';
import sofaModular from '@/assets/sofa-modular-1.jpg';
import sofaLoveseat from '@/assets/sofa-loveseat-1.jpg';
import LazyImage from '@/components/LazyImage';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'three-seater', name: '三人沙發' },
    { id: 'two-seater', name: '兩人沙發' },
    { id: 'modular', name: '模組沙發' },
    { id: 'loveseat', name: '單人沙發' }
  ];

  const materials = [
    { id: 'all', name: '全部材質' },
    { id: 'fabric', name: '布藝' },
    { id: 'leather', name: '皮革' },
    { id: 'velvet', name: '天鵝絨' },
    { id: 'linen', name: '亞麻' },
    { id: 'cotton', name: '棉質' },
    { id: 'synthetic', name: '合成材質' }
  ];

  const products = [
    {
      id: 1,
      name: '北歐簡約三人沙發',
      nameEn: 'Modern Wood Furniture',
      category: 'three-seater',
      material: 'fabric',
      price: 35000,
      image: sofaNordic,
      description: '簡約北歐風格，採用高品質布藝材質，提供極致舒適的坐感體驗。'
    },
    {
      id: 2,
      name: '經典皮革雙人沙發',
      nameEn: 'Light Wing Chair',
      category: 'two-seater',
      material: 'leather',
      price: 42000,
      image: sofaLeather,
      description: '採用義大利進口真皮，經典設計永不過時，為您的客廳增添質感。'
    },
    {
      id: 3,
      name: '模組化組合沙發',
      nameEn: 'Marble Table',
      category: 'modular',
      material: 'velvet',
      price: 38000,
      image: sofaModular,
      description: '靈活組合的模組設計，可根據空間需求自由調整配置。'
    },
    {
      id: 4,
      name: '溫馨單人沙發',
      nameEn: 'Classic Comfort',
      category: 'loveseat',
      material: 'linen',
      price: 32000,
      image: sofaLoveseat,
      description: '天鵝絨材質的雙人沙發，柔軟舒適，適合小空間使用。'
    },
    {
      id: 5,
      name: '極簡北歐沙發',
      nameEn: 'Nordic Minimalist',
      category: 'three-seater',
      material: 'cotton',
      price: 36000,
      image: sofaNordic,
      description: '北歐極簡設計，純淨線條展現現代美學。'
    },
    {
      id: 6,
      name: '優雅休閒沙發',
      nameEn: 'Elegant Lounge',
      category: 'two-seater',
      material: 'synthetic',
      price: 39000,
      image: sofaLeather,
      description: '優雅休閒風格，為您的居家空間增添品味。'
    }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const materialMatch = selectedMaterial === 'all' || product.material === selectedMaterial;
    return categoryMatch && materialMatch;
  });

  return (
    <div className="min-h-screen" style={{ background: '#FFF9F0' }}>
      <Navigation />
      
      {/* Header Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Headline and Material Filters */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-black mb-6" style={{ fontSize: '2.5rem', fontWeight: '700', lineHeight: '1.2' }}>
                精選沙發系列
              </h1>
              
              {/* Material Filters with Hashtag */}
              <div className="flex flex-wrap gap-2">
                {materials.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => setSelectedMaterial(material.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedMaterial === material.id
                        ? 'bg-black text-white'
                        : 'bg-white text-black border border-black hover:bg-black hover:text-white'
                    }`}
                    style={{ 
                      padding: '0.375rem 0.875rem',
                      fontSize: '0.875rem',
                      border: '1px solid #000'
                    }}
                  >
                    #{material.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-black text-white'
                      : 'bg-white text-black border border-black hover:bg-black hover:text-white'
                  }`}
                  style={{ 
                    padding: '0.375rem 0.875rem',
                    fontSize: '0.875rem',
                    border: '1px solid #000'
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ gap: '1.5rem' }}>
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="relative"
              >
                {/* Product Card with Cut Corner */}
                <div 
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                  style={{ 
                    padding: '1rem',
                    borderRadius: '1rem 1rem 0 1rem',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4rem), calc(100% - 4rem) 100%, 0 100%)'
                  }}
                >
                  {/* Product Image */}
                  <Link to={`/products/${product.id}`} className="relative mb-4 overflow-hidden rounded-lg block" style={{ aspectRatio: '1:1' }}>
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      skeletonClassName="rounded-lg"
                    />
                  </Link>
                  
                  {/* Product Info */}
                  <div className="space-y-2">
                    <h3 
                      className="font-medium text-gray-800"
                      style={{ 
                        fontSize: '1rem',
                        fontWeight: '500',
                        lineHeight: '1.4'
                      }}
                    >
                      {product.name}
                    </h3>
                    
                    <p 
                      className="text-gray-500 text-sm"
                      style={{ 
                        fontSize: '0.875rem',
                        fontWeight: '400',
                        lineHeight: '1.3'
                      }}
                    >
                      {product.nameEn}
                    </p>
                    
                    <p 
                      className="font-semibold text-sova-primary"
                      style={{ 
                        fontSize: '1rem',
                        fontWeight: '600',
                        lineHeight: '1.4'
                      }}
                    >
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">沒有找到符合條件的商品</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;