import type { Metadata } from 'next';
import '@fontsource/geist-sans';
import './globals.css';

export const metadata: Metadata = {
  title: 'DPC Employer Pitch Builder',
  description: 'Build and export custom employer pitch PDFs for your Direct Primary Care practice.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
