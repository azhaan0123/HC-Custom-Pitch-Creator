import React from 'react';
import { PitchData } from '../../types/pitch';
import { Plus, Trash2, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';

interface BenefitsSectionProps {
  data: PitchData;
  onChange: (field: string, value: any) => void;
  errors?: Record<string, string>;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ data, onChange, errors }) => {
  const items = data.teamBenefits.items || [];
  const MIN_ITEMS = 3;
  const MAX_ITEMS = 8;
  const ITEM_SOFT_CAP = 90;

  const updateItem = (index: number, value: string) => {
    const updated = [...items];
    updated[index] = value;
    onChange('teamBenefits.items', updated);
  };

  const addItem = () => {
    if (items.length >= MAX_ITEMS) return;
    onChange('teamBenefits.items', [...items, '']);
  };

  const removeItem = (index: number) => {
    if (items.length <= MIN_ITEMS) return;
    const updated = items.filter((_, i) => i !== index);
    onChange('teamBenefits.items', updated);
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange('teamBenefits.items', updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">
          What Your Team Gets <span className="text-brand-400">*</span>
        </label>
        <span className="text-[10px] text-slate-400">
          {items.length}/{MAX_ITEMS} items (Min {MIN_ITEMS})
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => {
          const isOver = item.length > ITEM_SOFT_CAP;
          return (
            <div
              key={idx}
              className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg p-2 group hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center text-slate-600 group-hover:text-slate-400">
                <GripVertical className="w-4 h-4 cursor-grab" />
              </div>

              <div className="flex-1 min-w-0 relative">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem(idx, e.target.value)}
                  placeholder={`Benefit item ${idx + 1}...`}
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all pr-12"
                />
                <span
                  className={`absolute right-2 top-2 text-[9px] font-mono ${
                    isOver ? 'text-amber-400 font-bold' : 'text-slate-500'
                  }`}
                >
                  {item.length}/{ITEM_SOFT_CAP}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => moveItem(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-400 rounded"
                  title="Move up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(idx, 'down')}
                  disabled={idx === items.length - 1}
                  className="p-1 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-400 rounded"
                  title="Move down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  disabled={items.length <= MIN_ITEMS}
                  className="p-1 text-slate-400 hover:text-red-400 disabled:opacity-30 disabled:hover:text-slate-400 rounded"
                  title={items.length <= MIN_ITEMS ? `Minimum ${MIN_ITEMS} items required` : 'Delete item'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-1">
        {items.length < MIN_ITEMS && (
          <p className="text-xs text-amber-400">At least {MIN_ITEMS} items are required for export.</p>
        )}
        <button
          type="button"
          onClick={addItem}
          disabled={items.length >= MAX_ITEMS}
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-brand-400 hover:text-brand-300 disabled:opacity-40 disabled:hover:text-brand-400 bg-brand-500/10 hover:bg-brand-500/20 px-3 py-1.5 rounded-md transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Benefit Item</span>
        </button>
      </div>
    </div>
  );
};
