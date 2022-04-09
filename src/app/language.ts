export const languages = { en: 'EN', ru: 'RU'};

export type Language = keyof typeof languages;

export const defaultLanguage = 'en' as Language;
