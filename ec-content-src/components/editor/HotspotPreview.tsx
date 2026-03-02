import { useRef, useState, useCallback } from 'react';
import { Widget, ImageItem } from '@/types/widget';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { HotspotIconDisplay } from './HotspotIconPicker';
import { WidgetRenderer } from './WidgetRenderer';
import { AddAssetsModal } from './AddAssetsModal';
import { Info, ImageIcon, Replace, Trash2, X, AlertCircle } from 'lucide-react';
import sampleProductImage from '@/assets/sample-product.png';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface HotspotPreviewProps {
  widgets: Widget[];
  selectedWidgetId: string | null;
  hoveredWidgetId?: string | null;
  onSelectWidget: (id: string) => void;
  onHoverWidget?: (id: string | null) => void;
  isActive: boolean;
  onToggleActive: (active: boolean) => void;
  mockImage: string | null;
  onUploadImage: (imageUrl: string) => void;
  onRemoveImage: () => void;
  onUpdateWidgetPosition: (widgetId: string, x: number, y: number) => void;
  isReadOnly?: boolean;
}

export function HotspotPreview({
  widgets,
  selectedWidgetId,
  hoveredWidgetId,
  onSelectWidget,
  onHoverWidget,
  isActive,
  onToggleActive,
  mockImage,
  onUploadImage,
  onRemoveImage,
  onUpdateWidgetPosition,
  isReadOnly = false,
}: HotspotPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);

  const handleAssetSelected = (assets: ImageItem[]) => {
    if (assets.length > 0 && assets[0].url) {
      onUploadImage(assets[0].url);
    }
  };

  const handleMouseDown = useCallback((e: React.MouseEvent, widgetId: string) => {
    if (isReadOnly) return; // Don't allow dragging in read-only mode
    if (!containerRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    
    const rect = containerRef.current.getBoundingClientRect();
    const widget = widgets.find(w => w.id === widgetId);
    const pos = widget?.content?.hotspotPosition || { x: 50, y: 50 };
    
    const currentX = (pos.x / 100) * rect.width;
    const currentY = (pos.y / 100) * rect.height;
    
    setDragOffset({
      x: e.clientX - rect.left - currentX,
      y: e.clientY - rect.top - currentY,
    });
    setDraggingId(widgetId);
    onSelectWidget(widgetId);
  }, [widgets, onSelectWidget, isReadOnly]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    
    // Update cursor position for floating CTA
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    if (!draggingId) return;
    
    const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;
    
    // Clamp to bounds — keep icons below the notification area when no mock image
    const minY = mockImage ? 5 : 15;
    const clampedX = Math.max(5, Math.min(95, x));
    const clampedY = Math.max(minY, Math.min(95, y));
    
    onUpdateWidgetPosition(draggingId, clampedX, clampedY);
  }, [draggingId, dragOffset, onUpdateWidgetPosition]);

  const handleMouseEnterImage = useCallback(() => {
    setIsHoveringImage(true);
  }, []);

  const handleMouseLeaveImage = useCallback(() => {
    setIsHoveringImage(false);
    setCursorPosition(null);
  }, []);

  const handleMouseUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  return (
    <div className="space-y-4">
      {/* Status Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Hotspots Status</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Toggle hotspots visibility for this retailer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{isActive ? 'Active' : 'Inactive'}</span>
          <Switch checked={isActive} onCheckedChange={onToggleActive} />
        </div>
      </div>

      {/* Hotspot Preview Area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          handleMouseUp();
          handleMouseLeaveImage();
        }}
        onMouseEnter={handleMouseEnterImage}
        className={cn(
          "relative aspect-square rounded-xl border overflow-hidden bg-muted/30",
          isReadOnly 
            ? "border-border/50 opacity-80" 
            : "border-border"
        )}
      >

        {/* Read-only overlay indicator */}
        {isReadOnly && (
          <div className="absolute top-2 right-2 z-30 px-2 py-1 bg-muted/90 rounded-md border border-border">
            <span className="text-[10px] font-medium text-muted-foreground">View Only</span>
          </div>
        )}

        {/* Mock Image or Upload Prompt */}
        {mockImage ? (
          <>
            <img 
              src={mockImage} 
              alt="Mock hero" 
              className="w-full h-full object-cover"
            />
            {/* Image Controls Overlay - hidden in read-only mode, only show on hover */}
            {!isReadOnly && (
              <div className={cn(
                "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 transition-opacity",
                isHoveringImage ? "opacity-100" : "opacity-0"
              )}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowAssetModal(true)}
                  className="gap-1.5 shadow-lg"
                >
                  <Replace className="w-3.5 h-3.5" />
                  Replace
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={onRemoveImage}
                  className="gap-1.5 shadow-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="relative w-full h-full group">
            {/* Sample image with 30% opacity */}
            <img 
              src={sampleProductImage} 
              alt="Sample product" 
              className="w-full h-full object-cover opacity-25"
            />
            {/* Diagonal "Sample Image" watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden px-8 z-25">
              <span className="text-lg font-bold text-muted-foreground text-center leading-relaxed">
                Click here to select your product's hero image.
              </span>
            </div>
            {/* Upload button overlay - covers entire area including pill */}
            {!isReadOnly && (
              <button
                onClick={() => setShowAssetModal(true)}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-colors hover:bg-background/30"
              >
                {/* Upload Main Product Image pill label */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30">
                  <span className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-destructive text-sm font-medium rounded-full shadow-md border-2 border-destructive whitespace-nowrap">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Select Mock Hero Image
                  </span>


                </div>
                {/* Hover overlay */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 rounded-lg px-4 py-2 shadow-lg whitespace-nowrap">
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 shrink-0" />
                    Select Mock Hero Image
                  </p>
                </div>
              </button>
            )}
            {/* Pill only when read-only */}
            {isReadOnly && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30">
                  <span className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-destructive text-sm font-medium rounded-full shadow-md border-2 border-destructive whitespace-nowrap">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Select Mock Hero Image
                  </span>


              </div>
            )}
          </div>
        )}

        {/* Hotspot Markers — only show active widgets */}
        {widgets.filter(w => w.isActive).map((widget) => {
          const pos = widget.content?.hotspotPosition || { x: 50, y: 50 };
          const iconId = widget.content?.hotspotIcon || 'info';
          
          return (
            <Popover 
              key={widget.id}
              open={openPopoverId === widget.id}
              onOpenChange={(open) => setOpenPopoverId(open ? widget.id : null)}
            >
              <PopoverTrigger asChild>
                <button
                  data-hotspot-marker
                  onMouseDown={(e) => handleMouseDown(e, widget.id)}
                  onMouseEnter={() => onHoverWidget?.(widget.id)}
                  onMouseLeave={() => onHoverWidget?.(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectWidget(widget.id);
                  }}
                  className={cn(
                    "absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                    "bg-primary border-2 border-primary cursor-grab active:cursor-grabbing",
                    selectedWidgetId === widget.id 
                      ? "ring-4 ring-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.5)]" 
                      : hoveredWidgetId === widget.id
                        ? "ring-2 ring-primary/40 shadow-[0_0_16px_hsl(var(--primary)/0.4)]"
                        : "shadow-lg hover:ring-2 hover:ring-primary/20 hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)]",
                    draggingId === widget.id && "shadow-xl"
                  )}
                  style={{ 
                    left: `${pos.x}%`, 
                    top: `${pos.y}%`, 
                    transform: `translate(-50%, -50%) scale(${
                      selectedWidgetId === widget.id || draggingId === widget.id 
                        ? 1.15 
                        : hoveredWidgetId === widget.id 
                          ? 1.25 
                          : 1
                    })`,
                    zIndex: selectedWidgetId === widget.id ? 20 : hoveredWidgetId === widget.id ? 15 : 10,
                  }}
                >
                  <HotspotIconDisplay iconId={iconId} className="w-4 h-4 text-primary-foreground" />
                </button>
              </PopoverTrigger>
              <PopoverContent 
                side="right" 
                align="center" 
                className="w-[400px] h-[400px] p-0 overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenPopoverId(null);
                  }}
                  className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-foreground" />
                </button>
                <div className="w-full h-full overflow-auto bg-card">
                  <WidgetRenderer widget={widget} />
                </div>
              </PopoverContent>
            </Popover>
          );
        })}

        <AddAssetsModal
          open={showAssetModal}
          onOpenChange={setShowAssetModal}
          onAddAssets={handleAssetSelected}
          singleSelect
          title="Select Image"
        />
      </div>

      {/* Help Text */}
      <div className="text-center space-y-1">
        <p className="text-xs text-muted-foreground">
          Drag hotspot icons to position them on the image
        </p>
        <p className="text-[10px] text-muted-foreground">
          This mock image helps position icons — it won't be published
        </p>
      </div>
    </div>
  );
}
