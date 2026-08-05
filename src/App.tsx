import React, { useState } from 'react';
import { usePitchForm } from './hooks/usePitchForm';
import { Header } from './components/Header';
import { FormEditor } from './components/FormEditor/FormEditor';
import { PreviewContainer } from './components/PreviewContainer';
import { exportPitchToPDF } from './utils/pdfExport';
import { ViewMode } from './types/pitch';
import { CheckCircle2, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        onExport={handleExport}
        isExporting={isExporting}
        isValid={isValid}
        onLoadPreset={loadPreset}
        onReset={resetForm}
      />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold ${
              notification.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/90 border-red-500/50 text-red-200'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 gap-6 overflow-hidden">
        {/* Desktop Split View */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-100px)]">
            <div className="lg:col-span-5 overflow-y-auto pr-1 custom-scrollbar">
              <FormEditor data={formData} onChange={updateField} errors={errors} />
            </div>
            <div className="lg:col-span-7 h-full">
              <PreviewContainer data={previewData} isValid={isValid} />
            </div>
          </div>
        )}

        {/* Full Editor View */}
        {viewMode === 'editor' && (
          <div className="max-w-3xl mx-auto w-full">
            <FormEditor data={formData} onChange={updateField} errors={errors} />
          </div>
        )}

        {/* Full Preview View */}
        {viewMode === 'preview' && (
          <div className="h-[calc(100vh-100px)] w-full">
            <PreviewContainer data={previewData} isValid={isValid} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
