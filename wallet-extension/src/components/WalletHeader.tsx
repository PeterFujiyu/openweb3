import React from 'react';
import { Zap, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';

export const WalletHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between p-4 border-b border-uniswap-card dark:border-uniswap-card light:border-light-surface">
      <div className="flex items-center space-x-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" 
            stroke="#FF007A" 
            strokeWidth="2"
          />
          <path 
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" 
            fill="#FF007A" 
            fillOpacity="0.3"
          />
        </svg>
        <span className="text-sm font-semibold text-uniswap-text-primary dark:text-uniswap-text-primary light:text-light-text-primary">
          {t('wallet.title')}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <LanguageToggle />
        <Zap 
          size={20} 
          className="text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary cursor-pointer hover:text-white dark:hover:text-white light:hover:text-light-text-primary transition-colors" 
        />
        <X 
          size={20} 
          className="text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary cursor-pointer hover:text-white dark:hover:text-white light:hover:text-light-text-primary transition-colors" 
        />
      </div>
    </header>
  );
};