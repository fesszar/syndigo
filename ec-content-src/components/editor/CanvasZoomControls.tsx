import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CanvasZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  minZoom?: number;
  maxZoom?: number;
  className?: string;
}

export function CanvasZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  minZoom = 0.25,
  maxZoom = 1.5,
  className,
}: CanvasZoomControlsProps) {
  const zoomPercentage = Math.round(zoom * 100);

  return (
    <div className={cn(
      "flex items-center gap-1 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-1 shadow-md",
      className
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={onZoomOut}
        disabled={zoom <= minZoom}
        title="Zoom out"
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
      
      <button
        onClick={onReset}
        className="min-w-[52px] h-7 px-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
        title="Reset to 100%"
      >
        {zoomPercentage}%
      </button>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={onZoomIn}
        disabled={zoom >= maxZoom}
        title="Zoom in"
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      
      <div className="w-px h-5 bg-border mx-0.5" />
      
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={onReset}
        title="Fit to view"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}
