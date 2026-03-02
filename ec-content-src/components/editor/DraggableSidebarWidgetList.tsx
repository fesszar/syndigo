import { useState, useCallback } from 'react';
import { Widget } from '@/types/widget';
import { WidgetListItem } from './WidgetListItem';
import { cn } from '@/lib/utils';

interface DraggableSidebarWidgetListProps {
  widgets: Widget[];
  selectedWidgetId: string | null;
  hoveredWidgetId?: string | null;
  onSelectWidget: (id: string) => void;
  onToggleActive: (id: string) => void;
  onUpdateIcon?: (id: string, iconId: string) => void;
  onOpenSettings: () => void;
  onReorder: (widgets: Widget[]) => void;
  onHoverWidget?: (id: string | null) => void;
  onDeleteWidget?: (id: string) => void;
  showIconPicker?: boolean;
  context: 'hotspot' | 'toolbar' | 'inline';
  disabled?: boolean;
  // Per-widget link status for variant widget lists
  variantWidgetLinks?: Record<string, 'linked' | 'unlinked'>;
  // Variant-specific actions (when provided, replaces global delete)
  onToggleLinkStatus?: (id: string) => void;
  onRemoveFromVariant?: (id: string) => void;
}

export function DraggableSidebarWidgetList({
  widgets,
  selectedWidgetId,
  hoveredWidgetId,
  onSelectWidget,
  onToggleActive,
  onUpdateIcon,
  onOpenSettings,
  onReorder,
  onHoverWidget,
  onDeleteWidget,
  showIconPicker = false,
  context,
  disabled = false,
  variantWidgetLinks = {},
  onToggleLinkStatus,
  onRemoveFromVariant,
}: DraggableSidebarWidgetListProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, widgetId: string) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    setDraggedId(widgetId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', widgetId);
    
    // Add a drag image
    const target = e.currentTarget as HTMLElement;
    if (target) {
      e.dataTransfer.setDragImage(target, 20, 20);
    }
  }, [disabled]);

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
    setDragOverId(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, widgetId: string) => {
    e.preventDefault();
    if (disabled || widgetId === draggedId) return;
    
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(widgetId);
  }, [disabled, draggedId]);

  const handleDragLeave = useCallback(() => {
    setDragOverId(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetWidgetId: string) => {
    e.preventDefault();
    if (disabled || !draggedId || draggedId === targetWidgetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    const draggedIndex = widgets.findIndex(w => w.id === draggedId);
    const targetIndex = widgets.findIndex(w => w.id === targetWidgetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    // Reorder the widgets
    const newWidgets = [...widgets];
    const [draggedWidget] = newWidgets.splice(draggedIndex, 1);
    newWidgets.splice(targetIndex, 0, draggedWidget);

    // Update the order property
    const reorderedWidgets = newWidgets.map((widget, index) => ({
      ...widget,
      order: index,
    }));

    onReorder(reorderedWidgets);
    setDraggedId(null);
    setDragOverId(null);
  }, [disabled, draggedId, widgets, onReorder]);

  if (widgets.length === 0) return null;

  return (
    <div className="space-y-1">
      {widgets.map((widget) => {
        const isDragging = draggedId === widget.id;
        const isDragOver = dragOverId === widget.id;

        return (
          <div
            key={widget.id}
            draggable={!disabled}
            onDragStart={(e) => handleDragStart(e, widget.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, widget.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, widget.id)}
            className={cn(
              "transition-all duration-150",
              isDragging && "opacity-50 scale-95",
              isDragOver && "border-t-2 border-primary pt-1",
              !disabled && "cursor-grab active:cursor-grabbing"
            )}
          >
            <WidgetListItem
              widget={widget}
              isSelected={widget.id === selectedWidgetId}
              isHovered={widget.id === hoveredWidgetId}
              onClick={() => onSelectWidget(widget.id)}
              onToggleActive={onToggleActive}
              onUpdateIcon={onUpdateIcon}
              onOpenSettings={onOpenSettings}
              onHover={onHoverWidget}
              onDelete={onDeleteWidget}
              showIconPicker={showIconPicker}
              context={context}
              linkStatus={variantWidgetLinks[widget.id]}
              onToggleLinkStatus={onToggleLinkStatus}
              onRemoveFromVariant={onRemoveFromVariant}
            />
          </div>
        );
      })}
    </div>
  );
}
