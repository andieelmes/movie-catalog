export const languages = { en: 'EN', ru: 'РУ'};

export type Language = keyof typeof languages;

export const defaultLanguage = 'en' as Language;
