import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface InputWithLimitProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  maxLength?: number;
  showHelperAt?: number;
}

export const InputWithLimit: React.FC<InputWithLimitProps> = ({
  value,
  onChange,
  placeholder,
  className = '',
  type = 'text',
  maxLength = 200,
  showHelperAt = 180,
}) => {
  const { t } = useLanguage();
  const [showHelper, setShowHelper] = useState(false);

  // Update helper visibility based on character count
  useEffect(() => {
    setShowHelper(value.length >= showHelperAt);
  }, [value.length, showHelperAt]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Prevent typing beyond max length
    if (newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-1">
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${className} overflow-wrap-break-word word-break-break-word`}
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