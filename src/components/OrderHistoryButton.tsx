import React from 'react';
import { motion } from 'motion/react';
import { Receipt } from 'lucide-react';

interface OrderHistoryButtonProps {
  onClick: () => void;
}

export const OrderHistoryButton: React.FC<OrderHistoryButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-white/[0.14] backdrop-blur-[18px] border border-white/[0.18] flex items-center justify-center"
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      <Receipt size={18} className="text-[#101318]" />
    </motion.button>
  );
};
