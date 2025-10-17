import i18n from 'i18next';

export type Lang = 'ua' | 'en';

export const changeLanguage = async (lang: Lang) => {
  try {
    await i18n.changeLanguage(lang);
    try {
      localStorage.setItem('i18nextLng', lang);
    } catch {
      // ignore
    }
    try {
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  } catch (err) {
    console.error('language change failed', err);
  }
};
