import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface FloatingBackButtonProps {
  onClick: () => void;
  className?: string;
  topClass?: string; // e.g. 'top-6'
  leftClass?: string; // e.g. 'left-4'
}

export const FloatingBackButton: React.FC<FloatingBackButtonProps> = ({
  onClick,
  className = '',
  topClass = 'top-6',
  leftClass = 'left-4'
}) => {
  return (
    <button
      onClick={onClick}
      aria-label="뒤로가기"
      className={`fixed ${leftClass} ${topClass} z-40 p-2 rounded-full bg-white/[0.14] backdrop-blur-[18px] border border-white/[0.18] shadow-md ${className}`}
    >
      <ArrowLeft size={20} className="text-[#101318]" />
    </button>
  );
};

export default FloatingBackButton;
