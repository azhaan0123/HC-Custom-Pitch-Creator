import React from 'react';
import { PitchData } from '../../types/pitch';
import { Plus, Trash2, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

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
        <Label>
          What Your Team Gets <span className="text-primary">*</span>
        </Label>
        <span className="text-[10px] text-muted-foreground">
          {items.length}/{MAX_ITEMS} items (Min {MIN_ITEMS})
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => {
          const isOver = item.length > ITEM_SOFT_CAP;
          return (
            <div
              key={idx}
              className="flex items-center space-x-2 bg-card border border-border rounded-lg p-2 group hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center text-muted-foreground/40 group-hover:text-muted-foreground">
                <GripVertical className="w-4 h-4 cursor-grab" />
              </div>

              <div className="flex-1 min-w-0 relative">
                <Input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem(idx, e.target.value)}
                  placeholder={`Benefit item ${idx + 1}...`}
                  className="text-xs pr-12"
                />
                <span
                  className={`absolute right-2 top-2.5 text-[9px] font-mono ${
                    isOver ? 'text-amber-600 font-bold' : 'text-muted-foreground'
                  }`}
                >
                  {item.length}/{ITEM_SOFT_CAP}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => moveItem(idx, 'up')}
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
                  onClick={() => moveItem(idx, 'down')}
                  disabled={idx === items.length - 1}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground disabled:opacity-30"
                  title="Move down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(idx)}
                  disabled={items.length <= MIN_ITEMS}
                  className="h-7 w-7 text-muted-foreground hover:text-destructive disabled:opacity-30"
                  title={items.length <= MIN_ITEMS ? `Minimum ${MIN_ITEMS} items required` : 'Delete item'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-1">
        {items.length < MIN_ITEMS && (
          <p className="text-xs text-amber-600">At least {MIN_ITEMS} items are required for export.</p>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
          disabled={items.length >= MAX_ITEMS}
          className="ml-auto text-primary hover:text-primary border-primary/30 hover:bg-primary/10"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          Add Benefit Item
        </Button>
      </div>
    </div>
  );
};
