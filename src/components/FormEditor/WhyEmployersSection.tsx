import React from 'react';
import { PitchData } from '../../types/pitch';
import { AlertTriangle } from 'lucide-react';

interface WhyEmployersSectionProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const WhyEmployersSection: React.FC<WhyEmployersSectionProps> = ({ data, onChange, errors }) => {
  const charCount = data.whyEmployers.subtext.length;
  const SOFT_CAP = 800;
  const isOverCap = charCount > SOFT_CAP;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
          <span>Section Title <span className="text-slate-500 font-normal">(Prefilled default)</span></span>
          <span className="text-[10px] text-slate-400 font-normal">
            {data.whyEmployers.title.length}/60 chars
          </span>
        </label>
        <input
          type="text"
          maxLength={60}
          value={data.whyEmployers.title}
          onChange={(e) => onChange('whyEmployers.title', e.target.value)}
          placeholder="Why employers work with us"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-slate-300">
            Why Employers Content <span className="text-brand-400">*</span>
          </label>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
              isOverCap
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'text-slate-400'
            }`}
          >
            {charCount} / {SOFT_CAP} chars
          </span>
        </div>

        <textarea
          rows={6}
          value={data.whyEmployers.subtext}
          onChange={(e) => onChange('whyEmployers.subtext', e.target.value)}
          placeholder="Enter the main paragraphs explaining why employers work with your practice..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all leading-relaxed custom-scrollbar"
        />
        <p className="text-[10px] text-slate-500 mt-1">
          Tip: Separate key points with blank lines. The first line of each paragraph will render bold.
        </p>

        {isOverCap && (
          <div className="flex items-center space-x-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 mt-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>This section exceeds the soft cap (~800 chars) and may push content on Page 2 down.</span>
          </div>
        )}
      </div>
    </div>
  );
};
