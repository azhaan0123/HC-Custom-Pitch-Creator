import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, User, Mail, Download, ShieldCheck, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

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

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in-0 duration-200">
      {/* Backdrop overlay dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-white border border-[#DFE1E6] rounded-2xl shadow-[0_20px_50px_rgba(9,30,66,0.25)] p-6 z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isExporting}
          className="absolute top-4 right-4 text-[#6B778C] hover:text-[#172B4D] p-1 rounded-lg hover:bg-[#EBECF0] transition-colors"
          title="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-start space-x-3.5 mb-5">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-[#FE5F1F]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#172B4D] tracking-tight leading-snug">
              Download Your Pitch PDF
            </h2>
            <p className="text-xs text-[#6B778C] mt-0.5 leading-relaxed">
              Please enter your details below to generate and download your custom 2-page print-ready pitch document.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <Label className="block text-xs font-semibold text-[#172B4D] mb-1.5">
              Full Name <span className="text-[#FE5F1F]">*</span>
            </Label>
            <div className="relative">
              <Input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError('');
                }}
                placeholder="e.g. Jane Doe"
                className={cn(
                  "text-xs pr-8 h-9.5",
                  nameError && "border-destructive focus:ring-destructive/30"
                )}
                autoFocus
              />
              <User className="w-4 h-4 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
            </div>
            {nameError && (
              <p className="text-[11px] font-semibold text-destructive mt-1 flex items-center">
                {nameError}
              </p>
            )}
          </div>

          {/* Email Address Input */}
          <div>
            <Label className="block text-xs font-semibold text-[#172B4D] mb-1.5">
              Email Address <span className="text-[#FE5F1F]">*</span>
            </Label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                placeholder="jane@example.com"
                className={cn(
                  "text-xs pr-8 h-9.5",
                  emailError && "border-destructive focus:ring-destructive/30"
                )}
              />
              <Mail className="w-4 h-4 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
            </div>
            {emailError && (
              <p className="text-[11px] font-semibold text-destructive mt-1 flex items-center">
                {emailError}
              </p>
            )}
          </div>

          {/* Privacy Note */}
          <div className="flex items-center space-x-1.5 text-[10px] text-[#6B778C] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Your information is secure. Your PDF download will start immediately.</span>
          </div>

          {/* CTA Submit & Download Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isExporting}
              className="w-full h-10 bg-[#FE5F1F] hover:bg-[#E04F13] text-white font-semibold text-xs rounded-lg shadow-xs transition-all flex items-center justify-center space-x-2 active:scale-[0.99]"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating High-Res PDF...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Submit &amp; Download PDF</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
