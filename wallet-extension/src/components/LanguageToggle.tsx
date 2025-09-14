import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguageStore, type Language } from '../store/useLanguageStore';
import { useTranslation } from 'react-i18next';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const languages: { value: Language; label: string }[] = [
    { value: 'en', label: t('language.english') },
    { value: 'zh', label: t('language.chinese') },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary hover:text-white dark:hover:text-white light:hover:text-light-text-primary transition-colors">
        <Languages size={20} />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.value === language)?.label}
        </span>
      </button>
      
      <div className="absolute right-0 top-8 hidden group-hover:block z-10">
        <div className="bg-uniswap-card dark:bg-uniswap-card light:bg-light-card rounded-lg shadow-lg border border-uniswap-surface dark:border-uniswap-surface light:border-light-surface p-1 min-w-[120px]">
          {languages.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setLanguage(value)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                language === value
                  ? 'bg-uniswap-pink text-white'
                  : 'text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary hover:bg-uniswap-surface dark:hover:bg-uniswap-surface light:hover:bg-light-surface hover:text-white dark:hover:text-white light:hover:text-light-text-primary'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};