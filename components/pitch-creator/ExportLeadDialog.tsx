'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, User, Mail, Download, ShieldCheck } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { cn } from '@/lib/pitch-creator/utils';

interface ExportLeadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string) => void;
  isExporting: boolean;
}

export const ExportLeadDialog: React.FC<ExportLeadDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isExporting,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  // Reset errors when modal opens
  useEffect(() => {
    if (isOpen) {
      setNameError('');
      setEmailError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    let valid = true;

    if (!name.trim() || name.trim().length < 2) {
      setNameError('Please enter your full name (at least 2 characters).');
      valid = false;
    } else {
      setNameError('');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(name.trim(), email.trim());
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in-0 duration-200">
      {/* Backdrop overlay dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-[520px] bg-white border border-[#DFE1E6] rounded-2xl shadow-[0_24px_60px_rgba(9,30,66,0.25)] p-7 md:p-8 z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isExporting}
          className="absolute top-5 right-5 text-[#6B778C] hover:text-[#172B4D] p-1.5 rounded-lg hover:bg-[#EBECF0] transition-colors"
          title="Close dialog"
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 shadow-2xs">
            <Download className="w-5.5 h-5.5 text-[#FE5F1F]" />
          </div>
          <div className="pr-6">
            <h2 className="text-lg md:text-xl font-bold text-[#172B4D] tracking-tight leading-snug">
              Download Your Pitch PDF
            </h2>
            <p className="text-xs md:text-sm text-[#6B778C] mt-1 leading-relaxed">
              Please enter your details below to generate and download your custom 2-page print-ready pitch document.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Input */}
          <div>
            <Label className="block text-xs md:text-sm font-semibold text-[#172B4D] mb-2">
              Full Name <span className="text-[#FE5F1F]">*</span>
            </Label>
            <div className="relative flex items-center">
              <Input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError('');
                }}
                placeholder="e.g. Jane Doe"
                className={cn(
                  "text-sm pr-11 h-12 px-4 rounded-xl border-[#DFE1E6] focus:border-[#FE5F1F] focus:ring-2 focus:ring-[#FE5F1F]/20 transition-all",
                  nameError && "border-destructive focus:ring-destructive/30"
                )}
                autoFocus
              />
              <User className="w-4.5 h-4.5 text-[#6B778C] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {nameError && (
              <p className="text-xs font-semibold text-destructive mt-1.5 flex items-center">
                {nameError}
              </p>
            )}
          </div>

          {/* Email Address Input */}
          <div>
            <Label className="block text-xs md:text-sm font-semibold text-[#172B4D] mb-2">
              Email Address <span className="text-[#FE5F1F]">*</span>
            </Label>
            <div className="relative flex items-center">
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                placeholder="jane@example.com"
                className={cn(
                  "text-sm pr-11 h-12 px-4 rounded-xl border-[#DFE1E6] focus:border-[#FE5F1F] focus:ring-2 focus:ring-[#FE5F1F]/20 transition-all",
                  emailError && "border-destructive focus:ring-destructive/30"
                )}
              />
              <Mail className="w-4.5 h-4.5 text-[#6B778C] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {emailError && (
              <p className="text-xs font-semibold text-destructive mt-1.5 flex items-center">
                {emailError}
              </p>
            )}
          </div>

          {/* Privacy Note */}
          <div className="flex items-center space-x-2 text-xs text-[#6B778C] pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Your information is secure. Your PDF download will start immediately.</span>
          </div>

          {/* CTA Submit & Download Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isExporting}
              className="w-full h-12 bg-[#FE5F1F] hover:bg-[#E04F13] text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center active:scale-[0.99]"
            >
              {isExporting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating High-Res PDF...</span>
                </div>
              ) : (
                <span>Submit &amp; Download PDF</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
