import { useState, useCallback } from 'react';
import { Widget, WidgetType, WidgetSection } from '@/types/widget';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialWidgets: Widget[] = [];

export function useWidgets() {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);

  const selectedWidget = widgets.find(w => w.id === selectedWidgetId) || null;

  const addWidget = useCallback((widget: Widget, insertIndex?: number) => {
    setWidgets(prev => {
      const index = insertIndex !== undefined ? insertIndex : prev.length;
      const newWidgets = [...prev];
      const widgetWithOrder: Widget = {
        ...widget,
        order: index,
      };
      newWidgets.splice(index, 0, widgetWithOrder);
      // Re-order all widgets after insertion
      return newWidgets.map((w, i) => ({ ...w, order: i }));
    });
    setSelectedWidgetId(widget.id);
  }, []);

  const updateWidget = useCallback((id: string, updates: Partial<Widget>) => {
    setWidgets(prev => {
      const targetWidget = prev.find(w => w.id === id);
      if (!targetWidget) return prev;

      // If this widget is linked to a source, propagate changes to source and all linked copies
      if (targetWidget.isLinked && targetWidget.sourceId) {
        return prev.map(w => {
          // Update source widget
          if (w.id === targetWidget.sourceId) {
            return { ...w, ...updates, id: w.id, sourceId: w.sourceId, isLinked: w.isLinked, context: w.context };
          }
          // Update all widgets linked to the same source (including this one)
          if (w.isLinked && w.sourceId === targetWidget.sourceId) {
            return { ...w, ...updates, id: w.id, sourceId: w.sourceId, isLinked: w.isLinked, context: w.context };
          }
          return w;
        });
      }

      // If this widget is a source, propagate changes to all linked copies
      const linkedWidgets = prev.filter(w => w.isLinked && w.sourceId === id);
      if (linkedWidgets.length > 0) {
        return prev.map(w => {
          if (w.id === id) {
            return { ...w, ...updates };
          }
          if (w.isLinked && w.sourceId === id) {
            return { ...w, ...updates, id: w.id, sourceId: w.sourceId, isLinked: w.isLinked, context: w.context };
          }
          return w;
        });
      }

      // Normal update for non-linked widgets
      return prev.map(w => w.id === id ? { ...w, ...updates } : w);
    });
  }, []);

  const deleteWidget = useCallback((id: string) => {
    setWidgets(prev => prev.filter(w => w.id !== id));
    if (selectedWidgetId === id) {
      setSelectedWidgetId(null);
    }
  }, [selectedWidgetId]);

  const duplicateWidget = useCallback((id: string) => {
    const widget = widgets.find(w => w.id === id);
    if (!widget) return;

    const newWidget: Widget = {
      ...widget,
      id: generateId(),
      title: `${widget.title} (Copy)`,
      order: widgets.length,
    };

    setWidgets(prev => [...prev, newWidget]);
    setSelectedWidgetId(newWidget.id);
  }, [widgets]);

  const reorderWidgets = useCallback((startIndex: number, endIndex: number) => {
    setWidgets(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map((w, i) => ({ ...w, order: i }));
    });
  }, []);

  const reorderWidgetsByList = useCallback((reorderedWidgets: Widget[]) => {
    setWidgets(prev => {
      // Get IDs of reordered widgets
      const reorderedIds = new Set(reorderedWidgets.map(w => w.id));
      // Keep widgets that aren't in the reordered list
      const otherWidgets = prev.filter(w => !reorderedIds.has(w.id));
      // Combine: reordered widgets first, then others, and update order
      return [...reorderedWidgets, ...otherWidgets].map((w, i) => ({ ...w, order: i }));
    });
  }, []);

  const toggleWidgetActive = useCallback((id: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === id ? { ...w, isActive: !w.isActive } : w
    ));
  }, []);

  return {
    widgets,
    selectedWidget,
    selectedWidgetId,
    setSelectedWidgetId,
    addWidget,
    updateWidget,
    deleteWidget,
    duplicateWidget,
    reorderWidgets,
    reorderWidgetsByList,
    toggleWidgetActive,
  };
}
