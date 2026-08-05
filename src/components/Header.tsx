import React from 'react';
import { ViewMode } from '../types/pitch';
import { Download, RefreshCw, Sparkles, Columns, Edit3, Eye, ShieldCheck } from 'lucide-react';

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
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Health Compiler Platform Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-500/20">
            HC
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-slate-100 tracking-tight">
                DPC Pitch Builder
              </h1>
              <span className="bg-brand-500/10 text-brand-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-brand-500/20">
                v1.0 Form-to-PDF
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Health Compiler Employer Pitch Generator
            </p>
          </div>
        </div>

        {/* Center: View Switcher (Desktop & Mobile) */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`hidden md:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'split'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('editor')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'editor'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Form Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'preview'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>
        </div>

        {/* Right: Presets & Sticky Export Button */}
        <div className="flex items-center space-x-2">
          {/* Sample preset dropdown */}
          <div className="hidden lg:flex items-center space-x-1.5 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Sample:</span>
            <button
              type="button"
              onClick={() => onLoadPreset('default')}
              className="text-slate-300 hover:text-brand-400 font-medium transition-colors"
            >
              Riverside
            </button>
            <span className="text-slate-700">|</span>
            <button
              type="button"
              onClick={() => onLoadPreset('metro')}
              className="text-slate-300 hover:text-brand-400 font-medium transition-colors"
            >
              Apex DPC
            </button>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset to default"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Export PDF Button */}
          <button
            type="button"
            onClick={onExport}
            disabled={!isValid || isExporting}
            className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold rounded-lg shadow-lg transition-all ${
              isValid && !isExporting
                ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-brand-500/25 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
            title={!isValid ? 'Please fill out all required fields to export' : 'Export print-ready PDF'}
          >
            {isExporting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Exporting PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
