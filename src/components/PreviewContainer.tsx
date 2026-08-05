import React, { useState } from 'react';
import { PitchData } from '../types/pitch';
import { PitchDocument } from './PitchDocument/PitchDocument';
import { ZoomIn, ZoomOut, Maximize2, ShieldCheck, FileCheck } from 'lucide-react';

interface PreviewContainerProps {
  data: PitchData;
  isValid: boolean;
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({ data, isValid }) => {
  const [scale, setScale] = useState(0.85);

  const zoomIn = () => setScale((s) => Math.min(s + 0.1, 1.25));
  const zoomOut = () => setScale((s) => Math.max(s - 0.1, 0.4));
  const resetZoom = () => setScale(0.85);

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Top Preview Control Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Sync (150ms)</span>
          </div>

          {isValid ? (
            <div className="flex items-center space-x-1 text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Valid Document</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
              <span>Required Fields Pending</span>
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 bg-slate-950 border border-slate-800 rounded-lg p-1">
          <button
            type="button"
            onClick={zoomOut}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono font-medium text-slate-300 px-2 min-w-[45px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={resetZoom}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title="Reset scale"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Document Canvas Viewport */}
      <div className="flex-1 overflow-auto p-8 custom-scrollbar flex justify-center bg-slate-950/80">
        <PitchDocument data={data} scale={scale} />
      </div>
    </div>
  );
};
