import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { ReflectionEntry } from '../types';
import { getFormattedDate } from '../utils/dateUtils';
import { BookIcon, HeartIcon, SparklesIcon, ClockIcon, NewspaperIcon } from './Icons';

interface Practice {
  id: string;
  name: string;
  description: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export const Practices: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);

  const practices: Practice[] = [
    {
      id: 'reflection',
      name: t.dailyReflection,
      description: t.dailyReflectionDesc,
      time: t.dailyReflectionTime,
      icon: BookIcon,
      color: 'text-purple-600'
    },
    {
      id: 'gratitude',
      name: t.gratitudePractice,
      description: t.gratitudePracticeDesc,
      time: t.gratitudePracticeTime,
      icon: HeartIcon,
      color: 'text-pink-600'
    },
    {
      id: 'influencers',
      name: t.moodInfluencers,
      description: t.moodInfluencersDesc,
      time: t.moodInfluencersTime,
      icon: SparklesIcon,
      color: 'text-blue-600'
    },
    {
      id: 'reset',
      name: t.oneMinuteReset,
      description: t.oneMinuteResetDesc,
      time: t.oneMinuteResetTime,
      icon: ClockIcon,
      color: 'text-green-600'
    },
    {
      id: 'reading',
      name: t.helpfulReading,
      description: t.helpfulReadingDesc,
      time: t.helpfulReadingTime,
      icon: NewspaperIcon,
      color: 'text-orange-600'
    }
  ];

  if (selectedPractice) {
    return <PracticeDetail practiceId={selectedPractice} onBack={() => setSelectedPractice(null)} />;
  }

  return (
    <div className="bg-gradient-to-b from-sky-50 to-cyan-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-5 lg:p-6 max-w-5xl safe-bottom">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-700 mb-2">{t.practices}</h1>
          <p className="text-slate-600">{t.practicesSubtitle}</p>
        </div>

        <div className="space-y-4">
          {practices.map((practice) => (
            <PracticeCard
              key={practice.id}
              practice={practice}
              onClick={() => setSelectedPractice(practice.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PracticeCardProps {
  practice: Practice;
  onClick: () => void;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ practice, onClick }) => {
  const Icon = practice.icon;

  return (
    <button
      onClick={onClick}
      className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-100/80 p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02] text-left"
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-slate-50 ${practice.color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-700 mb-1">{practice.name}</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">{practice.description}</p>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">{practice.time}</span>
          </div>
        </div>
        <div className="text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
};

interface PracticeDetailProps {
  practiceId: string;
  onBack: () => void;
}

const PracticeDetail: React.FC<PracticeDetailProps> = ({ practiceId, onBack }) => {
  const { t } = useLanguage();

  // For now, we'll redirect to the appropriate existing screens
  React.useEffect(() => {
    if (practiceId === 'reflection') {
      // This would navigate to the diary tab, but for now we'll show a placeholder
      // In a real implementation, you'd use navigation logic
    }
  }, [practiceId]);

  const renderPracticeContent = () => {
    switch (practiceId) {
      case 'reflection':
        return <MicroDiaryContent onBack={onBack} />;

      case 'gratitude':
        return <GratitudePractice onBack={onBack} />;

      case 'influencers':
        return <MoodInfluencersPractice onBack={onBack} />;

      case 'reset':
        return <OneMinuteResetPractice onBack={onBack} />;

      case 'reading':
        return <HelpfulReadingPractice onBack={onBack} />;

      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 to-cyan-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-5 lg:p-6 max-w-5xl safe-bottom">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.backToPractices}
        </button>

        {renderPracticeContent()}
      </div>
    </div>
  );
};

// Individual practice components
const GratitudePractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  const [gratitude1, setGratitude1] = useState('');
  const [gratitude2, setGratitude2] = useState('');
  const [gratitude3, setGratitude3] = useState('');

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <HeartIcon className="w-16 h-16 text-pink-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-2">{t.gratitudePractice}</h2>
        <p className="text-slate-600">Take a moment to notice three things you're grateful for today.</p>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">1.</label>
          <input
            type="text"
            value={gratitude1}
            onChange={(e) => setGratitude1(e.target.value)}
            placeholder="Something you're grateful for..."
            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">2.</label>
          <input
            type="text"
            value={gratitude2}
            onChange={(e) => setGratitude2(e.target.value)}
            placeholder="Another thing you're grateful for..."
            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">3.</label>
          <input
            type="text"
            value={gratitude3}
            onChange={(e) => setGratitude3(e.target.value)}
            placeholder="One more thing you're grateful for..."
            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all duration-200"
          />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onBack}
          className="bg-pink-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors"
        >
          {t.backToPractices}
        </button>
      </div>
    </div>
  );
};

const MoodInfluencersPractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);

  const influencers = [
    'Sleep quality',
    'Stress levels',
    'Food intake',
    'Exercise',
    'Hormones',
    'People around me',
    'Weather',
    'Work/school',
    'Other'
  ];

  const toggleInfluencer = (influencer: string) => {
    setSelectedInfluencers(prev =>
      prev.includes(influencer)
        ? prev.filter(i => i !== influencer)
        : [...prev, influencer]
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <SparklesIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-2">{t.moodInfluencers}</h2>
        <p className="text-slate-600">Check what might have influenced your mood today.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {influencers.map((influencer) => (
          <button
            key={influencer}
            onClick={() => toggleInfluencer(influencer)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              selectedInfluencers.includes(influencer)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            {influencer}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onBack}
          className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t.backToPractices}
        </button>
      </div>
    </div>
  );
};

const OneMinuteResetPractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  const steps = [
    "Find a comfortable position and close your eyes.",
    "Take a deep breath in through your nose for 4 seconds.",
    "Hold your breath for 4 seconds.",
    "Exhale slowly through your mouth for 6 seconds.",
    "Repeat 3-4 times, or as long as feels comfortable."
  ];

  React.useEffect(() => {
    if (step > 0 && step < steps.length) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 4000); // 4 seconds per step
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <ClockIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-2">{t.oneMinuteReset}</h2>
        <p className="text-slate-600">A simple breathing exercise to reset and find calm.</p>
      </div>

      {step === 0 ? (
        <div className="text-center">
          <button
            onClick={() => setStep(1)}
            className="bg-green-600 text-white font-medium py-4 px-8 rounded-lg hover:bg-green-700 transition-colors text-lg"
          >
            Start 1-Minute Reset
          </button>
        </div>
      ) : step <= steps.length ? (
        <div className="text-center">
          <div className="text-4xl font-light text-slate-700 mb-4">
            {step}/{steps.length}
          </div>
          <p className="text-xl text-slate-700 leading-relaxed mb-8">
            {steps[step - 1]}
          </p>
          {step === steps.length && (
            <button
              onClick={onBack}
              className="bg-green-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-green-700 transition-colors"
            >
              {t.backToPractices}
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

const HelpfulReadingPractice: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useLanguage();

  const articles = [
    {
      title: 'The Science of Gratitude',
      url: 'https://www.healthline.com/health/gratitude',
      description: 'Research-backed benefits of practicing gratitude daily.'
    },
    {
      title: 'Understanding Your Emotions',
      url: 'https://www.psychologytoday.com/us/basics/emotions',
      description: 'Learn about different emotions and how to work with them.'
    },
    {
      title: 'The Power of Deep Breathing',
      url: 'https://www.healthline.com/health/benefits-of-deep-breathing',
      description: 'Simple breathing techniques for stress relief and calm.'
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <NewspaperIcon className="w-16 h-16 text-orange-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-700 mb-2">{t.helpfulReading}</h2>
        <p className="text-slate-600">Curated articles to support your mood and self-care journey.</p>
      </div>

      <div className="space-y-4 mb-8">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
            <h3 className="font-semibold text-slate-700 mb-2">{article.title}</h3>
            <p className="text-slate-600 text-sm mb-3">{article.description}</p>
            <button
              onClick={() => window.open(article.url, '_blank')}
              className="text-orange-600 hover:text-orange-700 underline text-sm font-medium"
            >
              Read Article →
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onBack}
          className="bg-orange-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-orange-700 transition-colors"
        >
          {t.backToPractices}
        </button>
      </div>
    </div>
  );
};

// MicroDiary Content Component - adapted for Practices context
const MicroDiaryContent: React.FC<{ onBack: () => void }> = ({ onBack }) => {
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Today's Reflection */}
      <div className="mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md p-6">
          <p className="text-slate-700 leading-relaxed mb-6">
            <span className="font-bold text-purple-600 text-base">{t.reflectionExplanationTitle}</span>
            <span className="text-slate-600 text-sm">{t.reflectionExplanationText}</span>
          </p>
          <button
            onClick={() => window.open('https://share.google/HtUk1pvQIj9LKkR0G', '_blank')}
            className="text-purple-600 hover:text-purple-700 underline text-sm font-medium mb-6 block"
          >
            {t.reflectionLearnMore}
          </button>

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
                className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 resize-none text-slate-700"
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
                className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all duration-200 resize-none text-slate-700"
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
          <h2 className="text-xl font-bold text-slate-700 mb-6">{t.reflectionHistory}</h2>

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

      <div className="text-center mb-6">
        <button
          onClick={onBack}
          className="bg-purple-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors"
        >
          {t.backToPractices}
        </button>
      </div>
    </div>
  );
};