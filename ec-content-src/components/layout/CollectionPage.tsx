import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { CollectionHeader } from './CollectionHeader';
import { CollectionToolbar } from './CollectionToolbar';
import { ProductsSidebar } from './ProductsSidebar';
import { BuilderView } from './BuilderView';
import { UnifiedVisualBuilder } from '@/components/editor/UnifiedVisualBuilder';
import { PreviewModal } from '@/components/editor/PreviewModal';
import { useWidgets } from '@/hooks/useWidgets';
import { ExternalLink, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock collections data
const MOCK_COLLECTIONS = [
  { id: '1', name: 'Collection Name That is Long', tag: 'Generic', tagColor: 'bg-slate-500', lastApproved: '2024-01-15', lastEdited: '2024-01-20', sites: 12 },
  { id: '2', name: 'Summer Promo Collection', tag: 'Single-Site', tagColor: 'bg-primary', lastApproved: '2024-01-10', lastEdited: '2024-01-18', sites: 1 },
  { id: '3', name: 'Holiday Special', tag: 'Generic', tagColor: 'bg-slate-500', lastApproved: '2024-01-05', lastEdited: '2024-01-12', sites: 8 },
  { id: '4', name: 'Brand Essentials', tag: 'Single-Site', tagColor: 'bg-primary', lastApproved: '2024-01-01', lastEdited: '2024-01-08', sites: 1 },
];

interface CollectionPageProps {
  contentType: 'hero' | 'inline';
}

export function CollectionPage({ contentType }: CollectionPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'builder' | 'wysiwyg'>('builder');
  const [showPreview, setShowPreview] = useState(false);
  const [productsSidebarCollapsed, setProductsSidebarCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState('1');
  const { widgets } = useWidgets();
  
  const selectedCollection = MOCK_COLLECTIONS.find(c => c.id === selectedCollectionId) || MOCK_COLLECTIONS[0];

  // Enter fullscreen and collapse sidebar when switching to Visual Builder
  useEffect(() => {
    if (viewMode === 'wysiwyg') {
      setIsFullscreen(true);
      setProductsSidebarCollapsed(true);
    } else {
      setIsFullscreen(false);
    }
  }, [viewMode]);

  return (
    <SidebarProvider>
      <div className="h-screen overflow-hidden flex w-full bg-background">
        {!isFullscreen && <AppSidebar />}
        
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {/* Top Header with trigger - Normal mode */}
          {!isFullscreen && (
            <div className="h-12 border-b border-border bg-background flex items-center px-4 justify-between shrink-0">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <span className="font-semibold">Content Experience Suite</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Welcome back, User</span>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                  U
                </div>
              </div>
            </div>
          )}

          {/* Compact Header - Fullscreen/Visual Builder mode */}
          {isFullscreen && (
            <div className="shrink-0">
              {/* Top row: Project name + Collection + Actions - White background */}
              <div className="h-12 flex items-center px-4 justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 min-w-0">
                  <button className="flex items-center gap-2 text-slate-800 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                    <span className="text-lg">‹</span>
                    <span className="text-sm font-medium">Project Name That Can Be Long</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <span className="text-slate-800 dark:text-slate-200 font-medium">{selectedCollection.name}</span>
                        <span className={cn(
                          "px-2 py-0.5 text-xs font-medium text-white rounded",
                          selectedCollection.tagColor
                        )}>
                          {selectedCollection.tag}
                        </span>
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-auto min-w-[320px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg z-50">
                      {MOCK_COLLECTIONS.map((collection) => (
                        <DropdownMenuItem
                          key={collection.id}
                          onClick={() => setSelectedCollectionId(collection.id)}
                          className="flex flex-col items-start gap-1 px-3 py-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{collection.name}</span>
                              <span className={cn(
                                "px-2 py-0.5 text-xs font-medium text-white rounded",
                                collection.tagColor
                              )}>
                                {collection.tag}
                              </span>
                            </div>
                            {selectedCollectionId === collection.id && (
                              <Check className="w-4 h-4 text-primary shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground whitespace-nowrap">
                            <span>Approved: {new Date(collection.lastApproved).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span>Edited: {new Date(collection.lastEdited).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span>{collection.sites} {collection.sites === 1 ? 'site' : 'sites'}</span>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="outline" className="h-8 px-4 text-xs font-bold rounded-full border-2 border-slate-700 text-slate-700 hover:bg-slate-100 dark:border-slate-300 dark:text-slate-300 dark:hover:bg-slate-800">
                    EXPORT
                  </Button>
                  <Button className="h-8 px-4 text-xs font-bold rounded-full bg-red-500 hover:bg-red-600 text-white">
                    DELETE
                  </Button>
                  <Button className="h-8 px-4 text-xs font-bold rounded-full bg-green-500 hover:bg-green-600 text-white">
                    SAVE CHANGES
                  </Button>
                  <Button className="h-8 px-4 text-xs font-bold rounded-full bg-primary hover:bg-primary/90 text-white">
                    PUBLISH
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Collection Header with Tabs */}
          {!isFullscreen && (
            <CollectionHeader 
              projectName="A DogVenture Adjustable Lifejacket for Dogs, Medium, Red" 
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          )}

          {/* Main Content Area: Products Sidebar + Tab Content */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* Products Sidebar - only in builder mode, not in Visual Builder */}
            {!isFullscreen && viewMode === 'builder' && (
              <ProductsSidebar
                isCollapsed={productsSidebarCollapsed}
                onToggleCollapse={() => setProductsSidebarCollapsed(!productsSidebarCollapsed)}
              />
            )}

            {/* Tab Content Area - Column layout with sticky toolbar */}
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
              {/* Toolbar - Fixed at top */}
              <div className="shrink-0 z-10 bg-background">
                <CollectionToolbar
                  onPreview={() => setShowPreview(true)}
                  missingVtt={2}
                  missingAltText={1}
                  viewMode={viewMode}
                  onExitVisualBuilder={() => setViewMode('builder')}
                />
              </div>


              {/* Builder/WYSIWYG View Container - This is the scroll area */}
              {viewMode === 'builder' ? (
                <div className="flex-1 overflow-auto">
                  {/* In builder mode, show both sections stacked (no contentType passed) */}
                  <BuilderView />
                </div>
              ) : (
                <div className="flex-1 min-h-0 overflow-hidden">
                  {/* In Visual Builder mode, show unified view with both Hero and Inline */}
                  <UnifiedVisualBuilder />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        open={showPreview}
        onOpenChange={setShowPreview}
        widgets={widgets}
      />
    </SidebarProvider>
  );
}
