import { FormInputProps } from '../../../../shared/ui/form-input/form-input';
import {
  emailValidator,
  loginValidator,
  nameValidator,
  phoneValidator,
  passwordValidator,
} from '../../../../shared/utils';

export enum SIGN_UP_FORM_FIELDS_NAME {
  EMAIL = 'email',
  LOGIN = 'login',
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  PHONE = 'phone',
  PASSWORD = 'password',
  REPEAT_PASSWORD = 'repeatPassword',
}

export const SIGN_UP_FORM_FIELDS: Record<
  SIGN_UP_FORM_FIELDS_NAME,
  FormInputProps
> = {
  [SIGN_UP_FORM_FIELDS_NAME.EMAIL]: {
    id: SIGN_UP_FORM_FIELDS_NAME.EMAIL,
    name: SIGN_UP_FORM_FIELDS_NAME.EMAIL,
    type: 'email',
    label: 'E-mail',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректный E-mail',
    validator: emailValidator,
  },
  [SIGN_UP_FORM_FIELDS_NAME.LOGIN]: {
    id: SIGN_UP_FORM_FIELDS_NAME.LOGIN,
    name: SIGN_UP_FORM_FIELDS_NAME.LOGIN,
    type: 'text',
    label: 'Логин',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректный логин',
    validator: loginValidator,
  },
  [SIGN_UP_FORM_FIELDS_NAME.FIRST_NAME]: {
    id: SIGN_UP_FORM_FIELDS_NAME.FIRST_NAME,
    name: SIGN_UP_FORM_FIELDS_NAME.FIRST_NAME,
    type: 'text',
    label: 'Имя',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректное имя',
    validator: nameValidator,
  },
  [SIGN_UP_FORM_FIELDS_NAME.SECOND_NAME]: {
    id: SIGN_UP_FORM_FIELDS_NAME.SECOND_NAME,
    name: SIGN_UP_FORM_FIELDS_NAME.SECOND_NAME,
    type: 'text',
    label: 'Фамилия',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректная фамилия',
    validator: nameValidator,
  },
  [SIGN_UP_FORM_FIELDS_NAME.PHONE]: {
    id: SIGN_UP_FORM_FIELDS_NAME.PHONE,
    name: SIGN_UP_FORM_FIELDS_NAME.PHONE,
    type: 'phone',
    label: 'Телефон',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректный формат номера телефона',
    validator: phoneValidator,
  },
  [SIGN_UP_FORM_FIELDS_NAME.PASSWORD]: {
    id: SIGN_UP_FORM_FIELDS_NAME.PASSWORD,
    name: SIGN_UP_FORM_FIELDS_NAME.PASSWORD,
    type: 'password',
    label: 'Пароль',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректный пароль',
    validator: passwordValidator,
  },
  [SIGN_UP_FORM_FIELDS_NAME.REPEAT_PASSWORD]: {
    id: SIGN_UP_FORM_FIELDS_NAME.REPEAT_PASSWORD,
    name: SIGN_UP_FORM_FIELDS_NAME.REPEAT_PASSWORD,
    type: 'password',
    label: 'Повторите пароль',
    feedbackErrorText: 'Пароли не совпадают',
  },
};
