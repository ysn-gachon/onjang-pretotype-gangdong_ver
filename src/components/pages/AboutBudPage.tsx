import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { Mail, Instagram } from 'lucide-react';
import budTeamImage from '../../assets_name_change/bud photo.png';

interface AboutBudPageProps {
  onBack: () => void;
}

export const AboutBudPage: React.FC<AboutBudPageProps> = ({ onBack }) => {
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
          <h1 className="text-[#101318]">About B.U.D</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Team Image */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="overflow-hidden rounded-[20px]">
            <img 
              src={budTeamImage} 
              alt="Team B.U.D"
              className="w-full h-auto object-cover"
            />
          </GlassCard>
        </motion.div>

        {/* Introduction Text */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center px-4 py-2"
        >
          <p className="text-[15px] text-[#101318]/80 leading-relaxed" style={{ fontWeight: 500 }}>
            가천대를 거점으로 전통시장 배달 서비스<br />
            온장 런칭을 준비하고 있는 스타트업 팀입니다.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-6 rounded-[20px]">
            <div className="space-y-4">
              <h3 className="text-[16px] text-[#101318]" style={{ fontWeight: 600 }}>
                문의 / 고객지원
              </h3>
              
              <div className="space-y-3">
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
        </motion.div>
      </div>
    </motion.div>
  );
};
