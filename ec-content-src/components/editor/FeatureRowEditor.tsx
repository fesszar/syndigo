import { useState } from 'react';
import { Feature } from '@/types/widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  GripVertical, ChevronUp, ChevronDown, Trash2, Plus, ImageIcon 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureRowEditorProps {
  feature: Feature;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdate: (updates: Partial<Feature>) => void;
  onDelete: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  isDragging?: boolean;
}

export function FeatureRowEditor({
  feature,
  index,
  isExpanded,
  onToggleExpand,
  onUpdate,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
  isDragging,
}: FeatureRowEditorProps) {
  const handleImageUpload = () => {
    // Create file input and trigger click
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onUpdate({ imageUrl: url });
      }
    };
    input.click();
  };

  const handleRemoveImage = () => {
    onUpdate({ imageUrl: undefined });
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={cn(
        "border border-border rounded-lg bg-card transition-all",
        isDragging && "opacity-50 border-primary",
        isExpanded && "ring-1 ring-primary/20"
      )}
    >
      <Collapsible open={isExpanded} onOpenChange={onToggleExpand}>
        {/* Header */}
        <div className="flex items-center gap-2 p-3 border-b border-border/50">
          <div
            className="cursor-grab hover:text-foreground text-muted-foreground"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <GripVertical className="w-4 h-4" />
          </div>
          
          <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-primary">{index + 1}</span>
          </div>
          
          <span className="flex-1 text-sm font-medium truncate">
            {feature.title || `[ Feature Caption ]`}
          </span>
          
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <div className="w-px h-5 bg-border" />
          
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Expanded Content */}
        <CollapsibleContent>
          <div className="p-4 space-y-4">
            <div className="flex gap-4">
              {/* Image Upload Area */}
              <div className="shrink-0">
                <div 
                  className={cn(
                    "w-32 h-28 rounded-lg border-2 border-dashed border-border",
                    "flex flex-col items-center justify-center gap-2 cursor-pointer",
                    "hover:border-primary/50 hover:bg-muted/30 transition-colors",
                    "bg-muted/20"
                  )}
                  onClick={feature.imageUrl ? undefined : handleImageUpload}
                >
                  {feature.imageUrl ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={feature.imageUrl} 
                        alt={feature.title} 
                        className="w-full h-full object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <p className="text-[10px] text-muted-foreground text-center px-2">
                        Click the + icon below to add an image or a video.
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full border border-border"
                        onClick={handleImageUpload}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5">Asset Type:</p>
              </div>

              {/* Text Fields */}
              <div className="flex-1 space-y-3">
                {/* Caption */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Caption</Label>
                  <Input
                    value={feature.title || ''}
                    onChange={(e) => onUpdate({ title: e.target.value })}
                    placeholder="Enter Caption"
                    className="h-9"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Feature Description</Label>
                  <Textarea
                    value={feature.description || ''}
                    onChange={(e) => onUpdate({ description: e.target.value })}
                    placeholder="Enter a description. Max length 10,000 characters."
                    rows={4}
                    className="resize-none text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
