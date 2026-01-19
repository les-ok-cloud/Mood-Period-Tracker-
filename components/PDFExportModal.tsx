import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { PDFExportFilters } from '../utils/pdfExport';

interface PDFExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (filters: PDFExportFilters) => Promise<void>;
  isExporting: boolean;
}

export const PDFExportModal: React.FC<PDFExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
  isExporting,
}) => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<PDFExportFilters>({});

  if (!isOpen) return null;

  const handleExport = async () => {
    await onExport(filters);
  };

  const handleFilterChange = (key: keyof PDFExportFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-700 mb-4">
            {t.exportReflections || 'Export Reflections'}
          </h2>

          <div className="space-y-4">
            {/* Date Range */}
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                {t.fromDate || 'From Date'} - {t.toDate || 'To Date'}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    {t.fromDate || 'From'}
                  </label>
                  <input
                    type="date"
                    value={filters.startDate ? filters.startDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleFilterChange('startDate', e.target.value ? new Date(e.target.value) : undefined)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">
                    {t.toDate || 'To'}
                  </label>
                  <input
                    type="date"
                    value={filters.endDate ? filters.endDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => handleFilterChange('endDate', e.target.value ? new Date(e.target.value) : undefined)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
            </div>

            {/* Content Filters */}
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                {t.export || 'Content Type'}
              </h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.onlyPositives || false}
                    onChange={(e) => handleFilterChange('onlyPositives', e.target.checked)}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-400"
                  />
                  <span className="ml-2 text-sm text-slate-700">
                    {t.reflectionPrompt1 ? `${t.reflectionPrompt1} (+)` : 'Only positive reflections (+)'}
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.onlyDrains || false}
                    onChange={(e) => handleFilterChange('onlyDrains', e.target.checked)}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-400"
                  />
                  <span className="ml-2 text-sm text-slate-700">
                    {t.reflectionPrompt2 ? `${t.reflectionPrompt2} (-)` : 'Only drained energy reflections (-)'}
                  </span>
                </label>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {(!filters.onlyPositives && !filters.onlyDrains) ? 'All entries will be included' :
                 (filters.onlyPositives && filters.onlyDrains) ? 'Entries with either type will be included' :
                 'Only selected type will be included'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              disabled={isExporting}
              className="flex-1 bg-slate-200 text-slate-700 font-medium py-3 px-4 rounded-lg hover:bg-slate-300 disabled:opacity-50 transition-colors"
            >
              {t.cancel || 'Cancel'}
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 bg-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              {isExporting ? 'Generating PDF...' : (t.export || 'Export PDF')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};