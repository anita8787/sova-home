import { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Sofa3DProps {
  material: string;
  color: string;
  rotation: number;
  onRotate: () => void;
}

function SofaModel({ material, color, rotation }: { material: string; color: string; rotation: number }) {
  const { scene } = useGLTF('/models/sofa.glb');
  const sofaRef = useRef<THREE.Group>(null);

  // 顏色映射
  const getColorValue = () => {
    const colorMap: { [key: string]: string } = {
      'cream': '#F5F0E8',
      'sage': '#9CAF9C',
      'charcoal': '#4A4A4A',
      'navy': '#2C3E50',
      'brown': '#8B4513',
      'beige': '#D2B48C'
    };
    return colorMap[color] || '#F5F0E8';
  };

  // 更新材質顏色
  useEffect(() => {
    if (sofaRef.current) {
      const targetColor = getColorValue();
      const hexColor = parseInt(targetColor.replace('#', ''), 16);
      
      console.log('🎨 顏色變換:', { color, targetColor, hexColor });
      
      sofaRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.color.setHex(hexColor);
                mat.needsUpdate = true;
                console.log('✅ 更新陣列材質顏色');
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.setHex(hexColor);
            child.material.needsUpdate = true;
            console.log('✅ 更新單一材質顏色');
          }
        }
      });
    }
  }, [color]);

  // 依 rotation prop 旋轉 y 軸
  useEffect(() => {
    if (sofaRef.current) {
      sofaRef.current.rotation.y = (rotation * Math.PI) / 180;
    }
  }, [rotation]);
  return (
    <group ref={sofaRef} dispose={null} scale={2.2}>
      <primitive object={scene} />
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sova-primary mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">載入3D模型中...</p>
      </div>
    </div>
  );
}

function ErrorFallback() {
  return (
    <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-xl">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">3D模型載入失敗</p>
        <p className="text-xs text-gray-500">請檢查模型檔案是否存在</p>
      </div>
    </div>
  );
}

export default function Sofa3D({ material, color, rotation, onRotate }: Sofa3DProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <ErrorFallback />;
  }

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 1.7, 4.2], fov: 50 }}
          style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}
          onError={() => setHasError(true)}
        >
          {/* 攝影棚自然打光 */}
          <hemisphereLight intensity={0.7} groundColor={0xf4f0e7} color={0xfff8ee} />
          <ambientLight intensity={0.45} />
          {/* 主光源：右上偏暖，亮度提升 */}
          <directionalLight position={[5, 10, 7]} intensity={2.0} color={0xfff3e0} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          {/* 柔和補光：左側偏暖，亮度提升 */}
          <directionalLight position={[-6, 6, 4]} intensity={0.7} color={0xffe0b2} />
          {/* 柔和點光源 */}
          <pointLight position={[-5, 5, 5]} intensity={0.15} />

          <SofaModel material={material} color={color} rotation={rotation} />

          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0}
            autoRotate={false}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

// 預載入模型
useGLTF.preload('/models/sofa.glb'); 