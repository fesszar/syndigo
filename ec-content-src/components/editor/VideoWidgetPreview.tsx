import { WidgetContent, VideoLayout } from '@/types/widget';
import { Play, Film, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface VideoWidgetPreviewProps {
  content: WidgetContent;
}

export function VideoWidgetPreview({ content }: VideoWidgetPreviewProps) {
  const videos = content.videos || [];
  const layout = content.videoLayout || 'focused';
  const [currentSlide, setCurrentSlide] = useState(0);

  if (videos.length === 0) {
    return (
      <div className="aspect-[21/9] bg-muted/50 rounded-xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border">
        <Film className="w-8 h-8 text-muted-foreground/50" />
        <span className="text-xs text-muted-foreground">No videos added</span>
      </div>
    );
  }

  // Slider layout - horizontal carousel with navigation
  if (layout === 'slider') {
    const currentVideo = videos[currentSlide];
    
    return (
      <div className="space-y-3">
        {/* Main slider view */}
        <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-slate-900 group">
          {currentVideo.snapshotUrl ? (
            <img 
              src={currentVideo.snapshotUrl} 
              alt={currentVideo.caption || 'Video'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
          )}
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </div>

          {/* Navigation arrows */}
          {videos.length > 1 && (
            <>
              <button
                onClick={() => setCurrentSlide(prev => prev === 0 ? videos.length - 1 : prev - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={() => setCurrentSlide(prev => prev === videos.length - 1 ? 0 : prev + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </>
          )}

          {/* Caption overlay */}
          {currentVideo.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
              <p className="text-sm font-medium text-white">{currentVideo.caption}</p>
              {currentVideo.description && (
                <p className="text-xs text-white/70 mt-1 line-clamp-2">{currentVideo.description}</p>
              )}
            </div>
          )}
        </div>

        {/* Dot indicators */}
        {videos.length > 1 && (
          <div className="flex items-center justify-center gap-1.5">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  idx === currentSlide 
                    ? "bg-primary w-4" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Focused layout - stacked vertical videos
  return (
    <div className="space-y-3">
      {videos.map((video, index) => (
        <div key={video.id} className="space-y-2">
          <div
            className={cn(
              "relative bg-slate-900 rounded-xl overflow-hidden group aspect-[21/9]"
            )}
          >
            {/* Thumbnail or placeholder */}
            {video.snapshotUrl ? (
              <img 
                src={video.snapshotUrl} 
                alt={video.caption || 'Video thumbnail'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            )}

            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              </div>
            </div>

            {/* Caption overlay */}
            {video.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6">
                <p className="text-xs font-medium text-white truncate">{video.caption}</p>
                {video.description && (
                  <p className="text-[10px] text-white/70 truncate mt-0.5">{video.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
