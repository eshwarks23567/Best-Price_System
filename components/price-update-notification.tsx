'use client';

import { useState, useEffect } from 'react';
import { priceStore } from '@/lib/price-store';
import { PriceUpdate } from '@/lib/mock-data';
import { AlertCircle } from 'lucide-react';

export default function PriceUpdateNotification() {
  const [updates, setUpdates] = useState<PriceUpdate[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const unsubscribe = priceStore.subscribe((priceUpdates) => {
      setUpdates(priceUpdates);
      setShowNotification(true);

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      return () => clearTimeout(timer);
    });

    return () => unsubscribe();
  }, []);

  if (!showNotification || updates.length === 0) return null;

  const upCount = updates.filter((u) => u.newPrice > u.oldPrice).length;
  const downCount = updates.filter((u) => u.newPrice < u.oldPrice).length;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900">Prices Updated!</h3>
            <p className="text-sm text-blue-800 mt-1">
              {updates.length} prices changed
              {upCount > 0 && <span className="text-red-600"> ↑ {upCount} up</span>}
              {downCount > 0 && <span className="text-green-600"> ↓ {downCount} down</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
