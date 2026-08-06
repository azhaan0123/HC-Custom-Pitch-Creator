'use client';

import React, { useState } from 'react';
import { ViewMode } from '@/lib/pitch-creator/types';
import { Download, Columns, Edit3, Eye, RotateCcw, AlertCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { cn } from '@/lib/pitch-creator/utils';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onExport: () => void;
  isExporting: boolean;
  isValid: boolean;
  pendingReasons?: string[];
  onLoadPreset: (key: string) => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onExport,
  isExporting,
  isValid,
  pendingReasons = [],
  onLoadPreset,
  onReset,
}) => {
  const [showPendingModal, setShowPendingModal] = useState(false);

  const handleExportBtnClick = (e: React.MouseEvent) => {
    if (!isValid) {
      e.preventDefault();
      setShowPendingModal(true);
    } else {
      onExport();
    }
  };

  return (
    <>
      <div className="shrink-0 bg-white border border-[#DFE1E6] rounded-xl p-3 mb-4 shadow-[0_2px_8px_rgba(9,30,66,0.06)] flex items-center justify-between">
        {/* Left: Pitch Builder Logo */}
        <div className="flex items-center">
          <img
            src="/PB-Logo.svg"
            alt="Pitch Builder Logo"
            className="h-6 md:h-7 w-auto object-contain"
          />
        </div>

        {/* Center: View Switcher */}
        <div className="flex items-center bg-[#EBECF0]/80 p-0.5 rounded-lg border border-[#DFE1E6]">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={cn(
              "hidden md:flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all duration-150",
              viewMode === 'split'
                ? 'bg-white text-[#172B4D] shadow-2xs border border-[#DFE1E6]'
                : 'text-[#6B778C] hover:text-[#172B4D]'
            )}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('editor')}
            className={cn(
              "flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all duration-150",
              viewMode === 'editor'
                ? 'bg-white text-[#172B4D] shadow-2xs border border-[#DFE1E6]'
                : 'text-[#6B778C] hover:text-[#172B4D]'
            )}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Form Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={cn(
              "flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all duration-150",
              viewMode === 'preview'
                ? 'bg-white text-[#172B4D] shadow-2xs border border-[#DFE1E6]'
                : 'text-[#6B778C] hover:text-[#172B4D]'
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>

        {/* Right Actions: Presets, Reset & Export */}
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onLoadPreset('default')}
            className="hidden lg:flex items-center h-8 px-2.5 text-xs font-medium text-[#172B4D] bg-[#FAFBFC] hover:bg-[#EBECF0] border-[#DFE1E6]"
            title="Load sample preset data"
          >
            <span>Sample Data</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onReset}
            className="hidden lg:flex items-center space-x-1.5 h-8 px-2.5 text-xs font-medium text-[#172B4D] bg-[#FAFBFC] hover:bg-[#EBECF0] border-[#DFE1E6]"
            title="Clear all fields"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#6B778C]" />
            <span>Reset</span>
          </Button>

          {/* Export PDF Button with Tooltip / Popup message when greyed out */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span tabIndex={0} onClick={handleExportBtnClick} className="inline-block cursor-pointer">
                <Button
                  type="button"
                  disabled={!isValid || isExporting}
                  className={cn(
                    "flex items-center space-x-2 px-3.5 py-1.5 h-8 text-xs font-semibold rounded-md shadow-2xs transition-all pointer-events-auto",
                    isValid && !isExporting
                      ? 'bg-[#FE5F1F] hover:bg-[#E04F13] text-white border border-[#E04F13] shadow-xs active:scale-[0.98]'
                      : 'bg-[#F4F5F7] text-[#A5ADBA] border border-[#DFE1E6]'
                  )}
                >
                  {isExporting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Exporting PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Export PDF</span>
                    </>
                  )}
                </Button>
              </span>
            </TooltipTrigger>

            {!isValid && (
              <TooltipContent side="bottom" align="end" className="p-3 max-w-xs bg-[#1E293B] text-white border border-slate-700 shadow-xl rounded-xl">
                <div className="space-y-1.5 text-xs">
                  <p className="font-bold text-amber-400 flex items-center space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Cannot export PDF yet</span>
                  </p>
                  <p className="text-[11px] text-slate-300">Click button or fill out these pending required fields:</p>
                  <ul className="list-disc pl-4 text-[11px] text-slate-200 space-y-0.5 font-medium">
                    {pendingReasons.slice(0, 5).map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                    {pendingReasons.length > 5 && (
                      <li className="italic text-slate-400">+{pendingReasons.length - 5} more fields</li>
                    )}
                  </ul>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>

      {/* Pending Reasons Modal Popup (Shown on Click when greyed out) */}
      {showPendingModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in-0 duration-150">
          <div className="absolute inset-0" onClick={() => setShowPendingModal(false)} />
          <div className="relative w-full max-w-md bg-white border border-[#DFE1E6] rounded-2xl shadow-2xl p-6 z-10 animate-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setShowPendingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#172B4D]">Cannot Export PDF Yet</h3>
                <p className="text-xs text-[#6B778C] mt-0.5">
                  Please complete the following required fields to enable export:
                </p>
              </div>
            </div>

            <div className="bg-[#FAFBFC] border border-[#DFE1E6] rounded-xl p-3.5 mb-5 max-h-48 overflow-y-auto custom-scrollbar">
              <ul className="space-y-1.5 text-xs font-medium text-[#172B4D]">
                {pendingReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              type="button"
              onClick={() => setShowPendingModal(false)}
              className="w-full bg-[#172B4D] hover:bg-[#091E42] text-white text-xs font-semibold h-10 rounded-xl"
            >
              Got it, complete form
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
