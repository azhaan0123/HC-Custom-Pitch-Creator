import React from 'react';
import { HelpCircle, ExternalLink } from 'lucide-react';

export const WebsiteHeader: React.FC = () => {
  return (
    <header className="shrink-0 bg-white border-b border-[#DFE1E6] px-4 md:px-6 h-13 flex items-center justify-between z-30 shadow-[0_1px_3px_rgba(9,30,66,0.04)]">
      {/* Left: HealthCompiler Platform Branding */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2.5 cursor-pointer">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary via-[#ef9493] to-orange-400 flex items-center justify-center text-foreground font-bold text-xs shadow-2xs tracking-tight">
            HC
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-[#172B4D] tracking-tight">
              HealthCompiler
            </span>
            <span className="bg-[#EAE6FF] text-[#403294] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block">
              Platform
            </span>
          </div>
        </div>

        {/* Website Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium text-[#6B778C]">
          <span className="px-3 py-1 text-[#172B4D] font-semibold bg-[#FAFBFC] rounded-md border border-[#DFE1E6]">
            Pitch Creator
          </span>
          <a href="#templates" className="px-3 py-1 hover:text-[#172B4D] transition-colors rounded-md hover:bg-[#FAFBFC]">
            Templates
          </a>
          <a href="#analytics" className="px-3 py-1 hover:text-[#172B4D] transition-colors rounded-md hover:bg-[#FAFBFC]">
            Employer Analytics
          </a>
          <a href="#docs" className="px-3 py-1 hover:text-[#172B4D] transition-colors rounded-md hover:bg-[#FAFBFC] flex items-center space-x-1">
            <span>Docs</span>
            <ExternalLink className="w-3 h-3 text-[#A5ADBA]" />
          </a>
        </nav>
      </div>

      {/* Right: Account & System Status */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          className="hidden sm:flex items-center space-x-1.5 text-xs text-[#6B778C] hover:text-[#172B4D] px-2.5 py-1 rounded-md transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Support</span>
        </button>

        <div className="h-4 w-px bg-[#DFE1E6] hidden sm:block" />

        <div className="flex items-center space-x-2 bg-[#FAFBFC] border border-[#DFE1E6] px-2.5 py-1 rounded-full shadow-2xs">
          <div className="w-5 h-5 rounded-full bg-primary/20 text-[#172B4D] flex items-center justify-center font-bold text-[10px]">
            JD
          </div>
          <span className="text-xs font-semibold text-[#172B4D] hidden sm:inline-block">
            Jane Doe
          </span>
          <span className="bg-[#E3FCEF] text-[#006644] text-[9px] font-bold px-1.5 py-0.2 rounded-full">
            DPC Pro
          </span>
        </div>
      </div>
    </header>
  );
};
