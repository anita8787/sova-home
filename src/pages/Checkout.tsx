import React, { useRef, useLayoutEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';
import StepInfo from './StepInfo';

const PRIMARY = '#6F1D1B';

const mockCart = [
  { id: 1, name: '現代舒適三人沙發', price: 45800, qty: 1, image: '/sofa1.png' },
  { id: 2, name: '多功能模組沙發', price: 68000, qty: 2, image: '/sofa2.png' },
  { id: 3, name: '簡約雙人沙發', price: 52500, qty: 1, image: '/sofa3.png' },
];

const steps = [
  { key: 'cart', label: '購物車' },
  { key: 'info', label: '填寫資料' },
  { key: 'confirm', label: '訂單確認' },
];

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', delivery: '', payment: '', invoice: '', coupon: '' });
  const [formError, setFormError] = useState<Record<string, string>>({});

  const total = mockCart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 驗證表單
  const validate = (): Record<string, string> => {
    const err: Record<string, string> = {};
    if (!form.name) err.name = '請輸入姓名';
    if (!form.phone) err.phone = '請輸入電話';
    if (!form.email) err.email = '請輸入 Email';
    if (!form.delivery) err.delivery = '請選擇配送方式';
    if (!form.payment) err.payment = '請選擇付款方式';
    return err;
  };

  // 主按鈕
  const mainButton = () => {
    if (step === 0) return <button className="w-full py-3 rounded-lg text-white font-bold text-lg mt-6 transition" style={{ background: PRIMARY }} onClick={() => setStep(1)}>前往結帳</button>;
    if (step === 1) return <button className="w-full py-3 rounded-lg text-white font-bold text-lg mt-6 transition" style={{ background: PRIMARY }} onClick={() => {
      const err = validate();
      setFormError(err);
      if (Object.keys(err).length === 0) setStep(2);
    }}>提交訂單</button>;
    if (step === 2) return <button className="w-full py-3 rounded-lg text-white font-bold text-lg mt-6 transition" style={{ background: PRIMARY }} onClick={() => window.location.href = '/'}>完成</button>;
  };

  // 三步驟進度條
  const Progress = () => {
    const [line, setLine] = useState({ left: 0, width: 0, fillWidth: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const percent = step === 0 ? 0 : (step / (steps.length - 1));

    useLayoutEffect(() => {
      if (!containerRef.current) return;
      const circles = circleRefs.current;
      if (!circles[0] || !circles[circles.length - 1]) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const first = circles[0].getBoundingClientRect();
      const last = circles[circles.length - 1].getBoundingClientRect();
      const left = first.left + first.width / 2 - containerRect.left;
      const right = last.left + last.width / 2 - containerRect.left;
      const width = right - left;
      setLine({
        left,
        width,
        fillWidth: width * percent,
      });
    }, [step, steps.length]);

    return (
      <div className="relative flex flex-col items-center mb-10" style={{ minHeight: 90 }} ref={containerRef}>
        {/* 線條容器，精確對齊圓圈中心 */}
        <div className="absolute top-7 z-0" style={{ left: line.left, width: line.width, height: 0, pointerEvents: 'none' }}>
          {/* 灰色底層線條 */}
          <div style={{
            width: '100%',
            height: 4,
            background: '#e5e7eb',
            borderRadius: 2,
            position: 'relative',
            zIndex: 0,
          }} />
          {/* 主色線（動態填充，充電動畫，精確對齊圓圈中心） */}
          <div style={{
            width: line.fillWidth,
            height: 4,
            background: PRIMARY,
            borderRadius: 2,
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 1,
            transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
          }} />
        </div>
        {/* 圓圈與標籤 */}
        <div className="flex items-center justify-center w-full z-10">
          {steps.map((s, idx) => (
            <div
              key={s.key}
              className="flex flex-col items-center flex-1 relative"
              ref={el => (circleRefs.current[idx] = el)}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold mb-2 text-2xl transition-all duration-300 ${idx < step ? 'bg-[#6F1D1B] text-white' : idx === step ? 'bg-[#6F1D1B] text-white scale-110 shadow-lg' : 'bg-gray-200 text-gray-400'}`}>{idx+1}</div>
              <span className={`text-base mt-1 font-bold tracking-wide ${idx < step ? 'text-[#6F1D1B]' : idx === step ? 'text-[#6F1D1B]' : 'text-gray-400'}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 商品清單
  const CartList = ({ simple = false }) => {
    const items = simple && !showAll && mockCart.length > 2 ? mockCart.slice(0,2) : mockCart;
    return (
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-gray-200" />
            <div className="flex-1">
              <div className="font-bold text-sova-cocoa text-sm mb-1">{item.name}</div>
              <div className="text-xs text-gray-400">數量 x {item.qty}</div>
            </div>
            <div className="font-bold text-[#6F1D1B] text-base">NT$ {(item.price * item.qty).toLocaleString()}</div>
          </div>
        ))}
        {simple && mockCart.length > 2 && !showAll && (
          <button className="text-xs text-[#6F1D1B] mt-2 underline" onClick={() => setShowAll(true)}>查看更多 ▼</button>
        )}
      </div>
    );
  };

  // Step 1: 購物車
  const StepCart = () => (
    <div className="bg-white rounded-2xl shadow p-8 mb-8 animate-fadein">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#6F1D1B]">您的購物車</h2>
        <Link to="/products" className="text-xs text-[#6F1D1B] underline hover:text-[#B57E4F]">繼續購物</Link>
      </div>
      <CartList />
      <div className="flex justify-between items-center border-t pt-6 mt-6">
        <span className="font-bold text-lg text-[#6F1D1B]">總金額</span>
        <span className="font-bold text-2xl text-[#6F1D1B]">NT$ {total.toLocaleString()}</span>
      </div>
      {mainButton()}
    </div>
  );

  // Step 2: 填寫資料
  // 改為引入 StepInfo 元件，並傳入 onSubmit prop
  const StepInfoWrapper = () => (
    <StepInfo onSubmit={() => setStep(2)} />
  );

  // Step 3: 訂單確認
  const StepConfirm = () => (
    <div className="bg-white rounded-2xl shadow p-8 mb-8 animate-fadein">
      <div className="font-bold text-[#6F1D1B] text-xl mb-6">訂單確認</div>
      <CartList />
      <div className="border-t pt-6 mt-6 space-y-2">
        <div className="flex justify-between text-base">
          <span>商品總金額</span>
          <span>NT$ {total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-base">
          <span>運費</span>
          <span>NT$ 0</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>應付金額</span>
          <span className="text-[#6F1D1B]">NT$ {total.toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-8">
        <div className="text-sm text-gray-500 mb-2">訂購人資訊</div>
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-sova-cocoa">
          <div>姓名：{form.name}</div>
          <div>電話：{form.phone}</div>
          <div>Email：{form.email}</div>
          <div>配送方式：{form.delivery}</div>
          <div>付款方式：{form.payment}</div>
          <div>發票：{form.invoice}</div>
        </div>
      </div>
      {mainButton()}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF6F3]">
      <Navigation />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#6F1D1B] mb-8 text-center tracking-wide">結帳流程</h1>
        <Progress />
        <div className="transition-all duration-500">
          {step === 0 && <StepCart />}
          {step === 1 && <StepInfoWrapper />}
          {step === 2 && <StepConfirm />}
        </div>
      </div>
    </div>
  );
}

// 基本 input 樣式
// tailwind.config.js 需支援 input 樣式
// .input { @apply border border-gray-200 rounded-lg px-3 py-2 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-sm transition; } 