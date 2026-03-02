import { IncludeOn } from '@/types/widget';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Link2 } from 'lucide-react';

const INCLUDE_OPTIONS: { value: IncludeOn; label: string }[] = [
  { value: 'inline', label: 'Inline' },
  { value: 'hotspot', label: 'Hotspot' },
  { value: 'toolbar', label: 'Toolbar' },
];

interface IncludeOnSettingsProps {
  includeOn: IncludeOn[];
  onUpdate: (includeOn: IncludeOn[]) => void;
}

export function IncludeOnSettings({ includeOn, onUpdate }: IncludeOnSettingsProps) {
  const toggleIncludeOn = (location: IncludeOn) => {
    const newIncludeOn = includeOn.includes(location)
      ? includeOn.filter(l => l !== location)
      : [...includeOn, location];
    onUpdate(newIncludeOn);
  };

  const linkedCount = includeOn.length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs">Include On</Label>
        {linkedCount > 1 && (
          <Badge variant="secondary" className="gap-1 text-[10px]">
            <Link2 className="w-3 h-3" />
            Included in {linkedCount} places
          </Badge>
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        {INCLUDE_OPTIONS.map(option => (
          <div key={option.value} className="flex items-center gap-2">
            <Checkbox
              id={`include-${option.value}`}
              checked={includeOn.includes(option.value)}
              onCheckedChange={() => toggleIncludeOn(option.value)}
            />
            <Label 
              htmlFor={`include-${option.value}`} 
              className="text-sm font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
