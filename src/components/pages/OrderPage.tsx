import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { NeumorphicButton } from '../NeumorphicButton';
import { OrderHistoryButton } from '../OrderHistoryButton';
import { GoogleLoginModal } from '../GoogleLoginModal';
import { CheckCircle2 } from 'lucide-react';
import { CartItem } from '../../types/menu';
import { trackEvent } from '../../hooks/useGA';

interface OrderPageProps {
  cart: CartItem[];
  cartTotal: number;
  onBack: () => void;
  onClearCart: (paymentMethod?: string) => void;
  onNavigateToHistory: () => void;
  authState: 'none' | 'guest' | 'google';
  onGoogleLogin: () => void;
  onFakedoor: (compensationCode?: string) => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({ 
  cart, 
  cartTotal, 
  onBack,
  onClearCart,
  onNavigateToHistory,
  authState,
  onGoogleLogin,
  onFakedoor
}) => {
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrderTotal, setCompletedOrderTotal] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFakedoorModal, setShowFakedoorModal] = useState(false);
  const [completedIsFakedoor, setCompletedIsFakedoor] = useState(false);
  const [completedCompensationCode, setCompletedCompensationCode] = useState<string | undefined>(undefined);

  const deliveryFee = 1900;
  const totalAmount = cartTotal + deliveryFee;

  const handleOrder = () => {
    // When user clicks the order button, open the external site directly.
    // The button is already disabled by `isValid` when name/phone/address/minimum are not met.
    const itemSummary = cart.map(item => `${item.menuItem.name}(${item.quantity})`).join(', ');
    trackEvent('Order', 'Click', `Items: ${itemSummary} | Total: ${totalAmount}`);
    
    const url = 'https://m.site.naver.com/1WItQ';
    window.open(url, '_blank', 'noopener,noreferrer');
    return;
  };

  const proceedWithOrder = () => {
    setCompletedOrderTotal(cartTotal); // Save the cart total before clearing
    onClearCart(); // This saves the order and clears the cart
    setOrderComplete(true);
  };

  const handleGoogleLoginFromModal = () => {
    onGoogleLogin();
    setShowLoginModal(false);
    // In this demo we still show fakedoor behavior after login - proceed to fakedoor modal
    setShowFakedoorModal(true);
  };

  const handleOpenKakao = () => {
    const url = 'https://m.site.naver.com/1VD0N';
    // open the Kakao Open Chat in a new tab/window
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowFakedoorModal(false);
  };

  const handleAcceptFakedoor = () => {
    // generate a simple compensation code
    const code = `BUD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    // notify app to record fakedoor event and clear cart
    onFakedoor(code);
    setShowFakedoorModal(false);
    setCompletedOrderTotal(cartTotal);
    
    setCompletedIsFakedoor(true);
    setCompletedCompensationCode(code);
    setOrderComplete(true);
  };

  const isValid = cartTotal >= 13000;

  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center p-6"
      >
        <GlassCard className="max-w-md w-full p-8 rounded-[24px] space-y-6">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
            </motion.div>
            <h2 className="text-[20px] text-[#101318] mb-2">주문이 완료되었습니다!</h2>
            <p className="text-[14px] text-[#101318]/55">
              곧 따뜻한 음식이 배달됩니다
            </p>
          </div>

          <div className="bg-[#ECEEF2] rounded-[14px] p-4 space-y-2">
            <div className="space-y-2 pb-3 border-b border-[#101318]/10">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#101318]/70">음식금액</span>
                <span className="text-[#101318]">₩{completedOrderTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-[#101318]/70">배달비</span>
                <span className="text-[#101318]">₩{deliveryFee.toLocaleString()}</span>
              </div>
            </div>
            <div className="pt-2 flex justify-between items-center">
              <span className="text-[14px] text-[#101318]">총 결제금액</span>
              <span className="text-[18px] text-[#38B486]" style={{ fontWeight: 600 }}>
                ₩{(completedOrderTotal + deliveryFee).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-[#ECEEF2] rounded-[14px] p-4 space-y-1">
            <p className="text-[14px] text-[#101318]" style={{ fontWeight: 500 }}>결제 안내</p>
            <p className="text-[14px] text-[#101318]/80">결제는 배달 후 계좌이체로 진행됩니다.</p>
          </div>

          

          {/* Contact Information */}
          <div className="pt-4 border-t border-[#101318]/10 space-y-1">
            <p className="text-[12px] text-[#101318]/60 text-center">
              이메일 : budofficial07@gmail.com
            </p>
            <p className="text-[12px] text-[#101318]/60 text-center">
              인스타그램 : @b.u.d_official
            </p>
          </div>

          <NeumorphicButton
            onClick={onNavigateToHistory}
            className="w-full py-3"
          >
            주문 내역 보기
          </NeumorphicButton>
        </GlassCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen pb-32"
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/[0.14] backdrop-blur-[18px] border-b border-white/[0.18] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10" />
          <OrderHistoryButton onClick={onNavigateToHistory} />
        </div>
        <h2 className="text-[20px] text-[#101318]">주문 정보 입력</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Order summary */}
        <GlassCard className="p-5 rounded-[20px]">
          <h3 className="text-[16px] text-[#101318] mb-4">주문 내역</h3>
          <div className="space-y-3">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between text-[14px]">
                <div className="text-[#101318]/70">
                  {item.menuItem.name}{item.selectedOption ? ` (${item.selectedOption})` : ''} × {item.quantity}
                </div>
                <div className="text-[#101318]">
                  ₩{(item.finalPrice * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-white/20 space-y-2">
              <div className="flex justify-between text-[14px]">
                <span className="text-[#101318]/70">상품금액</span>
                <span className="text-[#101318]">₩{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-[#101318]/70">배달비</span>
                <span className="text-[#101318]">₩{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-white/20 flex justify-between">
                <span className="text-[15px] text-[#101318]">총금액</span>
                <span className="text-[18px] text-[#38B486]" style={{ fontWeight: 600 }}>
                  ₩{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </GlassCard>

        

        {/* Total amount */}
        <div className="pt-2 pb-2 flex justify-between items-center">
          <span className="text-[16px] text-[#101318]">총 결제금액</span>
          <span className="text-[24px] text-[#38B486]" style={{ fontWeight: 600 }}>
            ₩{totalAmount.toLocaleString()}
          </span>
        </div>

        {/* Order button */}
        <NeumorphicButton
          onClick={handleOrder}
          disabled={!isValid}
          className="w-full py-4"
        >
          <span className="text-[15px]">주문정보 입력하기</span>
        </NeumorphicButton>

        <p className="text-[15px] text-[#101318]/40 text-center pt-2">
          온장의 수익금 10%는 결식 아동 식비 지원에 사용됩니다.
        </p>
      </div>

      {/* Google Login Modal */}
      <GoogleLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onGoogleLogin={handleGoogleLoginFromModal}
      />

      {/* Fakedoor Modal: inform user order cannot be placed and offer compensation */}
      {showFakedoorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm" onClick={() => setShowFakedoorModal(false)}>
          <div onClick={(e) => e.stopPropagation()} className="max-w-sm w-full">
            <div className="relative">
              <div className="p-6">
                <div className="text-center space-y-4">
                  <h2 className="text-[20px] text-[#101318]">주문이 불가능합니다</h2>
                  <p className="text-[14px] text-[#101318]/60">
                    현재 서버가 불안정하여 주문이 불가합니다. 불편을 드려 죄송합니다.
                    보상 쿠폰은 아래 카카오톡 오픈채팅으로 문의 주시면 발급해 드립니다.
                  </p>

                  <div className="space-y-2 pt-2">
                    <NeumorphicButton onClick={handleOpenKakao} className="w-full py-3">
                      카카오톡으로 문의하기
                    </NeumorphicButton>

                    <button
                      onClick={() => setShowFakedoorModal(false)}
                      className="w-full py-2 text-[13px] text-[#101318]/60 hover:text-[#101318] transition-colors"
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
