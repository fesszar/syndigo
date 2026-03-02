import { useState } from 'react';
import { WidgetContent, ImageItem, ImageLayout, CONTENT_TAGS, ContentTag, IncludeOn } from '@/types/widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { 
  Plus, Trash2, GripVertical, ImageIcon, Link2, Eye, Monitor,
  ChevronDown, ChevronUp, Pencil, Rows3, GalleryHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AddAssetsModal } from './AddAssetsModal';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ImageWidgetSettingsProps {
  content: WidgetContent;
  onUpdate: (updates: Partial<WidgetContent>) => void;
}

const LAYOUT_OPTIONS: { value: ImageLayout; label: string; description: string; icon: React.ReactNode }[] = [
  { 
    value: 'focused', 
    label: 'Focused', 
    description: 'Great for product views where you can showcase details of your featured product, possibly from different angles.',
    icon: <Rows3 className="w-6 h-6" />,
  },
  { 
    value: 'slider', 
    label: 'Slider', 
    description: 'Great for showing your product being used in its intended environment. Spans the entire width of the page. Requires images 960×600 pixels or larger.',
    icon: <GalleryHorizontal className="w-6 h-6" />,
  },
];

const INCLUDE_OPTIONS: { value: IncludeOn; label: string }[] = [
  { value: 'inline', label: 'Inline' },
  { value: 'hotspot', label: 'Hotspot' },
  { value: 'toolbar', label: 'Toolbar' },
];

export function ImageWidgetSettings({ content, onUpdate }: ImageWidgetSettingsProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedImageId, setExpandedImageId] = useState<string | null>(null);
  const [replaceImageId, setReplaceImageId] = useState<string | null>(null);
  
  const imageItems = content.imageItems || [];
  const imageLayout = content.imageLayout || 'focused';
  const contentTag = content.contentTag;
  const includeOn = content.includeOn || [];

  const updateImageItem = (id: string, updates: Partial<ImageItem>) => {
    onUpdate({
      imageItems: imageItems.map(img => 
        img.id === id ? { ...img, ...updates } : img
      ),
    });
  };

  const deleteImageItem = (id: string) => {
    onUpdate({
      imageItems: imageItems.filter(img => img.id !== id),
    });
  };

  const handleAddAssets = (newAssets: ImageItem[]) => {
    if (replaceImageId && newAssets.length > 0) {
      // Replace existing image with selected asset
      const newAsset = newAssets[0];
      onUpdate({
        imageItems: imageItems.map(img => 
          img.id === replaceImageId 
            ? { ...img, url: newAsset.url, altText: img.altText || newAsset.altText } 
            : img
        ),
      });
      setReplaceImageId(null);
    } else {
      // Add new assets
      onUpdate({
        imageItems: [...imageItems, ...newAssets],
      });
    }
  };

  const toggleIncludeOn = (location: IncludeOn) => {
    const newIncludeOn = includeOn.includes(location)
      ? includeOn.filter(l => l !== location)
      : [...includeOn, location];
    onUpdate({ includeOn: newIncludeOn });
  };

  const linkedCount = includeOn.length;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="section-header" className="text-xs">Section Header</Label>
          <Input
            id="section-header"
            value={content.header || ''}
            onChange={(e) => onUpdate({ header: e.target.value })}
            placeholder="Enter section header"
            className="h-9"
          />
        </div>

        {/* Content Tag */}
        <div className="space-y-2">
          <Label className="text-xs">Content Tag</Label>
          <Select
            value={contentTag || ''}
            onValueChange={(value) => onUpdate({ contentTag: value as ContentTag })}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              {CONTENT_TAGS.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Include On */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Include On</Label>
          {linkedCount > 1 && (
            <Badge variant="secondary" className="gap-1 text-[10px]">
              <Link2 className="w-3 h-3" />
              Included in {linkedCount} places
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          {INCLUDE_OPTIONS.map(option => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox
                id={`include-${option.value}`}
                checked={includeOn.includes(option.value)}
                onCheckedChange={() => toggleIncludeOn(option.value)}
              />
              <Label 
                htmlFor={`include-${option.value}`} 
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Image Layout */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
          Layout
        </Label>
        <TooltipProvider delayDuration={300}>
          <div className="grid grid-cols-2 gap-3">
            {LAYOUT_OPTIONS.map(option => (
              <Tooltip key={option.value}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "flex items-center justify-center gap-2 px-3 py-2 rounded-lg border-2 transition-all",
                      imageLayout === option.value 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border bg-muted/30 text-muted-foreground hover:border-muted-foreground/50"
                    )}
                    onClick={() => onUpdate({ imageLayout: option.value })}
                  >
                    <span className="shrink-0">{option.icon}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[220px] text-center">
                  <p className="text-xs">{option.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>

      {/* Images List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Images{imageItems.length > 0 ? ` (${imageItems.length})` : ''}</Label>
          {imageItems.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => {
                setReplaceImageId(null);
                setShowAddModal(true);
              }}
            >
              <Plus className="w-3 h-3" />
              Add
            </Button>
          )}
        </div>
        
        {imageItems.length > 0 ? (
          <div className="space-y-2">
            {imageItems.map((image, index) => (
              <ImageItemCard
                key={image.id}
                image={image}
                index={index}
                isExpanded={expandedImageId === image.id}
                onToggleExpand={() => setExpandedImageId(
                  expandedImageId === image.id ? null : image.id
                )}
                onUpdate={(updates) => updateImageItem(image.id, updates)}
                onDelete={() => deleteImageItem(image.id)}
                onOpenAssetModal={() => {
                  setReplaceImageId(image.id);
                  setShowAddModal(true);
                }}
              />
            ))}
          </div>
        ) : (
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            onClick={() => {
              setReplaceImageId(null);
              setShowAddModal(true);
            }}
          >
            <Plus className="w-4 h-4" />
            Add Images
          </button>
        )}
      </div>

      <AddAssetsModal
        open={showAddModal}
        onOpenChange={(open) => {
          setShowAddModal(open);
          if (!open) setReplaceImageId(null);
        }}
        onAddAssets={handleAddAssets}
        maxAssets={replaceImageId ? 1 : 10}
        singleSelect={!!replaceImageId}
        title={replaceImageId ? 'Select Image' : 'Add Assets'}
      />
    </div>
  );
}

interface ImageItemCardProps {
  image: ImageItem;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdate: (updates: Partial<ImageItem>) => void;
  onDelete: () => void;
  onOpenAssetModal: () => void;
}

function ImageItemCard({ 
  image, 
  index, 
  isExpanded, 
  onToggleExpand, 
  onUpdate, 
  onDelete,
  onOpenAssetModal,
}: ImageItemCardProps) {
  return (
    <div className="bg-muted/50 rounded-lg overflow-hidden">
      {/* Header row */}
      <div 
        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/70 transition-colors"
        onClick={onToggleExpand}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground shrink-0 cursor-grab" />
        
        <div className="w-12 h-12 rounded border border-border bg-card overflow-hidden shrink-0 relative group">
          <img 
            src={image.url} 
            alt={image.altText || `Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAssetModal();
            }}
          >
            <Pencil className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {image.caption || `Image ${index + 1}`}
          </p>
          {image.width && image.height && (
            <p className="text-xs text-muted-foreground">
              {image.width} × {image.height} px
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
          </Button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>
      
      {/* Expanded details */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-1 space-y-3 border-t border-border/50">
          {/* Image preview with change button */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border border-border group/img">
            <img 
              src={image.url} 
              alt={image.altText || ''} 
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
                  onOpenAssetModal();
                }}
              >
                <Pencil className="w-3 h-3 mr-1" />
                Change
              </Button>
            </div>
          </div>

          {/* Caption */}
          <div className="space-y-1.5">
            <Label className="text-xs">Caption</Label>
            <Input
              value={image.caption || ''}
              onChange={(e) => onUpdate({ caption: e.target.value })}
              placeholder="Enter Caption"
              className="h-8 text-sm"
            />
          </div>
          
          {/* Image Description */}
          <div className="space-y-1.5">
            <Label className="text-xs">Image Description</Label>
            <Textarea
              value={image.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Enter a description for the image. Max length 10,000 characters."
              rows={3}
              className="text-sm resize-none"
            />
          </div>
          
          {/* Alt Text */}
          <div className="space-y-1.5">
            <Label className="text-xs flex items-center gap-1">
              Image Alt Text (EN)
              <span className="text-destructive">*</span>
            </Label>
            <Input
              value={image.altText || ''}
              onChange={(e) => onUpdate({ altText: e.target.value })}
              placeholder="Enter image alt text"
              className="h-8 text-sm"
            />
            <p className="text-[10px] text-muted-foreground">
              *This value is linked to the asset, and will be used everywhere the asset is used.
            </p>
          </div>
          
          {/* Link */}
          <div className="space-y-1.5">
            <Label className="text-xs">Link</Label>
            <Input
              value={image.link || ''}
              onChange={(e) => onUpdate({ link: e.target.value })}
              placeholder="Enter a Link"
              className="h-8 text-sm"
            />
          </div>
          
          {/* Quick actions */}
          <div className="flex items-center gap-2 pt-1">
            <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
              <Eye className="w-3 h-3 mr-1" />
              View Asset Details
            </Button>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
              <Monitor className="w-3 h-3 mr-1" />
              Add Device Targeting
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}