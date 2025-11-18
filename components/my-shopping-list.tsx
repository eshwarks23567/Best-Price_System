'use client';

import { useState, useMemo } from 'react';
import { priceStore } from '@/lib/price-store';
import { addToCart, calculateCart, CartItem, ShoppingCart } from '@/lib/custom-shopping';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus, Trash2, TrendingDown } from 'lucide-react';

export default function MyShoppingList() {
  const allProducts = useMemo(() => priceStore.getProducts(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(true);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, allProducts]);

  const cart = useMemo(() => calculateCart(cartItems), [cartItems]);

  const handleAddItem = (productId: string) => {
    const cartItem = addToCart(productId, 1);
    if (cartItem) {
      const existingItem = cartItems.find(item => item.productId === productId);
      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCartItems([...cartItems, cartItem]);
      }
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
    } else {
      const cartItem = addToCart(productId, quantity);
      if (cartItem) {
        setCartItems(cartItems.map(item =>
          item.productId === productId ? cartItem : item
        ));
      }
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
  };

  const categories = ['Groceries', 'Sports', 'Essentials', 'Stationery'];

  return (
    <div className="space-y-6">
      {/* Search Section */}
      {showSearch && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Add Items to Your List</h2>
          
          <div className="mb-4 flex gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search for items (e.g., Milk, Butter, Curd)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => handleAddItem(product.id)}
                className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition"
              >
                <div className="text-left">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">₹{Math.min(product.prices.zepto, product.prices.swiggy, product.prices.blinkit)}</p>
                </div>
                <Plus className="w-4 h-4" />
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No products found</p>
          )}
        </Card>
      )}

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Smart Shopping Plan</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? 'Hide' : 'Show'} Search
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <p className="text-sm text-muted-foreground">Smart Total Cost</p>
              <p className="text-2xl font-bold text-green-600">₹{cart.totalCost}</p>
              <p className="text-xs text-muted-foreground mt-1">{cartItems.length} items</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-red-200">
              <p className="text-sm text-muted-foreground">Total Savings</p>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <p className="text-2xl font-bold text-red-600">₹{cart.totalSavings}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">vs average price</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-muted-foreground">Recommendation</p>
              <p className="text-sm font-semibold text-blue-600 mt-2">{cart.recommendations}</p>
            </div>
          </div>

          {/* Platform Breakdown */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <p className="font-semibold mb-3">Where to Shop</p>
            <div className="space-y-2">
              {[
                { name: 'Zepto', amount: cart.platformBreakdown.zepto, color: 'bg-blue-100 text-blue-700' },
                { name: 'Swiggy Instamart', amount: cart.platformBreakdown.swiggy, color: 'bg-orange-100 text-orange-700' },
                { name: 'Blinkit', amount: cart.platformBreakdown.blinkit, color: 'bg-yellow-100 text-yellow-700' },
              ].map(platform => (
                <div key={platform.name} className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${platform.color}`}>
                    {platform.name}
                  </span>
                  <span className="font-semibold">₹{platform.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Cart Items */}
      {cartItems.length > 0 && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Your Items ({cartItems.length})</h2>
          
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item.productId} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>Zepto: ₹{item.prices.zepto}</span>
                    <span>Swiggy: ₹{item.prices.swiggy}</span>
                    <span>Blinkit: ₹{item.prices.blinkit}</span>
                  </div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.bestPlatform === 'zepto' ? 'bg-blue-100 text-blue-700' :
                      item.bestPlatform === 'swiggy' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      Best: {item.bestPlatform.charAt(0).toUpperCase() + item.bestPlatform.slice(1)} - ₹{item.bestPrice}
                    </span>
                    <span className="ml-2 text-xs text-green-600 font-semibold">Save ₹{item.savings}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white rounded-lg p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      className="h-6 w-6 p-0"
                    >
                      −
                    </Button>
                    <span className="w-6 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      className="h-6 w-6 p-0"
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {cartItems.length === 0 && !showSearch && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">Your shopping list is empty</p>
          <Button onClick={() => setShowSearch(true)}>Add Items</Button>
        </Card>
      )}
    </div>
  );
}
