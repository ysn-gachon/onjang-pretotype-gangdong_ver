import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { NeumorphicButton } from '../NeumorphicButton';
import { OrderHistoryButton } from '../OrderHistoryButton';
import { Store, Circle, ClipboardList } from 'lucide-react';
import { markets } from '../../data/menuData';
import { Page } from '../../types/menu';

const marketImages: Record<string, string> = {
  '길동 복조리 시장': '/길동복조리시장_assets/복조리 전경.webp',
  '암사 종합시장': '/암사시장_assets/암샂 전경.webp'
};

interface MarketSelectPageProps {
  onNavigate: (page: Page, market?: string) => void;
  onBack: () => void;
}

export const MarketSelectPage: React.FC<MarketSelectPageProps> = ({ onNavigate, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen p-6"
    >
      {/* Header with back and history buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-10" />
        <OrderHistoryButton onClick={() => onNavigate('order-history')} />
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div>
          <h2 className="text-[20px] text-[#101318] mb-2">시장 선택하기</h2>
          <p className="text-[14px] text-[#101318]/55">
            주문하실 시장을 선택해주세요
          </p>
        </div>

        <div className="space-y-4">
          {markets.map((market, index) => (
            <motion.div
              key={market}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard
                hoverable
                onClick={() => onNavigate('menu-select', market)}
                className="p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#ECEEF2] flex items-center justify-center flex-shrink-0" style={{
                    boxShadow: '6px 6px 16px rgba(0,0,0,0.12), -4px -4px 10px rgba(255,255,255,0.8)'
                  }}>
                    <Store size={24} className="text-[#101318]/70" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-[16px] text-[#101318]">{market}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Circle size={8} className="text-green-500 fill-green-500" />
                      <span className="text-[12px] text-green-600">영업중</span>
                    </div>
                  </div>

                  <div 
                    className="rounded-[10px] overflow-hidden flex-shrink-0 border border-white/30"
                    style={{ width: '100px', height: '100px' }}
                  >
                    <img 
                      src={marketImages[market]} 
                      alt={market}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <p className="text-[12px] text-[#101318]/45 text-center pt-4">
          ※ 시장이 달라도 교차 주문 및 배달이 가능합니다.
        </p>

        <div className="pt-6">
          <NeumorphicButton
            onClick={() => onNavigate('order-history')}
            variant="glass"
            className="w-full flex items-center justify-center gap-2"
          >
            <ClipboardList size={18} />
            <span>내 주문 내역 보기</span>
          </NeumorphicButton>
        </div>
      </div>
    </motion.div>
  );
};
