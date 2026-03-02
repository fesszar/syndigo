import { Widget } from '@/types/widget';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink, Monitor, Smartphone, Tablet } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { WidgetRenderer } from './WidgetRenderer';

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widgets: Widget[];
}

export function PreviewModal({ open, onOpenChange, widgets }: PreviewModalProps) {
  const [viewport, setViewport] = useState<ViewportSize>('desktop');

  const viewportWidths: Record<ViewportSize, string> = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const activeWidgets = widgets.filter(w => w.isActive);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 gap-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-base font-semibold">
              Enhanced Content Preview
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex items-center gap-2">
            {/* Viewport Switcher */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewport === 'desktop' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 px-2"
                onClick={() => setViewport('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewport === 'tablet' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 px-2"
                onClick={() => setViewport('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewport === 'mobile' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 px-2"
                onClick={() => setViewport('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            <Button variant="ghost" size="sm" className="h-8 gap-1.5">
              <ExternalLink className="w-4 h-4" />
              Open in new tab
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-canvas-bg overflow-auto p-6">
          <div 
            className={cn(
              "mx-auto bg-card rounded-lg shadow-lg overflow-hidden transition-all duration-300",
              viewport !== 'desktop' && "border border-border"
            )}
            style={{ 
              width: viewportWidths[viewport],
              maxWidth: '100%',
              minHeight: '600px',
            }}
          >
            {activeWidgets.length === 0 ? (
              <div className="flex items-center justify-center h-96 text-muted-foreground">
                No active widgets to preview
              </div>
            ) : (
              <div className="divide-y divide-border">
                {activeWidgets.map((widget) => (
                  <WidgetRenderer key={widget.id} widget={widget} />
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
