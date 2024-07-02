export const REGEXP_PATTERN: Record<string, RegExp> = {
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  LOGIN: /(?=^[a-zA-Z\d\-\_]{3,20}$)/,
  PHONE: /(?=^\+?\d{10,15}$)/,
  PASSWORD: /(?=^[A-ZА-Яа-яa-z\d.]{8,40}$)/,
  LETTERS: /[A-Z А-Я Ё][a-z а-я -]+$/,
  LETTERS_LATIN: /[A-Za-z]/,
  NUMBERS: /\d/,
  EXP_NUMBERS: /[^0-9\+]/,
};
