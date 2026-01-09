import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { Mail, Instagram } from 'lucide-react';

interface SupportPageProps {
  onBack: () => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen pb-12"
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/[0.14] backdrop-blur-[18px] border-b border-white/[0.18] p-6">
        <div className="flex items-center justify-between">
          <div className="w-10" />
          <h1 className="text-[#101318]">문의 / 고객지원</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-6 flex items-center justify-center min-h-[calc(100vh-120px)]">
        {/* Contact Card */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md"
        >
          <GlassCard className="p-6 rounded-[20px]">
            <div className="space-y-4">
              <h3 className="text-[16px] text-[#101318] text-center" style={{ fontWeight: 600 }}>
                문의 / 고객지원
              </h3>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.14] backdrop-blur-[12px] border border-white/[0.18]">
                    <Mail size={16} className="text-[#101318]/70" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] text-[#101318]/80">
                      budofficial07@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.14] backdrop-blur-[12px] border border-white/[0.18]">
                    <Instagram size={16} className="text-[#101318]/70" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] text-[#101318]/80">
                      @b.u.d_official
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Hidden Admin Tools */}
          <div className="mt-8 flex justify-center opacity-30 hover:opacity-100 transition-opacity">
            <button
              onClick={async () => {
                if (confirm('데이터베이스를 초기화(Seed) 하시겠습니까?')) {
                  const { seedDatabase } = await import('../../utils/seedDatabase');
                  seedDatabase();
                }
              }}
              className="text-[11px] text-[#101318]/40 underline"
            >
              DB Setup (Admin)
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
