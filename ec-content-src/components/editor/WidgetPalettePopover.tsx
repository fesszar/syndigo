import { useState } from 'react';
import { 
  GripVertical, Image, Play, Sparkles, Table, FileText, File, 
  LayoutGrid, MousePointer, View, PanelTop, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Widget, WIDGET_TYPES, HERO_WIDGET_TYPES, WidgetType } from '@/types/widget';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';

const widgetIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'images': Image,
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

const generateId = () => Math.random().toString(36).substr(2, 9);

interface WidgetPalettePopoverProps {
  section: 'hero' | 'inline';
  onAddWidget: (widget: Widget) => void;
  children?: React.ReactNode;
}

export function WidgetPalettePopover({
  section,
  onAddWidget,
  children,
}: WidgetPalettePopoverProps) {
  const [open, setOpen] = useState(false);
  const [draggingType, setDraggingType] = useState<string | null>(null);

  const widgetTypes = section === 'hero' 
    ? WIDGET_TYPES.filter(t => HERO_WIDGET_TYPES.includes(t.type as any))
    : WIDGET_TYPES;

  const getWidgetIcon = (type: string) => {
    return widgetIconMap[type] || FileText;
  };

  const handleAddWidget = (type: WidgetType) => {
    const config = WIDGET_TYPES.find(t => t.type === type);
    if (!config) return;
    
    const newWidget: Widget = {
      id: generateId(),
      type,
      title: config.label,
      isActive: true,
      order: 0,
      sections: [section],
      content: { ...config.defaultContent },
    };
    onAddWidget(newWidget);
    setOpen(false);
  };

  const handleDragStart = (e: React.DragEvent, type: WidgetType) => {
    setDraggingType(type);
    e.dataTransfer.setData('widgetType', type);
    e.dataTransfer.setData('widgetSection', section);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggingType(null);
  };

  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {children || (
            <Button variant="ghost" size="sm" className="gap-1.5 h-7 px-2">
              <Layers className="w-3.5 h-3.5" />
              <span className="text-xs">Widgets</span>
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent 
          className="w-64 p-2" 
          align="end" 
          sideOffset={8}
        >
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground px-2 py-1">
              Click or drag to add
            </p>
            <div className="grid grid-cols-1 gap-1">
              {widgetTypes.map((config) => {
                const IconComponent = getWidgetIcon(config.type);
                const isDragging = draggingType === config.type;
                
                return (
                  <Tooltip key={config.type}>
                    <TooltipTrigger asChild>
                      <div
                        draggable
                        onDragStart={(e) => handleDragStart(e, config.type)}
                        onDragEnd={handleDragEnd}
                        onClick={() => handleAddWidget(config.type)}
                        className={cn(
                          "flex items-center gap-2.5 px-2.5 py-2 rounded-md cursor-grab active:cursor-grabbing",
                          "hover:bg-muted transition-colors",
                          isDragging && "opacity-50 scale-95"
                        )}
                      >
                        <GripVertical className="w-3 h-3 text-muted-foreground/40 shrink-0" />
                        <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                          <IconComponent className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{config.label}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-[200px]">
                      <p className="text-xs">{config.description}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
}
