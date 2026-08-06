'use client';

import React, { useState, useEffect } from 'react';
import { PitchData, ViewMode } from '@/lib/pitch-creator/types';
import { PitchDocument } from './PitchDocument/PitchDocument';
import { ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/pitch-creator/utils';

interface PreviewContainerProps {
  data: PitchData;
  isValid: boolean;
  viewMode?: ViewMode;
  onTogglePreviewMode?: () => void;
}

export const PreviewContainer: React.FC<PreviewContainerProps> = ({
  data,
  viewMode = 'split',
  onTogglePreviewMode,
}) => {
  const isPreviewOnly = viewMode === 'preview';
  const [scale, setScale] = useState(isPreviewOnly ? 0.7 : 0.85);

  // Auto-adjust scale when toggling between split view and full preview mode
  useEffect(() => {
    if (viewMode === 'preview') {
      setScale(0.7);
    } else {
      setScale(0.85);
    }
  }, [viewMode]);

  const zoomIn = () => setScale((s) => Math.min(s + 0.1, 1.25));
  const zoomOut = () => setScale((s) => Math.max(s - 0.1, 0.4));
  const resetZoom = () => setScale(isPreviewOnly ? 0.7 : 0.85);

  return (
    <div className="flex flex-col h-full w-full min-h-0 bg-white rounded-xl border border-[#DFE1E6] overflow-hidden shadow-[0_1px_3px_rgba(9,30,66,0.06)]">
      {/* Top Preview Control Bar */}
      <div className="shrink-0 bg-white border-b border-[#DFE1E6] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-[#172B4D] tracking-tight">
            Document Canvas Preview
          </span>
          <span className="bg-[#EAE6FF] text-[#403294] text-[10px] font-bold px-2 py-0.5 rounded-full">
            {isPreviewOnly ? 'Full Page Side-by-Side' : 'Print Ready'}
          </span>
        </div>

        {/* Zoom Controls & Fullscreen Mode Toggle */}
        <div className="flex items-center space-x-1 bg-[#EBECF0]/80 border border-[#DFE1E6] rounded-lg p-0.5 shadow-2xs">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            className="h-6 w-6 text-[#6B778C] hover:text-[#172B4D] hover:bg-white rounded-md"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <span className="text-[11px] font-mono font-semibold text-[#172B4D] px-2 min-w-[44px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            className="h-6 w-6 text-[#6B778C] hover:text-[#172B4D] hover:bg-white rounded-md"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>

          {/* Fullscreen Mode Toggle Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onTogglePreviewMode}
            className={cn(
              "h-6 w-6 rounded-md transition-colors",
              isPreviewOnly
                ? "bg-white text-primary shadow-2xs border border-[#DFE1E6]"
                : "text-[#6B778C] hover:text-[#172B4D] hover:bg-white"
            )}
            title={isPreviewOnly ? "Exit Full Preview (Return to Split View)" : "Full Preview Mode (Side-by-side pages)"}
          >
            {isPreviewOnly ? (
              <Minimize2 className="w-3.5 h-3.5 text-primary" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Main Document Canvas Viewport */}
      <div className="flex-1 min-h-0 overflow-auto p-6 md:p-8 custom-scrollbar flex justify-center items-start bg-atlassian-grid">
        <PitchDocument data={data} scale={scale} isSideBySide={isPreviewOnly} />
      </div>
    </div>
  );
};
