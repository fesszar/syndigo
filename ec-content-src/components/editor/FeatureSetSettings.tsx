import { useState, useEffect } from 'react';
import { WidgetContent, Feature, CONTENT_TAGS, ContentTag, IncludeOn } from '@/types/widget';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Rows3, Columns3, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IncludeOnSettings } from './IncludeOnSettings';
import { FeatureRowEditor } from './FeatureRowEditor';

// Custom alignment icons matching the wireframe style
const ImageLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="5" width="8" height="8" rx="1" />
    <line x1="14" y1="6" x2="21" y2="6" />
    <line x1="14" y1="9" x2="21" y2="9" />
    <line x1="14" y1="12" x2="18" y2="12" />
    <line x1="3" y1="16" x2="21" y2="16" />
    <line x1="3" y1="19" x2="15" y2="19" />
  </svg>
);

const ImageRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="13" y="5" width="8" height="8" rx="1" />
    <line x1="3" y1="6" x2="10" y2="6" />
    <line x1="3" y1="9" x2="10" y2="9" />
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="3" y1="16" x2="21" y2="16" />
    <line x1="9" y1="19" x2="21" y2="19" />
  </svg>
);

const AlternatingIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <line x1="11" y1="4" x2="21" y2="4" />
    <line x1="11" y1="7" x2="17" y2="7" />
    <rect x="15" y="12" width="6" height="6" rx="1" />
    <line x1="3" y1="13" x2="13" y2="13" />
    <line x1="7" y1="16" x2="13" y2="16" />
  </svg>
);

// Column count icons
const TwoColumnsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="7" height="16" rx="1" />
    <rect x="14" y="4" width="7" height="16" rx="1" />
  </svg>
);

const ThreeColumnsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="5" height="16" rx="1" />
    <rect x="9.5" y="4" width="5" height="16" rx="1" />
    <rect x="17" y="4" width="5" height="16" rx="1" />
  </svg>
);

const FourColumnsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1.5" y="4" width="4" height="16" rx="1" />
    <rect x="7.5" y="4" width="4" height="16" rx="1" />
    <rect x="13.5" y="4" width="4" height="16" rx="1" />
    <rect x="19.5" y="4" width="4" height="16" rx="1" />
  </svg>
);

interface FeatureSetSettingsProps {
  content: WidgetContent;
  onUpdate: (updates: Partial<WidgetContent>) => void;
}

type LayoutType = 'horizontal' | 'vertical';
type HorizontalAlignment = 'image-left' | 'image-right' | 'alternating';

interface FeatureSettings {
  layout: LayoutType;
  columns: number;
  horizontalAlignment: HorizontalAlignment;
}

const LAYOUT_OPTIONS = [
  { id: 'horizontal', icon: Rows3, label: 'Horizontal', description: 'Side-by-side columns' },
  { id: 'vertical', icon: Columns3, label: 'Vertical', description: 'Stacked rows' },
];

const HORIZONTAL_ALIGNMENT_OPTIONS = [
  { id: 'image-left', icon: ImageLeftIcon, label: 'Image Left' },
  { id: 'image-right', icon: ImageRightIcon, label: 'Image Right' },
  { id: 'alternating', icon: AlternatingIcon, label: 'Alternating' },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

export function FeatureSetSettings({ content, onUpdate }: FeatureSetSettingsProps) {
  const features = content.features || [];
  
  // Feature settings derived from content
  const getSettingsFromContent = (): FeatureSettings => ({
    layout: (content as any).featureLayout || 'horizontal',
    columns: (content as any).featureColumns || 3,
    horizontalAlignment: (content as any).horizontalAlignment || 'image-left',
  });

  const [settings, setSettings] = useState<FeatureSettings>(getSettingsFromContent);
  const [expandedFeatureIds, setExpandedFeatureIds] = useState<Set<string>>(new Set());
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Sync settings when content changes externally
  useEffect(() => {
    setSettings(getSettingsFromContent());
  }, [
    (content as any).featureLayout,
    (content as any).featureColumns,
    (content as any).horizontalAlignment,
  ]);

  const updateSettings = (updates: Partial<FeatureSettings>) => {
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    
    onUpdate({
      featureLayout: newSettings.layout,
      featureColumns: newSettings.columns,
      horizontalAlignment: newSettings.horizontalAlignment,
    } as any);
  };

  const toggleFeatureExpanded = (featureId: string) => {
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
    const newFeature: Feature = {
      id: generateId(),
      title: '',
      description: '',
    };
    onUpdate({
      features: [...features, newFeature],
    });
    // Auto-expand the new feature
    setExpandedFeatureIds(prev => new Set(prev).add(newFeature.id));
  };

  const updateFeature = (id: string, updates: Partial<Feature>) => {
    onUpdate({
      features: features.map(f => 
        f.id === id ? { ...f, ...updates } : f
      ),
    });
  };

  const deleteFeature = (id: string) => {
    onUpdate({
      features: features.filter(f => f.id !== id),
    });
    setExpandedFeatureIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newFeatures = [...features];
    const [draggedItem] = newFeatures.splice(draggedIndex, 1);
    newFeatures.splice(index, 0, draggedItem);
    
    onUpdate({ features: newFeatures });
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Section Header & Content Tag */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">Section Header</Label>
          <Input
            value={content.header || ''}
            onChange={(e) => onUpdate({ header: e.target.value })}
            placeholder="Enter section header..."
            className="h-9"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Content Tag</Label>
          <Select 
            value={content.contentTag || ''} 
            onValueChange={(v) => onUpdate({ contentTag: v as ContentTag })}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select a content tag..." />
            </SelectTrigger>
            <SelectContent>
              {CONTENT_TAGS.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Include On */}
      <IncludeOnSettings
        includeOn={content.includeOn || []}
        onUpdate={(includeOn: IncludeOn[]) => onUpdate({ includeOn })}
      />

      <Separator />

      {/* Layout Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Layout
        </h4>
        
        {/* Layout Type - Visual Grid */}
        <div className="grid grid-cols-2 gap-2">
          {LAYOUT_OPTIONS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => updateSettings({ layout: id as LayoutType })}
              className={cn(
                "flex flex-col items-center gap-1.5 p-3 rounded-lg border text-center transition-all",
                settings.layout === id
                  ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20"
                  : "border-border hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Horizontal alignment options */}
        {settings.layout === 'horizontal' && (
          <div className="space-y-2">
            <Label className="text-xs">Image & Text Alignment</Label>
            <div className="grid grid-cols-3 gap-1.5">
              {HORIZONTAL_ALIGNMENT_OPTIONS.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => updateSettings({ horizontalAlignment: id as HorizontalAlignment })}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-2.5 rounded-lg border text-center transition-all",
                    settings.horizontalAlignment === id
                      ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20"
                      : "border-border hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Columns (for vertical layout) */}
        {settings.layout === 'vertical' && (
          <div className="space-y-2">
            <Label className="text-xs">Columns</Label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { col: 2, icon: TwoColumnsIcon, label: '2 Column' },
                { col: 3, icon: ThreeColumnsIcon, label: '3 Column' },
                { col: 4, icon: FourColumnsIcon, label: '4 Column' },
              ].map(({ col, icon: Icon, label }) => (
                <button
                  key={col}
                  onClick={() => updateSettings({ columns: col })}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-2.5 rounded-lg border text-center transition-all",
                    settings.columns === col
                      ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20"
                      : "border-border hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Features List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Features ({features.length})
          </h4>
        </div>

        <div className="space-y-2">
          {features.map((feature, index) => (
            <FeatureRowEditor
              key={feature.id}
              feature={feature}
              index={index}
              isExpanded={expandedFeatureIds.has(feature.id)}
              onToggleExpand={() => toggleFeatureExpanded(feature.id)}
              onUpdate={(updates) => updateFeature(feature.id, updates)}
              onDelete={() => deleteFeature(feature.id)}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              isDragging={draggedIndex === index}
            />
          ))}
        </div>

        {/* Add Feature Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={addFeature}
          className="w-full h-9 text-xs border-dashed"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add Feature
        </Button>
      </div>
    </div>
  );
}
