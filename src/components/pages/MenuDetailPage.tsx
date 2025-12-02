import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { NeumorphicButton } from '../NeumorphicButton';
import { OrderHistoryButton } from '../OrderHistoryButton';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { MenuItem, RecommendedSet } from '../../types/menu';

interface MenuDetailPageProps {
  item: MenuItem | RecommendedSet;
  onBack: () => void;
  onAddToCart: (item: MenuItem | RecommendedSet, quantity: number, selectedOption?: string) => void;
  cartTotal: number;
  onNavigateToHistory: () => void;
}

const isRecommendedSet = (item: MenuItem | RecommendedSet): item is RecommendedSet => {
  return 'emoji' in item;
};

export const MenuDetailPage: React.FC<MenuDetailPageProps> = ({ 
  item, 
  onBack, 
  onAddToCart,
  cartTotal,
  onNavigateToHistory
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const isSet = isRecommendedSet(item);
  const menuItem = !isSet ? item : null;

  // Initialize selected option
  React.useEffect(() => {
    if (menuItem?.options && menuItem.options.length > 0) {
      setSelectedOption(menuItem.options[0].label);
    }
  }, [menuItem]);

  // Calculate current price
  const getCurrentPrice = () => {
    if (!menuItem?.options) return item.price;
    const option = menuItem.options.find(opt => opt.label === selectedOption);
    return item.price + (option?.delta || 0);
  };

  const currentPrice = getCurrentPrice();
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart(item, quantity, selectedOption || undefined);
    onBack();
  };

  // Helper to get image source
  const getImageSource = () => {
    // For recommended sets
    if (isSet && item.image) {
      return item.image;
    }

    // For regular menu items
    if (!isSet && menuItem?.image) {
      return menuItem.image;
    }
    
    return null;
  };

  const imageSource = getImageSource();

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
        <div className="flex items-center justify-between">
          <div className="w-10" />
          <OrderHistoryButton onClick={onNavigateToHistory} />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Image placeholder */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div 
            className="w-full aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-[20px] overflow-hidden"
            style={{ boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)' }}
          >
            {imageSource ? (
              <img 
                src={imageSource} 
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                  const span = document.createElement('span');
                  span.textContent = '🍽️';
                  span.style.fontSize = '64px';
                  e.currentTarget.parentElement?.appendChild(span);
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-[64px]">🍽️</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Info card */}
        <GlassCard className="p-6 rounded-[20px]">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-[20px] text-[#101318]">{item.name}</h2>
                {!isSet && menuItem?.isRecommended && (
                  <span 
                    className="px-2.5 py-1 rounded-full text-[12px] flex-shrink-0"
                    style={{
                      background: 'rgba(255,255,255,0.24)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.35)',
                      fontWeight: 600,
                      color: '#101318'
                    }}
                  >
                    추천
                  </span>
                )}
              </div>
              {!isSet && (
                <p className="text-[14px] text-[#101318]/55">
                  {item.market} · {item.vendor}
                </p>
              )}
            </div>

            <div className="text-[24px] text-[#38B486]" style={{ fontWeight: 600 }}>
              ₩{currentPrice.toLocaleString()}
            </div>

            {isSet && (
              <div className="space-y-2 pt-2 border-t border-white/20">
                <p className="text-[14px] text-[#101318]/70 leading-relaxed">
                  {item.description}
                </p>
                <div className="space-y-1 mt-3">
                  <p className="text-[13px] text-[#101318]/60">포함 메뉴:</p>
                  {item.items.map((itemStr, idx) => (
                    <p key={idx} className="text-[12px] text-[#101318]/50 pl-2">
                      • {itemStr}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Option selector for items with options */}
        {menuItem?.options && menuItem.options.length > 0 && (
          <GlassCard className="p-6 rounded-[20px]">
            <div className="space-y-3">
              <span className="text-[15px] text-[#101318]">
                {menuItem.name === '옛날 통닭' ? '마리 수 선택' : '사이즈 선택'}
              </span>
              <div className={`grid gap-2 ${menuItem.options.length === 2 ? 'grid-cols-2' : menuItem.options.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {menuItem.options.map((option) => (
                  <motion.button
                    key={option.label}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedOption(option.label)}
                    className={`py-3 px-2 rounded-[12px] text-[14px] transition-all duration-150 ${
                      selectedOption === option.label
                        ? 'bg-[#38B486] text-white'
                        : 'bg-[#ECEEF2] text-[#101318]'
                    }`}
                    style={
                      selectedOption !== option.label
                        ? {
                            boxShadow: '4px 4px 12px rgba(0,0,0,0.1), -2px -2px 8px rgba(255,255,255,0.7)'
                          }
                        : {}
                    }
                  >
                    <div>{option.label}</div>
                    <div className="text-[11px] mt-1 opacity-75">
                      {option.delta === 0 ? '기본' : `+₩${option.delta.toLocaleString()}`}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </GlassCard>
        )}

        {/* Quantity selector */}
        <GlassCard className="p-6 rounded-[20px]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[15px] text-[#101318]">수량</span>
              {menuItem?.options && (
                <p className="text-[13px] text-[#101318]/55 mt-1">
                  합계: ₩{totalPrice.toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-full bg-[#ECEEF2] flex items-center justify-center disabled:opacity-40"
                style={{
                  boxShadow: '6px 6px 16px rgba(0,0,0,0.12), -4px -4px 10px rgba(255,255,255,0.8)'
                }}
              >
                <Minus size={18} className="text-[#101318]" />
              </motion.button>

              <span className="text-[18px] text-[#101318] w-8 text-center">{quantity}</span>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-[#ECEEF2] flex items-center justify-center"
                style={{
                  boxShadow: '6px 6px 16px rgba(0,0,0,0.12), -4px -4px 10px rgba(255,255,255,0.8)'
                }}
              >
                <Plus size={18} className="text-[#101318]" />
              </motion.button>
            </div>
          </div>
        </GlassCard>

        {/* Add to cart button */}
        <NeumorphicButton
          onClick={handleAddToCart}
          variant="glass"
          className="w-full flex items-center justify-center gap-2 py-4"
        >
          <ShoppingCart size={20} />
          <span>장바구니 담기</span>
        </NeumorphicButton>
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
        className="fixed bottom-0 left-0 right-0 bg-white/[0.16] backdrop-blur-[18px] border-t border-white/[0.18] p-6"
      >
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#101318]/55">현재 장바구니 금액</p>
            <p className="text-[16px] text-[#101318]">
              ₩{cartTotal.toLocaleString()}
              <span className="text-[12px] text-[#101318]/45 ml-2">/ 최소주문 ₩15,000</span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
