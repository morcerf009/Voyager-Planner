import React, { useEffect } from 'react';
import { Bell, Info, AlertTriangle, X } from 'lucide-react';
import { AppNotification } from '../types';

interface ToastProps {
  notification: AppNotification;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, 5000); // Auto close after 5 seconds
    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  const icons = {
    alert: <AlertTriangle size={20} className="text-amber-500" />,
    reminder: <Bell size={20} className="text-primary-500" />,
    update: <Info size={20} className="text-blue-500" />
  };

  return (
    <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-4 mb-3 flex items-start gap-3 w-80 animate-in slide-in-from-right-5 fade-in duration-300">
      <div className="mt-0.5">{icons[notification.type]}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-800">{notification.message}</p>
        <span className="text-xs text-slate-400">Just now</span>
      </div>
      <button onClick={() => onClose(notification.id)} className="text-slate-400 hover:text-slate-600">
        <X size={16} />
      </button>
    </div>
  );
};
