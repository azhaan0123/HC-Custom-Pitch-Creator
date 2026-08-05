import React from 'react';
import { ViewMode } from '../types/pitch';
import { Download, Columns, Edit3, Eye, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onExport: () => void;
  isExporting: boolean;
  isValid: boolean;
  onLoadPreset: (key: string) => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onExport,
  isExporting,
  isValid,
  onLoadPreset,
  onReset,
}) => {
  return (
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

        <Button
          type="button"
          onClick={onExport}
          disabled={!isValid || isExporting}
          className={cn(
            "flex items-center space-x-2 px-3.5 py-1.5 h-8 text-xs font-semibold rounded-md shadow-2xs transition-all active:scale-[0.98]",
            isValid && !isExporting
              ? 'bg-[#FE5F1F] hover:bg-[#E04F13] text-white border border-[#E04F13] shadow-xs'
              : 'bg-[#F4F5F7] text-[#A5ADBA] cursor-not-allowed border border-[#DFE1E6]'
          )}
          title={!isValid ? 'Please fill out all required fields to export' : 'Export print-ready PDF'}
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
      </div>
    </div>
  );
};
