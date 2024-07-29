import { APP_PATH } from '../../../../shared/constants';
import { Block, router } from '../../../../shared/lib';
import { Ref } from '../../../../shared/model';
import { Avatar, FormInput, Button } from '../../../../shared/ui';
import { emptyValidator } from '../../../../shared/utils';
import { authController, userController } from '../../controller';
import { PROFILE_FIELDS, PROFILE_FIELDS_NAME } from '../../lib/constants';
import { User } from '../../model';
import { UserAvatarModal } from '../user-avatar-modal';
import template from './user-profile-form.hbs?raw';

interface UserProfileFormProps extends CompileOptions {
  isEditable?: boolean;
  user?: User;
  isLoadingUser?: boolean
}

// TODO: Подумать над уровнями доступа методов
interface InternalUserProfileFormProps extends UserProfileFormProps {
  refs: Record<PROFILE_FIELDS_NAME, Block | null>;
  avatar: Avatar;
  formFields: FormInput[];
  saveButton: Button;
  altButton: Button;
  profileButtons: Button[];
}

export class UserProfileForm extends Block {
  constructor({ user, isLoadingUser=false, ...props }: UserProfileFormProps) {
    const refs: Ref = {
      [PROFILE_FIELDS_NAME.EMAIL]: null,
      [PROFILE_FIELDS_NAME.LOGIN]: null,
      [PROFILE_FIELDS_NAME.FIRST_NAME]: null,
      [PROFILE_FIELDS_NAME.SECOND_NAME]: null,
      [PROFILE_FIELDS_NAME.DISPLAY_NAME]: null,
      [PROFILE_FIELDS_NAME.PHONE]: null,
    };

    const formFields: FormInput[] = [];

    Object.entries(PROFILE_FIELDS).forEach(([key, fieldValues]) => {
      const field = new FormInput({
        ...fieldValues,
        value: user?.[key as keyof typeof PROFILE_FIELDS],
        isDisabled: true,
      });
      refs[key as PROFILE_FIELDS_NAME] = field;
      formFields.push(field);
    });

    const userAvatarModal = new UserAvatarModal({
      onApply: () => this.__handleAvatarModalClose(),
      onClose: () => this.__handleAvatarModalClose(),
    });
    userAvatarModal.hide();

    const avatar = new Avatar({
      srcPath: user?.avatar,
      onClick: () => {
        this.__handleAvatarClick();
      },
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
        this.setProps({ isEditable: false });
      },
    });

    const editProfileButton = new Button({
      text: 'Изменить данные',
      textPosition: 'left',
      variant: 'secondary',
      type: 'button',
      class: 'p-0',
      onClick: () => {
        this.setProps({ ...this.props, isEditable: true });
      },
    });

    const editPasswordButton = new Button({
      text: 'Изменить пароль',
      textPosition: 'left',
      variant: 'secondary',
      type: 'button',
      class: 'p-0',

      onClick: () => {
        router.go(APP_PATH.CHANGE_PASSWORD);
      },
    });

    const logOutButton = new Button({
      text: 'Выйти',
      textPosition: 'left',
      variant: 'error',
      type: 'button',
      class: 'p-0',

      onClick: () => {
        authController.logout()
      },
    });

    const buttons = {
      saveButton,
      altButton,
      editProfileButton,
      editPasswordButton,
      logOutButton,
    };

    const extraProps = {
      refs,
      isEditable: false,
    };

    super({
      ...props,
      ...extraProps,
      ...buttons,
      isLoadingUser,
      avatar,
      formFields,
      userAvatarModal,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          this.__handleSubmit(e);
        },
      },
    });
  }

  componentDidUpdate(
    _oldProps: InternalUserProfileFormProps,
    _newProps: InternalUserProfileFormProps,
  ): boolean {
    if (_oldProps.isEditable !== _newProps.isEditable) {
      const { refs } = _oldProps;
      Object.entries(PROFILE_FIELDS).forEach(([key, fieldValues]) => {
        const field = refs[key as keyof typeof refs];
        if (field) {
          field.setProps({
            ...fieldValues,
            isDisabled: !_newProps.isEditable,
          });
        }
      });
    }
    return true;
  }

  private __handleAvatarClick() {
    const userAvatarModalChild = this.children.userAvatarModal as UserAvatarModal;
    userAvatarModalChild.show();
  }

  private __handleAvatarModalClose() {
    const userAvatarModalChild = this.children
      .userAvatarModal as UserAvatarModal;
    userAvatarModalChild.hide();
  }

  private __handleSubmit(e: Event) {
    const result: Record<string, string> = {};
    let isAnyInvalid = false;

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    Object.values(PROFILE_FIELDS_NAME).forEach((key) => {
      const value = (formData.get(key) || '')?.toString();
      const { validator } = PROFILE_FIELDS[key];
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

    if (!isAnyInvalid) {
      userController
        .updateUser({
          first_name: result.first_name,
          second_name: result.second_name,
          display_name: result.display_name,
          login: result.login,
          email: result.email,
          phone: result.phone,
        })
        .then(() => {
          this.setProps({ isEditable: false });
        });
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
