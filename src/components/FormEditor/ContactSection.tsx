import React from 'react';
import { PitchData } from '../../types/pitch';
import { User, Phone, Mail, MapPin, FileText, Globe } from 'lucide-react';

interface ContactSectionProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data, onChange, errors }) => {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">
          Contact Name &amp; Title <span className="text-brand-400">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.contact.nameTitle}
            onChange={(e) => onChange('contact.nameTitle', e.target.value)}
            placeholder="e.g. Dr. Sarah Jenkins, MD — Founder"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <User className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Phone Number <span className="text-brand-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.contact.phone}
              onChange={(e) => onChange('contact.phone', e.target.value)}
              placeholder="e.g. (555) 839-2041"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Phone className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Email Address <span className="text-brand-400">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={data.contact.email}
              onChange={(e) => onChange('contact.email', e.target.value)}
              placeholder="care@practice.com"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Mail className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">
          Office Location / Address <span className="text-brand-400">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.contact.address}
            onChange={(e) => onChange('contact.address', e.target.value)}
            placeholder="e.g. 104 Health Science Pkwy, Suite 200, Austin, TX"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <MapPin className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">
          Website URL <span className="text-slate-500 font-normal">(Used for QR code)</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.contact.websiteUrl}
            onChange={(e) => onChange('contact.websiteUrl', e.target.value)}
            placeholder="https://www.yourpractice.com"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <Globe className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">
          Contract Commitment Clause <span className="text-brand-400">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={data.contact.contractTerms}
            onChange={(e) => onChange('contact.contractTerms', e.target.value)}
            placeholder="e.g. 12-month agreement with a 60-day cancellation clause"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <FileText className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-2.5 pointer-events-none" />
        </div>
        <p className="text-[10px] text-slate-500 mt-1">
          Replaces the FAQ bracketed prompt [Insert your contract terms...] in the exported document.
        </p>
      </div>
    </div>
  );
};
