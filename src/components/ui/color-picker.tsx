import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check, RotateCcw, Palette, Sliders, Pipette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

// Convert Hex to HSL
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return { h: 1, s: 74, l: 76 };
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

// Convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const COLOR_CATEGORIES = [
  {
    name: 'Brand & Health',
    colors: [
      { hex: '#ef9493', label: 'Signature Coral' },
      { hex: '#E31B54', label: 'Magenta Red' },
      { hex: '#FF5722', label: 'Deep Orange' },
      { hex: '#F97316', label: 'Warm Peach' },
    ],
  },
  {
    name: 'Corporate & Tech',
    colors: [
      { hex: '#0C66E4', label: 'Atlassian Blue' },
      { hex: '#0284C7', label: 'Sky Blue' },
      { hex: '#0D9488', label: 'Teal' },
      { hex: '#059669', label: 'Emerald Green' },
    ],
  },
  {
    name: 'Executive & Creative',
    colors: [
      { hex: '#7C3AED', label: 'Royal Purple' },
      { hex: '#4F46E5', label: 'Indigo' },
      { hex: '#D97706', label: 'Warm Amber' },
      { hex: '#1E293B', label: 'Midnight Slate' },
    ],
  },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color = '#ef9493',
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hexInput, setHexInput] = useState(color);
  const [hsl, setHsl] = useState(() => hexToHsl(color));
  const [mode, setMode] = useState<'custom' | 'presets'>('custom');

  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const nativeColorInputRef = useRef<HTMLInputElement>(null);
  const [popoverCoords, setPopoverCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Sync internal HSL/Hex state when external color prop changes
  useEffect(() => {
    setHexInput(color);
    setHsl(hexToHsl(color));
  }, [color]);

  // Compute fixed position for portal popover
  const updatePopoverCoords = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const popoverHeight = 330;

      let top = rect.bottom + 6;
      if (spaceBelow < popoverHeight && rect.top > popoverHeight) {
        top = rect.top - popoverHeight - 6;
      }

      let left = rect.left;
      if (left + 320 > window.innerWidth - 16) {
        left = window.innerWidth - 320 - 16;
      }
      left = Math.max(16, left);

      setPopoverCoords({ top, left });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePopoverCoords();
      window.addEventListener('resize', updatePopoverCoords);
      window.addEventListener('scroll', updatePopoverCoords, true);
    }
    return () => {
      window.removeEventListener('resize', updatePopoverCoords);
      window.removeEventListener('scroll', updatePopoverCoords, true);
    };
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleHexChange = (val: string) => {
    setHexInput(val);
    if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
      onChange(val);
      setHsl(hexToHsl(val));
    }
  };

  const handleHslChange = (h: number, s: number, l: number) => {
    const newHsl = { h, s, l };
    setHsl(newHsl);
    const newHex = hslToHex(h, s, l);
    setHexInput(newHex);
    onChange(newHex);
  };

  const handleSelectColor = (hex: string) => {
    setHexInput(hex);
    setHsl(hexToHsl(hex));
    onChange(hex);
  };

  const matchedPreset = COLOR_CATEGORIES.flatMap((c) => c.colors).find(
    (c) => c.hex.toLowerCase() === color.toLowerCase()
  );

  return (
    <div className={cn("relative inline-block w-full", className)}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between h-9 px-3 bg-[#FAFBFC] hover:bg-white border border-[#DFE1E6] hover:border-[#C1C7D0] rounded-md shadow-2xs transition-all duration-150 group text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
      >
        <div className="flex items-center space-x-2.5 min-w-0">
          <div
            className="w-5 h-5 rounded-md border border-black/10 shrink-0 shadow-2xs transition-transform group-hover:scale-105"
            style={{ backgroundColor: color }}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-xs font-semibold text-[#172B4D] truncate uppercase">
              {color}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-[#6B778C]">
          {matchedPreset ? (
            <span className="text-[10px] font-medium hidden sm:inline-block truncate max-w-[100px] text-[#6B778C]">
              {matchedPreset.label}
            </span>
          ) : (
            <span className="text-[10px] font-medium hidden sm:inline-block text-[#6B778C]">
              Custom Color
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#172B4D]' : ''
            }`}
          />
        </div>
      </button>

      {/* React Portal Popover: Renders directly in document.body with z-[9999] */}
      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: 'fixed',
              top: `${popoverCoords.top}px`,
              left: `${popoverCoords.left}px`,
            }}
            className="w-80 bg-white border border-[#DFE1E6] rounded-xl shadow-[0_12px_36px_rgba(9,30,66,0.22)] p-3.5 z-[9999] animate-in fade-in-0 zoom-in-95"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#DFE1E6] mb-3">
              {/* Mode Switcher Tabs */}
              <div className="flex items-center space-x-1 bg-[#EBECF0]/80 p-0.5 rounded-lg border border-[#DFE1E6]">
                <button
                  type="button"
                  onClick={() => setMode('custom')}
                  className={cn(
                    "px-2.5 py-0.5 text-[11px] font-semibold rounded-md transition-all",
                    mode === 'custom'
                      ? "bg-white text-[#172B4D] shadow-2xs border border-[#DFE1E6]"
                      : "text-[#6B778C] hover:text-[#172B4D]"
                  )}
                >
                  <span className="flex items-center space-x-1">
                    <Sliders className="w-3 h-3" />
                    <span>Custom Picker</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('presets')}
                  className={cn(
                    "px-2.5 py-0.5 text-[11px] font-semibold rounded-md transition-all",
                    mode === 'presets'
                      ? "bg-white text-[#172B4D] shadow-2xs border border-[#DFE1E6]"
                      : "text-[#6B778C] hover:text-[#172B4D]"
                  )}
                >
                  <span className="flex items-center space-x-1">
                    <Palette className="w-3 h-3" />
                    <span>Presets</span>
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleSelectColor('#ef9493')}
                className="text-[10px] font-medium text-[#6B778C] hover:text-[#172B4D] flex items-center space-x-1 transition-colors"
                title="Reset to default #ef9493"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Mode 1: Visual Custom Color Sliders */}
            {mode === 'custom' && (
              <div className="space-y-3">
                {/* Color Box Preview & Spectrum Button */}
                <div className="flex items-center space-x-3 p-2.5 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg">
                  <div
                    className="w-10 h-10 rounded-lg border border-black/10 shrink-0 shadow-2xs"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono font-bold text-[#172B4D] uppercase">{color}</p>
                    <p className="text-[10px] text-[#6B778C]">
                      HSL({hsl.h}°, {hsl.s}%, {hsl.l}%)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => nativeColorInputRef.current?.click()}
                    className="h-8 px-2.5 bg-white hover:bg-[#EBECF0] border border-[#DFE1E6] rounded-md text-[11px] font-semibold text-[#172B4D] flex items-center space-x-1.5 shadow-2xs transition-colors"
                    title="Open native color wheel"
                  >
                    <Pipette className="w-3.5 h-3.5 text-primary" />
                    <span>Spectrum</span>
                  </button>
                  <input
                    ref={nativeColorInputRef}
                    type="color"
                    value={color}
                    onChange={(e) => handleSelectColor(e.target.value)}
                    className="sr-only"
                  />
                </div>

                {/* 1. Hue Slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#172B4D]">Hue (Color)</span>
                    <span className="font-mono text-[#6B778C] text-[10px]">{hsl.h}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={hsl.h}
                    onChange={(e) => handleHslChange(Number(e.target.value), hsl.s, hsl.l)}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer border border-black/10 focus:outline-none"
                    style={{
                      background:
                        'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)',
                    }}
                  />
                </div>

                {/* 2. Saturation Slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#172B4D]">Saturation (Vibrancy)</span>
                    <span className="font-mono text-[#6B778C] text-[10px]">{hsl.s}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={hsl.s}
                    onChange={(e) => handleHslChange(hsl.h, Number(e.target.value), hsl.l)}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer border border-black/10 focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, ${hslToHex(hsl.h, 0, hsl.l)}, ${hslToHex(hsl.h, 100, hsl.l)})`,
                    }}
                  />
                </div>

                {/* 3. Lightness Slider */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#172B4D]">Lightness (Brightness)</span>
                    <span className="font-mono text-[#6B778C] text-[10px]">{hsl.l}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="85"
                    value={hsl.l}
                    onChange={(e) => handleHslChange(hsl.h, hsl.s, Number(e.target.value))}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer border border-black/10 focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, #000000 0%, ${hslToHex(hsl.h, hsl.s, 50)} 50%, #ffffff 100%)`,
                    }}
                  />
                </div>

                {/* Direct Hex Code Input */}
                <div className="pt-2 border-t border-[#DFE1E6] flex items-center space-x-2">
                  <span className="text-xs font-semibold text-[#172B4D]">Hex Code:</span>
                  <input
                    type="text"
                    maxLength={7}
                    value={hexInput}
                    onChange={(e) => handleHexChange(e.target.value)}
                    placeholder="#ef9493"
                    className="flex-1 h-8 px-2.5 bg-[#FAFBFC] focus:bg-white border border-[#DFE1E6] focus:border-primary font-mono text-xs text-[#172B4D] rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40 uppercase"
                  />
                </div>
              </div>
            )}

            {/* Mode 2: Preset Colors Gallery */}
            {mode === 'presets' && (
              <div className="space-y-3">
                {COLOR_CATEGORIES.map((category) => (
                  <div key={category.name}>
                    <p className="text-[10px] font-semibold text-[#6B778C] uppercase tracking-wider mb-1.5">
                      {category.name}
                    </p>
                    <div className="grid grid-cols-4 gap-1.5">
                      {category.colors.map((c) => {
                        const isSelected = color.toLowerCase() === c.hex.toLowerCase();
                        return (
                          <button
                            key={c.hex}
                            type="button"
                            onClick={() => handleSelectColor(c.hex)}
                            className={cn(
                              "group relative h-8 rounded-lg border transition-all flex items-center justify-center p-1 shadow-2xs hover:scale-105",
                              isSelected
                                ? "border-white ring-2 ring-primary ring-offset-1"
                                : "border-black/10 hover:border-black/20"
                            )}
                            style={{ backgroundColor: c.hex }}
                            title={`${c.label} (${c.hex})`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-xs" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Document Live Preview Footer Badge */}
            <div className="mt-3 p-2 bg-[#FAFBFC] border border-[#DFE1E6] rounded-lg flex items-center space-x-2 text-[10px]">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-[#6B778C]">
                Live document highlights update instantly
              </span>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
