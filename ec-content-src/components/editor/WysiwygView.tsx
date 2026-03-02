import { useState, useRef, useCallback } from 'react';
import { useWidgets } from '@/hooks/useWidgets';
import { Widget } from '@/types/widget';
import { WidgetCanvas } from './WidgetCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { DraggableWidgetPalette } from './DraggableWidgetPalette';
import { Pencil, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

type SidebarTab = 'edit' | 'add';

interface WysiwygViewProps {
  contentType?: 'hero' | 'inline';
  activeHeroView?: 'hotspots' | 'toolbar';
}

export function WysiwygView({ contentType, activeHeroView = 'hotspots' }: WysiwygViewProps) {
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

  // Track the last added widget ID for auto-scrolling
  const [lastAddedWidgetId, setLastAddedWidgetId] = useState<string | null>(null);

  // Track which hero view is active (hotspots or toolbar)
  const [heroView, setHeroView] = useState<'hotspots' | 'toolbar'>(activeHeroView);
  
  // Track active sidebar tab
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>(selectedWidget ? 'edit' : 'add');

  // Ref for the sidebar panel to detect clicks outside
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle click on the main container - deselect if clicking outside widget and sidebar
  const handleContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Check if click is inside the sidebar
    if (sidebarRef.current?.contains(e.target as Node)) {
      return;
    }
    // Check if click is on a widget (has data-widget-id or is inside one)
    const target = e.target as HTMLElement;
    if (target.closest('[data-widget-id]')) {
      return;
    }
    // Click is outside both widget and sidebar - deselect
    setSelectedWidgetId(null);
  }, [setSelectedWidgetId]);

  // Determine the palette context based on content type and hero view
  const getPaletteContext = (): 'hotspot' | 'toolbar' | 'inline' => {
    if (contentType === 'inline') return 'inline';
    if (contentType === 'hero') {
      return heroView === 'hotspots' ? 'hotspot' : 'toolbar';
    }
    return 'inline';
  };

  // When widget is selected, switch to edit tab
  const handleSelectWidget = useCallback((id: string | null) => {
    setSelectedWidgetId(id);
    if (id) {
      setSidebarTab('edit');
    }
  }, [setSelectedWidgetId]);

  // Wrap addWidget to automatically switch to edit tab after adding and track for auto-scroll
  const handleAddWidget = useCallback((widget: Widget, insertIndex?: number) => {
    addWidget(widget, insertIndex);
    setLastAddedWidgetId(widget.id);
    setSelectedWidgetId(widget.id);
    setSidebarTab('edit');
    // Clear the last added ID after a delay to allow for the scroll animation
    setTimeout(() => setLastAddedWidgetId(null), 500);
  }, [addWidget, setSelectedWidgetId]);

  const sidebarTabs: { id: SidebarTab; label: string; icon: React.ReactNode }[] = [
    ...(selectedWidget ? [{ id: 'edit' as SidebarTab, label: 'Edit widget', icon: <Pencil className="w-4 h-4" /> }] : []),
    { id: 'add', label: 'Add new', icon: <Plus className="w-4 h-4" /> },
  ];

  return (
    <div className="flex-1 min-h-0 h-full" onClick={handleContainerClick}>
      <ResizablePanelGroup 
        direction="horizontal" 
        className="h-full"
      >
      {/* Canvas - Scrollable area */}
      <ResizablePanel defaultSize={70} minSize={50}>
        <div className="h-full overflow-auto">
          <WidgetCanvas
            widgets={widgets}
            selectedWidgetId={selectedWidgetId}
            onSelectWidget={handleSelectWidget}
            onDeleteWidget={deleteWidget}
            onDuplicateWidget={duplicateWidget}
            onToggleWidgetActive={toggleWidgetActive}
            onReorderWidgets={reorderWidgets}
            lastAddedWidgetId={lastAddedWidgetId}
            onAddWidget={handleAddWidget}
            onUpdateWidget={updateWidget}
            useInternalScroll={false}
            contentType={contentType}
            onHeroViewChange={setHeroView}
          />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Unified Sidebar with Tabs */}
      <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
        <div 
          ref={sidebarRef}
          className="h-full overflow-hidden bg-card border-l border-border flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tab Bar */}
          <div className="shrink-0 flex border-b border-border bg-muted/30">
            {sidebarTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSidebarTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors",
                  "hover:bg-muted/50",
                  sidebarTab === tab.id 
                    ? "text-primary border-b-2 border-primary bg-background" 
                    : "text-muted-foreground"
                )}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {sidebarTab === 'edit' && (
              selectedWidget ? (
                <PropertiesPanel
                  widget={selectedWidget}
                  onUpdate={updateWidget}
                  onClose={() => setSelectedWidgetId(null)}
                  onShowPalette={() => setSidebarTab('add')}
                />
              ) : (
                <div className="h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
                      <Pencil className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Select a widget to edit its properties
                    </p>
                  </div>
                </div>
              )
            )}
            
            {sidebarTab === 'add' && (
              <DraggableWidgetPalette context={getPaletteContext()} onAddWidget={handleAddWidget} />
            )}
          </div>
        </div>
      </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
