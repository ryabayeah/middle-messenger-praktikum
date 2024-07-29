import { FIELDS } from '../../../../shared/constants';
import { Button, FormInput, Modal } from '../../../../shared/ui';
import { loginValidator } from '../../../../shared/utils';
import { chatController } from '../../controller';
import './chat-delete-user-modal.scss';

interface ChatDeleteUserModalProps extends CompileOptions {
  dialogId: number
  onClose: VoidFunction;
  onApply: () => void;
}

export class ChatDeleteUserModal extends Modal {
  constructor({ dialogId, onClose, onApply }: ChatDeleteUserModalProps) {
    const saveButton = new Button({
      text: 'Удалить',
      variant: 'primary',
      class: 'w-full',
      type: 'button',
      onClick: () => this.__handleApply(dialogId, onApply),
    });
    const altButton = new Button({
      text: 'Отмена',
      variant: 'secondary',
      class: 'w-full',
      type: 'button',
      onClick: () => this.__handleClose(onClose),
    });

    const loginInput = new FormInput({
      ...FIELDS.login,
      validateOn: ['blur'],
      validator: loginValidator,
    });

    super({
      hide: false,
      title: 'Удалить пользователя',
      body: loginInput,
      buttons: [saveButton, altButton],
      class: 'dialog-delete-user-modal',
    });
  }

  reset() {
    const input = this.children.body as FormInput;
    input.setProps({ value: '', isInvalid: false });
  }

  private __handleApply(dialogId: number, callback: VoidFunction) {
    const target = this.element!.querySelector('form');
    if (target){
      const formData = new FormData(target)
      const login = formData.get('login')?.toString()
      if (!login) return
      chatController.deleteUserFromChat(login, dialogId)
    }

    this.reset();
    callback();
  }

  private __handleClose(callback: VoidFunction) {
    callback();
  }
}
