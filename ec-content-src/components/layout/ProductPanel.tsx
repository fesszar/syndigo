import { ChevronLeft, ChevronRight, Pencil, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProductPanelProps {
  currentProduct: string;
  onProductChange?: (product: string) => void;
}

export function ProductPanel({ currentProduct, onProductChange }: ProductPanelProps) {
  return (
    <div className="px-6 py-4 bg-muted/30 border-b border-border">
      <div className="flex items-center justify-between">
        {/* Product Navigation */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Select value={currentProduct} onValueChange={onProductChange}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="costco">Costco (English-US)</SelectItem>
              <SelectItem value="amazon">Amazon (English-US)</SelectItem>
              <SelectItem value="walmart">Walmart (English-US)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Widget Controls */}
        <div className="flex items-center gap-4">
          {/* Icon Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-background border border-border rounded-md px-2 py-1">
              <span className="text-sm font-medium">1</span>
              <button className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
                <Pencil className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>

          {/* Tag */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Tag:</span>
            <span className="text-sm font-medium">Undefined</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>

          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Actions
                <ChevronRight className="w-4 h-4 ml-1 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                Show Widget
              </DropdownMenuItem>
              <DropdownMenuItem>
                <EyeOff className="w-4 h-4 mr-2" />
                Hide Widget
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Edit Widget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Toggle */}
          <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
