import { Block } from "../../../../shared/lib";
import { Ref } from "../../../../shared/model/components";
import { Avatarr } from "../../../../shared/ui/avatar/avatar";
import { Buttonn } from "../../../../shared/ui/button";
import { FormInput } from "../../../../shared/ui/form-input/form-input";
import { emptyValidator, getBase64 } from "../../../../shared/utils";
import { PROFILE_FIELDS, PROFILE_FIELDS_NAME } from "../../lib/constants";
import { UserProfileData } from "../../model/base";
import { UserAvatarModal } from "../user-avatar-modal";
import template from "./user-profile-form.new.hbs?raw";
// TODO: Проверить импорты

interface UserProfileFormProps extends CompileOptions {
  isEditable: boolean;
  userProfileData: UserProfileData;
  onEditPasswordClick?: VoidFunction;
}

interface InternalUserProfileFormProps extends UserProfileFormProps {
  refs: Record<PROFILE_FIELDS_NAME, Block | null>;
  avatar: Avatarr;
  formFields: FormInput[];
  saveButton: Buttonn;
  altButton: Buttonn;
  profileButtons: Buttonn[];
}

export class UserProfileForm extends Block {
  constructor({
    isEditable,
    userProfileData,
    onEditPasswordClick,
    ...props
  }: UserProfileFormProps) {
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
        value: userProfileData[key as keyof typeof PROFILE_FIELDS],
        isDisabled: true,
      });
      refs[key as PROFILE_FIELDS_NAME] = field;
      formFields.push(field);
    });

    const userAvatarModal = new UserAvatarModal({
      onApply: (file: File) => this.handleAvatarModalApply(file),
      onClose: () => this.handleAvatarModalClose(),
    });
    userAvatarModal.hide();

    const avatar = new Avatarr({
      isEditable: false,
      onClick: () => {
        this.handleAvatarClick();
      },
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
      onClick: () => {
        this.setProps({ isEditable: false });
      },
    });

    const editProfileButton = new Buttonn({
      text: "Изменить данные",
      textPosition: "left",
      variant: "secondary",
      type: "button",
      class: "p-0",
      onClick: () => {
        this.setProps({ ...this.props, isEditable: true });
      },
    });

    const editPasswordButton = new Buttonn({
      text: "Изменить пароль",
      textPosition: "left",
      variant: "secondary",
      type: "button",
      class: "p-0",

      onClick: () => {
        onEditPasswordClick && onEditPasswordClick();
      },
    });

    const logOutButton = new Buttonn({
      text: "Выйти",
      textPosition: "left",
      variant: "error",
      type: "button",
      class: "p-0",

      onClick: () => {
        this.setProps({ ...this.props, isEditable: true });
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
      isEditable,
    };

    super({
      ...props,
      ...extraProps,
      ...buttons,
      avatar,
      formFields,
      userAvatarModal,
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          this.handleSubmit(e);
        },
      },
    });
  }

  handleAvatarClick() {
    const userAvatarModalChild = this.children
      .userAvatarModal as UserAvatarModal;

    this.props.isEditable && userAvatarModalChild.show();
  }

  handleAvatarModalClose() {
    const userAvatarModalChild = this.children
      .userAvatarModal as UserAvatarModal;
    userAvatarModalChild.hide();
  }

  async handleAvatarModalApply(file: File) {
    const refs = this.props.refs as Ref;
    // TODO: пока не понятно как работать с файлом (подождать апи?)
    const avatarHiddenRef = refs[PROFILE_FIELDS_NAME.AVATAR];
    if (avatarHiddenRef) {
      avatarHiddenRef.setProps({ value: file });
    }

    //TODO: Возможно временно использоване base64? Мб будет открытый бакет? 
    const avatarRef  = this.children[PROFILE_FIELDS_NAME.AVATAR] as Avatarr
    if (avatarRef){
      const base64 = (await getBase64(file)).split(',')[1]
      const imgType = base64.split('.').at(-1) || 'png'
      avatarRef.setProps({ src: `data:image/${imgType};base64, ${base64}` });
    }

    this.handleAvatarModalClose();
  }

  handleSubmit(e: Event) {
    const result: Record<string, string> = {};
    let isAnyInvalid = false;

    const target = e.target as HTMLFormElement;

    const formData = new FormData(target);
    Object.values(PROFILE_FIELDS_NAME).forEach((key) => {
      // TODO: Добавить валидирование на сабмит
      const value = (formData.get(key) || "")?.toString();
      const { validator } = PROFILE_FIELDS[key];
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
    console.log("PROFILE_EDIT_FORM: ", result);
  }

  componentDidUpdate(
    _oldProps: InternalUserProfileFormProps,
    _newProps: InternalUserProfileFormProps
  ): boolean {
    if (_oldProps.isEditable !== _newProps.isEditable) {
      const avatarRef = this.children.avatar as Avatarr;
      if (avatarRef) {
        avatarRef.setProps({ isEditable: _newProps.isEditable });
      }
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

  render() {
    return this.compile(template, { ...this.props });
  }
}
