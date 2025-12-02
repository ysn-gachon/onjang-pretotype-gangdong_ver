import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { NeumorphicButton } from '../NeumorphicButton';
import { ShoppingCart } from 'lucide-react';
import { Page } from '../../types/menu';

interface MainPageProps {
  onNavigate: (page: Page) => void;
  onGuestLogin: () => void;
  onGoogleLogin: () => void;
  authState: 'none' | 'guest' | 'google';
}

export const MainPage: React.FC<MainPageProps> = ({ onNavigate, onGuestLogin, onGoogleLogin, authState }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background decorative blurs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-[40px]" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200/25 rounded-full blur-[40px]" />
      
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <h1 className="text-[#101318] opacity-60">온장</h1>
      </div>

      {/* About B.U.D Button */}
      <div className="absolute top-6 right-6">
        <motion.button
          onClick={() => onNavigate('about-bud')}
          className="px-4 py-2 rounded-full text-[13px] bg-white/[0.22] backdrop-blur-[12px] border border-white/[0.3] text-[#101318]"
          style={{ fontWeight: 500 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.14 }}
        >
          About B.U.D
        </motion.button>
      </div>

      {/* Main card */}
      <GlassCard className="max-w-md w-full p-8 rounded-[24px] text-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-[22px] text-[#101318]">
              전통시장 배달 서비스
            </h1>
            <p className="text-[32px] tracking-tight" style={{ fontWeight: 600, color: '#FF6A00' }}>
              온장
            </p>
          </div>

          <p className="text-[14px] text-[#101318]/55 leading-relaxed">
            우리 동네 전통시장의 따뜻한 맛,<br />
            이제 집에서 편하게 즐기세요
          </p>

          <div className="pt-4">
            <NeumorphicButton
              onClick={() => onNavigate('market-select')}
              className="w-full flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              <span>주문 시작하기</span>
            </NeumorphicButton>
          </div>
        </div>
      </GlassCard>

      {/* Login Buttons Card */}
      

      <p className="mt-8 text-[15px] text-[#101318]/40">
        온장의 수익금 10%는 결식 아동 식비 지원에 사용됩니다.
      </p>
    </motion.div>
  );
};
