import React, { createContext, useContext, useState } from 'react';
import ko from './ko.json';
import en from './en.json';
import ja from './ja.json';
import zh from './zh.json';

export const I18N_PACK = { ko, en, ja, zh };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ko');
  const t = I18N_PACK[lang] || I18N_PACK.ko;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, I18N_PACK }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
