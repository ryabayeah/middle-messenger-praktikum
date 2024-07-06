import { FIELDS } from "../../../../shared/constants";
import { Button, FormInput, Modal } from "../../../../shared/ui";
import { loginValidator } from "../../../../shared/utils";
import './dialog-delete-user-modal.scss'

interface DialogDeleteUserModalProps extends CompileOptions {
  onClose: VoidFunction;
  onApply: () => void;
}

export class DialogDeleteUserModal extends Modal {
  constructor({ onClose, onApply }: DialogDeleteUserModalProps) {
    const saveButton = new Button({
      text: "Удалить",
      variant: "primary",
      class: "w-full",
      type: "button",
      onClick: (e: Event) => this.__handleApply(e, onApply),
    });
    const altButton = new Button({
      text: "Отмена",
      variant: "secondary",
      class: "w-full",
      type: "button",
      onClick: () => this.__handleClose(onClose),
    });


    const loginInput = new FormInput({
      ...FIELDS.login,
      validateOn: ['blur'],
      validator: loginValidator,
    })

    super({
      hide: false,
      title: "Удалить пользователя",
      body: loginInput,
      buttons: [saveButton, altButton],
      class: 'dialog-delete-user-modal'
    });
  }

  reset(){
    const input = this.children.body as FormInput
    input.setProps({value: '', isInvalid: false})
  }

  private __handleApply(e: Event, callback: VoidFunction) {
    const target = e.target as HTMLInputElement
    console.log("DELETE_DIALOG_USER: ",target.value)
    callback();
  }

  private __handleClose(callback: VoidFunction) {
    callback();
  }
}
