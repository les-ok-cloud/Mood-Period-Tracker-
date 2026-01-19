import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CalendarDaysIcon, HomeIcon, UserIcon, BookIcon, SparklesIcon } from './Icons';

export type TabType = 'log' | 'year' | 'practices' | 'diary' | 'profile';

interface BottomTabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  {
    id: 'year' as TabType,
    icon: CalendarDaysIcon,
    getLabel: (t: any) => t.yearView,
  },
  {
    id: 'log' as TabType,
    icon: HomeIcon,
    getLabel: (t: any) => 'Log',
    isSpecial: true,
  },
  {
    id: 'practices' as TabType,
    icon: SparklesIcon,
    getLabel: (t: any) => 'Practices',
  },
  {
    id: 'diary' as TabType,
    icon: BookIcon,
    getLabel: (t: any) => t.microDiary,
  },
  {
    id: 'profile' as TabType,
    icon: UserIcon,
    getLabel: (t: any) => 'You',
  },
];

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabChange }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-4 py-2 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(({ id, icon: Icon, getLabel, isSpecial }) => {
          const isActive = activeTab === id;
          const label = getLabel(t);

          if (isSpecial) {
            // Special styling for Log tab (middle tab)
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`
                  flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-full transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg transform scale-110 ring-4 ring-purple-200'
                    : 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-md hover:shadow-lg hover:scale-105'
                  }
                `}
                aria-pressed={isActive}
                aria-label={`${label} tab`}
              >
                <Icon className="w-6 h-6" />
                <span className={`text-xs font-semibold leading-tight ${
                  isActive ? 'text-white' : 'text-white'
                }`}>
                  {label}
                </span>
              </button>
            );
          }

          // Regular styling for other tabs
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`
                flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[4rem] max-w-[6rem]
                ${isActive
                  ? 'bg-purple-100 text-purple-700 transform scale-105'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }
              `}
              aria-pressed={isActive}
              aria-label={`${label} tab`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-slate-500'}`} />
              <span className={`text-xs font-medium leading-tight break-words text-center ${
                isActive ? 'text-purple-700 font-semibold' : 'text-slate-600'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};