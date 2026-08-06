'use client';

import React from 'react';
import { PitchData } from '@/lib/pitch-creator/types';
import { User, Phone, Mail, MapPin, FileText, Globe } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useQRCode } from '@/lib/pitch-creator/qr-generator';
import { ColorPicker } from '../ui/color-picker';
import { cn } from '@/lib/pitch-creator/utils';

interface ContactSectionProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data, onChange }) => {
  const qrColorMode = data.contact.qrColorMode || 'black';
  let qrFillColor = '#111827';
  if (qrColorMode === 'accent') {
    qrFillColor = data.brand.accentColor || '#ef9493';
  } else if (qrColorMode === 'custom') {
    qrFillColor = data.contact.qrCustomColor || '#ef9493';
  }

  const qrTargetUrl = data.contact.websiteUrl || 'https://www.exampledpc.com';
  const qrPreviewSvg = useQRCode(qrTargetUrl, { fillColor: qrFillColor, margin: 2 });

  return (
    <div className="space-y-3">
      <div>
        <Label className="block text-xs mb-1">
          Contact Name &amp; Title <span className="text-primary">*</span>
        </Label>
        <div className="relative">
          <Input
            type="text"
            value={data.contact.nameTitle}
            onChange={(e) => onChange('contact.nameTitle', e.target.value)}
            placeholder="e.g. Jane Doe, MD — Founder"
            className="text-xs pr-8"
          />
          <User className="w-3.5 h-3.5 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="block text-xs mb-1">
            Phone Number <span className="text-primary">*</span>
          </Label>
          <div className="relative">
            <Input
              type="text"
              value={data.contact.phone}
              onChange={(e) => {
                const sanitized = e.target.value.replace(/[^0-9\s\-()+]/g, '');
                onChange('contact.phone', sanitized);
              }}
              placeholder="e.g. (555) 839-2041"
              className="text-xs pr-8"
            />
            <Phone className="w-3.5 h-3.5 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        <div>
          <Label className="block text-xs mb-1">
            Email Address <span className="text-primary">*</span>
          </Label>
          <div className="relative">
            <Input
              type="email"
              value={data.contact.email}
              onChange={(e) => onChange('contact.email', e.target.value)}
              placeholder="care@practice.com"
              className="text-xs pr-8"
            />
            <Mail className="w-3.5 h-3.5 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <Label className="block text-xs mb-1">
          Office Location / Address <span className="text-primary">*</span>
        </Label>
        <div className="relative">
          <Input
            type="text"
            value={data.contact.address}
            onChange={(e) => onChange('contact.address', e.target.value)}
            placeholder="e.g. 104 Health Science Pkwy, Suite 200, Austin, TX"
            className="text-xs pr-8"
          />
          <MapPin className="w-3.5 h-3.5 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Website URL & QR Code Configuration */}
      <div className="bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg p-3 space-y-3">
        <div>
          <Label className="block text-xs mb-1">
            Website URL <span className="text-muted-foreground font-normal">(Used for QR code)</span>
          </Label>
          <div className="relative">
            <Input
              type="text"
              value={data.contact.websiteUrl}
              onChange={(e) => onChange('contact.websiteUrl', e.target.value)}
              placeholder="https://www.yourpractice.com"
              className="text-xs pr-8 font-mono"
            />
            <Globe className="w-3.5 h-3.5 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* QR Code Color Mode Selector: Black | Accent Color | Custom */}
        <div className="space-y-1.5 pt-1 border-t border-[#DFE1E6]/70">
          <Label className="block text-xs text-[#172B4D]">
            QR Code Color
          </Label>

          <div className="flex items-center bg-[#EBECF0]/80 p-0.5 rounded-lg border border-[#DFE1E6] w-full">
            <button
              type="button"
              onClick={() => onChange('contact.qrColorMode', 'black')}
              className={cn(
                "flex-1 text-center py-1 text-xs font-semibold rounded-md transition-all",
                qrColorMode === 'black'
                  ? "bg-white text-[#172B4D] shadow-2xs border border-[#DFE1E6]"
                  : "text-[#6B778C] hover:text-[#172B4D]"
              )}
            >
              Black
            </button>
            <button
              type="button"
              onClick={() => onChange('contact.qrColorMode', 'accent')}
              className={cn(
                "flex-1 text-center py-1 text-xs font-semibold rounded-md transition-all",
                qrColorMode === 'accent'
                  ? "bg-white text-[#172B4D] shadow-2xs border border-[#DFE1E6]"
                  : "text-[#6B778C] hover:text-[#172B4D]"
              )}
            >
              Accent Color
            </button>
            <button
              type="button"
              onClick={() => onChange('contact.qrColorMode', 'custom')}
              className={cn(
                "flex-1 text-center py-1 text-xs font-semibold rounded-md transition-all",
                qrColorMode === 'custom'
                  ? "bg-white text-[#172B4D] shadow-2xs border border-[#DFE1E6]"
                  : "text-[#6B778C] hover:text-[#172B4D]"
              )}
            >
              Custom
            </button>
          </div>
        </div>

        {/* Custom ColorPicker if 'custom' is selected */}
        {qrColorMode === 'custom' && (
          <div className="pt-1">
            <Label className="block text-[11px] text-[#6B778C] mb-1">Custom QR Fill Color:</Label>
            <ColorPicker
              color={data.contact.qrCustomColor || '#ef9493'}
              onChange={(newColor) => onChange('contact.qrCustomColor', newColor)}
            />
          </div>
        )}

        {/* Simple Live Thumbnail & "QR Code Generated" Label */}
        {qrPreviewSvg && (
          <div className="flex items-center space-x-3 bg-white border border-[#DFE1E6] rounded-lg p-2.5">
            <div
              className="w-12 h-12 bg-white p-1 rounded-md border border-[#DFE1E6] shrink-0 shadow-2xs overflow-hidden flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: qrPreviewSvg }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#172B4D]">QR Code Generated</p>
              <p className="text-[10px] text-[#6B778C] truncate font-mono mt-0.5">
                {data.contact.websiteUrl || 'https://www.exampledpc.com'}
              </p>
            </div>
          </div>
        )}
      </div>

      <div>
        <Label className="block text-xs mb-1">
          Contract Commitment Clause <span className="text-primary">*</span>
        </Label>
        <div className="relative">
          <Input
            type="text"
            value={data.contact.contractTerms}
            onChange={(e) => onChange('contact.contractTerms', e.target.value)}
            placeholder="e.g. 12-month agreement with a 60-day cancellation clause"
            className="text-xs pr-8"
          />
          <FileText className="w-3.5 h-3.5 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">
          Replaces the FAQ bracketed prompt [Insert your contract terms...] in the exported document.
        </p>
      </div>
    </div>
  );
};
