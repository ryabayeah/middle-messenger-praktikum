import { FormAuth } from "../../entities/auth/ui/form-auth/form-auth";
import {
  SIGN_IN_FORM_FIELDS,
  SIGN_IN_FORM_FIELDS_NAME,
} from "../../entities/user/lib/constants";
import { AuthLayout } from "../../layouts";
import { Buttonn } from "../../shared/ui/button";
import { FormInput } from "../../shared/ui/form-input/form-input";

export const SignInPage = () => {
  const handleSubmit = (e: any) => {
    const data = new FormData(e.target as HTMLFormElement);
    const result: Record<string, FormDataEntryValue | null> = {};
    Object.values(SIGN_IN_FORM_FIELDS_NAME).forEach((fieldName) => {
      result[fieldName] = data.get(fieldName);
    });
    console.log(result);
  };

  const renderFormFields = () => {
    return Object.entries(SIGN_IN_FORM_FIELDS).map(([key, value]) => {
      return new FormInput({
        ...value,
        isInvalid: false,
        onChange(e) {
          SIGN_IN_FORM_FIELDS[key as SIGN_IN_FORM_FIELDS_NAME].value = (
            e.target as HTMLInputElement
          ).value;
        },
      });
    });
  };

  const handleAltClick = () => {
    // TODO: Редиркет на sign-up
  };

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
    children: renderFormFields(),
    buttonSubmit: buttonSubmit,
    buttonAlt: buttonAlt,
    onSubmit: handleSubmit,
  });

  return new AuthLayout({ children: signInForm });
};
