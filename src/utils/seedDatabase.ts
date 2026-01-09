
import { supabase } from '../lib/supabase';
import { menuData, recommendedSets } from '../data/menuData';

export const seedDatabase = async () => {
    console.log('Starting seeding...');

    // 1. Extract Unique Markets
    const markets = Array.from(new Set(menuData.map(item => item.market)));
    const marketMap = new Map<string, string>(); // Name -> ID

    for (const marketName of markets) {
        // Check if exists
        let { data: existing } = await supabase.from('markets').select('id').eq('name', marketName).single();

        if (!existing) {
            // Create slug: simple replace spaces
            const slug = marketName.replace(/\s+/g, '-').toLowerCase();
            const { data: created, error } = await supabase.from('markets').insert({
                name: marketName,
                slug: slug
            }).select('id').single();

            if (error) {
                console.error('Error creating market:', marketName, error);
                continue;
            }
            if (created) existing = created;
        }

        if (existing) {
            marketMap.set(marketName, existing.id);
        }
    }

    // 2. Extract Unique Vendors
    // Vendor is unique by name AND market (though mostly unique by name in data)
    const vendors = Array.from(new Set(menuData.map(item => JSON.stringify({ name: item.vendor, market: item.market }))));
    const vendorMap = new Map<string, string>(); // "Market:Vendor" -> ID

    for (const vendorJson of vendors) {
        const { name: vendorName, market: marketName } = JSON.parse(vendorJson);
        const marketId = marketMap.get(marketName);

        if (!marketId) continue;

        let { data: existing } = await supabase.from('vendors').select('id').eq('name', vendorName).eq('market_id', marketId).single();

        if (!existing) {
            const { data: created, error } = await supabase.from('vendors').insert({
                name: vendorName,
                market_id: marketId
            }).select('id').single();

            if (error) {
                console.error('Error creating vendor:', vendorName, error);
                continue;
            }
            if (created) existing = created;
        }

        if (existing) {
            vendorMap.set(`${marketName}:${vendorName}`, existing.id);
        }
    }

    // 3. Insert Menu Items
    for (const item of menuData) {
        const vendorId = vendorMap.get(`${item.market}:${item.vendor}`);

        // Check if exists
        const { data: existing } = await supabase.from('menu_items').select('id').eq('id', item.id).single();

        if (!existing) {
            const { error } = await supabase.from('menu_items').insert({
                id: item.id, // Keep existing string ID
                vendor_id: vendorId,
                name: item.name,
                price: item.price,
                image: item.image,
                description: item.description,
                options: item.options,
                is_recommended: item.isRecommended,
                category: 'general' // Default
            });

            if (error) console.error('Error inserting item:', item.name, error);
        }
    }

    // 4. Insert Recommended Sets
    for (const set of recommendedSets) {
        const { data: existing } = await supabase.from('recommended_sets').select('id').eq('id', set.id).single();

        if (!existing) {
            const { error } = await supabase.from('recommended_sets').insert({
                id: set.id,
                name: set.name,
                price: set.price,
                description: set.description,
                items: JSON.stringify(set.items), // Store as JSON array
                emoji: set.emoji,
                image: set.image
            });

            if (error) console.error('Error inserting set:', set.name, error);
        }
    }

    console.log('Seeding completed!');
    alert('데이터베이스 시딩이 완료되었습니다.');
};
