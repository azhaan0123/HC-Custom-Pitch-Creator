import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { PitchData } from './types';

export async function exportPitchToPDF(data: PitchData): Promise<void> {
  const practiceName = data.brand.practiceName?.trim() || 'DPC Practice';
  // Remove characters forbidden in Windows/macOS filenames (/ \ ? % * : | " < >)
  const safeName = practiceName.replace(/[/\\?%*:|"<>]/g, '').trim();
  const filename = safeName ? `${safeName} Pitch.pdf` : 'DPC Pitch.pdf';

  const page1Element = document.getElementById('document-page-1');
  const page2Element = document.getElementById('document-page-2');

  if (!page1Element || !page2Element) {
    throw new Error('Document page elements not found for PDF export.');
  }

  // Hide scale transforms during capture
  const container = document.getElementById('pitch-document-container');
  const originalTransform = container?.style.transform || '';
  if (container) {
    container.style.transform = 'scale(1)';
  }

  try {
    const canvasOptions = {
      scale: 2.5, // High DPI for crisp text
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    };

    const canvas1 = await html2canvas(page1Element, canvasOptions);
    const canvas2 = await html2canvas(page2Element, canvasOptions);

    // Letter size: 8.5 x 11 inches = 215.9 x 279.4 mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
      compress: true,
    });

    const pdfWidth = 215.9;
    const pdfHeight = 279.4;

    const imgData1 = canvas1.toDataURL('image/jpeg', 0.95);
    const imgData2 = canvas2.toDataURL('image/jpeg', 0.95);

    // Page 1
    pdf.addImage(imgData1, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // Page 2
    pdf.addPage('letter', 'portrait');
    pdf.addImage(imgData2, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // Generate blob and trigger explicit anchor download
    const pdfBlob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(pdfBlob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = blobUrl;
    downloadAnchor.download = filename;
    downloadAnchor.style.display = 'none';
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
  } finally {
    // Restore scale transform
    if (container) {
      container.style.transform = originalTransform;
    }
  }
}
