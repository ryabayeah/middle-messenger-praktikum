import { FormAuth } from "../../entities/auth/ui/form-auth/form-auth";
import { Block } from "../../shared/lib/block";
import { Buttonn } from "../../shared/ui/button";
import { Inputt } from "../../shared/ui/input/input";
import template from "./sign-up.hbs?raw";

interface SignUpPageBaseComponentProps extends CompileOptions {
  signInForm: FormAuth;
}

class SignUpPageBaseComponent extends Block {
  constructor(props: SignUpPageBaseComponentProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export const SignUpPage = () => {
  const values = {
    EMAIL: 'email', 
    LOGIN: 'login', 
    FIRST_NAME: 'first_name', 
    SECOND_NAME: 'second_name', 
    PHONE: 'phone',
    PASSWORD: 'password',
    REPEAT_PASSWORD: 'repeatPassword'
}
  const handleSubmit = (e: any) => {
    const data = new FormData(e.target as HTMLFormElement);
    // TODO: Сделать вывод в консоль данных
  }

  const handleAltClick = () => {
    // TODO: Редиркет на sign-in
  }

  const inputEmail = new Inputt({
    id: "email",
    name: "email",
    type: "email",
    value: "email",
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

  const buttonSubmit = new Buttonn({ text: "Зарегестрироваться", type: 'submit', variant: "primary" });
  const buttonAlt = new Buttonn({
    text: "Войти",
    variant: "secondary",
    onClick: handleAltClick
  });
  const authForm = new FormAuth({
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
    onSubmit: handleSubmit
  });

  return new SignUpPageBaseComponent({
    signInForm: authForm,
  });
};
