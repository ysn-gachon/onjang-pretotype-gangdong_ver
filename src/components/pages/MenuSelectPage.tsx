import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { OrderHistoryButton } from '../OrderHistoryButton';
import { /* ArrowLeft removed - using global back button */ } from 'lucide-react';
import { menuData, recommendedSets, markets } from '../../data/menuData';
import { MenuItem, RecommendedSet, Page } from '../../types/menu';

interface MenuSelectPageProps {
  selectedMarket: string;
  onNavigate: (page: Page, item?: MenuItem | RecommendedSet) => void;
  onBack: () => void;
}

export const MenuSelectPage: React.FC<MenuSelectPageProps> = ({ 
  selectedMarket, 
  onNavigate, 
  onBack 
}) => {
  // If a market was selected, use it; otherwise default to '전체 메뉴'
  const [activeTab] = useState(selectedMarket || '전체 메뉴');

  // Filter and sort menus based on active tab
  let filteredMenus = activeTab === '전체 메뉴' 
    ? menuData 
    : menuData.filter(item => item.market === activeTab);
  
  // Sort by rank based on active tab
  filteredMenus = [...filteredMenus].sort((a, b) => {
    let rankA: number | undefined;
    let rankB: number | undefined;
    
    if (activeTab === '전체 메뉴') {
      rankA = a.rankAll;
      rankB = b.rankAll;
    } else if (activeTab === '현대시��') {
      rankA = a.rankHyundai;
      rankB = b.rankHyundai;
    } else if (activeTab === '성남중앙공설시장') {
      rankA = a.rankSeongnamJungang;
      rankB = b.rankSeongnamJungang;
    }
    
    // Items with rank come first, sorted by rank value
    if (rankA !== undefined && rankB !== undefined) {
      return rankA - rankB;
    }
    if (rankA !== undefined) return -1;
    if (rankB !== undefined) return 1;
    
    // Otherwise maintain original order
    return 0;
  });
  
  // Group by vendor
  const groupedByVendor = filteredMenus.reduce((acc, item) => {
    if (!acc[item.vendor]) {
      acc[item.vendor] = [];
    }
    acc[item.vendor].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  // Sort items within each vendor by rankByVendor
  Object.keys(groupedByVendor).forEach(vendor => {
    groupedByVendor[vendor] = [...groupedByVendor[vendor]].sort((a, b) => {
      const rankA = a.rankByVendor;
      const rankB = b.rankByVendor;
      
      // Items with rankByVendor come first
      if (rankA !== undefined && rankB !== undefined) {
        return rankA - rankB;
      }
      if (rankA !== undefined) return -1;
      if (rankB !== undefined) return 1;
      
      // Otherwise maintain original order
      return 0;
    });
  });

  // Sort vendor groups for 현대시장 tab
  let vendorEntries = Object.entries(groupedByVendor);
  
  if (activeTab === '현대시장') {
    vendorEntries = vendorEntries.sort((a, b) => {
      const vendorA = a[0];
      const vendorB = b[0];
      
      // Define custom order for 현대시장 tab
      const vendorOrder: Record<string, number> = {
        '족발': 1,
        '덕있는집': 2
      };
      
      const orderA = vendorOrder[vendorA];
      const orderB = vendorOrder[vendorB];
      
      // Items with defined order come first
      if (orderA !== undefined && orderB !== undefined) {
        return orderA - orderB;
      }
      if (orderA !== undefined) return -1;
      if (orderB !== undefined) return 1;
      
      // Otherwise maintain original order
      return 0;
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen pb-20"
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#E7E9ED]/40 backdrop-blur-[18px] p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10" />
          <OrderHistoryButton onClick={() => onNavigate('order-history')} />
        </div>

        <div>
          <h2 className="text-[20px] text-[#101318] mb-1">메뉴 선택하기</h2>
          <p className="text-[12px] text-[#101318]/55">
            ※ 다른 점포, 시장끼리 교차주문 가능
          </p>
        </div>
      </div>

      {/* Recommended Sets - Sticky */}
      <div className="sticky top-[140px] z-20 bg-[#E7E9ED]/40 backdrop-blur-[18px] px-6 py-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[16px]">🔥</span>
          <h3 className="text-[16px] text-[#101318]">온장 추천 세트</h3>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {[...recommendedSets].sort((a, b) => a.price - b.price).map((set) => (
            <motion.div
              key={set.id}
              whileHover={{ scale: 1.02 }}
              className="flex-shrink-0 w-[280px]"
            >
              <GlassCard
                hoverable
                onClick={() => onNavigate('menu-detail', set)}
                className="p-4"
              >
                {(() => {
                  if (set.image) {
                    return (
                      <div className="space-y-3">
                        <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                          <img 
                            src={set.image}
                            alt={set.name}
                            className="w-full h-full object-cover rounded-[12px]"
                          />
                        </div>
                        <div className="flex gap-3">
                          <div className="text-[32px]">{set.emoji}</div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[15px] text-[#101318] mb-1">{set.name}</h4>
                            <p className="text-[14px] text-[#38B486]" style={{ fontWeight: 600 }}>
                              ₩{set.price.toLocaleString()}
                            </p>
                            <p className="text-[12px] text-[#101318]/50 mt-1 line-clamp-2">
                              {set.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="flex gap-3">
                      <div className="text-[32px]">{set.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] text-[#101318] mb-1">{set.name}</h4>
                        <p className="text-[14px] text-[#38B486]" style={{ fontWeight: 600 }}>
                          ₩{set.price.toLocaleString()}
                        </p>
                        <p className="text-[12px] text-[#101318]/50 mt-1 line-clamp-2">
                          {set.description}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-6">
        {/* Menu List */}
        <div className="space-y-6">
          {vendorEntries.map(([vendor, items]) => (
            <div key={vendor}>
              <h3 className="text-[16px] text-[#101318] mb-3 px-1">{vendor}</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <GlassCard
                    key={item.id}
                    hoverable
                    onClick={() => onNavigate('menu-detail', item)}
                    className="p-4 group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-[15px] text-[#101318]">{item.name}</h4>
                          {/* Recommended Badge */}
                          {item.isRecommended && (
                            <span 
                              className="px-2.5 py-1 rounded-full text-[12px] transition-all duration-150 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.45)] flex-shrink-0"
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
                        <p className="text-[12px] text-[#101318]/45">{item.market} · {item.vendor}</p>
                      </div>
                      <div className="text-[15px] text-[#101318] ml-3">
                        ₩{item.price.toLocaleString()}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
