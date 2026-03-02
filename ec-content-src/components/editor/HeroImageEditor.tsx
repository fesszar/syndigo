import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  MousePointer2, Menu, Trash2, 
  Info, ShoppingCart, Video, Link, Star,
  ChevronDown, Eye,
  Image, Sparkles, Table, LayoutGrid, FileText, Play,
  GripVertical, Plus, Upload, Link2,
  AlertCircle, AlertTriangle,
  File, View, MousePointer, PanelTop, Settings, RefreshCw, X,
  Heart, Bookmark, Tag, Gift, Zap, Award, Target, Lightbulb,
  MessageCircle, HelpCircle, ExternalLink, Download, Share2,
  Camera, Mic, Music, Headphones, Phone, Mail, Send,
  MapPin, Globe,
  Package, Truck, CreditCard, Percent,
  Clock, Calendar, Bell, Megaphone,
  ThumbsUp,
  Lock, Shield, Eye as EyeIcon,
  Search, ZoomIn,
  CheckCircle,
  Flame,
  Users, Crown, BadgeCheck, Store
} from 'lucide-react';
import { HotspotExperienceManager } from './HotspotExperienceManager';
import { HotspotConfiguration, createExperience } from '@/types/hotspotExperience';
import { cn } from '@/lib/utils';
import { Widget, WIDGET_TYPES, WidgetType } from '@/types/widget';
import { DropZone } from './DropZone';
import { HOTSPOT_WIDGETS, TOOLBAR_WIDGETS, getDefaultHotspotIcon } from './DraggableWidgetPalette';
import { WidgetRenderer } from './WidgetRenderer';
import { Switch } from '@/components/ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface WidgetHotspot {
  widgetId: string;
  x: number;
  y: number;
}

interface RetailerHeroImage {
  retailerId: string;
  imageUrl?: string;
  imageName?: string;
  hotspotsActive: boolean;
}

interface Retailer {
  id: string;
  name: string;
  supportsHotspots: boolean;
  supportsToolbar: boolean;
}

const MOCK_RETAILERS: Retailer[] = [
  { id: 'generic', name: 'Generic (All Retailers)', supportsHotspots: false, supportsToolbar: true },
  { id: 'amazon', name: 'Amazon', supportsHotspots: true, supportsToolbar: true },
  { id: 'walmart', name: 'Walmart', supportsHotspots: true, supportsToolbar: true },
  { id: 'target', name: 'Target', supportsHotspots: true, supportsToolbar: true },
  { id: 'costco', name: 'Costco', supportsHotspots: false, supportsToolbar: true },
  { id: 'kroger', name: 'Kroger', supportsHotspots: false, supportsToolbar: true },
  { id: 'bestbuy', name: 'Best Buy', supportsHotspots: false, supportsToolbar: true },
];

// Note: HOTSPOT_WIDGETS and TOOLBAR_WIDGETS are imported from DraggableWidgetPalette

// Hotspot icon library
const HOTSPOT_ICON_CATEGORIES = [
  {
    label: 'General',
    icons: [
      { id: 'info', icon: Info, label: 'Information' },
      { id: 'star', icon: Star, label: 'Feature' },
      { id: 'sparkles', icon: Sparkles, label: 'Highlight' },
      { id: 'lightbulb', icon: Lightbulb, label: 'Idea' },
      { id: 'target', icon: Target, label: 'Target' },
      { id: 'award', icon: Award, label: 'Award' },
      { id: 'zap', icon: Zap, label: 'Quick Tip' },
      { id: 'check-circle', icon: CheckCircle, label: 'Verified' },
    ]
  },
  {
    label: 'Commerce',
    icons: [
      { id: 'cart', icon: ShoppingCart, label: 'Add to Cart' },
      { id: 'tag', icon: Tag, label: 'Price Tag' },
      { id: 'gift', icon: Gift, label: 'Gift' },
      { id: 'package', icon: Package, label: 'Package' },
      { id: 'percent', icon: Percent, label: 'Discount' },
      { id: 'credit-card', icon: CreditCard, label: 'Payment' },
      { id: 'store', icon: Store, label: 'Store' },
      { id: 'truck', icon: Truck, label: 'Shipping' },
    ]
  },
  {
    label: 'Media',
    icons: [
      { id: 'video', icon: Video, label: 'Video' },
      { id: 'play', icon: Play, label: 'Play' },
      { id: 'camera', icon: Camera, label: 'Photo' },
      { id: 'image', icon: Image, label: 'Image' },
      { id: 'music', icon: Music, label: 'Audio' },
      { id: 'headphones', icon: Headphones, label: 'Listen' },
      { id: 'mic', icon: Mic, label: 'Voice' },
      { id: 'eye', icon: EyeIcon, label: 'View' },
    ]
  },
  {
    label: 'Actions',
    icons: [
      { id: 'link', icon: Link, label: 'Link' },
      { id: 'external', icon: ExternalLink, label: 'External' },
      { id: 'download', icon: Download, label: 'Download' },
      { id: 'share', icon: Share2, label: 'Share' },
      { id: 'bookmark', icon: Bookmark, label: 'Bookmark' },
      { id: 'heart', icon: Heart, label: 'Favorite' },
      { id: 'search', icon: Search, label: 'Search' },
      { id: 'zoom', icon: ZoomIn, label: 'Zoom' },
    ]
  },
  {
    label: 'Communication',
    icons: [
      { id: 'message', icon: MessageCircle, label: 'Message' },
      { id: 'help', icon: HelpCircle, label: 'Help' },
      { id: 'mail', icon: Mail, label: 'Email' },
      { id: 'phone', icon: Phone, label: 'Call' },
      { id: 'send', icon: Send, label: 'Send' },
      { id: 'bell', icon: Bell, label: 'Alert' },
      { id: 'megaphone', icon: Megaphone, label: 'Announce' },
      { id: 'users', icon: Users, label: 'Community' },
    ]
  },
  {
    label: 'Status',
    icons: [
      { id: 'thumbs-up', icon: ThumbsUp, label: 'Like' },
      { id: 'badge-check', icon: BadgeCheck, label: 'Verified' },
      { id: 'crown', icon: Crown, label: 'Premium' },
      { id: 'shield', icon: Shield, label: 'Secure' },
      { id: 'lock', icon: Lock, label: 'Protected' },
      { id: 'clock', icon: Clock, label: 'Time' },
      { id: 'calendar', icon: Calendar, label: 'Date' },
      { id: 'flame', icon: Flame, label: 'Hot' },
    ]
  },
];

const HOTSPOT_ICONS = HOTSPOT_ICON_CATEGORIES.flatMap(cat => cat.icons);

const widgetIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'images': Image,
  'videos': Play,
  'feature-set': Sparkles,
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

interface HeroImageEditorProps {
  widgets: Widget[];
  selectedWidgetId: string | null;
  onSelectWidget: (id: string) => void;
  onAddWidget: (widget: Widget, insertIndex?: number) => void;
  onDeleteWidget: (id: string) => void;
  onToggleWidgetActive: (id: string) => void;
  onReorderWidgets?: (widgetIds: string[]) => void;
  onViewChange?: (view: 'hotspots' | 'toolbar') => void;
}

export function HeroImageEditor({ 
  widgets, 
  selectedWidgetId,
  onSelectWidget,
  onAddWidget, 
  onDeleteWidget,
  onToggleWidgetActive,
  onReorderWidgets,
  onViewChange,
}: HeroImageEditorProps) {
  // Default to toolbar if no retailers support hotspots
  const hasHotspotSupport = MOCK_RETAILERS.some(r => r.supportsHotspots);
  const [activeView, setActiveViewState] = useState<'hotspots' | 'toolbar'>(hasHotspotSupport ? 'hotspots' : 'toolbar');
  
  // Wrapper to notify parent when view changes
  const setActiveView = (view: 'hotspots' | 'toolbar') => {
    setActiveViewState(view);
    onViewChange?.(view);
  };
  
  // (selectedRetailer no longer needed — experience manager handles retailer assignment internally)
  const [toolbarActive, setToolbarActive] = useState<boolean>(true);
  const [toolbarIconsExpanded, setToolbarIconsExpanded] = useState(false);

  // ─── New: Hotspot Experiences config ───────────────────────────────────────
  const [hotspotConfig, setHotspotConfig] = useState<HotspotConfiguration>(() => ({
    defaultExperience: {
      ...createExperience('default', 'Default'),
      isActive: true,
    },
    experiences: [],
  }));
  
  // Drag and drop state for widget list
  const [draggedWidgetId, setDraggedWidgetId] = useState<string | null>(null);
  const [dragOverWidgetId, setDragOverWidgetId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isPaletteDragging, setIsPaletteDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter widgets by context OR includeOn (for cross-placement visibility)
  const toolbarWidgets = widgets.filter(w => 
    (w.sections?.includes('hero') && w.context === 'toolbar') || 
    w.content?.includeOn?.includes('toolbar')
  );
  const hotspotWidgets = widgets.filter(w => 
    (w.sections?.includes('hero') && w.context === 'hotspot') || 
    w.content?.includeOn?.includes('hotspot')
  );

  // Get widgets for current view
  const currentViewWidgets = activeView === 'hotspots' ? hotspotWidgets : toolbarWidgets;
  const activeCurrentViewWidgets = currentViewWidgets.filter(w => w.isActive);

  // currentRetailer no longer needed — experience manager handles retailer selection

  // Track previously seen widget IDs to detect new additions
  const prevHotspotIdsRef = useRef<Set<string>>(new Set(hotspotWidgets.map(w => w.id)));
  const prevToolbarIdsRef = useRef<Set<string>>(new Set(toolbarWidgets.map(w => w.id)));


  // Sync initial view state with parent on mount
  useEffect(() => {
    onViewChange?.(activeView);
  }, []); // Only run on mount

  // Effect to select newly added toolbar widgets
  useEffect(() => {
    const currentIds = new Set(toolbarWidgets.map(w => w.id));
    const newWidgets = toolbarWidgets.filter(w => !prevToolbarIdsRef.current.has(w.id));
    prevToolbarIdsRef.current = currentIds;
    if (newWidgets.length === 1) {
      onSelectWidget(newWidgets[0].id);
    }
  }, [toolbarWidgets, onSelectWidget]);

  // Effect to select newly added hotspot widgets
  useEffect(() => {
    const currentIds = new Set(hotspotWidgets.map(w => w.id));
    const newWidgets = hotspotWidgets.filter(w => !prevHotspotIdsRef.current.has(w.id));
    prevHotspotIdsRef.current = currentIds;
    if (newWidgets.length === 1) {
      onSelectWidget(newWidgets[0].id);
    }
  }, [hotspotWidgets, onSelectWidget]);

  const getWidgetIcon = (type: string) => widgetIconMap[type] || FileText;

  // Check if widget has validation issues (missing required content)
  const hasValidationIssue = (widget: Widget) => {
    if (!widget.content?.header) return true;
    return false;
  };

  // Handle adding new widget - add directly without confirmation
  const handleAddWidget = (widgetType: string, insertIndex?: number) => {
    const config = WIDGET_TYPES.find(t => t.type === widgetType);
    if (!config) return;

    // Add widget only to the current context (toolbar or hotspot)
    const context = activeView === 'hotspots' ? 'hotspot' : 'toolbar';

    // Calculate actual insert index based on context-specific widgets
    const contextWidgets = widgets.filter(w => w.context === context);
    const actualInsertIndex = insertIndex !== undefined
      ? widgets.findIndex(w => w.id === contextWidgets[insertIndex]?.id)
      : widgets.length;
    const finalIndex = actualInsertIndex >= 0 ? actualInsertIndex : widgets.length;

    // Set includeOn based on where widget is being added
    const includeOn = context === 'hotspot' ? ['hotspot', 'toolbar'] : ['toolbar'];

    const newWidget: Widget = {
      id: generateId(),
      type: widgetType as any,
      title: config.label,
      isActive: true,
      order: finalIndex,
      sections: ['hero'],
      context,
      content: {
        ...config.defaultContent,
        includeOn: includeOn as any,
        ...(context === 'hotspot' ? { hotspotIcon: getDefaultHotspotIcon(widgetType as WidgetType) } : {}),
      },
    };

    onAddWidget(newWidget, finalIndex);
  };

  // Handle copying a toolbar widget to hotspots
  const handleCopyFromToolbar = (widgetId: string, linked: boolean) => {
    const sourceWidget = widgets.find(w => w.id === widgetId);
    if (!sourceWidget) return;

    const newWidget: Widget = {
      id: generateId(),
      type: sourceWidget.type,
      title: linked ? sourceWidget.title : `${sourceWidget.title} (Copy)`,
      isActive: true,
      order: widgets.length,
      sections: ['hero'],
      context: 'hotspot',
      content: { ...sourceWidget.content },
      sourceId: linked ? widgetId : undefined,
      isLinked: linked,
    };

    onAddWidget(newWidget);
  };

  // Handle palette drop
  const handlePaletteDrop = (e: React.DragEvent, insertIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    const widgetType = e.dataTransfer.getData('widgetType') as WidgetType;
    const acceptedTypes = activeView === 'hotspots' ? HOTSPOT_WIDGETS : TOOLBAR_WIDGETS;
    if (!widgetType || !acceptedTypes.includes(widgetType)) return;
    handleAddWidget(widgetType, insertIndex);
  };

  // Handle widget drag start
  const handleWidgetDragStart = (e: React.DragEvent, widgetId: string) => {
    setDraggedWidgetId(widgetId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', widgetId);
  };

  // Handle widget drag over
  const handleWidgetDragOver = (e: React.DragEvent, widgetId: string) => {
    e.preventDefault();
    if (draggedWidgetId && draggedWidgetId !== widgetId) {
      setDragOverWidgetId(widgetId);
    }
  };

  // Handle widget drag end
  const handleWidgetDragEnd = () => {
    if (draggedWidgetId && dragOverWidgetId && draggedWidgetId !== dragOverWidgetId && onReorderWidgets) {
      // Reorder the widgets
      const widgetIds = currentViewWidgets.map(w => w.id);
      const draggedIndex = widgetIds.indexOf(draggedWidgetId);
      const dropIndex = widgetIds.indexOf(dragOverWidgetId);
      
      if (draggedIndex !== -1 && dropIndex !== -1) {
        const newOrder = [...widgetIds];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(dropIndex, 0, draggedWidgetId);
        onReorderWidgets(newOrder);
      }
    }
    setDraggedWidgetId(null);
    setDragOverWidgetId(null);
  };

  // Handle widget drop
  const handleWidgetDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleWidgetDragEnd();
  };

  return (
    <TooltipProvider>
      <div className="space-y-3">
        {/* Active Widgets Badge */}
        <div className="flex items-center justify-end">
          <Badge variant="secondary" className="h-6 px-3 text-xs font-medium">
            {activeCurrentViewWidgets.length} active widgets
          </Badge>
        </div>

        {/* Main Content Card */}
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">

          {/* View Switcher */}
          <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/5 via-transparent to-transparent">
            <div className="flex items-center justify-between gap-4">
              {/* View Mode Switcher */}
              <div className="inline-flex items-center p-1 rounded-lg bg-muted/50 border border-border">
                <button
                  onClick={() => setActiveView('hotspots')}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all",
                    activeView === 'hotspots'
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <MousePointer2 className="w-4 h-4" />
                  <span>Hotspots</span>
                  <Badge variant="outline" className="text-[9px] px-1 py-0 ml-1 bg-primary/10 text-primary border-primary/30">
                    Per retailer
                  </Badge>
                </button>

                <button
                  onClick={() => setActiveView('toolbar')}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all",
                    activeView === 'toolbar'
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  )}
                >
                  <Menu className="w-4 h-4" />
                  <span>Toolbar</span>
                  <Badge variant="outline" className="text-[9px] px-1 py-0 ml-1 bg-muted text-muted-foreground border-muted-foreground/30">
                    Global
                  </Badge>
                </button>
              </div>

              {/* Scope indicator */}
              <div className="text-[11px] text-muted-foreground">
                {activeView === 'hotspots' ? (
                  <span className="flex items-center gap-1">
                    <Store className="w-3 h-3" />
                    Per-retailer image &amp; hotspot placement
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Applies to <span className="font-medium text-foreground">all retailers</span>
                  </span>
                )}
              </div>
            </div>

            {/* Priority Note */}
            {activeView === 'hotspots' && (
              <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-muted/50 border border-border">
                <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground">
                  Hotspots take <span className="font-medium text-foreground">priority</span> over Toolbar on retailers that support them. Retailers without hotspot support always show Toolbar.
                </span>
              </div>
            )}
          </div>

          {/* Hotspots: Experience Manager (full width) */}
          {activeView === 'hotspots' && (
            <div className="p-6">
              <HotspotExperienceManager
                config={hotspotConfig}
                hotspotRetailers={MOCK_RETAILERS.filter(r => r.supportsHotspots)}
                widgets={hotspotWidgets.map(w => ({ id: w.id, title: w.title, type: w.type }))}
                selectedWidgetId={selectedWidgetId}
                onSelectWidget={onSelectWidget}
                onConfigChange={setHotspotConfig}
              />
            </div>
          )}

          {/* Toolbar: split grid layout */}
          {activeView === 'toolbar' && (
            <div className="grid grid-cols-2 divide-x divide-border min-h-[420px]">
              {/* Left: Toolbar Visual Preview */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Toolbar Status */}
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Toolbar Status</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>When active, toolbar displays on all retailer PDPs.</TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn("text-xs font-medium", toolbarActive ? "text-primary" : "text-muted-foreground")}>
                        {toolbarActive ? 'Active' : 'Inactive'}
                      </span>
                      <Switch checked={toolbarActive} onCheckedChange={setToolbarActive} />
                    </div>
                  </div>

                  {/* Toolbar preview mockup */}
                  <div className="aspect-square bg-gradient-to-br from-muted via-muted/80 to-muted/60 rounded-xl border border-border relative overflow-hidden shadow-sm">
                    {activeCurrentViewWidgets.length > 0 ? (
                      <div className="absolute top-4 left-4 flex items-center">
                        <button
                          onClick={() => setToolbarIconsExpanded(!toolbarIconsExpanded)}
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all z-10",
                            "bg-primary text-primary-foreground shadow-lg border-2 border-primary-foreground/20",
                            "hover:scale-105",
                          )}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <div className={cn(
                          "flex items-center gap-1 bg-background/95 rounded-r-lg shadow-lg border border-border backdrop-blur-sm overflow-hidden transition-all duration-300",
                          toolbarIconsExpanded
                            ? "max-w-[300px] opacity-100 pl-2 pr-3 py-2 ml-[-4px]"
                            : "max-w-0 opacity-0 pl-0 pr-0"
                        )}>
                          {activeCurrentViewWidgets.map((widget) => {
                            const IconComponent = getWidgetIcon(widget.type);
                            return (
                              <Popover key={widget.id}>
                                <PopoverTrigger asChild>
                                  <button
                                    className={cn(
                                      "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
                                      "text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors",
                                      selectedWidgetId === widget.id && "bg-primary/10 text-primary"
                                    )}
                                    title={widget.title}
                                  >
                                    <IconComponent className="w-4 h-4" />
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[400px] p-0 shadow-xl z-50" side="bottom">
                                  <div className="border-b border-border px-4 py-3 bg-muted/30">
                                    <span className="font-medium">{widget.title}</span>
                                  </div>
                                  <div className="p-4 h-[360px] overflow-auto">
                                    <WidgetRenderer widget={widget} />
                                  </div>
                                </PopoverContent>
                              </Popover>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-background/80 rounded-lg px-3 py-2 border border-dashed border-border">
                        <Menu className="w-4 h-4 text-muted-foreground/50" />
                        <span className="text-xs text-muted-foreground/70">Add widgets to preview</span>
                      </div>
                    )}

                    {/* Decorative content lines */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2 w-40 space-y-3 pointer-events-none opacity-60">
                      <div className="h-5 bg-background/30 rounded w-full" />
                      <div className="h-3 bg-background/20 rounded w-3/4" />
                      <div className="h-3 bg-background/20 rounded w-5/6" />
                      <div className="h-8 bg-background/30 rounded w-24 mt-4" />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[9px] text-muted-foreground bg-background/70 px-2 py-1 rounded">
                        Toolbar appears top-left — retailers control final placement
                      </span>
                    </div>
                  </div>

                  <p className="text-[10px] text-muted-foreground text-center">
                    Click the eye icon to preview widget toolbar
                  </p>
                </div>
              </div>

              {/* Right: Toolbar Widget List */}
              <div className="p-5 bg-muted/10 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-foreground">Toolbar Widgets</h4>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-muted text-muted-foreground">
                      <Globe className="w-2.5 h-2.5 mr-0.5" />
                      Global
                    </Badge>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>Toolbar widgets appear on all retailers. They show on retailers that don't support hotspots.</TooltipContent>
                    </Tooltip>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activeCurrentViewWidgets.length} active
                  </Badge>
                </div>

                <ScrollArea className="flex-1 max-h-[320px]">
                  <div className="space-y-0 pr-2">
                    {currentViewWidgets.length === 0 ? (
                      <DropZone
                        position="empty"
                        onDrop={(e) => handlePaletteDrop(e, 0)}
                      />
                    ) : (
                      <>
                        {currentViewWidgets.map((widget, index) => {
                          const WidgetIcon = getWidgetIcon(widget.type);
                          const hasIssue = hasValidationIssue(widget);
                          const isDragging = draggedWidgetId === widget.id;
                          const isDragOver = dragOverWidgetId === widget.id;

                          return (
                            <div key={widget.id}>
                              <DropZone
                                position="before"
                                onDrop={(e) => handlePaletteDrop(e, index)}
                              />
                              <div
                                data-widget-id={widget.id}
                                draggable
                                onDragStart={(e) => handleWidgetDragStart(e, widget.id)}
                                onDragOver={(e) => handleWidgetDragOver(e, widget.id)}
                                onDragEnd={handleWidgetDragEnd}
                                onDrop={handleWidgetDrop}
                                className={cn(
                                  "flex items-center gap-3 p-3 rounded-lg border bg-background transition-all cursor-pointer group",
                                  widget.isActive ? "border-border hover:border-primary/50" : "border-border/50 opacity-60",
                                  selectedWidgetId === widget.id && "border-primary bg-primary/5 ring-2 ring-primary/20",
                                  isDragging && "opacity-50 scale-95",
                                  isDragOver && "border-primary border-dashed bg-primary/10"
                                )}
                                onClick={(e) => { e.stopPropagation(); onSelectWidget(widget.id); }}
                              >
                                <div className="shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground cursor-grab active:cursor-grabbing">
                                  <GripVertical className="w-5 h-5" />
                                </div>
                                <div className={cn(
                                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                                  widget.isActive
                                    ? "bg-gradient-to-br from-primary/20 to-primary/10 text-primary border border-primary/20"
                                    : "bg-muted text-muted-foreground border border-border"
                                )}>
                                  <WidgetIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-semibold text-foreground">
                                      {WIDGET_TYPES.find(t => t.type === widget.type)?.label || widget.type}
                                    </span>
                                    {hasIssue && (
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                                        </TooltipTrigger>
                                        <TooltipContent>Missing required content</TooltipContent>
                                      </Tooltip>
                                    )}
                                    {widget.content?.includeOn && widget.content.includeOn.length > 1 && (
                                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 gap-1">
                                        <Link2 className="w-3 h-3" />
                                        Included in {widget.content.includeOn.length} places
                                      </Badge>
                                    )}
                                    {widget.isLinked && !widget.content?.includeOn && (
                                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-amber-600 border-amber-300">
                                        <Link2 className="w-3 h-3 mr-1" />
                                        Linked
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {widget.content?.header || 'Click to configure'}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                                        <Settings className="w-3.5 h-3.5" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => onSelectWidget(widget.id)}>Edit</DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={(e) => { e.stopPropagation(); onDeleteWidget(widget.id); }}
                                      >
                                        <Trash2 className="w-3.5 h-3.5 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                  <Switch
                                    checked={widget.isActive}
                                    onCheckedChange={() => onToggleWidgetActive(widget.id)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="scale-90"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <DropZone
                          position="after"
                          onDrop={(e) => handlePaletteDrop(e, currentViewWidgets.length)}
                        />
                      </>
                    )}
                  </div>
                </ScrollArea>

                {/* Copy from Toolbar (not needed in toolbar view) */}
              </div>
            </div>
          )}

          {/* Hotspots: Widget List below experience manager */}
          {activeView === 'hotspots' && (
            <div className="border-t border-border">
              <div className="p-5 bg-muted/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-foreground">Hotspot Widgets</h4>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[220px] text-xs">
                        These are all available hotspot widgets. Each experience can choose which widgets to include and where to place their icons.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {hotspotWidgets.filter(w => w.isActive).length} active
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-0">
                  {hotspotWidgets.length === 0 ? (
                    <DropZone
                      position="empty"
                      onDrop={(e) => handlePaletteDrop(e, 0)}
                    />
                  ) : (
                    <>
                      {hotspotWidgets.map((widget, index) => {
                        const WidgetIcon = getWidgetIcon(widget.type);
                        const hasIssue = hasValidationIssue(widget);
                        const isDragging = draggedWidgetId === widget.id;
                        const isDragOver = dragOverWidgetId === widget.id;

                        return (
                          <div key={widget.id}>
                            <DropZone
                              position="before"
                              onDrop={(e) => handlePaletteDrop(e, index)}
                            />
                            <div
                              data-widget-id={widget.id}
                              draggable
                              onDragStart={(e) => handleWidgetDragStart(e, widget.id)}
                              onDragOver={(e) => handleWidgetDragOver(e, widget.id)}
                              onDragEnd={handleWidgetDragEnd}
                              onDrop={handleWidgetDrop}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg border bg-background transition-all cursor-pointer group mb-1",
                                widget.isActive ? "border-border hover:border-primary/50" : "border-border/50 opacity-60",
                                selectedWidgetId === widget.id && "border-primary bg-primary/5 ring-2 ring-primary/20",
                                isDragging && "opacity-50 scale-95",
                                isDragOver && "border-primary border-dashed bg-primary/10"
                              )}
                              onClick={(e) => { e.stopPropagation(); onSelectWidget(widget.id); }}
                            >
                              <div className="shrink-0 text-muted-foreground/40 group-hover:text-muted-foreground cursor-grab">
                                <GripVertical className="w-5 h-5" />
                              </div>
                              <div className={cn(
                                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                                widget.isActive
                                  ? "bg-primary/10 text-primary border border-primary/20"
                                  : "bg-muted text-muted-foreground border border-border"
                              )}>
                                <WidgetIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-sm font-medium text-foreground">
                                    {WIDGET_TYPES.find(t => t.type === widget.type)?.label || widget.type}
                                  </span>
                                  {hasIssue && (
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  )}
                                  {widget.content?.includeOn && widget.content.includeOn.length > 1 && (
                                    <Badge variant="secondary" className="text-[10px] px-1 py-0 gap-1">
                                      <Link2 className="w-2.5 h-2.5" />
                                      {widget.content.includeOn.length} places
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground truncate">
                                  {widget.content?.header || 'Click to configure'}
                                </p>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => e.stopPropagation()}>
                                      <Settings className="w-3.5 h-3.5" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onSelectWidget(widget.id)}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-destructive"
                                      onClick={(e) => { e.stopPropagation(); onDeleteWidget(widget.id); }}
                                    >
                                      <Trash2 className="w-3.5 h-3.5 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <Switch
                                  checked={widget.isActive}
                                  onCheckedChange={() => onToggleWidgetActive(widget.id)}
                                  onClick={(e) => e.stopPropagation()}
                                  className="scale-90"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <DropZone
                        position="after"
                        onDrop={(e) => handlePaletteDrop(e, hotspotWidgets.length)}
                      />
                    </>
                  )}
                </div>

                {/* Copy from Toolbar */}
                {toolbarWidgets.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full gap-2">
                          <Link2 className="w-4 h-4" />
                          Copy from Toolbar
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72 p-0" align="center">
                        <div className="p-3 border-b border-border bg-muted/30">
                          <p className="text-sm font-medium">Copy Toolbar Widget</p>
                          <p className="text-xs text-muted-foreground mt-1">Select a widget to copy to hotspots</p>
                        </div>
                        <ScrollArea className="max-h-[240px]">
                          <div className="p-2 space-y-1">
                            {toolbarWidgets.filter(w => HOTSPOT_WIDGETS.includes(w.type)).map((widget) => {
                              const WidgetIcon = getWidgetIcon(widget.type);
                              const alreadyCopied = hotspotWidgets.some(hw => hw.sourceId === widget.id);
                              return (
                                <div key={widget.id} className={cn("p-2 rounded-lg border", alreadyCopied ? "opacity-50 bg-muted/50" : "bg-background hover:bg-muted/30")}>
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                                      <WidgetIcon className="w-3.5 h-3.5 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium flex-1 truncate">{widget.title}</span>
                                    {alreadyCopied && <Badge variant="secondary" className="text-[10px]">Copied</Badge>}
                                  </div>
                                  {!alreadyCopied && (
                                    <div className="flex gap-1.5">
                                      <Button size="sm" variant="outline" className="flex-1 h-7 text-xs gap-1" onClick={() => handleCopyFromToolbar(widget.id, true)}>
                                        <Link2 className="w-3 h-3" />Linked
                                      </Button>
                                      <Button size="sm" variant="outline" className="flex-1 h-7 text-xs" onClick={() => handleCopyFromToolbar(widget.id, false)}>
                                        Independent
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                            {toolbarWidgets.filter(w => HOTSPOT_WIDGETS.includes(w.type)).length === 0 && (
                              <p className="text-sm text-muted-foreground text-center py-4">No compatible toolbar widgets to copy</p>
                            )}
                          </div>
                        </ScrollArea>
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}

