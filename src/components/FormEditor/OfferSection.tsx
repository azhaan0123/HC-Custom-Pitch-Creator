import React from 'react';
import { PitchData } from '../../types/pitch';
import { AlertTriangle } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';

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
        <Label>
          Offer Introduction <span className="text-primary">*</span>
        </Label>
        <Badge
          variant={isOverCap ? 'destructive' : isNearCap ? 'warning' : 'outline'}
          className="text-[10px] font-mono"
        >
          {charCount} / {SOFT_CAP} chars
        </Badge>
      </div>

      <Textarea
        rows={4}
        value={data.offerIntro.body}
        onChange={(e) => onChange('offerIntro.body', e.target.value)}
        placeholder="We are a direct primary care practice. That means your employees get a dedicated doctor..."
        className="leading-relaxed custom-scrollbar"
      />

      {isOverCap && (
        <div className="flex items-center space-x-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>This text exceeds the recommended soft cap (~500 chars) and may push content down on Page 1.</span>
        </div>
      )}

      {errors?.['offerIntro.body'] && (
        <p className="text-xs text-destructive">{errors['offerIntro.body']}</p>
      )}
    </div>
  );
};
