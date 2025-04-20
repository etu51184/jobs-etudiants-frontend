import React from 'react';
import { useLang } from '../contexts/LanguageContext.jsx';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const langs = ['en', 'fr', 'nl'];
  const currentIndex = langs.indexOf(lang);
  const nextLang = langs[(currentIndex + 1) % langs.length];

  return (
    <button
      className="lang-switcher"
      onClick={() => setLang(nextLang)}
    >
      {nextLang.toUpperCase()}
    </button>
  );
}
