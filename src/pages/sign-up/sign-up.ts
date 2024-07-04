import { FormAuth } from "../../entities/auth/ui/form-auth/form-auth";
import {
  SIGN_UP_FORM_FIELDS_NAME,
  SIGN_UP_FORM_FIELDS,
} from "../../entities/user/lib/constants";
import { AuthLayout } from "../../layouts";
import { Block } from "../../shared/lib/block";
import { Buttonn } from "../../shared/ui/button";
import { FormInput } from "../../shared/ui/form-input/form-input";
import {
  emptyValidator,
  getPasswordRepeatedValidator,
  passwordRepeatedValidator,
} from "../../shared/utils";

export const SignUpPage = () => {
  const refs: Record<SIGN_UP_FORM_FIELDS_NAME, FormInput | null> = {
    [SIGN_UP_FORM_FIELDS_NAME.EMAIL]: null,
    [SIGN_UP_FORM_FIELDS_NAME.LOGIN]: null,
    [SIGN_UP_FORM_FIELDS_NAME.FIRST_NAME]: null,
    [SIGN_UP_FORM_FIELDS_NAME.SECOND_NAME]: null,
    [SIGN_UP_FORM_FIELDS_NAME.PHONE]: null,
    [SIGN_UP_FORM_FIELDS_NAME.PASSWORD]: null,
    [SIGN_UP_FORM_FIELDS_NAME.REPEAT_PASSWORD]: null,
  };

  // TODO: Переделать под FormData
  const handleSubmit = () => {
    const result: Record<string, string> = {};

    Object.entries(SIGN_UP_FORM_FIELDS).forEach(
      ([key, { validator, value, label, ...props }]) => {
        const fieldRef = refs[key as SIGN_UP_FORM_FIELDS_NAME];

        if (fieldRef) {

          const fieldValidator = key === SIGN_UP_FORM_FIELDS_NAME.REPEAT_PASSWORD
          ? getPasswordRepeatedValidator(
              refs,
              SIGN_UP_FORM_FIELDS_NAME.PASSWORD
            )
          : validator
          const isInvalid =
            (fieldValidator && !fieldValidator(value || "")) ||
            !emptyValidator(value || "");
          // TODO:  fieldRef.setProps({ isInvalid: isInvalid });

          fieldRef.setProps({ ...props, validator, value, label, isInvalid });
        }

        result[key] = value || "";
      }
    );
    console.log("SIGN_UP_FORM: ", result);
  };

  const renderFormFields = () => {
    const fields: Block[] = [];
    Object.entries(SIGN_UP_FORM_FIELDS).forEach(([key, value]) => {
      const field = new FormInput({
        ...value,
        validateOn: ["blur"],
        isInvalid: false,
        validator:
          key === SIGN_UP_FORM_FIELDS_NAME.REPEAT_PASSWORD
            ? getPasswordRepeatedValidator(
                refs,
                SIGN_UP_FORM_FIELDS_NAME.PASSWORD
              )
            : value.validator,
        onChange(e) {
          SIGN_UP_FORM_FIELDS[key as SIGN_UP_FORM_FIELDS_NAME].value = (
            e.target as HTMLInputElement
          ).value;
        },
      });
      refs[key as SIGN_UP_FORM_FIELDS_NAME] = field;
      fields.push(field);
    });

    return fields;
  };

  const handleAltClick = () => {
    // TODO: Редиркет на sign-in
  };

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
    children: renderFormFields(),
    buttonSubmit: buttonSubmit,
    buttonAlt: buttonAlt,
    onSubmit: handleSubmit,
  });

  return new AuthLayout({ children: signUpForm });
};
