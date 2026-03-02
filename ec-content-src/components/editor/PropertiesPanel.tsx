import { Widget, WIDGET_TYPES, Feature, Specification } from '@/types/widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import { 
  X, Plus, Trash2, GripVertical, AlertCircle, AlertTriangle, CheckCircle2,
  ImageIcon, FileText, Video, LayoutList, RotateCw,
  GalleryHorizontal, MousePointerClick, TableProperties, Table,
  Code, Code2, Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLayoutEffect, useMemo, useRef } from 'react';
import { validateWidget, WidgetError } from '@/utils/widgetValidation';
import { VideoWidgetSettings } from './VideoWidgetSettings';
import { FeatureSetSettings } from './FeatureSetSettings';
import { ImageWidgetSettings } from './ImageWidgetSettings';
import { IncludeOnSettings } from './IncludeOnSettings';
import { IncludeOn } from '@/types/widget';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ImageIcon, FileText, Video, LayoutList, RotateCw,
  GalleryHorizontal, MousePointerClick, TableProperties, Table,
  Code, Code2, Layers,
};

interface PropertiesPanelProps {
  widget: Widget | null;
  onUpdate: (id: string, updates: Partial<Widget>) => void;
  onClose: () => void;
  onShowPalette?: () => void;
}

export function PropertiesPanel({ widget, onUpdate, onClose, onShowPalette }: PropertiesPanelProps) {
  const contentScrollRef = useRef<HTMLDivElement | null>(null);

  const config = useMemo(() => {
    if (!widget) return undefined;
    return WIDGET_TYPES.find(t => t.type === widget.type);
  }, [widget]);

  const IconComponent = useMemo(() => {
    if (!config) return FileText;
    return iconMap[config.icon] || FileText;
  }, [config]);
  
  const validation = useMemo(() => {
    if (!widget) return { errors: [], warnings: [] };
    return validateWidget(widget);
  }, [widget]);
  const hasErrors = validation.errors.length > 0;
  const hasWarnings = validation.warnings.length > 0;

  useLayoutEffect(() => {
    if (!widget) return;
    // When selecting/adding a widget, always show the settings from the top.
    const el = contentScrollRef.current;
    if (!el) return;

    // Reset immediately (pre-paint), then once more after layout settles.
    el.scrollTop = 0;
    el.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const raf = requestAnimationFrame(() => {
      el.scrollTop = 0;
      el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => cancelAnimationFrame(raf);
  }, [widget?.id]);

  if (!widget) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
            <Layers className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            Select a widget to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const getFieldError = (field: string): WidgetError | undefined => {
    return [...validation.errors, ...validation.warnings].find(e => e.field === field);
  };

  const updateContent = (updates: Partial<Widget['content']>) => {
    onUpdate(widget.id, {
      content: { ...widget.content, ...updates },
    });
  };

  const addFeature = () => {
    const newFeature: Feature = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Feature',
      description: 'Feature description',
    };
    updateContent({
      features: [...(widget.content.features || []), newFeature],
    });
  };

  const updateFeature = (id: string, updates: Partial<Feature>) => {
    updateContent({
      features: widget.content.features?.map(f => 
        f.id === id ? { ...f, ...updates } : f
      ),
    });
  };

  const deleteFeature = (id: string) => {
    updateContent({
      features: widget.content.features?.filter(f => f.id !== id),
    });
  };

  const addSpecification = () => {
    const newSpec: Specification = {
      id: Math.random().toString(36).substr(2, 9),
      label: 'New Spec',
      value: 'Value',
    };
    updateContent({
      specifications: [...(widget.content.specifications || []), newSpec],
    });
  };

  const updateSpecification = (id: string, updates: Partial<Specification>) => {
    updateContent({
      specifications: widget.content.specifications?.map(s => 
        s.id === id ? { ...s, ...updates } : s
      ),
    });
  };

  const deleteSpecification = (id: string) => {
    updateContent({
      specifications: widget.content.specifications?.filter(s => s.id !== id),
    });
  };

  return (
    <div className="h-full w-full min-w-0 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 p-4 border-b border-sidebar-border flex items-center gap-3">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          hasErrors ? "bg-destructive/10 text-destructive" :
          hasWarnings ? "bg-warning/10 text-warning" :
          "bg-accent text-accent-foreground"
        )}>
          <IconComponent className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {config?.label || 'Widget'}
          </h3>
          <p className="text-xs text-muted-foreground">Edit properties</p>
        </div>
      </div>
      

      {/* Content */}
      <div
        key={widget.id}
        ref={contentScrollRef}
        className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden custom-scrollbar p-4 space-y-6"
      >
        {/* Basic Settings - hide for images, feature-sets, and videos (they have their own settings) */}
        {widget.type !== 'images' && widget.type !== 'feature-sets' && widget.type !== 'videos' && (
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Basic Settings
            </h4>
            
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs">Widget Title</Label>
              <Input
                id="title"
                value={widget.title}
                onChange={(e) => onUpdate(widget.id, { title: e.target.value })}
                className="h-9"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag" className="text-xs">Tag Label</Label>
              <Input
                id="tag"
                value={widget.tag || ''}
                onChange={(e) => onUpdate(widget.id, { tag: e.target.value || undefined })}
                placeholder="e.g., Features, Hero"
                className="h-9"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="active" className="text-xs">Active</Label>
              <Switch
                id="active"
                checked={widget.isActive}
                onCheckedChange={(checked) => onUpdate(widget.id, { isActive: checked })}
              />
            </div>
          </div>
        )}

        {/* Include On Settings - hide for images, feature-sets (has its own), and inline-only widgets */}
        {widget.type !== 'images' && 
         widget.type !== 'feature-sets' &&
         !['comparison-table', 'specification-table', 'iframe'].includes(widget.type) && (
          <IncludeOnSettings
            includeOn={widget.content.includeOn || []}
            onUpdate={(includeOn: IncludeOn[]) => updateContent({ includeOn })}
          />
        )}



        {/* Feature Sets - Full dedicated Settings panel */}
        {widget.type === 'feature-sets' && (
          <FeatureSetSettings 
            content={widget.content} 
            onUpdate={updateContent} 
          />
        )}

        {/* Content section - hide for feature-sets as it has its own complete UI */}
        {widget.type !== 'feature-sets' && (
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Content
            </h4>

            {/* Header - hide for images and videos widgets (they have Section Header in their settings) */}
            {widget.content.header !== undefined && widget.type !== 'images' && widget.type !== 'videos' && (
              <FieldWithValidation 
                label="Header Text" 
                id="header" 
                error={getFieldError('header')}
              >
                <Input
                  id="header"
                  value={widget.content.header || ''}
                  onChange={(e) => updateContent({ header: e.target.value })}
                  className={cn("h-9", getFieldError('header') && "border-warning")}
                />
              </FieldWithValidation>
            )}

            {/* Description */}
            {widget.content.description !== undefined && (
              <FieldWithValidation 
                label="Description" 
                id="description" 
                error={getFieldError('description')}
              >
                <Textarea
                  id="description"
                  value={widget.content.description || ''}
                  onChange={(e) => updateContent({ description: e.target.value })}
                  rows={3}
                  className={cn("resize-none", getFieldError('description') && "border-destructive")}
                />
              </FieldWithValidation>
            )}

            {/* Video Widget - Full Settings */}
            {widget.type === 'videos' && (
              <VideoWidgetSettings 
                content={widget.content} 
                onUpdate={updateContent} 
              />
            )}

            {/* Image Widget - Full Settings */}
            {widget.type === 'images' && (
              <ImageWidgetSettings 
                content={widget.content} 
                onUpdate={updateContent} 
              />
            )}

            {/* Carousel - Basic Image URL */}
            {widget.type === 'carousel' && (
              <FieldWithValidation 
                label="Image URL" 
                id="imageUrl" 
                error={getFieldError('images')}
              >
                <Input
                  id="imageUrl"
                  value={widget.content.images?.[0] || ''}
                  onChange={(e) => updateContent({ images: [e.target.value] })}
                  placeholder="https://..."
                  className={cn("h-9", getFieldError('images') && "border-destructive")}
                />
              </FieldWithValidation>
            )}

            {/* Specifications */}
            {widget.type === 'specification-table' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Specifications</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={addSpecification}
                    className="h-7 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {widget.content.specifications?.map((spec, index) => (
                    <div
                      key={spec.id}
                      className="bg-muted/50 rounded-lg p-3 space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Spec {index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => deleteSpecification(spec.id)}
                        >
                          <Trash2 className="w-3 h-3 text-muted-foreground" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={spec.label}
                          onChange={(e) => updateSpecification(spec.id, { label: e.target.value })}
                          placeholder="Label"
                          className="h-8 text-sm"
                        />
                        <Input
                          value={spec.value}
                          onChange={(e) => updateSpecification(spec.id, { value: e.target.value })}
                          placeholder="Value"
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface FieldWithValidationProps {
  label: string;
  id: string;
  error?: WidgetError;
  children: React.ReactNode;
}

function FieldWithValidation({ label, id, error, children }: FieldWithValidationProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-xs">{label}</Label>
        {error && (
          <span className={cn(
            "text-[10px] flex items-center gap-1",
            error.severity === 'error' ? "text-destructive" : "text-warning"
          )}>
            {error.severity === 'error' ? (
              <AlertCircle className="w-3 h-3" />
            ) : (
              <AlertTriangle className="w-3 h-3" />
            )}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className={cn(
          "text-[10px]",
          error.severity === 'error' ? "text-destructive" : "text-warning"
        )}>
          {error.message}
        </p>
      )}
    </div>
  );
}
