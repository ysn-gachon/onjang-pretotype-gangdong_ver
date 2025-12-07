import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MainPage } from './components/pages/MainPage';
import { MarketSelectPage } from './components/pages/MarketSelectPage';
import { MenuSelectPage } from './components/pages/MenuSelectPage';
import { MenuDetailPage } from './components/pages/MenuDetailPage';
import { OrderPage } from './components/pages/OrderPage';
import { OrderHistoryPage } from './components/pages/OrderHistoryPage';
import { AboutBudPage } from './components/pages/AboutBudPage';
import { SupportPage } from './components/pages/SupportPage';
import { NeumorphicButton } from './components/NeumorphicButton';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { MenuItem, RecommendedSet, CartItem, Page } from './types/menu';
import { useGA, trackPageView, trackEvent } from './hooks/useGA';

interface PageHistory {
  page: Page;
  market?: string;
  item?: MenuItem | RecommendedSet;
}

const isRecommendedSet = (item: MenuItem | RecommendedSet): item is RecommendedSet => {
  return 'emoji' in item;
};

interface Order {
  cart: CartItem[];
  total: number;
  date: string;
  paymentMethod?: string;
  isFakedoor?: boolean;
  compensationCode?: string;
}

export default function App() {
  useGA();

  const [history, setHistory] = useState<PageHistory[]>([{ page: 'main' }]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [authState, setAuthState] = useState<'none' | 'guest' | 'google'>('none');

  const currentPage = history[history.length - 1];

  React.useEffect(() => {
    let path = `/${currentPage.page}`;
    if (currentPage.market) path += `/${currentPage.market}`;
    if (currentPage.item) path += `/${currentPage.item.name}`;
    trackPageView(path);
  }, [currentPage]);

  const navigate = (page: Page, data?: string | MenuItem | RecommendedSet) => {
    const newPage: PageHistory = { page };
    
    if (typeof data === 'string') {
      newPage.market = data;
    } else if (data) {
      newPage.item = data;
    }
    
    // Only preserve current market if no new market is specified
    if (page === 'menu-select' && currentPage.market && !newPage.market) {
      newPage.market = currentPage.market;
    }

    setHistory([...history, newPage]);
  };

  const goBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    }
  };

  const addToCart = (item: MenuItem | RecommendedSet, quantity: number, selectedOption?: string) => {
    // Convert RecommendedSet to MenuItem format for cart
    const menuItem: MenuItem = isRecommendedSet(item) 
      ? {
          id: item.id,
          name: item.name,
          price: item.price,
          vendor: '온장 추천',
          market: '추천 세트',
          description: item.description
        }
      : item;

    // Calculate final price based on option
    let finalPrice = menuItem.price;
    if (selectedOption && menuItem.options) {
      const option = menuItem.options.find(opt => opt.label === selectedOption);
      if (option) {
        finalPrice = menuItem.price + option.delta;
      }
    }

    setCart([...cart, { menuItem, quantity, selectedOption, finalPrice }]);
    trackEvent('Cart', 'Add', `${item.name} (${quantity})`);
  };

  const clearCart = () => {
    setCart([]);
  };

  const completeOrder = (paymentMethod?: string) => {
    // Save order to history
    const newOrder: Order = {
      cart: [...cart],
      total: cartTotal,
      date: new Date().toLocaleString('ko-KR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      paymentMethod
    };
    setOrders([newOrder, ...orders]);
    clearCart();
  };

  // Fakedoor: when user attempts to order in demo, record a fakedoor event
  const triggerFakedoor = (compensationCode?: string) => {
    const newOrder: Order = {
      cart: [...cart],
      total: cartTotal,
      date: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      paymentMethod: '보상 쿠폰',
      isFakedoor: true,
      compensationCode
    };

    setOrders([newOrder, ...orders]);
    clearCart();
  };

  const handleGuestLogin = () => {
    setAuthState('guest');
    navigate('market-select');
  };

  const handleGoogleLogin = () => {
    setAuthState('google');
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
  const deliveryFee = 1900;
  const minOrderAmount = 15000;
  const canOrder = cartTotal >= minOrderAmount;

  return (
    <div className="min-h-screen bg-[#E7E9ED] relative overflow-x-hidden">
      <div className="max-w-[480px] mx-auto relative">
        {/* Global fixed back button */}
        {history.length > 1 && (
          <button
            onClick={goBack}
            aria-label="뒤로가기"
            className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white/[0.14] backdrop-blur-[12px] border border-white/[0.18]"
            style={{ boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }}
          >
            <ArrowLeft size={20} className="text-[#101318]" />
          </button>
        )}
        <AnimatePresence mode="wait">
          {currentPage.page === 'main' && (
            <MainPage 
              key="main" 
              onNavigate={navigate} 
              onGuestLogin={handleGuestLogin}
              onGoogleLogin={handleGoogleLogin}
              authState={authState}
            />
          )}

          {currentPage.page === 'market-select' && (
            <MarketSelectPage 
              key="market-select" 
              onNavigate={navigate} 
              onBack={goBack}
            />
          )}

          {currentPage.page === 'menu-select' && (
            <MenuSelectPage 
              key="menu-select"
              selectedMarket={currentPage.market || '전체 메뉴'}
              onNavigate={navigate}
              onBack={goBack}
            />
          )}

          {currentPage.page === 'menu-detail' && currentPage.item && (
            <MenuDetailPage 
              key="menu-detail"
              item={currentPage.item}
              onBack={goBack}
              onAddToCart={addToCart}
              cartTotal={cartTotal}
              onNavigateToHistory={() => navigate('order-history')}
            />
          )}

          {currentPage.page === 'order' && (
            <OrderPage 
              key="order"
              cart={cart}
              cartTotal={cartTotal}
              onBack={goBack}
              onClearCart={completeOrder}
              onFakedoor={triggerFakedoor}
              onNavigateToHistory={() => navigate('order-history')}
              authState={authState}
              onGoogleLogin={handleGoogleLogin}
            />
          )}

          {currentPage.page === 'order-history' && (
            <OrderHistoryPage 
              key="order-history"
              orders={orders}
              onBack={goBack}
              onNavigateToSupport={() => navigate('support')}
            />
          )}

          {currentPage.page === 'about-bud' && (
            <AboutBudPage 
              key="about-bud"
              onBack={goBack}
            />
          )}

          {currentPage.page === 'support' && (
            <SupportPage 
              key="support"
              onBack={goBack}
            />
          )}
        </AnimatePresence>

        {/* Bottom Cart Bar */}
        <AnimatePresence>
          {cart.length > 0 && currentPage.page !== 'order' && currentPage.page !== 'menu-detail' && currentPage.page !== 'order-history' && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="fixed bottom-0 left-0 right-0 z-40"
            >
              <div className="max-w-[480px] mx-auto bg-white/[0.16] backdrop-blur-[18px] border-t border-white/[0.18] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[12px] text-[#101318]/55 mb-1">
                      {canOrder ? '배달비 별도 (+₩2,000)' : `최소 주문금액까지 ₩${(minOrderAmount - cartTotal).toLocaleString()}`}
                    </p>
                    <p className="text-[16px] text-[#101318]">
                      상품 <span className="text-[#38B486]" style={{ fontWeight: 600 }}>
                        ₩{cartTotal.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <NeumorphicButton
                    onClick={() => navigate('order')}
                    disabled={!canOrder}
                    variant="glass"
                    className="flex items-center gap-2 px-6"
                  >
                    <ShoppingCart size={18} />
                    <span>주문하기</span>
                  </NeumorphicButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
