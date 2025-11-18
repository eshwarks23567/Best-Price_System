'use client';

import { useMemo } from 'react';
import { priceStore } from '@/lib/price-store';
import { ShoppingAnalyzer } from '@/lib/shopping-analyzer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ShoppingPlan() {
  const products = useMemo(() => priceStore.getProducts(), []);
  const shoppingPlan = useMemo(() => ShoppingAnalyzer.generateSmartPlan(products), [products]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <p className="text-sm text-muted-foreground mb-1">Total Items</p>
          <p className="text-3xl font-bold text-emerald-700">{shoppingPlan.totalItems}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <p className="text-sm text-muted-foreground mb-1">Optimal Cost</p>
          <p className="text-3xl font-bold text-blue-700">₹{Math.round(shoppingPlan.optimalCost)}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <p className="text-sm text-muted-foreground mb-1">Total Savings</p>
          <div>
            <p className="text-3xl font-bold text-orange-700">₹{Math.round(shoppingPlan.totalSavings)}</p>
            <p className="text-sm text-orange-600 mt-1">{shoppingPlan.savingsPercentage}% off</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <p className="text-sm text-muted-foreground mb-1">Best Platform Mix</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <Badge className="bg-orange-500">Zepto</Badge>
            <Badge className="bg-green-600">Swiggy</Badge>
            <Badge className="bg-red-500">Blinkit</Badge>
          </div>
        </Card>
      </div>

      {/* Platform Comparison */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold mb-4">Platform Totals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border rounded-lg p-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Zepto Total</p>
            <p className="text-2xl font-bold">₹{Math.round(shoppingPlan.platformTotals.zepto)}</p>
            <p className="text-xs text-red-600 mt-2">
              +₹{Math.round(shoppingPlan.platformTotals.zepto - shoppingPlan.optimalCost)} vs optimal
            </p>
          </div>

          <div className="border border-border rounded-lg p-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Swiggy Total</p>
            <p className="text-2xl font-bold">₹{Math.round(shoppingPlan.platformTotals.swiggy)}</p>
            <p className="text-xs text-red-600 mt-2">
              +₹{Math.round(shoppingPlan.platformTotals.swiggy - shoppingPlan.optimalCost)} vs optimal
            </p>
          </div>

          <div className="border border-border rounded-lg p-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Blinkit Total</p>
            <p className="text-2xl font-bold">₹{Math.round(shoppingPlan.platformTotals.blinkit)}</p>
            <p className="text-xs text-red-600 mt-2">
              +₹{Math.round(shoppingPlan.platformTotals.blinkit - shoppingPlan.optimalCost)} vs optimal
            </p>
          </div>
        </div>
      </Card>

      {/* Detailed Recommendations */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold mb-4">Top 20 Recommendations</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {shoppingPlan.recommendations.slice(0, 20).map((rec) => (
            <div key={rec.productId} className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <div className="flex-1">
                <p className="font-medium text-sm">{rec.productName}</p>
                <p className="text-xs text-muted-foreground">{rec.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-emerald-600">₹{rec.bestPrice}</p>
                  <p className="text-xs text-muted-foreground line-through">₹{rec.averagePrice}</p>
                </div>
                <Badge variant="outline" className="capitalize text-xs">
                  {rec.bestPlatform}
                </Badge>
                <Badge className="bg-emerald-500 text-white text-xs">{rec.savingsPercentage}% off</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* All Recommendations */}
      <Card className="p-6 border-border">
        <h3 className="text-lg font-semibold mb-4">All {shoppingPlan.totalItems} Recommendations</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Product</th>
                <th className="px-4 py-2 text-left font-semibold">Category</th>
                <th className="px-4 py-2 text-right font-semibold">Best Price</th>
                <th className="px-4 py-2 text-center font-semibold">Platform</th>
                <th className="px-4 py-2 text-right font-semibold">Avg Price</th>
                <th className="px-4 py-2 text-right font-semibold">Savings</th>
              </tr>
            </thead>
            <tbody>
              {shoppingPlan.recommendations.map((rec) => (
                <tr key={rec.productId} className="border-b border-border hover:bg-muted/50">
                  <td className="px-4 py-2">{rec.productName}</td>
                  <td className="px-4 py-2 text-muted-foreground">{rec.category}</td>
                  <td className="px-4 py-2 text-right font-semibold">₹{rec.bestPrice}</td>
                  <td className="px-4 py-2 text-center">
                    <Badge variant="outline" className="capitalize">
                      {rec.bestPlatform}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-right text-muted-foreground">₹{rec.averagePrice}</td>
                  <td className="px-4 py-2 text-right">
                    <span className="text-emerald-600 font-semibold">{rec.savingsPercentage}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
