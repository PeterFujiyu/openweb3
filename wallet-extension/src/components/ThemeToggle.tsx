import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore, type Theme } from '../store/useThemeStore';
import { useTranslation } from 'react-i18next';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const { t } = useTranslation();

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun size={16} />, label: t('theme.light') },
    { value: 'dark', icon: <Moon size={16} />, label: t('theme.dark') },
    { value: 'system', icon: <Monitor size={16} />, label: t('theme.system') },
  ];

  return (
    <div className="flex items-center space-x-1 bg-uniswap-card dark:bg-uniswap-card light:bg-light-card rounded-lg p-1">
      {themes.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
            theme === value
              ? 'bg-uniswap-pink text-white'
              : 'text-uniswap-text-secondary dark:text-uniswap-text-secondary light:text-light-text-secondary hover:text-white dark:hover:text-white light:hover:text-light-text-primary'
          }`}
          title={label}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};