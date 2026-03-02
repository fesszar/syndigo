import { useMemo } from 'react';
import { Widget, WidgetType, WidgetSection, WIDGET_TYPES, HERO_WIDGET_TYPES, WidgetTypeConfig } from '@/types/widget';
import { 
  Plus, ImageIcon, FileText, Video, LayoutList, RotateCw,
  GalleryHorizontal, MousePointerClick, TableProperties, Table,
  Code, Code2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ImageIcon, FileText, Video, LayoutList, RotateCw,
  GalleryHorizontal, MousePointerClick, TableProperties, Table,
  Code, Code2,
};

const generateId = () => Math.random().toString(36).substr(2, 9);

interface AddWidgetButtonProps {
  section: WidgetSection;
  onAddWidget: (widget: Widget) => void;
  variant?: 'header' | 'inline';
}

export function AddWidgetButton({ section, onAddWidget, variant = 'inline' }: AddWidgetButtonProps) {
  const availableWidgets = useMemo(() => {
    if (section === 'hero') {
      return WIDGET_TYPES.filter(w => HERO_WIDGET_TYPES.includes(w.type));
    }
    return WIDGET_TYPES;
  }, [section]);

  const handleSelectWidget = (config: WidgetTypeConfig) => {
    const widget: Widget = {
      id: generateId(),
      type: config.type,
      title: config.label,
      isActive: true,
      order: 0,
      sections: [section],
      content: { ...config.defaultContent },
    };
    onAddWidget(widget);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {variant === 'header' ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs gap-1 text-primary hover:text-primary hover:bg-primary/10"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Widget
          </Button>
        ) : (
          <button
            className={cn(
              "w-full flex items-center justify-center gap-1.5 py-2 my-1",
              "border border-dashed border-border rounded-md",
              "text-xs text-muted-foreground",
              "hover:border-primary hover:text-primary hover:bg-primary/5",
              "transition-all duration-200"
            )}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add widget</span>
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2" align="start" sideOffset={4}>
        <p className="text-xs font-medium text-muted-foreground px-2 mb-2">
          Select widget type
        </p>
        <div className="space-y-1">
          {availableWidgets.map((config) => {
            const IconComponent = iconMap[config.icon] || FileText;
            return (
              <button
                key={config.type}
                onClick={() => handleSelectWidget(config)}
                className={cn(
                  "w-full flex items-center gap-3 px-2 py-2 rounded-md",
                  "text-left transition-colors",
                  "hover:bg-muted"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
                  "bg-primary/10 text-primary"
                )}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {config.label}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {config.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
