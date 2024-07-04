import { FormInputProps } from "../../../../shared/ui/form-input/form-input";

export enum SIGN_IN_FORM_FIELDS_NAME {
  LOGIN = "login",
  PASSWORD = "password",
}

export const SIGN_IN_FORM_FIELDS: Record<
  SIGN_IN_FORM_FIELDS_NAME,
  FormInputProps
> = {
  [SIGN_IN_FORM_FIELDS_NAME.LOGIN]: {
    id: SIGN_IN_FORM_FIELDS_NAME.LOGIN,
    name: SIGN_IN_FORM_FIELDS_NAME.LOGIN,
    type: "text",
    label: "Логин",
  },
  [SIGN_IN_FORM_FIELDS_NAME.PASSWORD]: {
    id: SIGN_IN_FORM_FIELDS_NAME.PASSWORD,
    name: SIGN_IN_FORM_FIELDS_NAME.PASSWORD,
    type: "password",
    label: "Пароль",
    feedbackErrorText: 'Неверный логин или пароль'
  },
};
