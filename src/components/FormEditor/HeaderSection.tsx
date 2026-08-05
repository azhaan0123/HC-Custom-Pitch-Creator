import React, { useRef } from 'react';
import { PitchData } from '../../types/pitch';
import { Building2, Upload, X, Image as ImageIcon } from 'lucide-react';

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

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
          <span>Practice Name <span className="text-brand-400">*</span></span>
          <span className="text-[10px] text-slate-400 font-normal">
            {data.brand.practiceName.length}/60 chars
          </span>
        </label>
        <div className="relative">
          <input
            type="text"
            maxLength={60}
            value={data.brand.practiceName}
            onChange={(e) => onChange('brand.practiceName', e.target.value)}
            placeholder="e.g. Riverside Direct Primary Care"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
          />
          <Building2 className="w-4 h-4 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
        </div>
        {errors?.['brand.practiceName'] && (
          <p className="text-xs text-red-400 mt-1">{errors['brand.practiceName']}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5">
          Practice Logo <span className="text-slate-500 font-normal">(Optional, PNG/JPG/SVG ≤ 5MB)</span>
        </label>

        {data.brand.logoUrl ? (
          <div className="flex items-center space-x-3 bg-slate-900 border border-slate-700 rounded-lg p-2.5">
            <div className="w-16 h-10 bg-white rounded flex items-center justify-center p-1 overflow-hidden border border-slate-700">
              <img
                src={data.brand.logoUrl}
                alt="Logo preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-200 truncate">Logo Uploaded</p>
              <p className="text-[10px] text-slate-400">Renders top-left of Page 1</p>
            </div>
            <button
              type="button"
              onClick={removeLogo}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-slate-800 transition-colors"
              title="Remove logo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-brand-500 bg-slate-900/50 hover:bg-slate-900 rounded-lg p-4 text-center cursor-pointer transition-all group"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-brand-500/20 flex items-center justify-center text-slate-400 group-hover:text-brand-400 transition-colors">
                <Upload className="w-4 h-4" />
              </div>
              <p className="text-xs font-medium text-slate-300 group-hover:text-white">
                Click to upload logo
              </p>
              <p className="text-[10px] text-slate-500">
                Falls back to styled Practice Name text if empty
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
