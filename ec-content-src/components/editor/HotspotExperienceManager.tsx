import { useState, useRef, useCallback } from 'react';
import {
  Plus, Trash2, Copy, X, AlertCircle, Users, Shield,
  MousePointer2, Info, Check, Store, ImageIcon, Replace,
  ChevronRight, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip, TooltipContent, TooltipTrigger, TooltipProvider
} from '@/components/ui/tooltip';
import {
  Popover, PopoverContent, PopoverTrigger
} from '@/components/ui/popover';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
  HotspotExperience, WidgetHotspotPosition, createExperience,
  getUnassignedRetailerIds, HotspotConfiguration
} from '@/types/hotspotExperience';
import { AddAssetsModal } from './AddAssetsModal';
import { ImageItem } from '@/types/widget';
import sampleProductImage from '@/assets/sample-product.png';
import { HotspotIconDisplay } from './HotspotIconPicker';

interface Retailer {
  id: string;
  name: string;
  supportsHotspots: boolean;
  supportsToolbar: boolean;
}

interface HotspotWidget {
  id: string;
  title: string;
  type: string;
}

interface HotspotExperienceManagerProps {
  config: HotspotConfiguration;
  hotspotRetailers: Retailer[];
  /** All available hotspot widgets (global pool) */
  widgets: HotspotWidget[];
  selectedWidgetId: string | null;
  hoveredWidgetId?: string | null;
  onSelectWidget: (id: string) => void;
  onConfigChange: (config: HotspotConfiguration) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// ─── Retailer Picker Dialog ──────────────────────────────────────────────────

interface RetailerPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  hotspotRetailers: Retailer[];
  preselectedIds?: string[];
  disabledIds?: string[];
  disabledReason?: (retailerId: string) => string;
  confirmLabel?: string;
  allowEmpty?: boolean;
  onConfirm: (selectedIds: string[]) => void;
}

function RetailerPickerDialog({
  open,
  onOpenChange,
  title,
  description,
  hotspotRetailers,
  preselectedIds = [],
  disabledIds = [],
  disabledReason,
  confirmLabel = 'Confirm',
  allowEmpty = false,
  onConfirm,
}: RetailerPickerDialogProps) {
  const [selected, setSelected] = useState<string[]>(preselectedIds);

  // Reset selection when dialog opens
  const handleOpenChange = (open: boolean) => {
    if (open) setSelected(preselectedIds);
    onOpenChange(open);
  };

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const canConfirm = allowEmpty || selected.length > 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-1.5 py-2">
          {hotspotRetailers.map(retailer => {
            const isDisabled = disabledIds.includes(retailer.id);
            const isSelected = selected.includes(retailer.id);
            const disabledMsg = isDisabled && disabledReason ? disabledReason(retailer.id) : '';

            return (
              <button
                key={retailer.id}
                disabled={isDisabled}
                onClick={() => toggle(retailer.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all",
                  isSelected
                    ? "bg-primary/5 border-primary/50 text-foreground"
                    : "bg-background border-border text-foreground hover:border-primary/30",
                  isDisabled && "opacity-40 cursor-not-allowed"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all",
                  isSelected ? "bg-primary border-primary" : "border-border"
                )}>
                  {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span className="text-sm flex-1">{retailer.name}</span>
                {isDisabled && disabledMsg && (
                  <span className="text-[10px] text-muted-foreground">{disabledMsg}</span>
                )}
              </button>
            );
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={!canConfirm} onClick={() => { onConfirm(selected); onOpenChange(false); }}>
            {confirmLabel}
            {selected.length > 0 && ` (${selected.length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Widget Picker for per-experience widget selection ────────────────────────

interface WidgetPickerProps {
  allWidgets: HotspotWidget[];
  selectedWidgetIds: string[];
  onToggle: (id: string) => void;
}

function ExperienceWidgetPicker({ allWidgets, selectedWidgetIds, onToggle }: WidgetPickerProps) {
  if (allWidgets.length === 0) {
    return (
      <p className="text-xs text-muted-foreground italic py-2 text-center">
        No hotspot widgets yet. Add widgets below.
      </p>
    );
  }
  return (
    <div className="space-y-1">
      {allWidgets.map(widget => {
        const isIncluded = selectedWidgetIds.includes(widget.id);
        return (
          <button
            key={widget.id}
            onClick={() => onToggle(widget.id)}
            className={cn(
              "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg border text-left transition-all text-xs",
              isIncluded
                ? "bg-primary/5 border-primary/40 text-foreground"
                : "bg-background border-border text-muted-foreground hover:text-foreground hover:border-primary/20"
            )}
          >
            <div className={cn(
              "w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0",
              isIncluded ? "bg-primary border-primary" : "border-border"
            )}>
              {isIncluded && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
            </div>
            <span className="flex-1 truncate">{widget.title}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function HotspotExperienceManager({
  config,
  hotspotRetailers,
  widgets,
  selectedWidgetId,
  hoveredWidgetId,
  onSelectWidget,
  onConfigChange,
}: HotspotExperienceManagerProps) {
  const [activeExperienceId, setActiveExperienceId] = useState<string>('default');
  const [showAssetModal, setShowAssetModal] = useState<{ experienceId: string } | null>(null);
  const [showCopyMenu, setShowCopyMenu] = useState<string | null>(null);
  const [showWidgetPicker, setShowWidgetPicker] = useState(false);

  // Retailer picker dialogs
  const [retailerPickerMode, setRetailerPickerMode] = useState<
    'new-experience' | 'edit-default' | 'edit-experience' | null
  >(null);

  // Drag state for hotspot markers
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);

  const allExperiences = [
    { ...config.defaultExperience, isDefault: true },
    ...config.experiences.map(e => ({ ...e, isDefault: false })),
  ];

  const activeExperience = activeExperienceId === 'default'
    ? config.defaultExperience
    : config.experiences.find(e => e.id === activeExperienceId) || config.defaultExperience;

  const unassignedRetailers = getUnassignedRetailerIds(
    config,
    hotspotRetailers.map(r => r.id)
  );

  // The widgets active in the current experience
  // If widgetIds is empty, all widgets are included (for backward compat)
  const activeExpWidgets = activeExperience.widgetIds.length === 0
    ? widgets
    : widgets.filter(w => activeExperience.widgetIds.includes(w.id));

  // ─── Experience mutations ──────────────────────────────────────────────────

  const updateExperience = useCallback((id: string, updates: Partial<HotspotExperience>) => {
    if (id === 'default') {
      onConfigChange({ ...config, defaultExperience: { ...config.defaultExperience, ...updates } });
    } else {
      onConfigChange({
        ...config,
        experiences: config.experiences.map(e => e.id === id ? { ...e, ...updates } : e),
      });
    }
  }, [config, onConfigChange]);

  const addExperience = useCallback((assignedRetailerIds: string[]) => {
    const id = generateId();
    // New experience inherits widget IDs from default (or all widgets)
    const inheritedWidgetIds = config.defaultExperience.widgetIds.length > 0
      ? [...config.defaultExperience.widgetIds]
      : widgets.map(w => w.id);
    const newExp = createExperience(
      id,
      `Experience ${config.experiences.length + 1}`,
      assignedRetailerIds,
      inheritedWidgetIds,
    );
    // Remove assigned retailers from other experiences
    const updatedExperiences = config.experiences.map(e => ({
      ...e,
      assignedRetailerIds: e.assignedRetailerIds.filter(r => !assignedRetailerIds.includes(r)),
    }));
    // Also remove from default's assignedRetailerIds if set
    const updatedDefault = {
      ...config.defaultExperience,
      assignedRetailerIds: config.defaultExperience.assignedRetailerIds.filter(
        r => !assignedRetailerIds.includes(r)
      ),
    };
    onConfigChange({ defaultExperience: updatedDefault, experiences: [...updatedExperiences, newExp] });
    setActiveExperienceId(id);
  }, [config, widgets, onConfigChange]);

  const deleteExperience = useCallback((id: string) => {
    onConfigChange({ ...config, experiences: config.experiences.filter(e => e.id !== id) });
    if (activeExperienceId === id) setActiveExperienceId('default');
  }, [config, activeExperienceId, onConfigChange]);

  const copyExperience = useCallback((fromId: string, toId: string) => {
    const source = fromId === 'default'
      ? config.defaultExperience
      : config.experiences.find(e => e.id === fromId);
    if (!source) return;
    updateExperience(toId, {
      mockImageUrl: source.mockImageUrl,
      mockImageName: source.mockImageName,
      hotspotPositions: source.hotspotPositions.map(p => ({ ...p })),
      iconOverrides: { ...source.iconOverrides },
      widgetIds: [...source.widgetIds],
    });
    setShowCopyMenu(null);
  }, [config, updateExperience]);

  // ─── Retailer assignment ───────────────────────────────────────────────────

  const handleRetailerPickerConfirm = useCallback((mode: typeof retailerPickerMode, selected: string[]) => {
    if (mode === 'new-experience') {
      addExperience(selected);
    } else if (mode === 'edit-default') {
      // Setting default's explicit retailer list — remove them from custom experiences
      const updatedExperiences = config.experiences.map(e => ({
        ...e,
        assignedRetailerIds: e.assignedRetailerIds.filter(r => !selected.includes(r)),
      }));
      onConfigChange({
        ...config,
        defaultExperience: { ...config.defaultExperience, assignedRetailerIds: selected },
        experiences: updatedExperiences,
      });
    } else if (mode === 'edit-experience') {
      // Move selected retailers into this experience, remove from others
      const updatedExperiences = config.experiences.map(e => {
        if (e.id === activeExperienceId) {
          return { ...e, assignedRetailerIds: selected };
        }
        return {
          ...e,
          assignedRetailerIds: e.assignedRetailerIds.filter(r => !selected.includes(r)),
        };
      });
      const updatedDefault = {
        ...config.defaultExperience,
        assignedRetailerIds: config.defaultExperience.assignedRetailerIds.filter(
          r => !selected.includes(r)
        ),
      };
      onConfigChange({ defaultExperience: updatedDefault, experiences: updatedExperiences });
    }
    setRetailerPickerMode(null);
  }, [activeExperienceId, config, addExperience, onConfigChange]);

  // ─── Widget selection per experience ──────────────────────────────────────

  const toggleExperienceWidget = useCallback((widgetId: string) => {
    const current = activeExperience.widgetIds.length === 0
      ? widgets.map(w => w.id)
      : activeExperience.widgetIds;
    const next = current.includes(widgetId)
      ? current.filter(id => id !== widgetId)
      : [...current, widgetId];
    updateExperience(activeExperienceId, { widgetIds: next });
  }, [activeExperience.widgetIds, widgets, activeExperienceId, updateExperience]);

  // ─── Image management ──────────────────────────────────────────────────────

  const handleAssetSelected = useCallback((assets: ImageItem[]) => {
    if (!showAssetModal || assets.length === 0 || !assets[0].url) return;
    updateExperience(showAssetModal.experienceId, {
      mockImageUrl: assets[0].url,
      mockImageName: assets[0].url.split('/').pop() || 'image',
    });
    setShowAssetModal(null);
  }, [showAssetModal, updateExperience]);

  // ─── Hotspot marker dragging ───────────────────────────────────────────────

  const handleMarkerMouseDown = useCallback((e: React.MouseEvent, widgetId: string) => {
    if (!containerRef.current) return;
    e.preventDefault(); e.stopPropagation();
    const rect = containerRef.current.getBoundingClientRect();
    const pos = activeExperience.hotspotPositions.find(p => p.widgetId === widgetId);
    const currentX = ((pos?.x ?? 50) / 100) * rect.width;
    const currentY = ((pos?.y ?? 50) / 100) * rect.height;
    setDragOffset({ x: e.clientX - rect.left - currentX, y: e.clientY - rect.top - currentY });
    setDraggingId(widgetId);
    onSelectWidget(widgetId);
  }, [activeExperience.hotspotPositions, onSelectWidget]);

  const handleCanvasMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || !draggingId) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100));
    const newPositions = activeExperience.hotspotPositions.map(p =>
      p.widgetId === draggingId ? { ...p, x, y } : p
    );
    if (!newPositions.find(p => p.widgetId === draggingId)) {
      newPositions.push({ widgetId: draggingId, x, y });
    }
    updateExperience(activeExperienceId, { hotspotPositions: newPositions });
  }, [draggingId, dragOffset, activeExperience.hotspotPositions, activeExperienceId, updateExperience]);

  const handleCanvasMouseUp = useCallback(() => setDraggingId(null), []);

  // Ensure all active-experience widgets have a hotspot position
  const ensurePositions = useCallback(() => {
    const missing = activeExpWidgets.filter(
      w => !activeExperience.hotspotPositions.find(p => p.widgetId === w.id)
    );
    if (missing.length === 0) return;
    const newPositions: WidgetHotspotPosition[] = missing.map(w => ({
      widgetId: w.id, x: 20 + Math.random() * 60, y: 20 + Math.random() * 60,
    }));
    updateExperience(activeExperienceId, {
      hotspotPositions: [...activeExperience.hotspotPositions, ...newPositions],
    });
  }, [activeExpWidgets, activeExperience, activeExperienceId, updateExperience]);

  if (activeExpWidgets.some(w => !activeExperience.hotspotPositions.find(p => p.widgetId === w.id))) {
    ensurePositions();
  }

  // ─── Retailers that are locked to other experiences (for picker) ──────────

  const getRetailersDisabledForNewExp = () =>
    config.experiences.flatMap(e => e.assignedRetailerIds);

  const getRetailersDisabledForExp = (expId: string) =>
    config.experiences
      .filter(e => e.id !== expId)
      .flatMap(e => e.assignedRetailerIds);

  // ─── Render: Experience tab ────────────────────────────────────────────────

  const renderExperienceTab = (exp: HotspotExperience & { isDefault: boolean }) => {
    const expId = exp.isDefault ? 'default' : exp.id;
    const isActive = activeExperienceId === expId;

    // Retailer names shown for this tab
    const retailerNames = exp.isDefault
      ? unassignedRetailers.map(id => hotspotRetailers.find(r => r.id === id)?.name).filter(Boolean)
      : exp.assignedRetailerIds.map(id => hotspotRetailers.find(r => r.id === id)?.name).filter(Boolean);

    return (
      <button
        key={expId}
        onClick={() => setActiveExperienceId(expId)}
        className={cn(
          "w-full text-left px-3 py-2.5 rounded-lg border transition-all",
          isActive
            ? "border-primary bg-primary/5 shadow-sm"
            : "border-border hover:border-primary/40 hover:bg-muted/40"
        )}
      >
        <div className="flex items-center gap-2">
          {exp.mockImageUrl ? (
            <div className={cn(
              "w-8 h-8 rounded border overflow-hidden shrink-0",
              isActive ? "border-primary" : "border-border"
            )}>
              <img src={exp.mockImageUrl} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className={cn(
              "w-8 h-8 rounded border overflow-hidden shrink-0 flex items-center justify-center bg-muted/50",
              isActive ? "border-primary" : "border-border"
            )}>
              <ImageIcon className={cn("w-3.5 h-3.5", isActive ? "text-primary" : "text-muted-foreground")} />
            </div>
          )}
          <span className={cn("text-xs font-semibold flex-1 truncate", isActive ? "text-primary" : "text-foreground")}>
            {exp.isDefault ? 'Default' : exp.name}
          </span>
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
        </div>
        {retailerNames.length > 0 ? (
          <p className="text-[10px] text-muted-foreground mt-0.5 truncate pl-10">
            {retailerNames.slice(0, 2).join(', ')}{retailerNames.length > 2 ? ` +${retailerNames.length - 2}` : ''}
          </p>
        ) : exp.isDefault ? (
          <p className="text-[10px] text-muted-foreground mt-0.5 pl-10">All unassigned retailers</p>
        ) : (
          <p className="text-[10px] text-amber-600 mt-0.5 pl-10">No retailers assigned</p>
        )}
      </button>
    );
  };

  // ─── Render: Canvas ────────────────────────────────────────────────────────

  const renderCanvas = () => {
    const hasImage = !!activeExperience.mockImageUrl;
    return (
      <div
        ref={containerRef}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={() => { handleCanvasMouseUp(); setIsHoveringCanvas(false); }}
        onMouseEnter={() => setIsHoveringCanvas(true)}
        className="relative aspect-square rounded-xl border border-border overflow-hidden bg-muted/30"
      >
        {hasImage ? (
          <>
            <img src={activeExperience.mockImageUrl} alt="Mock hero" className="w-full h-full object-cover" />
            <div className={cn(
              "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 transition-opacity",
              isHoveringCanvas ? "opacity-100" : "opacity-0"
            )}>
              <Button variant="secondary" size="sm" className="gap-1.5 shadow-lg"
                onClick={() => setShowAssetModal({ experienceId: activeExperienceId })}>
                <Replace className="w-3.5 h-3.5" />Replace
              </Button>
              <Button variant="destructive" size="sm" className="gap-1.5 shadow-lg"
                onClick={() => updateExperience(activeExperienceId, { mockImageUrl: undefined, mockImageName: undefined })}>
                <Trash2 className="w-3.5 h-3.5" />Remove
              </Button>
            </div>
          </>
        ) : (
          <div className="relative w-full h-full group">
            <img src={sampleProductImage} alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <span className="text-4xl font-bold text-muted-foreground/50 whitespace-nowrap" style={{ transform: 'rotate(-35deg)' }}>
                Sample Image
              </span>
            </div>
            <button
              onClick={() => setShowAssetModal({ experienceId: activeExperienceId })}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 hover:bg-background/30 transition-colors"
            >
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-destructive text-xs font-medium rounded-full shadow-md border-2 border-destructive whitespace-nowrap">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  Select Mock Hero Image
                </span>
                <p className="text-[10px] text-muted-foreground text-center max-w-[200px] leading-relaxed">
                  Add your product's hero image to accurately position hotspot icons
                </p>
              </div>
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 rounded-lg px-4 py-2 shadow-lg whitespace-nowrap">
                <p className="text-sm font-medium text-foreground flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 shrink-0" />Select Mock Hero Image
                </p>
              </div>
            </button>
          </div>
        )}

        {/* Hotspot markers — only for widgets in this experience */}
        {activeExpWidgets.map(widget => {
          const pos = activeExperience.hotspotPositions.find(p => p.widgetId === widget.id);
          const iconId = activeExperience.iconOverrides[widget.id] || 'info';
          if (!pos) return null;
          const isSelected = selectedWidgetId === widget.id;
          const isHovered = hoveredWidgetId === widget.id;
          const isDragging = draggingId === widget.id;
          return (
            <button
              key={widget.id}
              onMouseDown={(e) => handleMarkerMouseDown(e, widget.id)}
              onClick={(e) => { e.stopPropagation(); onSelectWidget(widget.id); }}
              className={cn(
                "absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                "bg-primary border-2 border-primary cursor-grab active:cursor-grabbing",
                isSelected ? "ring-4 ring-primary/30 shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
                  : isHovered ? "ring-2 ring-primary/40 shadow-[0_0_16px_hsl(var(--primary)/0.4)]"
                  : "shadow-lg hover:ring-2 hover:ring-primary/20",
                isDragging && "shadow-xl"
              )}
              style={{
                left: `${pos.x}%`, top: `${pos.y}%`,
                transform: `translate(-50%, -50%) scale(${isSelected || isDragging ? 1.15 : isHovered ? 1.25 : 1})`,
                zIndex: isSelected ? 20 : isHovered ? 15 : 10,
              }}
            >
              <HotspotIconDisplay iconId={iconId} className="w-4 h-4 text-primary-foreground" />
            </button>
          );
        })}
      </div>
    );
  };

  // ─── Retailer panel: who this experience covers ────────────────────────────

  const renderRetailerPanel = () => {
    if (activeExperienceId === 'default') {
      // Default: shows unassigned retailers (implicit fallback) + button to manage
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">Covered retailers</span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[200px] text-xs">
                The default experience covers all retailers not explicitly assigned to another experience.
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-1">
            {unassignedRetailers.length === 0 ? (
              <p className="text-[10px] text-muted-foreground italic py-1">
                All retailers assigned to custom experiences
              </p>
            ) : (
              unassignedRetailers.map(id => {
                const r = hotspotRetailers.find(r => r.id === id);
                return r ? (
                  <div key={id} className="flex items-center gap-1.5 px-2 py-1 rounded bg-muted/50 border border-border">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                    <span className="text-xs text-muted-foreground truncate">{r.name}</span>
                  </div>
                ) : null;
              })
            )}
          </div>

          <p className="text-[9px] text-muted-foreground leading-relaxed">
            Retailers assigned to a custom experience won't appear here.
          </p>
        </div>
      );
    }

    // Custom experience: show assigned retailers with edit button
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">Assigned retailers</span>
          </div>
          <button
            onClick={() => setRetailerPickerMode('edit-experience')}
            className="text-[10px] text-primary hover:underline"
          >
            Edit
          </button>
        </div>

        <div className="space-y-1">
          {activeExperience.assignedRetailerIds.length === 0 ? (
            <button
              onClick={() => setRetailerPickerMode('edit-experience')}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-amber-300 bg-amber-50/50 text-amber-600 text-xs hover:bg-amber-50 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Assign retailers
            </button>
          ) : (
            activeExperience.assignedRetailerIds.map(id => {
              const r = hotspotRetailers.find(r => r.id === id);
              return r ? (
                <div key={id} className="flex items-center gap-1.5 px-2 py-1 rounded bg-primary/5 border border-primary/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                  <span className="text-xs text-foreground truncate">{r.name}</span>
                </div>
              ) : null;
            })
          )}
        </div>
      </div>
    );
  };

  // ─── Main render ──────────────────────────────────────────────────────────

  return (
    <TooltipProvider>
      <div className="grid grid-cols-[190px_1fr] gap-4 min-h-[480px]">

        {/* ─── Left: Experience List ──────────────────────────── */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Image Variants</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[220px] text-xs">
                Each experience has its own mock image, hotspot positions, and widget set. Assign retailers to the right experience based on which product image they show.
              </TooltipContent>
            </Tooltip>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-1.5 pr-1">
              {allExperiences.map(exp => renderExperienceTab(exp))}
            </div>
          </ScrollArea>

          <Button
            variant="outline"
            size="sm"
            className="w-full gap-1.5 text-xs border-dashed mt-1"
            onClick={() => setRetailerPickerMode('new-experience')}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Image Variant
          </Button>
        </div>

        {/* ─── Right: Active Experience Editor ───────────────── */}
        <div className="flex flex-col gap-4 min-w-0">

          {/* Variant Header */}
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            {activeExperienceId === 'default'
              ? <Shield className="w-4 h-4 text-primary shrink-0" />
              : <ImageIcon className="w-4 h-4 text-primary shrink-0" />
            }
            <span className="text-sm font-semibold text-foreground flex-1">
              {activeExperienceId === 'default'
                ? 'Default'
                : (() => {
                    const names = activeExperience.assignedRetailerIds
                      .map(id => hotspotRetailers.find(r => r.id === id)?.name)
                      .filter(Boolean) as string[];
                    return names.length > 0
                      ? names.slice(0, 2).join(', ') + (names.length > 2 ? ` +${names.length - 2}` : '')
                      : 'No retailers assigned';
                  })()
              }
            </span>

            {/* Active toggle */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground">{activeExperience.isActive ? 'Active' : 'Off'}</span>
              <Switch checked={activeExperience.isActive}
                onCheckedChange={v => updateExperience(activeExperienceId, { isActive: v })}
                className="scale-90" />
            </div>

            {/* Copy from another experience */}
            <Popover open={showCopyMenu === activeExperienceId} onOpenChange={open => setShowCopyMenu(open ? activeExperienceId : null)}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 px-2 gap-1">
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs">Copy setup from another experience</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <PopoverContent align="end" className="w-56 p-2">
                <p className="text-xs font-medium text-muted-foreground mb-2 px-1">
                  Copy image, positions &amp; widgets from:
                </p>
                <div className="space-y-1">
                  {allExperiences
                    .filter(e => (e.isDefault ? 'default' : e.id) !== activeExperienceId)
                    .map(e => (
                      <button
                        key={e.isDefault ? 'default' : e.id}
                        onClick={() => copyExperience(e.isDefault ? 'default' : e.id, activeExperienceId)}
                        className="w-full text-left px-2 py-1.5 rounded text-xs hover:bg-muted transition-colors flex items-center gap-2"
                      >
                        {e.isDefault ? <Shield className="w-3 h-3 text-muted-foreground" /> : <Store className="w-3 h-3 text-muted-foreground" />}
                        <span className="flex-1 truncate">{e.isDefault ? 'Default' : e.name}</span>
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      </button>
                    ))
                  }
                  {allExperiences.length <= 1 && (
                    <p className="text-xs text-muted-foreground text-center py-2">No other experiences to copy from</p>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* Delete (non-default only) */}
            {activeExperienceId !== 'default' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete "{activeExperience.name}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                      All assigned retailers will fall back to the Default experience. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => deleteExperience(activeExperienceId)}
                    >Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          {/* Canvas + Retailer + Widget assignment */}
          <div className="grid grid-cols-[1fr_180px] gap-4">

            {/* Left: mock image canvas */}
            <div className="space-y-2">
              {renderCanvas()}
              <p className="text-[10px] text-muted-foreground text-center">
                Drag icons to position · Mock image won't be published
              </p>
            </div>

            {/* Right: retailers + widgets in this experience */}
            <div className="flex flex-col gap-4">
              {renderRetailerPanel()}

              {/* Widget selection for this experience */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">Widgets</span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0">
                      {activeExpWidgets.length}/{widgets.length}
                    </Badge>
                  </div>
                  {widgets.length > 0 && (
                    <button
                      onClick={() => setShowWidgetPicker(!showWidgetPicker)}
                      className="text-[10px] text-primary hover:underline"
                    >
                      {showWidgetPicker ? 'Done' : 'Edit'}
                    </button>
                  )}
                </div>

                {showWidgetPicker ? (
                  <ExperienceWidgetPicker
                    allWidgets={widgets}
                    selectedWidgetIds={
                      activeExperience.widgetIds.length === 0
                        ? widgets.map(w => w.id)
                        : activeExperience.widgetIds
                    }
                    onToggle={toggleExperienceWidget}
                  />
                ) : (
                  <div className="space-y-1">
                    {activeExpWidgets.length === 0 ? (
                      <p className="text-[10px] text-amber-600">No widgets selected</p>
                    ) : (
                      activeExpWidgets.map(w => (
                        <div key={w.id} className="flex items-center gap-1.5 px-2 py-1 rounded bg-muted/30 border border-border">
                          <MousePointer2 className="w-3 h-3 text-muted-foreground shrink-0" />
                          <span className="text-[10px] text-muted-foreground truncate">{w.title}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Retailer Picker Dialogs ─────────────────────────────── */}

      <RetailerPickerDialog
        open={retailerPickerMode === 'new-experience'}
        onOpenChange={open => !open && setRetailerPickerMode(null)}
        title="Select retailers for this experience"
        description="Choose which retailers will use this hotspot setup. They'll be moved from the Default experience."
        hotspotRetailers={hotspotRetailers}
        preselectedIds={[]}
        disabledIds={getRetailersDisabledForNewExp()}
        disabledReason={(id) => {
          const exp = config.experiences.find(e => e.assignedRetailerIds.includes(id));
          return exp ? `In "${exp.name}"` : '';
        }}
        confirmLabel="Create Experience"
        allowEmpty={false}
        onConfirm={(selected) => handleRetailerPickerConfirm('new-experience', selected)}
      />

      <RetailerPickerDialog
        open={retailerPickerMode === 'edit-experience'}
        onOpenChange={open => !open && setRetailerPickerMode(null)}
        title="Manage assigned retailers"
        description="Select which retailers are covered by this experience."
        hotspotRetailers={hotspotRetailers}
        preselectedIds={activeExperience.assignedRetailerIds}
        disabledIds={getRetailersDisabledForExp(activeExperienceId)}
        disabledReason={(id) => {
          const exp = config.experiences.find(e => e.id !== activeExperienceId && e.assignedRetailerIds.includes(id));
          return exp ? `In "${exp.name}"` : '';
        }}
        confirmLabel="Save"
        allowEmpty={true}
        onConfirm={(selected) => handleRetailerPickerConfirm('edit-experience', selected)}
      />

      {/* Asset modal */}
      <AddAssetsModal
        open={!!showAssetModal}
        onOpenChange={(open) => !open && setShowAssetModal(null)}
        onAddAssets={handleAssetSelected}
        singleSelect
        title="Select Mock Hero Image"
      />
    </TooltipProvider>
  );
}
