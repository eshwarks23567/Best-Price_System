import { priceStore } from './price-store';

export interface CartItem {
  productId: string;
  name: string;
  category: string;
  quantity: number;
  prices: {
    zepto: number;
    swiggy: number;
    blinkit: number;
  };
  bestPrice: number;
  bestPlatform: 'zepto' | 'swiggy' | 'blinkit';
  savings: number;
}

export interface ShoppingCart {
  items: CartItem[];
  totalCost: number;
  totalSavings: number;
  platformBreakdown: {
    zepto: number;
    swiggy: number;
    blinkit: number;
  };
  recommendations: string;
}

export function addToCart(productId: string, quantity: number = 1): CartItem | null {
  const products = priceStore.getProducts();
  const product = products.find(p => p.id === productId);
  
  if (!product) return null;

  const bestPrice = Math.min(product.prices.zepto, product.prices.swiggy, product.prices.blinkit);
  const bestPlatform = Object.keys(product.prices).find(
    key => product.prices[key as keyof typeof product.prices] === bestPrice
  ) as 'zepto' | 'swiggy' | 'blinkit';
  
  const avgPrice = (product.prices.zepto + product.prices.swiggy + product.prices.blinkit) / 3;
  const savings = Math.round((avgPrice - bestPrice) * quantity * 100) / 100;

  return {
    productId: product.id,
    name: product.name,
    category: product.category,
    quantity,
    prices: product.prices,
    bestPrice,
    bestPlatform,
    savings,
  };
}

export function calculateCart(items: CartItem[]): ShoppingCart {
  const platformBreakdown = { zepto: 0, swiggy: 0, blinkit: 0 };
  let totalCost = 0;
  let totalSavings = 0;

  items.forEach(item => {
    const itemCost = item.bestPrice * item.quantity;
    totalCost += itemCost;
    totalSavings += item.savings;
    platformBreakdown[item.bestPlatform] += itemCost;
  });

  const recommendations = generateRecommendations(platformBreakdown, items);

  return {
    items,
    totalCost: Math.round(totalCost * 100) / 100,
    totalSavings: Math.round(totalSavings * 100) / 100,
    platformBreakdown: {
      zepto: Math.round(platformBreakdown.zepto * 100) / 100,
      swiggy: Math.round(platformBreakdown.swiggy * 100) / 100,
      blinkit: Math.round(platformBreakdown.blinkit * 100) / 100,
    },
    recommendations,
  };
}

function generateRecommendations(breakdown: Record<string, number>, items: CartItem[]): string {
  const entries = Object.entries(breakdown).sort((a, b) => b[1] - a[1]);
  
  if (entries[0][1] === 0) {
    return 'Add items to your cart to get recommendations.';
  }

  const [topPlatform, topAmount] = entries[0];
  const secondAmount = entries[1][1];
  
  if (topAmount === 0) return 'No items in your cart.';
  
  const percentage = Math.round((topAmount / (topAmount + secondAmount)) * 100) || 100;
  
  return `Shop ${percentage}% of your items from ${topPlatform.charAt(0).toUpperCase() + topPlatform.slice(1)} for best prices!`;
}
