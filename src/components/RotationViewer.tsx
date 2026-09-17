import { useState, useRef, useCallback, useEffect } from "react";
import { RotateCw, Loader2 } from "lucide-react";

interface RotationViewerProps {
  productName: string;
  frameCount?: number;
}

export default function RotationViewer({ productName, frameCount = 24 }: RotationViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startFrameRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleInteraction = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const deltaX = clientX - startXRef.current;
      const sensitivity = rect.width / frameCount;
      const frameDelta = Math.round(deltaX / sensitivity);
      const newFrame = ((startFrameRef.current + frameDelta) % frameCount + frameCount) % frameCount;
      setCurrentFrame(newFrame);
    },
    [frameCount]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startFrameRef.current = currentFrame;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleInteraction(e.clientX);
  };

  const handlePointerUp = () => setIsDragging(false);

  // Generate visual angle
  const angle = (currentFrame / frameCount) * 360;

  return (
    <div
      ref={containerRef}
      className="relative aspect-square bg-muted rounded overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <span className="ml-2 font-heading text-sm text-muted-foreground">Loading 360° View...</span>
        </div>
      ) : (
        <>
          {/* Simulated 360° view with CSS rotation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-3/4 h-3/4 bg-accent rounded-lg border border-border flex items-center justify-center transition-none"
              style={{ transform: `perspective(800px) rotateY(${angle}deg)` }}
            >
              <div className="text-center px-4">
                <span className="font-heading text-lg font-bold text-foreground block">{productName}</span>
                <span className="text-xs text-muted-foreground mt-1 block">Frame {currentFrame + 1}/{frameCount}</span>
              </div>
            </div>
          </div>

          {/* Overlay UI */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="bg-secondary/80 backdrop-blur-sm text-secondary-foreground px-3 py-1.5 rounded text-xs font-heading uppercase tracking-wider flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5" />
              Drag to Rotate
            </div>
            <div className="bg-secondary/80 backdrop-blur-sm text-secondary-foreground px-3 py-1.5 rounded text-xs font-mono">
              {Math.round(angle)}°
            </div>
          </div>
        </>
      )}
    </div>
  );
}
