import { useTranslation } from 'react-i18next';

const useI18n = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const lower = (key, options) => {
    const result = t(key, options);
    return result.toLowerCase();
  };

  return { t, i18n, changeLanguage, lower };
};

export default useI18n;
