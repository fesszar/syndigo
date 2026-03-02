import { Widget, WidgetSection, WidgetType, WIDGET_TYPES as WIDGET_TYPE_CONFIGS, HERO_WIDGET_TYPES } from '@/types/widget';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { 
  Image, 
  Play, 
  FileText, 
  Sparkles, 
  RotateCw, 
  Images, 
  MousePointer, 
  Code, 
  Globe, 
  Table, 
  List,
} from 'lucide-react';


interface EmbeddedWidgetPaletteProps {
  section: WidgetSection;
  onAddWidget: (widget: Widget) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const WIDGET_ICONS: Record<WidgetType, React.ComponentType<{ className?: string }>> = {
  'images': Image,
  'videos': Play,
  'documents': FileText,
  'feature-sets': Sparkles,
  '360-view': RotateCw,
  'carousel': Images,
  'interactive-tour': MousePointer,
  'text-html': Code,
  'iframe': Globe,
  'comparison-table': Table,
  'specification-table': List,
};

export function EmbeddedWidgetPalette({ section, onAddWidget }: EmbeddedWidgetPaletteProps) {
  const [draggingType, setDraggingType] = useState<WidgetType | null>(null);
  
  const availableTypes = WIDGET_TYPE_CONFIGS.filter(wt => 
    section === 'hero' ? HERO_WIDGET_TYPES.includes(wt.type) : true
  );

  const handleDragStart = (e: React.DragEvent, type: WidgetType) => {
    setDraggingType(type);
    e.dataTransfer.setData('widgetType', type);
    e.dataTransfer.setData('widgetSection', section);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggingType(null);
  };

  const handleAddWidget = (type: WidgetType) => {
    const config = WIDGET_TYPE_CONFIGS.find(wt => wt.type === type);
    if (!config) return;

    const newWidget: Widget = {
      id: generateId(),
      type,
      title: config.label,
      tag: config.label,
      isActive: true,
      order: 0,
      sections: [section],
      content: { ...config.defaultContent },
    };

    onAddWidget(newWidget);
  };

  return (
    <div className="flex flex-col gap-2 p-2 bg-muted/30 rounded-lg border border-border/50">
      {availableTypes.map((widgetType) => {
        const Icon = WIDGET_ICONS[widgetType.type];
        return (
          <button
            key={widgetType.type}
            draggable
            onDragStart={(e) => handleDragStart(e, widgetType.type)}
            onDragEnd={handleDragEnd}
            onClick={() => handleAddWidget(widgetType.type)}
            className={cn(
              "w-16 h-16 flex flex-col items-center justify-center gap-1 rounded-lg",
              "bg-background border border-border/50 shadow-sm",
              "hover:bg-accent hover:border-primary/30 hover:shadow-md",
              "active:scale-95 transition-all duration-150",
              "cursor-grab active:cursor-grabbing",
              draggingType === widgetType.type && "opacity-50 scale-95"
            )}
          >
            <Icon className="w-6 h-6 text-primary" />
            <span className="text-[10px] text-muted-foreground font-medium leading-tight text-center px-1">
              {widgetType.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
