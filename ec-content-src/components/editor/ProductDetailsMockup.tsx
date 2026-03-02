import { Widget } from '@/types/widget';
import { Star, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ProductDetailsMockupProps {
  heroWidgets: Widget[];
  inlineWidgets: Widget[];
  selectedWidgetId: string | null;
  onSelectWidget: (id: string) => void;
  heroView: 'hotspots' | 'toolbar';
}

export function ProductDetailsMockup({
  heroWidgets,
  inlineWidgets,
  selectedWidgetId,
  onSelectWidget,
  heroView,
}: ProductDetailsMockupProps) {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Above the Fold Content (Hero) Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-primary">Above the Fold Content (Hero)</h2>
        
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="grid grid-cols-2 gap-0">
            {/* Product Image with Hotspots */}
            <div className="relative p-4 border-r border-border flex flex-col">
              {/* Main product image area */}
              <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Mock product bag image */}
                <div className="w-3/4 h-4/5 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg shadow-lg relative">
                  {/* Simple product shape */}
                  <div className="absolute inset-4 bg-gradient-to-b from-white to-gray-50 rounded-md shadow-inner" />
                </div>
                
                {/* Hotspot markers for hero widgets */}
                {heroView === 'hotspots' && heroWidgets.map((widget, index) => {
                  // Position hotspots in a pattern
                  const positions = [
                    { x: 35, y: 25 },
                    { x: 65, y: 20 },
                    { x: 70, y: 45 },
                    { x: 40, y: 55 },
                    { x: 55, y: 75 },
                  ];
                  const pos = positions[index % positions.length];
                  
                  return (
                    <button
                      key={widget.id}
                      data-widget-id={widget.id}
                      onClick={() => onSelectWidget(widget.id)}
                      className={cn(
                        "absolute w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold shadow-lg transition-transform hover:scale-110",
                        selectedWidgetId === widget.id && "ring-2 ring-white ring-offset-2"
                      )}
                      style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                    />
                  );
                })}
              </div>
              
            </div>
            
            {/* Product Details */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-muted-foreground">Sample Brand Name</p>
              <h1 className="text-xl font-semibold text-muted-foreground/80">
                Sample Product Name That Can Be Long and Descriptive
              </h1>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Item 1234567</span>
                <span>|</span>
                <span>Model 12345678890</span>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={cn("w-4 h-4", i <= 4 ? "fill-amber-400 text-amber-400" : "fill-amber-400/50 text-amber-400/50")} />
                ))}
                <span className="text-sm font-medium ml-1">4.9</span>
                <span className="text-xs text-muted-foreground">(1,234 reviews)</span>
              </div>
              
              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-muted-foreground">$</span>
                <span className="text-4xl font-light text-muted-foreground/70">999.99</span>
              </div>
              
              {/* Size options */}
              <div className="flex gap-2">
                {['Size Option', 'Size Option', 'Size Option'].map((label, i) => (
                  <button key={i} className="px-4 py-2 text-xs border border-border rounded bg-muted/30 text-muted-foreground">
                    {label}
                  </button>
                ))}
              </div>
              
              {/* Add to Cart */}
              <button className="w-full py-3 bg-blue-400/70 text-white rounded font-medium text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-dashed border-border" />

      {/* Below the Fold Content (In-Line) Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-primary">Below the Fold Content (In-Line)</h2>
        
        <div className="bg-card rounded-xl border border-border overflow-hidden min-h-[300px]">
          {inlineWidgets.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p className="text-sm">Inline content widgets will appear here</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {inlineWidgets.map((widget) => (
                <button
                  key={widget.id}
                  data-widget-id={widget.id}
                  onClick={() => onSelectWidget(widget.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-colors",
                    selectedWidgetId === widget.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{widget.title}</p>
                      <p className="text-xs text-muted-foreground">{widget.type}</p>
                    </div>
                    {!widget.isActive && (
                      <Badge variant="secondary" className="ml-auto">Inactive</Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
