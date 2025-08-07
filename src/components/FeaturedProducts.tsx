import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import sofaNordic from '@/assets/sofa-nordic-1.jpg';
import sofaLeather from '@/assets/sofa-leather-1.jpg';
import sofaModular from '@/assets/sofa-modular-1.jpg';
import sofaLoveseat from '@/assets/sofa-loveseat-1.jpg';
import AnimatedContent from '@/components/AnimatedContent';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: '現代舒適三人沙發',
      price: 'NT$ 45,800',
      image: '/sofa1.png',
      description: '寬敞座位，繽紛抱枕，適合現代家居'
    },
    {
      id: 2,
      name: '多功能模組沙發',
      price: 'NT$ 68,000',
      image: '/sofa2.png',
      description: '靈活組合，適合各種空間配置'
    },
    {
      id: 3,
      name: '簡約雙人沙發',
      price: 'NT$ 52,500',
      image: '/sofa3.png',
      description: '極簡設計，舒適靠墊，適合小家庭'
    },
    {
      id: 4,
      name: 'Cozy Loveseat 雙人沙發',
      price: 'NT$ 32,800',
      image: sofaLoveseat,
      description: '溫馨雙人設計，完美小空間選擇'
    }
  ];

  return (
    <section id="featured-products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            精選商品
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            每一款都是精心設計，為您的居家空間增添溫暖與品味
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product) => (
            <AnimatedContent key={product.id} distance={60} direction="vertical" duration={0.8} ease="power3.out" delay={product.id * 0.1}>
              <Link to={`/products/${product.id}`}>
                <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border-0 shadow-sm overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-primary group-hover:text-primary/80 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {product.price}
                    </span>
                    <Button 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-md hover:scale-105 pointer-events-none"
                      style={{
                        background: '#B57E4F',
                        color: '#FFF8EE',
                        fontWeight: 600,
                        border: 'none',
                        borderRadius: '6px',
                      }}
                    >
                      查看詳情
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </Link>
            </AnimatedContent>
          ))}
        </div>

        <div className="text-center">
          <AnimatedContent distance={60} direction="vertical" duration={0.8} ease="power3.out">
            <Button
              asChild
              size="lg"
              className="group inline-flex items-center gap-2 px-6 py-2 rounded-full shadow transition-colors duration-200"
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
              onMouseOver={e => { e.currentTarget.style.background = '#FAB44F'; e.currentTarget.style.color = '#432818'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#B57E4F'; e.currentTarget.style.color = '#FFF8EE'; }}
            >
              <Link to="/products" className="flex items-center">
                查看所有產品
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-[0.3rem]" />
              </Link>
            </Button>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;