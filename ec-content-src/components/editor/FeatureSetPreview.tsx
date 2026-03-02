import { useState, useRef, useCallback } from 'react';
import { WidgetContent, Feature } from '@/types/widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  LayoutList, Grid3X3, Rows3, Columns3,
  Circle, Square, Star, Zap, CheckCircle, Info,
  Plus, ImageIcon, ChevronsUpDown, ChevronsDownUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FeatureItemEditor, ExtendedFeature } from './FeatureItemEditor';
import { HorizontalFeatureRow } from './HorizontalFeatureRow';
import { VerticalFeatureCard } from './VerticalFeatureCard';

interface FeatureSetPreviewProps {
  content: WidgetContent;
  onUpdate?: (updates: Partial<WidgetContent>) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  circle: Circle,
  square: Square,
  star: Star,
  zap: Zap,
  check: CheckCircle,
  info: Info,
};

// Layout icons for horizontal/vertical display
const LAYOUT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  horizontal: Columns3,
  vertical: Rows3,
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export function FeatureSetPreview({ content, onUpdate }: FeatureSetPreviewProps) {
  const features = (content.features || []) as ExtendedFeature[];
  
  // Read layout settings from content - these are updated by FeatureSetSettings
  const layout = content.featureLayout || 'horizontal';
  const showIcons = content.showIcons ?? true;
  const columns = content.featureColumns || 2;
  const imagePosition = content.imagePosition || 'left';
  const horizontalAlignment = content.horizontalAlignment || 'image-left';
  
  // Derive which of the 6 layouts we're showing:
  // Horizontal: image-left, image-right, alternating (3)
  // Vertical: 2-col, 3-col, 4-col (3)
  const layoutKey = layout === 'horizontal' 
    ? `horizontal-${horizontalAlignment}` 
    : `vertical-${columns}col`;
  
  console.log('[FeatureSetPreview] Layout:', layoutKey, { layout, columns, horizontalAlignment });
  
  const LayoutIcon = layout === 'horizontal' ? Columns3 : Rows3;
  
  // State for expansion control
  const [expansionMode, setExpansionMode] = useState<'expanded' | 'collapsed' | 'individual'>('individual');
  const [expandedFeatureIds, setExpandedFeatureIds] = useState<Set<string>>(new Set());
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Check if a feature is expanded based on mode
  const isFeatureExpanded = (featureId: string) => {
    if (expansionMode === 'expanded') return true;
    if (expansionMode === 'collapsed') return false;
    return expandedFeatureIds.has(featureId);
  };

  const toggleFeatureExpanded = (featureId: string) => {
    setExpansionMode('individual');
    setExpandedFeatureIds(prev => {
      const next = new Set(prev);
      if (next.has(featureId)) {
        next.delete(featureId);
      } else {
        next.add(featureId);
      }
      return next;
    });
  };

  const addFeature = () => {
    if (!onUpdate) return;
    const newFeature: ExtendedFeature = {
      id: generateId(),
      title: 'New Feature',
      description: 'Feature description',
      icon: 'circle',
    };
    onUpdate({
      features: [...features, newFeature],
    });
    // Auto-expand and select the new feature
    setSelectedFeatureId(newFeature.id);
    setExpansionMode('individual');
    setExpandedFeatureIds(prev => new Set(prev).add(newFeature.id));
  };

  const updateFeature = (id: string, updates: Partial<ExtendedFeature>) => {
    if (!onUpdate) return;
    onUpdate({
      features: features.map(f => 
        f.id === id ? { ...f, ...updates } : f
      ),
    });
  };

  const deleteFeature = (id: string) => {
    if (!onUpdate) return;
    onUpdate({
      features: features.filter(f => f.id !== id),
    });
    if (selectedFeatureId === id) {
      setSelectedFeatureId(null);
    }
  };

  const duplicateFeature = (id: string) => {
    if (!onUpdate) return;
    const feature = features.find(f => f.id === id);
    if (!feature) return;
    
    const newFeature: ExtendedFeature = {
      ...feature,
      id: generateId(),
      title: `${feature.title} (Copy)`,
    };
    
    const index = features.findIndex(f => f.id === id);
    const newFeatures = [...features];
    newFeatures.splice(index + 1, 0, newFeature);
    
    onUpdate({ features: newFeatures });
    setSelectedFeatureId(newFeature.id);
    setExpansionMode('individual');
    setExpandedFeatureIds(prev => new Set(prev).add(newFeature.id));
  };

  const moveFeature = (index: number, direction: 'up' | 'down') => {
    if (!onUpdate) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= features.length) return;
    
    const newFeatures = [...features];
    [newFeatures[index], newFeatures[newIndex]] = [newFeatures[newIndex], newFeatures[index]];
    onUpdate({ features: newFeatures });
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    // Reorder on drag over
    const newFeatures = [...features];
    const [draggedItem] = newFeatures.splice(draggedIndex, 1);
    newFeatures.splice(index, 0, draggedItem);
    
    if (onUpdate) {
      onUpdate({ features: newFeatures });
    }
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Helper to determine image alignment for a feature at a given index
  const getImageAlignment = (index: number): 'left' | 'right' | 'none' => {
    if (imagePosition === 'none') return 'none';
    if (layout !== 'horizontal') return imagePosition as 'left' | 'right';
    
    switch (horizontalAlignment) {
      case 'image-left':
        return 'left';
      case 'image-right':
        return 'right';
      case 'alternating':
        return index % 2 === 0 ? 'left' : 'right';
      default:
        return 'left';
    }
  };

  // If no onUpdate, show read-only compact preview
  if (!onUpdate) {
    return (
      <div className="space-y-2">
        {/* Layout indicator */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <LayoutIcon className="w-3.5 h-3.5" />
          <span className="capitalize">{layout} Layout</span>
          {layout === 'vertical' && <span>• {columns} cols</span>}
          {layout === 'horizontal' && <span>• {horizontalAlignment.replace('-', ' ')}</span>}
          <span className="ml-auto">{features.length} features</span>
        </div>

        {/* Feature preview */}
        <div className={cn(
          "gap-2",
          layout === 'vertical' 
            ? `grid ${columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-4'}`
            : 'space-y-1.5'
        )}>
          {features.slice(0, layout === 'vertical' ? 4 : 3).map((feature, index) => {
            const IconComponent = showIcons && feature.icon ? ICON_MAP[feature.icon] || Circle : null;
            const alignment = getImageAlignment(index);
            const hasImage = !!feature.imageUrl;
            
            // Horizontal layout with image
            if (layout === 'horizontal' && alignment !== 'none') {
              return (
                <div
                  key={feature.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-md bg-muted/40 border border-border/50",
                    alignment === 'right' && "flex-row-reverse"
                  )}
                >
                  {/* Image placeholder */}
                  <div className="w-16 h-16 rounded-md bg-muted border border-border/50 flex items-center justify-center shrink-0 overflow-hidden">
                    {hasImage ? (
                      <img src={feature.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-muted-foreground/50" />
                    )}
                  </div>
                  {/* Text content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {showIcons && IconComponent && (
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <IconComponent className="w-2.5 h-2.5 text-primary" />
                        </div>
                      )}
                      <p className="text-xs font-medium truncate">{feature.title}</p>
                    </div>
                    <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            }
            
            return (
              <div
                key={feature.id}
                className={cn(
                  "flex items-start gap-2 p-2 rounded-md bg-muted/40 border border-border/50"
                )}
              >
                {showIcons && IconComponent && (
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <IconComponent className="w-3 h-3 text-primary" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium truncate">{feature.title}</p>
                  {layout !== 'vertical' && (
                    <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
          
          {features.length > (layout === 'vertical' ? 4 : 3) && (
            <div className="text-[10px] text-muted-foreground text-center py-1">
              +{features.length - (layout === 'vertical' ? 4 : 3)} more features
            </div>
          )}
        </div>

        {features.length === 0 && (
          <div className="text-center py-4 border border-dashed border-border rounded-lg">
            <p className="text-xs text-muted-foreground">No features configured</p>
          </div>
        )}
      </div>
    );
  }

  // Full inline editing view
  return (
    <div className="space-y-3">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <LayoutIcon className="w-3.5 h-3.5" />
          <span className="capitalize">{layout}</span>
          {layout === 'vertical' && <span>• {columns} cols</span>}
          {layout === 'horizontal' && <span>• {horizontalAlignment.replace('-', ' ')}</span>}
          <span className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-medium">
            {features.length} {features.length === 1 ? 'feature' : 'features'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Expand/Collapse All */}
          <div className="flex items-center border border-border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-6 px-2 text-[10px] rounded-none gap-1",
                expansionMode === 'expanded' && "bg-muted"
              )}
              onClick={() => setExpansionMode('expanded')}
            >
              <ChevronsUpDown className="w-3 h-3" />
              Expand All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-6 px-2 text-[10px] rounded-none border-l border-border gap-1",
                expansionMode === 'collapsed' && "bg-muted"
              )}
              onClick={() => setExpansionMode('collapsed')}
            >
              <ChevronsDownUp className="w-3 h-3" />
              Collapse All
            </Button>
          </div>
        </div>
      </div>

      {/* Features List - Layout Dependent */}
      {layout === 'horizontal' ? (
        // Horizontal Layout: Image + Text rows
        <div className="space-y-2">
          {features.map((feature, index) => {
            const alignment = getImageAlignment(index);
            return (
              <HorizontalFeatureRow
                key={feature.id}
                feature={feature}
                index={index}
                imageAlignment={alignment === 'none' ? 'left' : alignment}
                showIcons={showIcons}
                isSelected={selectedFeatureId === feature.id}
                isDragging={draggedIndex === index}
                onSelect={() => setSelectedFeatureId(feature.id)}
                onUpdate={(updates) => updateFeature(feature.id, updates)}
                onDelete={() => deleteFeature(feature.id)}
                onDuplicate={() => duplicateFeature(feature.id)}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
              />
            );
          })}
        </div>
      ) : (
        // Vertical Layout: Grid of cards - show only as many features as columns
        <div className={cn(
          "grid gap-6",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-4"
        )}>
          {features.slice(0, columns).map((feature, index) => (
            <VerticalFeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              isSelected={selectedFeatureId === feature.id}
              isDragging={draggedIndex === index}
              onSelect={() => setSelectedFeatureId(feature.id)}
              onUpdate={(updates) => updateFeature(feature.id, updates)}
              onDelete={() => deleteFeature(feature.id)}
              onDuplicate={() => duplicateFeature(feature.id)}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {features.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-border rounded-lg bg-muted/20">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">No features yet</p>
          <p className="text-xs text-muted-foreground mb-3">
            Add your first feature to get started
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={addFeature}
            className="h-8 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Feature
          </Button>
        </div>
      )}

      {/* Add Feature Button */}
      {features.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={addFeature}
          className="w-full h-9 text-xs border-dashed"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add Feature
        </Button>
      )}
    </div>
  );
}