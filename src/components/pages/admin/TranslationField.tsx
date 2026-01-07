import React, { useState } from 'react';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface TranslationFieldProps {
  label: string;
  value: string;
  valueRu?: string;
  valueEn?: string;
  onChange: (value: string) => void;
  onChangeRu?: (value: string) => void;
  onChangeEn?: (value: string) => void;
  placeholder?: string;
  placeholderRu?: string;
  placeholderEn?: string;
  textarea?: boolean;
  rows?: number;
  required?: boolean;
}

const TranslationField: React.FC<TranslationFieldProps> = ({
  label,
  value,
  valueRu = '',
  valueEn = '',
  onChange,
  onChangeRu,
  onChangeEn,
  placeholder = '',
  placeholderRu = '',
  placeholderEn = '',
  textarea = false,
  rows = 2,
  required = false
}) => {
  const [showTranslations, setShowTranslations] = useState(false);

  const renderInput = (lang: 'am' | 'ru' | 'en', val: string, placeholderText: string, changeHandler?: (value: string) => void) => {
    const langLabels = {
      am: { label: 'Հայերեն', color: 'border-blue-200 bg-blue-50' },
      ru: { label: 'Русский', color: 'border-red-200 bg-red-50' },
      en: { label: 'English', color: 'border-green-200 bg-green-50' }
    };

    if (textarea) {
      return (
        <textarea
          value={val}
          onChange={(e) => changeHandler?.(e.target.value)}
          rows={rows}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent ${langLabels[lang].color}`}
          placeholder={placeholderText}
          required={required && lang === 'am'}
        />
      );
    }

    return (
      <input
        type="text"
        value={val}
        onChange={(e) => changeHandler?.(e.target.value)}
        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0E99A2] focus:border-transparent ${langLabels[lang].color}`}
        placeholder={placeholderText}
        required={required && lang === 'am'}
      />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {(onChangeRu || onChangeEn) && (
          <button
            type="button"
            onClick={() => setShowTranslations(!showTranslations)}
            className="flex items-center gap-2 text-sm text-[#0E99A2] hover:text-[#0d8a92]"
          >
            <Globe className="w-4 h-4" />
            Translations
            {showTranslations ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Armenian (Primary) */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">ՀԱՅ</span>
          <span className="text-sm text-gray-600">Armenian</span>
        </div>
        {renderInput('am', value, placeholder, onChange)}
      </div>

      {/* Translations */}
      {(onChangeRu || onChangeEn) && showTranslations && (
        <div className="space-y-4 pl-4 border-l-2 border-gray-200">
          {/* Russian */}
          {onChangeRu && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">РУС</span>
                <span className="text-sm text-gray-600">Russian</span>
              </div>
              {renderInput('ru', valueRu, placeholderRu, onChangeRu)}
            </div>
          )}

          {/* English */}
          {onChangeEn && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">ENG</span>
                <span className="text-sm text-gray-600">English</span>
              </div>
              {renderInput('en', valueEn, placeholderEn, onChangeEn)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TranslationField;