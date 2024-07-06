import { FormInputProps } from '../ui/form-input/form-input';

export enum FIELDS_NAME {
  OLD_PASSWORD = 'old_password',
  NEW_PASSWORD = 'new_password',
  REPEAT_NEW_PASSWORD = 'repeat_new_password',
  EMAIL = 'email',
  LOGIN = 'login',
  FIRST_NAME = 'first_name',
  SECOND_NAME = 'second_name',
  PHONE = 'phone',
  PASSWORD = 'password',
  REPEAT_PASSWORD = 'repeatPassword',
}

// TODO: Использовать в sign-in\-up и profile как деструктор в константах fields
export const FIELDS: Record<FIELDS_NAME, FormInputProps> = {
  [FIELDS_NAME.OLD_PASSWORD]: {
    id: FIELDS_NAME.OLD_PASSWORD,
    name: FIELDS_NAME.OLD_PASSWORD,
    type: 'password',
    label: 'Старый пароль',
    validateOn: ['blur'],
    feedbackErrorText: 'Некорректный пароль',
  },
  [FIELDS_NAME.NEW_PASSWORD]: {
    id: FIELDS_NAME.NEW_PASSWORD,
    name: FIELDS_NAME.NEW_PASSWORD,
    type: 'password',
    label: 'Новый пароль',
    validateOn: ['blur'],
    feedbackErrorText: 'Некорректный пароль',
  },
  [FIELDS_NAME.REPEAT_NEW_PASSWORD]: {
    id: FIELDS_NAME.REPEAT_NEW_PASSWORD,
    name: FIELDS_NAME.REPEAT_NEW_PASSWORD,
    type: 'password',
    label: 'Повторите новый пароль',
    feedbackErrorText: 'Пароли не совпадают',
    validateOn: ['blur'],
  },
  [FIELDS_NAME.EMAIL]: {
    id: FIELDS_NAME.EMAIL,
    name: FIELDS_NAME.EMAIL,
    type: 'email',
    label: 'E-mail',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректный E-mail',
  },
  [FIELDS_NAME.LOGIN]: {
    id: FIELDS_NAME.LOGIN,
    name: FIELDS_NAME.LOGIN,
    type: 'text',
    label: 'Логин',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректный логин',
  },
  [FIELDS_NAME.FIRST_NAME]: {
    id: FIELDS_NAME.FIRST_NAME,
    name: FIELDS_NAME.FIRST_NAME,
    type: 'text',
    label: 'Имя',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректное имя',
  },
  [FIELDS_NAME.SECOND_NAME]: {
    id: FIELDS_NAME.SECOND_NAME,
    name: FIELDS_NAME.SECOND_NAME,
    type: 'text',
    label: 'Фамилия',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректная фамилия',
  },
  [FIELDS_NAME.PHONE]: {
    id: FIELDS_NAME.PHONE,
    name: FIELDS_NAME.PHONE,
    type: 'phone',
    label: 'Телефон',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректный формат номера телефона',
  },
  [FIELDS_NAME.PASSWORD]: {
    id: FIELDS_NAME.PASSWORD,
    name: FIELDS_NAME.PASSWORD,
    type: 'password',
    label: 'Пароль',
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: 'Некорректный пароль',
  },
  [FIELDS_NAME.REPEAT_PASSWORD]: {
    id: FIELDS_NAME.REPEAT_PASSWORD,
    name: FIELDS_NAME.REPEAT_PASSWORD,
    type: 'password',
    label: 'Повторите пароль',
    feedbackErrorText: 'Пароли не совпадают',
  },
};
