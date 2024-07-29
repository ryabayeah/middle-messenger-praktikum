import { APP_PATH } from '../../../../shared/constants';
import { router } from '../../../../shared/lib';
import { Ref } from '../../../../shared/model';
import { FormInput, Button } from '../../../../shared/ui';
import { emptyValidator } from '../../../../shared/utils';
import { FormAuth } from '../../../auth/ui';
import { authController } from '../../controller';
import {
  SIGN_IN_FORM_FIELDS,
  SIGN_IN_FORM_FIELDS_NAME,
} from '../../lib/constants';
import { SignInData } from '../../model';

// TODO: Подумать над уровнями доступа методов
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
      text: 'Вход',
      type: 'submit',
      variant: 'primary',
    });
    const buttonAlt = new Button({
      type: 'button',
      text: 'Нет аккаунта?',
      variant: 'secondary',
      onClick: () => {
        router.go(APP_PATH.REGISTER);
      },
    });

    super({
      caption: 'Вход',
      children: formFields,
      buttonSubmit: buttonSubmit,
      buttonAlt: buttonAlt,
      refs,
      onSubmit: (e: Event) => this.__handleSubmit(e),
    });
  }

  private async __handleSubmit(e: Event) {
    const result: Record<string, string> = {};
    let isAnyInvalid = false;

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    Object.values(SIGN_IN_FORM_FIELDS_NAME).forEach(key => {
      const value = (formData.get(key) || '')?.toString();
      const { validator } = SIGN_IN_FORM_FIELDS[key];
      const isInvalid =
        (validator && !validator(value || '')) || !emptyValidator(value || '');
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

    // Если все поля валидны, то выполняем вход
    if (!isAnyInvalid) {
      authController.signIn(result as SignInData)
    }
  }
}
