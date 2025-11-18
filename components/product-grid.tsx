'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/mock-data';
import ProductCard from './product-card';
import { Button } from '@/components/ui/button';

interface ProductGridProps {
  products: Product[];
  selectedPlatform: 'zepto' | 'swiggy' | 'blinkit';
}

export default function ProductGrid({
  products,
  selectedPlatform,
}: ProductGridProps) {
  const [displayProducts, setDisplayProducts] = useState(products);

  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {displayProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          platform={selectedPlatform}
        />
      ))}
    </div>
  );
}
