'use client';

import React from 'react';
import { PitchData, VignetteItem } from '@/lib/pitch-creator/types';
import { Plus, Trash2, Zap, MessageSquare } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

interface VignettesSectionProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const VignettesSection: React.FC<VignettesSectionProps> = ({ data, onChange }) => {
  const title = data.vignettes?.title ?? 'What happens when your employees can actually reach their doctor.';
  const items = data.vignettes?.items || [];

  const handleTitleChange = (val: string) => {
    onChange('vignettes.title', val);
  };

  const handleItemChange = (index: number, key: 'trigger' | 'outcome', val: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: val };
    onChange('vignettes.items', updated);
  };

  const addItem = () => {
    if (items.length >= 6) {
      alert('Maximum 6 scenarios allowed to fit on Page 2.');
      return;
    }
    const newItem: VignetteItem = {
      id: `v-${Date.now()}`,
      trigger: 'An employee needs a routine checkup or refill.',
      outcome: 'Same-day consultation. No waiting room delay.',
    };
    onChange('vignettes.items', [...items, newItem]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) {
      alert('Keep at least 1 employee scenario.');
      return;
    }
    const updated = items.filter((_, i) => i !== index);
    onChange('vignettes.items', updated);
  };

  return (
    <div className="space-y-4">
      {/* Section Title */}
      <div>
        <Label className="block text-xs mb-1">
          Section Headline
        </Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g. What happens when your employees can actually reach their doctor."
          className="text-xs"
        />
      </div>

      {/* List of Scenarios */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-[#172B4D]">
            Employee Scenarios &amp; Care Outcomes ({items.length}/6)
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addItem}
            disabled={items.length >= 6}
            className="h-7 px-2 text-xs text-primary border-primary/30 hover:bg-primary/5"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>Add Scenario</span>
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg p-3 space-y-2 relative group hover:border-[#C1C7D0] transition-colors"
            >
              <div className="flex items-center justify-between border-b border-[#DFE1E6]/70 pb-1.5 mb-1.5">
                <span className="text-[11px] font-bold text-[#172B4D] flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Scenario #{index + 1}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                  title="Remove scenario"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <Label className="block text-[10px] text-[#6B778C] mb-1">
                  Trigger Event (Bold Lead)
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    value={item.trigger}
                    onChange={(e) => handleItemChange(index, 'trigger', e.target.value)}
                    placeholder="e.g. An employee texts at 8am with back pain."
                    className="text-xs pr-8"
                  />
                  <Zap className="w-3.5 h-3.5 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <Label className="block text-[10px] text-[#6B778C] mb-1">
                  Care Outcome &amp; Benefit
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    value={item.outcome}
                    onChange={(e) => handleItemChange(index, 'outcome', e.target.value)}
                    placeholder="e.g. Seen by 10am. No half-day off work. No urgent care bill."
                    className="text-xs pr-8"
                  />
                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
