import { Widget, WIDGET_TYPES, WidgetType } from '@/types/widget';
import { WidgetCard } from './WidgetCard';
import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Image, FileText, Play, Sparkles, Table, LayoutGrid, MousePointer, View, PanelTop, ChevronsUpDown, ChevronsDownUp } from 'lucide-react';
import { HeroImageEditor } from './HeroImageEditor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropZone } from './DropZone';
import { INLINE_WIDGETS } from './DraggableWidgetPalette';
const widgetIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'images': Image,
  'videos': Play,
  'feature-sets': Sparkles,
  'specification-table': Table,
  'documents': FileText,
  'carousel': LayoutGrid,
  'interactive-tour': MousePointer,
  '360-view': View,
  'text-html': FileText,
  'comparison-table': Table,
  'iframe': PanelTop,
};

const generateId = () => Math.random().toString(36).substr(2, 9);

interface WidgetCanvasProps {
  widgets: Widget[];
  selectedWidgetId: string | null;
  onSelectWidget: (id: string) => void;
  onDeleteWidget: (id: string) => void;
  onDuplicateWidget: (id: string) => void;
  onToggleWidgetActive: (id: string) => void;
  onReorderWidgets: (startIndex: number, endIndex: number) => void;
  onAddWidget: (widget: Widget, insertIndex?: number) => void;
  onUpdateWidget: (id: string, updates: Partial<Widget>) => void;
  useInternalScroll?: boolean;
  contentType?: 'hero' | 'inline';
  onHeroViewChange?: (view: 'hotspots' | 'toolbar') => void;
  lastAddedWidgetId?: string | null;
}

export function WidgetCanvas({
  widgets,
  selectedWidgetId,
  onSelectWidget,
  onDeleteWidget,
  onDuplicateWidget,
  onToggleWidgetActive,
  onReorderWidgets,
  onAddWidget,
  onUpdateWidget,
  useInternalScroll = true,
  contentType,
  onHeroViewChange,
  lastAddedWidgetId: externalLastAddedWidgetId,
}: WidgetCanvasProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [inlineExpansionMode, setInlineExpansionMode] = useState<'expanded' | 'collapsed' | 'individual'>('individual');
  const [internalLastAddedWidgetId, setInternalLastAddedWidgetId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Use either external or internal last added widget ID
  const activeLastAddedWidgetId = externalLastAddedWidgetId || internalLastAddedWidgetId;

  // Scroll to newly added widget or hero section
  useEffect(() => {
    if (activeLastAddedWidgetId && scrollContainerRef.current) {
      // Find the widget to determine its context
      const addedWidget = widgets.find(w => w.id === activeLastAddedWidgetId);
      
      // Small delay to ensure DOM has updated
      const timer = setTimeout(() => {
        // For hero widgets (hotspot/toolbar), scroll to the hero section
        if (addedWidget?.context === 'hotspot' || addedWidget?.context === 'toolbar') {
          const heroSection = scrollContainerRef.current?.querySelector('[data-section="hero"]');
          if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else {
          // For inline widgets, scroll to the specific widget
          const widgetElement = scrollContainerRef.current?.querySelector(`[data-widget-id="${activeLastAddedWidgetId}"]`);
          if (widgetElement) {
            widgetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
        setInternalLastAddedWidgetId(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeLastAddedWidgetId, widgets]);

  // Filter widgets by section OR includeOn (for cross-placement visibility)
  const inlineWidgets = widgets.filter(w => 
    w.sections.includes('inline') || w.content?.includeOn?.includes('inline')
  );
  const heroWidgets = widgets.filter(w => w.sections.includes('hero'));

  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  }, [draggedIndex]);

  const handleDragEnd = useCallback(() => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      onReorderWidgets(draggedIndex, dragOverIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, [draggedIndex, dragOverIndex, onReorderWidgets]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleDragEnd();
  }, [handleDragEnd]);

  // Handle drop from palette - insert at specific index
  const handlePaletteDrop = useCallback((e: React.DragEvent, insertIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const widgetType = e.dataTransfer.getData('widgetType') as WidgetType;
    if (!widgetType || !INLINE_WIDGETS.includes(widgetType)) {
      setDragOverIndex(null);
      return;
    }

    const config = WIDGET_TYPES.find(t => t.type === widgetType);
    if (!config) return;

    // Calculate the actual insert index based on inline widgets only
    const inlineWidgetsBefore = widgets.filter(w => w.sections.includes('inline'));
    const actualInsertIndex = widgets.findIndex(w => w.id === inlineWidgetsBefore[insertIndex]?.id);
    const finalIndex = actualInsertIndex >= 0 ? actualInsertIndex : widgets.length;

    const newWidgetId = generateId();
    const newWidget: Widget = {
      id: newWidgetId,
      type: widgetType,
      title: config.label,
      isActive: true,
      order: finalIndex,
      sections: ['inline'],
      context: 'inline',
      content: { ...config.defaultContent },
    };

    onAddWidget(newWidget, finalIndex);
    setInternalLastAddedWidgetId(newWidgetId);
    setDragOverIndex(null);
  }, [onAddWidget, widgets]);

  const getWidgetIcon = (type: string) => {
    return widgetIconMap[type] || FileText;
  };

  const renderWidgetList = (sectionWidgets: Widget[], isInline: boolean = false) => {
    if (sectionWidgets.length === 0) {
      return (
        <DropZone
          position="empty"
          onDrop={(e) => handlePaletteDrop(e, 0)}
          className={isInline ? "flex-1 min-h-[200px]" : undefined}
        />
      );
    }

    return (
      <div className="space-y-0">
        {sectionWidgets.map((widget, index) => {
          const globalIndex = widgets.findIndex(w => w.id === widget.id);
          const isBeingDragged = draggedIndex === globalIndex;
          
          return (
            <div key={widget.id}>
              {/* Drop zone before */}
              <DropZone
                position="before"
                onDrop={(e) => {
                  if (draggedIndex !== null) {
                    handleDrop(e);
                  } else {
                    handlePaletteDrop(e, index);
                  }
                }}
              />

              <div
                data-widget-id={widget.id}
                draggable
                onDragStart={(e) => handleDragStart(e, globalIndex)}
                onDragOver={(e) => handleDragOver(e, globalIndex)}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "transition-all duration-200",
                  isBeingDragged && "opacity-40 scale-95",
                  widget.id === activeLastAddedWidgetId && "animate-highlight-new"
                )}
              >
                <WidgetCard
                  widget={widget}
                  isSelected={widget.id === selectedWidgetId}
                  onSelect={() => onSelectWidget(widget.id)}
                  onDelete={() => onDeleteWidget(widget.id)}
                  onDuplicate={() => onDuplicateWidget(widget.id)}
                  onToggleActive={() => onToggleWidgetActive(widget.id)}
                  onUpdate={(updates) => onUpdateWidget(widget.id, { content: { ...widget.content, ...updates } })}
                  isDragging={isBeingDragged}
                  forceExpanded={inlineExpansionMode === 'individual' ? undefined : inlineExpansionMode === 'expanded'}
                  dragHandleProps={{
                    onMouseDown: () => {},
                  }}
                />
              </div>

            </div>
          );
        })}
        
        {/* Persistent large drop zone at the bottom for adding more widgets */}
        <DropZone
          position="empty"
          onDrop={(e) => handlePaletteDrop(e, sectionWidgets.length)}
          className={cn(
            "mt-4",
            isInline ? "min-h-[160px]" : "min-h-[100px]"
          )}
        />
      </div>
    );
  };

  // Handle click on empty canvas area to deselect widget
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    // Only deselect if clicking directly on the canvas background
    if (e.target === e.currentTarget) {
      onSelectWidget('');
    }
  }, [onSelectWidget]);

  return (
    <div
      className={cn(
        "flex-1 bg-canvas-bg flex flex-col min-w-0",
        useInternalScroll && "overflow-hidden"
      )}
      onClick={handleCanvasClick}
    >
      {/* Widget Sections */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "p-4",
          useInternalScroll && "flex-1 min-h-0 overflow-y-auto custom-scrollbar"
        )}
        onClick={handleCanvasClick}
      >
        <div className="space-y-4 max-w-6xl mx-auto">
          {/* Hero Content Section */}
          {(contentType === 'hero' || contentType === undefined) && (
            <div data-section="hero">
              <HeroImageEditor 
                widgets={widgets}
                selectedWidgetId={selectedWidgetId}
                onSelectWidget={onSelectWidget}
                onAddWidget={onAddWidget}
                onDeleteWidget={onDeleteWidget}
                onToggleWidgetActive={onToggleWidgetActive}
                onReorderWidgets={(widgetIds) => {
                  widgetIds.forEach((id, newIndex) => {
                    const currentIndex = widgets.findIndex(w => w.id === id);
                    if (currentIndex !== -1 && currentIndex !== newIndex) {
                      onReorderWidgets(currentIndex, newIndex);
                    }
                  });
                }}
                onViewChange={onHeroViewChange}
              />
            </div>
          )}

          {/* Inline Content Section */}
          {(contentType === 'inline' || contentType === undefined) && (
            <div className="flex flex-col h-full min-h-[calc(100vh-12rem)]">
              {/* Header Bar - matching Hotspots style */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Inline Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-border rounded-md overflow-hidden">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-7 px-2.5 text-xs rounded-none border-r border-border gap-1",
                        inlineExpansionMode === 'expanded' && "bg-muted"
                      )}
                      onClick={() => setInlineExpansionMode('expanded')}
                    >
                      <ChevronsUpDown className="w-3.5 h-3.5" />
                      Expand All
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-7 px-2.5 text-xs rounded-none gap-1",
                        inlineExpansionMode === 'collapsed' && "bg-muted"
                      )}
                      onClick={() => setInlineExpansionMode('collapsed')}
                    >
                      <ChevronsDownUp className="w-3.5 h-3.5" />
                      Collapse All
                    </Button>
                  </div>
                  <Badge variant="secondary" className="text-xs font-medium">
                    {inlineWidgets.filter(w => w.isActive).length} active widgets
                  </Badge>
                </div>
              </div>

              {/* Widget Editor Block */}
              <div className="flex-1 rounded-xl border border-border bg-card overflow-hidden shadow-sm flex flex-col">
                {/* Widgets List with Drop Zones */}
                <div className="p-4 flex-1 flex flex-col">
                  {renderWidgetList(inlineWidgets, true)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
