import { Ref } from "../../../../shared/model/components";
import { Button } from "../../../../shared/ui/button";
import { FormInput } from "../../../../shared/ui/form-input/form-input";
import {
  emptyValidator,
  getPasswordRepeatedValidator,
} from "../../../../shared/utils";
import { FormAuth } from "../../../auth/ui/form-auth/form-auth";
import {
  SIGN_UP_FORM_FIELDS,
  SIGN_UP_FORM_FIELDS_NAME,
} from "../../lib/constants";

export class UserSignUpForm extends FormAuth {
  constructor() {
    const refs: Ref = {
      [SIGN_UP_FORM_FIELDS_NAME.EMAIL]: null,
      [SIGN_UP_FORM_FIELDS_NAME.LOGIN]: null,
      [SIGN_UP_FORM_FIELDS_NAME.FIRST_NAME]: null,
      [SIGN_UP_FORM_FIELDS_NAME.SECOND_NAME]: null,
      [SIGN_UP_FORM_FIELDS_NAME.PHONE]: null,
      [SIGN_UP_FORM_FIELDS_NAME.PASSWORD]: null,
      [SIGN_UP_FORM_FIELDS_NAME.REPEAT_PASSWORD]: null,
    };

    const formFields: FormInput[] = [];

    Object.entries(SIGN_UP_FORM_FIELDS).forEach(([key, fieldValues]) => {
      const field = new FormInput({
        ...fieldValues,
        validateOn: ["blur"],
        isInvalid: false,
        validator:
          key === SIGN_UP_FORM_FIELDS_NAME.REPEAT_PASSWORD
            ? getPasswordRepeatedValidator(
                refs,
                SIGN_UP_FORM_FIELDS_NAME.PASSWORD
              )
            : fieldValues.validator,
      });
      refs[key as SIGN_UP_FORM_FIELDS_NAME] = field;
      formFields.push(field);
    });

    const buttonSubmit = new Button({
      text: "Зарегестрироваться",
      type: "submit",
      variant: "primary",
    });
    const buttonAlt = new Button({
      text: "Войти",
      variant: "secondary",
      onClick: () => {
        // TODO: Редиркет на sign-in
      },
    });

    super({
      caption: "Вход",
      children: formFields,
      buttonSubmit: buttonSubmit,
      buttonAlt: buttonAlt,
      refs,
      onSubmit: (e: Event) => this.handleSubmit(e),
    });
  }

  handleSubmit(e: Event) {
    const result: Record<string, string> = {};
    let isAnyInvalid = false;

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    Object.values(SIGN_UP_FORM_FIELDS_NAME).forEach((key) => {
      // TODO: Добавить валидирование на сабмит
      const refs = this.props.refs as Ref;
      const value = (formData.get(key) || "")?.toString();
      const { validator } = SIGN_UP_FORM_FIELDS[key];

      const fieldValidator =
        key === SIGN_UP_FORM_FIELDS_NAME.REPEAT_PASSWORD
          ? getPasswordRepeatedValidator(
              refs,
              SIGN_UP_FORM_FIELDS_NAME.PASSWORD
            )
          : validator;

      const isInvalid =
        (fieldValidator && !fieldValidator(value || "")) ||
        !emptyValidator(value || "");
      if (isInvalid && !isAnyInvalid) {
        isAnyInvalid = true;
      }

      const fieldRef = refs[key] as FormInput;
      if (fieldRef) {
        fieldRef.setProps({ isInvalid });
      }

      result[key] = value;
    });

    // Если все поля валидны, то выходим из режима редактирования
    if (!isAnyInvalid) {
      this.setProps({ isEditable: false });
    }
    console.log(result);
  }
}
