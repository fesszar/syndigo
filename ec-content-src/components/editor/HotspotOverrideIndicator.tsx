import { AlertTriangle, Check, Copy, RotateCcw, Shield, Unlock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface HotspotOverrideIndicatorProps {
  mode: 'default' | 'override' | 'view-only';
  retailerName?: string;
  onCreateOverride?: () => void;
  onResetToDefault?: () => void;
  className?: string;
}

export function HotspotOverrideIndicator({
  mode,
  retailerName,
  onCreateOverride,
  onResetToDefault,
  className,
}: HotspotOverrideIndicatorProps) {
  // For default mode, we don't show anything since the dropdown already indicates "Default Setup"
  // This prevents the redundant "Default Setup" label appearing twice
  if (mode === 'default') {
    return null;
  }

  if (mode === 'view-only') {
    return (
      <div className={cn("rounded border border-emerald-200 bg-emerald-50/50 p-2", className)}>
        <p className="text-[10px] text-emerald-700 mb-1.5">
          <strong>{retailerName}</strong> uses the default hotspot setup
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 text-[10px] h-7 border-emerald-200 hover:bg-emerald-100"
            >
              <Copy className="w-3 h-3" />
              Create Override
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create Retailer Override?</AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <p>
                  This will create an independent hotspot setup for <strong>{retailerName}</strong>.
                </p>
                <p>
                  You'll be able to:
                </p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                  <li>Upload a different reference image</li>
                  <li>Add, remove, or reposition hotspot widgets</li>
                  <li>Configure settings specific to this retailer</li>
                </ul>
                <p className="mt-2 text-sm">
                  You can reset to the default at any time.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onCreateOverride}>
                Create Override
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  // Override mode
  return (
    <div className={cn("rounded border-2 border-amber-300 bg-amber-50 p-2 space-y-2", className)}>
      <div className="flex items-center gap-1.5">
        <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
        <p className="text-[10px] text-amber-800 flex-1">
          Editing custom setup for <strong>{retailerName}</strong>
        </p>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-1.5 text-[10px] h-7 border-amber-300 text-amber-700 hover:bg-amber-100"
          >
            <RotateCcw className="w-3 h-3" />
            Reset to Default
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to Default?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the override for <strong>{retailerName}</strong> and revert to using the default hotspot setup. 
              All custom widgets and the reference image for this retailer will be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={onResetToDefault}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Reset to Default
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
