import React, { useState } from 'react';
import { usePitchForm } from './hooks/usePitchForm';
import { Header } from './components/Header';
import { FormEditor } from './components/FormEditor/FormEditor';
import { PreviewContainer } from './components/PreviewContainer';
import { exportPitchToPDF } from './utils/pdfExport';
import { ViewMode } from './types/pitch';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { TooltipProvider } from './components/ui/tooltip';

export function App() {
  const {
    formData,
    previewData,
    updateField,
    loadPreset,
    resetForm,
    isValid,
    errors,
  } = usePitchForm();

  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [isExporting, setIsExporting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleExport = async () => {
    if (!isValid) return;
    setIsExporting(true);
    setNotification(null);

    try {
      await exportPitchToPDF(formData);
      setNotification({
        type: 'success',
        message: 'PDF exported successfully! Check your downloads folder.',
      });
    } catch (error) {
      console.error('PDF export failed:', error);
      setNotification({
        type: 'error',
        message: 'Failed to export PDF. Please try again.',
      });
    } finally {
      setIsExporting(false);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <TooltipProvider>
      <div className="h-screen w-screen bg-background text-foreground flex flex-col font-sans overflow-hidden">
        {/* Notification Toast */}
        {notification && (
          <div className="fixed bottom-6 right-6 z-50 animate-in fade-in-0 slide-in-from-bottom-5 duration-300">
            <div
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold ${
                notification.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
              <span>{notification.message}</span>
            </div>
          </div>
        )}

        {/* Main Workspace Layout */}
        <main className="flex-1 min-h-0 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col overflow-hidden">
          {/* Secondary Floating Header (Same width as the below panels combined) */}
          <Header
            viewMode={viewMode}
            setViewMode={setViewMode}
            onExport={handleExport}
            isExporting={isExporting}
            isValid={isValid}
            onLoadPreset={loadPreset}
            onReset={resetForm}
          />

          {/* Panels Grid Container */}
          <div className="flex-1 min-h-0 overflow-hidden">
            {/* Desktop Split View */}
            {viewMode === 'split' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-0 overflow-hidden">
                <div className="lg:col-span-5 h-full overflow-y-auto pr-1 custom-scrollbar">
                  <FormEditor data={formData} onChange={updateField} errors={errors} />
                </div>
                <div className="lg:col-span-7 h-full min-h-0">
                  <PreviewContainer data={previewData} isValid={isValid} />
                </div>
              </div>
            )}

            {/* Full Editor View */}
            {viewMode === 'editor' && (
              <div className="max-w-3xl mx-auto w-full h-full overflow-y-auto pr-1 custom-scrollbar">
                <FormEditor data={formData} onChange={updateField} errors={errors} />
              </div>
            )}

            {/* Full Preview View */}
            {viewMode === 'preview' && (
              <div className="h-full w-full min-h-0">
                <PreviewContainer data={previewData} isValid={isValid} />
              </div>
            )}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}

export default App;
