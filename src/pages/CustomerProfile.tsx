import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Navigation from '@/components/Navigation';

const PRIMARY = '#6F1D1B';
const COUNTRY_CODES = [
  { code: '+886', label: 'TW' },
  { code: '+86', label: 'CN' },
  { code: '+81', label: 'JP' },
  { code: '+1', label: 'US' },
];

export default function CustomerProfile() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [showRegister, setShowRegister] = useState(false);
  // 註冊表單
  const [register, setRegister] = useState({
    country: '+886',
    phone: '',
    email: '',
    agreePromo: false,
    agreeTerms: false,
  });

  // 註冊按鈕啟用條件
  const canRegister =
    register.phone.length >= 9 &&
    register.email.length > 0 &&
    register.agreeTerms;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F3] px-4">
      <Navigation />
      <div className="flex-1 flex flex-col justify-center items-center">
        {!showRegister ? (
          <>
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-8 flex flex-col gap-8 mt-12 mb-8">
              {/* 標題 */}
              <h1 className="text-2xl font-bold text-black mb-2">登入</h1>
              {/* 輸入欄位 */}
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email 或手機號碼</label>
                  <input
                    type="text"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-base transition"
                    placeholder="請輸入 Email 或手機號碼"
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">密碼</label>
                  <div className="flex items-center relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-base transition pr-10"
                      placeholder="請輸入密碼"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 text-gray-400 hover:text-gray-700 self-center"
                      tabIndex={-1}
                      style={{ top: '50%', transform: 'translateY(-50%)' }}
                      onClick={() => setShowPassword(v => !v)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {/* 忘記密碼 */}
                <div className="flex justify-start mt-1">
                  <a href="#" className="text-xs text-gray-400 hover:underline">忘記密碼？</a>
                </div>
                {/* 登入按鈕 */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-white font-bold text-lg mt-2 shadow-sm transition bg-[#6F1D1B] hover:bg-[#581513] focus:bg-[#581513]"
                  style={{ letterSpacing: '0.04em' }}
                >
                  開始購物吧！
                </button>
              </form>
              {/* 社群登入 */}
              <div className="flex flex-col gap-3 items-center">
                <span className="text-gray-400 text-sm">或使用社群帳號登入</span>
                <div className="flex gap-6 justify-center">
                  <button className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 transition">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE" className="w-7 h-7" />
                  </button>
                  <button className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 transition">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </div>
            {/* 底部提示 */}
            <div className="w-full max-w-sm flex flex-col items-center mt-2 mb-8 gap-3">
              <span className="text-lg text-gray-700 font-semibold">還不是會員？</span>
              <button
                className="w-full py-3 rounded-lg border-2 border-[#6F1D1B] text-[#6F1D1B] font-bold text-lg bg-white hover:bg-[#f7e7e6] transition"
                onClick={() => setShowRegister(true)}
              >
                註冊會員
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 標題致中，移出白色框 */}
            <div className="w-full flex flex-col items-center mt-16 mb-8">
              <h1 className="text-2xl md:text-3xl font-extrabold text-black text-center" style={{ fontFamily: 'inherit', letterSpacing: '0.02em' }}>註冊會員</h1>
            </div>
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4 mb-8">
              <form className="flex flex-col gap-4">
                {/* 手機欄位 */}
                <div className="mt-10">
                  <label className="block text-xs font-light text-gray-700 mb-1">手機號碼</label>
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <select
                      className="px-2 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-xs font-light transition w-full sm:w-20 h-9"
                      value={register.country}
                      onChange={e => setRegister(r => ({ ...r, country: e.target.value }))}
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code}>{c.label} {c.code}</option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-xs font-light transition h-9"
                      placeholder="912 345 678"
                      value={register.phone}
                      onChange={e => setRegister(r => ({ ...r, phone: e.target.value }))}
                    />
                  </div>
                </div>
                {/* Email 欄位 */}
                <div>
                  <label className="block text-xs font-light text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:border-[#6F1D1B] focus:ring-1 focus:ring-[#6F1D1B] outline-none text-xs font-light transition h-9"
                    placeholder="電郵"
                    value={register.email}
                    onChange={e => setRegister(r => ({ ...r, email: e.target.value }))}
                  />
                </div>
                {/* 勾選區塊 */}
                <div className="flex flex-col gap-3 mt-2 mb-4">
                  <label className="flex items-center gap-2 text-xs font-light text-gray-700 !leading-tight">
                    <input
                      type="checkbox"
                      checked={register.agreePromo}
                      onChange={e => setRegister(r => ({ ...r, agreePromo: e.target.checked }))}
                      className="accent-[#6F1D1B] w-4 h-4 rounded border-gray-300"
                    />
                    我願意接收WOW Furniture的最新優惠消息及服務推廣相關資訊
                  </label>
                  <label className="flex items-center gap-2 text-xs font-light text-gray-700 !leading-tight">
                    <input
                      type="checkbox"
                      checked={register.agreeTerms}
                      onChange={e => setRegister(r => ({ ...r, agreeTerms: e.target.checked }))}
                      className="accent-[#6F1D1B] w-4 h-4 rounded border-gray-300"
                    />
                    <span>
                      我同意網站
                      <a href="#" className="text-[#6F1D1B] underline hover:text-[#581513]">服務條款</a>
                      及
                      <a href="#" className="text-[#6F1D1B] underline hover:text-[#581513]">隱私權政策</a>
                    </span>
                  </label>
                </div>
                {/* 主按鈕 */}
                <button
                  type="submit"
                  className={`w-full py-2 rounded-lg font-bold text-sm mt-4 mb-3 shadow-sm transition ${canRegister ? 'bg-[#6F1D1B] text-white' : 'bg-gray-300 text-white cursor-not-allowed'}`}
                  style={{ letterSpacing: '0.04em' }}
                  disabled={!canRegister}
                  onMouseOver={e => {
                    if (canRegister) e.currentTarget.style.background = '#581513';
                  }}
                  onMouseOut={e => {
                    if (canRegister) e.currentTarget.style.background = '#6F1D1B';
                  }}
                >
                  下一步
                </button>
              </form>
              {/* 社群註冊 */}
              <div className="flex flex-col gap-2 items-center mt-4 mb-1">
                <span className="text-gray-400 text-xs font-light">或使用社群帳戶註冊</span>
                <div className="flex gap-4 justify-center">
                  <button className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 transition">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE" className="w-7 h-7" />
                  </button>
                  <button className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 bg-white hover:bg-gray-50 transition">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </div>
            {/* 已有帳號提示區塊 */}
            <div className="w-full max-w-sm flex flex-col items-center mt-2 mb-8 gap-1">
              <span className="text-lg font-bold text-gray-700 text-center">已經有帳號？</span>
              <span className="text-xs text-gray-400 font-light text-center">立即登入享有更多優惠！</span>
              <button
                className="w-full py-3 rounded-lg border border-[#6F1D1B] text-[#6F1D1B] font-bold text-lg bg-white hover:bg-[#f7e7e6] transition"
                onClick={() => setShowRegister(false)}
              >
                登入
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 