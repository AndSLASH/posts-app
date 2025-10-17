import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage, type Lang } from './language';

export const AVAILABLE_LANGS: { code: Lang; label: string }[] = [
  { code: 'ua', label: 'Ukr' },
  { code: 'en', label: 'Eng' },
];

export function useLanguage() {
  const { i18n } = useTranslation();

  const setLang = useCallback(async (lang: Lang) => {
    await changeLanguage(lang);
  }, []);

  return {
    lang: (i18n.language || 'ua') as Lang,
    setLang,
    available: AVAILABLE_LANGS,
  };
}
