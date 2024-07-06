import { FormInputProps } from "../../../../shared/ui/form-input/form-input";

import {
  emailValidator,
  loginValidator,
  nameValidator,
  phoneValidator,
} from "../../../../shared/utils";

export enum PROFILE_FIELDS_NAME {
  EMAIL = "email",
  LOGIN = "login",
  FIRST_NAME = "first_name",
  SECOND_NAME = "second_name",
  DISPLAY_NAME = "display_name",
  PHONE = "phone",
  AVATAR = "avatar",
}
export const PROFILE_FIELDS: Record<PROFILE_FIELDS_NAME, FormInputProps> = {
  [PROFILE_FIELDS_NAME.FIRST_NAME]: {
    id: PROFILE_FIELDS_NAME.FIRST_NAME,
    name: PROFILE_FIELDS_NAME.FIRST_NAME,
    type: "text",
    label: "Имя",
    validateOn: ["blur"],
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректное имя",
    validator: nameValidator,
  },
  [PROFILE_FIELDS_NAME.SECOND_NAME]: {
    id: PROFILE_FIELDS_NAME.SECOND_NAME,
    name: PROFILE_FIELDS_NAME.SECOND_NAME,
    type: "text",
    label: "Фамилия",
    validateOn: ["blur"],
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректное имя",
    validator: nameValidator,
  },
  [PROFILE_FIELDS_NAME.DISPLAY_NAME]: {
    id: PROFILE_FIELDS_NAME.DISPLAY_NAME,
    name: PROFILE_FIELDS_NAME.DISPLAY_NAME,
    type: "text",
    label: "Имя в чате",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректное имя",
    validator: nameValidator,
  },
  [PROFILE_FIELDS_NAME.EMAIL]: {
    id: PROFILE_FIELDS_NAME.EMAIL,
    name: PROFILE_FIELDS_NAME.EMAIL,
    type: "email",
    label: "E-mail",
    validateOn: ["blur"],
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректный E-mail",
    validator: emailValidator,
  },
  [PROFILE_FIELDS_NAME.LOGIN]: {
    id: PROFILE_FIELDS_NAME.LOGIN,
    name: PROFILE_FIELDS_NAME.LOGIN,
    type: "text",
    label: "Логин",
    validateOn: ["blur"],
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректный логин",
    validator: loginValidator,
  },
  [PROFILE_FIELDS_NAME.PHONE]: {
    id: PROFILE_FIELDS_NAME.PHONE,
    name: PROFILE_FIELDS_NAME.PHONE,
    type: "phone",
    label: "Телефон",
    validateOn: ["blur"],
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректный формат номера телефона",
    validator: phoneValidator,
  },
  [PROFILE_FIELDS_NAME.AVATAR]: {
    id: PROFILE_FIELDS_NAME.AVATAR,
    name: PROFILE_FIELDS_NAME.AVATAR,
    type: "file",
    label: "",
    class: "hidden",
  },
};
