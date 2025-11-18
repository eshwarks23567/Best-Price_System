// Client-side price store with real-time updates
import { mockProducts, PriceUpdate } from './mock-data';

export class PriceStore {
  private products = mockProducts;
  private updateIntervals: Map<string, NodeJS.Timeout> = new Map();
  private listeners: ((updates: PriceUpdate[]) => void)[] = [];

  constructor() {
    this.startPriceFluctuation();
  }

  private startPriceFluctuation() {
    const FLUCTUATION_INTERVAL = 30 * 1000; // 30 seconds for demo
    // Production: const FLUCTUATION_INTERVAL = 30 * 60 * 1000; // 30 minutes

    setInterval(() => {
      const updates: PriceUpdate[] = [];

      this.products.forEach((product) => {
        const platforms: ('zepto' | 'swiggy' | 'blinkit')[] = ['zepto', 'swiggy', 'blinkit'];

        platforms.forEach((platform) => {
          const oldPrice = product.prices[platform];
          const newPrice = this.fluctuateSinglePrice(oldPrice, product.basePrice);

          if (oldPrice !== newPrice) {
            updates.push({
              productId: product.id,
              platform,
              oldPrice,
              newPrice,
              priceChanged: true,
            });

            product.prices[platform] = newPrice;
          }
        });

        product.lastUpdated = Date.now();
      });

      if (updates.length > 0) {
        this.notifyListeners(updates);
      }
    }, FLUCTUATION_INTERVAL);
  }

  private fluctuateSinglePrice(currentPrice: number, basePrice: number): number {
    const maxDeviation = basePrice * 0.15;
    const smallFluctuation = (Math.random() - 0.5) * 2 * maxDeviation * 0.1;
    const newPrice = currentPrice + smallFluctuation;
    return Math.round(newPrice * 100) / 100;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id: string) {
    return this.products.find((p) => p.id === id);
  }

  getProductsByCategory(category: string) {
    return this.products.filter((p) => p.category === category);
  }

  searchProducts(query: string) {
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  sortByPrice(platform: 'zepto' | 'swiggy' | 'blinkit', ascending = true) {
    return [...this.products].sort((a, b) => {
      const priceA = a.prices[platform];
      const priceB = b.prices[platform];
      return ascending ? priceA - priceB : priceB - priceA;
    });
  }

  subscribe(listener: (updates: PriceUpdate[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(updates: PriceUpdate[]) {
    this.listeners.forEach((listener) => listener(updates));
  }
}

export const priceStore = new PriceStore();
