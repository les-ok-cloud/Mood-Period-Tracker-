import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SimpleHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SimpleHeader: React.FC<SimpleHeaderProps> = ({
  title,
  subtitle,
  className = ''
}) => {
  const { isRTL } = useLanguage();

  return (
    <header className={`py-6 mb-6 ${className}`}>
      <div className="text-center">
        <h1
          className="text-2xl sm:text-3xl font-semibold text-purple-400 mb-3 leading-tight text-center"
          style={{
            animation: 'headerFadeIn 250ms ease-out forwards',
            opacity: 0,
            transform: 'translateY(4px)'
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-4 opacity-75 text-center"
            style={{
              animation: 'headerFadeIn 250ms ease-out 100ms forwards',
              opacity: 0,
              transform: 'translateY(4px)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      <style>{`
        @keyframes headerFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};