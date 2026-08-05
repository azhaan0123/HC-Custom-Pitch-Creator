import React from 'react';
import { PitchData, ProcessStep } from '../../types/pitch';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface ProcessSectionProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ data, onChange, errors }) => {
  const steps = data.howItWorks.steps || [];
  const MIN_STEPS = 3;
  const MAX_STEPS = 6;

  const updateStep = (index: number, key: keyof ProcessStep, value: string) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [key]: value };
    onChange('howItWorks.steps', updated);
  };

  const addStep = () => {
    if (steps.length >= MAX_STEPS) return;
    const newStep: ProcessStep = {
      id: `step-${Date.now()}`,
      stepLabel: `${steps.length + 1}. New step`,
      whatHappens: '',
      timeline: '1 week',
    };
    onChange('howItWorks.steps', [...steps, newStep]);
  };

  const removeStep = (index: number) => {
    if (steps.length <= MIN_STEPS) return;
    const updated = steps.filter((_, i) => i !== index);
    onChange('howItWorks.steps', updated);
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= steps.length) return;
    const updated = [...steps];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange('howItWorks.steps', updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">
          How It Works (Process Steps) <span className="text-brand-400">*</span>
        </label>
        <span className="text-[10px] text-slate-400">
          {steps.length}/{MAX_STEPS} steps (Min {MIN_STEPS})
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div
            key={step.id || idx}
            className="bg-slate-900 border border-slate-800 rounded-lg p-3 space-y-2 relative group hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="text-xs font-semibold text-brand-400">
                Row {idx + 1}
              </span>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => moveStep(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30 rounded"
                  title="Move up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveStep(idx, 'down')}
                  disabled={idx === steps.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30 rounded"
                  title="Move down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeStep(idx)}
                  disabled={steps.length <= MIN_STEPS}
                  className="p-1 text-slate-400 hover:text-red-400 disabled:opacity-30 rounded"
                  title={steps.length <= MIN_STEPS ? `Minimum ${MIN_STEPS} steps required` : 'Delete step'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Step Label</label>
                <input
                  type="text"
                  value={step.stepLabel}
                  onChange={(e) => updateStep(idx, 'stepLabel', e.target.value)}
                  placeholder="e.g. 1. We meet"
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-[10px] text-slate-400 mb-0.5">Timeline</label>
                <input
                  type="text"
                  value={step.timeline}
                  onChange={(e) => updateStep(idx, 'timeline', e.target.value)}
                  placeholder="e.g. 30 minutes"
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-[10px] text-slate-400 mb-0.5">What Happens</label>
                <textarea
                  rows={2}
                  value={step.whatHappens}
                  onChange={(e) => updateStep(idx, 'whatHappens', e.target.value)}
                  placeholder="Explain what happens during this step..."
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500 leading-relaxed custom-scrollbar"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-1">
        {steps.length < MIN_STEPS && (
          <p className="text-xs text-amber-400">At least {MIN_STEPS} steps are required for export.</p>
        )}
        <button
          type="button"
          onClick={addStep}
          disabled={steps.length >= MAX_STEPS}
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-brand-400 hover:text-brand-300 disabled:opacity-40 bg-brand-500/10 hover:bg-brand-500/20 px-3 py-1.5 rounded-md transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Process Step</span>
        </button>
      </div>
    </div>
  );
};
