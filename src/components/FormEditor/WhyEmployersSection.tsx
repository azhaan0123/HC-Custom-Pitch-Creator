import React from 'react';
import { PitchData } from '../../types/pitch';
import { AlertTriangle } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';

interface WhyEmployersSectionProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const WhyEmployersSection: React.FC<WhyEmployersSectionProps> = ({ data, onChange }) => {
  const charCount = data.whyEmployers.subtext.length;
  const SOFT_CAP = 800;
  const isOverCap = charCount > SOFT_CAP;

  return (
    <div className="space-y-4">
      <div>
        <Label className="flex items-center justify-between mb-1.5">
          <span>Section Title <span className="text-muted-foreground font-normal">(Prefilled default)</span></span>
          <span className="text-[10px] text-muted-foreground font-normal">
            {data.whyEmployers.title.length}/60 chars
          </span>
        </Label>
        <Input
          type="text"
          maxLength={60}
          value={data.whyEmployers.title}
          onChange={(e) => onChange('whyEmployers.title', e.target.value)}
          placeholder="Why employers work with us"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <Label>
            Why Employers Content <span className="text-primary">*</span>
          </Label>
          <Badge
            variant={isOverCap ? 'destructive' : 'outline'}
            className="text-[10px] font-mono"
          >
            {charCount} / {SOFT_CAP} chars
          </Badge>
        </div>

        <Textarea
          rows={6}
          value={data.whyEmployers.subtext}
          onChange={(e) => onChange('whyEmployers.subtext', e.target.value)}
          placeholder="Enter the main paragraphs explaining why employers work with your practice..."
          className="text-xs leading-relaxed custom-scrollbar"
        />
        <p className="text-[10px] text-muted-foreground mt-1">
          Tip: Separate key points with blank lines. The first line of each paragraph will render bold.
        </p>

        {isOverCap && (
          <div className="flex items-center space-x-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2.5 mt-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>This section exceeds the soft cap (~800 chars) and may push content on Page 2 down.</span>
          </div>
        )}
      </div>
    </div>
  );
};
