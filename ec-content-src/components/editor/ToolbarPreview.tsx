import { useState } from 'react';
import { Widget } from '@/types/widget';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { WidgetRenderer } from './WidgetRenderer';
import { Eye, EyeOff, Info, Image as ImageIcon, Play, Sparkles, Table, FileText, LayoutGrid, MousePointer, View, PanelTop, File, X, AlertCircle, Upload } from 'lucide-react';
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

const widgetIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'images': ImageIcon,
  'videos': Play,
  'feature-sets': Sparkles,
  'specification-table': Table,
  'documents': File,
  'carousel': LayoutGrid,
  'interactive-tour': MousePointer,
  '360-view': View,
  'text-html': FileText,
  'comparison-table': Table,
  'iframe': PanelTop,
};

interface ToolbarPreviewProps {
  widgets: Widget[];
  selectedWidgetId: string | null;
  hoveredWidgetId?: string | null;
  onSelectWidget: (id: string) => void;
  onHoverWidget?: (id: string | null) => void;
  isActive: boolean;
  onToggleActive: (active: boolean) => void;
}

export function ToolbarPreview({
  widgets,
  selectedWidgetId,
  hoveredWidgetId,
  onSelectWidget,
  onHoverWidget,
  isActive,
  onToggleActive,
}: ToolbarPreviewProps) {
  const [showToolbar, setShowToolbar] = useState(true);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Status Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Toolbar Status</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Toggle toolbar visibility globally</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{isActive ? 'Active' : 'Inactive'}</span>
          <Switch checked={isActive} onCheckedChange={onToggleActive} />
        </div>
      </div>

      {/* Toolbar Preview Area */}
      <div className="relative aspect-square rounded-xl border border-border overflow-hidden bg-muted/30">
        {/* Sample image with 30% opacity and watermark */}
        <div className="absolute inset-0 group/sample">
          <img 
            src={sampleProductImage} 
            alt="Sample product" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Diagonal "Sample Image" watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span 
              className="text-4xl font-bold text-muted-foreground/50 whitespace-nowrap"
              style={{ transform: 'rotate(-35deg)' }}
            >
              Sample Image
            </span>
          </div>
          {/* Removed upload overlay - toolbar uses automatic image placement */}
        </div>
        {/* Toolbar - positioned top-left */}
        <div 
          className={cn(
            "absolute top-3 left-3 transition-opacity duration-300 z-10",
            showToolbar ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex items-center gap-0.5 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg">
            {/* Eye Toggle */}
            <button
              onClick={() => setShowToolbar(!showToolbar)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                "bg-primary text-primary-foreground"
              )}
            >
              <Eye className="w-5 h-5" />
            </button>
            
            {/* Widget Icons */}
            {widgets.filter(w => w.isActive).map((widget) => {
              const IconComponent = widgetIconMap[widget.type] || FileText;
              
              return (
                <Popover 
                  key={widget.id} 
                  open={openPopoverId === widget.id}
                  onOpenChange={(open) => setOpenPopoverId(open ? widget.id : null)}
                >
                  <PopoverTrigger asChild>
                    <button
                      data-toolbar-icon
                      data-widget-id={widget.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectWidget(widget.id);
                      }}
                      onMouseEnter={() => onHoverWidget?.(widget.id)}
                      onMouseLeave={() => onHoverWidget?.(null)}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                        "hover:bg-muted/50",
                        selectedWidgetId === widget.id && "ring-2 ring-primary",
                        hoveredWidgetId === widget.id && "scale-125 ring-2 ring-primary/50 shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                      )}
                    >
                      <IconComponent className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent 
                    side="bottom" 
                    align="start" 
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
            
            {widgets.length === 0 && (
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <span className="text-xs text-muted-foreground">+</span>
              </div>
            )}
          </div>
        </div>

        {/* Toggle button when toolbar is hidden */}
        {!showToolbar && (
          <button
            onClick={() => setShowToolbar(true)}
            className="absolute top-3 left-3 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors z-10"
          >
            <EyeOff className="w-5 h-5 text-muted-foreground" />
          </button>
        )}

        {/* Mock product info area */}
        <div className="absolute right-8 top-1/2 -translate-y-1/4 space-y-2">
          <div className="h-4 w-40 bg-white/30 rounded" />
          <div className="h-3 w-28 bg-white/25 rounded" />
          <div className="h-3 w-32 bg-white/25 rounded" />
          <div className="h-8 w-24 bg-white/30 rounded mt-4" />
        </div>

        {/* Bottom disclaimer */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-full">
            <p className="text-xs text-white/90">Placement preview — actual position may vary by retailer</p>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center space-y-1">
        <p className="text-xs text-muted-foreground">
          Click the eye icon to toggle toolbar visibility
        </p>
        <p className="text-[10px] text-muted-foreground">
          Toolbar widgets appear on all retailers
        </p>
      </div>
    </div>
  );
}
