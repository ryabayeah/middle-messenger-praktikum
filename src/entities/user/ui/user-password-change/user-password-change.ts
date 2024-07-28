import { APP_PATH } from '../../../../shared/constants';
import { Block, router } from '../../../../shared/lib';
import { Ref } from '../../../../shared/model';
import { FormInput, Button } from '../../../../shared/ui';
import {
  emptyValidator,
  getPasswordRepeatedValidator,
  redirect,
} from '../../../../shared/utils';
import { FormAuth } from '../../../auth/ui';
import { userController } from '../../controller';
import {
  CHANGE_PASSWORD_FIELDS_NAME,
  CHANGE_PASSWORD_FIELDS,
} from '../../lib/constants';
import template from './user-password-change.hbs?raw';
import './user-password-change.scss';

// TODO: Подумать над уровнями доступа методов
export class UserPasswordChange extends Block {
  constructor() {
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
                CHANGE_PASSWORD_FIELDS_NAME.NEW_PASSWORD,
              )
            : fieldValues.validator,
      });
      refs[key as CHANGE_PASSWORD_FIELDS_NAME] = field;
      formFields.push(field);
    });

    const saveButton = new Button({
      type: 'submit',
      text: 'Сохранить',
      variant: 'primary',
    });

    const altButton = new Button({
      type: 'reset',
      text: 'Отмена',
      variant: 'secondary',
      onClick: () => {
        redirect(APP_PATH.PROFILE);
      },
    });

    const userPasswordChangeForm = new FormAuth({
      caption: 'Смена пароля',
      children: formFields,
      buttonSubmit: saveButton,
      buttonAlt: altButton,
      onSubmit: (e: Event) => this.__handleSubmit(e),
    });
    super({
      refs,
      userPasswordChangeForm,
    });
  }

  private __handleSubmit(e: Event) {
    const result: Record<string, string> = {};
    let isAnyInvalid = false;

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    Object.values(CHANGE_PASSWORD_FIELDS_NAME).forEach((key) => {
      const value = (formData.get(key) || '')?.toString();
      const { validator } = CHANGE_PASSWORD_FIELDS[key];

      const fieldValidator =
        key === CHANGE_PASSWORD_FIELDS_NAME.REPEAT_NEW_PASSWORD
          ? getPasswordRepeatedValidator(
              this.props.refs as Ref,
              CHANGE_PASSWORD_FIELDS_NAME.NEW_PASSWORD,
            )
          : validator;

      const isInvalid =
        (fieldValidator && !fieldValidator(value || '')) ||
        !emptyValidator(value || '');
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
      userController.updatePassword({
        oldPassword: result.old_password,
        newPassword: result.new_password,
      }).then(()=>{
        alert('Пароль успешно изменен');
        router.go(APP_PATH.PROFILE)
      })
    }
    console.log('PASSWORD_CHANGE_FORM: ', result);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
