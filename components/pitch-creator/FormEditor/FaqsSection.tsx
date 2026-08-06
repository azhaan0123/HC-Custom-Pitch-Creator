'use client';

import React from 'react';
import { PitchData, FAQItem } from '@/lib/pitch-creator/types';
import { Plus, Trash2, HelpCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface FaqsSectionProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const FaqsSection: React.FC<FaqsSectionProps> = ({ data, onChange }) => {
  const title = data.faqs?.title ?? 'Questions we hear from employers.';
  const items = data.faqs?.items || [];

  const handleTitleChange = (val: string) => {
    onChange('faqs.title', val);
  };

  const handleItemChange = (index: number, key: 'question' | 'answer', val: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: val };
    onChange('faqs.items', updated);
  };

  const addItem = () => {
    if (items.length >= 6) {
      alert('Maximum 6 FAQ questions allowed to fit cleanly on Page 2.');
      return;
    }
    const newItem: FAQItem = {
      id: `faq-${Date.now()}`,
      question: 'What is included in the membership?',
      answer: 'Full primary care, same-day appointments, chronic disease management, and direct 24/7 doctor access.',
      isCustom: true,
    };
    onChange('faqs.items', [...items, newItem]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) {
      alert('Keep at least 1 FAQ item.');
      return;
    }
    const updated = items.filter((_, i) => i !== index);
    onChange('faqs.items', updated);
  };

  return (
    <div className="space-y-4">
      {/* Section Headline */}
      <div>
        <Label className="block text-xs mb-1">
          Section Headline
        </Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g. Questions we hear from employers."
          className="text-xs"
        />
      </div>

      {/* List of FAQ Items */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-[#172B4D]">
            Employer FAQ Questions &amp; Answers ({items.length}/6)
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
            <span>Add FAQ</span>
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
                  <HelpCircle className="w-3.5 h-3.5 text-primary" />
                  <span>Question #{index + 1}</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                  title="Remove FAQ"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <Label className="block text-[10px] text-[#6B778C] mb-1">
                  Question text
                </Label>
                <div className="relative">
                  <Input
                    type="text"
                    value={item.question}
                    onChange={(e) => handleItemChange(index, 'question', e.target.value)}
                    placeholder="e.g. Does this replace our insurance?"
                    className="text-xs pr-8"
                  />
                  <HelpCircle className="w-3.5 h-3.5 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <Label className="block text-[10px] text-[#6B778C] mb-1">
                  Answer response
                </Label>
                <div className="relative">
                  <Textarea
                    rows={2}
                    value={item.answer}
                    onChange={(e) => handleItemChange(index, 'answer', e.target.value)}
                    placeholder="e.g. No. We cover primary care..."
                    className="text-xs min-h-[60px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
