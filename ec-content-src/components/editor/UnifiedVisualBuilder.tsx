import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useWidgets } from '@/hooks/useWidgets';
import { PropertiesPanel } from './PropertiesPanel';
import { DraggableWidgetPalette, HOTSPOT_WIDGETS, TOOLBAR_WIDGETS, INLINE_WIDGETS, getDefaultHotspotIcon } from './DraggableWidgetPalette';
import { WidgetListItem } from './WidgetListItem';
import { DraggableSidebarWidgetList } from './DraggableSidebarWidgetList';
import { HotspotPreview } from './HotspotPreview';
import { ToolbarPreview } from './ToolbarPreview';
import { CanvasZoomControls } from './CanvasZoomControls';
import { OnboardingModal } from './OnboardingModal';
import { Widget, WIDGET_TYPES, WidgetType } from '@/types/widget';
import { HotspotConfiguration, createExperience, getUnassignedRetailerIds, HotspotExperience } from '@/types/hotspotExperience';
import { ArrowLeft, Image as ImageIcon, Star, Store, LayoutTemplate, Layers, ChevronRight, Plus, Shield, List, ShoppingCart, Search, Filter, Link2, Eye, Trash2, Pencil, Check, X, Unlink, ChevronDown, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { WidgetRenderer } from './WidgetRenderer';

type SidebarView = 'index' | 'add-hero' | 'add-inline' | 'edit';
type HeroView = 'hotspots' | 'toolbar';
type NavView = 'index' | 'products';

// Mock products data
const MOCK_PRODUCTS = [
  { id: '1', name: 'CAI9379TestProduct', sku: '17679345988795', urlCount: 0 },
  { id: '2', name: 'Chefman 6 Liter Digital Air Fryer+ Rotisserie, Dehydrator, &...', sku: '847280012345', urlCount: 3 },
  { id: '3', name: 'Coors Light Beer - 12pk/12 fl oz Cans', sku: '00071990000486', urlCount: 5 },
];

interface Retailer {
  id: string;
  name: string;
  supportsHotspots: boolean;
}

const MOCK_RETAILERS: Retailer[] = [
  { id: 'amazon', name: 'Amazon', supportsHotspots: true },
  { id: 'walmart', name: 'Walmart', supportsHotspots: true },
  { id: 'target', name: 'Target', supportsHotspots: true },
  { id: 'costco', name: 'Costco', supportsHotspots: false },
  { id: 'kroger', name: 'Kroger', supportsHotspots: false },
  { id: 'bestbuy', name: 'Best Buy', supportsHotspots: false },
];

// Initial hotspot configuration state
const generateId = () => Math.random().toString(36).substr(2, 9);

const INITIAL_HOTSPOT_CONFIG: HotspotConfiguration = {
  defaultExperience: { ...createExperience('default', 'Default'), isActive: true },
  experiences: [],
};

// ─── Inline retailer picker modal (used in sidebar) ──────────────────────────
interface SidebarRetailerPickerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  retailers: { id: string; name: string }[];
  preselected: string[];
  disabled: string[];
  disabledReason: (id: string) => string;
  confirmLabel: string;
  allowEmpty?: boolean;
  onConfirm: (ids: string[]) => void;
}

function SidebarRetailerPicker({
  open, onClose, title, description, retailers, preselected, disabled, disabledReason,
  confirmLabel, allowEmpty = false, onConfirm,
}: SidebarRetailerPickerProps) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (open) setSelected(preselected);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open) return null;

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const canConfirm = allowEmpty || selected.length > 0;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-background rounded-xl border border-border shadow-xl w-72 p-4 space-y-3" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground mt-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-1.5 max-h-52 overflow-auto">
          {retailers.map(r => {
            const isDisabled = disabled.includes(r.id);
            const isSelected = selected.includes(r.id);
            const reason = isDisabled ? disabledReason(r.id) : '';
            return (
              <button
                key={r.id}
                disabled={isDisabled}
                onClick={() => toggle(r.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-left transition-all text-xs",
                  isSelected ? "bg-primary/5 border-primary/50 text-foreground" : "border-border hover:border-primary/30 text-foreground",
                  isDisabled && "opacity-40 cursor-not-allowed"
                )}
              >
                <div className={cn("w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-all", isSelected ? "bg-primary border-primary" : "border-border")}>
                  {isSelected && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                </div>
                <span className="flex-1">{r.name}</span>
                {isDisabled && reason && <span className="text-[9px] text-muted-foreground">{reason}</span>}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 text-xs border border-border rounded py-1.5 hover:bg-muted transition-colors">Cancel</button>
          <button
            disabled={!canConfirm}
            onClick={() => { onConfirm(selected); onClose(); }}
            className={cn("flex-1 text-xs rounded py-1.5 transition-colors text-primary-foreground", canConfirm ? "bg-primary hover:bg-primary/90" : "bg-primary/30 cursor-not-allowed")}
          >
            {confirmLabel}{selected.length > 0 ? ` (${selected.length})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}

// (Multi-step modal and CopyFromVariantPicker removed — replaced with inline UX)

// Simple row used in the inline "Add Image Variant" retailer picker
function AddVariantRetailerRow({
  retailer,
  isDisabled,
  isSelected,
  onToggle,
}: {
  retailer: { id: string; name: string };
  isDisabled: boolean;
  isSelected: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      disabled={isDisabled}
      onClick={() => onToggle(retailer.id)}
      className={cn(
        "w-full flex items-center gap-2 px-2 py-1.5 rounded border text-[10px] transition-all text-left",
        isDisabled ? "border-border text-muted-foreground opacity-40 cursor-not-allowed" :
        isSelected ? "border-primary bg-primary/5 text-foreground" :
        "border-border hover:border-primary/30 text-foreground"
      )}
    >
      <div className={cn("w-3 h-3 rounded border flex items-center justify-center shrink-0 transition-all", isSelected ? "bg-primary border-primary" : "border-border")}>
        {isSelected && <Check className="w-2 h-2 text-primary-foreground" />}
      </div>
      <span className="flex-1 font-medium">{retailer.name}</span>
      {isDisabled && <span className="text-[9px] text-muted-foreground">Already assigned</span>}
    </button>
  );
}

export function UnifiedVisualBuilder() {
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
    reorderWidgetsByList,
    toggleWidgetActive,
  } = useWidgets();

  const [heroExpanded, setHeroExpanded] = useState(true);
  const [inlineExpanded, setInlineExpanded] = useState(true);
  const [sidebarView, setSidebarView] = useState<SidebarView>('index');
  const [navView, setNavView] = useState<NavView>('index');
  const [selectedProductId, setSelectedProductId] = useState<string>('1');
  const [heroView, setHeroView] = useState<HeroView>('hotspots');
  // New: active experience ID ('default' or a custom experience id)
  const [activeExperienceId, setActiveExperienceId] = useState<string>('default');
  const [hotspotImagesExpanded, setHotspotImagesExpanded] = useState(true);
  // Per-variant active widget IDs (widgetId -> Set of variant IDs it's active in)
  // We store: for each variant, the overridden positions and icons, loaded from hotspotConfig
  const [hotspotsActive, setHotspotsActive] = useState(true);
  const [toolbarActive, setToolbarActive] = useState(true);
  const [hoveredWidgetId, setHoveredWidgetId] = useState<string | null>(null);
  const [lastAddedWidgetId, setLastAddedWidgetId] = useState<string | null>(null);
  
  // Onboarding modal state - show on first entry
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  // Canvas zoom state
  const [canvasZoom, setCanvasZoom] = useState(0.8);
  const MIN_ZOOM = 0.25;
  const MAX_ZOOM = 1.5;
  const ZOOM_STEP = 0.1;
  
  // Hotspot image-variant configuration (replaces old override system)
  const [hotspotConfig, setHotspotConfig] = useState<HotspotConfiguration>(INITIAL_HOTSPOT_CONFIG);

  // Inline panel states for variant management (no modals)
  const [showAddVariantPicker, setShowAddVariantPicker] = useState(false);
  const [newVariantSelected, setNewVariantSelected] = useState<string[]>([]);
  const [pickerMode, setPickerMode] = useState<'edit' | null>(null);
  const [showCopyFromVariant, setShowCopyFromVariant] = useState(false);
  const [showInlineCopyFromGroup, setShowInlineCopyFromGroup] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const inlineCanvasRef = useRef<HTMLDivElement>(null);
  const heroCanvasRef = useRef<HTMLDivElement>(null);
  const sidebarHeroRef = useRef<HTMLDivElement>(null);
  const sidebarInlineRef = useRef<HTMLDivElement>(null);
  

  const scrollInlineWidgetIntoView = useCallback((widgetId: string) => {
    // Find the widget element directly
    const widgetElement = document.querySelector(
      `[data-widget-id="${widgetId}"]`
    ) as HTMLElement | null;
    
    if (!widgetElement) return;

    // Use native scrollIntoView with center alignment for reliable positioning
    widgetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }, []);

  // Scroll the canvas to the top (for hero widgets)
  const scrollCanvasToTop = useCallback(() => {
    const viewport = document.querySelector(
      '[data-canvas-scrollarea] [data-radix-scroll-area-viewport]'
    ) as HTMLElement | null;
    if (viewport && viewport.scrollTop > 0) {
      viewport.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Handle hover for hero widgets - just set hovered state (no auto-scroll)
  const handleHeroWidgetHover = useCallback((widgetId: string | null) => {
    setHoveredWidgetId(widgetId);
  }, []);

  // Handle hover for inline widgets - just set hovered state (no auto-scroll)
  const handleInlineWidgetHover = useCallback((widgetId: string | null) => {
    setHoveredWidgetId(widgetId);
  }, []);

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    setCanvasZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setCanvasZoom(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  }, []);

  const handleZoomReset = useCallback(() => {
    setCanvasZoom(1);
  }, []);

  // Active experience derived from config
  const activeExperience = useMemo(() => 
    activeExperienceId === 'default'
      ? hotspotConfig.defaultExperience
      : (hotspotConfig.experiences.find(e => e.id === activeExperienceId) ?? hotspotConfig.defaultExperience),
    [activeExperienceId, hotspotConfig]
  );

  // For canvas: use mock image from the active experience
  const currentMockImage = activeExperience.mockImageUrl ?? null;

  // All retailer groups for display
  const allExperiences = useMemo(() => [
    { ...hotspotConfig.defaultExperience, isDefault: true },
    ...hotspotConfig.experiences.map(e => ({ ...e, isDefault: false })),
  ], [hotspotConfig]);

  const unassignedRetailerIds = getUnassignedRetailerIds(
    hotspotConfig,
    MOCK_RETAILERS.filter(r => r.supportsHotspots).map(r => r.id)
  );

  // Filter widgets by section - bidirectional includeOn logic
  const heroWidgets = widgets.filter(w => w.sections.includes('hero'));
  const inlineWidgets = widgets.filter(w => 
    w.sections.includes('inline') || w.content?.includeOn?.includes('inline')
  );
  
  // Inline widgets that should appear in hero sections via includeOn
  const inlineWidgetsForHotspot = widgets.filter(w => 
    w.sections.includes('inline') && w.content?.includeOn?.includes('hotspot')
  );
  const inlineWidgetsForToolbar = widgets.filter(w => 
    w.sections.includes('inline') && w.content?.includeOn?.includes('toolbar')
  );
  
  // Hotspot widgets with per-variant position + icon overrides applied
  const hotspotWidgets = useMemo(() => {
    const baseHotspotWidgets = heroWidgets.filter(w => w.context === 'hotspot');
    const allHotspot = [...baseHotspotWidgets, ...inlineWidgetsForHotspot];
    
    // Apply variant-specific active widget filter (if variant has widgetIds set, only show those)
    const variantWidgetIds = activeExperience.widgetIds;
    const filtered = variantWidgetIds.length > 0
      ? allHotspot.filter(w => variantWidgetIds.includes(w.id))
      : allHotspot;
    
    // Apply variant-specific positions, icon overrides, and per-variant active state
    const inactiveIds = activeExperience.inactiveWidgetIds || [];
    return filtered.map(w => {
      const posOverride = activeExperience.hotspotPositions.find(p => p.widgetId === w.id);
      const iconOverride = activeExperience.iconOverrides[w.id];
      const isVariantInactive = inactiveIds.includes(w.id);
      return {
        ...w,
        isActive: !isVariantInactive,
        content: {
          ...w.content,
          ...(posOverride ? { hotspotPosition: { x: posOverride.x, y: posOverride.y } } : {}),
          ...(iconOverride ? { hotspotIcon: iconOverride } : {}),
        },
      };
    });
  }, [heroWidgets, inlineWidgetsForHotspot, activeExperience]);
  
  // Toolbar widgets - native toolbar widgets + inline widgets with includeOn:toolbar
  const toolbarWidgets = useMemo(() => {
    const nativeToolbarWidgets = heroWidgets.filter(w => w.context === 'toolbar');
    return [...nativeToolbarWidgets, ...inlineWidgetsForToolbar];
  }, [heroWidgets, inlineWidgetsForToolbar]);

  const currentHeroWidgets = heroView === 'hotspots' ? hotspotWidgets : toolbarWidgets;

  // Handle widget selection - opens edit panel and scrolls widget into view
  const handleSelectWidget = useCallback((id: string | null) => {
    setSelectedWidgetId(id);
    if (id) {
      setSidebarView('edit');
      
      // Find the widget to determine if it's hero or inline
      const widget = widgets.find(w => w.id === id);
      if (widget) {
        if (widget.sections.includes('hero') || widget.context === 'hotspot' || widget.context === 'toolbar') {
          // Hero widget - scroll canvas to top
          requestAnimationFrame(() => scrollCanvasToTop());
        } else {
          // Inline widget - scroll into view
          requestAnimationFrame(() => scrollInlineWidgetIntoView(id));
        }
      }
    }
  }, [setSelectedWidgetId, widgets, scrollCanvasToTop, scrollInlineWidgetIntoView]);

  // Helper: update a field on the active variant
  const updateActiveVariant = useCallback((updater: (exp: HotspotExperience) => HotspotExperience) => {
    setHotspotConfig(prev => {
      if (activeExperienceId === 'default') {
        return { ...prev, defaultExperience: updater(prev.defaultExperience) };
      }
      return {
        ...prev,
        experiences: prev.experiences.map(e => e.id === activeExperienceId ? updater(e) : e),
      };
    });
  }, [activeExperienceId]);

  // Handle adding widget from palette
  const handleAddWidget = useCallback((widget: Widget, insertIndex?: number) => {
    // Add random hotspot position for hotspot widgets — store in the active variant
    const defaultX = 20 + Math.random() * 60;
    const defaultY = 20 + Math.random() * 60;
    const defaultIcon = getDefaultHotspotIcon(widget.type);

    const widgetWithPosition = widget.context === 'hotspot'
      ? {
          ...widget,
          content: {
            ...widget.content,
            hotspotPosition: { x: defaultX, y: defaultY },
            hotspotIcon: defaultIcon,
          },
        }
      : widget;
    
    addWidget(widgetWithPosition, insertIndex);

    // If it's a hotspot widget, add it ONLY to the active variant's widgetIds
    // All other variants remain unchanged (new widget won't appear in them)
    if (widget.context === 'hotspot') {
      setHotspotConfig(prev => {
        const addToExp = (exp: HotspotExperience, isActiveExp: boolean): HotspotExperience => {
          if (!isActiveExp) {
            // For all other variants: if they were using "all" (empty widgetIds),
            // freeze their current widget list so the new widget doesn't bleed in
            if (exp.widgetIds.length === 0) {
              const currentIds = widgets.filter(w => w.context === 'hotspot').map(w => w.id);
              return { ...exp, widgetIds: currentIds };
            }
            return exp; // already has explicit list, new widget won't be added
          }
          // Active variant: explicitly add the new widget
          return {
            ...exp,
            widgetIds: [...exp.widgetIds.filter(id => id !== widget.id), widget.id],
            hotspotPositions: [
              ...exp.hotspotPositions.filter(p => p.widgetId !== widget.id),
              { widgetId: widget.id, x: defaultX, y: defaultY },
            ],
            iconOverrides: { ...exp.iconOverrides, [widget.id]: defaultIcon },
          };
        };

        return {
          defaultExperience: addToExp(prev.defaultExperience, activeExperienceId === 'default'),
          experiences: prev.experiences.map(e => addToExp(e, e.id === activeExperienceId)),
        };
      });

      // Also add a corresponding toolbar widget
      const toolbarWidget: Widget = {
        ...widget,
        id: generateId(),
        context: 'toolbar',
        sections: ['hero'],
        content: { ...widget.content },
      };
      addWidget(toolbarWidget);
    }
    
    setSelectedWidgetId(widget.id);
    setLastAddedWidgetId(widget.id);
    setSidebarView('edit');
    
    setTimeout(() => setLastAddedWidgetId(null), 2000);
    
    if (widget.context === 'hotspot' || widget.context === 'toolbar') {
      setTimeout(() => scrollCanvasToTop(), 100);
    } else if (widget.context === 'inline' || widget.sections?.includes('inline')) {
      setTimeout(() => {
        const widgetElement = inlineCanvasRef.current?.querySelector(`[data-widget-id="${widget.id}"]`);
        if (widgetElement) widgetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  }, [addWidget, setSelectedWidgetId, scrollCanvasToTop, updateActiveVariant]);

  // Handle back to widget list
  const handleBackToIndex = useCallback(() => {
    setSelectedWidgetId(null);
    setSidebarView('index');
  }, [setSelectedWidgetId]);

  // Handle section toggle with auto-scroll
  const handleToggleHero = useCallback(() => {
    setHeroExpanded(prev => {
      const newState = !prev;
      if (newState && heroCanvasRef.current) {
        setTimeout(() => {
          heroCanvasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
      return newState;
    });
  }, []);

  const handleToggleInline = useCallback(() => {
    setInlineExpanded(prev => {
      const newState = !prev;
      if (newState && inlineCanvasRef.current) {
        setTimeout(() => {
          inlineCanvasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
      return newState;
    });
  }, []);

  // Get palette context based on current add view
  const getPaletteContext = (): 'hotspot' | 'toolbar' | 'inline' => {
    if (sidebarView === 'add-inline') return 'inline';
    return heroView === 'hotspots' ? 'hotspot' : 'toolbar';
  };

  // Handle container click to deselect and return to widget list
  const handleContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (sidebarRef.current?.contains(e.target as Node)) return;
    const target = e.target as HTMLElement;
    if (target.closest('[data-widget-id]')) return;
    // Also check if clicking on hotspot markers or toolbar icons
    if (target.closest('[data-hotspot-marker]') || target.closest('[data-toolbar-icon]')) return;
    setSelectedWidgetId(null);
    setSidebarView('index');
  }, [setSelectedWidgetId]);

  // Handle image upload - updates the active experience's mock image
  const handleUploadImage = useCallback((imageUrl: string) => {
    setHotspotConfig(prev => {
      if (activeExperienceId === 'default') {
        return { ...prev, defaultExperience: { ...prev.defaultExperience, mockImageUrl: imageUrl } };
      }
      return {
        ...prev,
        experiences: prev.experiences.map(e =>
          e.id === activeExperienceId ? { ...e, mockImageUrl: imageUrl } : e
        ),
      };
    });
  }, [activeExperienceId]);

  // Handle image removal
  const handleRemoveImage = useCallback(() => {
    setHotspotConfig(prev => {
      if (activeExperienceId === 'default') {
        return { ...prev, defaultExperience: { ...prev.defaultExperience, mockImageUrl: undefined } };
      }
      return {
        ...prev,
        experiences: prev.experiences.map(e =>
          e.id === activeExperienceId ? { ...e, mockImageUrl: undefined } : e
        ),
      };
    });
  }, [activeExperienceId]);

  // Add a new retailer group experience
  const handleAddExperience = useCallback((
    assignedRetailerIds: string[],
    name: string,
    startFrom: string = 'blank',
    linkMode: 'linked' | 'unlinked' = 'unlinked'
  ) => {
    const id = generateId();
    
    // Determine widgetIds and widgetLinks from startFrom source
    let widgetIds: string[] = [];
    let widgetLinks: Record<string, 'linked' | 'unlinked'> = {};
    
    if (startFrom !== 'blank') {
      // Get source variant's widget IDs
      const sourceExp = startFrom === 'default'
        ? hotspotConfig.defaultExperience
        : hotspotConfig.experiences.find(e => e.id === startFrom);
      if (sourceExp) {
        const sourceWidgetIds = sourceExp.widgetIds.length > 0
          ? sourceExp.widgetIds
          : widgets.filter(w => w.context === 'hotspot').map(w => w.id);
        widgetIds = sourceWidgetIds;
        widgetLinks = Object.fromEntries(sourceWidgetIds.map(wid => [wid, linkMode]));
      }
    }

    const newExp = createExperience(id, name, assignedRetailerIds, widgetIds, widgetLinks);
    setHotspotConfig(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp],
      // Remove assigned retailers from default's explicit list if set
      defaultExperience: {
        ...prev.defaultExperience,
        assignedRetailerIds: prev.defaultExperience.assignedRetailerIds.filter(
          r => !assignedRetailerIds.includes(r)
        ),
      },
    }));
    setActiveExperienceId(id);
  }, [hotspotConfig, widgets]);

  // Delete an experience (returns retailers to default)
  const handleDeleteExperience = useCallback((id: string) => {
    setHotspotConfig(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id),
    }));
    if (activeExperienceId === id) setActiveExperienceId('default');
  }, [activeExperienceId]);


  // Handle hotspot position update — saves per-variant (not global widget)
  const handleUpdateWidgetPosition = useCallback((widgetId: string, x: number, y: number) => {
    updateActiveVariant(exp => ({
      ...exp,
      hotspotPositions: [
        ...exp.hotspotPositions.filter(p => p.widgetId !== widgetId),
        { widgetId, x, y },
      ],
    }));
  }, [updateActiveVariant]);

  // Toggle link status for a widget in the active variant
  const handleToggleLinkStatus = useCallback((widgetId: string) => {
    updateActiveVariant(exp => {
      const current = exp.widgetLinks[widgetId] ?? 'linked';
      return {
        ...exp,
        widgetLinks: { ...exp.widgetLinks, [widgetId]: current === 'linked' ? 'unlinked' : 'linked' },
      };
    });
  }, [updateActiveVariant]);

  // Remove a widget from the active variant (doesn't delete globally)
  const handleRemoveFromVariant = useCallback((widgetId: string) => {
    updateActiveVariant(exp => ({
      ...exp,
      widgetIds: exp.widgetIds.filter(id => id !== widgetId),
      widgetLinks: Object.fromEntries(Object.entries(exp.widgetLinks).filter(([k]) => k !== widgetId)),
      hotspotPositions: exp.hotspotPositions.filter(p => p.widgetId !== widgetId),
      iconOverrides: Object.fromEntries(Object.entries(exp.iconOverrides).filter(([k]) => k !== widgetId)),
    }));
  }, [updateActiveVariant]);

  // Toggle widget active/inactive per variant (hotspot context only)
  const handleToggleVariantWidgetActive = useCallback((widgetId: string) => {
    updateActiveVariant(exp => {
      const inactiveIds = exp.inactiveWidgetIds || [];
      const isCurrentlyInactive = inactiveIds.includes(widgetId);
      return {
        ...exp,
        inactiveWidgetIds: isCurrentlyInactive
          ? inactiveIds.filter(id => id !== widgetId)
          : [...inactiveIds, widgetId],
      };
    });
  }, [updateActiveVariant]);

  // Handle hotspot icon update — saves per-variant
  const handleUpdateWidgetIcon = useCallback((widgetId: string, iconId: string) => {
    updateActiveVariant(exp => ({
      ...exp,
      iconOverrides: { ...exp.iconOverrides, [widgetId]: iconId },
    }));
  }, [updateActiveVariant]);

  // Onboarding handlers
  const handleStartBlank = useCallback(() => {
    setHasCompletedOnboarding(true);
    // Just close modal, keep empty state
  }, []);

  const handleStartWithWidgets = useCallback((heroWidgets: Widget[], inlineWidgets: Widget[]) => {
    setHasCompletedOnboarding(true);
    // Add all selected widgets
    [...heroWidgets, ...inlineWidgets].forEach(widget => {
      addWidget(widget);
    });
  }, [addWidget]);

  return (
    <div className="flex-1 min-h-0 h-full" onClick={handleContainerClick}>
      <div className="flex h-full">
        {/* Icon Navigation Sidebar - Far Left */}
        <div className="w-12 border-r border-border bg-muted/30 flex flex-col shrink-0">
          <div className="flex flex-col items-center py-3 gap-1">
            <button
              onClick={() => setNavView('index')}
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                navView === 'index' 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title="Widget Index"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setNavView('products')}
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                navView === 'products' 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              title="Products"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Resizable Area */}
        <ResizablePanelGroup direction="horizontal" className="flex-1 min-w-0 overflow-hidden" autoSaveId="visual-builder-layout">
          {/* Sidebar Panel */}
          <ResizablePanel id="sidebar" defaultSize={30} minSize={20} maxSize={40} order={1} className="min-w-0 overflow-hidden">
            <div 
              ref={sidebarRef}
              className="h-full w-full min-w-0 overflow-hidden bg-card border-r border-border flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Products View */}
              {navView === 'products' && (
                <div className="flex flex-col h-full">
                  {/* Products Header */}
                  <div className="shrink-0 px-3 py-2 border-b border-border bg-muted/20 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      <Plus className="w-3 h-3 mr-1" />
                      Add Products
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs h-7 text-destructive hover:text-destructive">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Remove Products
                    </Button>
                  </div>
                  
                  {/* Products Count & Filters */}
                  <div className="shrink-0 px-3 py-2 border-b border-border space-y-2">
                    <p className="text-sm font-medium text-primary">({MOCK_PRODUCTS.length}) Products</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        <Filter className="w-3 h-3 mr-1" />
                        All Filters
                      </Button>
                      <div className="flex-1 relative">
                        <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                          placeholder="Search" 
                          className="h-7 text-xs pl-7"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Products List */}
                  <ScrollArea className="flex-1 min-w-0 w-full">
                    <div className="divide-y divide-border">
                      {MOCK_PRODUCTS.map((product) => (
                        <div
                          key={product.id}
                          className={cn(
                            "p-3 cursor-pointer transition-all",
                            selectedProductId === product.id 
                              ? "bg-primary/5 border-l-2 border-l-primary" 
                              : "hover:bg-muted/50"
                          )}
                          onClick={() => setSelectedProductId(product.id)}
                        >
                          <div className="flex gap-3">
                            <div className="w-14 h-14 bg-muted rounded flex items-center justify-center shrink-0">
                              <ImageIcon className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground line-clamp-2">{product.name}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{product.sku}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                                  <Eye className="w-3 h-3" />
                                  View Product
                                </button>
                                <button className="flex items-center gap-1 text-xs text-destructive hover:underline">
                                  <Trash2 className="w-3 h-3" />
                                  Remove Product
                                </button>
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                <span className="font-medium">{product.urlCount} URLs</span> with Enhanced Content Enabled.
                              </p>
                              <div className="flex items-center gap-3 mt-1">
                                <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                                  <Eye className="w-3 h-3" />
                                  View URLs
                                </button>
                                <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                                  <Link2 className="w-3 h-3" />
                                  Add URLs
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {/* Index View Content */}
              {navView === 'index' && (
                <>
            {/* Edit View - Back Button and Properties */}
            {sidebarView === 'edit' && selectedWidget && (
              <div className="flex flex-col h-full">
                <div className="shrink-0 px-4 py-3 border-b border-border bg-muted/20">
                  <button
                    onClick={handleBackToIndex}
                    className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to widgets
                  </button>
                </div>
                <ScrollArea className="flex-1 min-w-0 w-full">
                  <PropertiesPanel
                    widget={selectedWidget}
                    onUpdate={updateWidget}
                    onClose={handleBackToIndex}
                    onShowPalette={() => setSidebarView(selectedWidget.sections.includes('hero') ? 'add-hero' : 'add-inline')}
                  />
                </ScrollArea>
              </div>
            )}

            {/* Add Widget View */}
            {(sidebarView === 'add-hero' || sidebarView === 'add-inline') && (
              <div className="flex flex-col h-full">
                <div className="shrink-0 px-4 py-3 border-b border-border bg-muted/20">
                  <button
                    onClick={handleBackToIndex}
                    className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to widgets
                  </button>
                </div>
                <DraggableWidgetPalette 
                  context={getPaletteContext()} 
                  onAddWidget={handleAddWidget} 
                />
              </div>
            )}

            {/* Main Index View - Stacked Sections */}
              {sidebarView === 'index' && (
                <ScrollArea className="flex-1 min-w-0 w-full">
                <div>
                  {/* Hero Section */}
                  <div 
                    ref={sidebarHeroRef}
                    className={cn(
                      "transition-colors",
                      heroExpanded ? "bg-card" : "bg-muted/30"
                    )}
                  >
                    <button
                      onClick={handleToggleHero}
                      className="w-full flex items-center gap-1.5 px-3 py-2.5 bg-primary/10 border-b border-primary/20 hover:bg-primary/15 transition-colors"
                    >
                      <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                        <LayoutTemplate className="w-3 h-3 text-primary" />
                      </div>
                      <div className="flex-1 flex items-center">
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] font-bold text-foreground">Above the Fold Content (Hero)</span>
                          <Badge variant="secondary" className="h-3.5 px-1 text-[8px] bg-primary/15 text-primary border-0">
                            {currentHeroWidgets.length}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className={cn(
                        "w-3 h-3 text-primary/70 transition-transform",
                        heroExpanded && "rotate-90"
                      )} />
                    </button>

                    {/* Hero Content - Expanded */}
                    {heroExpanded && (
                      <div className="px-2 pt-3 pb-2 space-y-2 bg-card">
                        {/* Hero Sub-navigation: Hotspot / Toolbar */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-0.5 p-0.5 bg-muted rounded">
                            <button
                              onClick={() => setHeroView('hotspots')}
                              className={cn(
                                "flex-1 text-[9px] font-semibold px-1.5 py-1 rounded transition-all flex items-center justify-center gap-0.5",
                                heroView === 'hotspots' 
                                  ? "bg-primary text-primary-foreground shadow-sm" 
                                  : "text-foreground hover:bg-background/80"
                              )}
                            >
                              <ImageIcon className={cn(
                                "w-2.5 h-2.5",
                                heroView === 'hotspots' ? "text-primary-foreground" : "text-foreground"
                              )} />
                              Hotspots
                            </button>
                            <button
                              onClick={() => setHeroView('toolbar')}
                              className={cn(
                                "flex-1 text-[9px] font-semibold px-1.5 py-1 rounded transition-all flex items-center justify-center gap-0.5",
                                heroView === 'toolbar' 
                                  ? "bg-primary text-primary-foreground shadow-sm" 
                                  : "text-foreground hover:bg-background/80"
                              )}
                            >
                              <Layers className={cn(
                                "w-2.5 h-2.5",
                                heroView === 'toolbar' ? "text-primary-foreground" : "text-foreground"
                              )} />
                              Toolbar
                            </button>
                          </div>

                          {/* Image Variant Selector for Hotspots */}
                          {heroView === 'hotspots' && (
                            <div className="border border-border rounded-lg bg-muted/30 overflow-hidden">
                              <button
                                onClick={() => setHotspotImagesExpanded(v => !v)}
                                className="w-full flex items-center gap-1 px-2 py-1.5 hover:bg-muted/50 transition-colors"
                              >
                                <ChevronRight className={cn("w-2.5 h-2.5 text-muted-foreground transition-transform", hotspotImagesExpanded && "rotate-90")} />
                                <p className="text-[9px] font-semibold text-muted-foreground uppercase tracking-wide flex-1 text-left">Hotspot Images</p>
                                <Badge variant="secondary" className="h-3.5 px-1 text-[8px] bg-muted text-muted-foreground border-0">
                                  {allExperiences.length}
                                </Badge>
                              </button>
                              {hotspotImagesExpanded && <div className="px-2 pb-2 space-y-1.5">
                              <div className="space-y-0.5">
                                {allExperiences.map(exp => {
                                  const expId = exp.isDefault ? 'default' : exp.id;
                                  const isActive = activeExperienceId === expId;
                                  const retailerNames = exp.isDefault
                                    ? unassignedRetailerIds.map(id => MOCK_RETAILERS.find(r => r.id === id)?.name).filter(Boolean) as string[]
                                    : exp.assignedRetailerIds.map(id => MOCK_RETAILERS.find(r => r.id === id)?.name).filter(Boolean) as string[];
                                  // Auto-label: retailer names or fallback
                                  const label = exp.isDefault
                                    ? `Default (${retailerNames.length} Recipient${retailerNames.length !== 1 ? 's' : ''})`
                                    : retailerNames.length > 0
                                      ? retailerNames.slice(0, 2).join(', ') + (retailerNames.length > 2 ? ` +${retailerNames.length - 2}` : '')
                                      : 'No retailers assigned';
                                  return (
                                    <div
                                      key={expId}
                                      className={cn(
                                        "group flex items-center gap-1 px-2 py-1.5 rounded border transition-all text-[10px] cursor-pointer",
                                        isActive
                                          ? "border-primary bg-primary/5"
                                          : "border-border hover:border-primary/30 hover:bg-muted/40"
                                      )}
                                      onClick={() => setActiveExperienceId(expId)}
                                    >
                                      {exp.mockImageUrl ? (
                                        <div className="w-7 h-7 rounded border border-border overflow-hidden shrink-0">
                                          <img src={exp.mockImageUrl} alt="" className="w-full h-full object-cover" />
                                        </div>
                                      ) : (
                                        <div className="w-7 h-7 rounded border border-border shrink-0 flex items-center justify-center bg-muted/30">
                                          <ImageIcon className="w-4 h-4 shrink-0 text-muted-foreground/60" />
                                        </div>
                                      )}
                                      <span className={cn("font-medium flex-1 truncate", isActive ? "text-foreground" : "text-muted-foreground")}>
                                        {label}
                                      </span>
                                      {/* Action buttons */}
                                      <div className={cn("flex items-center gap-0.5 shrink-0", isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100")} onClick={e => e.stopPropagation()}>
                                        <button
                                          onClick={() => { setActiveExperienceId(expId); setPickerMode('edit'); }}
                                          className="w-4 h-4 flex items-center justify-center rounded hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
                                          title="Change retailers"
                                        >
                                          <Pencil className="w-2.5 h-2.5" />
                                        </button>
                                        {!exp.isDefault && (
                                          <button
                                            onClick={() => handleDeleteExperience(expId)}
                                            className="w-4 h-4 flex items-center justify-center rounded hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                                            title="Remove variant"
                                          >
                                            <Trash2 className="w-2.5 h-2.5" />
                                          </button>
                                        )}
                                      </div>
                                      {/* Warning icon when no mock image */}
                                      {!exp.mockImageUrl && (
                                        <AlertCircle className="w-3 h-3 shrink-0 text-destructive" />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              {/* Add new image variant — inline retailer picker */}
                              {!showAddVariantPicker ? (
                                <button
                                  onClick={() => setShowAddVariantPicker(true)}
                                  disabled={MOCK_RETAILERS.filter(r => r.supportsHotspots).every(r => hotspotConfig.experiences.some(e => e.assignedRetailerIds.includes(r.id)))}
                                  className={cn(
                                    "w-full flex items-center justify-center gap-1 text-[9px] font-medium rounded border border-dashed py-1 transition-colors",
                                    "border-primary/40 text-primary hover:bg-primary/5 disabled:opacity-40 disabled:cursor-not-allowed"
                                  )}
                                >
                                  <Plus className="w-2.5 h-2.5" />
                                  Add Image Variant
                                </button>
                              ) : (
                                <div className="border border-primary/30 rounded-lg bg-primary/3 p-2 space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <p className="text-[9px] font-semibold text-foreground uppercase tracking-wide">Select retailers for new variant</p>
                                    <button onClick={() => { setShowAddVariantPicker(false); setNewVariantSelected([]); }} className="text-muted-foreground hover:text-foreground">
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <div className="space-y-1 max-h-32 overflow-auto">
                                    {MOCK_RETAILERS.filter(r => r.supportsHotspots).map(r => {
                                      const isDisabled = hotspotConfig.experiences.some(e => e.assignedRetailerIds.includes(r.id));
                                      const isSelected = newVariantSelected.includes(r.id);
                                      return (
                                        <AddVariantRetailerRow
                                          key={r.id}
                                          retailer={r}
                                          isDisabled={isDisabled}
                                          isSelected={isSelected}
                                          onToggle={(id) => setNewVariantSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
                                        />
                                      );
                                    })}
                                  </div>
                                  <button
                                    disabled={newVariantSelected.length === 0}
                                    onClick={() => {
                                      const names = newVariantSelected.map(id => MOCK_RETAILERS.find(r => r.id === id)?.name || id);
                                      const name = names.join(', ');
                                      handleAddExperience(newVariantSelected, name, 'blank', 'unlinked');
                                      setShowAddVariantPicker(false);
                                      setNewVariantSelected([]);
                                    }}
                                    className={cn(
                                      "w-full text-[9px] rounded py-1.5 transition-colors text-primary-foreground font-medium",
                                      newVariantSelected.length > 0 ? "bg-primary hover:bg-primary/90" : "bg-primary/30 cursor-not-allowed"
                                    )}
                                  >
                                    Create variant{newVariantSelected.length > 0 ? ` (${newVariantSelected.length})` : ''}
                                  </button>
                                </div>
                              )}

                              {/* Picker: edit variant retailers */}
                              <SidebarRetailerPicker
                                open={pickerMode === 'edit'}
                                onClose={() => setPickerMode(null)}
                                title="Change retailers"
                                description={activeExperienceId === 'default'
                                  ? 'The default variant covers all retailers not in another variant.'
                                  : 'Choose which retailers belong to this image variant.'}
                                retailers={MOCK_RETAILERS.filter(r => r.supportsHotspots)}
                                preselected={activeExperienceId === 'default'
                                  ? unassignedRetailerIds
                                  : (hotspotConfig.experiences.find(e => e.id === activeExperienceId)?.assignedRetailerIds ?? [])}
                                disabled={activeExperienceId === 'default'
                                  ? hotspotConfig.experiences.flatMap(e => e.assignedRetailerIds)
                                  : hotspotConfig.experiences.filter(e => e.id !== activeExperienceId).flatMap(e => e.assignedRetailerIds)}
                                disabledReason={() => 'In another variant'}
                                confirmLabel="Save"
                                allowEmpty={activeExperienceId === 'default'}
                                onConfirm={(ids) => {
                                  if (activeExperienceId === 'default') return;
                                  setHotspotConfig(prev => {
                                    const updatedExperiences = prev.experiences.map(e => {
                                      if (e.id === activeExperienceId) return { ...e, assignedRetailerIds: ids };
                                      return { ...e, assignedRetailerIds: e.assignedRetailerIds.filter(r => !ids.includes(r)) };
                                    });
                                    return {
                                      defaultExperience: {
                                        ...prev.defaultExperience,
                                        assignedRetailerIds: prev.defaultExperience.assignedRetailerIds.filter(r => !ids.includes(r)),
                                      },
                                      experiences: updatedExperiences,
                                    };
                                  });
                                }}
                              />
                              </div>}
                            </div>
                          )}

                          {/* Scope Badge for Toolbar */}
                          {heroView === 'toolbar' && (
                            <Badge 
                              variant="outline" 
                              className="text-[8px] px-1 py-0 w-fit bg-muted text-muted-foreground border-muted-foreground/30"
                            >
                              <Store className="w-2 h-2 mr-0.5" />
                              Global
                            </Badge>
                          )}
                        </div>

                        {/* Add Hotspot / Add Widget button */}
                        <button
                          onClick={() => setSidebarView('add-hero')}
                          className="w-full flex items-center justify-center gap-1 bg-primary text-primary-foreground rounded py-1.5 hover:bg-primary/90 transition-colors shadow-sm font-medium"
                        >
                          <Plus className="w-3 h-3" />
                          <span className="text-[10px]">
                            {heroView === 'hotspots' ? 'Add Hotspot' : 'Add Widget'}
                          </span>
                        </button>

                        {/* Inline "Copy from group" panel — grouped by source variant */}
                         {heroView === 'hotspots' && (() => {
                           const allHotspotWidgetIds = widgets.filter(w => w.context === 'hotspot').map(w => w.id);
                           const activeIds = activeExperience.widgetIds.length > 0 ? activeExperience.widgetIds : allHotspotWidgetIds;

                           // Group available widgets by their source variant
                           const otherGroups = allExperiences
                             .filter(exp => exp.id !== activeExperienceId)
                             .map(exp => {
                               const expIds = exp.widgetIds.length > 0 ? exp.widgetIds : allHotspotWidgetIds;
                               const groupWidgets = widgets.filter(
                                 w => w.context === 'hotspot' && expIds.includes(w.id) && !activeIds.includes(w.id)
                               );
                               const label = (exp as any).isDefault
                                 ? 'Default'
                                 : exp.assignedRetailerIds.length > 0
                                   ? MOCK_RETAILERS.filter(r => exp.assignedRetailerIds.slice(0, 2).includes(r.id)).map(r => r.name).join(', ') +
                                     (exp.assignedRetailerIds.length > 2 ? ` +${exp.assignedRetailerIds.length - 2}` : '')
                                   : exp.name;
                               return { exp, label, groupWidgets };
                             })
                             .filter(g => g.groupWidgets.length > 0);

                           if (otherGroups.length === 0) return null;

                           const handleCopyWidget = (w: Widget) => {
                             updateActiveVariant(exp => {
                               const defaultX = 20 + Math.random() * 60;
                               const defaultY = 20 + Math.random() * 60;
                               const defaultIcon = w.content?.hotspotIcon || 'info';
                               return {
                                 ...exp,
                                 widgetIds: [...exp.widgetIds.filter(id => id !== w.id), w.id],
                                 widgetLinks: { ...exp.widgetLinks, [w.id]: 'linked' },
                                 hotspotPositions: [...exp.hotspotPositions.filter(p => p.widgetId !== w.id), { widgetId: w.id, x: defaultX, y: defaultY }],
                                 iconOverrides: { ...exp.iconOverrides, [w.id]: defaultIcon },
                               };
                             });
                           };

                           return (
                             <div>
                               <button
                                 onClick={() => setShowCopyFromVariant(v => !v)}
                                 className="w-full flex items-center justify-between gap-1 text-[9px] font-medium text-muted-foreground hover:text-foreground border border-dashed border-border rounded px-2 py-1.5 hover:border-primary/40 transition-colors"
                               >
                                 <span className="flex items-center gap-1">
                                   <Plus className="w-2.5 h-2.5" />
                                   Copy hotspots from other groups
                                 </span>
                                 <ChevronDown className={cn("w-3 h-3 transition-transform", showCopyFromVariant && "rotate-180")} />
                               </button>
                               {showCopyFromVariant && (
                                 <div className="mt-1 border border-border rounded-lg bg-card p-2 space-y-2">
                                   <p className="text-[9px] text-muted-foreground">Added as linked (global) — can be unlinked after</p>
                                   {otherGroups.map(({ exp, label, groupWidgets }, groupIdx) => (
                                     <div key={exp.id}>
                                       <p className={cn(
                                         "text-[9px] font-semibold text-foreground/50 uppercase tracking-wide px-1 pb-1",
                                         groupIdx > 0 && "pt-2 border-t border-border mt-1"
                                       )}>
                                         {label}
                                       </p>
                                       <div className="space-y-1">
                                         {groupWidgets.map(w => {
                                           const wConfig = WIDGET_TYPES.find(t => t.type === w.type);
                                           return (
                                             <div key={w.id} className="flex items-center gap-2 px-2 py-1.5 rounded border border-border hover:border-primary/30 hover:bg-muted/30 transition-all text-[10px]">
                                               <span className="flex-1 font-medium truncate">{w.title}</span>
                                               <span className="text-muted-foreground shrink-0 text-[9px]">{wConfig?.label}</span>
                                               <button
                                                 onClick={() => handleCopyWidget(w)}
                                                 className="shrink-0 flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                                               >
                                                 <Plus className="w-2.5 h-2.5" />
                                                 Copy
                                               </button>
                                             </div>
                                           );
                                         })}
                                       </div>
                                     </div>
                                   ))}
                                 </div>
                               )}
                             </div>
                           );
                         })()}


                        {/* Hero Widget List */}
                        {currentHeroWidgets.length > 0 ? (
                          <div>
                            <DraggableSidebarWidgetList
                              widgets={currentHeroWidgets}
                              selectedWidgetId={selectedWidgetId}
                              hoveredWidgetId={hoveredWidgetId}
                              onSelectWidget={handleSelectWidget}
                              onToggleActive={heroView === 'hotspots' ? handleToggleVariantWidgetActive : toggleWidgetActive}
                              onUpdateIcon={handleUpdateWidgetIcon}
                              onOpenSettings={() => setSidebarView('edit')}
                              onReorder={reorderWidgetsByList}
                              onHoverWidget={handleHeroWidgetHover}
                              onDeleteWidget={deleteWidget}
                              showIconPicker={heroView === 'hotspots'}
                              context={heroView === 'hotspots' ? 'hotspot' : 'toolbar'}
                              variantWidgetLinks={heroView === 'hotspots' ? activeExperience.widgetLinks : {}}
                              onToggleLinkStatus={heroView === 'hotspots' && activeExperience.widgetIds.length > 0 ? handleToggleLinkStatus : undefined}
                              onRemoveFromVariant={heroView === 'hotspots' && activeExperience.widgetIds.length > 0 ? handleRemoveFromVariant : undefined}
                            />
                          </div>
                        ) : (
                          <div className="text-center py-2 text-muted-foreground">
                            <p className="text-[10px]">No {heroView} widgets yet</p>
                            <p className="text-[9px] mt-0.5">
                              {heroView === 'hotspots' && activeExperienceId !== 'default'
                                ? 'Add new or copy from another variant'
                                : 'Click "Add" to get started'}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Divider between Hero and Inline */}
                  <div className="border-t-2 border-muted-foreground/30" />

                  {/* Inline Section */}
                  <div 
                    ref={sidebarInlineRef}
                    className={cn(
                      "transition-colors",
                      inlineExpanded ? "bg-card" : "bg-muted/30"
                    )}
                  >
                    <button
                      onClick={handleToggleInline}
                      className="w-full flex items-center gap-1.5 px-3 py-2.5 bg-primary/10 border-b border-primary/20 hover:bg-primary/15 transition-colors"
                    >
                      <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                        <Layers className="w-3 h-3 text-primary" />
                      </div>
                      <div className="flex-1 flex items-center">
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] font-bold text-foreground">Below the Fold Content (In-Line)</span>
                          <Badge variant="secondary" className="h-3.5 px-1 text-[8px] bg-primary/15 text-primary border-0">
                            {inlineWidgets.length}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className={cn(
                        "w-3 h-3 text-primary/70 transition-transform",
                        inlineExpanded && "rotate-90"
                      )} />
                    </button>

                    {/* Inline Content - Expanded */}
                    {inlineExpanded && (
                      <div className="px-2 pt-3 pb-2 space-y-2 bg-card">
                        {/* Global Scope Badge */}
                        <Badge 
                          variant="outline" 
                          className="text-[8px] px-1 py-0 w-fit bg-secondary text-secondary-foreground border-border"
                        >
                          <Store className="w-2 h-2 mr-0.5" />
                          Global
                        </Badge>

                        {/* Add Widget Button */}
                        <button
                          onClick={() => setSidebarView('add-inline')}
                          className="w-full flex items-center justify-center gap-1 bg-primary text-primary-foreground rounded py-1.5 hover:bg-primary/90 transition-colors shadow-sm font-medium"
                        >
                          <Plus className="w-3 h-3" />
                          <span className="text-[10px]">Add Widget</span>
                        </button>

                        {/* Copy from hotspot groups panel */}
                        {(() => {
                          const inlineIds = new Set(inlineWidgets.map(w => w.id));

                          // Group widgets by their source hotspot variant
                          const groups = allExperiences
                            .map(exp => {
                              const allHotspotIds = widgets.filter(w => w.context === 'hotspot').map(w => w.id);
                              const expIds = exp.widgetIds.length > 0 ? exp.widgetIds : allHotspotIds;
                              const groupWidgets = widgets.filter(
                                w => w.context === 'hotspot' && expIds.includes(w.id) && !inlineIds.has(w.id)
                              );
                              const label = (exp as any).isDefault
                                ? 'Default'
                                : exp.assignedRetailerIds.length > 0
                                  ? MOCK_RETAILERS.filter(r => exp.assignedRetailerIds.slice(0, 2).includes(r.id)).map(r => r.name).join(', ') +
                                    (exp.assignedRetailerIds.length > 2 ? ` +${exp.assignedRetailerIds.length - 2}` : '')
                                  : exp.name;
                              return { exp, label, groupWidgets };
                            })
                            .filter(g => g.groupWidgets.length > 0);

                          // Deduplicate widgets that appear in multiple groups
                          const seenIds = new Set<string>();
                          const dedupedGroups = groups.map(g => ({
                            ...g,
                            groupWidgets: g.groupWidgets.filter(w => {
                              if (seenIds.has(w.id)) return false;
                              seenIds.add(w.id);
                              return true;
                            }),
                          })).filter(g => g.groupWidgets.length > 0);

                          if (dedupedGroups.length === 0) return null;

                          const handleCopyToInline = (w: Widget) => {
                            const inlineVersion: Widget = {
                              ...w,
                              id: Math.random().toString(36).substr(2, 9),
                              sections: ['inline'],
                              context: undefined,
                              order: inlineWidgets.length,
                            };
                            addWidget(inlineVersion);
                          };

                          return (
                            <div>
                              <button
                                onClick={() => setShowInlineCopyFromGroup(v => !v)}
                                className="w-full flex items-center justify-between gap-1 text-[9px] font-medium text-muted-foreground hover:text-foreground border border-dashed border-border rounded px-2 py-1.5 hover:border-primary/40 transition-colors"
                              >
                                <span className="flex items-center gap-1">
                                  <Plus className="w-2.5 h-2.5" />
                                  Copy from hotspot groups
                                </span>
                                <ChevronDown className={cn("w-3 h-3 transition-transform", showInlineCopyFromGroup && "rotate-180")} />
                              </button>
                              {showInlineCopyFromGroup && (
                                <div className="mt-1 border border-border rounded-lg bg-card p-2 space-y-2">
                                  <p className="text-[9px] text-muted-foreground">Added as a new inline widget copy</p>
                                  {dedupedGroups.map(({ exp, label, groupWidgets }, groupIdx) => (
                                    <div key={exp.id}>
                                      <p className={cn(
                                        "text-[9px] font-semibold text-foreground/50 uppercase tracking-wide px-1 pb-1",
                                        groupIdx > 0 && "pt-2 border-t border-border mt-1"
                                      )}>
                                        {label}
                                      </p>
                                      <div className="space-y-1">
                                        {groupWidgets.map(w => {
                                          const wConfig = WIDGET_TYPES.find(t => t.type === w.type);
                                          return (
                                            <div key={w.id} className="flex items-center gap-2 px-2 py-1.5 rounded border border-border hover:border-primary/30 hover:bg-muted/30 transition-all text-[10px]">
                                              <span className="flex-1 font-medium truncate">{w.title}</span>
                                              <span className="text-muted-foreground shrink-0 text-[9px]">{wConfig?.label}</span>
                                              <button
                                                onClick={() => handleCopyToInline(w)}
                                                className="shrink-0 flex items-center gap-0.5 text-[9px] px-1.5 py-0.5 rounded border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                                              >
                                                <Plus className="w-2.5 h-2.5" />
                                                Copy
                                              </button>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })()}

                        {/* Inline Widget List */}
                        {inlineWidgets.length > 0 ? (
                          <DraggableSidebarWidgetList
                            widgets={inlineWidgets}
                            selectedWidgetId={selectedWidgetId}
                            hoveredWidgetId={hoveredWidgetId}
                            onSelectWidget={handleSelectWidget}
                            onToggleActive={toggleWidgetActive}
                            onOpenSettings={() => setSidebarView('edit')}
                            onReorder={reorderWidgetsByList}
                            onHoverWidget={handleInlineWidgetHover}
                            onDeleteWidget={deleteWidget}
                            context="inline"
                          />
                        ) : (
                          <div className="text-center py-2 text-muted-foreground">
                            <p className="text-[10px]">No inline widgets yet</p>
                            <p className="text-[9px] mt-0.5">Click "Add" to get started</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            )}
              </>
              )}
            </div>
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-border hover:bg-primary/50 transition-colors data-[resize-handle-active]:bg-primary" />

        {/* Main Canvas - Right Side */}
        <ResizablePanel id="canvas" defaultSize={70} minSize={50} order={2} className="min-w-0 overflow-hidden">
          <div className="relative h-full min-w-0 overflow-hidden">
            {/* Zoom Controls - Fixed position in top right */}
            <div className="absolute top-4 right-4 z-10">
              <CanvasZoomControls
                zoom={canvasZoom}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onReset={handleZoomReset}
                minZoom={MIN_ZOOM}
                maxZoom={MAX_ZOOM}
              />
            </div>
            
            <ScrollArea className="h-full min-w-0" data-canvas-scrollarea>
              <div 
                className="max-w-5xl mx-auto p-6 space-y-6 origin-top transition-transform duration-200"
                style={{ 
                  transform: `scale(${canvasZoom})`,
                  width: canvasZoom < 1 ? `${100 / canvasZoom}%` : undefined,
                }}
              >
                {/* Above the Fold Content (Hero) Section */}
              <div 
                className="space-y-3 cursor-pointer" 
                ref={heroCanvasRef}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!heroExpanded) setHeroExpanded(true);
                  // Auto-scroll sidebar to Hero section
                  setTimeout(() => {
                    sidebarHeroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
                }}
              >
                <h2 className="text-sm font-semibold text-primary">Above the Fold Content (Hero)</h2>
                
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="grid grid-cols-2 gap-0">
                    {/* Hero Preview Area */}
                    <div className="p-4 border-r border-border space-y-3">
                      {heroView === 'hotspots' ? (
                        <HotspotPreview
                          widgets={hotspotWidgets}
                          selectedWidgetId={selectedWidgetId}
                          hoveredWidgetId={hoveredWidgetId}
                          onSelectWidget={handleSelectWidget}
                          onHoverWidget={setHoveredWidgetId}
                          isActive={hotspotsActive}
                          onToggleActive={setHotspotsActive}
                          mockImage={currentMockImage}
                          onUploadImage={handleUploadImage}
                          onRemoveImage={handleRemoveImage}
                          onUpdateWidgetPosition={handleUpdateWidgetPosition}
                          isReadOnly={false}
                        />
                      ) : (
                        <ToolbarPreview
                          widgets={toolbarWidgets}
                          selectedWidgetId={selectedWidgetId}
                          hoveredWidgetId={hoveredWidgetId}
                          onSelectWidget={handleSelectWidget}
                          onHoverWidget={setHoveredWidgetId}
                          isActive={toolbarActive}
                          onToggleActive={setToolbarActive}
                        />
                      )}
                    </div>
                    
                    {/* Product Details Mockup */}
                    <div className="p-6 space-y-4">
                      <p className="text-xs text-muted-foreground">Sample Brand Name</p>
                      <h1 className="text-xl font-semibold text-muted-foreground/80">
                        Sample Product Name That Can Be Long and Descriptive
                      </h1>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Item 1234567</span>
                        <span>|</span>
                        <span>Model 12345678890</span>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className={cn("w-4 h-4", i <= 4 ? "fill-amber-400 text-amber-400" : "fill-amber-400/50 text-amber-400/50")} />
                        ))}
                        <span className="text-sm font-medium ml-1">4.9</span>
                        <span className="text-xs text-muted-foreground">(1,234 reviews)</span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-muted-foreground">$</span>
                        <span className="text-4xl font-light text-muted-foreground/70">999.99</span>
                      </div>
                      
                      {/* Size options */}
                      <div className="flex gap-2">
                        {['Size Option', 'Size Option', 'Size Option'].map((label, i) => (
                          <button key={i} className="px-4 py-2 text-xs border border-border rounded bg-muted/30 text-muted-foreground">
                            {label}
                          </button>
                        ))}
                      </div>
                      
                      {/* Add to Cart */}
                      <button className="w-full py-3 bg-blue-400/70 text-white rounded font-medium text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-dashed border-border" />

              {/* Below the Fold Content (In-Line) Section */}
              <div 
                className="space-y-3 cursor-pointer" 
                ref={inlineCanvasRef}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!inlineExpanded) setInlineExpanded(true);
                  // Auto-scroll sidebar to Inline section
                  setTimeout(() => {
                    sidebarInlineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
                }}
              >
                <h2 className="text-sm font-semibold text-primary">Below the Fold Content (In-Line)</h2>
                
                <div className="bg-card rounded-xl border border-border overflow-hidden min-h-[600px]">
                  {inlineWidgets.length === 0 ? (
                    <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                      <p className="text-sm">Inline content widgets will appear here</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {inlineWidgets.map((widget) => (
                        <div
                          key={widget.id}
                          data-widget-id={widget.id}
                          onClick={() => handleSelectWidget(widget.id)}
                          onMouseEnter={() => setHoveredWidgetId(widget.id)}
                          onMouseLeave={() => setHoveredWidgetId(null)}
                          className={cn(
                            "cursor-pointer transition-all duration-200",
                            selectedWidgetId === widget.id 
                              ? "ring-2 ring-inset ring-primary shadow-lg" 
                              : hoveredWidgetId === widget.id
                                ? "ring-2 ring-inset ring-primary/50 bg-primary/5 shadow-md"
                                : "hover:bg-muted/30",
                            widget.id === lastAddedWidgetId && "animate-highlight-new"
                          )}
                        >
                          <WidgetRenderer widget={widget} onUpdateWidget={updateWidget} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal
        open={showOnboarding && !hasCompletedOnboarding}
        onOpenChange={setShowOnboarding}
        onStartBlank={handleStartBlank}
        onStartWithWidgets={handleStartWithWidgets}
      />
    </div>
  );
}
