import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  RotateCcw, 
  FlipHorizontal, 
  Move, 
  Maximize2, 
  Check, 
  RefreshCw, 
  Sparkles, 
  Grid, 
  User, 
  Sliders,
  ShieldCheck,
  Eye
} from 'lucide-react';

interface ImageResizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  onSave: (finalCroppedBase64: string) => Promise<void> | void;
}

type AspectRatioType = '4:5' | '1:1' | '3:4';

export const ImageResizerModal: React.FC<ImageResizerModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  onSave
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Transformations
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('4:5');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showFaceGuide, setShowFaceGuide] = useState<boolean>(true);

  // Dragging state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [saving, setSaving] = useState<boolean>(false);

  // Image load state
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Reset transforms whenever a new image is loaded
  useEffect(() => {
    if (isOpen && imageSrc) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
      setIsFlipped(false);
      setImgLoaded(false);
    }
  }, [isOpen, imageSrc]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    setImgLoaded(true);
  };

  // Pointer / Mouse Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {
        // Safe fallback
      }
    }
  };

  // Quick Preset Alignments
  const alignPreset = (type: 'center' | 'top' | 'reset') => {
    if (type === 'reset') {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
      setIsFlipped(false);
    } else if (type === 'top') {
      // Focus on upper portion (head/face for portraits)
      setPosition(prev => ({ ...prev, y: 40 }));
    } else if (type === 'center') {
      setPosition({ x: 0, y: 0 });
    }
  };

  // Generate cropped and resized high-res output on canvas
  const handleExportAndSave = async () => {
    if (!imgLoaded || !imageRef.current) return;

    setSaving(true);
    try {
      const exportCanvas = document.createElement('canvas');
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context not available');

      // Target high-definition output dimensions based on chosen aspect ratio
      let targetW = 800;
      let targetH = 1000; // 4:5

      if (aspectRatio === '1:1') {
        targetW = 800;
        targetH = 800;
      } else if (aspectRatio === '3:4') {
        targetW = 750;
        targetH = 1000;
      }

      exportCanvas.width = targetW;
      exportCanvas.height = targetH;

      // Enable high-quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Background fill
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, targetW, targetH);

      // Frame box in UI
      const containerBox = containerRef.current?.getBoundingClientRect();
      const frameW = containerBox?.width || 320;
      const frameH = containerBox?.height || 400;

      // Calculate scale factor between UI frame and export canvas
      const scaleMultiplier = targetW / frameW;

      ctx.save();
      // Move to center of canvas
      ctx.translate(targetW / 2 + position.x * scaleMultiplier, targetH / 2 + position.y * scaleMultiplier);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(isFlipped ? -scale : scale, scale);

      // Calculate base displayed dimensions inside the UI frame
      const imgNaturalW = originalDimensions.width;
      const imgNaturalH = originalDimensions.height;

      // Calculate 'cover' base dimensions relative to the frame
      const ratioFrame = frameW / frameH;
      const ratioImg = imgNaturalW / imgNaturalH;

      let drawW: number;
      let drawH: number;

      if (ratioImg > ratioFrame) {
        drawH = frameH;
        drawW = frameH * ratioImg;
      } else {
        drawW = frameW;
        drawH = frameW / ratioImg;
      }

      // Scale up to export canvas coordinates
      const finalDrawW = drawW * scaleMultiplier;
      const finalDrawH = drawH * scaleMultiplier;

      // Draw centered image
      const sourceImg = imageRef.current;
      ctx.drawImage(sourceImg, -finalDrawW / 2, -finalDrawH / 2, finalDrawW, finalDrawH);
      ctx.restore();

      const finalBase64 = exportCanvas.toDataURL('image/jpeg', 0.92);
      await onSave(finalBase64);
      onClose();
    } catch (err) {
      console.error('Failed to crop and save image:', err);
      alert('Could not process image crop. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const getAspectClasses = () => {
    switch (aspectRatio) {
      case '1:1':
        return 'w-72 h-72 sm:w-80 sm:h-80';
      case '3:4':
        return 'w-64 h-[340px] sm:w-72 sm:h-[384px]';
      case '4:5':
      default:
        return 'w-64 h-80 sm:w-80 sm:h-[400px]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>Executive Headshot Framing & Resizer</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] uppercase font-mono">
                  Admin Tool
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Drag, scale, and align your photo so it fits seamlessly on the website.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Body */}
        <div className="p-4 sm:p-6 grid lg:grid-cols-12 gap-6 overflow-y-auto">
          
          {/* Visual Canvas Framing Area (Left Column) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 relative overflow-hidden select-none">
            
            {/* Guide Instructions Overlay */}
            <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-cyan-300">
                <Move className="w-3.5 h-3.5" />
                <span>Click & drag photo to reposition</span>
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Zoom: {Math.round(scale * 100)}%
              </span>
            </div>

            {/* Viewport Frame with Aspect Ratio */}
            <div 
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative ${getAspectClasses()} rounded-2xl overflow-hidden border-2 border-cyan-400/90 shadow-2xl cursor-grab active:cursor-grabbing bg-slate-900 touch-none`}
            >
              {/* Image Element */}
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`
                }}
              >
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Upload Source Preview"
                  crossOrigin="anonymous"
                  onLoad={handleImageLoad}
                  className="max-w-none pointer-events-none object-cover transition-none"
                  style={{
                    transform: `scale(${isFlipped ? -scale : scale}, ${scale}) rotate(${rotation}deg)`,
                    transformOrigin: 'center center',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>

              {/* Rule of Thirds Grid Overlay */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-cyan-400/20">
                  <div className="border-r border-b border-cyan-400/25" />
                  <div className="border-r border-b border-cyan-400/25" />
                  <div className="border-b border-cyan-400/25" />
                  <div className="border-r border-b border-cyan-400/25" />
                  <div className="border-r border-b border-cyan-400/25" />
                  <div className="border-b border-cyan-400/25" />
                  <div className="border-r border-cyan-400/25" />
                  <div className="border-r border-cyan-400/25" />
                  <div />
                </div>
              )}

              {/* Eye-level & Face Alignment Guide Overlay */}
              {showFaceGuide && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-start pt-10">
                  {/* Eye Level Line */}
                  <div className="w-full border-b border-dashed border-emerald-400/40 relative">
                    <span className="absolute right-2 -top-4 text-[9px] font-mono text-emerald-400 uppercase tracking-wider bg-slate-950/70 px-1 rounded">
                      Eye Level
                    </span>
                  </div>
                  {/* Head Oval Guide */}
                  <div className="w-28 h-36 rounded-full border border-dashed border-cyan-400/30 mt-2" />
                </div>
              )}

              {/* Corner Framing Marks */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
            </div>

            {/* Quick Helper Toggles Under Canvas */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs">
              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 transition-colors ${
                  showGrid ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>

              <button
                type="button"
                onClick={() => setShowFaceGuide(!showFaceGuide)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium flex items-center gap-1.5 transition-colors ${
                  showFaceGuide ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Eye Guide</span>
              </button>

              <button
                type="button"
                onClick={() => alignPreset('top')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-medium transition-colors"
              >
                Focus Top/Face
              </button>

              <button
                type="button"
                onClick={() => alignPreset('center')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-medium transition-colors"
              >
                Center
              </button>
            </div>

          </div>

          {/* Controls & Fine-Tuning Panel (Right Column) */}
          <div className="lg:col-span-5 space-y-5 text-xs text-left">
            
            {/* Aspect Ratio Selector */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <label className="block text-slate-300 font-bold text-xs">
                Framing Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAspectRatio('4:5')}
                  className={`py-2 px-2 rounded-xl text-center font-bold border transition-all ${
                    aspectRatio === '4:5'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs">4:5 Portrait</p>
                  <p className="text-[10px] opacity-80">(Hero Standard)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('1:1')}
                  className={`py-2 px-2 rounded-xl text-center font-bold border transition-all ${
                    aspectRatio === '1:1'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs">1:1 Square</p>
                  <p className="text-[10px] opacity-80">(Badge / Card)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('3:4')}
                  className={`py-2 px-2 rounded-xl text-center font-bold border transition-all ${
                    aspectRatio === '3:4'
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs">3:4 Classic</p>
                  <p className="text-[10px] opacity-80">(Traditional)</p>
                </button>
              </div>
            </div>

            {/* Zoom / Scale Control */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-bold flex items-center gap-1.5">
                  <ZoomIn className="w-4 h-4 text-cyan-400" />
                  <span>Zoom & Scale</span>
                </label>
                <span className="font-mono text-cyan-300 font-bold">
                  {Math.round(scale * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.02"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-2 bg-slate-900 rounded-lg cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => setScale(s => Math.min(3.0, s + 0.1))}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <button type="button" onClick={() => setScale(0.8)} className="hover:text-slate-300">80%</button>
                <button type="button" onClick={() => setScale(1.0)} className="hover:text-slate-300">100% (Default)</button>
                <button type="button" onClick={() => setScale(1.3)} className="hover:text-slate-300">130%</button>
                <button type="button" onClick={() => setScale(1.7)} className="hover:text-slate-300">170%</button>
                <button type="button" onClick={() => setScale(2.2)} className="hover:text-slate-300">220%</button>
              </div>
            </div>

            {/* Orientation & Rotate Tools */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <label className="block text-slate-300 font-bold">
                Orientation & Tools
              </label>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRotation(r => (r - 90) % 360)}
                  className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Rotate -90°</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRotation(r => (r + 90) % 360)}
                  className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Rotate +90°</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsFlipped(f => !f)}
                  className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-colors ${
                    isFlipped ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-300 border-slate-800'
                  }`}
                >
                  <FlipHorizontal className="w-3.5 h-3.5" />
                  <span>Flip</span>
                </button>
              </div>
            </div>

            {/* Fine Position Adjustment Sliders */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-bold">
                  Fine Position Sliders
                </label>
                <button
                  type="button"
                  onClick={() => setPosition({ x: 0, y: 0 })}
                  className="text-[10px] text-slate-400 hover:text-cyan-300 font-mono"
                >
                  Reset Offsets
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="w-12">Horiz (X):</span>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={position.x}
                    onChange={(e) => setPosition(p => ({ ...p, x: parseInt(e.target.value) }))}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-900 rounded-lg cursor-pointer"
                  />
                  <span className="w-8 font-mono text-right text-slate-300">{position.x}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="w-12">Vert (Y):</span>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={position.y}
                    onChange={(e) => setPosition(p => ({ ...p, y: parseInt(e.target.value) }))}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-900 rounded-lg cursor-pointer"
                  />
                  <span className="w-8 font-mono text-right text-slate-300">{position.y}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => alignPreset('reset')}
                className="px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 font-semibold text-xs transition-colors"
              >
                Reset All
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={handleExportAndSave}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing & Publishing...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Apply Crop & Publish to Website</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
