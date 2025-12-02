export interface MenuOption {
  label: string;
  delta: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  vendor: string;
  market: string;
  description?: string;
  options?: MenuOption[];
  isRecommended?: boolean;
  rankAll?: number;
  rankHyundai?: number;
  rankSeongnamJungang?: number;
  rankByVendor?: number;
}

export interface RecommendedSet {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  emoji: string;
  image: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedOption?: string;
  finalPrice: number;
}

export type Page = 'main' | 'market-select' | 'menu-select' | 'menu-detail' | 'order' | 'order-history' | 'about-bud' | 'support';
