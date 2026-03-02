import { 
  GripVertical, Image, Play, Sparkles, Table, FileText, 
  LayoutGrid, MousePointer, View, PanelTop, File, Plus,
  Layers, ImageIcon, Grid3X3, ArrowLeftRight, Type, Code,
  Download, RotateCw, MousePointerClick, Columns, List
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WidgetType } from '@/types/widget';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

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

interface WidgetPreviewInfo {
  description: string;
  features: string[];
  previewIcons: React.ComponentType<{ className?: string }>[];
  color: string;
}

const widgetPreviewInfo: Record<WidgetType, WidgetPreviewInfo> = {
  'images': {
    description: 'Display product images in gallery or stacked layouts with captions and descriptions.',
    features: ['Focused or Slider layout', 'Image captions & alt text', 'Click-to-zoom support'],
    previewIcons: [ImageIcon, Grid3X3, Layers],
    color: 'from-blue-500/20 to-blue-600/10',
  },
  'documents': {
    description: 'Attach downloadable files like PDFs, manuals, and specification sheets.',
    features: ['Multiple file formats', 'Download tracking', 'File size display'],
    previewIcons: [File, Download, FileText],
    color: 'from-amber-500/20 to-amber-600/10',
  },
  'videos': {
    description: 'Embed product videos with multiple layout options and playback controls.',
    features: ['Focused, Slider, Grid layouts', 'Autoplay & loop options', 'Custom thumbnails'],
    previewIcons: [Play, LayoutGrid, Layers],
    color: 'from-red-500/20 to-red-600/10',
  },
  'feature-sets': {
    description: 'Showcase key product features with icons, images, and descriptions.',
    features: ['List, Grid, Tabs, Accordion', 'Icon customization', 'Image positioning'],
    previewIcons: [Sparkles, List, Columns],
    color: 'from-purple-500/20 to-purple-600/10',
  },
  '360-view': {
    description: 'Create interactive 360° spin views for complete product visualization.',
    features: ['Drag to rotate', 'Auto-spin option', 'High-res image support'],
    previewIcons: [RotateCw, View, MousePointer],
    color: 'from-cyan-500/20 to-cyan-600/10',
  },
  'carousel': {
    description: 'Scrollable carousel for multiple images or content cards.',
    features: ['Swipe navigation', 'Auto-advance option', 'Dot indicators'],
    previewIcons: [LayoutGrid, ArrowLeftRight, ImageIcon],
    color: 'from-green-500/20 to-green-600/10',
  },
  'interactive-tour': {
    description: 'Guide users through product features with interactive hotspots.',
    features: ['Click-through steps', 'Highlight areas', 'Custom tooltips'],
    previewIcons: [MousePointerClick, Layers, View],
    color: 'from-pink-500/20 to-pink-600/10',
  },
  'comparison-table': {
    description: 'Compare multiple product variants or models side by side.',
    features: ['Multi-column layout', 'Highlight differences', 'Expandable rows'],
    previewIcons: [Table, Columns, ArrowLeftRight],
    color: 'from-indigo-500/20 to-indigo-600/10',
  },
  'specification-table': {
    description: 'Display technical specifications in a clean, organized table format.',
    features: ['Label-value pairs', 'Grouped sections', 'Search & filter'],
    previewIcons: [Table, List, FileText],
    color: 'from-slate-500/20 to-slate-600/10',
  },
  'text-html': {
    description: 'Add rich text content or custom HTML for flexible formatting.',
    features: ['Rich text editor', 'HTML support', 'Custom styling'],
    previewIcons: [Type, Code, FileText],
    color: 'from-orange-500/20 to-orange-600/10',
  },
  'iframe': {
    description: 'Embed external content like configurators, forms, or third-party tools.',
    features: ['Responsive sizing', 'Lazy loading', 'Secure embedding'],
    previewIcons: [PanelTop, Code, Layers],
    color: 'from-teal-500/20 to-teal-600/10',
  },
};

interface WidgetPaletteItemProps {
  type: WidgetType;
  label: string;
  onDragStart: (e: React.DragEvent, type: WidgetType) => void;
  onDragEnd: () => void;
  onClick: () => void;
}

export function WidgetPaletteItem({
  type,
  label,
  onDragStart,
  onDragEnd,
  onClick,
}: WidgetPaletteItemProps) {
  const IconComponent = widgetIconMap[type] || FileText;
  const previewInfo = widgetPreviewInfo[type];

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div
          draggable
          onDragStart={(e) => onDragStart(e, type)}
          onDragEnd={onDragEnd}
          onClick={onClick}
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 rounded-lg",
            "border border-border bg-background",
            "hover:border-primary/50 hover:bg-primary/5 hover:shadow-sm",
            "transition-all duration-200 select-none",
            "cursor-pointer active:cursor-grabbing"
          )}
        >
          <GripVertical className="w-4 h-4 text-muted-foreground/50 shrink-0 cursor-grab" />
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
            "bg-gradient-to-br from-primary/20 to-primary/10 text-primary border border-primary/20"
          )}>
            <IconComponent className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{label}</p>
          </div>
          <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent 
        side="left" 
        align="start" 
        sideOffset={12}
        className="w-72 p-0 overflow-hidden"
      >
        {/* Preview Header with Icon Grid */}
        <div className={cn(
          "px-4 py-4 bg-gradient-to-br border-b border-border",
          previewInfo.color
        )}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
              <IconComponent className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{label}</h4>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Widget</p>
            </div>
          </div>
          
          {/* Mini Preview Grid */}
          <div className="flex gap-2">
            {previewInfo.previewIcons.map((Icon, idx) => (
              <div 
                key={idx}
                className="w-14 h-14 rounded-md bg-background/60 backdrop-blur-sm flex items-center justify-center border border-border/50"
              >
                <Icon className="w-6 h-6 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Description & Features */}
        <div className="px-4 py-3 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {previewInfo.description}
          </p>
          
          <div className="space-y-1.5">
            <p className="text-[10px] font-medium text-foreground uppercase tracking-wide">Key Features</p>
            <ul className="space-y-1">
              {previewInfo.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Hint */}
        <div className="px-4 py-2 bg-muted/30 border-t border-border">
          <p className="text-[10px] text-muted-foreground text-center">
            Click to add • Drag to position
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
