// Smart shopping plan analyzer
import { Product } from './mock-data';

export interface ShoppingRecommendation {
  productId: string;
  productName: string;
  category: string;
  bestPlatform: 'zepto' | 'swiggy' | 'blinkit';
  bestPrice: number;
  alternatives: {
    platform: 'zepto' | 'swiggy' | 'blinkit';
    price: number;
    savings?: number;
  }[];
  averagePrice: number;
  savingsPercentage: number;
}

export interface ShoppingPlan {
  totalItems: number;
  recommendations: ShoppingRecommendation[];
  platformTotals: {
    zepto: number;
    swiggy: number;
    blinkit: number;
  };
  optimalCost: number;
  totalSavings: number;
  savingsPercentage: number;
}

export interface BestDeal {
  productId: string;
  productName: string;
  category: string;
  bestPlatform: 'zepto' | 'swiggy' | 'blinkit';
  bestPrice: number;
  averagePrice: number;
  savingsAmount: number;
  savingsPercentage: number;
}

export class ShoppingAnalyzer {
  static generateSmartPlan(products: Product[]): ShoppingPlan {
    const recommendations: ShoppingRecommendation[] = products.map((product) => {
      const platforms: ('zepto' | 'swiggy' | 'blinkit')[] = ['zepto', 'swiggy', 'blinkit'];
      const prices = platforms.map((p) => ({
        platform: p,
        price: product.prices[p],
      }));

      const sortedPrices = [...prices].sort((a, b) => a.price - b.price);
      const bestPlatform = sortedPrices[0].platform;
      const bestPrice = sortedPrices[0].price;
      const averagePrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;

      return {
        productId: product.id,
        productName: product.name,
        category: product.category,
        bestPlatform,
        bestPrice,
        alternatives: sortedPrices.map((p) => ({
          platform: p.platform,
          price: p.price,
          savings: p.price - bestPrice,
        })),
        averagePrice: Math.round(averagePrice * 100) / 100,
        savingsPercentage: Math.round(((averagePrice - bestPrice) / averagePrice) * 100),
      };
    });

    // Calculate totals per platform using best prices
    const platformTotals = {
      zepto: 0,
      swiggy: 0,
      blinkit: 0,
    };

    recommendations.forEach((rec) => {
      const platforms: ('zepto' | 'swiggy' | 'blinkit')[] = ['zepto', 'swiggy', 'blinkit'];
      platforms.forEach((p) => {
        const product = products.find((prod) => prod.id === rec.productId);
        if (product) {
          platformTotals[p] += product.prices[p];
        }
      });
    });

    const optimalCost = recommendations.reduce((sum, rec) => sum + rec.bestPrice, 0);
    const averageTotal =
      (platformTotals.zepto + platformTotals.swiggy + platformTotals.blinkit) / 3;
    const totalSavings = Math.round((averageTotal - optimalCost) * 100) / 100;
    const savingsPercentage = Math.round(((averageTotal - optimalCost) / averageTotal) * 100);

    return {
      totalItems: products.length,
      recommendations,
      platformTotals: {
        zepto: Math.round(platformTotals.zepto * 100) / 100,
        swiggy: Math.round(platformTotals.swiggy * 100) / 100,
        blinkit: Math.round(platformTotals.blinkit * 100) / 100,
      },
      optimalCost: Math.round(optimalCost * 100) / 100,
      totalSavings,
      savingsPercentage,
    };
  }

  static getBestDeals(products: Product[], limit: number = 20): BestDeal[] {
    const deals = products
      .map((product) => {
        const platforms: ('zepto' | 'swiggy' | 'blinkit')[] = ['zepto', 'swiggy', 'blinkit'];
        const prices = platforms.map((p) => product.prices[p]);

        const bestPrice = Math.min(...prices);
        const averagePrice = prices.reduce((a, b) => a + b) / prices.length;
        const savingsAmount = Math.round((averagePrice - bestPrice) * 100) / 100;
        const savingsPercentage = Math.round(((averagePrice - bestPrice) / averagePrice) * 100);

        return {
          productId: product.id,
          productName: product.name,
          category: product.category,
          bestPlatform: (['zepto', 'swiggy', 'blinkit'] as const)[
            prices.indexOf(bestPrice)
          ],
          bestPrice: Math.round(bestPrice * 100) / 100,
          averagePrice: Math.round(averagePrice * 100) / 100,
          savingsAmount,
          savingsPercentage,
        };
      })
      .sort((a, b) => b.savingsPercentage - a.savingsPercentage)
      .slice(0, limit);

    return deals;
  }

  static getPlanByCategory(products: Product[], category: string): ShoppingPlan {
    const filtered = products.filter((p) => p.category === category);
    return this.generateSmartPlan(filtered);
  }
}
