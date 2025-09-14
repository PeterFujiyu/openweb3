import { create } from 'zustand';
import i18n from '../i18n';

export type Language = 'en' | 'zh';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (language: Language) => {
    set({ language });
    i18n.changeLanguage(language);
  },
}));