import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Trash2, Copy, ImageIcon, Pencil
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

interface VerticalFeatureCardProps {
  feature: ExtendedFeature;
  index: number;
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

export function VerticalFeatureCard({
  feature,
  index,
  isSelected,
  isDragging,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onDragStart,
  onDragOver,
  onDragEnd,
}: VerticalFeatureCardProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const hasImage = !!feature.imageUrl;

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
        "group relative flex flex-col items-center text-center p-4 rounded-xl border bg-background transition-all",
        isSelected 
          ? "border-primary ring-2 ring-primary/20" 
          : "border-transparent hover:border-border",
        isDragging && "opacity-50 rotate-1 shadow-lg"
      )}
    >
      {/* Action Buttons - Positioned absolutely on hover */}
      <div 
        className={cn(
          "absolute right-2 top-2 flex items-center gap-0.5 transition-opacity z-10",
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

      {/* Image Section - Square aspect ratio */}
      <div 
        className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted border border-border/50 shadow-sm group/img mb-4"
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
            {/* Sample product placeholder */}
            <div className="w-3/4 h-3/4 bg-gradient-to-b from-white to-muted rounded-lg shadow-inner flex items-center justify-center">
              <div className="w-1/2 h-2/3 bg-gradient-to-b from-gray-100 to-gray-200 rounded-md shadow-sm" />
            </div>
            {/* Sample Image watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span 
                className="text-lg font-medium text-muted-foreground/30 transform -rotate-[20deg] select-none"
                style={{ fontStyle: 'italic' }}
              >
                Sample Image
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="w-full mb-2">
        {isEditingTitle ? (
          <Input
            autoFocus
            value={feature.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            onBlur={() => setIsEditingTitle(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === 'Escape') setIsEditingTitle(false);
            }}
            className="h-8 text-base font-bold text-center"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div 
            className="group/title cursor-text"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingTitle(true);
            }}
          >
            <h3 className="text-base font-bold text-foreground inline-flex items-center gap-1 justify-center">
              {feature.title || `Feature ${index + 1}`}
              <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover/title:opacity-100 transition-opacity" />
            </h3>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="w-full">
        {isEditingDescription ? (
          <Textarea
            autoFocus
            value={feature.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            onBlur={() => setIsEditingDescription(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsEditingDescription(false);
            }}
            className="text-sm min-h-[60px] resize-none text-center"
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
              <Pencil className="inline-block w-3 h-3 ml-1 text-muted-foreground opacity-0 group-hover/desc:opacity-100 transition-opacity" />
            </p>
          </div>
        )}
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
