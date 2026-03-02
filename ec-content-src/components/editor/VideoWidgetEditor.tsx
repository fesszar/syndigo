import { useState } from 'react';
import { WidgetContent, VideoItem, VideoLayout } from '@/types/widget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Plus, Trash2, GripVertical, ChevronDown, ChevronUp, 
  Play, ImageIcon, Maximize2, Columns
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface VideoWidgetEditorProps {
  content: WidgetContent;
  onUpdate: (updates: Partial<WidgetContent>) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export function VideoWidgetEditor({ content, onUpdate }: VideoWidgetEditorProps) {
  const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);
  
  const videos = content.videos || [];
  const layout = content.videoLayout || 'focused';

  const addVideo = () => {
    const newVideo: VideoItem = {
      id: generateId(),
      url: '',
      caption: '',
      description: '',
      reportingCode: '',
      snapshotUrl: '',
    };
    onUpdate({ videos: [...videos, newVideo] });
    setExpandedVideoId(newVideo.id);
  };

  const updateVideo = (id: string, updates: Partial<VideoItem>) => {
    onUpdate({
      videos: videos.map(v => v.id === id ? { ...v, ...updates } : v),
    });
  };

  const deleteVideo = (id: string) => {
    onUpdate({ videos: videos.filter(v => v.id !== id) });
    if (expandedVideoId === id) setExpandedVideoId(null);
  };

  const setLayout = (newLayout: VideoLayout) => {
    onUpdate({ videoLayout: newLayout });
  };

  const toggleExpanded = (id: string) => {
    setExpandedVideoId(expandedVideoId === id ? null : id);
  };

  const expandAll = () => {
    // If any are collapsed, expand all. Otherwise collapse all.
    setExpandedVideoId(videos.length > 0 ? videos[0].id : null);
  };

  return (
    <div className="space-y-4">
      {/* Layout Selection - Compact */}
      <div className="space-y-1.5">
        <Label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
          Layout
        </Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLayout('focused')}
            className={cn(
              "flex items-center gap-2 px-2.5 py-1.5 rounded-md border transition-all text-left",
              layout === 'focused' 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-muted-foreground/50"
            )}
          >
            <div className="w-8 h-6 bg-muted rounded flex items-center justify-center shrink-0">
              <Maximize2 className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium leading-none">Focused</p>
              <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">
                Details view
              </p>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setLayout('slider')}
            className={cn(
              "flex items-center gap-2 px-2.5 py-1.5 rounded-md border transition-all text-left",
              layout === 'slider' 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-muted-foreground/50"
            )}
          >
            <div className="w-8 h-6 bg-muted rounded flex items-center justify-center shrink-0">
              <Columns className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium leading-none">Slider</p>
              <p className="text-[9px] text-muted-foreground leading-tight mt-0.5">
                Full width
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Videos List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {videos.length} Video{videos.length !== 1 ? 's' : ''}
          </Label>
          <div className="flex items-center gap-2">
            {videos.length > 1 && (
              <Button
                variant="link"
                size="sm"
                onClick={expandAll}
                className="h-auto p-0 text-xs text-primary"
              >
                {expandedVideoId ? 'Collapse All' : 'Expand All'}
              </Button>
            )}
          </div>
        </div>

        {/* Visual Preview of Layout */}
        <div className={cn(
          "rounded-lg border border-dashed border-border bg-muted/30 p-3",
          videos.length === 0 && "min-h-[80px] flex items-center justify-center"
        )}>
          {videos.length === 0 ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={addVideo}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add First Video
            </Button>
          ) : (
            <div className="space-y-2">
              {/* Layout Preview */}
              <div className={cn(
                "rounded-lg bg-background border border-border p-2 mb-3",
                layout === 'slider' ? "space-y-1" : "grid grid-cols-2 gap-2"
              )}>
                {videos.slice(0, layout === 'slider' ? 1 : 4).map((video, index) => (
                  <div
                    key={video.id}
                    className={cn(
                      "relative bg-muted rounded overflow-hidden",
                      layout === 'slider' ? "aspect-[16/9]" : "aspect-video"
                    )}
                  >
                    {video.snapshotUrl ? (
                      <img 
                        src={video.snapshotUrl} 
                        alt={video.caption || 'Video thumbnail'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute bottom-1 left-1 bg-black/70 text-white text-[8px] px-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
                {videos.length > (layout === 'slider' ? 1 : 4) && (
                  <div className="flex items-center justify-center text-xs text-muted-foreground">
                    +{videos.length - (layout === 'slider' ? 1 : 4)} more
                  </div>
                )}
              </div>

              {/* Video Items */}
              {videos.map((video, index) => (
                <Collapsible
                  key={video.id}
                  open={expandedVideoId === video.id}
                  onOpenChange={() => toggleExpanded(video.id)}
                >
                  <div className="rounded-lg border border-border bg-background overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <button
                        type="button"
                        className="w-full flex items-center gap-2 p-2 hover:bg-muted/50 transition-colors"
                      >
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                        <div className="flex items-center justify-center w-6 h-6 rounded bg-muted text-xs font-medium">
                          {index + 1}
                        </div>
                        
                        {/* Thumbnail Preview */}
                        <div className="w-12 h-8 rounded bg-muted flex items-center justify-center overflow-hidden">
                          {video.snapshotUrl ? (
                            <img 
                              src={video.snapshotUrl} 
                              alt="" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Play className="w-3 h-3 text-muted-foreground" />
                          )}
                        </div>
                        
                        <span className="flex-1 text-left text-sm truncate">
                          {video.caption || '[Video Caption]'}
                        </span>
                        
                        {expandedVideoId === video.id ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteVideo(video.id);
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="p-3 border-t border-border space-y-3 bg-muted/20">
                        <div className="grid grid-cols-[80px_1fr] gap-3">
                          {/* Video Thumbnail / Snapshot */}
                          <div className="space-y-1">
                            <div className="aspect-[4/3] rounded-lg border-2 border-dashed border-border bg-background flex flex-col items-center justify-center overflow-hidden">
                              {video.snapshotUrl ? (
                                <img 
                                  src={video.snapshotUrl} 
                                  alt="Video snapshot"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <>
                                  <ImageIcon className="w-5 h-5 text-muted-foreground mb-1" />
                                  <span className="text-[8px] text-muted-foreground text-center px-1">
                                    Snapshot
                                  </span>
                                </>
                              )}
                            </div>
                            <Input
                              value={video.snapshotUrl || ''}
                              onChange={(e) => updateVideo(video.id, { snapshotUrl: e.target.value })}
                              placeholder="Image URL"
                              className="h-6 text-[10px]"
                            />
                          </div>
                          
                          {/* Caption & Description */}
                          <div className="space-y-2">
                            <div className="space-y-1">
                              <Label className="text-[10px] text-muted-foreground">Caption</Label>
                              <Input
                                value={video.caption}
                                onChange={(e) => updateVideo(video.id, { caption: e.target.value })}
                                placeholder="Enter a caption"
                                className="h-7 text-xs"
                              />
                            </div>
                            
                            <div className="space-y-1">
                              <Label className="text-[10px] text-muted-foreground">Video Description</Label>
                              <Textarea
                                value={video.description}
                                onChange={(e) => updateVideo(video.id, { description: e.target.value })}
                                placeholder="Enter a description for the video"
                                rows={2}
                                className="resize-none text-xs"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">Video URL</Label>
                            <Input
                              value={video.url}
                              onChange={(e) => updateVideo(video.id, { url: e.target.value })}
                              placeholder="https://youtube.com/..."
                              className="h-7 text-xs"
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <Label className="text-[10px] text-muted-foreground">Reporting Code</Label>
                            <Input
                              value={video.reportingCode}
                              onChange={(e) => updateVideo(video.id, { reportingCode: e.target.value })}
                              placeholder="Enter reporting code"
                              className="h-7 text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}

              {/* Add Video Button */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addVideo}
                className="w-full gap-2 mt-2"
              >
                <Plus className="w-4 h-4" />
                Add Video
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}