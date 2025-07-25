import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  persistent?: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

// 便捷方法
export const useNotify = () => {
  const { addNotification } = useNotifications();

  return {
    success: (title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'success', title, message, ...options }),
    error: (title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'error', title, message, ...options }),
    warning: (title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'warning', title, message, ...options }),
    info: (title: string, message?: string, options?: Partial<Notification>) =>
      addNotification({ type: 'info', title, message, ...options }),
  };
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // 自動移除通知
    if (!notification.persistent && newNotification.duration! > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-3 max-w-sm w-full">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

interface NotificationItemProps {
  notification: Notification;
  onRemove: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // 進場動畫
    setTimeout(() => setIsVisible(true), 50);
  }, []);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(onRemove, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getColorClasses = () => {
    switch (notification.type) {
      case 'success':
        return 'border-green-200 bg-green-50 shadow-green-100';
      case 'error':
        return 'border-red-200 bg-red-50 shadow-red-100';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 shadow-yellow-100';
      case 'info':
        return 'border-blue-200 bg-blue-50 shadow-blue-100';
    }
  };

  return (
    <div
      className={`
        relative p-4 rounded-lg border shadow-lg backdrop-blur-sm transition-all duration-300 ease-out transform
        ${getColorClasses()}
        ${isVisible && !isLeaving 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
      `}
    >
      {/* 進度條 */}
      {!notification.persistent && notification.duration! > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 rounded-t-lg overflow-hidden">
          <div 
            className="h-full bg-sova-primary opacity-60 animate-progress"
            style={{
              animation: `progress ${notification.duration}ms linear forwards`,
            }}
          />
        </div>
      )}

      <div className="flex items-start space-x-3">
        {/* 圖標 */}
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>

        {/* 內容 */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">
            {notification.title}
          </h4>
          {notification.message && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {notification.message}
            </p>
          )}

          {/* 操作按鈕 */}
          {notification.action && (
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={notification.action.onClick}
                className="text-xs px-3 py-1 h-auto"
              >
                {notification.action.label}
              </Button>
            </div>
          )}
        </div>

        {/* 關閉按鈕 */}
        <button
          onClick={handleRemove}
          className="flex-shrink-0 p-1 rounded-full hover:bg-white/50 transition-colors duration-200"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>
  );
};

// CSS 動畫樣式（需要添加到全局 CSS）
const progressKeyframes = `
  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

// 將動畫樣式注入頁面
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = progressKeyframes;
  document.head.appendChild(style);
}

export default NotificationSystem;