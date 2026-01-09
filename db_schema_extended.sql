-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Markets Table
CREATE TABLE IF NOT EXISTS markets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Vendors Table
CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  market_id UUID REFERENCES markets(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  contact_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY, -- Using string ID to match frontend 'amsa-hotba-1'
  vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  image TEXT,
  description TEXT,
  options JSONB, -- Array of option objects
  is_recommended BOOLEAN DEFAULT false,
  category TEXT,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Recommended Sets Table
CREATE TABLE IF NOT EXISTS recommended_sets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  items JSONB, -- Array of item names or IDs
  emoji TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Profiles Table (Linked to Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer', -- 'customer', 'admin', 'rider'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_session_id TEXT, -- For tracking guest orders if needed
  total_amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  payment_method TEXT,
  is_fakedoor BOOLEAN DEFAULT false,
  compensation_code TEXT,
  delivery_address TEXT,
  contact_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id TEXT REFERENCES menu_items(id) ON DELETE SET NULL,
  menu_item_name TEXT NOT NULL, -- Snapshot of name
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL, -- Snapshot of price
  selected_options JSONB, -- Snapshot of options selected
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommended_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Public Read Access for Catalog
CREATE POLICY "Public read markets" ON markets FOR SELECT USING (true);
CREATE POLICY "Public read vendors" ON vendors FOR SELECT USING (true);
CREATE POLICY "Public read menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read recommended_sets" ON recommended_sets FOR SELECT USING (true);

-- Order Submission (Allow Insert for everyone)
CREATE POLICY "Anyone can insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can insert order_items" ON order_items FOR INSERT WITH CHECK (true);

-- Read Own Orders
CREATE POLICY "Users can read own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
-- (Optional: Guests reading orders requires session logic, skipping for simple auth-based RLS)

-- Profiles
CREATE POLICY "Users can read/update own profile" ON profiles FOR ALL USING (auth.uid() = id);
