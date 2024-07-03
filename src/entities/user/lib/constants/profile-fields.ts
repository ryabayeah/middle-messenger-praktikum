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
}
export const PROFILE_FIELDS = {
  [PROFILE_FIELDS_NAME.FIRST_NAME]: {
    id: PROFILE_FIELDS_NAME.FIRST_NAME,
    name: PROFILE_FIELDS_NAME.FIRST_NAME,
    type: "text",
    label: "Имя",
    value: "Иван",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректное имя",
    validator: nameValidator,
  },
  [PROFILE_FIELDS_NAME.SECOND_NAME]: {
    id: PROFILE_FIELDS_NAME.SECOND_NAME,
    name: PROFILE_FIELDS_NAME.SECOND_NAME,
    type: "text",
    label: "Фамилия",
    value: "Иванов",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректное имя",
    validator: nameValidator,
  },
  [PROFILE_FIELDS_NAME.DISPLAY_NAME]: {
    id: PROFILE_FIELDS_NAME.DISPLAY_NAME,
    name: PROFILE_FIELDS_NAME.DISPLAY_NAME,
    type: "text",
    label: "Имя в чате",
    value: "Абоба",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректное имя",
    validator: nameValidator,
  },
  [PROFILE_FIELDS_NAME.EMAIL]: {
    id: PROFILE_FIELDS_NAME.EMAIL,
    name: PROFILE_FIELDS_NAME.EMAIL,
    type: "email",
    label: "E-mail",
    value: "Абоба@gmail.com",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректный E-mail",
    validator: emailValidator,
  },
  [PROFILE_FIELDS_NAME.LOGIN]: {
    id: PROFILE_FIELDS_NAME.LOGIN,
    name: PROFILE_FIELDS_NAME.LOGIN,
    type: "text",
    label: "Логин",
    value: "login",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректный логин",
    validator: loginValidator,
  },
  [PROFILE_FIELDS_NAME.PHONE]: {
    id: PROFILE_FIELDS_NAME.PHONE,
    name: PROFILE_FIELDS_NAME.PHONE,
    type: "phone",
    label: "Телефон",
    value: "8912392138912",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackErrorText: "Некорректный формат номера телефона",
    validator: phoneValidator,
  },
};
