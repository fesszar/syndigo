import { useState, useCallback } from 'react';
import { Widget, WIDGET_TYPES, WidgetType } from '@/types/widget';
import { WidgetCard } from './WidgetCard';
import { DropZone } from './DropZone';
import { cn } from '@/lib/utils';
import { HOTSPOT_WIDGETS, TOOLBAR_WIDGETS, INLINE_WIDGETS } from './DraggableWidgetPalette';

const generateId = () => Math.random().toString(36).substr(2, 9);

interface DroppableWidgetListProps {
  widgets: Widget[];
  selectedWidgetId: string | null;
  context: 'hotspot' | 'toolbar' | 'inline';
  onSelectWidget: (id: string) => void;
  onDeleteWidget: (id: string) => void;
  onDuplicateWidget: (id: string) => void;
  onToggleWidgetActive: (id: string) => void;
  onAddWidget: (widget: Widget) => void;
  onUpdateWidget: (id: string, updates: Partial<Widget>) => void;
  onReorderWidgets: (widgetIds: string[]) => void;
}

export function DroppableWidgetList({
  widgets,
  selectedWidgetId,
  context,
  onSelectWidget,
  onDeleteWidget,
  onDuplicateWidget,
  onToggleWidgetActive,
  onAddWidget,
  onUpdateWidget,
  onReorderWidgets,
}: DroppableWidgetListProps) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [draggedWidgetId, setDraggedWidgetId] = useState<string | null>(null);

  // Get accepted widget types for this context
  const getAcceptedTypes = useCallback(() => {
    switch (context) {
      case 'hotspot': return HOTSPOT_WIDGETS;
      case 'toolbar': return TOOLBAR_WIDGETS;
      case 'inline': return INLINE_WIDGETS;
    }
  }, [context]);

  // Check if a widget type is accepted in this context
  const isAcceptedType = useCallback((type: string) => {
    return getAcceptedTypes().includes(type as WidgetType);
  }, [getAcceptedTypes]);

  // Handle drop from palette (new widget)
  const handleDropNewWidget = useCallback((index: number) => {
    return (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const widgetType = e.dataTransfer.getData('widgetType') as WidgetType;
      const widgetContext = e.dataTransfer.getData('widgetContext');
      
      if (!widgetType || !isAcceptedType(widgetType)) {
        setDragOverIndex(null);
        setIsDraggingOver(false);
        return;
      }

      const config = WIDGET_TYPES.find(t => t.type === widgetType);
      if (!config) return;

      const newWidget: Widget = {
        id: generateId(),
        type: widgetType,
        title: config.label,
        isActive: true,
        order: index,
        sections: [context === 'inline' ? 'inline' : 'hero'],
        context,
        content: { ...config.defaultContent },
      };

      // Add widget at the specified index
      onAddWidget(newWidget);
      
      // If not adding at the end, reorder to put it in the right place
      if (index < widgets.length) {
        const newOrder = [...widgets.map(w => w.id)];
        newOrder.splice(index, 0, newWidget.id);
        // Remove duplicates (the new widget might already be at the end)
        const uniqueOrder = [...new Set(newOrder)];
        setTimeout(() => onReorderWidgets(uniqueOrder), 0);
      }

      setDragOverIndex(null);
      setIsDraggingOver(false);
    };
  }, [widgets, context, isAcceptedType, onAddWidget, onReorderWidgets]);

  // Handle reorder drop (existing widget)
  const handleReorderDrop = useCallback((targetIndex: number) => {
    if (!draggedWidgetId) return;
    
    const currentIndex = widgets.findIndex(w => w.id === draggedWidgetId);
    if (currentIndex === -1 || currentIndex === targetIndex) {
      setDraggedWidgetId(null);
      setDragOverIndex(null);
      return;
    }

    const newOrder = [...widgets.map(w => w.id)];
    newOrder.splice(currentIndex, 1);
    newOrder.splice(targetIndex > currentIndex ? targetIndex - 1 : targetIndex, 0, draggedWidgetId);
    onReorderWidgets(newOrder);
    
    setDraggedWidgetId(null);
    setDragOverIndex(null);
  }, [draggedWidgetId, widgets, onReorderWidgets]);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(index);
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    // Only reset if we're actually leaving the container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverIndex(null);
      setIsDraggingOver(false);
    }
  }, []);

  const handleWidgetDragStart = useCallback((e: React.DragEvent, widgetId: string) => {
    setDraggedWidgetId(widgetId);
    e.dataTransfer.setData('reorderWidgetId', widgetId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleWidgetDragEnd = useCallback(() => {
    setDraggedWidgetId(null);
    setDragOverIndex(null);
    setIsDraggingOver(false);
  }, []);

  // Empty state with drop zone
  if (widgets.length === 0) {
    return (
      <div
        onDragOver={(e) => handleDragOver(e, 0)}
        onDragLeave={handleDragLeave}
        onDrop={handleDropNewWidget(0)}
      >
        <DropZone
          isActive={isDraggingOver}
          position="empty"
          onDrop={() => {}}
        />
      </div>
    );
  }

  return (
    <div 
      className="space-y-0"
      onDragLeave={handleDragLeave}
    >
      {widgets.map((widget, index) => {
        const isBeingDragged = draggedWidgetId === widget.id;
        
        return (
          <div key={widget.id}>
            {/* Drop zone before this widget */}
            <div
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (draggedWidgetId) {
                  handleReorderDrop(index);
                } else {
                  handleDropNewWidget(index)(e);
                }
              }}
            >
              <DropZone
                isActive={dragOverIndex === index && !isBeingDragged}
                position="before"
                onDrop={() => {}}
              />
            </div>

            {/* Widget card */}
            <div
              draggable
              onDragStart={(e) => handleWidgetDragStart(e, widget.id)}
              onDragEnd={handleWidgetDragEnd}
              className={cn(
                "transition-all duration-200",
                isBeingDragged && "opacity-40 scale-95"
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
                dragHandleProps={{
                  onMouseDown: () => {},
                }}
              />
            </div>

            {/* Drop zone after last widget */}
            {index === widgets.length - 1 && (
              <div
                onDragOver={(e) => handleDragOver(e, index + 1)}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (draggedWidgetId) {
                    handleReorderDrop(index + 1);
                  } else {
                    handleDropNewWidget(index + 1)(e);
                  }
                }}
              >
                <DropZone
                  isActive={dragOverIndex === index + 1}
                  position="after"
                  onDrop={() => {}}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
