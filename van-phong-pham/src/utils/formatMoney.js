import i18n from '~/i18n';   

const LANG_TO_CURRENCY = {
  vi: 'VND', 
  en: 'USD', 
  ja: 'JPY', 
  fr: 'EUR', 
  de: 'EUR',
  ko: 'KRW',
  zh: 'CNY',
  th: 'THB',
};

function getCurrencyByLang(lang = i18n.language) {
  const shortLang = lang.split('-')[0]; // ví dụ: en-US → en
  return LANG_TO_CURRENCY[shortLang] || 'VND';
}

function formatMoney(number, currency = getCurrencyByLang()) {
  if (typeof number !== 'number' || isNaN(number)) {
    return '0';
  }

  const locale = i18n.language || 'en'; // ví dụ: vi, en-US, ja

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2, // dùng nếu số là 1.5, 1.99,...
  });

  return formatter.format(number);
}


export default formatMoney;

