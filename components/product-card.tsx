'use client';

import { useState, useEffect } from 'react';
import { Product, PriceUpdate } from '@/lib/mock-data';
import { priceStore } from '@/lib/price-store';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  platform: 'zepto' | 'swiggy' | 'blinkit';
}

export default function ProductCard({ product: initialProduct, platform }: ProductCardProps) {
  const [product, setProduct] = useState(initialProduct);
  const [priceHistory, setPriceHistory] = useState<{
    [key: string]: number;
  }>({
    zepto: initialProduct.prices.zepto,
    swiggy: initialProduct.prices.swiggy,
    blinkit: initialProduct.prices.blinkit,
  });

  useEffect(() => {
    const unsubscribe = priceStore.subscribe((updates: PriceUpdate[]) => {
      updates.forEach((update) => {
        if (update.productId === product.id) {
          setProduct((prev) => ({
            ...prev,
            prices: {
              ...prev.prices,
              [update.platform]: update.newPrice,
            },
          }));

          setPriceHistory((prev) => ({
            ...prev,
            [update.platform]: update.newPrice,
          }));
        }
      });
    });

    return () => unsubscribe();
  }, [product.id]);

  const currentPrice = product.prices[platform];
  const priceChanged = priceHistory[platform] !== currentPrice;
  const priceIncreased = currentPrice > (priceHistory[platform] || 0);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Groceries':
        return 'bg-green-100 text-green-800';
      case 'Sports':
        return 'bg-blue-100 text-blue-800';
      case 'Essentials':
        return 'bg-purple-100 text-purple-800';
      case 'Stationery':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-32 object-cover rounded-md mb-3"
        />

        <div className="mb-2">
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${getCategoryColor(
              product.category
            )}`}
          >
            {product.category}
          </span>
        </div>

        <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.name}</h3>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            ₹{currentPrice.toFixed(2)}
          </span>
          {priceChanged && (
            <div
              className={`flex items-center gap-1 text-xs font-semibold ${
                priceIncreased ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {priceIncreased ? (
                <ArrowUp size={14} />
              ) : (
                <ArrowDown size={14} />
              )}
              {Math.abs(currentPrice - (priceHistory[platform] || 0)).toFixed(2)}
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground mt-2">
          Base: ₹{product.basePrice.toFixed(2)}
        </div>

      </div>
    </Card>
  );
}
