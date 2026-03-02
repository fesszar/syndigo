import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  ChevronLeft, X, Search, Upload, Filter, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ImageItem } from '@/types/widget';

// Mock assets for demo
const MOCK_PROJECT_ASSETS = [
  { id: '1', url: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400', name: 'dogsquare3.jpg' },
  { id: '2', url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', name: '66010.jpg' },
  { id: '3', url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400', name: '66010_app6.jpg' },
  { id: '4', url: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400', name: 'audiblebanner.jpg' },
];

const MOCK_ALL_ASSETS = [
  ...MOCK_PROJECT_ASSETS,
  { id: '5', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', name: 'syndigo_teams.jpg' },
  { id: '6', url: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=400', name: 'office_wall.jpg' },
  { id: '7', url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400', name: 'syndigo-breakroom.png' },
  { id: '8', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400', name: 'dogsquare2.png' },
  { id: '9', url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400', name: 'dogsquare1.png' },
  { id: '10', url: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=400', name: 'screenshot.png' },
];

interface AddAssetsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAssets: (assets: ImageItem[]) => void;
  maxAssets?: number;
  /** When true, only allows selecting one asset and immediately adds it */
  singleSelect?: boolean;
  /** Custom title for the modal */
  title?: string;
}

export function AddAssetsModal({ 
  open, 
  onOpenChange, 
  onAddAssets,
  maxAssets = 10,
  singleSelect = false,
  title = 'Add Assets',
}: AddAssetsModalProps) {
  const [activeTab, setActiveTab] = useState<'project' | 'all'>('project');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const assets = activeTab === 'project' ? MOCK_PROJECT_ASSETS : MOCK_ALL_ASSETS;
  
  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleAsset = (id: string) => {
    if (singleSelect) {
      // In single select mode, immediately add the asset
      const asset = assets.find(a => a.id === id);
      if (asset) {
        const selectedItem: ImageItem = {
          id: asset.id,
          url: asset.url,
          caption: '',
          description: '',
          altText: '',
          link: '',
        };
        onAddAssets([selectedItem]);
        onOpenChange(false);
      }
      return;
    }
    
    setSelectedAssets(prev => {
      if (prev.includes(id)) {
        return prev.filter(a => a !== id);
      }
      if (prev.length >= maxAssets) return prev;
      return [...prev, id];
    });
  };

  const handleAddAssets = () => {
    const selectedItems: ImageItem[] = assets
      .filter(a => selectedAssets.includes(a.id))
      .map(a => ({
        id: a.id,
        url: a.url,
        caption: '',
        description: '',
        altText: '',
        link: '',
      }));
    onAddAssets(selectedItems);
    setSelectedAssets([]);
    onOpenChange(false);
  };

  const handleClose = () => {
    setSelectedAssets([]);
    onOpenChange(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // In real app, upload to storage and get URLs
    const newAssets: ImageItem[] = Array.from(files).map((file, idx) => ({
      id: `upload-${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
      caption: '',
      description: '',
      altText: '',
      link: '',
    }));
    
    onAddAssets(newAssets);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
        {/* Header */}
        <div className="bg-[#1e3a5f] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ChevronLeft className="w-5 h-5 cursor-pointer hover:opacity-80" onClick={handleClose} />
            <DialogTitle className="text-lg font-medium">{title}</DialogTitle>
          </div>
          <X className="w-5 h-5 cursor-pointer hover:opacity-80" onClick={handleClose} />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'project' | 'all')} className="flex-1 flex flex-col">
          <div className="border-b border-border">
            <TabsList className="h-12 p-0 bg-transparent rounded-none w-full justify-start gap-0">
              <TabsTrigger 
                value="project" 
                className={cn(
                  "h-12 px-8 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=inactive]:border-transparent",
                  "uppercase text-sm font-semibold tracking-wide"
                )}
              >
                Project Assets
              </TabsTrigger>
              <TabsTrigger 
                value="all" 
                className={cn(
                  "h-12 px-8 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=inactive]:border-transparent",
                  "uppercase text-sm font-semibold tracking-wide"
                )}
              >
                All Assets
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Search and filters */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground shrink-0">
              {singleSelect 
                ? 'Select an asset to use.' 
                : `Select no more than ${maxAssets} assets you'd like to add to this content section.`
              }
            </p>
            
            <div className="flex items-center gap-3">
              {activeTab === 'all' && (
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Add Filter
                </Button>
              )}
              
              {activeTab === 'project' && (
                <div className="relative w-48">
                  <select className="w-full h-9 px-3 pr-8 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer">
                    <option>select a product</option>
                  </select>
                  <ChevronLeft className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 rotate-[270deg] pointer-events-none text-muted-foreground" />
                </div>
              )}
              
              <div className="relative w-48">
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 pr-9"
                />
                <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Assets Grid */}
          <TabsContent value="project" className="flex-1 m-0 p-6 overflow-y-auto max-h-[400px]">
            <div className="grid grid-cols-4 gap-4">
              {filteredAssets.map(asset => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  isSelected={selectedAssets.includes(asset.id)}
                  onToggle={() => toggleAsset(asset.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all" className="flex-1 m-0 p-6 overflow-y-auto max-h-[400px]">
            <div className="grid grid-cols-4 gap-4">
              {filteredAssets.map(asset => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  isSelected={selectedAssets.includes(asset.id)}
                  onToggle={() => toggleAsset(asset.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 flex items-center justify-between bg-muted/30">
          {singleSelect ? (
            <p className="text-sm text-muted-foreground">Click an asset to select it</p>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm">
                <span className="font-semibold">{selectedAssets.length}</span> assets selected. 
                {' '}Select up to {maxAssets - selectedAssets.length} more.
              </span>
              <Button 
                variant="link" 
                size="sm" 
                className="text-muted-foreground p-0 h-auto"
                onClick={() => setSelectedAssets([])}
                disabled={selectedAssets.length === 0}
              >
                Unselect All
              </Button>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            {activeTab === 'all' && (
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <label>
                  <Upload className="w-4 h-4" />
                  Upload files
                  <input 
                    type="file" 
                    multiple={!singleSelect}
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileUpload}
                  />
                </label>
              </Button>
            )}
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            {!singleSelect && (
              <Button 
                onClick={handleAddAssets}
                disabled={selectedAssets.length === 0}
                className="bg-[#5dcfeb] hover:bg-[#4bc4e0] text-[#1e3a5f] font-semibold"
              >
                ADD ASSETS
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface AssetCardProps {
  asset: { id: string; url: string; name: string };
  isSelected: boolean;
  onToggle: () => void;
}

function AssetCard({ asset, isSelected, onToggle }: AssetCardProps) {
  return (
    <div 
      className={cn(
        "relative cursor-pointer group rounded-lg overflow-hidden border-2 transition-all",
        isSelected ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-muted-foreground/30"
      )}
      onClick={onToggle}
    >
      <div className="aspect-square bg-muted">
        <img 
          src={asset.url} 
          alt={asset.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      
      <p className="text-xs text-muted-foreground truncate px-2 py-2 bg-card">
        {asset.name}
      </p>
    </div>
  );
}