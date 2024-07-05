import { FIELDS } from "../../../../shared/constants";
import { Button, FormInput, Modal } from "../../../../shared/ui";
import { loginValidator } from "../../../../shared/utils";
import './dialog-add-user-modal.scss'

interface DialogAddUserModalProps extends CompileOptions {
  onClose: VoidFunction;
  onApply: VoidFunction;
}

export class DialogAddUserModal extends Modal {
  constructor({ onClose, onApply }: DialogAddUserModalProps) {
    const saveButton = new Button({
      text: "Применить",
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
      class: 'dialog-add-user-modal__login',
      validateOn: ['blur'],
      validator: loginValidator,
    })

    super({
      hide: false,
      title: "Добавить пользователя",
      body: loginInput,
      buttons: [saveButton, altButton],
      class: 'dialog-add-user-modal'
    });
  }

  reset(){
    const input = this.children.body as FormInput
    input.setProps({value: '', isInvalid: false})
  }

  private __handleApply(e: Event, callback: VoidFunction) {
    const target = e.target as HTMLInputElement
    console.log(target.value)
    this.reset()
    callback();
  }

  private __handleClose(callback: VoidFunction) {
    this.reset()
    callback();
  }
}
