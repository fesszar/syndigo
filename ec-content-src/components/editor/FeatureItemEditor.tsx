import { useState } from 'react';
import { Feature, ImageItem } from '@/types/widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  GripVertical, Trash2, Copy, ChevronDown, ChevronUp,
  ImageIcon, X, Pencil, Link as LinkIcon, Eye,
  Circle, Square, Star, Zap, CheckCircle, Info, Plus
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { AddAssetsModal } from './AddAssetsModal';

const ICON_OPTIONS = [
  { id: 'circle', icon: Circle, label: 'Circle' },
  { id: 'square', icon: Square, label: 'Square' },
  { id: 'star', icon: Star, label: 'Star' },
  { id: 'zap', icon: Zap, label: 'Lightning' },
  { id: 'check', icon: CheckCircle, label: 'Check' },
  { id: 'info', icon: Info, label: 'Info' },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  circle: Circle,
  square: Square,
  star: Star,
  zap: Zap,
  check: CheckCircle,
  info: Info,
};

export interface ExtendedFeature extends Feature {
  imageUrl?: string;
  caption?: string;
  altText?: string;
  link?: string;
  linkAccessibilityText?: string;
  reportingCode?: string;
}

interface FeatureItemEditorProps {
  feature: ExtendedFeature;
  index: number;
  isExpanded: boolean;
  isSelected: boolean;
  showIcons: boolean;
  imagePosition: string;
  onSelect: () => void;
  onToggleExpand: () => void;
  onUpdate: (updates: Partial<ExtendedFeature>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  isDragging?: boolean;
}

export function FeatureItemEditor({
  feature,
  index,
  isExpanded,
  isSelected,
  showIcons,
  imagePosition,
  onSelect,
  onToggleExpand,
  onUpdate,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  dragHandleProps,
  isDragging,
}: FeatureItemEditorProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const hasImage = !!feature.imageUrl;
  const IconComponent = feature.icon ? ICON_MAP[feature.icon] : null;

  const handleAssetSelected = (assets: ImageItem[]) => {
    if (assets.length > 0) {
      onUpdate({ 
        imageUrl: assets[0].url,
        altText: feature.altText || assets[0].altText || '',
      });
    }
  };

  const clearImage = () => {
    onUpdate({ 
      imageUrl: '', 
      caption: '', 
      altText: '', 
      link: '', 
      linkAccessibilityText: '' 
    });
  };

  return (
    <div
      className={cn(
        "border rounded-lg transition-all bg-background",
        isSelected 
          ? "border-primary ring-2 ring-primary/20" 
          : "border-border hover:border-muted-foreground/50",
        isDragging && "opacity-50 rotate-1 shadow-lg"
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Feature Header - Always Visible */}
      <div className="flex items-center gap-2 p-3">
        {/* Drag Handle */}
        <div
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing p-1 -ml-1 rounded hover:bg-muted transition-colors"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Index Badge */}
        <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
          {index + 1}
        </span>

        {/* Icon (if enabled) */}
        {showIcons && IconComponent && (
          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
            <IconComponent className="w-3.5 h-3.5 text-accent-foreground" />
          </div>
        )}

        {/* Title - Inline Editable */}
        <div className="flex-1 min-w-0">
          {isEditingTitle ? (
            <Input
              autoFocus
              value={feature.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditingTitle(false);
                if (e.key === 'Escape') setIsEditingTitle(false);
              }}
              className="h-7 text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div 
              className="group/title flex items-center gap-1.5 cursor-text"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditingTitle(true);
              }}
            >
              <span className="text-sm font-medium truncate">
                {feature.title || 'Untitled Feature'}
              </span>
              <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover/title:opacity-100 transition-opacity" />
            </div>
          )}
        </div>

        {/* Image indicator */}
        {hasImage && (
          <div className="w-5 h-5 rounded overflow-hidden shrink-0">
            <img 
              src={feature.imageUrl} 
              alt="" 
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center gap-0.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate();
                }}
              >
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Duplicate feature</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
              >
                <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete feature</TooltipContent>
          </Tooltip>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand();
            }}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-0 space-y-4 border-t border-border">
          {/* Two Column Layout: Image (left) + Fields (right) */}
          <div className={cn(
            "grid gap-4 pt-3",
            imagePosition !== 'none' ? "grid-cols-[180px_1fr]" : "grid-cols-1"
          )}>
            {/* Image Upload Section */}
            {imagePosition !== 'none' && (
              <div className="space-y-2">
                {hasImage ? (
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border border-border group/img">
                    <img 
                      src={feature.imageUrl} 
                      alt={feature.altText || ''} 
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover/img:opacity-100">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAssetModal(true);
                        }}
                      >
                        <Pencil className="w-3 h-3 mr-1" />
                        Change
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearImage();
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="aspect-square rounded-lg border-2 border-dashed border-primary/30 bg-muted/20 flex flex-col items-center justify-center gap-3 transition-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="text-xs text-muted-foreground text-center px-3 leading-relaxed">
                      Click the + icon below<br />to add an image or a video.
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAssetModal(true);
                      }}
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                )}

                {/* Image Dimensions Display */}
                {hasImage && (
                  <div className="text-[10px] text-muted-foreground">
                    <span>Asset Type: </span>
                    <span className="font-medium text-foreground">Image</span>
                  </div>
                )}

                <AddAssetsModal
                  open={showAssetModal}
                  onOpenChange={setShowAssetModal}
                  onAddAssets={handleAssetSelected}
                  singleSelect
                  title="Select Image"
                />
              </div>
            )}

            {/* Fields Section */}
            <div className="space-y-3">
              {/* Caption - Progressive Disclosure (shows when image exists) */}
              {hasImage && (
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1">
                    Caption
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>Optional caption displayed below the image</TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    value={feature.caption || ''}
                    onChange={(e) => onUpdate({ caption: e.target.value })}
                    placeholder="Enter Caption"
                    className="h-8 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              {/* Description */}
              <div className="space-y-1.5">
                <Label className="text-xs flex items-center gap-1">
                  Feature Description
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>Max length 10,000 characters</TooltipContent>
                  </Tooltip>
                </Label>
                {/* Simple Rich Text Toolbar */}
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border bg-muted/30">
                    {['B', 'I', 'U'].map((format) => (
                      <Button 
                        key={format} 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0 font-semibold text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {format === 'I' ? <span className="italic">{format}</span> : format}
                      </Button>
                    ))}
                    <div className="w-px h-4 bg-border mx-1" />
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs" onClick={(e) => e.stopPropagation()}>
                      <span className="text-[10px]">x₂</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs" onClick={(e) => e.stopPropagation()}>
                      <span className="text-[10px]">x²</span>
                    </Button>
                  </div>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => onUpdate({ description: e.target.value })}
                    placeholder="Enter a description. Max length 10,000 characters."
                    rows={3}
                    className="resize-none text-sm border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Alt Text - Progressive Disclosure (shows when image exists) */}
              {hasImage && (
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1">
                    Image Alt Text
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={feature.altText || ''}
                    onChange={(e) => onUpdate({ altText: e.target.value })}
                    placeholder="Describe the image for accessibility"
                    className="h-8 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <p className="text-[10px] text-muted-foreground italic">
                    *This value is linked to the asset, and will be used everywhere the asset is used.
                  </p>
                </div>
              )}

              {/* Link - Progressive Disclosure (shows when image exists) */}
              {hasImage && (
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1">
                    Link
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>Optional link when image is clicked</TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    value={feature.link || ''}
                    onChange={(e) => onUpdate({ link: e.target.value })}
                    placeholder="Enter a Link"
                    className="h-8 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              {/* Link Accessibility Text - Progressive Disclosure (shows when link exists) */}
              {hasImage && feature.link && (
                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1">
                    Link Accessibility Text
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-3 h-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>Screen reader text for the link</TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    value={feature.linkAccessibilityText || ''}
                    onChange={(e) => onUpdate({ linkAccessibilityText: e.target.value })}
                    placeholder="Click to Learn More"
                    className="h-8 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              {/* Icon Selector (when icons enabled) */}
              {showIcons && (
                <div className="space-y-1.5">
                  <Label className="text-xs">Feature Icon</Label>
                  <div className="flex gap-1">
                    {ICON_OPTIONS.map(({ id, icon: Icon, label }) => (
                      <Tooltip key={id}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdate({ icon: id });
                            }}
                            className={cn(
                              "w-8 h-8 rounded-md border flex items-center justify-center transition-all",
                              feature.icon === id
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border text-muted-foreground hover:border-muted-foreground/50"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>{label}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reorder Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveUp();
                }}
                disabled={!canMoveUp}
                className="h-7 px-2 text-xs"
              >
                ↑ Move Up
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveDown();
                }}
                disabled={!canMoveDown}
                className="h-7 px-2 text-xs"
              >
                ↓ Move Down
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}