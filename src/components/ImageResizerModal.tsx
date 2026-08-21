import React, { useState, useRef, useEffect } from 'react';
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
  CheckCircle2,
  RefreshCw, 
  Sparkles, 
  Grid, 
  User, 
  Sliders,
  ShieldCheck,
  Eye,
  Maximize,
  Minimize
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
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Image load state
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [fitScale, setFitScale] = useState<number>(1);

  // Frame dimension helper
  const getFrameDimensions = () => {
    switch (aspectRatio) {
      case '1:1':
        return { w: 320, h: 320 };
      case '3:4':
        return { w: 300, h: 400 };
      case '4:5':
      default:
        return { w: 320, h: 400 };
    }
  };

  // Load and calculate uncropped fit whenever a new image or aspect ratio is selected
  useEffect(() => {
    if (!isOpen || !imageSrc) return;

    setUploadSuccess(false);
    setSaving(false);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const naturalW = img.naturalWidth || 800;
      const naturalH = img.naturalHeight || 1000;
      setOriginalDimensions({ width: naturalW, height: naturalH });

      const frame = getFrameDimensions();
      // Calculate scale where 100% of the image fits in the viewport without any cropping
      const calculatedFit = Math.min(frame.w / naturalW, frame.h / naturalH);
      setFitScale(calculatedFit);
      
      // Default: Scale to 1.0 (Full photo visible, uncropped)
      setScale(1.0);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
      setIsFlipped(false);
      setImgLoaded(true);
    };

    img.onerror = () => {
      // Fallback
      setOriginalDimensions({ width: 800, height: 1000 });
      setImgLoaded(true);
    };

    img.src = imageSrc;
  }, [isOpen, imageSrc, aspectRatio]);

  // Pointer / Mouse Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch (err) {}
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
      } catch (err) {}
    }
  };

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    setScale(prev => Math.min(4.0, Math.max(0.3, prev + delta)));
  };

  // Quick Preset Alignments
  const alignPreset = (type: 'fit' | 'fill' | 'top' | 'center' | 'reset') => {
    const frame = getFrameDimensions();
    const naturalW = originalDimensions.width || 800;
    const naturalH = originalDimensions.height || 1000;

    if (type === 'fit' || type === 'reset') {
      // Show entire picture with zero crop
      setScale(1.0);
      setPosition({ x: 0, y: 0 });
      setRotation(0);
      setIsFlipped(false);
    } else if (type === 'fill') {
      // Fill the entire frame (cover mode)
      const fillFactor = Math.max(frame.w / (naturalW * fitScale), frame.h / (naturalH * fitScale));
      setScale(fillFactor);
      setPosition({ x: 0, y: 0 });
    } else if (type === 'top') {
      // Focus upper portrait area
      setScale(prev => Math.max(1.2, prev));
      setPosition(prev => ({ ...prev, y: 40 }));
    } else if (type === 'center') {
      setPosition({ x: 0, y: 0 });
    }
  };

  // Generate cropped output on canvas matching preview frame
  const handleExportAndSave = async () => {
    if (!imageSrc) return;

    setSaving(true);
    try {
      const exportCanvas = document.createElement('canvas');
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context unavailable');

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

      // Enable ultra-smooth downsampling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Matte Background fill
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, targetW, targetH);

      const frame = getFrameDimensions();
      const scaleMultiplier = targetW / frame.w;

      // Render image to canvas
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // fallback gracefully
        img.src = imageSrc;
        if (img.complete) resolve();
      });

      const naturalW = img.naturalWidth || originalDimensions.width || 800;
      const naturalH = img.naturalHeight || originalDimensions.height || 1000;
      const effectiveFit = Math.min(frame.w / naturalW, frame.h / naturalH);

      // Base display dimensions in viewport
      const baseW = naturalW * effectiveFit;
      const baseH = naturalH * effectiveFit;

      ctx.save();
      // Center canvas coordinates and apply user translation
      ctx.translate(targetW / 2 + position.x * scaleMultiplier, targetH / 2 + position.y * scaleMultiplier);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(isFlipped ? -1 : 1, 1);

      const finalDrawW = baseW * scale * scaleMultiplier;
      const finalDrawH = baseH * scale * scaleMultiplier;

      ctx.drawImage(img, -finalDrawW / 2, -finalDrawH / 2, finalDrawW, finalDrawH);
      ctx.restore();

      const finalBase64 = exportCanvas.toDataURL('image/jpeg', 0.94);

      // Save to parent state and storage
      await onSave(finalBase64);

      setSaving(false);
      setUploadSuccess(true);

      // Smooth transition back to admin portal
      setTimeout(() => {
        onClose();
        setUploadSuccess(false);
      }, 700);
    } catch (err) {
      console.error('Failed to crop and save image:', err);
      // Fallback: save raw image if canvas failed
      await onSave(imageSrc);
      setSaving(false);
      setUploadSuccess(true);
      setTimeout(() => {
        onClose();
        setUploadSuccess(false);
      }, 700);
    }
  };

  if (!isOpen) return null;

  const frame = getFrameDimensions();
  const naturalW = originalDimensions.width || 800;
  const naturalH = originalDimensions.height || 1000;
  const baseDisplayW = naturalW * fitScale;
  const baseDisplayH = naturalH * fitScale;

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
                  Uncropped Source Loaded
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Your full picture is loaded without automatic crop. Drag, zoom, and align as desired.
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
                <span>Drag to reposition • Scroll to zoom</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
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
              onWheel={handleWheel}
              style={{
                width: `${frame.w}px`,
                height: `${frame.h}px`,
                maxWidth: '100%'
              }}
              className="relative rounded-2xl overflow-hidden border-2 border-cyan-400/90 shadow-2xl cursor-grab active:cursor-grabbing bg-slate-900 touch-none flex items-center justify-center"
            >
              {/* Image Element Centered & Positioned */}
              <div 
                className="absolute flex items-center justify-center pointer-events-none"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`
                }}
              >
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Upload Preview"
                  crossOrigin="anonymous"
                  className="max-w-none pointer-events-none select-none transition-none"
                  style={{
                    width: `${baseDisplayW * scale}px`,
                    height: `${baseDisplayH * scale}px`,
                    transform: `rotate(${rotation}deg) scaleX(${isFlipped ? -1 : 1})`,
                    transformOrigin: 'center center'
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
                    <span className="absolute right-2 -top-4 text-[9px] font-mono text-emerald-400 uppercase tracking-wider bg-slate-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      Eye Level
                    </span>
                  </div>
                  {/* Head Oval Guide */}
                  <div className="w-28 h-36 rounded-full border border-dashed border-cyan-400/35 mt-2" />
                </div>
              )}

              {/* Corner Framing Marks */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />
            </div>

            {/* Quick Helper Toggles & Fit Presets */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <button
                type="button"
                onClick={() => alignPreset('fit')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 text-[11px] font-medium transition-colors flex items-center gap-1"
                title="Fit entire photo without any cropping"
              >
                <Minimize className="w-3 h-3" />
                <span>Fit Whole Photo</span>
              </button>

              <button
                type="button"
                onClick={() => alignPreset('fill')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-medium transition-colors flex items-center gap-1"
                title="Fill the entire frame"
              >
                <Maximize className="w-3 h-3" />
                <span>Fill Frame</span>
              </button>

              <button
                type="button"
                onClick={() => alignPreset('top')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-medium transition-colors"
              >
                Focus Face
              </button>

              <button
                type="button"
                onClick={() => alignPreset('center')}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-medium transition-colors"
              >
                Center
              </button>

              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                className={`px-2 py-1 rounded-lg border text-[11px] font-medium flex items-center gap-1 transition-colors ${
                  showGrid ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <Grid className="w-3 h-3" />
                <span>Grid</span>
              </button>

              <button
                type="button"
                onClick={() => setShowFaceGuide(!showFaceGuide)}
                className={`px-2 py-1 rounded-lg border text-[11px] font-medium flex items-center gap-1 transition-colors ${
                  showFaceGuide ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <Eye className="w-3 h-3" />
                <span>Guide</span>
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
                  onClick={() => setScale(s => Math.max(0.3, s - 0.1))}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <input
                  type="range"
                  min="0.3"
                  max="3.5"
                  step="0.02"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-2 bg-slate-900 rounded-lg cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => setScale(s => Math.min(3.5, s + 0.1))}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <button type="button" onClick={() => setScale(0.7)} className="hover:text-slate-300">70%</button>
                <button type="button" onClick={() => setScale(1.0)} className="hover:text-slate-300 font-bold text-cyan-400">100% (Fit)</button>
                <button type="button" onClick={() => setScale(1.4)} className="hover:text-slate-300">140%</button>
                <button type="button" onClick={() => setScale(1.8)} className="hover:text-slate-300">180%</button>
                <button type="button" onClick={() => setScale(2.4)} className="hover:text-slate-300">240%</button>
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
                    min="-250"
                    max="250"
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
                    min="-250"
                    max="250"
                    value={position.y}
                    onChange={(e) => setPosition(p => ({ ...p, y: parseInt(e.target.value) }))}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-900 rounded-lg cursor-pointer"
                  />
                  <span className="w-8 font-mono text-right text-slate-300">{position.y}</span>
                </div>
              </div>
            </div>

            {/* Status Alert Banner */}
            {uploadSuccess && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-2.5 animate-pulse">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-bold text-xs">Upload successful! Headshot published & returning to portal...</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                disabled={saving || uploadSuccess}
                onClick={() => alignPreset('reset')}
                className="px-4 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 font-semibold text-xs transition-colors disabled:opacity-50"
              >
                Reset All
              </button>

              <button
                type="button"
                disabled={saving || uploadSuccess}
                onClick={handleExportAndSave}
                className={`flex-1 py-3 px-5 rounded-xl font-bold text-xs shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                  uploadSuccess
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/25 disabled:opacity-50'
                }`}
              >
                {uploadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    <span>Upload Successful!</span>
                  </>
                ) : saving ? (
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
