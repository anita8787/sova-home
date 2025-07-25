import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Clock, Phone, Mail, Calendar, CheckCircle, ArrowRight, Star, Users, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Visit = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitDate: '',
    visitTime: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "預約成功！",
      description: "我們會盡快與您聯繫確認預約時間。",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      visitDate: '',
      visitTime: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16" style={{ backgroundColor: '#3C2415' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide">
              預約參觀
            </h1>
            <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed">
              歡迎蒞臨我們的展示中心，親身體驗 SOVA 沙發的舒適與美感
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#1E1E1E' }}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-sova-terracotta mb-2">專業顧問</h3>
              <p className="text-sova-cocoa">一對一專屬服務，為您量身推薦最適合的沙發</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#3C2415' }}>
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-sova-terracotta mb-2">品質保證</h3>
              <p className="text-sova-cocoa">嚴選優質材質，提供完善的售後服務保障</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#A67C6B' }}>
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-sova-terracotta mb-2">安心體驗</h3>
              <p className="text-sova-cocoa">舒適的展示環境，讓您安心體驗每款沙發</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-sova-terracotta mb-6 tracking-wide">
                  展示中心資訊
                </h2>
                <div className="w-16 h-px bg-sova-primary mb-8"></div>
              </div>

              {/* Address */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sova-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-sova-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-sova-terracotta mb-2">地址</h3>
                      <p className="text-sova-cocoa leading-relaxed">
                        台北市信義區松仁路100號<br />
                        遠東百貨信義店 5樓
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sova-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-sova-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-sova-terracotta mb-2">營業時間</h3>
                      <div className="space-y-1 text-sova-cocoa">
                        <p>週一至週五：11:00 - 21:00</p>
                        <p>週六至週日：10:00 - 22:00</p>
                        <p className="text-sm text-sova-mocha">* 國定假日營業時間請來電確認</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sova-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-sova-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-sova-terracotta mb-2">聯絡電話</h3>
                      <p className="text-sova-cocoa">
                        <a href="tel:+886-2-2345-6789" className="hover:text-sova-primary transition-colors font-medium">
                          02-2345-6789
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sova-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-sova-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-sova-terracotta mb-2">Email</h3>
                      <p className="text-sova-cocoa">
                        <a href="mailto:info@sova.com.tw" className="hover:text-sova-primary transition-colors font-medium">
                          info@sova.com.tw
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="bg-white shadow-lg border-0 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-sova-sand/20 to-sova-creamy/20 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-sova-mocha mx-auto mb-2" />
                      <p className="text-sova-cocoa">地圖載入中...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-sova-terracotta mb-6 tracking-wide">
                  預約參觀
                </h2>
                <div className="w-16 h-px bg-sova-primary mb-8"></div>
              </div>

              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sova-cocoa font-medium">姓名 *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="border-gray-200 bg-white focus:border-sova-primary focus:ring-sova-primary h-12"
                          placeholder="請輸入您的姓名"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sova-cocoa font-medium">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="border-gray-200 bg-white focus:border-sova-primary focus:ring-sova-primary h-12"
                          placeholder="請輸入您的 Email"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sova-cocoa font-medium">聯絡電話</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="border-gray-200 bg-white focus:border-sova-primary focus:ring-sova-primary h-12"
                        placeholder="請輸入您的聯絡電話"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="visitDate" className="text-sova-cocoa font-medium">預約日期 *</Label>
                        <Input
                          id="visitDate"
                          type="date"
                          value={formData.visitDate}
                          onChange={(e) => handleInputChange('visitDate', e.target.value)}
                          required
                          className="border-gray-200 bg-white focus:border-sova-primary focus:ring-sova-primary h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="visitTime" className="text-sova-cocoa font-medium">預約時間 *</Label>
                        <select
                          id="visitTime"
                          value={formData.visitTime}
                          onChange={(e) => handleInputChange('visitTime', e.target.value)}
                          required
                          className="w-full px-3 py-3 border border-gray-200 rounded-md bg-white text-sova-cocoa focus:outline-none focus:ring-2 focus:ring-sova-primary focus:border-sova-primary h-12"
                        >
                          <option value="">請選擇時間</option>
                          <option value="11:00">11:00</option>
                          <option value="12:00">12:00</option>
                          <option value="13:00">13:00</option>
                          <option value="14:00">14:00</option>
                          <option value="15:00">15:00</option>
                          <option value="16:00">16:00</option>
                          <option value="17:00">17:00</option>
                          <option value="18:00">18:00</option>
                          <option value="19:00">19:00</option>
                          <option value="20:00">20:00</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sova-cocoa font-medium">備註說明</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="border-gray-200 bg-white focus:border-sova-primary focus:ring-sova-primary"
                        placeholder="請說明您的需求或特殊要求"
                        rows={4}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-sova-primary hover:bg-sova-accent text-white border-0 py-4 h-14 text-lg font-medium transition-all duration-300 hover:shadow-lg"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      提交預約申請
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Additional Info */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-sova-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-sova-terracotta mb-3">預約須知</h3>
                      <ul className="space-y-2 text-sm text-sova-cocoa">
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-sova-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>請提前 24 小時預約，以便我們為您安排專人服務</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-sova-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>如需取消或改期，請提前 2 小時通知</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-sova-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>展示中心提供免費停車服務</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-sova-primary rounded-full mt-2 flex-shrink-0"></span>
                          <span>歡迎攜帶家人一同參觀體驗</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Visit;