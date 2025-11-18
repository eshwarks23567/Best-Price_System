'use client';

import { useMemo } from 'react';
import { priceStore } from '@/lib/price-store';
import { ShoppingAnalyzer } from '@/lib/shopping-analyzer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function BestDeals() {
  const products = useMemo(() => priceStore.getProducts(), []);
  const bestDeals = useMemo(() => ShoppingAnalyzer.getBestDeals(products, 50), [products]);

  // Group by category
  const dealsByCategory = useMemo(() => {
    const grouped: Record<string, typeof bestDeals> = {};
    bestDeals.forEach((deal) => {
      if (!grouped[deal.category]) {
        grouped[deal.category] = [];
      }
      grouped[deal.category].push(deal);
    });
    return grouped;
  }, [bestDeals]);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="p-6 bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
        <h2 className="text-2xl font-bold text-red-700 mb-2">Best Deals Today</h2>
        <p className="text-sm text-muted-foreground">
          Showing the top 50 products with the highest savings across all platforms
        </p>
      </Card>

      {/* Deals by Category */}
      {Object.entries(dealsByCategory).map(([category, deals]) => (
        <Card key={category} className="p-6 border-border">
          <h3 className="text-lg font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deals.map((deal) => (
              <div
                key={deal.productId}
                className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm line-clamp-2">{deal.productName}</h4>
                  </div>
                  <Badge className="ml-2 bg-emerald-500 text-white whitespace-nowrap">
                    {deal.savingsPercentage}% off
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-muted-foreground">Best Price:</span>
                    <span className="text-lg font-bold text-emerald-600">₹{deal.bestPrice}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-muted-foreground">Avg Price:</span>
                    <span className="text-sm line-through text-muted-foreground">₹{deal.averagePrice}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">You Save:</span>
                    <span className="text-sm font-semibold text-red-600">₹{deal.savingsAmount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Buy on:</span>
                  <Badge variant="outline" className="capitalize">
                    {deal.bestPlatform}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Top 5 Deals */}
      <Card className="p-6 border-2 border-red-500 bg-red-50">
        <h3 className="text-lg font-semibold text-red-700 mb-4">Top 5 Biggest Savings</h3>
        <div className="space-y-3">
          {bestDeals.slice(0, 5).map((deal, idx) => (
            <div key={deal.productId} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600 w-8 text-center">#{idx + 1}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm line-clamp-1">{deal.productName}</p>
                <p className="text-xs text-muted-foreground">{deal.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-red-600">Save ₹{deal.savingsAmount}</p>
                <p className="text-xs text-muted-foreground">{deal.savingsPercentage}% off</p>
              </div>
              <Badge className="bg-red-500 text-white capitalize">{deal.bestPlatform}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
