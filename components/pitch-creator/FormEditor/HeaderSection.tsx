'use client';

import React, { useRef } from 'react';
import { PitchData } from '@/lib/pitch-creator/types';
import { Building2, Upload, X, Palette } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { ColorPicker } from '../ui/color-picker';

interface HeaderSectionProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ data, onChange, errors }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size exceeds 5 MB limit.');
      return;
    }

    if (!['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type)) {
      alert('Please upload a PNG, JPG, or SVG image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onChange('brand.logoUrl', base64);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onChange('brand.logoUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const currentColor = data.brand.accentColor || '#ef9493';

  return (
    <div className="space-y-4">
      {/* Practice Name */}
      <div>
        <Label className="flex items-center justify-between mb-1.5">
          <span>Practice Name <span className="text-primary">*</span></span>
          <span className="text-[10px] text-muted-foreground font-normal">
            {data.brand.practiceName.length}/60 chars
          </span>
        </Label>
        <div className="relative">
          <Input
            type="text"
            maxLength={60}
            value={data.brand.practiceName}
            onChange={(e) => onChange('brand.practiceName', e.target.value)}
            placeholder="e.g. Example Direct Primary Care"
          />
          <Building2 className="w-4 h-4 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
        </div>
        {errors?.['brand.practiceName'] && (
          <p className="text-xs text-destructive mt-1">{errors['brand.practiceName']}</p>
        )}
      </div>

      {/* Brand Accent Color Selector with Custom Popover UI */}
      <div>
        <Label className="flex items-center justify-between mb-1.5">
          <span className="flex items-center space-x-1.5">
            <Palette className="w-3.5 h-3.5 text-primary" />
            <span>Document Accent Color</span>
          </span>
          <span className="text-[10px] text-[#6B778C] font-normal">
            Pitch theme highlight
          </span>
        </Label>

        <ColorPicker
          color={currentColor}
          onChange={(newColor) => onChange('brand.accentColor', newColor)}
        />
      </div>

      {/* Practice Logo */}
      <div>
        <Label className="mb-1.5">
          Practice Logo <span className="text-muted-foreground font-normal">(Optional, PNG/JPG/SVG ≤ 5MB)</span>
        </Label>

        {data.brand.logoUrl ? (
          <div className="flex items-center space-x-3 bg-card border border-border rounded-lg p-2.5">
            <div className="w-16 h-10 bg-white rounded flex items-center justify-center p-1 overflow-hidden border border-border">
              <img
                src={data.brand.logoUrl}
                alt="Logo preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">Logo Uploaded</p>
              <p className="text-[10px] text-muted-foreground">Renders top-left of Page 1</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={removeLogo}
              className="text-muted-foreground hover:text-destructive"
              title="Remove logo"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border hover:border-primary bg-muted/30 hover:bg-muted/50 rounded-lg p-4 text-center cursor-pointer transition-all group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-muted group-hover:bg-primary/20 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                <Upload className="w-4 h-4" />
              </div>
              <p className="text-xs font-medium text-foreground group-hover:text-foreground">
                Click to upload logo
              </p>
              <p className="text-[10px] text-muted-foreground">
                Falls back to styled Practice Name text if empty
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
