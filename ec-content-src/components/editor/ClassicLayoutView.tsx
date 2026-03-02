import { useState } from 'react';
import { 
  ChevronUp, ChevronDown, Image, FileText, Play, Sparkles, 
  Table, LayoutGrid, MousePointer, View, PanelTop, 
  GripVertical, AlertTriangle, Plus, Copy, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Widget, WIDGET_TYPES, HERO_WIDGET_TYPES, INLINE_WIDGET_TYPES, WidgetType } from '@/types/widget';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { HotspotExperienceManager } from '@/components/editor/HotspotExperienceManager';
import { HotspotConfiguration, createExperience } from '@/types/hotspotExperience';

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

interface ClassicLayoutViewProps {
  heroWidgets: Widget[];
  inlineWidgets: Widget[];
  selectedWidgetId: string | null;
  onSelectWidget: (id: string) => void;
  onAddHeroWidget: (widget: Widget) => void;
  onAddInlineWidget: (widget: Widget) => void;
  onDeleteWidget: (id: string) => void;
  onToggleWidgetActive: (id: string) => void;
  onDuplicateWidget: (id: string) => void;
  contentType?: 'hero' | 'inline'; // Optional - if not provided, show both stacked
}

export function ClassicLayoutView({
  heroWidgets,
  inlineWidgets,
  selectedWidgetId,
  onSelectWidget,
  onAddHeroWidget,
  onAddInlineWidget,
  onDeleteWidget,
  onToggleWidgetActive,
  onDuplicateWidget,
  contentType,
}: ClassicLayoutViewProps) {
  const [heroExpanded, setHeroExpanded] = useState(true);
  const [inlineExpanded, setInlineExpanded] = useState(true);
  const [heroTab, setHeroTab] = useState<'library' | 'hotspots' | 'toolbar'>('library');
  const [heroListExpanded, setHeroListExpanded] = useState(true);
  const [inlineListExpanded, setInlineListExpanded] = useState(true);
  const [selectedHotspotWidgetId, setSelectedHotspotWidgetId] = useState<string | null>(null);
  const [hotspotConfig, setHotspotConfig] = useState<HotspotConfiguration>(() => ({
    defaultExperience: { ...createExperience('default', 'Default'), isActive: true },
    experiences: [],
  }));

  // Mock retailers that support hotspots
  const HOTSPOT_RETAILERS = [
    { id: 'amazon', name: 'Amazon', supportsHotspots: true, supportsToolbar: true },
    { id: 'walmart', name: 'Walmart', supportsHotspots: true, supportsToolbar: true },
    { id: 'target', name: 'Target', supportsHotspots: true, supportsToolbar: true },
  ];
  
  // Track expanded state for each widget
  const [expandedWidgets, setExpandedWidgets] = useState<Record<string, boolean>>({});
  
  const toggleWidgetExpanded = (widgetId: string) => {
    setExpandedWidgets(prev => ({
      ...prev,
      [widgetId]: !prev[widgetId]
    }));
  };
  
  const expandAllInline = () => {
    const newState: Record<string, boolean> = {};
    inlineWidgets.forEach(w => { newState[w.id] = true; });
    setExpandedWidgets(prev => ({ ...prev, ...newState }));
  };
  
  const collapseAllInline = () => {
    const newState: Record<string, boolean> = {};
    inlineWidgets.forEach(w => { newState[w.id] = false; });
    setExpandedWidgets(prev => ({ ...prev, ...newState }));
  };

  const getWidgetIcon = (type: string) => {
    return widgetIconMap[type] || FileText;
  };

  const createWidget = (type: WidgetType, section: 'hero' | 'inline'): Widget => {
    const config = WIDGET_TYPES.find(t => t.type === type);
    
    // Set includeOn based on which section the widget is created in
    const includeOn = section === 'inline' ? ['inline'] : ['toolbar'];
    
    return {
      id: generateId(),
      type,
      title: config?.label || 'New Widget',
      isActive: true,
      order: 0,
      sections: [section],
      context: section === 'inline' ? 'inline' : 'toolbar',
      content: { 
        ...config?.defaultContent,
        includeOn: includeOn as any,
      },
    };
  };

  const handleAddHeroWidget = (type: WidgetType) => {
    onAddHeroWidget(createWidget(type, 'hero'));
  };

  const handleAddInlineWidget = (type: WidgetType) => {
    onAddInlineWidget(createWidget(type, 'inline'));
  };

  // Mock attached files for demo
  const getWidgetFiles = (widget: Widget) => {
    // Simulate attached files based on widget type
    if (widget.type === 'images' || widget.type === 'carousel') {
      return [
        { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop' },
        { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop' },
        { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop' },
        { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop' },
        { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
        { id: '6', type: 'image', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
      ];
    }
    if (widget.type === 'videos') {
      return [
        { id: '1', type: 'video', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=100&h=100&fit=crop' },
      ];
    }
    if (widget.type === 'documents') {
      return [
        { id: '1', type: 'document', name: 'Product Guide.pdf' },
        { id: '2', type: 'document', name: 'Warranty Info.pdf' },
      ];
    }
    return [];
  };

  // Render a single widget row matching the reference UI
  const renderWidgetRow = (widget: Widget, index: number, section: 'hero' | 'inline') => {
    const IconComponent = getWidgetIcon(widget.type);
    const hasWarning = !widget.content?.header;
    const isExpanded = expandedWidgets[widget.id] ?? false;
    const files = getWidgetFiles(widget);
    
    return (
      <div
        key={widget.id}
        className={cn(
          "border border-border rounded-lg bg-background transition-colors",
          selectedWidgetId === widget.id && "ring-2 ring-primary/50 bg-primary/5"
        )}
      >
        {/* Main Row - Always Visible */}
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-muted/30 transition-colors",
            isExpanded && files.length > 0 && "border-b border-border"
          )}
          onClick={() => onSelectWidget(widget.id)}
        >
          {/* Drag Handle */}
          <GripVertical className="w-4 h-4 text-muted-foreground/50 cursor-grab flex-shrink-0" />
          
          {/* Sequence Number */}
          <span className="w-7 h-7 flex items-center justify-center text-xs font-medium text-primary border border-primary/30 rounded bg-primary/5 flex-shrink-0">
            {index + 1}
          </span>
          
          {/* Widget Icon & Type */}
          <div className="flex items-center gap-2 min-w-[140px]">
            <IconComponent className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              {WIDGET_TYPES.find(t => t.type === widget.type)?.label || widget.type} Widget
            </span>
          </div>
          
          {/* Header Field */}
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className="text-sm text-muted-foreground">Header:</span>
            <span className="text-sm text-foreground truncate">
              {widget.content?.header || ''}
            </span>
          </div>
          
          {/* Tag Field */}
          <div className="flex items-center gap-1.5 min-w-[120px]">
            <span className="text-sm text-muted-foreground">Tag:</span>
            <span className="text-sm font-medium text-foreground">
              {widget.tag || 'Undefined'}
            </span>
          </div>
          
          {/* Warning */}
          {hasWarning && (
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
          )}
          
          {/* Expand/Collapse Toggle - More Visible */}
          {files.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWidgetExpanded(widget.id);
              }}
              className={cn(
                "w-7 h-7 flex items-center justify-center rounded border transition-all flex-shrink-0",
                isExpanded 
                  ? "bg-primary/10 border-primary/30 text-primary" 
                  : "bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          
          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 px-3 text-primary" onClick={(e) => e.stopPropagation()}>
                Actions
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDuplicateWidget(widget.id)}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDeleteWidget(widget.id)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Active Toggle */}
          <Switch
            checked={widget.isActive}
            onCheckedChange={() => onToggleWidgetActive(widget.id)}
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0"
          />
        </div>
        
        {/* Expanded Content - File Thumbnails */}
        {isExpanded && files.length > 0 && (
          <div className="px-3 py-3 bg-muted/20">
            <div className="flex flex-wrap gap-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="w-16 h-16 rounded-lg border border-border bg-background overflow-hidden shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer"
                >
                  {file.type === 'image' || file.type === 'video' ? (
                    <img 
                      src={file.url} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-muted/50 p-1">
                      <FileText className="w-5 h-5 text-muted-foreground mb-0.5" />
                      <span className="text-[8px] text-muted-foreground text-center truncate w-full px-0.5">
                        {file.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Empty state matching reference
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-border/50 rounded-lg bg-muted/10">
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        <Plus className="w-8 h-8 text-muted-foreground/50" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">No widgets yet</h3>
      <p className="text-sm text-muted-foreground">
        Add your first widget to get started
      </p>
    </div>
  );

  return (
    <div className="flex-1 p-6 overflow-auto bg-muted/20">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Hero Image Section - Show when contentType is 'hero' or undefined (stacked mode) */}
        {(contentType === 'hero' || contentType === undefined) && (
          <Collapsible open={heroExpanded} onOpenChange={setHeroExpanded}>
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              {/* Section Header */}
              <CollapsibleTrigger className="w-full flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                {heroExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="font-semibold text-foreground">Hero Image</span>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="p-4">
                  {/* Tabs: Library | Hotspots | Toolbar */}
                  <Tabs value={heroTab} onValueChange={(v) => setHeroTab(v as any)} className="mb-4">
                    <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0 gap-6">
                      <TabsTrigger 
                        value="library" 
                        className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-0 pb-2 font-medium"
                      >
                        Library
                      </TabsTrigger>
                      <TabsTrigger 
                        value="hotspots" 
                        className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-0 pb-2 font-medium"
                      >
                        Hotspots
                      </TabsTrigger>
                      <TabsTrigger 
                        value="toolbar" 
                        className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-0 pb-2 font-medium"
                      >
                        Toolbar
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>


                  {/* Library Tab */}
                  {heroTab === 'library' && (
                    <div className="grid grid-cols-2 gap-6">
                      {/* Left Column - Image Library */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">Hero Image Library (1 Images)</span>
                          <span className="text-muted-foreground text-xs cursor-help">ⓘ</span>
                        </div>
                        <div className="h-px bg-border" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Hotspots Inactive / Toolbar Only Hero Images</p>
                          <p className="text-sm text-muted-foreground">No images</p>
                        </div>
                        <div className="h-px bg-border" />
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <p className="text-xs text-muted-foreground">Active Hotspots Hero Images</p>
                            <Button variant="link" size="sm" className="text-primary h-auto p-0 text-xs">
                              <Copy className="w-3 h-3 mr-1" />
                              Copy Hotspot Layout
                            </Button>
                          </div>
                          <div className="w-20 h-20 rounded border border-border overflow-hidden bg-muted">
                            <AspectRatio ratio={1}>
                              <div className="w-full h-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
                                <Image className="w-8 h-8 text-muted-foreground/50" />
                              </div>
                            </AspectRatio>
                          </div>
                        </div>
                      </div>
                      {/* Right Column - Widget Library */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">Widget Library</span>
                            <span className="text-muted-foreground text-xs cursor-help">ⓘ</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <button className="text-primary hover:underline">Expand All</button>
                            <span className="text-muted-foreground">|</span>
                            <button className="text-primary hover:underline">Collapse All</button>
                          </div>
                        </div>
                        {heroWidgets.length === 0 ? (
                          renderEmptyState()
                        ) : (
                          <div className="space-y-2">
                            {heroWidgets.map((widget, index) => renderWidgetRow(widget, index, 'hero'))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Hotspots Tab — retailer group-based experience builder */}
                  {heroTab === 'hotspots' && (
                    <HotspotExperienceManager
                      config={hotspotConfig}
                      hotspotRetailers={HOTSPOT_RETAILERS}
                      widgets={heroWidgets.map(w => ({ id: w.id, title: w.title, type: w.type }))}
                      selectedWidgetId={selectedHotspotWidgetId}
                      onSelectWidget={setSelectedHotspotWidgetId}
                      onConfigChange={setHotspotConfig}
                    />
                  )}

                  {/* Toolbar Tab */}
                  {heroTab === 'toolbar' && (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Toolbar widgets appear on all retailers that don't support hotspots (top-left placement).
                      </p>
                      {heroWidgets.length === 0 ? renderEmptyState() : (
                        <div className="space-y-2">
                          {heroWidgets.map((widget, index) => renderWidgetRow(widget, index, 'hero'))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}

        {/* In-line Section - Show when contentType is 'inline' or undefined (stacked mode) */}
        {(contentType === 'inline' || contentType === undefined) && (
          <Collapsible open={inlineExpanded} onOpenChange={setInlineExpanded}>
            <div className="border border-border rounded-lg bg-card overflow-hidden">
              {/* Section Header */}
              <CollapsibleTrigger className="w-full flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                {inlineExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
                <span className="font-semibold text-foreground">In-line</span>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="p-4 space-y-4">
                  {/* Widget Library Header */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">Widget Library</span>
                    <span className="text-muted-foreground text-xs cursor-help">ⓘ</span>
                  </div>
                  
                  {/* Active Section */}
                  <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">Active</span>
                          <span className="text-sm text-muted-foreground">- Widgets will display In-Line.</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <button 
                            className="text-primary hover:underline font-medium"
                            onClick={expandAllInline}
                          >
                            Expand All
                          </button>
                          <span className="text-muted-foreground">|</span>
                          <button 
                            className="text-primary hover:underline font-medium"
                            onClick={collapseAllInline}
                          >
                            Collapse All
                          </button>
                        </div>
                      </div>
                    
                    {/* Widget List */}
                    {inlineWidgets.length === 0 ? (
                      renderEmptyState()
                    ) : (
                      <div className="space-y-2">
                        {inlineWidgets.map((widget, index) => renderWidgetRow(widget, index, 'inline'))}
                        
                        {/* Add Widget Button at bottom */}
                        <div className="pt-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="border-dashed gap-2">
                                <Plus className="w-4 h-4" />
                                Add Widget
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {INLINE_WIDGET_TYPES.map((type) => {
                                const config = WIDGET_TYPES.find(t => t.type === type);
                                const IconComponent = getWidgetIcon(type);
                                return (
                                  <DropdownMenuItem 
                                    key={type}
                                    onClick={() => handleAddInlineWidget(type)}
                                    className="gap-2"
                                  >
                                    <IconComponent className="w-4 h-4" />
                                    {config?.label}
                                  </DropdownMenuItem>
                                );
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        )}
        
      </div>
    </div>
  );
}
