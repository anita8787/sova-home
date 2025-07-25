# CLAUDE.md

這個檔案為在此儲存庫中工作的 Claude Code (claude.ai/code) 提供指導。

## 專案概述

「溫感家居 Hygge Sofa Haven」是一個北歐風格沙發品牌網站，整合了 3D 產品展示、客製化服務和線上預約功能。

## 技術架構

### 核心技術棧
- **React 18** + **TypeScript** + **Vite** + **SWC**
- **Tailwind CSS** + **shadcn/ui** (基於 Radix UI)
- **React Router DOM** 用於路由管理
- **TanStack React Query** 用於狀態管理
- **Three.js** + **@react-three/fiber** + **@react-three/drei** 用於 3D 展示
- **Framer Motion** + **GSAP** 用於動畫效果

### 專案結構
```
src/
├── components/           # 可重用組件
│   ├── ui/              # shadcn/ui 基礎組件
│   ├── Sofa3D.tsx       # 3D 沙發展示核心組件
│   ├── Navigation.tsx   # 響應式導航欄
│   └── [其他組件]
├── pages/               # 路由頁面
│   ├── Index.tsx        # 首頁
│   ├── Customization.tsx # 3D 客製化頁面
│   └── [其他頁面]
├── hooks/               # 自定義 Hooks
└── lib/                 # 工具函數
```

## 開發命令

### 基本開發命令
```bash
# 啟動開發服務器（端口 8080）
npm run dev

# 構建生產版本
npm run build

# 構建開發版本
npm run build:dev

# 執行代碼檢查
npm run lint

# 預覽構建結果
npm run preview
```

### 3D 模型管理
- 3D 模型檔案位於 `public/models/sofa.glb`
- 透過 `Sofa3D.tsx` 組件載入和控制
- 支援即時材質和顏色變更

## 設計系統

### SOVA 品牌色彩系統
專案使用自定義的 SOVA 色彩系統，定義在 `tailwind.config.ts` 中：
```css
sova-primary: #B57E4F      /* 焦糖淺棕 - 主色 */
sova-secondary: #E8DFC9    /* 米白 - 輔助色 */
sova-accent: #FAB44F       /* 暖日黃 - 強調色 */
sova-linen: #F4F0E7        /* 亞麻白 */
sova-mocha: #A68A6E        /* 摩卡棕 */
sova-cocoa: #6B4F39        /* 可可線條 */
```

### UI 組件約定
- 使用 shadcn/ui 作為基礎組件庫
- 所有組件支援深色模式（雖然目前未啟用）
- 路徑別名：`@/` 指向 `src/`
- 顏色值使用 HSL 格式

## 路由結構

主要頁面路由：
- `/` - 首頁（Hero + 產品展示）
- `/about` - 品牌理念
- `/products` - 產品目錄（支援篩選）
- `/products/:id` - 產品詳情
- `/customization` - 3D 客製化服務
- `/visit` - 預約參觀
- `/checkout` - 結帳流程
- `/profile` - 客戶資料

## 重要配置檔案

### TypeScript 配置
- `tsconfig.json` 採用寬鬆配置利於快速開發
- 關閉 `noImplicitAny`、`noUnusedLocals`、`strictNullChecks`
- 啟用路徑別名：`@/*` → `./src/*`

### Vite 配置
- 開發服務器使用 IPv6 (`host: "::"`)
- 預設端口：8080
- 使用 SWC 編譯器提升效能

### ESLint 配置
- 關閉未使用變數警告
- 啟用 React Hooks 規則
- 支援 TypeScript

## 3D 功能整合

### Sofa3D 組件架構
- 基於 Three.js 和 @react-three/fiber
- 支援 OrbitControls 交互控制
- 即時材質切換功能
- GLB 模型格式載入

### 顏色映射系統
3D 組件中的顏色使用字串映射到具體色值：
```typescript
// 範例：getColorValue 函數處理顏色轉換
'leather-brown' → '#8B4513'
'fabric-beige' → '#F5F5DC'
```

## 開發指導原則

### 程式碼風格
- TypeScript 嚴格模式關閉（專案配置）
- 使用 PascalCase 命名 React 組件
- 檔案名稱與組件名稱保持一致
- 優先使用函數式組件和 Hooks

### 響應式設計
- 採用移動優先設計原則
- 使用 Tailwind CSS 響應式工具類
- 導航欄在行動裝置上採用抽屜式選單

### 效能考量
- 使用 React.lazy() 進行程式碼分割（如需要）
- 3D 組件採用按需載入
- 圖片資源放在 `public/` 目錄便於快取

## 品牌資產管理

### 圖片資源
- Logo：`/logo.png`
- 產品圖片：`/sofa1.png`, `/sofa2.png`, `/sofa3.png`
- 品牌理念圖：`/品牌理念核心圖.JPG`, `/理念首圖.JPG`
- 材質圖：`/texture.jpg`, `/wood texture.jpg`

### 3D 資源
- 沙發模型：`/models/sofa.glb`
- 模型針對網頁顯示進行最佳化
- 支援即時材質和顏色變更

## 注意事項

- 專案已移除所有 lovable 相關依賴和配置
- HTML meta 標籤使用品牌 logo 作為社交媒體分享圖片
- 開發時注意保持 SOVA 品牌色彩一致性
- 新增 UI 組件時優先考慮 shadcn/ui 現有組件
- 3D 功能修改時需注意效能影響