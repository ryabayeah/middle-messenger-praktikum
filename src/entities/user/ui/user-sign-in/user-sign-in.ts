import { Ref } from "../../../../shared/model/components";
import { Button } from "../../../../shared/ui/button";
import { FormInput } from "../../../../shared/ui/form-input/form-input";
import { emptyValidator } from "../../../../shared/utils";
import { FormAuth } from "../../../auth/ui/form-auth/form-auth";
import {
  SIGN_IN_FORM_FIELDS,
  SIGN_IN_FORM_FIELDS_NAME,
} from "../../lib/constants";

export class UserSignInForm extends FormAuth {
  constructor() {
    const refs: Ref = {
      [SIGN_IN_FORM_FIELDS_NAME.LOGIN]: null,
      [SIGN_IN_FORM_FIELDS_NAME.PASSWORD]: null,
    };

    const formFields: FormInput[] = [];

    Object.entries(SIGN_IN_FORM_FIELDS).forEach(([key, fieldValues]) => {
      const field = new FormInput({
        ...fieldValues,
        isInvalid: false,
      });
      refs[key as SIGN_IN_FORM_FIELDS_NAME] = field;
      formFields.push(field);
    });

    const buttonSubmit = new Button({
      text: "Вход",
      type: "submit",
      variant: "primary",
    });
    const buttonAlt = new Button({
      type: "reset",
      text: "Нет аккаунта?",
      variant: "secondary",
      onClick: () => {
        //TODO: Редиркет
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
    Object.values(SIGN_IN_FORM_FIELDS_NAME).forEach((key) => {
      // TODO: Добавить валидирование на сабмит
      const value = (formData.get(key) || "")?.toString();
      const { validator } = SIGN_IN_FORM_FIELDS[key];
      const isInvalid =
        (validator && !validator(value || "")) || !emptyValidator(value || "");
      if (isInvalid && !isAnyInvalid) {
        isAnyInvalid = true;
      }

      const ref = this.props.refs as Ref;
      const fieldRef = ref[key] as FormInput;
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
