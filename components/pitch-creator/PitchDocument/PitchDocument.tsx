'use client';

import React from 'react';
import { PitchData } from '@/lib/pitch-creator/types';
import { PitchPage1 } from './PitchPage1';
import { PitchPage2 } from './PitchPage2';
import { cn } from '@/lib/pitch-creator/utils';

interface PitchDocumentProps {
  data: PitchData;
  scale?: number;
  isSideBySide?: boolean;
}

export const PitchDocument: React.FC<PitchDocumentProps> = ({
  data,
  scale = 1,
  isSideBySide = false,
}) => {
  return (
    <div
      id="pitch-document-container"
      className={cn(
        "flex origin-top transition-all duration-150 items-center justify-center",
        isSideBySide
          ? "flex-col lg:flex-row lg:space-x-8 lg:space-y-0 space-y-8"
          : "flex-col space-y-8"
      )}
      style={{ transform: `scale(${scale})` }}
    >
      <div id="document-page-1" className="shrink-0">
        <PitchPage1 data={data} />
      </div>
      <div id="document-page-2" className="shrink-0">
        <PitchPage2 data={data} />
      </div>
    </div>
  );
};
