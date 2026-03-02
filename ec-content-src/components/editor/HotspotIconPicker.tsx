import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Info, Star, Heart, Zap, Tag, Award, Gift, ShoppingCart,
  Camera, Image, Play, Music, Mic, Video, Film, Headphones,
  Download, Upload, Share2, Link2, ExternalLink, Search,
  MessageCircle, Mail, Phone, Bell, Send, Users,
  Check, AlertCircle, HelpCircle, X, Plus, Minus,
  ChevronRight, FileText, Type, Images, ChevronDown,
} from 'lucide-react';

// Icon categories with their icons
const HOTSPOT_ICON_CATEGORIES = {
  'General': [
    { id: 'info', icon: Info, label: 'Info' },
    { id: 'star', icon: Star, label: 'Star' },
    { id: 'heart', icon: Heart, label: 'Heart' },
    { id: 'zap', icon: Zap, label: 'Zap' },
    { id: 'tag', icon: Tag, label: 'Tag' },
    { id: 'award', icon: Award, label: 'Award' },
    { id: 'gift', icon: Gift, label: 'Gift' },
    { id: 'search', icon: Search, label: 'Search' },
  ],
  'Commerce': [
    { id: 'shopping-cart', icon: ShoppingCart, label: 'Cart' },
  ],
  'Media': [
    { id: 'camera', icon: Camera, label: 'Camera' },
    { id: 'image', icon: Image, label: 'Image' },
    { id: 'images', icon: Images, label: 'Images' },
    { id: 'play', icon: Play, label: 'Play' },
    { id: 'music', icon: Music, label: 'Music' },
    { id: 'mic', icon: Mic, label: 'Mic' },
    { id: 'video', icon: Video, label: 'Video' },
    { id: 'film', icon: Film, label: 'Film' },
    { id: 'headphones', icon: Headphones, label: 'Headphones' },
  ],
  'Actions': [
    { id: 'download', icon: Download, label: 'Download' },
    { id: 'upload', icon: Upload, label: 'Upload' },
    { id: 'share', icon: Share2, label: 'Share' },
    { id: 'link', icon: Link2, label: 'Link' },
    { id: 'external', icon: ExternalLink, label: 'External' },
    { id: 'plus', icon: Plus, label: 'Plus' },
    { id: 'minus', icon: Minus, label: 'Minus' },
    { id: 'file-text', icon: FileText, label: 'Document' },
    { id: 'type', icon: Type, label: 'Text' },
  ],
  'Communication': [
    { id: 'message', icon: MessageCircle, label: 'Message' },
    { id: 'mail', icon: Mail, label: 'Mail' },
    { id: 'phone', icon: Phone, label: 'Phone' },
    { id: 'bell', icon: Bell, label: 'Bell' },
    { id: 'send', icon: Send, label: 'Send' },
    { id: 'users', icon: Users, label: 'Users' },
  ],
  'Status': [
    { id: 'check', icon: Check, label: 'Check' },
    { id: 'alert', icon: AlertCircle, label: 'Alert' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
    { id: 'close', icon: X, label: 'Close' },
  ],
};

// Flat icon map for easy lookup
export const HOTSPOT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {};
Object.values(HOTSPOT_ICON_CATEGORIES).forEach(icons => {
  icons.forEach(({ id, icon }) => {
    HOTSPOT_ICONS[id] = icon;
  });
});

interface HotspotIconPickerProps {
  value?: string;
  onChange: (iconId: string) => void;
  disabled?: boolean;
}

export function HotspotIconPicker({ value = 'info', onChange, disabled }: HotspotIconPickerProps) {
  const [open, setOpen] = useState(false);
  const SelectedIcon = HOTSPOT_ICONS[value] || Info;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          className={cn(
            "h-7 px-1.5 rounded border border-dashed border-primary/30 flex items-center gap-0.5",
            "hover:border-primary/50 hover:bg-primary/5 transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "relative hover:z-50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <SelectedIcon className="w-3.5 h-3.5 text-primary" />
          <ChevronDown className="w-2.5 h-2.5 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent side="left" align="start" className="w-64 p-0">
        <div className="px-3 py-2 border-b border-border">
          <h4 className="text-xs font-semibold text-foreground">Select Icon</h4>
          <p className="text-[10px] text-muted-foreground">Choose an icon for this hotspot</p>
        </div>
        <ScrollArea className="h-64">
          <div className="p-2 space-y-3">
            {Object.entries(HOTSPOT_ICON_CATEGORIES).map(([category, icons]) => (
              <div key={category}>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide px-1 mb-1.5">
                  {category}
                </p>
                <div className="grid grid-cols-6 gap-1">
                  {icons.map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => {
                        onChange(id);
                        setOpen(false);
                      }}
                      title={label}
                      className={cn(
                        "w-8 h-8 rounded flex items-center justify-center transition-colors",
                        value === id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

// Component to display a hotspot icon by ID
interface HotspotIconDisplayProps {
  iconId?: string;
  className?: string;
}

export function HotspotIconDisplay({ iconId = 'info', className }: HotspotIconDisplayProps) {
  const Icon = HOTSPOT_ICONS[iconId] || Info;
  return <Icon className={className} />;
}
