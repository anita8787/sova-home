import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LazyImage from './LazyImage';

interface Product {
  id: number;
  name: string;
  nameEn?: string;
  price: string;
  originalPrice?: string;
  image: string;
  images?: string[];
  description: string;
  rating?: number;
  reviewCount?: number;
  isNew?: boolean;
  isPopular?: boolean;
  tags?: string[];
  material?: string;
  style?: string;
}

interface EnhancedProductCardProps {
  product: Product;
  className?: string;
  size?: 'default' | 'large' | 'compact';
}

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({ 
  product, 
  className = '',
  size = 'default'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const images = product.images || [product.image];
  const hasMultipleImages = images.length > 1;

  // 卡片尺寸配置
  const sizeConfig = {
    default: {
      container: 'h-96',
      image: 'h-56',
      content: 'p-4',
      title: 'text-lg',
      price: 'text-xl'
    },
    large: {
      container: 'h-[28rem]',
      image: 'h-72',
      content: 'p-6',
      title: 'text-xl',
      price: 'text-2xl'
    },
    compact: {
      container: 'h-80',
      image: 'h-48',
      content: 'p-3',
      title: 'text-base',
      price: 'text-lg'
    }
  };

  const config = sizeConfig[size];

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(0);
  };

  const handleImageHover = (index: number) => {
    if (hasMultipleImages) {
      setCurrentImageIndex(index);
    }
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // 實作快速預覽功能
    console.log('Quick view:', product.name);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // 實作加入購物車功能
    console.log('Add to cart:', product.name);
  };

  return (
    <div
      ref={cardRef}
      className={`group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 ${config.container} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(181, 126, 79, 0.1)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      {/* 圖片區域 */}
      <div className={`relative ${config.image} overflow-hidden bg-sova-linen`}>
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <LazyImage
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
            onLoad={() => setIsImageLoading(false)}
          />
        </Link>

        {/* 多圖片指示器 */}
        {hasMultipleImages && isHovered && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-sova-accent scale-125' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                onMouseEnter={() => handleImageHover(index)}
              />
            ))}
          </div>
        )}

        {/* 徽章區域 */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isNew && (
            <Badge className="bg-sova-accent text-white px-2 py-1 text-xs font-medium">
              <Zap className="w-3 h-3 mr-1" />
              新品
            </Badge>
          )}
          {product.isPopular && (
            <Badge className="bg-sova-primary text-white px-2 py-1 text-xs font-medium">
              <Star className="w-3 h-3 mr-1" />
              熱銷
            </Badge>
          )}
        </div>

        {/* 快速操作按鈕 */}
        <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleFavorite}
            className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-300 ${
              isFavorited ? 'text-red-500 hover:text-red-600' : 'text-sova-mocha hover:text-sova-primary'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleQuickView}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-sova-mocha hover:text-sova-primary shadow-lg transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* 懸停遮罩 */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* 快速加入購物車按鈕 */}
        <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-sova-accent hover:bg-sova-primary text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            快速加入購物車
          </Button>
        </div>
      </div>

      {/* 內容區域 */}
      <div className={config.content}>
        <Link to={`/products/${product.id}`} className="block">
          {/* 標題 */}
          <h3 className={`font-semibold text-sova-primary mb-1 group-hover:text-sova-accent transition-colors duration-300 ${config.title}`}>
            {product.name}
          </h3>
          
          {/* 英文名稱 */}
          {product.nameEn && (
            <p className="text-sm text-sova-mocha/60 mb-2 italic">
              {product.nameEn}
            </p>
          )}

          {/* 評分與評論 */}
          {product.rating && (
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!) 
                        ? 'text-sova-accent fill-current' 
                        : 'text-sova-sand'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-sova-mocha">
                {product.rating} ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* 描述 */}
          <p className="text-sm text-sova-mocha mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* 標籤 */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-sova-linen text-sova-mocha text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 價格區域 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`font-bold text-sova-primary ${config.price}`}>
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-sova-mocha/50 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>

            {/* 材質標示 */}
            {product.material && (
              <span className="text-xs text-sova-mocha bg-sova-sand/30 px-2 py-1 rounded-full">
                {product.material}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* 載入中狀態 */}
      {isImageLoading && (
        <div className="absolute inset-0 bg-sova-linen animate-pulse flex items-center justify-center">
          <div className="text-sova-mocha text-sm">載入中...</div>
        </div>
      )}
    </div>
  );
};

export default EnhancedProductCard;