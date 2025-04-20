import React from 'react';
import { useLang } from '../contexts/LanguageContext.jsx';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
      style={{
        background: 'none',
        border: 'none',
        color: '#00cc66',
        cursor: 'pointer',
        fontSize: '0.9rem'
      }}
    >
      {lang === 'en' ? 'FR' : 'EN'}
    </button>
  );
}
