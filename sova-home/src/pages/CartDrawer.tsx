import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const mockCart = [
  { id: 1, name: '現代舒適三人沙發', price: 45800, qty: 1 },
  { id: 2, name: '多功能模組沙發', price: 68000, qty: 1 },
];

const CartDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const total = mockCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const navigate = useNavigate();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={v => !v && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <DialogPrimitive.Content
          className="fixed right-0 top-0 h-full w-[400px] max-w-full bg-white shadow-lg flex flex-col p-0 m-0 animate-slide-in-right rounded-none border-0 z-50"
          style={{ outline: 'none' }}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h3 className="text-lg font-bold">購物車</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <ul className="divide-y">
              {mockCart.map(item => (
                <li key={item.id} className="py-3 flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="font-bold">NT$ {item.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-6 text-lg font-bold">
              <span>總金額</span>
              <span>NT$ {total.toLocaleString()}</span>
            </div>
          </div>
          <div className="p-6 border-t">
            <Button className="w-full bg-sova-cocoa text-white" onClick={() => { onClose(); navigate('/checkout'); }}>
              立即結帳
            </Button>
          </div>
          <style>{`
            .animate-slide-in-right {
              animation: slideInRight 0.28s cubic-bezier(0.4,0,0.2,1);
            }
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default CartDrawer; 