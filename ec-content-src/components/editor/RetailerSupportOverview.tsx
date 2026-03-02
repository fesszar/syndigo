import { cn } from '@/lib/utils';
import { Check, X, Menu, MousePointer2, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface Retailer {
  id: string;
  name: string;
  supportsHotspots: boolean;
  supportsToolbar: boolean;
  limitedWidgets?: string[]; // Widget types with limited support
}

interface RetailerSupportOverviewProps {
  retailers: Retailer[];
  compact?: boolean;
}

export function RetailerSupportOverview({ retailers, compact = false }: RetailerSupportOverviewProps) {
  const retailersWithBoth = retailers.filter(r => r.supportsHotspots && r.supportsToolbar);
  const retailersToolbarOnly = retailers.filter(r => !r.supportsHotspots && r.supportsToolbar);

  if (compact) {
    return (
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-green-600">
            <Menu className="w-3.5 h-3.5" />
            <span>+</span>
            <MousePointer2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-muted-foreground">{retailersWithBoth.length} retailers</span>
        </div>
        <div className="flex items-center gap-2">
          <Menu className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-muted-foreground">{retailersToolbarOnly.length} toolbar only</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Retailer Support</h4>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Menu className="w-3.5 h-3.5" />
            <span>Toolbar</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MousePointer2 className="w-3.5 h-3.5" />
            <span>Hotspots</span>
          </div>
        </div>
      </div>

      {/* Retailer Grid */}
      <div className="grid grid-cols-2 gap-2">
        {retailers.map((retailer) => {
          const hasBoth = retailer.supportsHotspots && retailer.supportsToolbar;
          const hasLimitations = retailer.limitedWidgets && retailer.limitedWidgets.length > 0;
          
          return (
            <Tooltip key={retailer.id}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "relative flex items-center gap-3 p-3 rounded-lg border transition-all",
                    hasBoth 
                      ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800"
                      : "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800"
                  )}
                >
                  {/* Retailer name */}
                  <span className="text-sm font-medium text-foreground flex-1 truncate">
                    {retailer.name}
                  </span>
                  
                  {/* Support icons */}
                  <div className="flex items-center gap-1.5">
                    {retailer.supportsToolbar && (
                      <div className={cn(
                        "w-6 h-6 rounded-md flex items-center justify-center",
                        "bg-blue-500 text-white"
                      )}>
                        <Menu className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {retailer.supportsHotspots ? (
                      <div className={cn(
                        "w-6 h-6 rounded-md flex items-center justify-center",
                        "bg-green-500 text-white"
                      )}>
                        <MousePointer2 className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className={cn(
                        "w-6 h-6 rounded-md flex items-center justify-center",
                        "bg-muted text-muted-foreground/40"
                      )}>
                        <X className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Limitation indicator */}
                  {hasLimitations && (
                    <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center">
                      <AlertTriangle className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">{retailer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {hasBoth 
                      ? "Supports toolbar + hotspots" 
                      : "Toolbar only (hotspots not supported)"}
                  </p>
                  {hasLimitations && (
                    <p className="text-xs text-amber-600">
                      ⚠ Limited widget support: {retailer.limitedWidgets?.join(', ')}
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 pt-2 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <div className="w-4 h-4 rounded bg-green-500" />
          </div>
          <span className="text-xs text-muted-foreground">Full support</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <div className="w-4 h-4 rounded bg-muted" />
          </div>
          <span className="text-xs text-muted-foreground">Toolbar only</span>
        </div>
      </div>
    </div>
  );
}
