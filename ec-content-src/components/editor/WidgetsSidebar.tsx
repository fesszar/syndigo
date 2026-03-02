import { useState } from 'react';
import { 
  ChevronDown, ChevronRight, GripVertical, Plus,
  Image, Play, Sparkles, Table, FileText, File, 
  LayoutGrid, MousePointer, View, PanelTop, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Widget, WIDGET_TYPES, HERO_WIDGET_TYPES, WidgetType } from '@/types/widget';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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

interface WidgetsSidebarProps {
  widgets: Widget[];
  selectedWidgetId: string | null;
  onSelectWidget: (id: string) => void;
  onToggleWidgetActive: (id: string) => void;
  onAddWidget: (widget: Widget) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function WidgetsSidebar({
  widgets,
  selectedWidgetId,
  onSelectWidget,
  onToggleWidgetActive,
  onAddWidget,
  isCollapsed = false,
  onToggleCollapse,
}: WidgetsSidebarProps) {
  const [heroOpen, setHeroOpen] = useState(true);
  const [inlineOpen, setInlineOpen] = useState(true);
  const [draggingType, setDraggingType] = useState<string | null>(null);

  const heroWidgetTypes = WIDGET_TYPES.filter(t => HERO_WIDGET_TYPES.includes(t.type as any));
  const inlineWidgetTypes = WIDGET_TYPES;

  const getWidgetIcon = (type: string) => {
    return widgetIconMap[type] || FileText;
  };

  const handleDragStart = (e: React.DragEvent, type: WidgetType, section: 'hero' | 'inline') => {
    setDraggingType(type);
    e.dataTransfer.setData('widgetType', type);
    e.dataTransfer.setData('widgetSection', section);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggingType(null);
  };

  const handleWidgetClick = (type: WidgetType, section: 'hero' | 'inline') => {
    const config = WIDGET_TYPES.find(t => t.type === type);
    if (!config) return;
    
    const newWidget: Widget = {
      id: generateId(),
      type,
      title: config.label,
      isActive: true,
      order: widgets.length,
      sections: [section],
      content: { ...config.defaultContent },
    };
    onAddWidget(newWidget);
  };

  const renderWidgetTypeCard = (
    config: typeof WIDGET_TYPES[0], 
    section: 'hero' | 'inline'
  ) => {
    const IconComponent = getWidgetIcon(config.type);
    const isDragging = draggingType === config.type;
    
    return (
      <div
        key={`${section}-${config.type}`}
        draggable
        onDragStart={(e) => handleDragStart(e, config.type, section)}
        onDragEnd={handleDragEnd}
        onClick={() => handleWidgetClick(config.type, section)}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-grab active:cursor-grabbing",
          "border border-border bg-background",
          "hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm",
          "transition-all duration-200",
          isDragging && "opacity-50 scale-95 border-primary"
        )}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground/50 shrink-0" />
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
          "bg-primary/10 text-primary"
        )}>
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{config.label}</p>
        </div>
      </div>
    );
  };

  const renderSection = (
    title: string,
    icon: React.ReactNode,
    widgetTypes: typeof WIDGET_TYPES,
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    sectionType: 'hero' | 'inline'
  ) => {
    return (
      <div className={cn(
        "border-b-2 last:border-b-0",
        sectionType === 'hero' ? "border-primary/20" : "border-muted-foreground/20"
      )}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <button className={cn(
              "w-full flex items-center gap-3 px-4 py-4 transition-colors",
              "hover:bg-muted/60",
              sectionType === 'hero' ? "bg-primary/5" : "bg-muted/30"
            )}>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                sectionType === 'hero' ? "bg-primary/15" : "bg-muted-foreground/10"
              )}>
                {icon}
              </div>
              <div className="flex-1 text-left">
                <span className="text-sm font-bold text-foreground">{title}</span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {widgetTypes.length} widgets available
                </p>
              </div>
              {isOpen ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="bg-card px-3 py-4 space-y-2">
              {/* Add Widget Button */}
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-full mb-3 border-dashed border-2",
                  "hover:border-primary hover:bg-primary/5",
                  "text-muted-foreground hover:text-primary",
                  "font-medium"
                )}
                onClick={() => {
                  const firstType = widgetTypes[0];
                  if (firstType) handleWidgetClick(firstType.type, sectionType);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add {sectionType === 'hero' ? 'Hero' : 'Inline'} Widget
              </Button>
              
              {/* Widget Type Cards */}
              {widgetTypes.map((config) => renderWidgetTypeCard(config, sectionType))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };

  if (isCollapsed) {
    return (
      <TooltipProvider>
        <div className="w-14 border-r border-border bg-card flex flex-col shrink-0">
          <div className="p-2 border-b border-border">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-10 h-10"
              onClick={onToggleCollapse}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 p-2 space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => { setHeroOpen(true); onToggleCollapse?.(); }}
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    "hover:bg-muted transition-colors",
                    heroOpen && "bg-primary/10 text-primary"
                  )}
                >
                  <Menu className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Hero Widgets</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => { setInlineOpen(true); onToggleCollapse?.(); }}
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    "hover:bg-muted transition-colors",
                    inlineOpen && "bg-primary/10 text-primary"
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Inline Widgets</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <div className="w-72 border-r border-border bg-card flex flex-col shrink-0">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-border flex items-center justify-between bg-muted/20">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Widget Palette</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Drag to add widgets</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={onToggleCollapse}
          >
            <ChevronDown className="w-4 h-4 rotate-90" />
          </Button>
        </div>

        {/* Sections */}
        <ScrollArea className="flex-1">
          <div>
            {renderSection(
              'Hero Content',
              <Menu className="w-4 h-4 text-primary" />,
              heroWidgetTypes,
              heroOpen,
              setHeroOpen,
              'hero'
            )}
            
            {renderSection(
              'Inline Content',
              <LayoutGrid className="w-4 h-4 text-primary" />,
              inlineWidgetTypes,
              inlineOpen,
              setInlineOpen,
              'inline'
            )}
          </div>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
}
