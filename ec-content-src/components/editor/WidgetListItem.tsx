import { Widget, WIDGET_TYPES } from '@/types/widget';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { HotspotIconPicker } from './HotspotIconPicker';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { 
  GripVertical, Settings, Image, Play, Sparkles, Table, FileText, 
  LayoutGrid, MousePointer, View, PanelTop, File, Trash2, Link2, AlertTriangle, Unlink
} from 'lucide-react';

const includeOnLabels: Record<string, string> = {
  inline: 'Inline',
  hotspot: 'Hotspot',
  toolbar: 'Toolbar',
};

const widgetIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'images': Image,
  'videos': Play,
  'feature-sets': Sparkles,
  'specification-table': Table,
  'documents': File,
  'carousel': LayoutGrid,
  'interactive-tour': MousePointer,
  '360-view': View,
  'text-html': FileText,
  'comparison-table': Table,
  'iframe': PanelTop,
};

interface WidgetListItemProps {
  widget: Widget;
  isSelected: boolean;
  isHovered?: boolean;
  onClick: () => void;
  onToggleActive?: (id: string) => void;
  onUpdateIcon?: (id: string, iconId: string) => void;
  onOpenSettings?: () => void;
  onHover?: (id: string | null) => void;
  onDelete?: (id: string) => void;
  showIconPicker?: boolean;
  context?: 'hotspot' | 'toolbar' | 'inline';
  // Link status for variant widget copies
  linkStatus?: 'linked' | 'unlinked';
  // Variant-specific actions
  onToggleLinkStatus?: (id: string) => void;
  onRemoveFromVariant?: (id: string) => void;
}

export function WidgetListItem({ 
  widget, 
  isSelected,
  isHovered = false,
  onClick, 
  onToggleActive,
  onUpdateIcon,
  onOpenSettings,
  onHover,
  onDelete,
  showIconPicker = false,
  context,
  linkStatus,
  onToggleLinkStatus,
  onRemoveFromVariant,
}: WidgetListItemProps) {
  const config = WIDGET_TYPES.find(t => t.type === widget.type);
  const IconComponent = widgetIconMap[widget.type] || FileText;
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleActive?.(widget.id);
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenSettings?.();
    onClick();
  };

  const handleIconChange = (iconId: string) => {
    onUpdateIcon?.(widget.id, iconId);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(widget.id);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover?.(widget.id)}
      onMouseLeave={() => onHover?.(null)}
      className={cn(
        "w-full text-left px-2 py-1.5 rounded-md border transition-all cursor-pointer",
        isSelected 
          ? "border-primary bg-primary/5 shadow-md" 
          : isHovered
            ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/20"
            : "border-border hover:border-primary/30 hover:bg-muted/30 hover:shadow-md"
      )}
    >
      <div className="flex items-center gap-1.5">
        {/* Drag Handle */}
        <GripVertical className="w-3 h-3 text-muted-foreground/50 shrink-0 cursor-grab" />
        
        {/* Widget Type Icon */}
        <div className={cn(
          "w-7 h-7 rounded flex items-center justify-center shrink-0",
          "bg-gradient-to-br from-primary/20 to-primary/10 text-primary border border-primary/20"
        )}>
          <IconComponent className="w-3.5 h-3.5" />
        </div>
        
        {/* Widget Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-[11px] font-medium truncate">{widget.title}</p>
            {/* Included in X places badge */}
            {widget.content.includeOn && widget.content.includeOn.length > 1 && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center gap-0.5 text-[9px] px-1 py-0.5 rounded bg-secondary text-secondary-foreground font-medium shrink-0 cursor-help">
                      <Link2 className="w-2.5 h-2.5" />
                      {widget.content.includeOn.length}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    Included in: {widget.content.includeOn.map(place => includeOnLabels[place] || place).join(', ')}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {/* Variant link status badge */}
            {linkStatus === 'linked' && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center gap-0.5 text-[9px] px-1 py-0.5 rounded bg-primary/10 text-primary font-medium shrink-0 cursor-help">
                      <Link2 className="w-2.5 h-2.5" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    Linked — content edits sync across all variants using this widget
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {linkStatus === 'unlinked' && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center gap-0.5 text-[9px] px-1 py-0.5 rounded bg-muted text-muted-foreground font-medium shrink-0 cursor-help">
                      <Unlink className="w-2.5 h-2.5" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    Independent — edits only affect this variant
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <p className="text-[9px] text-muted-foreground">{config?.label}</p>
        </div>
        
        {/* Hotspot Icon Picker - only for hotspot context */}
        {showIconPicker && context === 'hotspot' && (
          <div onClick={(e) => e.stopPropagation()}>
            <HotspotIconPicker 
              value={widget.content?.hotspotIcon || 'info'}
              onChange={handleIconChange}
            />
          </div>
        )}
        
        {/* 360 View retailer warning */}
        {widget.type === '360-view' && widget.sections?.includes('inline') && (
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex items-center justify-center shrink-0 cursor-help p-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs max-w-xs">
                <p className="font-medium mb-1">2 recipients do not display the 360 View widget on their website:</p>
                <ul className="list-disc list-inside">
                  <li>Amazon</li>
                  <li>Kohl's</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {/* Active Toggle */}
        <div onClick={(e) => e.stopPropagation()}>
          <Switch
            checked={widget.isActive}
            onCheckedChange={() => onToggleActive?.(widget.id)}
            className="shrink-0 scale-75"
          />
        </div>

        {/* Variant actions: unlink toggle + remove from variant */}
        {onRemoveFromVariant ? (
          <>
            {linkStatus && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleLinkStatus?.(widget.id); }}
                      className={cn(
                        "p-1 rounded transition-colors shrink-0",
                        linkStatus === 'linked'
                          ? "text-primary hover:bg-primary/10"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {linkStatus === 'linked' ? <Link2 className="w-3.5 h-3.5" /> : <Unlink className="w-3.5 h-3.5" />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    {linkStatus === 'linked' ? 'Global — click to make independent' : 'Independent — click to sync globally'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onRemoveFromVariant(widget.id); }}
              className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
              title="Remove from this group"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          /* Global Delete Button */
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
            title="Delete widget"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
