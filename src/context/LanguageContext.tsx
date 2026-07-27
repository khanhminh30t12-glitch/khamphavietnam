import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, BilingualText } from '@/types';
import { translations, TranslationKey } from '@/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: BilingualText) => string;
  tr: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('vi');

  useEffect(() => {
    const savedLang = localStorage.getItem('app_language') as Language;
    if (savedLang === 'vi' || savedLang === 'en') {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (text: BilingualText): string => {
    if (!text) return '';
    return text[language] || text.vi || '';
  };

  const tr = (key: string): string => {
    const dict = translations[language] || translations.vi;
    const typedKey = key as TranslationKey;
    if (dict[typedKey]) {
      return dict[typedKey];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
