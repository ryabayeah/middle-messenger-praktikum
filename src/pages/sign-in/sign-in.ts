import { FormAuth } from "../../entities/auth/ui/form-auth/form-auth";
import { Block } from "../../shared/lib/block";
import { Buttonn } from "../../shared/ui/button";
import { Inputt } from "../../shared/ui/input/input";
import { signInTemplate } from "./sign-in.template";

interface SignInPageProps extends CompileOptions {
  // loginInput: Inputt;
  // passwordInput: Inputt;
  signInForm: FormAuth;
}

class SignInPage extends Block {
  constructor(props: SignInPageProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(signInTemplate, { ...this.props });
  }
}

export const signInPage = () => {
  const inputLogin = new Inputt({
    id: "login",
    name: "login",
    type: "text",
    value: "login",
    label: "Логин",
  });
  const inputPassword = new Inputt({
    id: "logfin",
    name: "lofgin",
    type: "tefxt",
    value: "lofgin",
    label: "Логfин",
  });

  const buttonSubmit = new Buttonn({ text: "Вход", type: 'submit', variant: "primary" });
  const buttonAlt = new Buttonn({
    type: 'reset',
    text: "Нет аккаунта?",
    variant: "secondary",
  });
  const authForm = new FormAuth({
    caption: "Вход",
    inputLogin,
    inputPassword,
    buttonSubmit: buttonSubmit,
    buttonAlt: buttonAlt,
  });

  return new SignInPage({
    signInForm: authForm,
  });
};
