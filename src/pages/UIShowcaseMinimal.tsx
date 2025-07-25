import React from 'react';

const UIShowcaseMinimal: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F4F0E7', // sova-linen
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#B57E4F', // sova-primary
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          🎉 UI/UX 增強功能測試
        </h1>
        
        <p style={{ 
          color: '#A68A6E', // sova-mocha
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '1.1rem'
        }}>
          如果您能看到這個頁面，說明路由和基本樣式都正常工作！
        </p>

        <div style={{
          backgroundColor: '#E8DFC9', // sova-secondary
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{ 
            color: '#B57E4F',
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            ✅ 基本功能檢查
          </h2>
          <ul style={{ 
            color: '#A68A6E',
            lineHeight: '1.6'
          }}>
            <li>✓ React 組件渲染正常</li>
            <li>✓ 路由系統工作正常</li>
            <li>✓ SOVA 色彩系統載入成功</li>
            <li>✓ 基本樣式渲染正常</li>
          </ul>
        </div>

        <button 
          style={{
            backgroundColor: '#FAB44F', // sova-accent
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.3s ease'
          }}
          onClick={() => alert('按鈕功能正常！🎊')}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#B57E4F'; // sova-primary
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#FAB44F'; // sova-accent
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          點擊測試互動功能 🚀
        </button>

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '8px'
        }}>
          <h3 style={{ 
            color: '#0369a1',
            marginBottom: '0.5rem',
            fontSize: '1.2rem'
          }}>
            📋 下一步
          </h3>
          <p style={{ 
            color: '#0369a1',
            margin: 0,
            fontSize: '0.9rem'
          }}>
            如果這個頁面正常顯示且按鈕可以點擊，請告訴我，我們就可以開始添加更複雜的 UI 組件了！
          </p>
        </div>
      </div>
    </div>
  );
};

export default UIShowcaseMinimal;