import { useState } from 'react';
import { Plus, Trash2, Filter, Search, ChevronLeft, ChevronRight, Eye, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  sku: string;
  image: string;
  urlCount: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'CAI9379TestProduct',
    sku: '17679345988795',
    image: '/placeholder.svg',
    urlCount: 0,
  },
  {
    id: '2',
    name: 'Chefman 6 Liter Digital Air Fryer+ Rotisserie, Dehydrator, & Convection Oven',
    sku: '847280012345',
    image: '/placeholder.svg',
    urlCount: 3,
  },
  {
    id: '3',
    name: 'Coors Light Beer - 12pk/12 fl oz Cans',
    sku: '00071990000486',
    image: '/placeholder.svg',
    urlCount: 5,
  },
];

interface ProductsSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function ProductsSidebar({ isCollapsed, onToggleCollapse }: ProductsSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en-us');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('1');

  if (isCollapsed) {
    return (
      <div className="w-10 border-r border-border bg-background flex flex-col items-center py-4 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onToggleCollapse}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 min-w-64 max-w-96 border-r border-border bg-background flex flex-col shrink-0 overflow-hidden animate-in slide-in-from-left duration-300">
      {/* Header Actions */}
      <div className="flex items-center justify-between border-b border-border p-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <Plus className="w-3 h-3" />
            Add Products
          </Button>
          <Button variant="ghost" size="sm" className="text-xs gap-1 text-destructive hover:text-destructive">
            <Trash2 className="w-3 h-3" />
            Remove Products
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onToggleCollapse}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Products Header */}
      <div className="p-3 border-b-4 border-primary">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-primary">({mockProducts.length}) Products</span>
        </div>
        
        {/* Filters Row */}
        <div className="flex items-center gap-2 mb-2">
          <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
            <Filter className="w-3 h-3" />
            All Filters
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-7 text-xs pl-7"
            />
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Language</span>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="h-7 text-xs flex-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-us">🇺🇸 English (US)</SelectItem>
              <SelectItem value="de">🇩🇪 German</SelectItem>
              <SelectItem value="fr">🇫🇷 French</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products List */}
      <div className="flex-1 overflow-auto">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className={cn(
              "p-3 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors",
              selectedProductId === product.id && "bg-muted/50"
            )}
            onClick={() => setSelectedProductId(product.id)}
          >
            {/* Product Info */}
            <div className="flex gap-3 mb-2">
              <div className="w-12 h-12 rounded bg-muted flex-shrink-0 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium line-clamp-2">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.sku}</p>
              </div>
            </div>

            {/* Product Actions */}
            <div className="flex items-center gap-3 mb-2">
              <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 text-primary">
                <Eye className="w-3 h-3" />
                View Product
              </Button>
              <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 text-destructive hover:text-destructive">
                <Trash2 className="w-3 h-3" />
                Remove Product
              </Button>
            </div>

            {/* URLs */}
            <div className="text-xs">
              <span className="font-medium">{product.urlCount} URLs</span>
              <span className="text-muted-foreground"> with Enhanced Content Enabled.</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <Button variant="ghost" size="sm" className="h-5 text-xs gap-1 text-primary p-0">
                <Eye className="w-3 h-3" />
                View URLs
              </Button>
              <Button variant="ghost" size="sm" className="h-5 text-xs gap-1 text-primary p-0">
                <Link2 className="w-3 h-3" />
                Add URLs
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
