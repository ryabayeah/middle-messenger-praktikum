import { APP_PATH } from '../../../../shared/constants';
import { router } from '../../../../shared/lib';
import { Ref } from '../../../../shared/model';
import { FormInput } from '../../../../shared/ui';
import { Button } from '../../../../shared/ui/button';
import {
  emptyValidator,
  getPasswordRepeatedValidator,
} from '../../../../shared/utils';
import { FormAuth } from '../../../auth/ui';
import { authController } from '../../controller';
import {
  SIGN_UP_FORM_FIELDS,
  SIGN_UP_FORM_FIELDS_NAME,
} from '../../lib/constants';
import { SignUpData } from '../../model';

// TODO: Подумать над уровнями доступа методов
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
        validateOn: ['blur'],
        isInvalid: false,
        validator:
          key === SIGN_UP_FORM_FIELDS_NAME.REPEAT_PASSWORD
            ? getPasswordRepeatedValidator(
                refs,
                SIGN_UP_FORM_FIELDS_NAME.PASSWORD,
              )
            : fieldValues.validator,
      });
      refs[key as SIGN_UP_FORM_FIELDS_NAME] = field;
      formFields.push(field);
    });

    const buttonSubmit = new Button({
      text: 'Зарегестрироваться',
      type: 'submit',
      variant: 'primary',
    });
    const buttonAlt = new Button({
      text: 'Войти',
      variant: 'secondary',
      type: 'button',
      onClick: () => {
        router.go(APP_PATH.LOGIN);
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
    const result: SignUpData = {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      phone: '',
      password: '',
    };
    let isAnyInvalid = false;

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    Object.values(SIGN_UP_FORM_FIELDS_NAME).forEach((key) => {
      const refs = this.props.refs as Ref;
      const value = (formData.get(key) || '')?.toString();
      const { validator } = SIGN_UP_FORM_FIELDS[key];

      const fieldValidator =
        key === SIGN_UP_FORM_FIELDS_NAME.REPEAT_PASSWORD
          ? getPasswordRepeatedValidator(
              refs,
              SIGN_UP_FORM_FIELDS_NAME.PASSWORD,
            )
          : validator;

      const isInvalid =
        (fieldValidator && !fieldValidator(value || '')) ||
        !emptyValidator(value || '');
      if (isInvalid && !isAnyInvalid) {
        isAnyInvalid = true;
      }

      const fieldRef = refs[key] as FormInput;
      if (fieldRef) {
        fieldRef.setProps({ isInvalid });
      }

      result[key as keyof SignUpData] = value;
    });

    // Если все поля валидны, то выходим из режима редактирования
    if (!isAnyInvalid) {
      this.setProps({ isLoading: true });
      await authController
        .signUp(result)
        .then(() => {
          this.setProps({ isLoading: false });
        })
        .catch((error: Error) => {
          alert(error.message);
          this.setProps({ isLoading: false });
        });
    }
  }
}
