import { WIDGET_TYPES, HERO_WIDGET_TYPES, WidgetType, WidgetSection } from '@/types/widget';
import { 
  ImageIcon, FileText, Video, LayoutList, RotateCw,
  GalleryHorizontal, MousePointerClick, TableProperties, Table,
  Code, Code2, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ImageIcon,
  FileText,
  Video,
  LayoutList,
  RotateCw,
  GalleryHorizontal,
  MousePointerClick,
  TableProperties,
  Table,
  Code,
  Code2,
};

interface WidgetPaletteProps {
  onAddWidget: (type: WidgetType, section: WidgetSection) => void;
}

export function WidgetPalette({ onAddWidget }: WidgetPaletteProps) {
  const renderWidgetList = (section: WidgetSection) => {
    // Filter widgets based on section
    const availableWidgets = section === 'hero' 
      ? WIDGET_TYPES.filter(w => HERO_WIDGET_TYPES.includes(w.type))
      : WIDGET_TYPES;

    return (
      <div className="space-y-2">
        {availableWidgets.map((widget) => {
          const IconComponent = iconMap[widget.icon] || FileText;
        
        return (
          <button
            key={widget.type}
            onClick={() => onAddWidget(widget.type, section)}
            className={cn(
              "w-full flex items-start gap-3 p-3 rounded-lg text-left",
              "bg-card border border-border",
              section === 'hero' 
                ? "hover:border-primary/40 hover:bg-primary/5"
                : "hover:border-primary/40 hover:bg-accent/50",
              "transition-all duration-200 group"
            )}
          >
            <div className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
              section === 'hero' 
                ? "bg-primary/10 text-primary"
                : "bg-accent text-accent-foreground",
              "group-hover:bg-primary group-hover:text-primary-foreground",
              "transition-colors duration-200"
            )}>
              <IconComponent className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">
                {widget.label}
              </div>
              <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                {widget.description}
              </div>
            </div>
            <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
          </button>
        );
        })}
      </div>
    );
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-full flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-sm font-semibold text-sidebar-foreground">Widget Library</h2>
        <p className="text-xs text-muted-foreground mt-1">Click to add widgets</p>
      </div>
      
      <Tabs defaultValue="hero" className="flex-1 flex flex-col overflow-hidden">
        <div className="px-3 pt-3">
          <TabsList className="w-full grid grid-cols-2 h-9">
            <TabsTrigger value="hero" className="text-xs gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="inline" className="text-xs gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              Inline
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="hero" className="flex-1 overflow-y-auto custom-scrollbar p-3 mt-0">
          <div className="mb-3 px-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              Above the fold content
            </p>
          </div>
          {renderWidgetList('hero')}
        </TabsContent>
        
        <TabsContent value="inline" className="flex-1 overflow-y-auto custom-scrollbar p-3 mt-0">
          <div className="mb-3 px-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              Below the fold content
            </p>
          </div>
          {renderWidgetList('inline')}
        </TabsContent>
      </Tabs>
      
      <div className="p-4 border-t border-sidebar-border bg-muted/30">
        <p className="text-xs text-muted-foreground text-center">
          {WIDGET_TYPES.length} widget types available
        </p>
      </div>
    </div>
  );
}