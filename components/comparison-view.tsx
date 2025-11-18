'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ComparisonViewProps {
  products: Product[];
}

export default function ComparisonView({ products }: ComparisonViewProps) {
  const [sortBy, setSortBy] = useState<'zepto' | 'swiggy' | 'blinkit'>('zepto');

  const sortedProducts = useMemo(() => {
    return [...products].sort(
      (a, b) => a.prices[sortBy] - b.prices[sortBy]
    );
  }, [products, sortBy]);

  const cheapest = useMemo(() => {
    return products.map((product) => {
      const platforms = [
        { name: 'zepto', price: product.prices.zepto },
        { name: 'swiggy', price: product.prices.swiggy },
        { name: 'blinkit', price: product.prices.blinkit },
      ];
      const cheapestPlatform = platforms.reduce((prev, current) =>
        prev.price < current.price ? prev : current
      );
      return { productId: product.id, cheapestPlatform: cheapestPlatform.name };
    });
  }, [products]);

  const topDeals = useMemo(() => {
    return products
      .map((product) => {
        const prices = [
          product.prices.zepto,
          product.prices.swiggy,
          product.prices.blinkit,
        ];
        const max = Math.max(...prices);
        const min = Math.min(...prices);
        const savings = max - min;
        return { product, savings };
      })
      .sort((a, b) => b.savings - a.savings)
      .slice(0, 5);
  }, [products]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {['zepto', 'swiggy', 'blinkit'].map((platform) => {
          const avgPrice =
            products.reduce(
              (sum, p) => sum + p.prices[platform as keyof typeof p.prices],
              0
            ) / products.length;
          return (
            <Card key={platform} className="p-4">
              <h3 className="font-semibold text-sm mb-2 capitalize">{platform}</h3>
              <p className="text-2xl font-bold text-primary">
                ₹{avgPrice.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">Avg Price</p>
            </Card>
          );
        })}
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Top Deals (Highest Savings)</h3>
        <div className="space-y-3">
          {topDeals.map(({ product, savings }) => (
            <div
              key={product.id}
              className="flex justify-between items-center text-sm pb-3 border-b last:border-b-0"
            >
              <div className="flex-1">
                <p className="font-medium line-clamp-1">{product.name}</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-semibold">
                  Save ₹{savings.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
