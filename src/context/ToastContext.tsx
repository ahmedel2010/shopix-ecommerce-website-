import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, X, AlertTriangle, XCircle } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  image?: string;
}

interface ToastContextType {
  toast: {
    success: (message: string, duration?: number, image?: string) => void;
    info: (message: string, duration?: number, image?: string) => void;
    warning: (message: string, duration?: number, image?: string) => void;
    error: (message: string, duration?: number, image?: string) => void;
  };
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType, duration = 3000, image?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type, duration, image }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const toastApi = useMemo(() => ({
    success: (msg: string, dur?: number, img?: string) => addToast(msg, 'success', dur, img),
    info: (msg: string, dur?: number, img?: string) => addToast(msg, 'info', dur, img),
    warning: (msg: string, dur?: number, img?: string) => addToast(msg, 'warning', dur, img),
    error: (msg: string, dur?: number, img?: string) => addToast(msg, 'error', dur, img),
  }), [addToast]);

  return (
    <ToastContext.Provider value={{ toast: toastApi, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  const { message, type, image } = toast;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-rose-500 shrink-0" />;
    }
  };

  const getOverlayBadge = () => {
    switch (type) {
      case 'success':
        return (
          <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white border border-zinc-100 shadow-sm shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        );
      case 'info':
        return (
          <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white border border-zinc-100 shadow-sm shrink-0">
            <Info className="w-3.5 h-3.5 text-blue-500" />
          </div>
        );
      case 'warning':
        return (
          <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white border border-zinc-100 shadow-sm shrink-0">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>
        );
      case 'error':
        return (
          <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white border border-zinc-100 shadow-sm shrink-0">
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
          </div>
        );
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, transition: { duration: 0.15 } }}
      className="pointer-events-auto flex items-center justify-between gap-3 p-3 pl-4 rounded-xl border shadow-lg backdrop-blur-md bg-white/95 border-zinc-200/80 text-zinc-800"
    >
      <div className="flex items-center gap-3 min-w-0">
        {image ? (
          <div className="relative shrink-0 w-11 h-11 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50 flex items-center justify-center">
            <img src={image} alt="" className="w-full h-full object-cover" />
            {getOverlayBadge()}
          </div>
        ) : (
          getIcon()
        )}
        <span className="text-sm font-medium leading-5 text-zinc-800 line-clamp-2">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors focus:outline-none shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
