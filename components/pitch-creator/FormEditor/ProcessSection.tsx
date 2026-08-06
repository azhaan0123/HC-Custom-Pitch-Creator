'use client';

import React from 'react';
import { PitchData, ProcessStep } from '@/lib/pitch-creator/types';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface ProcessSectionProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ data, onChange }) => {
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
        <Label>
          How It Works (Process Steps) <span className="text-primary">*</span>
        </Label>
        <span className="text-[10px] text-muted-foreground">
          {steps.length}/{MAX_STEPS} steps (Min {MIN_STEPS})
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <Card
            key={step.id || idx}
            className="p-3 space-y-2 relative group hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between border-b border-border pb-1.5">
              <span className="text-xs font-semibold text-primary">
                Row {idx + 1}
              </span>
              <div className="flex items-center space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => moveStep(idx, 'up')}
                  disabled={idx === 0}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground disabled:opacity-30"
                  title="Move up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => moveStep(idx, 'down')}
                  disabled={idx === steps.length - 1}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground disabled:opacity-30"
                  title="Move down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeStep(idx)}
                  disabled={steps.length <= MIN_STEPS}
                  className="h-7 w-7 text-muted-foreground hover:text-destructive disabled:opacity-30"
                  title={steps.length <= MIN_STEPS ? `Minimum ${MIN_STEPS} steps required` : 'Delete step'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <Label className="block text-[10px] text-muted-foreground mb-1">Step Label</Label>
                <Input
                  type="text"
                  value={step.stepLabel}
                  onChange={(e) => updateStep(idx, 'stepLabel', e.target.value)}
                  placeholder="e.g. 1. We meet"
                  className="text-xs"
                />
              </div>
              <div className="md:col-span-1">
                <Label className="block text-[10px] text-muted-foreground mb-1">Timeline</Label>
                <Input
                  type="text"
                  value={step.timeline}
                  onChange={(e) => updateStep(idx, 'timeline', e.target.value)}
                  placeholder="e.g. 30 minutes"
                  className="text-xs"
                />
              </div>
              <div className="md:col-span-3">
                <Label className="block text-[10px] text-muted-foreground mb-1">What Happens</Label>
                <Textarea
                  rows={2}
                  value={step.whatHappens}
                  onChange={(e) => updateStep(idx, 'whatHappens', e.target.value)}
                  placeholder="Explain what happens during this step..."
                  className="text-xs leading-relaxed custom-scrollbar min-h-[50px]"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center pt-1">
        {steps.length < MIN_STEPS && (
          <p className="text-xs text-amber-600">At least {MIN_STEPS} steps are required for export.</p>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addStep}
          disabled={steps.length >= MAX_STEPS}
          className="ml-auto text-primary hover:text-primary border-primary/30 hover:bg-primary/10"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          Add Process Step
        </Button>
      </div>
    </div>
  );
};
