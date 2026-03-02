import { useState } from 'react';
import { WidgetContent, VideoItem, VideoLayout, CONTENT_TAGS, ContentTag } from '@/types/widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Plus, Trash2, GripVertical, ChevronDown, ChevronUp,
  Play, ImageIcon, Eye, Rows3, GalleryHorizontal, Pencil,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AddAssetsModal } from './AddAssetsModal';
import { AddVideosModal } from './AddVideosModal';
import { ImageItem } from '@/types/widget';

interface VideoWidgetSettingsProps {
  content: WidgetContent;
  onUpdate: (updates: Partial<WidgetContent>) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const getVideoAssetLabel = (url?: string) => {
  if (!url) return '';
  try {
    // Handle blob/object URLs and normal URLs
    const parsed = new URL(url);
    const name = parsed.pathname.split('/').filter(Boolean).pop() || '';
    return decodeURIComponent(name) || url;
  } catch {
    // Fallback for non-standard URLs
    const last = url.split('/').filter(Boolean).pop() || url;
    return last.length > 0 ? last : url;
  }
};
const LAYOUT_OPTIONS: { value: VideoLayout; label: string; description: string; icon: React.ReactNode }[] = [
  { 
    value: 'focused', 
    label: 'Focused', 
    description: 'Great for showcasing a single video with full details and controls.',
    icon: <Rows3 className="w-6 h-6" />,
  },
  { 
    value: 'slider', 
    label: 'Slider', 
    description: 'Full-width carousel for multiple videos. Spans the entire width of the page.',
    icon: <GalleryHorizontal className="w-6 h-6" />,
  },
];


export function VideoWidgetSettings({ content, onUpdate }: VideoWidgetSettingsProps) {
  const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);
  const [showSnapshotModal, setShowSnapshotModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [snapshotVideoId, setSnapshotVideoId] = useState<string | null>(null);


  const videos = content.videos || [];
  const videoLayout = content.videoLayout || 'focused';
  const contentTag = content.contentTag;

  const updateVideo = (id: string, updates: Partial<VideoItem>) => {
    onUpdate({
      videos: videos.map(v => v.id === id ? { ...v, ...updates } : v),
    });
  };

  const deleteVideo = (id: string) => {
    onUpdate({ videos: videos.filter(v => v.id !== id) });
    if (expandedVideoId === id) setExpandedVideoId(null);
  };


  const handleSnapshotSelect = (assets: ImageItem[]) => {
    if (snapshotVideoId && assets.length > 0) {
      updateVideo(snapshotVideoId, { snapshotUrl: assets[0].url });
      setSnapshotVideoId(null);
    }
  };

  const [replaceVideoId, setReplaceVideoId] = useState<string | null>(null);

  const handleAddOrReplaceVideos = (selected: VideoItem[]) => {
    if (selected.length === 0) return;

    if (replaceVideoId) {
      const next = selected[0];
      // Replace underlying asset but keep existing metadata (caption/description/reporting)
      updateVideo(replaceVideoId, {
        url: next.url,
        snapshotUrl: next.snapshotUrl,
      });
      setReplaceVideoId(null);
      return;
    }

    // Add new videos (generate new IDs to avoid collisions)
    const newVideos: VideoItem[] = selected.map(v => ({
      id: generateId(),
      url: v.url,
      caption: v.caption || '',
      description: v.description || '',
      reportingCode: v.reportingCode || '',
      snapshotUrl: v.snapshotUrl || '',
      autoplay: v.autoplay ?? false,
      muted: v.muted ?? true,
      loop: v.loop ?? false,
      duration: v.duration,
    }));

    onUpdate({ videos: [...videos, ...newVideos] });
    if (newVideos.length > 0) setExpandedVideoId(newVideos[0].id);
  };

  

  return (
    <div className="space-y-6 w-full overflow-hidden">
      {/* Section Header & Content Tag */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="video-section-header" className="text-xs">Section Header</Label>
          <Input
            id="video-section-header"
            value={content.header || ''}
            onChange={(e) => onUpdate({ header: e.target.value })}
            placeholder="Enter section header"
            className="h-9"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Content Tag</Label>
          <Select
            value={contentTag || ''}
            onValueChange={(value) => onUpdate({ contentTag: value as ContentTag })}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select a tag" />
            </SelectTrigger>
            <SelectContent>
              {CONTENT_TAGS.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Video Layout */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
          Layout
        </Label>
        <TooltipProvider delayDuration={300}>
          <div className="grid grid-cols-2 gap-2">
            {LAYOUT_OPTIONS.map(option => (
              <Tooltip key={option.value}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg border-2 transition-all min-w-0",
                      videoLayout === option.value 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border bg-muted/30 text-muted-foreground hover:border-muted-foreground/50"
                    )}
                    onClick={() => onUpdate({ videoLayout: option.value })}
                  >
                    <span className="shrink-0 [&>svg]:w-5 [&>svg]:h-5">{option.icon}</span>
                    <span className="text-xs font-medium truncate">{option.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[220px] text-center">
                  <p className="text-xs">{option.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>

      {/* Videos List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Videos{videos.length > 0 ? ` (${videos.length})` : ''}</Label>
          {videos.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={() => setShowAddVideoModal(true)}
            >
              <Plus className="w-3 h-3" />
              Add
            </Button>
          )}
        </div>
        
        {videos.length > 0 ? (
          <div className="space-y-2">
            {videos.map((video, index) => (
              <VideoItemCard
                key={video.id}
                video={video}
                index={index}
                isExpanded={expandedVideoId === video.id}
                onToggleExpand={() => setExpandedVideoId(
                  expandedVideoId === video.id ? null : video.id
                )}
                onUpdate={(updates) => updateVideo(video.id, updates)}
                onDelete={() => deleteVideo(video.id)}
                onOpenSnapshotModal={() => {
                  setSnapshotVideoId(video.id);
                  setShowSnapshotModal(true);
                }}
                onOpenVideoModal={() => {
                  setReplaceVideoId(video.id);
                  setShowAddVideoModal(true);
                }}
              />
            ))}
          </div>
        ) : (
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            onClick={() => setShowAddVideoModal(true)}
          >
            <Plus className="w-4 h-4" />
            Add Video
          </button>
        )}
      </div>

      {/* Add Video Modal */}
      <AddVideosModal
        open={showAddVideoModal}
        onOpenChange={(open) => {
          setShowAddVideoModal(open);
          if (!open) setReplaceVideoId(null);
        }}
        onAddVideos={handleAddOrReplaceVideos}
        maxVideos={replaceVideoId ? 1 : 10}
        singleSelect={!!replaceVideoId}
        title={replaceVideoId ? 'Select Video' : 'Add Videos'}
      />

      {/* Snapshot Selection Modal */}
      <AddAssetsModal
        open={showSnapshotModal}
        onOpenChange={(open) => {
          setShowSnapshotModal(open);
          if (!open) setSnapshotVideoId(null);
        }}
        onAddAssets={handleSnapshotSelect}
        maxAssets={1}
        singleSelect={true}
        title="Select Video Snapshot"
      />
    </div>
  );
}

interface VideoItemCardProps {
  video: VideoItem;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdate: (updates: Partial<VideoItem>) => void;
  onDelete: () => void;
  onOpenSnapshotModal: () => void;
  onOpenVideoModal: () => void;
}

function VideoItemCard({ 
  video, 
  index, 
  isExpanded, 
  onToggleExpand, 
  onUpdate, 
  onDelete,
  onOpenSnapshotModal,
  onOpenVideoModal,
}: VideoItemCardProps) {
  const assetLabel = getVideoAssetLabel(video.url);

  return (
    <div className="bg-muted/50 rounded-lg overflow-hidden min-w-0 w-full">
      {/* Header row */}
      <div 
        className="flex items-center gap-2 p-3 cursor-pointer hover:bg-muted/70 transition-colors min-w-0"
        onClick={onToggleExpand}
      >
        <GripVertical className="w-4 h-4 text-muted-foreground shrink-0 cursor-grab flex-none" />
        
        <div className="w-10 h-10 rounded border border-border bg-card overflow-hidden shrink-0 flex-none relative group flex items-center justify-center">
          {video.snapshotUrl ? (
            <>
              <img 
                src={video.snapshotUrl} 
                alt={`Video ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Play className="w-3 h-3 text-white fill-white" />
              </div>
            </>
          ) : (
            <Play className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        
        <div className="flex-1 min-w-0 w-full">
          <p className="text-sm font-medium truncate">
            {video.caption || `Video ${index + 1}`}
          </p>
          {assetLabel && (
            <p className="text-xs text-muted-foreground truncate" title={assetLabel}>
              {assetLabel}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-1 flex-none">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
          </Button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>
      
      {/* Expanded details */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-1 space-y-3 border-t border-border/50 overflow-hidden w-full">
          {/* Video Preview/Thumbnail */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border border-border group/vid max-w-full">
            {video.url ? (
              <>
                {/* Show snapshot if available, otherwise show play icon placeholder */}
                {video.snapshotUrl ? (
                  <img 
                    src={video.snapshotUrl} 
                    alt={video.caption || `Video ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Play className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Play className="w-10 h-10 text-muted-foreground/50" />
              </div>
            )}
            {/* Hover overlay with Change button */}
            <div className="absolute inset-0 bg-black/0 group-hover/vid:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover/vid:opacity-100">
              <Button
                variant="secondary"
                size="sm"
                className="h-8 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVideoModal();
                }}
              >
                <Pencil className="w-3 h-3 mr-1" />
                Change
              </Button>
            </div>
          </div>

          {/* Caption */}
          <div className="space-y-1.5">
            <Label className="text-xs">Caption</Label>
            <Input
              value={video.caption || ''}
              onChange={(e) => onUpdate({ caption: e.target.value })}
              placeholder="Enter Caption"
              className="h-8 text-sm"
            />
          </div>
          
          {/* Video Description */}
          <div className="space-y-1.5">
            <Label className="text-xs">Video Description</Label>
            <Textarea
              value={video.description || ''}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Enter a description for the video. Max length 10,000 characters."
              rows={3}
              className="text-sm resize-none"
            />
          </div>

          {/* Reporting Code */}
          <div className="space-y-1.5">
            <Label className="text-xs">Reporting Code</Label>
            <Input
              value={video.reportingCode || ''}
              onChange={(e) => onUpdate({ reportingCode: e.target.value })}
              placeholder="VID-001"
              className="h-8 text-sm"
            />
          </div>
          
          {/* Video Snapshot */}
          <div className="space-y-1.5">
            <Label className="text-xs">Video Snapshot</Label>
            {video.snapshotUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted border border-border group/img">
                <img 
                  src={video.snapshotUrl} 
                  alt="Video snapshot" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover/img:opacity-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenSnapshotModal();
                    }}
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                 className="w-full flex flex-wrap items-center justify-center gap-2 py-6 px-3 rounded-lg border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSnapshotModal();
                }}
              >
                <ImageIcon className="w-5 h-5" />
                 <span className="text-sm min-w-0 text-center leading-tight break-words">Click to upload snapshot</span>
              </button>
            )}
          </div>
          
          {/* Quick actions - only show when snapshot exists */}
          {video.snapshotUrl && (
            <div className="flex items-center gap-2 pt-1">
              <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary min-w-0 max-w-full truncate">
                <Eye className="w-3 h-3 mr-1" />
                View Asset Details
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
