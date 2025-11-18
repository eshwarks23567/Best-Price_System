'use client';

import { useState, useMemo, useEffect } from 'react';
import { priceStore } from '@/lib/price-store';
import ProductGrid from '@/components/product-grid';
import ComparisonView from '@/components/comparison-view';
import ShoppingPlan from '@/components/shopping-plan';
import BestDeals from '@/components/best-deals';
import MyShoppingList from '@/components/my-shopping-list';
import Filters from '@/components/filters';
import PriceUpdateNotification from '@/components/price-update-notification';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Home() {
  const allProducts = useMemo(() => priceStore.getProducts(), []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'zepto' | 'swiggy' | 'blinkit'>('zepto');
  const [viewMode, setViewMode] = useState<'grid' | 'comparison' | 'shopping-plan' | 'best-deals' | 'my-shopping'>('grid');
  const [products, setProducts] = useState(allProducts);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allProducts.map((p) => p.category)));
    return uniqueCategories.sort();
  }, [allProducts]);

  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setProducts(filtered);
  }, [selectedCategory, searchQuery, allProducts]);

  return (
    <main className="min-h-screen bg-background">
      <PriceUpdateNotification />

      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Price Comparison Hub</h1>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                size="sm"
              >
                Grid View
              </Button>
              <Button
                variant={viewMode === 'comparison' ? 'default' : 'outline'}
                onClick={() => setViewMode('comparison')}
                size="sm"
              >
                Comparison
              </Button>
              <Button
                variant={viewMode === 'my-shopping' ? 'default' : 'outline'}
                onClick={() => setViewMode('my-shopping')}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                My Shopping
              </Button>
              <Button
                variant={viewMode === 'shopping-plan' ? 'default' : 'outline'}
                onClick={() => setViewMode('shopping-plan')}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Smart Plan
              </Button>
              <Button
                variant={viewMode === 'best-deals' ? 'default' : 'outline'}
                onClick={() => setViewMode('best-deals')}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Best Deals
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {allProducts.length}+ products • Prices update every 30 seconds (demo) • Real-time comparison
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {viewMode === 'grid' ? (
          <>
            <Filters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
            />
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {products.length} products on{' '}
                <span className="font-semibold capitalize">{selectedPlatform}</span>
              </p>
            </div>
            <ProductGrid
              products={products}
              selectedPlatform={selectedPlatform}
            />
          </>
        ) : viewMode === 'comparison' ? (
          <ComparisonView products={allProducts} />
        ) : viewMode === 'my-shopping' ? (
          <MyShoppingList />
        ) : viewMode === 'shopping-plan' ? (
          <ShoppingPlan />
        ) : (
          <BestDeals />
        )}
      </div>
    </main>
  );
}
