import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    lng: 'ua',
    fallbackLng: ['ua', 'en'],
    debug: true,
    ns: ['home', 'header', 'chips', 'posts', 'post', 'chip'],
    defaultNS: 'home',
    backend: {
      // load from the public/ root so Vite serves it correctly
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
