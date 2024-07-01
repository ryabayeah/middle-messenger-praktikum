import { FormAuth } from "../../entities/auth/ui/form-auth/form-auth";
import { Block } from "../../shared/lib/block";
import { Buttonn } from "../../shared/ui/button";
import { Inputt } from "../../shared/ui/input/input";
import template from "./sign-in.hbs?raw";

interface SignInPageBaseComponentProps extends CompileOptions {
  signInForm: FormAuth;
}

class SignInPageBaseComponent extends Block {
  constructor(props: SignInPageBaseComponentProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export const SignInPage = () => {
  const values = {LOGIN: 'login', PASSWORD: 'password'}
  const handleSubmit = (e: any) => {
    const data = new FormData(e.target as HTMLFormElement);
  
    console.log(data.get(values.LOGIN), data.get(values.PASSWORD),"---")
  }

  const handleAltClick = () => {
    // TODO: Редиркет на sign-up
  }

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

  const buttonSubmit = new Buttonn({ text: "Вход", type: 'submit', variant: "primary" });
  const buttonAlt = new Buttonn({
    type: 'reset',
    text: "Нет аккаунта?",
    variant: "secondary",
    onClick: handleAltClick
  });
  const authForm = new FormAuth({
    caption: "Вход",
    children: [
      inputLogin,
      inputPassword,
    ],
    buttonSubmit: buttonSubmit,
    buttonAlt: buttonAlt,
    onSubmit: handleSubmit
  });



  return new SignInPageBaseComponent({
    signInForm: authForm,
  });
};
