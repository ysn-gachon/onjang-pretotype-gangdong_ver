import React from 'react';
import { motion } from 'motion/react';

interface NeumorphicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'glass';
}

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  variant = 'default'
}) => {
  const baseStyle = variant === 'default' 
    ? 'bg-[#ECEEF2]'
    : 'bg-white/[0.22] backdrop-blur-[12px] border border-white/[0.3]';

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.97 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle}
        rounded-full
        px-6 py-3
        transition-all duration-150
        disabled:opacity-40 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        boxShadow: variant === 'default' 
          ? '6px 6px 16px rgba(0,0,0,0.12), -4px -4px 10px rgba(255,255,255,0.8)'
          : '0 4px 12px rgba(0, 0, 0, 0.12)'
      }}
    >
      {children}
    </motion.button>
  );
};
