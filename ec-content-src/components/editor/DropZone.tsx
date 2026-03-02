import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface DropZoneProps {
  isActive?: boolean;
  position: 'before' | 'after' | 'empty';
  onDrop: (e: React.DragEvent) => void;
  className?: string;
}

export function DropZone({ isActive = false, position, onDrop, className }: DropZoneProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const showHighlight = isActive || isHovered;

  if (position === 'empty') {
    return (
      <div
        className={cn(
          "flex items-center justify-center min-h-[140px] border-2 border-dashed rounded-xl transition-all duration-300",
          showHighlight 
            ? "border-primary bg-primary/10 scale-[1.01] shadow-[0_0_20px_rgba(var(--primary),0.15)]" 
            : "border-muted-foreground/30 bg-muted/10 hover:border-muted-foreground/50",
          className
        )}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsHovered(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsHovered(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsHovered(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsHovered(false);
          onDrop(e);
        }}
      >
        <div className="text-center">
          {showHighlight ? (
            <>
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 animate-pulse">
                <Plus className="w-7 h-7 text-primary" />
              </div>
              <p className="text-sm font-medium text-primary">Drop widget here</p>
              <p className="text-xs text-primary/70 mt-1">Release to add</p>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">Drag widgets here</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Or select from the palette</p>
            </>
          )}
        </div>
      </div>
    );
  }

  // Much larger drop zone for easier dropping
  return (
    <div
      className={cn(
        "relative transition-all duration-200 min-h-[40px] -my-4 flex items-center justify-center",
        showHighlight && "bg-primary/5",
        className
      )}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsHovered(true);
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setIsHovered(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsHovered(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsHovered(false);
        onDrop(e);
      }}
    >
      <div
        className={cn(
          "w-full rounded-lg transition-all duration-200 flex items-center justify-center",
          showHighlight 
            ? "h-12 bg-primary/10 border-2 border-dashed border-primary shadow-[0_0_16px_rgba(var(--primary),0.2)]" 
            : "h-1 bg-transparent hover:bg-muted/50"
        )}
      >
        {showHighlight && (
          <div className="flex items-center gap-2 text-primary">
            <div className="bg-primary text-primary-foreground rounded-full p-1 shadow-lg animate-pulse">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Drop here</span>
          </div>
        )}
      </div>
    </div>
  );
}
