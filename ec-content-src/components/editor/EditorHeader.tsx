import { Button } from '@/components/ui/button';
import { 
  Save, Eye, RotateCcw, ChevronLeft, 
  MoreHorizontal, Download, Settings, HelpCircle 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface EditorHeaderProps {
  onPreview: () => void;
  onSave: () => void;
  productName?: string;
}

export function EditorHeader({ onPreview, onSave, productName }: EditorHeaderProps) {
  const handleSave = () => {
    onSave();
    toast.success('Changes saved successfully', {
      description: 'Your enhanced content has been saved.',
    });
  };

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        
        <div className="h-6 w-px bg-border" />
        
        <div>
          <h1 className="text-sm font-semibold text-foreground">
            Enhanced Content Editor
          </h1>
          {productName && (
            <p className="text-xs text-muted-foreground">
              {productName}
            </p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1.5"
          onClick={() => toast.info('Undo/Redo coming soon')}
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </Button>

        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 gap-1.5"
          onClick={onPreview}
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">Preview</span>
        </Button>

        <Button 
          size="sm" 
          className="h-8 gap-1.5 gradient-brand text-white border-0"
          onClick={handleSave}
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save Changes</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Download className="w-4 h-4 mr-2" />
              Export
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Support
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
