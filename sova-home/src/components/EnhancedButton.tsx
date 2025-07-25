import React, { useState, useRef, useEffect } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  ripple?: boolean;
  glowOnHover?: boolean;
  pulseOnClick?: boolean;
  shake?: boolean;
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  loading = false,
  success = false,
  error = false,
  loadingText = '載入中...',
  successText = '成功',
  errorText = '錯誤',
  ripple = true,
  glowOnHover = true,
  pulseOnClick = true,
  shake = false,
  className,
  onClick,
  disabled,
  ...props
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdCounter = useRef(0);

  // 處理成功狀態
  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // 處理錯誤狀態
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: rippleIdCounter.current++,
      x,
      y,
    };

    setRipples(prev => [...prev, newRipple]);

    // 移除漣漪效果
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    createRipple(event);

    if (pulseOnClick) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 150);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const getDisplayContent = () => {
    if (loading) {
      return (
        <div className="flex items-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText}</span>
        </div>
      );
    }

    if (showSuccess) {
      return (
        <div className="flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>{successText}</span>
        </div>
      );
    }

    if (showError) {
      return (
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorText}</span>
        </div>
      );
    }

    return children;
  };

  const getButtonVariant = () => {
    if (showSuccess) return 'default';
    if (showError) return 'destructive';
    return props.variant || 'default';
  };

  const getButtonClassName = () => {
    return cn(
      'relative overflow-hidden transition-all duration-300 ease-out',
      // 基本狀態
      {
        'opacity-70 cursor-not-allowed': disabled && !loading,
        'cursor-wait': loading,
      },
      // 點擊脈衝效果
      {
        'scale-95': isClicked && pulseOnClick,
      },
      // 發光效果
      {
        'hover:shadow-lg hover:shadow-sova-primary/25': glowOnHover && !disabled && !loading,
      },
      // 搖晃效果
      {
        'animate-pulse': shake,
      },
      // 成功狀態
      {
        'bg-green-500 hover:bg-green-600 border-green-500': showSuccess,
        'text-white': showSuccess,
      },
      // 錯誤狀態
      {
        'bg-red-500 hover:bg-red-600 border-red-500': showError,
        'text-white': showError,
      },
      className
    );
  };

  return (
    <Button
      ref={buttonRef}
      {...props}
      variant={getButtonVariant()}
      className={getButtonClassName()}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {/* 背景發光效果 */}
      {glowOnHover && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      )}

      {/* 漣漪效果 */}
      {ripple && ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '100px',
            height: '100px',
            animationDuration: '600ms',
          }}
        />
      ))}

      {/* 按鈕內容 */}
      <span className="relative z-10 flex items-center justify-center">
        {getDisplayContent()}
      </span>
    </Button>
  );
};

export default EnhancedButton;