import { FormInputProps } from '../../../../shared/ui/form-input/form-input';
import { passwordValidator } from '../../../../shared/utils';

export enum CHANGE_PASSWORD_FIELDS_NAME {
  OLD_PASSWORD = 'old_password',
  NEW_PASSWORD = 'new_password',
  REPEAT_NEW_PASSWORD = 'repeat_new_password',
}
export const CHANGE_PASSWORD_FIELDS: Record<
  CHANGE_PASSWORD_FIELDS_NAME,
  FormInputProps
> = {
  [CHANGE_PASSWORD_FIELDS_NAME.OLD_PASSWORD]: {
    id: CHANGE_PASSWORD_FIELDS_NAME.OLD_PASSWORD,
    name: CHANGE_PASSWORD_FIELDS_NAME.OLD_PASSWORD,
    type: 'password',
    label: 'Старый пароль',
    validateOn: ['blur'],
    // TODO: Сделать различающиеся ошибки при разных невалидных параметрах.
    feedbackErrorText:
      'Некорректный пароль. Поле должно содержать от 8 до 40 символов и хотя бы одну заглавную букву и цифру.',
    validator: passwordValidator,
  },
  [CHANGE_PASSWORD_FIELDS_NAME.NEW_PASSWORD]: {
    id: CHANGE_PASSWORD_FIELDS_NAME.NEW_PASSWORD,
    name: CHANGE_PASSWORD_FIELDS_NAME.NEW_PASSWORD,
    type: 'password',
    label: 'Новый пароль',
    validateOn: ['blur'],
    feedbackErrorText:
    // TODO: Сделать различающиеся ошибки при разных невалидных параметрах.
      'Некорректный пароль. Поле должно содержать от 8 до 40 символов  и хотя бы одну заглавную букву и цифру.',
    validator: passwordValidator,
  },
  [CHANGE_PASSWORD_FIELDS_NAME.REPEAT_NEW_PASSWORD]: {
    id: CHANGE_PASSWORD_FIELDS_NAME.REPEAT_NEW_PASSWORD,
    name: CHANGE_PASSWORD_FIELDS_NAME.REPEAT_NEW_PASSWORD,
    type: 'password',
    label: 'Повторите новый пароль',
    feedbackErrorText: 'Пароли не совпадают',
    validateOn: ['blur'],
  },
};
