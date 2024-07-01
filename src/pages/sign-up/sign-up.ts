import { FormAuth } from "../../entities/auth/ui/form-auth/form-auth";
import { AuthLayout } from "../../layouts";
import { Buttonn } from "../../shared/ui/button";
import { Inputt } from "../../shared/ui/input/input";

enum FORM_FIELDS_NAME {
  EMAIL = "email",
  LOGIN = "login",
  FIRST_NAME = "first_name",
  SECOND_NAME = "second_name",
  PHONE = "phone",
  PASSWORD = "password",
  REPEAT_PASSWORD = "repeatPassword",
}

export const SignUpPage = () => {
  const handleSubmit = (e: any) => {
    const data = new FormData(e.target as HTMLFormElement);
    const result: Record<string, FormDataEntryValue | null> = {};
    Object.values(FORM_FIELDS_NAME).forEach((fieldName) => {
      result[fieldName] = data.get(fieldName);
    });
    console.log(result);
  };

  const handleAltClick = () => {
    // TODO: Редиркет на sign-in
  };

  const inputEmail = new Inputt({
    id: "email",
    name: "email",
    type: "email",
    value: "email@gmail.com",
    label: "E-mail",
  });
  const inputLogin = new Inputt({
    id: "login",
    name: "login",
    type: "text",
    value: "login",
    label: "Логин",
  });
  const inputFirstName = new Inputt({
    id: "first_name",
    name: "first_name",
    type: "text",
    value: "first_name",
    label: "Имя",
  });
  const inputSecondName = new Inputt({
    id: "second_name",
    name: "second_name",
    type: "text",
    value: "second_name",
    label: "Фамилия",
  });
  const inputPhone = new Inputt({
    id: "phone",
    name: "phone",
    type: "phone",
    value: "phone",
    label: "Телефон",
  });
  const inputPassword = new Inputt({
    id: "password",
    name: "password",
    type: "password",
    value: "password",
    label: "Пароль",
    // isInvalid=true
  });
  const inputRepeatPassword = new Inputt({
    id: "repeatPassword",
    name: "repeatPassword",
    type: "password",
    value: "password",
    label: "Пароль",
    // isInvalid=true
    // feedback='Пароли не совпадают'
  });

  const buttonSubmit = new Buttonn({
    text: "Зарегестрироваться",
    type: "submit",
    variant: "primary",
  });
  const buttonAlt = new Buttonn({
    text: "Войти",
    variant: "secondary",
    onClick: handleAltClick,
  });

  const signUpForm = new FormAuth({
    caption: "Регистрация",
    children: [
      inputEmail,
      inputLogin,
      inputFirstName,
      inputSecondName,
      inputPhone,
      inputPassword,
      inputRepeatPassword,
    ],
    buttonSubmit: buttonSubmit,
    buttonAlt: buttonAlt,
    onSubmit: handleSubmit,
  });

  return new AuthLayout({ children: signUpForm });
};
