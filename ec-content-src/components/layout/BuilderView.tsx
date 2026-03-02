import { useWidgets } from '@/hooks/useWidgets';
import { ClassicLayoutView } from '@/components/editor/ClassicLayoutView';
import { Widget } from '@/types/widget';

interface BuilderViewProps {
  onAddWidget?: () => void;
  contentType?: 'hero' | 'inline'; // Optional - if not provided, show both stacked
}

export function BuilderView({ onAddWidget, contentType }: BuilderViewProps) {
  const {
    widgets,
    selectedWidgetId,
    setSelectedWidgetId,
    addWidget,
    deleteWidget,
    duplicateWidget,
    toggleWidgetActive,
    reorderWidgets,
  } = useWidgets();

  // Filter widgets by section OR includeOn (for cross-placement visibility)
  const heroWidgets = widgets.filter(w => w.sections.includes('hero'));
  const inlineWidgets = widgets.filter(w => 
    w.sections.includes('inline') || w.content?.includeOn?.includes('inline')
  );

  const handleAddHeroWidget = (widget: Widget) => {
    addWidget({ ...widget, sections: ['hero'] });
  };

  const handleAddInlineWidget = (widget: Widget) => {
    addWidget({ ...widget, sections: ['inline'] });
  };

  return (
    <ClassicLayoutView
      heroWidgets={heroWidgets}
      inlineWidgets={inlineWidgets}
      selectedWidgetId={selectedWidgetId}
      onSelectWidget={setSelectedWidgetId}
      onAddHeroWidget={handleAddHeroWidget}
      onAddInlineWidget={handleAddInlineWidget}
      onDeleteWidget={deleteWidget}
      onToggleWidgetActive={toggleWidgetActive}
      onDuplicateWidget={duplicateWidget}
      contentType={contentType}
    />
  );
}
