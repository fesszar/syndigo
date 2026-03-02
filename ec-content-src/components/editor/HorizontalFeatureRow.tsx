import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  GripVertical, Trash2, Copy, ImageIcon, Pencil,
  Circle, Square, Star, Zap, CheckCircle, Info
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { AddAssetsModal } from './AddAssetsModal';
import { ExtendedFeature } from './FeatureItemEditor';
import { ImageItem } from '@/types/widget';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  circle: Circle,
  square: Square,
  star: Star,
  zap: Zap,
  check: CheckCircle,
  info: Info,
};

interface HorizontalFeatureRowProps {
  feature: ExtendedFeature;
  index: number;
  imageAlignment: 'left' | 'right';
  showIcons: boolean;
  isSelected: boolean;
  isDragging?: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<ExtendedFeature>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
}

export function HorizontalFeatureRow({
  feature,
  index,
  imageAlignment,
  showIcons,
  isSelected,
  isDragging,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onDragStart,
  onDragOver,
  onDragEnd,
}: HorizontalFeatureRowProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
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

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={cn(
        "group relative flex items-start gap-6 py-6 transition-all",
        imageAlignment === 'right' && "flex-row-reverse",
        isSelected && "bg-primary/5 -mx-4 px-4 rounded-xl",
        isDragging && "opacity-50 rotate-1 shadow-lg"
      )}
    >
      {/* Drag Handle - Positioned absolutely on left edge */}
      <div
        className={cn(
          "absolute -left-6 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted transition-all",
          isHovered || isSelected ? "opacity-100" : "opacity-0"
        )}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Image Section - Square aspect ratio matching reference */}
      <div 
        className="relative w-40 h-40 rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted border border-border/50 shadow-sm shrink-0 group/img"
      >
        {hasImage ? (
          <>
            <img 
              src={feature.imageUrl} 
              alt={feature.altText || ''} 
              className="w-full h-full object-cover"
            />
            {/* Hover overlay for image replacement */}
            <div 
              className="absolute inset-0 bg-black/0 group-hover/img:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover/img:opacity-100 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowAssetModal(true);
              }}
            >
              <Button variant="secondary" size="sm" className="h-8 text-xs">
                <Pencil className="w-3 h-3 mr-1" />
                Replace
              </Button>
            </div>
          </>
        ) : (
          <div 
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors relative"
            onClick={(e) => {
              e.stopPropagation();
              setShowAssetModal(true);
            }}
          >
            {/* Sample product placeholder matching reference */}
            <div className="w-3/4 h-3/4 bg-gradient-to-b from-white to-muted rounded-lg shadow-inner flex items-center justify-center">
              <div className="w-1/2 h-2/3 bg-gradient-to-b from-gray-100 to-gray-200 rounded-md shadow-sm" />
            </div>
            {/* Sample Image watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span 
                className="text-sm font-medium text-muted-foreground/30 transform -rotate-[20deg] select-none"
                style={{ fontStyle: 'italic' }}
              >
                Sample Image
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section - Vertically centered */}
      <div className="flex-1 min-w-0 flex flex-col justify-center py-2">
        {/* Title - Bold, clean */}
        {isEditingTitle ? (
          <Input
            autoFocus
            value={feature.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Escape') setIsEditingTitle(false);
            }}
            className="h-10 text-lg font-bold mb-2"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div 
            className="group/title cursor-text mb-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingTitle(true);
            }}
          >
            <h3 className="text-lg font-bold text-foreground inline-flex items-center gap-1.5">
              {feature.title || `Feature ${index + 1}`}
              <Pencil className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover/title:opacity-100 transition-opacity" />
            </h3>
          </div>
        )}

        {/* Description */}
        {isEditingDescription ? (
          <Textarea
            autoFocus
            value={feature.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            onBlur={() => setIsEditingDescription(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsEditingDescription(false);
            }}
            className="text-sm min-h-[80px] resize-none"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div 
            className="group/desc cursor-text"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingDescription(true);
            }}
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description || 'Enter the feature description here. This is just placeholder text for this feature, meant to highlight a feature of this product.'}
              <Pencil className="inline-block w-3 h-3 ml-1.5 text-muted-foreground opacity-0 group-hover/desc:opacity-100 transition-opacity" />
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons - Positioned absolutely on hover */}
      <div 
        className={cn(
          "absolute right-0 top-4 flex items-center gap-0.5 transition-opacity",
          isHovered || isSelected ? "opacity-100" : "opacity-0"
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 bg-background/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
            >
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Duplicate</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 bg-background/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </div>

      <AddAssetsModal
        open={showAssetModal}
        onOpenChange={setShowAssetModal}
        onAddAssets={handleAssetSelected}
        singleSelect
        title="Select Feature Image"
      />
    </div>
  );
}
