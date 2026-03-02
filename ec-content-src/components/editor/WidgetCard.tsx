import { Widget, WIDGET_TYPES, WidgetContent } from '@/types/widget';
import { 
  GripVertical, MoreVertical, Copy, Trash2, Eye, EyeOff,
  ImageIcon, FileText, Video, LayoutList, RotateCw,
  GalleryHorizontal, MousePointerClick, TableProperties, Table,
  Code, Code2, Layers, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, 
  AlertTriangle, AlertCircle, Link2
} from 'lucide-react';
import { VideoWidgetPreview } from './VideoWidgetPreview';
import { FeatureSetPreview } from './FeatureSetPreview';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState, useMemo } from 'react';
import { validateWidget, ValidationResult } from '@/utils/widgetValidation';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ImageIcon,
  FileText,
  Video,
  LayoutList,
  RotateCw,
  GalleryHorizontal,
  MousePointerClick,
  TableProperties,
  Table,
  Code,
  Code2,
  Layers,
};

interface WidgetCardProps {
  widget: Widget;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onToggleActive: () => void;
  onUpdate?: (updates: Partial<WidgetContent>) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  isDragging?: boolean;
  forceExpanded?: boolean;
}

export function WidgetCard({
  widget,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
  onToggleActive,
  onUpdate,
  dragHandleProps,
  isDragging,
  forceExpanded,
}: WidgetCardProps) {
  const [isExpandedLocal, setIsExpandedLocal] = useState(true);
  const isExpanded = forceExpanded !== undefined ? forceExpanded : isExpandedLocal;
  const setIsExpanded = setIsExpandedLocal;
  const config = WIDGET_TYPES.find(t => t.type === widget.type);
  const IconComponent = config ? iconMap[config.icon] || FileText : FileText;
  
  const validation = useMemo(() => validateWidget(widget), [widget]);
  const hasErrors = validation.errors.length > 0;
  const hasWarnings = validation.warnings.length > 0;

  return (
    <div
      data-widget-id={widget.id}
      className={cn(
        "widget-card group",
        isSelected && "selected",
        isDragging && "dragging",
        !widget.isActive && "opacity-60",
        hasErrors && "border-destructive/50",
        hasWarnings && !hasErrors && "border-warning/50"
      )}
      onClick={onSelect}
    >
      {/* Error/Warning Banner */}
      {(hasErrors || hasWarnings) && (
        <ValidationBanner validation={validation} />
      )}
      
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-border/50">
        <div
          {...dragHandleProps}
          className="drag-handle p-1 -ml-1 rounded hover:bg-muted transition-colors"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>
        
        <div className={cn(
          "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
          hasErrors ? "bg-destructive/10 text-destructive" :
          hasWarnings ? "bg-warning/10 text-warning" :
          "bg-accent text-accent-foreground"
        )}>
          <IconComponent className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-foreground truncate">
              {widget.title}
            </span>
            {widget.tag && (
              <span className="widget-type-pill bg-primary/10 text-primary">
                {widget.tag}
              </span>
            )}
            {/* Included in X places badge */}
            {widget.content.includeOn && widget.content.includeOn.length > 1 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-medium cursor-help">
                    <Link2 className="w-3 h-3" />
                    Included in {widget.content.includeOn.length} places
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {widget.content.includeOn.map(place => 
                    place === 'inline' ? 'Inline' : place === 'hotspot' ? 'Hotspot' : 'Toolbar'
                  ).join(', ')}
                </TooltipContent>
              </Tooltip>
            )}
            {/* Section badges */}
            {widget.sections.includes('hero') && widget.sections.includes('inline') && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                Both
              </span>
            )}
            {hasErrors && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">
                    <AlertCircle className="w-3 h-3" />
                    <span className="text-[10px] font-medium">{validation.errors.length}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs font-medium mb-1">Errors:</p>
                  <ul className="text-xs space-y-0.5">
                    {validation.errors.map((e, i) => (
                      <li key={i}>• {e.message}</li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            )}
            {hasWarnings && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-warning/10 text-warning">
                    <AlertTriangle className="w-3 h-3" />
                    <span className="text-[10px] font-medium">{validation.warnings.length}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs font-medium mb-1">Warnings:</p>
                  <ul className="text-xs space-y-0.5">
                    {validation.warnings.map((w, i) => (
                      <li key={i}>• {w.message}</li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {config?.label}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Switch
            checked={widget.isActive}
            onCheckedChange={onToggleActive}
            className="scale-75"
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleActive}>
                {widget.isActive ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Show
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={onDelete}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Preview Content */}
      {isExpanded && (
        <div className="p-3">
          <WidgetPreview widget={widget} onUpdate={onUpdate} />
        </div>
      )}
    </div>
  );
}

function WidgetPreview({ widget, onUpdate }: { widget: Widget; onUpdate?: (updates: Partial<WidgetContent>) => void }) {
  switch (widget.type) {
    case 'images':
      // Use new imageItems if available, fallback to legacy images array
      const imageItems = widget.content.imageItems || [];
      const legacyImage = widget.content.images?.[0];
      const layout = widget.content.imageLayout || 'focused';
      
      // No images - show placeholder
      if (imageItems.length === 0 && !legacyImage) {
        return (
          <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
            </div>
            {widget.content.header && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <span className="text-xs font-medium text-white truncate">
                  {widget.content.header}
                </span>
              </div>
            )}
          </div>
        );
      }

      // Focused layout - stacked images (one under another)
      if (layout === 'focused') {
        return (
          <div className="space-y-3">
            {widget.content.header && (
              <p className="text-xs font-medium text-foreground px-1">
                {widget.content.header}
              </p>
            )}
            {imageItems.length > 0 ? (
              imageItems.map((img, idx) => (
                <div key={img.id} className="space-y-1">
                  <div className="aspect-[4/3] bg-muted rounded-md overflow-hidden">
                    <img 
                      src={img.url} 
                      alt={img.altText || `Image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {img.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 px-1">
                      {img.description}
                    </p>
                  )}
                </div>
              ))
            ) : legacyImage ? (
              <div className="aspect-[4/3] bg-muted rounded-md overflow-hidden">
                <img 
                  src={legacyImage} 
                  alt={widget.content.header || 'Image'}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}
          </div>
        );
      }

      // Slider layout - use separate component with state
      return (
        <ImageSliderPreview 
          imageItems={imageItems} 
          legacyImage={legacyImage} 
          header={widget.content.header} 
        />
      );
      
    case 'carousel':
      return (
        <div className="aspect-video bg-muted rounded-md overflow-hidden relative">
          {widget.content.images?.[0] ? (
            <img 
              src={widget.content.images[0]} 
              alt={widget.content.header || 'Image'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-muted-foreground/50" />
            </div>
          )}
          {widget.content.header && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
              <span className="text-xs font-medium text-white truncate">
                {widget.content.header}
              </span>
            </div>
          )}
        </div>
      );
      
    case 'feature-sets':
      return (
        <FeatureSetPreview content={widget.content} onUpdate={onUpdate} />
      );
      
    case 'specification-table':
      return (
        <div className="space-y-1.5">
          {widget.content.specifications?.slice(0, 3).map((spec) => (
            <div key={spec.id} className="flex items-center justify-between text-xs gap-2">
              <span className="text-muted-foreground truncate">{spec.label}</span>
              <span className="text-foreground font-medium truncate">{spec.value}</span>
            </div>
          ))}
          {(widget.content.specifications?.length || 0) > 3 && (
            <span className="text-xs text-muted-foreground">
              +{(widget.content.specifications?.length || 0) - 3} more specs
            </span>
          )}
        </div>
      );
      
    case 'videos':
      return (
        <VideoWidgetPreview content={widget.content} />
      );
      
    case 'text-html':
      return (
        <div className="space-y-1">
          {widget.content.header && (
            <p className="text-xs font-medium text-foreground">{widget.content.header}</p>
          )}
          <p className="text-xs text-muted-foreground line-clamp-2">
            {widget.content.description || 'No content added yet'}
          </p>
        </div>
      );
      
    default:
      return (
        <div className="h-16 bg-muted/50 rounded-md flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Preview not available</span>
        </div>
      );
  }
}

function ValidationBanner({ validation }: { validation: ValidationResult }) {
  const hasErrors = validation.errors.length > 0;
  const hasWarnings = validation.warnings.length > 0;
  
  if (!hasErrors && !hasWarnings) return null;
  
  return (
    <div className={cn(
      "px-3 py-2 text-xs flex items-start gap-2",
      hasErrors ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
    )}>
      {hasErrors ? (
        <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
      ) : (
        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
      )}
      <div className="space-y-0.5">
        {validation.errors.slice(0, 2).map((error, i) => (
          <p key={`error-${i}`}>{error.message}</p>
        ))}
        {validation.warnings.slice(0, hasErrors ? 1 : 2).map((warning, i) => (
          <p key={`warning-${i}`} className={hasErrors ? "text-warning" : ""}>
            {warning.message}
          </p>
        ))}
        {(validation.errors.length > 2 || validation.warnings.length > (hasErrors ? 1 : 2)) && (
          <p className="text-muted-foreground">
            +{Math.max(0, validation.errors.length - 2) + Math.max(0, validation.warnings.length - (hasErrors ? 1 : 2))} more issues
          </p>
        )}
      </div>
    </div>
  );
}

// Separate component for slider preview with its own state
interface ImageSliderPreviewProps {
  imageItems: { id: string; url: string; altText?: string; description?: string }[];
  legacyImage?: string;
  header?: string;
}

function ImageSliderPreview({ imageItems, legacyImage, header }: ImageSliderPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const hasMultipleImages = imageItems.length > 1;
  const activeImageItem = imageItems[activeIndex];
  const currentImage = activeImageItem 
    ? { url: activeImageItem.url, altText: activeImageItem.altText, description: activeImageItem.description }
    : legacyImage 
      ? { url: legacyImage, altText: header, description: undefined }
      : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((activeIndex - 1 + imageItems.length) % imageItems.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((activeIndex + 1) % imageItems.length);
  };

  return (
    <div className="space-y-2">
      {header && (
        <p className="text-xs font-medium text-foreground px-1">
          {header}
        </p>
      )}
      <div className="relative">
        <div className="aspect-[21/9] bg-muted rounded-md overflow-hidden">
          {currentImage ? (
            <img 
              src={currentImage.url} 
              alt={currentImage.altText || 'Slide'}
              className="w-full h-full object-cover transition-opacity duration-200"
            />
          ) : null}
        </div>
        
        {/* Navigation arrows */}
        {hasMultipleImages && (
          <>
            <button 
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
              onClick={handleNext}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
        
        {/* Dots indicator */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {imageItems.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  idx === activeIndex ? "bg-white w-4" : "bg-white/50 hover:bg-white/70"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
              />
            ))}
          </div>
        )}
      </div>
      {currentImage?.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 px-1">
          {currentImage.description}
        </p>
      )}
    </div>
  );
}
