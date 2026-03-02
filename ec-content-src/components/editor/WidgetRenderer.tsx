 import { Widget, ImageItem, VideoItem } from '@/types/widget';
import { ImageIcon, Play, Check, ChevronLeft, ChevronRight, Upload, RefreshCw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import sampleInlineImage from '@/assets/sample-inline-image.png';
import sampleProductImage from '@/assets/sample-product.png';
import { AddAssetsModal } from './AddAssetsModal';
 import { AddVideosModal } from './AddVideosModal';

interface WidgetRendererProps {
  widget: Widget;
  onImageUpload?: (widgetId: string, files: FileList) => void;
  onVideoUpload?: (widgetId: string, files: FileList) => void;
  onUpdateWidget?: (widgetId: string, updates: Partial<Widget>) => void;
  onReplaceImage?: (widgetId: string, newImageUrl: string) => void;
}

export function WidgetRenderer({ widget, onImageUpload, onVideoUpload, onUpdateWidget, onReplaceImage }: WidgetRendererProps) {
  switch (widget.type) {
    case 'images':
      return <ImagesWidget widget={widget} onUpdateWidget={onUpdateWidget} />;
    case 'carousel':
      return <CarouselWidget widget={widget} />;
    case 'videos':
      return <VideoWidget widget={widget} onUpdateWidget={onUpdateWidget} />;
    case 'feature-sets':
      return <FeatureSetWidget widget={widget} onUpdateWidget={onUpdateWidget} />;
    case 'specification-table':
      return <SpecificationTableWidget widget={widget} />;
    case 'text-html':
      return <TextBlockWidget widget={widget} />;
    case 'comparison-table':
      return <ComparisonTableWidget widget={widget} />;
    default:
      return <PlaceholderWidget widget={widget} />;
  }
}

function ImagesWidget({ widget, onUpdateWidget }: { widget: Widget; onUpdateWidget?: (widgetId: string, updates: Partial<Widget>) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [replaceImageIndex, setReplaceImageIndex] = useState<number | null>(null);
  const imageItems = widget.content.imageItems || [];
  const layout = widget.content.imageLayout || 'focused';
  const hasImages = imageItems.length > 0;
  
  // Fallback to legacy images array
  const legacyImage = widget.content.images?.[0];

  const handleAddAssets = (newAssets: ImageItem[]) => {
    if (newAssets.length > 0 && onUpdateWidget) {
      onUpdateWidget(widget.id, {
        content: {
          ...widget.content,
          imageItems: [...imageItems, ...newAssets],
        }
      });
    }
  };

  const handleReplaceImage = (newAssets: ImageItem[]) => {
    if (newAssets.length > 0 && replaceImageIndex !== null && onUpdateWidget) {
      const updatedItems = [...imageItems];
      updatedItems[replaceImageIndex] = {
        ...updatedItems[replaceImageIndex],
        url: newAssets[0].url,
        altText: newAssets[0].altText,
      };
      onUpdateWidget(widget.id, {
        content: {
          ...widget.content,
          imageItems: updatedItems,
        }
      });
    }
    setReplaceImageIndex(null);
  };

  const handleRemoveImage = (index: number) => {
    if (onUpdateWidget) {
      const updatedItems = imageItems.filter((_, idx) => idx !== index);
      onUpdateWidget(widget.id, {
        content: {
          ...widget.content,
          imageItems: updatedItems,
        }
      });
      // Adjust active index if needed
      if (activeIndex >= updatedItems.length && updatedItems.length > 0) {
        setActiveIndex(updatedItems.length - 1);
      }
    }
  };

  const openReplaceModal = (index: number) => {
    setReplaceImageIndex(index);
    setShowAssetModal(true);
  };
  
  if (!hasImages && !legacyImage) {
    return (
      <div className="p-8">
        <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-muted group cursor-pointer"
          onClick={() => setShowAssetModal(true)}
        >
          <img 
            src={sampleInlineImage} 
            alt="Sample placeholder" 
            className="w-full h-full object-cover opacity-30"
          />
          {/* Diagonal watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span 
              className="text-4xl font-bold text-muted-foreground/50 whitespace-nowrap select-none"
              style={{ transform: 'rotate(-35deg)' }}
            >
              Sample Image
            </span>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/30">
            <div className="bg-background/90 rounded-lg px-4 py-2 shadow-lg">
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Replace Image
              </p>
            </div>
          </div>
        </div>
        <AddAssetsModal
          open={showAssetModal}
          onOpenChange={setShowAssetModal}
          onAddAssets={handleAddAssets}
        />
      </div>
    );
  }

  // Legacy single image support
  if (!hasImages && legacyImage) {
    return (
      <div className="relative">
        <div className="aspect-[21/9] bg-gradient-to-br from-brand-600 to-brand-800 overflow-hidden">
          <img 
            src={legacyImage} 
            alt={widget.content.header || 'Image'} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {widget.content.header || 'Image Title'}
            </h2>
            {widget.content.description && (
              <p className="text-lg text-white/80 max-w-2xl">
                {widget.content.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  const activeImage = imageItems[activeIndex];

  // Focused layout - images stacked vertically
  if (layout === 'focused') {
    return (
      <div className="p-8">
        <div className="space-y-4">
          {imageItems.map((img, idx) => (
            <div key={img.id} className="space-y-2">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted group">
                <img 
                  src={img.url} 
                  alt={img.altText || `Image ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
                {/* Replace/Remove buttons overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openReplaceModal(idx)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-lg text-sm font-medium text-foreground hover:bg-gray-50 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Replace
                  </button>
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-destructive text-destructive-foreground rounded-full shadow-lg text-sm font-medium hover:bg-destructive/90 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>
              {img.description && (
                <p className="text-sm text-muted-foreground">
                  {img.description}
                </p>
              )}
              {img.caption && (
                <p className="text-xs text-muted-foreground/70 italic">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
        <AddAssetsModal
          open={showAssetModal}
          onOpenChange={setShowAssetModal}
          onAddAssets={replaceImageIndex !== null ? handleReplaceImage : handleAddAssets}
          singleSelect={replaceImageIndex !== null}
        />
      </div>
    );
  }

  // Slider layout - full width carousel
  return (
    <div className="p-8">
      <div className="relative aspect-[21/9] overflow-hidden bg-muted rounded-xl group">
        <img 
          src={activeImage.url} 
          alt={activeImage.altText || 'Slide image'} 
          className="w-full h-full object-cover"
        />
        
        {/* Navigation arrows */}
        {imageItems.length > 1 && (
          <>
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors z-10"
              onClick={() => setActiveIndex((activeIndex - 1 + imageItems.length) % imageItems.length)}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors z-10"
              onClick={() => setActiveIndex((activeIndex + 1) % imageItems.length)}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        
        {/* Dots indicator */}
        {imageItems.length > 1 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {imageItems.map((_, idx) => (
              <button
                key={idx}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  idx === activeIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
                )}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        )}

        {/* Replace/Remove buttons overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={() => openReplaceModal(activeIndex)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-lg text-sm font-medium text-foreground hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Replace
          </button>
          <button
            onClick={() => handleRemoveImage(activeIndex)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-destructive text-destructive-foreground rounded-full shadow-lg text-sm font-medium hover:bg-destructive/90 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
      
      {/* Description below slider */}
      {activeImage.description && (
        <div className="pt-4">
          <p className="text-sm text-muted-foreground">
            {activeImage.description}
          </p>
        </div>
      )}

      <AddAssetsModal
        open={showAssetModal}
        onOpenChange={setShowAssetModal}
        onAddAssets={replaceImageIndex !== null ? handleReplaceImage : handleAddAssets}
        singleSelect={replaceImageIndex !== null}
      />
    </div>
  );
}

function CarouselWidget({ widget }: { widget: Widget }) {
  const hasImage = widget.content.images?.[0];
  
  return (
    <div className="relative">
      <div className="aspect-[21/9] bg-gradient-to-br from-brand-600 to-brand-800 overflow-hidden">
        {hasImage ? (
          <img 
            src={widget.content.images![0]} 
            alt={widget.content.header || 'Image'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-white/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {widget.content.header || 'Image Title'}
          </h2>
          {widget.content.description && (
            <p className="text-lg text-white/80 max-w-2xl">
              {widget.content.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function VideoWidget({ widget, onUpdateWidget }: { widget: Widget; onUpdateWidget?: (widgetId: string, updates: Partial<Widget>) => void }) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const hasVideo = widget.content.videoUrl || (widget.content.videos && widget.content.videos.length > 0);
  const firstVideo = widget.content.videos?.[0];
 
  const handleReplaceVideo = (newVideos: VideoItem[]) => {
    if (newVideos.length > 0 && onUpdateWidget) {
      // Replace first video or add if none exists
      const updatedVideos = widget.content.videos ? [...widget.content.videos] : [];
      if (updatedVideos.length > 0) {
        updatedVideos[0] = newVideos[0];
      } else {
        updatedVideos.push(newVideos[0]);
      }
      onUpdateWidget(widget.id, {
        content: {
          ...widget.content,
          videos: updatedVideos,
        }
      });
    }
  };
  
  return (
    <>
      <div className="p-8 flex items-center justify-center">
        <div 
          className="w-3/4 aspect-video bg-muted rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer"
          onClick={() => setShowVideoModal(true)}
        >
          {hasVideo && firstVideo?.snapshotUrl ? (
            <div className="absolute inset-0">
              <img 
                src={firstVideo.snapshotUrl} 
                alt={firstVideo.caption || 'Video thumbnail'} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur flex items-center justify-center">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
              </div>
            </div>
          ) : hasVideo ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          ) : (
            <>
              {/* Sample video placeholder with product image */}
              <img 
                src={sampleProductImage} 
                alt="Sample video placeholder" 
                className="w-full h-full object-cover opacity-30"
              />
              {/* Diagonal "Sample Video" watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <span 
                  className="text-4xl font-bold text-muted-foreground/50 whitespace-nowrap select-none"
                  style={{ transform: 'rotate(-35deg)' }}
                >
                  Sample Video
                </span>
              </div>
              {/* Play button overlay - on top of watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center opacity-80">
                  <Play className="w-8 h-8 ml-1" fill="white" stroke="white" />
                </div>
              </div>
            </>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/30 z-20">
            <div className="bg-background/90 rounded-lg px-4 py-2 shadow-lg">
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Replace Video
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <AddVideosModal
        open={showVideoModal}
        onOpenChange={setShowVideoModal}
        onAddVideos={handleReplaceVideo}
        singleSelect
        title="Select Video"
      />
    </>
  );
 }

function FeatureSetWidget({ widget, onUpdateWidget }: { widget: Widget; onUpdateWidget?: (widgetId: string, updates: Partial<Widget>) => void }) {
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [headerValue, setHeaderValue] = useState(widget.content.header || 'Feature Set Title');
  const [editingFeatureId, setEditingFeatureId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<'title' | 'description' | null>(null);
  const [featureTitleValue, setFeatureTitleValue] = useState('');
  const [featureDescValue, setFeatureDescValue] = useState('');
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [replaceFeatureId, setReplaceFeatureId] = useState<string | null>(null);
  const features = widget.content.features || [];

  // Read layout settings from widget content
  const layout = widget.content.featureLayout || 'horizontal';
  const horizontalAlignment = widget.content.horizontalAlignment || 'image-left';
  const columns = widget.content.featureColumns || 3;

  // Sync local state when widget prop changes
  useEffect(() => {
    setHeaderValue(widget.content.header || 'Feature Set Title');
  }, [widget.content.header]);

  const handleHeaderSave = () => {
    setIsEditingHeader(false);
    if (onUpdateWidget) {
      onUpdateWidget(widget.id, {
        content: {
          ...widget.content,
          header: headerValue || 'Feature Set Title'
        }
      });
    }
  };

  const handleHeaderKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleHeaderSave();
    }
    if (e.key === 'Escape') {
      setHeaderValue(widget.content.header || 'Feature Set Title');
      setIsEditingHeader(false);
    }
  };

  const handleFeatureImageReplace = (newAssets: ImageItem[]) => {
    if (newAssets.length > 0 && replaceFeatureId && onUpdateWidget) {
      const newImageUrl = newAssets[0].url;
      
      const updatedFeatures = features.map(f => 
        f.id === replaceFeatureId ? { ...f, imageUrl: newImageUrl } : f
      );
      
      onUpdateWidget(widget.id, {
        content: {
          ...widget.content,
          features: updatedFeatures
        }
      });
    }
    setReplaceFeatureId(null);
  };

  const openAssetModalForFeature = (featureId: string) => {
    setReplaceFeatureId(featureId);
    setShowAssetModal(true);
  };

  const handleStartEditingFeatureTitle = (feature: { id: string; title: string }) => {
    setEditingFeatureId(feature.id);
    setEditingField('title');
    setFeatureTitleValue(feature.title);
  };

  const handleStartEditingFeatureDesc = (feature: { id: string; description: string }) => {
    setEditingFeatureId(feature.id);
    setEditingField('description');
    setFeatureDescValue(feature.description);
  };

  const handleSaveFeatureTitle = () => {
    if (editingFeatureId && onUpdateWidget) {
      const updatedFeatures = features.map(f => 
        f.id === editingFeatureId ? { ...f, title: featureTitleValue || 'Untitled Feature' } : f
      );
      
      onUpdateWidget(widget.id, {
        content: {
          ...widget.content,
          features: updatedFeatures
        }
      });
    }
    setEditingFeatureId(null);
    setEditingField(null);
    setFeatureTitleValue('');
  };

  const handleSaveFeatureDesc = () => {
    if (editingFeatureId && onUpdateWidget) {
      const updatedFeatures = features.map(f => 
        f.id === editingFeatureId ? { ...f, description: featureDescValue || '' } : f
      );
      
      onUpdateWidget(widget.id, {
        content: {
          ...widget.content,
          features: updatedFeatures
        }
      });
    }
    setEditingFeatureId(null);
    setEditingField(null);
    setFeatureDescValue('');
  };

  const handleFeatureTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveFeatureTitle();
    }
    if (e.key === 'Escape') {
      setEditingFeatureId(null);
      setEditingField(null);
      setFeatureTitleValue('');
    }
  };

  const handleFeatureDescKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveFeatureDesc();
    }
    if (e.key === 'Escape') {
      setEditingFeatureId(null);
      setEditingField(null);
      setFeatureDescValue('');
    }
  };

  // Helper to get image alignment for horizontal layout
  const getImageAlignment = (index: number): 'left' | 'right' => {
    switch (horizontalAlignment) {
      case 'image-left':
        return 'left';
      case 'image-right':
        return 'right';
      case 'alternating':
        return index % 2 === 0 ? 'left' : 'right';
      default:
        return 'left';
    }
  };

  // Render a single feature card (used in vertical layout)
  const renderVerticalFeatureCard = (feature: typeof features[0], index: number) => (
    <div key={feature.id} className="text-center p-4">
      {/* Feature image with sample placeholder and hover to replace */}
      <div 
        className={cn(
          "relative rounded-xl overflow-hidden bg-muted mb-4 group cursor-pointer mx-auto",
          columns === 2 ? "aspect-[4/3] max-w-[80%]" : "aspect-square"
        )}
        onClick={() => openAssetModalForFeature(feature.id)}
      >
        <img 
          src={feature.imageUrl || sampleProductImage} 
          alt={feature.altText || feature.title} 
          className={cn(
            "w-full h-full object-cover",
            !feature.imageUrl && "opacity-30"
          )}
        />
        {!feature.imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span 
              className="text-sm font-bold text-muted-foreground/50 whitespace-nowrap select-none"
              style={{ transform: 'rotate(-35deg)' }}
            >
              Sample Image
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/30">
          <div className="bg-background/90 rounded-lg px-3 py-1.5 shadow-lg">
            <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              Replace Image
            </p>
          </div>
        </div>
      </div>
      {/* Editable feature title */}
      {editingFeatureId === feature.id && editingField === 'title' ? (
        <input
          type="text"
          value={featureTitleValue}
          onChange={(e) => setFeatureTitleValue(e.target.value)}
          onBlur={handleSaveFeatureTitle}
          onKeyDown={handleFeatureTitleKeyDown}
          autoFocus
          className="text-base font-semibold text-foreground text-center mb-2 w-full bg-transparent border-b-2 border-primary outline-none"
        />
      ) : (
        <h4 
          className="text-base font-semibold text-foreground mb-2 cursor-text hover:bg-muted/50 rounded px-1 py-0.5 transition-colors"
          onClick={() => handleStartEditingFeatureTitle(feature)}
        >
          {feature.title}
        </h4>
      )}
      {/* Editable feature description */}
      {editingFeatureId === feature.id && editingField === 'description' ? (
        <textarea
          value={featureDescValue}
          onChange={(e) => setFeatureDescValue(e.target.value)}
          onBlur={handleSaveFeatureDesc}
          onKeyDown={handleFeatureDescKeyDown}
          autoFocus
          rows={3}
          className="text-sm text-muted-foreground text-center w-full bg-transparent border-b-2 border-primary outline-none resize-none"
        />
      ) : (
        <p 
          className="text-sm text-muted-foreground cursor-text hover:bg-muted/50 rounded px-1 py-0.5 transition-colors"
          onClick={() => handleStartEditingFeatureDesc(feature)}
        >
          {feature.description}
        </p>
      )}
    </div>
  );

  // Render a horizontal feature row (image + text side by side)
  const renderHorizontalFeatureRow = (feature: typeof features[0], index: number) => {
    const alignment = getImageAlignment(index);
    
    return (
      <div 
        key={feature.id} 
        className={cn(
          "flex items-start gap-8 py-4",
          alignment === 'right' && "flex-row-reverse",
          index > 0 && "border-t border-border"
        )}
      >
        {/* Image Section - Square aspect ratio */}
        <div 
          className="relative w-48 h-48 rounded-xl overflow-hidden bg-muted shrink-0 group cursor-pointer shadow-sm"
          onClick={() => openAssetModalForFeature(feature.id)}
        >
          <img 
            src={feature.imageUrl || sampleProductImage} 
            alt={feature.altText || feature.title} 
            className={cn(
              "w-full h-full object-cover",
              !feature.imageUrl && "opacity-30"
            )}
          />
          {!feature.imageUrl && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <span 
                className="text-sm font-bold text-muted-foreground/50 whitespace-nowrap select-none"
                style={{ transform: 'rotate(-35deg)' }}
              >
                Sample Image
              </span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/30">
            <div className="bg-background/90 rounded-lg px-3 py-1.5 shadow-lg">
              <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                Replace Image
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 py-2">
          {/* Editable feature title */}
          {editingFeatureId === feature.id && editingField === 'title' ? (
            <input
              type="text"
              value={featureTitleValue}
              onChange={(e) => setFeatureTitleValue(e.target.value)}
              onBlur={handleSaveFeatureTitle}
              onKeyDown={handleFeatureTitleKeyDown}
              autoFocus
              className="text-lg font-bold text-foreground mb-3 w-full bg-transparent border-b-2 border-primary outline-none"
            />
          ) : (
            <h4 
              className="text-lg font-bold text-foreground mb-3 cursor-text hover:bg-muted/50 rounded px-1 py-0.5 transition-colors inline-block"
              onClick={() => handleStartEditingFeatureTitle(feature)}
            >
              {feature.title}
            </h4>
          )}
          {/* Editable feature description */}
          {editingFeatureId === feature.id && editingField === 'description' ? (
            <textarea
              value={featureDescValue}
              onChange={(e) => setFeatureDescValue(e.target.value)}
              onBlur={handleSaveFeatureDesc}
              onKeyDown={handleFeatureDescKeyDown}
              autoFocus
              rows={4}
              className="text-sm text-muted-foreground leading-relaxed w-full bg-transparent border-b-2 border-primary outline-none resize-none"
            />
          ) : (
            <p 
              className="text-sm text-muted-foreground leading-relaxed cursor-text hover:bg-muted/50 rounded px-1 py-0.5 transition-colors"
              onClick={() => handleStartEditingFeatureDesc(feature)}
            >
              {feature.description}
            </p>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-8">
      {/* Editable Header */}
      {isEditingHeader ? (
        <input
          type="text"
          value={headerValue}
          onChange={(e) => setHeaderValue(e.target.value)}
          onBlur={handleHeaderSave}
          onKeyDown={handleHeaderKeyDown}
          autoFocus
          className="text-xl font-semibold text-foreground text-center mb-2 w-full bg-transparent border-b-2 border-primary outline-none"
        />
      ) : (
        <h3 
          className="text-xl font-semibold text-foreground text-center mb-2 cursor-text hover:bg-muted/50 rounded px-2 py-1 transition-colors"
          onClick={() => setIsEditingHeader(true)}
        >
          {widget.content.header || 'Feature Set Title'}
        </h3>
      )}

      {/* VERTICAL LAYOUT - Grid of cards */}
      {layout === 'vertical' && (
        <div className={cn(
          "grid gap-6",
          columns === 2 && "grid-cols-2",
          columns === 3 && "grid-cols-3",
          columns === 4 && "grid-cols-4"
        )}>
          {features.slice(0, columns).map((feature, index) => renderVerticalFeatureCard(feature, index))}
        </div>
      )}

      {/* HORIZONTAL LAYOUT - Stacked rows (limit to 3 features) */}
      {layout === 'horizontal' && (
        <div className="space-y-0">
          {features.slice(0, 3).map((feature, index) => renderHorizontalFeatureRow(feature, index))}
        </div>
      )}

      <AddAssetsModal
        open={showAssetModal}
        onOpenChange={(open) => {
          setShowAssetModal(open);
          if (!open) setReplaceFeatureId(null);
        }}
        onAddAssets={handleFeatureImageReplace}
        singleSelect
        title="Select Image"
      />
    </div>
  );
}

function SpecificationTableWidget({ widget }: { widget: Widget }) {
  const specs = widget.content.specifications || [];
  
  return (
    <div className="p-8">
      {widget.content.header && (
        <h3 className="text-xl font-semibold text-foreground mb-6">
          {widget.content.header}
        </h3>
      )}
      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <tbody className="divide-y divide-border">
            {specs.map((spec, index) => (
              <tr 
                key={spec.id} 
                className={cn(
                  index % 2 === 0 ? "bg-muted/30" : "bg-card"
                )}
              >
                <td className="px-4 py-3 text-sm font-medium text-foreground w-1/3">
                  {spec.label}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TextBlockWidget({ widget }: { widget: Widget }) {
  return (
    <div className="p-8">
      {widget.content.header && (
        <h3 className="text-xl font-semibold text-foreground mb-4">
          {widget.content.header}
        </h3>
      )}
      {widget.content.description && (
        <p className="text-base text-muted-foreground leading-relaxed">
          {widget.content.description}
        </p>
      )}
    </div>
  );
}

function ComparisonTableWidget({ widget }: { widget: Widget }) {
  return (
    <div className="p-8">
      {widget.content.header && (
        <h3 className="text-xl font-semibold text-foreground mb-6">
          {widget.content.header}
        </h3>
      )}
      <div className="h-32 bg-muted rounded-xl flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Comparison table preview
        </p>
      </div>
    </div>
  );
}

function PlaceholderWidget({ widget }: { widget: Widget }) {
  return (
    <div className="p-8">
      <div className="h-32 bg-muted rounded-xl flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {widget.title} - Preview coming soon
        </p>
      </div>
    </div>
  );
}
