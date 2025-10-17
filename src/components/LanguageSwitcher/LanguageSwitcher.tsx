import React from 'react';
import { useLanguage } from './useLanguage';

const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { lang, setLang, available } = useLanguage();

  return (
    <div className={className ?? 'flex items-center gap-2'}>
      {available.map(l => (
        <button
          key={l.code}
          className={`px-2 py-1 rounded ${
            lang === l.code ? 'font-bold underline' : 'opacity-80'
          }`}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          aria-label={`Switch language to ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
