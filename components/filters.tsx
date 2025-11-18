'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FiltersProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPlatform: 'zepto' | 'swiggy' | 'blinkit';
  onPlatformChange: (platform: 'zepto' | 'swiggy' | 'blinkit') => void;
}

export default function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  selectedPlatform,
  onPlatformChange,
}: FiltersProps) {
  return (
    <div className="space-y-4 mb-6">
      <Input
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() =>
              onCategoryChange(
                selectedCategory === category ? null : category
              )
            }
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {(['zepto', 'swiggy', 'blinkit'] as const).map((platform) => (
          <Button
            key={platform}
            variant={selectedPlatform === platform ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPlatformChange(platform)}
            className="capitalize"
          >
            {platform}
          </Button>
        ))}
      </div>
    </div>
  );
}
