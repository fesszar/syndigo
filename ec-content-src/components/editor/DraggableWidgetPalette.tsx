import { Layers } from 'lucide-react';
import { WIDGET_TYPES, WidgetType, Widget } from '@/types/widget';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WidgetPaletteItem } from './WidgetPaletteItem';

// Accepted widget types per context
export const HOTSPOT_WIDGETS: WidgetType[] = ['images', 'documents', 'videos', 'carousel', 'text-html'];
export const TOOLBAR_WIDGETS: WidgetType[] = ['images', 'documents', 'videos', 'feature-sets', '360-view', 'carousel', 'interactive-tour', 'text-html'];
export const INLINE_WIDGETS: WidgetType[] = ['images', 'documents', 'videos', 'feature-sets', '360-view', 'carousel', 'interactive-tour', 'text-html', 'comparison-table', 'specification-table', 'iframe'];

const generateId = () => Math.random().toString(36).substr(2, 9);

// Get default hotspot icon based on widget type
export const getDefaultHotspotIcon = (type: WidgetType): string => {
  switch (type) {
    case 'images':
      return 'image';
    case 'documents':
      return 'file-text';
    case 'videos':
      return 'play';
    case 'text-html':
      return 'type';
    case 'carousel':
      return 'images';
    default:
      return 'info';
  }
};

interface DraggableWidgetPaletteProps {
  context: 'hotspot' | 'toolbar' | 'inline';
  onDragStart?: (type: WidgetType) => void;
  onDragEnd?: () => void;
  onAddWidget?: (widget: Widget) => void;
}

export function DraggableWidgetPalette({ 
  context, 
  onDragStart,
  onDragEnd,
  onAddWidget,
}: DraggableWidgetPaletteProps) {
  // Get accepted widgets based on context
  const getAcceptedWidgetTypes = () => {
    switch (context) {
      case 'hotspot':
        return HOTSPOT_WIDGETS;
      case 'toolbar':
        return TOOLBAR_WIDGETS;
      case 'inline':
        return INLINE_WIDGETS;
      default:
        return INLINE_WIDGETS;
    }
  };

  const acceptedTypes = getAcceptedWidgetTypes();
  const widgetConfigs = WIDGET_TYPES.filter(t => acceptedTypes.includes(t.type));

  const handleDragStart = (e: React.DragEvent, type: WidgetType) => {
    e.dataTransfer.setData('widgetType', type);
    e.dataTransfer.setData('widgetContext', context);
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart?.(type);
  };

  const handleDragEnd = () => {
    onDragEnd?.();
  };

  const handleClickToAdd = (type: WidgetType) => {
    if (!onAddWidget) return;
    
    const config = WIDGET_TYPES.find(t => t.type === type);
    if (!config) return;

    // Set includeOn based on where widget is being added
    // Hotspot widgets are automatically included in Toolbar for parity
    const includeOn = context === 'hotspot' 
      ? ['hotspot', 'toolbar'] 
      : context === 'toolbar' 
        ? ['toolbar'] 
        : ['inline'];

    const newWidget: Widget = {
      id: generateId(),
      type,
      title: config.label,
      isActive: true,
      order: 0, // Will be set correctly by the parent
      sections: [context === 'inline' ? 'inline' : 'hero'],
      context,
      content: { 
        ...config.defaultContent,
        includeOn: includeOn as any,
        // Set default hotspot icon based on widget type for hotspot context
        ...(context === 'hotspot' ? { hotspotIcon: getDefaultHotspotIcon(type) } : {}),
      },
    };

    onAddWidget(newWidget);
  };

  const getContextLabel = () => {
    switch (context) {
      case 'hotspot': return 'Hotspot Widgets';
      case 'toolbar': return 'Toolbar Widgets';
      case 'inline': return 'Inline Widgets';
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-l border-border animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Layers className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{getContextLabel()}</h3>
            <p className="text-[10px] text-muted-foreground">Drag or click to add</p>
          </div>
        </div>
      </div>

      {/* Widget List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {widgetConfigs.map((config) => (
            <WidgetPaletteItem
              key={config.type}
              type={config.type}
              label={config.label}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onClick={() => handleClickToAdd(config.type)}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Help text */}
      <div className="px-4 py-3 border-t border-border bg-muted/10">
        <p className="text-[10px] text-muted-foreground text-center">
          Drag to position or click to add at bottom
        </p>
      </div>
    </div>
  );
}
