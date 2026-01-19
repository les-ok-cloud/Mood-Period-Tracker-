import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface TextareaWithLimitProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  maxLength?: number;
  showHelperAt?: number;
}

export const TextareaWithLimit: React.FC<TextareaWithLimitProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  rows = 2,
  maxLength = 200,
  showHelperAt = 180,
}) => {
  const { t } = useLanguage();
  const [showHelper, setShowHelper] = useState(false);

  // Update helper visibility based on character count
  useEffect(() => {
    setShowHelper(value.length >= showHelperAt);
  }, [value.length, showHelperAt]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    // Prevent typing beyond max length
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-1">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${className} resize-none`}
        rows={rows}
      />
      <div className="flex justify-between items-center text-xs text-slate-500">
        <div className={`transition-opacity duration-300 ${showHelper ? 'opacity-100' : 'opacity-0'}`}>
          {showHelper && t.shortNotesEnough}
        </div>
        <div className="ml-auto">
          {value.length} / {maxLength}
        </div>
      </div>
    </div>
  );
};