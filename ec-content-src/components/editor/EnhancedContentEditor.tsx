import { useState } from 'react';
import { useWidgets } from '@/hooks/useWidgets';
import { WidgetCanvas } from './WidgetCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { PreviewModal } from './PreviewModal';
import { EditorHeader } from './EditorHeader';

export function EnhancedContentEditor() {
  const {
    widgets,
    selectedWidget,
    selectedWidgetId,
    setSelectedWidgetId,
    addWidget,
    updateWidget,
    deleteWidget,
    duplicateWidget,
    reorderWidgets,
    toggleWidgetActive,
  } = useWidgets();

  const [showPreview, setShowPreview] = useState(false);

  const handleSave = () => {
    console.log('Saving widgets:', widgets);
    // In a real app, this would save to an API
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <EditorHeader 
        onPreview={() => setShowPreview(true)}
        onSave={handleSave}
        productName="A DogVenture Adjustable Lifejacket for Dogs, Medium, Red"
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <WidgetCanvas
          widgets={widgets}
          selectedWidgetId={selectedWidgetId}
          onSelectWidget={setSelectedWidgetId}
          onDeleteWidget={deleteWidget}
          onDuplicateWidget={duplicateWidget}
          onToggleWidgetActive={toggleWidgetActive}
          onReorderWidgets={reorderWidgets}
          onAddWidget={addWidget}
          onUpdateWidget={updateWidget}
        />

        {/* Properties Panel */}
        <PropertiesPanel
          widget={selectedWidget}
          onUpdate={updateWidget}
          onClose={() => setSelectedWidgetId(null)}
        />
      </div>

      {/* Preview Modal */}
      <PreviewModal
        open={showPreview}
        onOpenChange={setShowPreview}
        widgets={widgets}
      />
    </div>
  );
}
