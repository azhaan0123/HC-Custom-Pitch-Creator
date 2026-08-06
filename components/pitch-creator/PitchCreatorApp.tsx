'use client';

import React, { useState, useCallback } from 'react';
import { ViewMode } from '@/lib/pitch-creator/types';
import { usePitchForm } from '@/lib/pitch-creator/hooks';
import { exportPitchToPDF } from '@/lib/pitch-creator/pdf-export';
import { submitLeadData } from '@/lib/pitch-creator/lead-collection';
import { Header } from './Header';
import { FormEditor } from './FormEditor/FormEditor';
import { PreviewContainer } from './PreviewContainer';
import { ExportLeadDialog } from './ExportLeadDialog';
import { TooltipProvider } from './ui/tooltip';
import { cn } from '@/lib/pitch-creator/utils';

export default function PitchCreatorApp() {
  const { formData, previewData, updateField, loadPreset, resetForm, isValid, errors } = usePitchForm();
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [isExporting, setIsExporting] = useState(false);
  const [showLeadDialog, setShowLeadDialog] = useState(false);

  const handleExportClick = useCallback(() => {
    setShowLeadDialog(true);
  }, []);

  const handleLeadSubmitAndExport = useCallback(async (name: string, email: string) => {
    setIsExporting(true);
    try {
      await submitLeadData({
        name,
        email,
        practiceName: formData.brand.practiceName,
        timestamp: new Date().toISOString(),
      });

      await exportPitchToPDF(previewData);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
      setShowLeadDialog(false);
    }
  }, [formData.brand.practiceName, previewData]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="h-screen max-h-screen flex flex-col bg-[#F4F5F7] font-['Geist_Sans',ui-sans-serif,system-ui,sans-serif] overflow-hidden">
        {/* Main Pitch Builder Content with Generous Horizontal Padding */}
        <main className="flex-1 min-h-0 flex flex-col overflow-hidden px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-4 md:py-5">
          {/* Action Toolbar Header */}
          <Header
            viewMode={viewMode}
            setViewMode={setViewMode}
            onExport={handleExportClick}
            isExporting={isExporting}
            isValid={isValid}
            onLoadPreset={loadPreset}
            onReset={resetForm}
          />

          {/* Main Layout: Editor + Preview Side-by-Side with Independent Scrollable Panels */}
          <div className="flex-1 min-h-0 flex overflow-hidden gap-6">
            {/* Left Panel: Form Editor (Independently Scrollable) */}
            <div
              className={cn(
                "flex-shrink-0 h-full overflow-y-auto custom-scrollbar transition-all duration-300 pr-1",
                viewMode === 'split' && "w-[48%] lg:w-[45%]",
                viewMode === 'editor' && "w-full",
                viewMode === 'preview' && "hidden"
              )}
            >
              <FormEditor data={formData} onChange={updateField} errors={errors} />
            </div>

            {/* Right Panel: Live Document Preview (Independently Scrollable) */}
            <div
              className={cn(
                "flex-1 h-full min-h-0 min-w-0 transition-all duration-300",
                viewMode === 'split' && "flex w-[52%] lg:w-[55%]",
                viewMode === 'preview' && "flex w-full",
                viewMode === 'editor' && "hidden"
              )}
            >
              <PreviewContainer data={previewData} isValid={isValid} />
            </div>
          </div>
        </main>
      </div>

      {/* Lead Collection + PDF Export Modal */}
      <ExportLeadDialog
        isOpen={showLeadDialog}
        onClose={() => setShowLeadDialog(false)}
        onSubmit={handleLeadSubmitAndExport}
        isExporting={isExporting}
      />
    </TooltipProvider>
  );
}

