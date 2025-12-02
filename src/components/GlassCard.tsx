import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverable = false 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative
        bg-white/[0.14]
        backdrop-blur-[18px]
        rounded-[16px]
        border border-white/[0.18]
        p-4
        transition-all duration-200
        ${hoverable ? 'cursor-pointer hover:scale-[1.01] hover:shadow-[0_0_16px_rgba(255,255,255,0.35)] hover:border-white/[0.35]' : ''}
        ${className}
      `}
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12), 0 -2px 10px rgba(255, 255, 255, 0.25)'
      }}
    >
      {children}
    </div>
  );
};
