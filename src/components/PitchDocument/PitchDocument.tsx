import React from 'react';
import { PitchData } from '../../types/pitch';
import { PitchPage1 } from './PitchPage1';
import { PitchPage2 } from './PitchPage2';

interface PitchDocumentProps {
  data: PitchData;
  scale?: number;
}

export const PitchDocument: React.FC<PitchDocumentProps> = ({ data, scale = 1 }) => {
  return (
    <div
      id="pitch-document-container"
      className="flex flex-col space-y-8 items-center origin-top transition-transform duration-150"
      style={{ transform: `scale(${scale})` }}
    >
      <div id="document-page-1">
        <PitchPage1 data={data} />
      </div>
      <div id="document-page-2">
        <PitchPage2 data={data} />
      </div>
    </div>
  );
};
