import { FormAuth } from "../../entities/auth/ui/form-auth/form-auth";
import { AuthLayout } from "../../layouts";
import { Block } from "../../shared/lib/block";
import { Buttonn } from "../../shared/ui/button";
import {
  FormInput,
  FormInputProps,
} from "../../shared/ui/form-input/form-input";
import {
  emailValidator,
  emptyValidator,
  loginValidator,
  nameValidator,
  passwordRepeatedValidator,
  passwordValidator,
  phoneValidator,
} from "../../shared/utils";

enum FORM_FIELDS_NAME {
  EMAIL = "email",
  LOGIN = "login",
  FIRST_NAME = "first_name",
  SECOND_NAME = "second_name",
  PHONE = "phone",
  PASSWORD = "password",
  REPEAT_PASSWORD = "repeatPassword",
}



const SIGN_UP_FORM_FIELDS: Record<FORM_FIELDS_NAME, FormInputProps> = {
  [FORM_FIELDS_NAME.EMAIL]: {
    id: FORM_FIELDS_NAME.EMAIL,
    name: FORM_FIELDS_NAME.EMAIL,
    type: "email",
    label: "E-mail",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackText: "Некорректный E-mail",
    validator: emailValidator,
  },
  [FORM_FIELDS_NAME.LOGIN]: {
    id: FORM_FIELDS_NAME.LOGIN,
    name: FORM_FIELDS_NAME.LOGIN,
    type: "text",
    label: "Логин",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackText: "Некорректный логин",
    validator: loginValidator,
  },
  [FORM_FIELDS_NAME.FIRST_NAME]: {
    id: FORM_FIELDS_NAME.FIRST_NAME,
    name: FORM_FIELDS_NAME.FIRST_NAME,
    type: "text",
    label: "Имя",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackText: "Некорректное имя",
    validator: nameValidator,
  },
  [FORM_FIELDS_NAME.SECOND_NAME]: {
    id: FORM_FIELDS_NAME.SECOND_NAME,
    name: FORM_FIELDS_NAME.SECOND_NAME,
    type: "text",
    label: "Фамилия",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackText: "Некорректная фамилия",
    validator: nameValidator,
  },
  [FORM_FIELDS_NAME.PHONE]: {
    id: FORM_FIELDS_NAME.PHONE,
    name: FORM_FIELDS_NAME.PHONE,
    type: "phone",
    label: "Телефон",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackText: "Некорректный формат номера телефона",
    validator: phoneValidator,
  },
  [FORM_FIELDS_NAME.PASSWORD]: {
    id: FORM_FIELDS_NAME.PASSWORD,
    name: FORM_FIELDS_NAME.PASSWORD,
    type: "password",
    label: "Пароль",
    // TODO: Сделать уточнение в UI почему некорректно
    feedbackText: "Некорректный пароль",
    validator: passwordValidator,
  },
  [FORM_FIELDS_NAME.REPEAT_PASSWORD]: {
    id: FORM_FIELDS_NAME.REPEAT_PASSWORD,
    name: FORM_FIELDS_NAME.REPEAT_PASSWORD,
    type: "password",
    label: "Повторите пароль",
    value: "123",
    feedbackText: "Пароли не совпадают",
    validator: (value: string) => {
      return passwordRepeatedValidator(
        value,
        SIGN_UP_FORM_FIELDS["password"].value || ""
      );
    },
  },
};

export const SignUpPage = () => {

  const refs: Record<FORM_FIELDS_NAME, FormInput | null> = {
    [FORM_FIELDS_NAME.EMAIL]: null,
    [FORM_FIELDS_NAME.LOGIN]: null,
    [FORM_FIELDS_NAME.FIRST_NAME]: null,
    [FORM_FIELDS_NAME.SECOND_NAME]: null,
    [FORM_FIELDS_NAME.PHONE]: null,
    [FORM_FIELDS_NAME.PASSWORD]: null,
    [FORM_FIELDS_NAME.REPEAT_PASSWORD]: null,
  }

  const handleSubmit = () => {
    const result: Record<string, string> = {};

    Object.entries(SIGN_UP_FORM_FIELDS).forEach(([key, {validator, value, label, ...props}]) => {
      const fieldRef = refs[key as FORM_FIELDS_NAME]
      if (fieldRef) {
        const isInvalid = (validator && !validator(value || '')) || !emptyValidator(value || '')
        fieldRef.setProps({...props, validator, value, label,  isInvalid: isInvalid})
      }

      result[key] = value || "";
    })
    console.log("SIGN_UP_FORM: ", result);
  };

  const renderFormFields = () => {
    const fields: Block[] = []
    Object.entries(SIGN_UP_FORM_FIELDS).forEach(([key, value]) =>{
      const field =new FormInput({
        ...value,
        validateOn: ["blur"],
        isInvalid: false,
        onChange(e) {
          SIGN_UP_FORM_FIELDS[key as FORM_FIELDS_NAME].value = (
            e.target as HTMLInputElement
          ).value;
        },
      }) 
      refs[key as FORM_FIELDS_NAME] = field
      fields.push(field)
    })

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
