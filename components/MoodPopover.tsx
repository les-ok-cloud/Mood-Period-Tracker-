import React, { useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { Mood, CycleFlow } from '../types';
import { MOOD_DATA, MOOD_ORDER, CYCLE_DATA, CYCLE_ORDER } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { WaterDrop } from './Icons';

interface MoodPopoverProps {
  targetElement: HTMLElement;
  onSelectMood: (mood: Mood) => void;
  onClose: () => void;
  showCycleTracker: boolean;
  onSelectCycle: (cycle: CycleFlow | null) => void;
  currentCycle: CycleFlow | null;
}

export const MoodPopover: React.FC<MoodPopoverProps> = ({ targetElement, onSelectMood, onClose, showCycleTracker, onSelectCycle, currentCycle }) => {
  const { t } = useLanguage();
  const popoverRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'fixed',
    opacity: 0, // Initially hidden to prevent flicker
    pointerEvents: 'none', // Prevent interaction until positioned
  });

  useLayoutEffect(() => {
    if (!popoverRef.current || !targetElement) return;

    const targetRect = targetElement.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;
    const gap = 16; // A safe space from the viewport edges

    const newStyle: React.CSSProperties = {
      position: 'fixed',
      zIndex: 50,
      opacity: 1,
      transition: 'opacity 0.1s ease-in',
      maxWidth: `calc(100vw - ${gap * 2}px)`, // Ensure it doesn't overflow horizontally
    };

    // Vertical positioning: prefer the side with more space
    const spaceAbove = targetRect.top;
    const spaceBelow = innerHeight - targetRect.bottom;
    if (spaceBelow >= popoverRect.height + gap || spaceBelow > spaceAbove) {
      newStyle.top = `${targetRect.bottom + 8}px`;
    } else {
      newStyle.bottom = `${innerHeight - targetRect.top + 8}px`;
    }

    // Horizontal positioning: center it, then clamp it within the viewport
    let left = targetRect.left + targetRect.width / 2 - popoverRect.width / 2;
    if (left + popoverRect.width > innerWidth - gap) {
      left = innerWidth - popoverRect.width - gap; // Adjust if overflowing right
    }
    if (left < gap) {
      left = gap; // Adjust if overflowing left
    }
    newStyle.left = `${left}px`;

    setStyle(newStyle);
  }, [targetElement]);


  const popoverContent = (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />
      <div
        ref={popoverRef}
        style={style}
        className="bg-white rounded-2xl shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up"
        role="dialog"
        aria-label="Select a mood or cycle flow"
      >
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {MOOD_ORDER.map((mood) => {
              const data = MOOD_DATA[mood];
              return (
                <div
                  key={mood}
                  onClick={() => onSelectMood(mood)}
                  className="flex flex-col items-center gap-1 sm:gap-2 cursor-pointer group w-16 sm:w-20 text-center"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectMood(mood)}
                >
                  <div className="text-4xl sm:text-5xl transition-transform duration-200 transform group-hover:scale-125">
                    {data.emoji}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-600">
                    {t[mood]}
                  </span>
                </div>
              );
            })}
        </div>
        {showCycleTracker && (
            <>
                <div className="border-t sm:border-l sm:border-t-0 border-slate-200 my-3 sm:my-0 sm:mx-3 self-stretch h-auto w-full sm:w-auto"></div>
                <div className="flex sm:flex-col gap-2 items-center">
                  {CYCLE_ORDER.map((flow) => {
                    const data = CYCLE_DATA[flow];
                    const isSelected = currentCycle === flow;
                    return (
                      <button
                        key={flow}
                        onClick={() => onSelectCycle(isSelected ? null : flow)}
                        className={`flex items-center justify-center gap-2 p-2 rounded-lg w-20 transition-colors duration-200 ${isSelected ? `${data.bgColor} ring-1 ${data.ringColor}` : 'bg-slate-50 hover:bg-slate-100'}`}
                        aria-pressed={isSelected}
                        aria-label={t[flow]}
                      >
                        {Array.from({ length: data.drops }).map((_, i) => (
                          <WaterDrop key={i} className="w-5 h-5" />
                        ))}
                      </button>
                    );
                  })}
                </div>
            </>
        )}
      </div>
    </>
  );

  return createPortal(popoverContent, document.body);
};
