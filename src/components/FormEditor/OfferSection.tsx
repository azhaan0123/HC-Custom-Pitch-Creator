import React from 'react';
import { PitchData } from '../../types/pitch';
import { AlertTriangle } from 'lucide-react';

interface OfferSectionProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ data, onChange, errors }) => {
  const charCount = data.offerIntro.body.length;
  const SOFT_CAP = 500;
  const isNearCap = charCount > SOFT_CAP * 0.8 && charCount <= SOFT_CAP;
  const isOverCap = charCount > SOFT_CAP;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">
          Offer Introduction <span className="text-brand-400">*</span>
        </label>
        <div className="flex items-center space-x-2">
          <span
            className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded ${
              isOverCap
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : isNearCap
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-slate-400'
            }`}
          >
            {charCount} / {SOFT_CAP} chars
          </span>
        </div>
      </div>

      <textarea
        rows={4}
        value={data.offerIntro.body}
        onChange={(e) => onChange('offerIntro.body', e.target.value)}
        placeholder="We are a direct primary care practice. That means your employees get a dedicated doctor..."
        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all leading-relaxed custom-scrollbar"
      />

      {isOverCap && (
        <div className="flex items-center space-x-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>This text exceeds the recommended soft cap (~500 chars) and may push content down on Page 1.</span>
        </div>
      )}

      {errors?.['offerIntro.body'] && (
        <p className="text-xs text-red-400">{errors['offerIntro.body']}</p>
      )}
    </div>
  );
};
