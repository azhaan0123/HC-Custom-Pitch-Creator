'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { PitchData } from './types';
import { defaultPitchData, samplePresets } from './defaults';
import { pitchSchema } from './schema';

const STORAGE_KEY = 'dpc_pitch_builder_draft_v2';

export function usePitchForm() {
  const [formData, setFormData] = useState<PitchData>(() => {
    if (typeof window === 'undefined') return defaultPitchData;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load pitch form from localStorage:', e);
    }
    return defaultPitchData;
  });

  const [previewData, setPreviewData] = useState<PitchData>(formData);

  // Debounced preview sync (150ms) per PRD performance specs
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviewData(formData);
      if (typeof window === 'undefined') return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      } catch (e) {
        console.warn('Failed to save pitch form to localStorage:', e);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [formData]);

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

  return {
    formData,
    previewData,
    updateField,
    loadPreset,
    resetForm,
    isValid,
    errors,
  };
}
