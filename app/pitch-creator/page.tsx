import type { Metadata } from 'next';
import PitchCreatorApp from '@/components/pitch-creator/PitchCreatorApp';
import '@/styles/pitch-creator.css';

export const metadata: Metadata = {
  title: 'DPC Employer Pitch Builder | HealthCompiler',
  description:
    'Build and export a custom 2-page employer pitch PDF for your Direct Primary Care practice. Edit live, preview instantly, and download print-ready documents.',
};

export default function PitchCreatorPage() {
  return <PitchCreatorApp />;
}
