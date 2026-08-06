'use client';

import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export interface QRCodeOptions {
  eccLevel?: 'L' | 'M' | 'Q' | 'H';
  fillColor?: string;
  bgColor?: string;
  margin?: number;
}

/**
 * Generates an SVG QR Code string asynchronously using Soldair's node-qrcode library.
 * Official Repository: https://github.com/soldair/node-qrcode
 */
export async function generateQRCodeSVGAsync(
  text: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const trimmed = (text || '').trim();
  if (!trimmed) return '';

  const {
    eccLevel = 'M',
    fillColor = '#111827',
    bgColor = '#FFFFFF',
    margin = 2,
  } = options;

  try {
    const svg = await QRCode.toString(trimmed, {
      type: 'svg',
      margin,
      errorCorrectionLevel: eccLevel,
      color: {
        dark: fillColor,
        light: bgColor,
      },
    });
    return svg;
  } catch (err) {
    console.error('Failed to generate QR code using node-qrcode:', err);
    return '';
  }
}

/**
 * React hook to generate and maintain a live QR Code SVG string using Soldair's node-qrcode library.
 */
export function useQRCode(text: string, options: QRCodeOptions = {}): string {
  const [qrSvg, setQrSvg] = useState<string>('');

  const fillColor = options.fillColor || '#111827';
  const bgColor = options.bgColor || '#FFFFFF';
  const eccLevel = options.eccLevel || 'M';
  const margin = options.margin !== undefined ? options.margin : 2;

  useEffect(() => {
    let isMounted = true;
    const trimmed = (text || '').trim();

    if (!trimmed) {
      setQrSvg('');
      return;
    }

    generateQRCodeSVGAsync(trimmed, {
      fillColor,
      bgColor,
      eccLevel,
      margin,
    }).then((svg) => {
      if (isMounted) {
        setQrSvg(svg);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [text, fillColor, bgColor, eccLevel, margin]);

  return qrSvg;
}
