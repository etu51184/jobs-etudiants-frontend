import React, { useState } from 'react';
import { useLang } from '../contexts/LanguageContext.jsx';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  ];

  const currentLang = languages.find(l => l.code === lang);

  return (
    <div className="lang-switcher-container">
      <button
        className="lang-switcher-btn"
        onClick={() => setOpen(prev => !prev)}
      >
        <span>{currentLang.flag}</span> {currentLang.label}
      </button>
      {open && (
        <ul className="lang-dropdown">
          {languages.map(l => (
            <li key={l.code}>
              <button
                className="lang-option"
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
              >
                <span>{l.flag}</span> {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
