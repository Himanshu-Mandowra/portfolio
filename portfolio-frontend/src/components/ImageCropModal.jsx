import React, { useEffect, useRef, useState } from "react";
import { soundEngine } from "../utils/soundEngine";

const ASPECT_PRESETS = [
  { label: "16:10 (CARD)", ratio: 16 / 10, width: 800, height: 500 },
  { label: "16:9 (WIDE)", ratio: 16 / 9, width: 800, height: 450 },
  { label: "4:3 (DOSSIER)", ratio: 4 / 3, width: 800, height: 600 },
  { label: "1:1 (SQUARE)", ratio: 1, width: 600, height: 600 },
];

function ImageCropModal({ imageSrc, onCancel, onApplyCrop }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const [preset, setPreset] = useState(ASPECT_PRESETS[0]);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [tacticalFilter, setTacticalFilter] = useState(false);
  const [loadError, setLoadError] = useState("");

  // Load image into an offscreen HTMLImageElement
  useEffect(() => {
    if (!imageSrc) return;
    setLoadError("");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      setZoom(1);
      setRotation(0);
      setOffset({ x: 0, y: 0 });
      drawCanvas(img, preset, 1, 0, { x: 0, y: 0 }, tacticalFilter);
    };
    img.onerror = () => {
      setLoadError(
        "External URL blocks cross-origin canvas cropping. Upload a file from your device or use this URL directly."
      );
    };
    img.src = imageSrc;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSrc]);

  const drawCanvas = (
    img = imgRef.current,
    currentPreset = preset,
    currentZoom = zoom,
    currentRotation = rotation,
    currentOffset = offset,
    currentFilter = tacticalFilter
  ) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");

    canvas.width = currentPreset.width;
    canvas.height = currentPreset.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#060609";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    if (currentFilter) {
      ctx.filter = "contrast(1.12) brightness(0.92) saturate(0.88)";
    }

    // Move origin to center of canvas + user pan offset
    ctx.translate(
      canvas.width / 2 + currentOffset.x,
      canvas.height / 2 + currentOffset.y
    );
    ctx.rotate((currentRotation * Math.PI) / 180);

    // Base cover scale so image fills the canvas at zoom = 1
    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const baseScale = Math.max(scaleX, scaleY) * currentZoom;

    const drawW = img.width * baseScale;
    const drawH = img.height * baseScale;

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Subtle rule-of-thirds tactical grid lines on preview
    ctx.save();
    ctx.strokeStyle = "rgba(220, 38, 38, 0.28)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 3, 0);
    ctx.lineTo(canvas.width / 3, canvas.height);
    ctx.moveTo((canvas.width * 2) / 3, 0);
    ctx.lineTo((canvas.width * 2) / 3, canvas.height);
    ctx.moveTo(0, canvas.height / 3);
    ctx.lineTo(canvas.width, canvas.height / 3);
    ctx.moveTo(0, (canvas.height * 2) / 3);
    ctx.lineTo(canvas.width, (canvas.height * 2) / 3);
    ctx.stroke();
    ctx.restore();
  };

  useEffect(() => {
    if (imgRef.current) {
      drawCanvas(imgRef.current, preset, zoom, rotation, offset, tacticalFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset, zoom, rotation, offset, tacticalFilter]);

  const handlePointerDown = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragging(true);
    setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  const handleExportCrop = () => {
    soundEngine.playClick();
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) {
      onApplyCrop(imageSrc);
      return;
    }

    // Re-render cleanly without the red rule-of-thirds overlay lines before exporting!
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#060609";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    if (tacticalFilter) {
      ctx.filter = "contrast(1.12) brightness(0.92) saturate(0.88)";
    }
    ctx.translate(canvas.width / 2 + offset.x, canvas.height / 2 + offset.y);
    ctx.rotate((rotation * Math.PI) / 180);

    const scaleX = canvas.width / img.width;
    const scaleY = canvas.height / img.height;
    const baseScale = Math.max(scaleX, scaleY) * zoom;

    const drawW = img.width * baseScale;
    const drawH = img.height * baseScale;
    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    try {
      const croppedDataUrl = canvas.toDataURL("image/jpeg", 0.88);
      onApplyCrop(croppedDataUrl);
    } catch (err) {
      onApplyCrop(imageSrc);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9800] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      onMouseUp={handlePointerUp}
      onTouchEnd={handlePointerUp}
    >
      <div className="re-clip-card max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-red-600/70 bg-[#08080d] p-6 text-[#ece7df] shadow-[0_0_90px_rgba(220,38,38,0.3)] sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-[0.24em] text-red-500">
              UMBRELLA OPTICAL CALIBRATION // IMAGE CROPPER
            </div>
            <h3 className="mt-1 font-requiem text-2xl font-bold uppercase tracking-[0.08em] text-white">
              CROP &amp; FRAME EVIDENCE IMAGE
            </h3>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="border border-white/20 bg-white/5 px-3 py-1.5 font-mono-tech text-xs uppercase tracking-widest text-stone-300 hover:border-red-500 hover:text-white"
          >
            CANCEL [X]
          </button>
        </div>

        {loadError ? (
          <div className="mt-5 border border-amber-500/40 bg-amber-950/30 p-4 font-mono-tech text-xs text-amber-200">
            {loadError}
          </div>
        ) : (
          <>
            {/* Interactive Canvas Viewport */}
            <div className="mt-5 flex flex-col items-center">
              <div className="mb-2 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-stone-400">
                DRAG IMAGE TO REPOSITION // USE CONTROLS BELOW TO ZOOM &amp; ROTATE
              </div>
              <div className="relative flex max-h-[360px] w-full items-center justify-center overflow-hidden border border-red-800/60 bg-black p-2">
                <canvas
                  ref={canvasRef}
                  onMouseDown={handlePointerDown}
                  onMouseMove={handlePointerMove}
                  onTouchStart={handlePointerDown}
                  onTouchMove={handlePointerMove}
                  className="max-h-[330px] w-auto max-w-full cursor-move select-none border border-white/15"
                />
              </div>
            </div>

            {/* Aspect Ratio Presets */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block font-mono-tech text-xs uppercase tracking-[0.18em] text-stone-400">
                  ASPECT RATIO PRESET
                </label>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {ASPECT_PRESETS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setPreset(item)}
                      className={`border px-2.5 py-1.5 font-mono-tech text-[11px] uppercase tracking-wider transition ${
                        preset.label === item.label
                          ? "border-red-500 bg-red-600 text-white"
                          : "border-white/15 bg-white/5 text-stone-300 hover:border-red-500"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zoom Slider */}
              <div>
                <div className="flex justify-between font-mono-tech text-xs uppercase tracking-[0.18em] text-stone-400">
                  <span>OPTICAL ZOOM</span>
                  <span className="text-red-400">{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="mt-3 w-full accent-red-600"
                />
              </div>
            </div>

            {/* Rotation & Filter Controls */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRotation((r) => (r - 90) % 360)}
                  className="border border-white/15 bg-white/5 px-3 py-1.5 font-mono-tech text-xs uppercase tracking-wider text-stone-200 hover:border-red-500"
                >
                  ⟲ ROTATE -90°
                </button>
                <button
                  type="button"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="border border-white/15 bg-white/5 px-3 py-1.5 font-mono-tech text-xs uppercase tracking-wider text-stone-200 hover:border-red-500"
                >
                  ROTATE +90° ⟳
                </button>
                <button
                  type="button"
                  onClick={() => setTacticalFilter((f) => !f)}
                  className={`border px-3 py-1.5 font-mono-tech text-xs uppercase tracking-wider ${
                    tacticalFilter
                      ? "border-red-500 bg-red-950/50 text-red-300"
                      : "border-white/15 bg-white/5 text-stone-300"
                  }`}
                >
                  {tacticalFilter ? "REQUIEM LUT: ON" : "REQUIEM LUT: OFF"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(1);
                    setRotation(0);
                    setOffset({ x: 0, y: 0 });
                  }}
                  className="border border-white/15 bg-white/5 px-3 py-1.5 font-mono-tech text-xs uppercase tracking-wider text-stone-400 hover:text-white"
                >
                  RESET
                </button>
              </div>

              <button
                type="button"
                onClick={handleExportCrop}
                className="re-clip-btn border border-red-500 bg-red-600 px-6 py-2.5 font-mono-tech text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:bg-red-500"
              >
                ✓ APPLY CROPPED IMAGE
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ImageCropModal;
