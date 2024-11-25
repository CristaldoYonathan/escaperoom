import { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

interface CustomAlertProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function CustomAlert({ message, isVisible, onClose }: CustomAlertProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg flex items-center space-x-2 animate-fade-in-out">
      <AlertCircle className="h-5 w-5" />
      <span>{message}</span>
    </div>
  );
}

