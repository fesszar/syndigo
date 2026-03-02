import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WIDGET_TYPES, WidgetType, Widget } from '@/types/widget';
import { HOTSPOT_WIDGETS, TOOLBAR_WIDGETS, INLINE_WIDGETS, getDefaultHotspotIcon } from './DraggableWidgetPalette';
import { 
  FileText, 
  LayoutTemplate, 
  Layers, 
  ArrowRight, 
  ArrowLeft,
  Check,
  ImageIcon,
  Video,
  LayoutList,
  RotateCw,
  GalleryHorizontal,
  MousePointerClick,
  TableProperties,
  Table,
  Code,
  Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type OnboardingStep = 'choose' | 'widgets' | 'templates';

interface WidgetSelection {
  hero: WidgetType[];
  inline: WidgetType[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  heroWidgets: WidgetType[];
  inlineWidgets: WidgetType[];
  thumbnail?: string;
}

const PRESET_TEMPLATES: Template[] = [
  {
    id: 'product-showcase',
    name: 'Product Showcase',
    description: 'Feature-rich layout with images, videos, and key features',
    heroWidgets: ['images', 'videos'],
    inlineWidgets: ['feature-sets', 'images', 'specification-table'],
  },
  {
    id: 'simple-gallery',
    name: 'Simple Gallery',
    description: 'Clean image-focused layout with carousel',
    heroWidgets: ['images'],
    inlineWidgets: ['carousel', 'images', 'text-html'],
  },
  {
    id: 'technical-product',
    name: 'Technical Product',
    description: 'Detailed specs and comparison tables for complex products',
    heroWidgets: ['images', '360-view'],
    inlineWidgets: ['specification-table', 'comparison-table', 'feature-sets', 'documents'],
  },
  {
    id: 'interactive-experience',
    name: 'Interactive Experience',
    description: 'Engaging tours and interactive elements',
    heroWidgets: ['videos', 'interactive-tour'],
    inlineWidgets: ['interactive-tour', 'carousel', 'feature-sets'],
  },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
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
};

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartBlank: () => void;
  onStartWithWidgets: (heroWidgets: Widget[], inlineWidgets: Widget[]) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// Widget types that should be added to both Hotspots and Toolbar when selected in Hero
const SHARED_HERO_WIDGET_TYPES: WidgetType[] = ['images', 'documents', 'videos', 'carousel', 'text-html'];

function createWidgetFromType(
  type: WidgetType, 
  context: 'hero' | 'inline', 
  order: number,
  heroContext?: 'toolbar' | 'hotspot'
): Widget {
  const config = WIDGET_TYPES.find(t => t.type === type);
  if (!config) throw new Error(`Unknown widget type: ${type}`);

  let includeOn: string[];
  let widgetContext: 'toolbar' | 'hotspot' | 'inline';

  if (context === 'hero') {
    widgetContext = heroContext || 'toolbar';
    includeOn = [widgetContext];
  } else {
    widgetContext = 'inline';
    includeOn = ['inline'];
  }

  return {
    id: generateId(),
    type,
    title: config.label,
    isActive: true,
    order,
    sections: [context],
    context: widgetContext,
    content: {
      ...config.defaultContent,
      includeOn: includeOn as any,
      // Add random hotspot position and default icon for hotspot widgets
      ...(heroContext === 'hotspot' ? {
        hotspotPosition: {
          x: 20 + Math.random() * 60,
          y: 20 + Math.random() * 60,
        },
        hotspotIcon: getDefaultHotspotIcon(type),
      } : {}),
    },
  };
}

export function OnboardingModal({
  open,
  onOpenChange,
  onStartBlank,
  onStartWithWidgets,
}: OnboardingModalProps) {
  const [step, setStep] = useState<OnboardingStep>('choose');
  const [widgetSelection, setWidgetSelection] = useState<WidgetSelection>({
    hero: [],
    inline: [],
  });

  const heroWidgetConfigs = WIDGET_TYPES.filter(t => TOOLBAR_WIDGETS.includes(t.type));
  const inlineWidgetConfigs = WIDGET_TYPES.filter(t => INLINE_WIDGETS.includes(t.type));

  const handleBlankStart = () => {
    onStartBlank();
    onOpenChange(false);
    resetState();
  };

  const handleWidgetToggle = (type: WidgetType, section: 'hero' | 'inline') => {
    setWidgetSelection(prev => {
      const current = prev[section];
      const updated = current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type];
      return { ...prev, [section]: updated };
    });
  };

  const handleStartWithWidgets = () => {
    const heroWidgets: Widget[] = [];
    let heroOrder = 0;
    
    widgetSelection.hero.forEach((type) => {
      // Check if this widget type should be added to both Hotspots and Toolbar
      if (SHARED_HERO_WIDGET_TYPES.includes(type)) {
        // Add to Toolbar
        heroWidgets.push(createWidgetFromType(type, 'hero', heroOrder++, 'toolbar'));
        // Add to Hotspots
        heroWidgets.push(createWidgetFromType(type, 'hero', heroOrder++, 'hotspot'));
      } else {
        // Non-shared widgets only go to Toolbar
        heroWidgets.push(createWidgetFromType(type, 'hero', heroOrder++, 'toolbar'));
      }
    });
    
    const inlineWidgets = widgetSelection.inline.map((type, i) => 
      createWidgetFromType(type, 'inline', i)
    );
    onStartWithWidgets(heroWidgets, inlineWidgets);
    onOpenChange(false);
    resetState();
  };

  const handleSelectTemplate = (template: Template) => {
    const heroWidgets = template.heroWidgets.map((type, i) => 
      createWidgetFromType(type, 'hero', i)
    );
    const inlineWidgets = template.inlineWidgets.map((type, i) => 
      createWidgetFromType(type, 'inline', i)
    );
    onStartWithWidgets(heroWidgets, inlineWidgets);
    onOpenChange(false);
    resetState();
  };

  const resetState = () => {
    setStep('choose');
    setWidgetSelection({ hero: [], inline: [] });
  };

  const totalSelected = widgetSelection.hero.length + widgetSelection.inline.length;

  const renderWidgetIcon = (iconName: string) => {
    const IconComponent = ICON_MAP[iconName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : <Layers className="w-4 h-4" />;
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) resetState();
      onOpenChange(newOpen);
    }}>
      <DialogContent className={cn(
        "max-w-2xl overflow-hidden flex flex-col",
        step === 'choose' ? "h-auto" : "h-[85vh]"
      )}>
        {/* Fixed Header */}
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-xl">
            {step === 'choose' && 'Start Building Your Content'}
            {step === 'widgets' && 'Select Widgets'}
            {step === 'templates' && 'Choose a Template'}
          </DialogTitle>
          <DialogDescription>
            {step === 'choose' && 'Choose how you want to start creating your enhanced content experience.'}
            {step === 'widgets' && 'Select the widgets you want to include in your Hero and Inline sections.'}
            {step === 'templates' && 'Start with a pre-designed layout that you can customize.'}
          </DialogDescription>
        </DialogHeader>

        {/* Step: Choose Starting Point */}
        {step === 'choose' && (
          <div className="grid grid-cols-3 gap-4 py-6">
            {/* Blank Page Option */}
            <button
              onClick={handleBlankStart}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <FileText className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Blank Page</h3>
                <p className="text-xs text-muted-foreground mt-1">Start from scratch</p>
              </div>
            </button>

            {/* Select Widgets Option */}
            <button
              onClick={() => setStep('widgets')}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Layers className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Select Widgets</h3>
                <p className="text-xs text-muted-foreground mt-1">Choose what to include</p>
              </div>
            </button>

            {/* Template Option */}
            <button
              onClick={() => setStep('templates')}
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <LayoutTemplate className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Use Template</h3>
                <p className="text-xs text-muted-foreground mt-1">Pre-made layouts</p>
              </div>
            </button>
          </div>
        )}

        {/* Step: Select Widgets */}
        {step === 'widgets' && (
          <>
            {/* Scrollable Content Area */}
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-6 py-4 pr-2">
                {/* Hero Widgets */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-sm">Above the Fold (Hero) Widgets</h3>
                    {widgetSelection.hero.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {widgetSelection.hero.length} selected
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {heroWidgetConfigs.map((config) => {
                      const isSelected = widgetSelection.hero.includes(config.type);
                      return (
                        <button
                          key={config.type}
                          onClick={() => handleWidgetToggle(config.type, 'hero')}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all",
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary/50"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}>
                            {renderWidgetIcon(config.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{config.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{config.description}</p>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Inline Widgets */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-sm">Below the Fold (In-Line) Widgets</h3>
                    {widgetSelection.inline.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {widgetSelection.inline.length} selected
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {inlineWidgetConfigs.map((config) => {
                      const isSelected = widgetSelection.inline.includes(config.type);
                      return (
                        <button
                          key={config.type}
                          onClick={() => handleWidgetToggle(config.type, 'inline')}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all",
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary/50"
                          )}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                            isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}>
                            {renderWidgetIcon(config.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{config.label}</p>
                            <p className="text-xs text-muted-foreground truncate">{config.description}</p>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-primary shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Fixed Footer */}
            <div className="shrink-0 flex items-center justify-between pt-4 border-t border-border bg-background -mx-6 px-6 -mb-6 pb-6">
              <Button variant="ghost" onClick={() => setStep('choose')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                {totalSelected > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {totalSelected} widget{totalSelected !== 1 ? 's' : ''} selected
                  </span>
                )}
                <Button 
                  onClick={handleStartWithWidgets}
                  disabled={totalSelected === 0}
                >
                  Start Building
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Step: Templates */}
        {step === 'templates' && (
          <div className="flex-1 flex flex-col min-h-0">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="grid grid-cols-2 gap-4 py-4">
                {PRESET_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleSelectTemplate(template)}
                    className="group flex flex-col p-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left"
                  >
                    {/* Template Preview Placeholder */}
                    <div className="w-full aspect-video rounded-lg bg-muted mb-3 flex items-center justify-center overflow-hidden">
                      <div className="flex flex-wrap gap-1 p-2">
                        {[...template.heroWidgets, ...template.inlineWidgets].slice(0, 6).map((type, i) => {
                          const config = WIDGET_TYPES.find(t => t.type === type);
                          return (
                            <div key={i} className="w-6 h-6 rounded bg-background flex items-center justify-center">
                              {config && renderWidgetIcon(config.icon)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {template.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      <Badge variant="secondary" className="text-[10px]">
                        {template.heroWidgets.length} Hero
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        {template.inlineWidgets.length} Inline
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
              <Button variant="ghost" onClick={() => setStep('choose')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button variant="outline" onClick={handleBlankStart}>
                Start Blank Instead
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
