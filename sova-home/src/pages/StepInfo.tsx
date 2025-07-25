import React, { useState, useRef } from 'react';

interface SafeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SafeInput({ value, onChange, ...props }: SafeInputProps) {
  const composingRef = useRef(false);
  return (
    <input
      {...props}
      value={value}
      onChange={e => {
        onChange(e);
      }}
      onCompositionStart={() => { composingRef.current = true; }}
      onCompositionEnd={e => {
        composingRef.current = false;
        onChange(e);
      }}
      className={props.className || ''}
    />
  );
}

const PRIMARY = '#6F1D1B';

interface StepInfoProps {
  onSubmit?: () => void;
}

export default function StepInfo({ onSubmit }: StepInfoProps) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', delivery: '', payment: '', invoice: '', coupon: '' });
  const [formError, setFormError] = useState<Record<string, string>>({});
  const [showAll, setShowAll] = useState(false);

  // 驗證表單
  const validate = (): Record<string, string> => {
    const err: Record<string, string> = {};
    if (!form.name) err.name = '請輸入姓名';
    if (!form.phone) err.phone = '請輸入電話';
    if (!form.email) err.email = '請輸入 Email';
    if (!form.delivery) err.delivery = '請選擇配送方式';
    if (!form.payment) err.payment = '請選擇付款方式';
    // 優惠碼不再必填
    return err;
  };

  // 假商品資料
  const cart = [
    { id: 1, name: '現代舒適三人沙發', price: 45800, qty: 1, image: '/sofa1.png' },
    { id: 2, name: '多功能模組沙發', price: 68000, qty: 2, image: '/sofa2.png' },
    { id: 3, name: '北歐風格單人沙發', price: 28000, qty: 1, image: '/sofa3.png' },
    { id: 4, name: '日式禪風茶几', price: 12000, qty: 1, image: '/sofa4.png' },
  ];
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 商品顯示邏輯
  const visibleItems = showAll ? cart : cart.slice(0, 2);
  const hasMore = cart.length > 2 && !showAll;

  // 主按鈕
  const mainButton = () => (
    <button
      className="w-full py-3 rounded-lg text-white font-bold text-lg mt-6 transition"
      style={{ background: PRIMARY }}
      onClick={() => {
        const err = validate();
        setFormError(err);
        if (Object.keys(err).length === 0) {
          if (onSubmit) {
            onSubmit();
          } else {
            alert('表單驗證通過！');
          }
        }
      }}
    >
      提交訂單
    </button>
  );

  return (
    <div className="bg-white rounded-2xl shadow p-8 mb-8 animate-fadein">
      {/* 商品資訊區塊 */}
      <div className="mb-8">
        <div className="font-bold text-[#6F1D1B] text-lg mb-2">購物車商品</div>
        <div className="space-y-2">
          {visibleItems.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <span className="truncate">{item.name} <span className="text-gray-400">x{item.qty}</span></span>
              </div>
              <span className="text-[#6F1D1B] font-bold">NT$ {(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
        </div>
        {hasMore && (
          <button className="text-xs text-[#6F1D1B] mt-2 underline" onClick={() => setShowAll(true)}>
            查看更多 ▼
          </button>
        )}
        <div className="flex justify-between items-center border-t pt-3 mt-3 font-bold text-base">
          <span>總金額</span>
          <span className="text-[#6F1D1B]">NT$ {total.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-8">
        {/* 訂購人資訊 */}
        <div className="bg-gray-50 rounded-xl p-5 flex flex-col gap-3">
          <div className="font-bold text-[#6F1D1B] mb-2">訂購人資訊</div>
          <SafeInput
            type="text"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="姓名*"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-base transition"
          />
          {formError['name'] && <span className="text-xs text-red-500">{formError['name']}</span>}
          <SafeInput
            type="text"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            placeholder="電話*"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-base transition"
          />
          {formError['phone'] && <span className="text-xs text-red-500">{formError['phone']}</span>}
          <SafeInput
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="Email*"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-base transition"
          />
          {formError['email'] && <span className="text-xs text-red-500">{formError['email']}</span>}
        </div>
        {/* 送貨與付款 */}
        <div className="bg-gray-50 rounded-xl p-5 flex flex-col gap-3">
          <div className="font-bold text-[#6F1D1B] mb-2">送貨與付款</div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">配送方式</label>
            <select className={`border border-gray-200 rounded-lg px-3 py-2 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-sm transition ${formError['delivery'] ? 'border-red-400' : ''}`} value={form.delivery} onChange={e => setForm({ ...form, delivery: e.target.value })}>
              <option value="">請選擇</option>
              <option>宅配</option>
              <option>超商</option>
              <option>黑貓</option>
            </select>
            {formError['delivery'] && <span className="text-xs text-red-500">{formError['delivery']}</span>}
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-xs text-gray-500">付款方式</label>
            <select className={`border border-gray-200 rounded-lg px-3 py-2 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-sm transition ${formError['payment'] ? 'border-red-400' : ''}`} value={form.payment} onChange={e => setForm({ ...form, payment: e.target.value })}>
              <option value="">請選擇</option>
              <option>信用卡</option>
              <option>LINE Pay</option>
              <option>貨到付款</option>
            </select>
            {formError['payment'] && <span className="text-xs text-red-500">{formError['payment']}</span>}
          </div>
        </div>
        {/* 發票與優惠碼 */}
        <div className="bg-gray-50 rounded-xl p-5 flex flex-col gap-3">
          <div className="font-bold text-[#6F1D1B] mb-2">發票與優惠碼</div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-500">發票選項</label>
            <select className="border border-gray-200 rounded-lg px-3 py-2 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-sm transition" value={form.invoice} onChange={e => setForm({ ...form, invoice: e.target.value })}>
              <option value="">請選擇</option>
              <option>自然人載具</option>
              <option>統編</option>
              <option>紙本發票</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-xs text-gray-500">優惠碼</label>
            <div className="flex gap-2">
              <SafeInput
                type="text"
                value={form.coupon}
                onChange={e => setForm({ ...form, coupon: e.target.value })}
                placeholder="請輸入優惠碼"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-base transition"
              />
              <button className="px-3 py-2 rounded-lg text-xs font-bold text-white" style={{ background: PRIMARY }}>驗證</button>
            </div>
          </div>
        </div>
      </div>
      {mainButton()}
    </div>
  );
} 