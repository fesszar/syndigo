import { ExternalLink, ChevronDown, Plus, Paintbrush, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface Collection {
  id: string;
  name: string;
  tag: 'Generic' | 'Custom' | 'Seasonal';
  lastPublished: string;
  lastEdited: string;
  websites: number;
}

const MOCK_COLLECTIONS: Collection[] = [
  { id: '1', name: 'Generic Collection', tag: 'Generic', lastPublished: '01/15/2025', lastEdited: '01/20/2025', websites: 10 },
  { id: '2', name: 'Summer Campaign', tag: 'Seasonal', lastPublished: '12/01/2024', lastEdited: '01/18/2025', websites: 8 },
  { id: '3', name: 'Premium Retailers', tag: 'Custom', lastPublished: '01/10/2025', lastEdited: '01/22/2025', websites: 5 },
  { id: '4', name: 'Holiday Special', tag: 'Seasonal', lastPublished: '11/20/2024', lastEdited: '12/15/2024', websites: 12 },
];

interface CollectionHeaderProps {
  projectName: string;
  viewMode: 'builder' | 'wysiwyg';
  onViewModeChange: (mode: 'builder' | 'wysiwyg') => void;
}

export function CollectionHeader({ projectName, viewMode, onViewModeChange }: CollectionHeaderProps) {
  const [selectedCollection, setSelectedCollection] = useState<Collection>(MOCK_COLLECTIONS[0]);

  const getTagColor = (tag: Collection['tag']) => {
    switch (tag) {
      case 'Generic': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      case 'Custom': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'Seasonal': return 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300';
    }
  };

  // Simplified header for Visual Builder mode
  if (viewMode === 'wysiwyg') {
    return (
      <div className="bg-background border-b border-border">
        {/* Compact Top Bar for Visual Builder */}
        <div className="px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-primary">
              <span className="hover:underline cursor-pointer">All Enhanced Content Projects</span>
              <span className="text-muted-foreground">{'>'}</span>
            </div>
            <h1 className="text-lg font-semibold flex items-center gap-2">
              {projectName}
              <ExternalLink className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" />
            </h1>
            <span className="text-muted-foreground">|</span>
            
            {/* Collection Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors">
                  <span className="font-medium text-sm">{selectedCollection.name}</span>
                  <Badge className={cn("text-[10px] px-1.5 py-0 h-5", getTagColor(selectedCollection.tag))}>
                    {selectedCollection.tag}
                  </Badge>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 bg-popover border border-border shadow-lg z-50">
                {MOCK_COLLECTIONS.map((collection) => (
                  <DropdownMenuItem
                    key={collection.id}
                    onClick={() => setSelectedCollection(collection)}
                    className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-accent"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{collection.name}</span>
                        <Badge className={cn("text-[10px] px-1.5 py-0 h-5", getTagColor(collection.tag))}>
                          {collection.tag}
                        </Badge>
                      </div>
                      {selectedCollection.id === collection.id && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>Last Pub: {collection.lastPublished}</span>
                      <span>•</span>
                      <span>Last Edited: {collection.lastEdited}</span>
                      <span>•</span>
                      <span>{collection.websites} Websites</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="font-semibold h-8">EXPORT</Button>
            <Button variant="destructive" size="sm" className="font-semibold h-8">DELETE</Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-8">
              SAVE CHANGES
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 font-semibold h-8">PUBLISH</Button>
          </div>
        </div>
      </div>
    );
  }

  // Full header for Classic mode
  return (
    <div className="bg-background border-b border-border">
      {/* Top Bar */}
      <div className="px-6 py-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-primary mb-1">
            <span className="hover:underline cursor-pointer">All Enhanced Content Projects</span>
            <span className="text-muted-foreground">{'>'}</span>
            <span className="text-muted-foreground">Project Details</span>
          </div>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            {projectName}
            <ExternalLink className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" />
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-semibold">EXPORT</Button>
          <Button variant="destructive" className="font-semibold">DELETE</Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
            SAVE CHANGES
          </Button>
          <Button className="bg-primary hover:bg-primary/90 font-semibold">PUBLISH</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 flex items-center justify-between border-b border-border">
        <div className="flex gap-0">
          <TabItem label="Project Overview" />
          <TabItem label="Enhanced Content" active />
          <TabItem label="URLs" />
          <TabItem label="AB Testing" />
        </div>
        
        {/* Visual Builder Toggle - Prominent CTA */}
        <button
          onClick={() => onViewModeChange('wysiwyg')}
          className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold transition-all rounded-full bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 animate-pulse"
        >
          <Paintbrush className="w-4 h-4" />
          Visual Builder
        </button>
      </div>

      {/* Product Info Row */}
      <div className="px-6 py-3 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center gap-6">
          {/* Product Name & Metadata */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-foreground">Generic Name</span>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span><span className="font-medium">Last Pub:</span> MM/DD/YYYY</span>
              <span><span className="font-medium">Last Edited:</span> MM/DD/YYYY</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground font-medium">10 Websites</span>
          
          {/* Collection Dropdown - Classic Mode */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background hover:bg-muted transition-colors">
                <span className="font-medium text-sm">{selectedCollection.name}</span>
                <Badge className={cn("text-[10px] px-1.5 py-0 h-5", getTagColor(selectedCollection.tag))}>
                  {selectedCollection.tag}
                </Badge>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-popover border border-border shadow-lg z-50">
              {MOCK_COLLECTIONS.map((collection) => (
                <DropdownMenuItem
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection)}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-accent"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{collection.name}</span>
                      <Badge className={cn("text-[10px] px-1.5 py-0 h-5", getTagColor(collection.tag))}>
                        {collection.tag}
                      </Badge>
                    </div>
                    {selectedCollection.id === collection.id && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>Last Pub: {collection.lastPublished}</span>
                    <span>•</span>
                    <span>Last Edited: {collection.lastEdited}</span>
                    <span>•</span>
                    <span>{collection.websites} Websites</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" className="text-primary hover:text-primary/80 gap-1 font-medium">
            <Plus className="h-4 w-4" />
            Create New Collection
          </Button>
        </div>
      </div>
    </div>
  );
}

function TabItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
        active
          ? 'border-primary text-primary'
          : 'border-transparent text-muted-foreground hover:text-foreground'
      }`}
    >
      {label}
    </button>
  );
}
