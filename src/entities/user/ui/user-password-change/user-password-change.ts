import { Block } from "../../../../shared/lib";
import { Ref } from "../../../../shared/model/components";
import { Buttonn } from "../../../../shared/ui/button/button";
import { FormInput } from "../../../../shared/ui/form-input/form-input";
import { emptyValidator, getPasswordRepeatedValidator } from "../../../../shared/utils";
import { FormAuth } from "../../../auth/ui";
import {
  CHANGE_PASSWORD_FIELDS_NAME,
  CHANGE_PASSWORD_FIELDS,
} from "../../lib/constants";
import template from "./user-password-change.hbs?raw";
import "./user-password-change.scss";
// TODO: Проверить импорты

interface UserPasswordChangeProps extends CompileOptions {}

export class UserPasswordChange extends Block {
  constructor({ ...props }: UserPasswordChangeProps) {
    const refs: Ref = {
      [CHANGE_PASSWORD_FIELDS_NAME.NEW_PASSWORD]: null,
      [CHANGE_PASSWORD_FIELDS_NAME.OLD_PASSWORD]: null,
      [CHANGE_PASSWORD_FIELDS_NAME.REPEAT_NEW_PASSWORD]: null,
    };

    const formFields: FormInput[] = [];

    Object.entries(CHANGE_PASSWORD_FIELDS).forEach(([key, fieldValues]) => {
      const field = new FormInput({
        ...fieldValues,
        validator:
          key === CHANGE_PASSWORD_FIELDS_NAME.REPEAT_NEW_PASSWORD
            ? getPasswordRepeatedValidator(
                refs,
                CHANGE_PASSWORD_FIELDS_NAME.NEW_PASSWORD
              )
            : fieldValues.validator,
      });
      refs[key as CHANGE_PASSWORD_FIELDS_NAME] = field;
      formFields.push(field);
    });

    const saveButton = new Buttonn({
      type: "submit",
      text: "Сохранить",
      variant: "primary",
    });

    const altButton = new Buttonn({
      type: "reset",
      text: "Отмена",
      variant: "secondary",
      onClick: () => {},
    });

    const userPasswordChangeForm = new FormAuth({
      caption: "Смена пароля",
      children: formFields,
      buttonSubmit: saveButton,
      buttonAlt: altButton,
      onSubmit: (e: Event) => this.handleSubmit(e),
    });
    super({
      ...props,
      refs,
      userPasswordChangeForm,
    });
  }

  handleSubmit(e: Event) {
    const result: Record<string, string> = {};
    let isAnyInvalid = false;

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    Object.values(CHANGE_PASSWORD_FIELDS_NAME).forEach((key) => {
      const value = (formData.get(key) || "")?.toString();
      const { validator } = CHANGE_PASSWORD_FIELDS[key];

      const fieldValidator = key === CHANGE_PASSWORD_FIELDS_NAME.REPEAT_NEW_PASSWORD
      ? getPasswordRepeatedValidator(
          this.props.refs as Ref,
          CHANGE_PASSWORD_FIELDS_NAME.NEW_PASSWORD
        )
      : validator
    
      const isInvalid =
        (fieldValidator && !fieldValidator(value || "")) || !emptyValidator(value || "");
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
    console.log("PASSWORD_CHANGE_FORM: ", result);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
