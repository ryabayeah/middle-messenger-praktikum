import { FormAuth } from "../../entities/auth/ui/form-auth/form-auth";
import { AuthLayout } from "../../layouts";
import { Buttonn } from "../../shared/ui/button";
import { Inputt } from "../../shared/ui/input/input";

enum FORM_FIELDS_NAME {
  LOGIN = "login",
  PASSWORD = "password",
}

export const SignInPage = () => {
  const handleSubmit = (e: any) => {
    const data = new FormData(e.target as HTMLFormElement);
    const result: Record<string, FormDataEntryValue | null> = {};
    Object.values(FORM_FIELDS_NAME).forEach((fieldName) => {
      result[fieldName] = data.get(fieldName);
    });
    console.log(result);
  };

  const handleAltClick = () => {
    // TODO: Редиркет на sign-up
  };

  const inputLogin = new Inputt({
    id: "login",
    name: "login",
    type: "text",
    value: "login",
    label: "Логин",
  });
  const inputPassword = new Inputt({
    id: "password",
    name: "password",
    type: "password",
    value: "password",
    label: "Пароль",
  });

  const buttonSubmit = new Buttonn({
    text: "Вход",
    type: "submit",
    variant: "primary",
  });
  const buttonAlt = new Buttonn({
    type: "reset",
    text: "Нет аккаунта?",
    variant: "secondary",
    onClick: handleAltClick,
  });

  const signInForm = new FormAuth({
    caption: "Вход",
    children: [inputLogin, inputPassword],
    buttonSubmit: buttonSubmit,
    buttonAlt: buttonAlt,
    onSubmit: handleSubmit,
  });

  return new AuthLayout({ children: signInForm });
};
