import { Block } from "../../../../shared/lib";
import { Avatarr } from "../../../../shared/ui/avatar/avatar";
import { Buttonn } from "../../../../shared/ui/button";
import { FormInput } from "../../../../shared/ui/form-input/form-input";
import { emptyValidator } from "../../../../shared/utils";
import { PROFILE_FIELDS, PROFILE_FIELDS_NAME } from "../../lib/constants";
import { UserProfileData } from "../../model/base";
import template from "./user-profile-form.new.hbs?raw";

interface UserProfileFormProps extends CompileOptions {
  isEditable: boolean;
  userProfileData: UserProfileData;
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
  constructor({ isEditable, userProfileData, ...props }: UserProfileFormProps) {
    const refs: Record<PROFILE_FIELDS_NAME, Block | null> = {
      [PROFILE_FIELDS_NAME.EMAIL]: null,
      [PROFILE_FIELDS_NAME.LOGIN]: null,
      [PROFILE_FIELDS_NAME.FIRST_NAME]: null,
      [PROFILE_FIELDS_NAME.SECOND_NAME]: null,
      [PROFILE_FIELDS_NAME.DISPLAY_NAME]: null,
      [PROFILE_FIELDS_NAME.PHONE]: null,
    };
    
    const avatar = new Avatarr({
      isEditable: false,
    });

    const formFields: FormInput[] = []

    Object.entries(PROFILE_FIELDS).forEach(
      ([key, fieldValues]) => {
        const field =  new FormInput({
          ...fieldValues,
          value: userProfileData[key as keyof typeof userProfileData],
          isDisabled: true,
          onChange(e) {
            PROFILE_FIELDS[key as PROFILE_FIELDS_NAME].value = (
              e.target as HTMLInputElement
            ).value;
          },
        });
        refs[key as PROFILE_FIELDS_NAME] = field
        formFields.push(field) 
      }
    );

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
        this.setProps({  isEditable: false });
      },
    });

    const editProfileButton = new Buttonn({
      text: "Изменить данные",
      textPosition: "left",
      variant: "secondary",
      type: 'button',
      class: "p-0",
      onClick: () => {
        this.setProps({ ...this.props, isEditable: true });
      },
    });

    const editPasswordButton = new Buttonn({
        text: "Изменить пароль",
        textPosition: "left",
        variant: "secondary",
        type: 'button',
        class: "p-0",
        
        onClick: () => {
          this.setProps({ ...this.props, isEditable: true });
        },
      });

    const logOutButton = new Buttonn({
        text: "Выйти",
        textPosition: "left",
        variant: "error",
        type: 'button',
        class: "p-0",
        
        onClick: () => {
          this.setProps({ ...this.props, isEditable: true });
        },
      });

    const handleSubmit = () => {
        const result: Record<string, string> = {};
        let isAnyInvalid = false
        Object.entries(PROFILE_FIELDS).forEach(
            ([key, { value, label, validator, ...props }]) => {
            const fieldRef = refs[key as PROFILE_FIELDS_NAME];
            if (fieldRef) {
              const isInvalid =
                (validator && !validator(value || "")) ||
                !emptyValidator(value || "");
              fieldRef.setProps({ ...props, validator, value, label, isInvalid });

              if (isInvalid){
                isAnyInvalid  = true
              }
            }
            result[key] = value || "";
            }
        );
        // Если все поля валидны, то выходим из режима редактирования
        if (!isAnyInvalid){
            this.setProps({  isEditable: false });
        }
        console.log("PROFILE_EDIT_FORM: ", result);
    }

    super({
      ...props,
      refs,
    //   buttonRefs,
      isEditable,
      avatar,
      formFields,
      saveButton,
      altButton,
      editProfileButton,
      editPasswordButton,
      logOutButton,
      events: {
        submit: (e: Event)=>{
            e.preventDefault()
            handleSubmit()
        }
      }
    });
  }

  componentDidUpdate(_oldProps: InternalUserProfileFormProps, _newProps: InternalUserProfileFormProps): boolean {
    if (_oldProps.isEditable !== _newProps.isEditable){
        const { refs } = _oldProps
        Object.entries(PROFILE_FIELDS).forEach(
            ([key, fieldValues]) => {
              const field = refs[key as keyof typeof refs];
              if (field){
                field.setProps({
                    ...fieldValues,
                    isDisabled: !_newProps.isEditable
                })
              }
            }
          );
    }
    return true;
  }

  render() {

    return this.compile(template, { ...this.props });
  }
}
