import { REGEXP_PATTERN } from "../constants";

export const emailValidator = (value: string): boolean => {
  return REGEXP_PATTERN.EMAIL.test(value);
};

export const loginValidator = (value: string): boolean => {
  const regExp = /^[a-zA-Z0-9-_]+$/;
  const checkValue = regExp.test(value);
  const valueHasLetters = /[a-zA-Z]/g.test(value);

  return value.length > 2 && value.length < 21 && checkValue && valueHasLetters;
};

export const nameValidator = (value: string): boolean => {
  const regExp = /^[a-zA-Zа-яА-Я-]+$/;
  const checkValue = regExp.test(value);
  const firstLetter = /[A-ZА-Я]/g.test(value[0]);

  return checkValue && firstLetter;
};

export const phoneValidator = (value: string): boolean => {
  const regExp = /^[+]*[0-9]{10,15}$/;
  const checkValue = regExp.test(value);

  return checkValue;
};

export const passwordValidator = (value: string): boolean => {
  const valueHasLetters = /[A-ZА-Я]/g.test(value);
  const valueHasNumbers = /[0-9]/g.test(value);

  return (
    value.length > 7 && value.length < 41 && valueHasNumbers && valueHasLetters
  );
};

export const passwordRepeatedValidator = (
  value: string,
  oldValue: string
): boolean => {
  return value === oldValue;
};

export const emptyValidator = (value: string): boolean => {
  return value !== "";
};
