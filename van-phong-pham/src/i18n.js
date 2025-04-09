// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationVI from './locales/vi/translation.json';

// cấu hình ngôn ngữ
const resources = {
  en: { translation: translationEN },
  vi: { translation: translationVI }
};

i18n
  .use(LanguageDetector) // tự phát hiện ngôn ngữ trình duyệt
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en', // nếu không xác định được ngôn ngữ, dùng English

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
