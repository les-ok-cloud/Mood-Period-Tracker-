import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { ReflectionEntry } from '../types';
import { getFormattedDate } from '../utils/dateUtils';

export const MicroDiary: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [reflections, setReflections] = useState<Record<string, ReflectionEntry>>({});
  const [goodFeeling, setGoodFeeling] = useState('');
  const [drainedEnergy, setDrainedEnergy] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const today = new Date();
  const todayKey = getFormattedDate(today);

  // Load reflections from localStorage
  useEffect(() => {
    const savedReflections = localStorage.getItem('moodTrackerReflections');
    if (savedReflections) {
      try {
        setReflections(JSON.parse(savedReflections));
      } catch (error) {
        console.error('Error loading reflections:', error);
      }
    }
  }, []);

  // Load today's reflection if it exists
  useEffect(() => {
    const todayReflection = reflections[todayKey];
    if (todayReflection) {
      setGoodFeeling(todayReflection.goodFeeling || '');
      setDrainedEnergy(todayReflection.drainedEnergy || '');
    }
  }, [reflections, todayKey]);

  const saveReflection = async () => {
    if (!goodFeeling.trim() && !drainedEnergy.trim()) return;

    setIsSaving(true);

    const newReflection: ReflectionEntry = {
      date: todayKey,
      goodFeeling: goodFeeling.trim() || undefined,
      drainedEnergy: drainedEnergy.trim() || undefined,
    };

    const updatedReflections = {
      ...reflections,
      [todayKey]: newReflection,
    };

    setReflections(updatedReflections);
    localStorage.setItem('moodTrackerReflections', JSON.stringify(updatedReflections));

    setIsSaving(false);
    setSavedMessage(t.reflectionSaved);

    // Clear saved message after 3 seconds
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const getSortedReflections = () => {
    return Object.values(reflections).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleExportAll = () => {
    const data = getSortedReflections();
    exportToPDF(data, `All Reflections - ${new Date().toISOString().split('T')[0]}`);
  };

  const exportToPDF = async (data: ReflectionEntry[], filename: string) => {
    try {
      // For now, we'll use a simple text export
      // In a real implementation, you'd use a PDF library like jsPDF
      const content = data.map(reflection => {
        let text = `Date: ${formatDate(reflection.date)}\n`;
        if (reflection.goodFeeling) {
          text += `What made you feel good: ${reflection.goodFeeling}\n`;
        }
        if (reflection.drainedEnergy) {
          text += `What drained your energy: ${reflection.drainedEnergy}\n`;
        }
        text += '\n';
        return text;
      }).join('');

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 to-cyan-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-5 lg:p-6 max-w-5xl">
        {/* Today's Reflection */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6">
            <div className="text-slate-700 leading-relaxed mb-6">
              <p>
                <span className="font-bold text-purple-600 text-base">{t.reflectionExplanationTitle}</span>
                <span className="text-slate-600 text-sm">{t.reflectionExplanationText}</span>
              </p>
              <p className="mt-2">
                <button
                  onClick={() => window.open('https://share.google/HtUk1pvQIj9LKkR0G', '_blank')}
                  className="text-purple-600 hover:text-purple-700 underline text-sm font-medium"
                >
                  {t.reflectionLearnMore}
                </button>
              </p>
            </div>

            <h2 className="text-xl font-bold text-slate-700 mb-4">{t.todaysReflection}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  {t.reflectionPrompt1}
                </label>
                <textarea
                  value={goodFeeling}
                  onChange={(e) => setGoodFeeling(e.target.value)}
                  placeholder="Optional - share what brought you joy today..."
                  className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 resize-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  {t.reflectionPrompt2}
                </label>
                <textarea
                  value={drainedEnergy}
                  onChange={(e) => setDrainedEnergy(e.target.value)}
                  placeholder="Optional - share what challenged you today..."
                  className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 resize-none"
                  rows={2}
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={saveReflection}
                  disabled={isSaving || (!goodFeeling.trim() && !drainedEnergy.trim())}
                  className="bg-purple-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving ? 'Saving...' : 'Save Reflection'}
                </button>

                {savedMessage && (
                  <span className="text-sm text-green-600 font-medium">{savedMessage}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reflection History */}
        <div className="mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-700">{t.reflectionHistory}</h2>
              {Object.keys(reflections).length > 0 && (
                <button
                  onClick={handleExportAll}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  {t.exportReflections}
                </button>
              )}
            </div>

            {Object.keys(reflections).length === 0 ? (
              <p className="text-slate-500 text-center py-8">{t.noReflections}</p>
            ) : (
              <div className="space-y-4">
                {getSortedReflections().map((reflection) => (
                  <div key={reflection.date} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-slate-700">{formatDate(reflection.date)}</h3>
                    </div>

                    {reflection.goodFeeling && (
                      <div className="mb-3">
                        <p className="text-sm font-medium text-green-700 mb-1">{t.reflectionPrompt1}</p>
                        <p className="text-slate-600 leading-relaxed">{reflection.goodFeeling}</p>
                      </div>
                    )}

                    {reflection.drainedEnergy && (
                      <div>
                        <p className="text-sm font-medium text-orange-700 mb-1">{t.reflectionPrompt2}</p>
                        <p className="text-slate-600 leading-relaxed">{reflection.drainedEnergy}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};