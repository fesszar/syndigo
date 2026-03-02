import { Check, ChevronDown, Shield, Unlock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RetailerWithStatus } from '@/types/hotspotOverride';

interface RetailerHotspotSelectorProps {
  retailers: RetailerWithStatus[];
  selectedRetailerId: string | 'default';
  onSelectRetailer: (retailerId: string | 'default') => void;
  className?: string;
}

export function RetailerHotspotSelector({
  retailers,
  selectedRetailerId,
  onSelectRetailer,
  className,
}: RetailerHotspotSelectorProps) {
  const hotspotRetailers = retailers.filter(r => r.supportsHotspots);
  const overrideCount = hotspotRetailers.filter(r => r.hotspotStatus === 'has-override').length;

  const selectedLabel = selectedRetailerId === 'default' 
    ? 'Default Setup' 
    : hotspotRetailers.find(r => r.id === selectedRetailerId)?.name || 'Select';

  const selectedStatus = selectedRetailerId === 'default'
    ? null
    : hotspotRetailers.find(r => r.id === selectedRetailerId)?.hotspotStatus;

  return (
    <div className={cn("", className)}>
      <Select value={selectedRetailerId} onValueChange={onSelectRetailer}>
        <SelectTrigger className="h-8 text-[11px] gap-1.5">
          <div className="flex items-center gap-1.5 flex-1">
            {selectedRetailerId === 'default' ? (
              <Shield className="w-3 h-3 text-primary shrink-0" />
            ) : selectedStatus === 'has-override' ? (
              <Unlock className="w-3 h-3 text-amber-600 shrink-0" />
            ) : (
              <Check className="w-3 h-3 text-emerald-600 shrink-0" />
            )}
            <span className="truncate font-medium">{selectedLabel}</span>
            {selectedRetailerId === 'default' && overrideCount > 0 && (
              <span className="text-[9px] text-muted-foreground">
                ({hotspotRetailers.length - overrideCount} using)
              </span>
            )}
          </div>
        </SelectTrigger>
        <SelectContent>
          {/* Default Option - Always First */}
          <SelectItem value="default" className="py-1.5">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-primary shrink-0" />
              <span className="text-[11px] font-medium">Default Setup</span>
              <span className="text-[9px] text-muted-foreground ml-auto">
                {hotspotRetailers.length - overrideCount} retailer{hotspotRetailers.length - overrideCount !== 1 ? 's' : ''}
              </span>
            </div>
          </SelectItem>

          <div className="h-px bg-border my-1" />

          {/* Retailer Options */}
          {hotspotRetailers.map(retailer => (
            <SelectItem key={retailer.id} value={retailer.id} className="py-1.5">
              <div className="flex items-center gap-1.5 w-full">
                {retailer.hotspotStatus === 'has-override' ? (
                  <Unlock className="w-3 h-3 text-amber-600 shrink-0" />
                ) : (
                  <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                )}
                <span className="text-[11px] flex-1">{retailer.name}</span>
                <span className={cn(
                  "text-[9px]",
                  retailer.hotspotStatus === 'has-override' ? "text-amber-600" : "text-emerald-600"
                )}>
                  {retailer.hotspotStatus === 'has-override' ? 'Override' : 'Default'}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
