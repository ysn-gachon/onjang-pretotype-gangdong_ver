import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { ShoppingBag } from 'lucide-react';
import { CartItem } from '../../types/menu';

interface OrderHistoryPageProps {
  orders: Array<{
    cart: CartItem[];
    total: number;
    date: string;
    paymentMethod?: string;
  }>;
  onBack: () => void;
  onNavigateToSupport: () => void;
}

export const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ orders, onBack, onNavigateToSupport }) => {
  const deliveryFee = 2000;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen pb-20"
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/[0.14] backdrop-blur-[18px] border-b border-white/[0.18] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10" />
          <motion.button
            onClick={onNavigateToSupport}
            className="px-3 py-1.5 rounded-full text-[12px] bg-white/[0.22] backdrop-blur-[12px] border border-white/[0.3] text-[#101318]"
            style={{ fontWeight: 500 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.14 }}
          >
            문의 / 고객지원
          </motion.button>
        </div>
        <h2 className="text-[20px] text-[#101318]">주문 내역</h2>
      </div>

      <div className="p-6 space-y-4">
        {orders.length === 0 ? (
          <GlassCard className="p-8 text-center rounded-[20px]">
            <ShoppingBag size={48} className="mx-auto text-[#101318]/30 mb-3" />
            <p className="text-[15px] text-[#101318]/55">아직 주문 내역이 없습니다</p>
          </GlassCard>
        ) : (
          orders.map((order, orderIndex) => (
            <GlassCard key={orderIndex} className="p-5 rounded-[20px]">
              <div className="space-y-4">
                <div className="pb-3 border-b border-white/20">
                  <p className="text-[12px] text-[#101318]/45">주문일시</p>
                  <p className="text-[14px] text-[#101318] mt-1">{order.date}</p>
                </div>

                <div>
                  <h3 className="text-[14px] text-[#101318] mb-3">주문 메뉴</h3>
                  <div className="space-y-2">
                    {order.cart.map((item, index) => (
                      <div key={index} className="flex justify-between text-[13px]">
                        <div className="text-[#101318]/70">
                          {item.menuItem.name}{item.selectedOption ? ` (${item.selectedOption})` : ''} × {item.quantity}
                        </div>
                        <div className="text-[#101318]">
                          ₩{(item.finalPrice * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/20 space-y-2">
                  {order.paymentMethod && (
                    <div className="flex justify-between text-[13px] pb-2">
                      <span className="text-[#101318]/70">이체 방식</span>
                      <span className="text-[#101318]">{order.paymentMethod}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#101318]/70">상품금액</span>
                    <span className="text-[#101318]">₩{order.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#101318]/70">배달비</span>
                    <span className="text-[#101318]">₩{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-white/20 flex justify-between">
                    <span className="text-[14px] text-[#101318]">총금액</span>
                    <span className="text-[16px] text-[#38B486]" style={{ fontWeight: 600 }}>
                      ₩{(order.total + deliveryFee).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-[#ECEEF2] rounded-[14px] p-4 space-y-1">
                  <p className="text-[13px] text-[#101318]" style={{ fontWeight: 500 }}>결제 안내</p>
                  <p className="text-[14px] text-[#101318]/80">결제는 배달 후 계좌이체로 진행됩니다.</p>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </motion.div>
  );
};
