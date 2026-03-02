 import { 
   Wifi, 
   Eye, 
   Upload, 
   Trash2, 
   FileEdit,
   Sparkles,
   AlertCircle,
   Plus,
  ClipboardPaste,
  Copy,
  LayoutTemplate
 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface CollectionToolbarProps {
  onPreview: () => void;
  onAddWidget?: () => void;
  missingVtt?: number;
  missingAltText?: number;
  viewMode?: 'builder' | 'wysiwyg';
  onExitVisualBuilder?: () => void;
}

export function CollectionToolbar({ 
  onPreview,
  onAddWidget,
  missingVtt = 0,
  missingAltText = 0,
  viewMode = 'builder',
  onExitVisualBuilder,
}: CollectionToolbarProps) {
  const isVisualBuilder = viewMode === 'wysiwyg';

  return (
    <TooltipProvider delayDuration={200}>
      <div>
        {/* Actions Bar - Light blue background */}
        <div className="px-4 py-2 flex items-center justify-between bg-slate-200 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700">
          {isVisualBuilder ? (
            // Visual Builder: Icons only with tooltips
            <>
              <div className="flex items-center gap-0.5">
                <Button
                  onClick={onPreview}
                  className="h-8 px-4 text-xs font-bold rounded-full bg-primary hover:bg-primary/90 text-white gap-1 mr-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  PREVIEW
                </Button>
                <ToolbarIconButton icon={Wifi} label="Collection Status" />
                <ToolbarIconButton icon={ClipboardPaste} label="Use Template" />
                <ToolbarIconButton icon={Copy} label="Copy Content" />
                <ToolbarIconButton icon={Upload} label="Export Assets" />
                <ToolbarIconButton icon={LayoutTemplate} label="Create Template" />
                <ToolbarIconButton icon={Plus} label="Create New Collection" />
                <ToolbarIconButton icon={Trash2} label="Delete Collection" />
              </div>
              <div className="flex items-center gap-2">
                {(missingVtt > 0 || missingAltText > 0) && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="border-destructive text-destructive hover:bg-destructive/5 font-medium rounded-full px-3 h-8 text-xs bg-white dark:bg-slate-900"
                      >
                        <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                        ACCESSIBILITY
                        <span className="ml-1.5 bg-destructive/10 text-destructive px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                          {missingVtt + missingAltText}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-3" align="end">
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground">Accessibility Issues</h4>
                        <div className="space-y-2">
                          {missingVtt > 0 && (
                            <div className="flex items-center gap-2 text-destructive">
                              <AlertCircle className="w-4 h-4 shrink-0" />
                              <span className="text-sm">[{missingVtt}] videos missing vtt</span>
                            </div>
                          )}
                          {missingAltText > 0 && (
                            <div className="flex items-center gap-2 text-destructive">
                              <AlertCircle className="w-4 h-4 shrink-0" />
                              <span className="text-sm">[{missingAltText}] assets missing alt text</span>
                            </div>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 font-medium rounded-full h-8 text-xs bg-white dark:bg-slate-900"
                        >
                          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                          GENERATE MISSING ALT TEXT
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
                <Button 
                  variant="outline" 
                  className="border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 font-medium rounded-full px-4 h-8 text-xs bg-white dark:bg-slate-900"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                  LAYOUT ASSISTANT
                </Button>
                {onExitVisualBuilder && (
                  <Button
                    variant="outline"
                    onClick={onExitVisualBuilder}
                    className="h-8 px-4 text-xs font-medium rounded-full border-slate-600 text-slate-600 dark:border-slate-400 dark:text-slate-400 bg-transparent hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
                  >
                    SWITCH TO CLASSIC VIEW
                  </Button>
                )}
              </div>
            </>
          ) : (
            // Classic View: Full text labels
            <>
              <div className="flex items-center gap-1">
                <ToolbarTextButton icon={Wifi} label="Collection Status" />
                <ToolbarTextButton icon={Eye} label="Preview" onClick={onPreview} />
                <ToolbarTextButton icon={Upload} label="Export Assets" />
                <ToolbarTextButton icon={Trash2} label="Delete Collection" />
                <ToolbarTextButton icon={FileEdit} label="Manage Asset Accessibility" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-medium rounded-full px-5">
                  <Sparkles className="w-4 h-4 mr-2" />
                  LAYOUT ASSISTANT
                </Button>
                <Button onClick={onAddWidget} className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full px-5">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Widget
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}

// Icon-only button with tooltip (for Visual Builder)
function ToolbarIconButton({ 
  icon: Icon, 
  label, 
  onClick,
  showLabel = false
}: { 
  icon: React.ElementType; 
  label: string;
  onClick?: () => void;
  showLabel?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button 
          onClick={onClick}
          className={`flex items-center justify-center ${showLabel ? 'gap-1.5 px-3' : 'w-9'} h-9 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 rounded-full transition-colors`}
        >
          <Icon className="w-[18px] h-[18px]" />
          {showLabel && <span className="text-sm font-medium">{label}</span>}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

// Text button with icon (for Classic View)
function ToolbarTextButton({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon: React.ElementType; 
  label: string;
  onClick?: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
