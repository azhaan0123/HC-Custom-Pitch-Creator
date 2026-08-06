'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { PitchData } from './types';
import { defaultPitchData, samplePresets } from './defaults';
import { pitchSchema } from './schema';

const STORAGE_KEY = 'dpc_pitch_builder_draft_v3';

export function usePitchForm() {
  const [formData, setFormData] = useState<PitchData>(defaultPitchData);
  const [previewData, setPreviewData] = useState<PitchData>(formData);
  const [isHydrated, setIsHydrated] = useState(false);

  // Client-side hydration from localStorage after initial SSR mount
  useEffect(() => {
    setIsHydrated(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          const merged: PitchData = {
            brand: { ...defaultPitchData.brand, ...parsed.brand },
            offerIntro: { ...defaultPitchData.offerIntro, ...parsed.offerIntro },
            teamBenefits: {
              ...defaultPitchData.teamBenefits,
              ...parsed.teamBenefits,
              items: Array.isArray(parsed.teamBenefits?.items) ? parsed.teamBenefits.items : defaultPitchData.teamBenefits.items,
            },
            howItWorks: {
              ...defaultPitchData.howItWorks,
              ...parsed.howItWorks,
              steps: Array.isArray(parsed.howItWorks?.steps) ? parsed.howItWorks.steps : defaultPitchData.howItWorks.steps,
            },
            whyEmployers: { ...defaultPitchData.whyEmployers, ...parsed.whyEmployers },
            vignettes: {
              ...defaultPitchData.vignettes,
              ...parsed.vignettes,
              items: Array.isArray(parsed.vignettes?.items) ? parsed.vignettes.items : (defaultPitchData.vignettes?.items || []),
            },
            faqs: {
              ...defaultPitchData.faqs,
              ...parsed.faqs,
              items: Array.isArray(parsed.faqs?.items) ? parsed.faqs.items : (defaultPitchData.faqs?.items || []),
            },
            contact: { ...defaultPitchData.contact, ...parsed.contact },
          };
          setFormData(merged);
        }
      }
    } catch (e) {
      console.warn('Failed to load pitch form from localStorage:', e);
    }
  }, []);

  // Debounced preview sync (150ms) & localStorage persistence
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviewData(formData);
      if (isHydrated && typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        } catch (e) {
          console.warn('Failed to save pitch form to localStorage:', e);
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [formData, isHydrated]);

  // Nested property updater (e.g., updateField('brand.practiceName', 'Example DPC'))
  const updateField = useCallback((path: string, value: any) => {
    setFormData((prev) => {
      const keys = path.split('.');
      if (keys.length === 1) {
        return { ...prev, [keys[0]]: value };
      }
      if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...(prev as any)[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return prev;
    });
  }, []);

  const loadPreset = useCallback((presetKey: string) => {
    const preset = samplePresets[presetKey] || defaultPitchData;
    setFormData(preset);
  }, []);

  const resetForm = useCallback(() => {
    setFormData(defaultPitchData);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Validation
  const validationResult = useMemo(() => {
    return pitchSchema.safeParse(formData);
  }, [formData]);

  const isValid = validationResult.success;

  const errors = useMemo(() => {
    if (validationResult.success) return {};
    const formatted: Record<string, string> = {};
    validationResult.error.issues.forEach((issue) => {
      const path = issue.path.join('.');
      formatted[path] = issue.message;
    });
    return formatted;
  }, [validationResult]);

  const pendingReasons = useMemo(() => {
    const list: string[] = [];
    if (!formData.brand.practiceName?.trim()) list.push("Practice Name");
    if (!formData.offerIntro.body?.trim() || formData.offerIntro.body.trim().length < 10) list.push("Offer Introduction (min 10 chars)");
    if (!formData.teamBenefits.items || formData.teamBenefits.items.filter((i) => i.trim()).length < 3) list.push("Team Benefits (min 3 items)");
    if (!formData.howItWorks.steps || formData.howItWorks.steps.filter((s) => s.stepLabel?.trim() && s.whatHappens?.trim()).length < 3) list.push("How It Works (min 3 process steps)");
    if (!formData.whyEmployers.subtext?.trim() || formData.whyEmployers.subtext.trim().length < 10) list.push("Why Employers Content");
    if (!formData.contact.nameTitle?.trim()) list.push("Contact Name & Title");
    if (!formData.contact.phone?.trim()) list.push("Phone Number");
    if (!formData.contact.email?.trim()) list.push("Email Address");
    if (!formData.contact.address?.trim()) list.push("Office Location / Address");
    if (!formData.contact.contractTerms?.trim()) list.push("Contract Commitment Clause");
    return list;
  }, [formData]);

  return {
    formData,
    previewData,
    updateField,
    loadPreset,
    resetForm,
    isValid,
    errors,
    pendingReasons,
  };
}
