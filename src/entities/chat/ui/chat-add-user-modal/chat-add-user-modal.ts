import { FIELDS } from '../../../../shared/constants';
import { store } from '../../../../shared/lib';
import { Button, FormInput, Modal } from '../../../../shared/ui';
import { loginValidator } from '../../../../shared/utils';
import { chatController } from '../../controller';
import './chat-add-user-modal.scss';

interface DialogAddUserModalProps extends CompileOptions {
  onClose: VoidFunction;
  onApply: VoidFunction;
}

// Features
export class ChatAddUserModal extends Modal {
  constructor({ onClose, onApply }: DialogAddUserModalProps) {
    const saveButton = new Button({
      text: 'Добавить',
      variant: 'primary',
      class: 'w-full',
      type: 'submit',
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
      class: 'dialog-add-user-modal__login',
      validateOn: ['blur'],
      validator: loginValidator,
    });

    super({
      hide: false,
      title: 'Добавить пользователя',
      body: loginInput,
      buttons: [saveButton, altButton],
      class: 'dialog-add-user-modal',
      onSubmit: () => this.__handleApply(onApply),
    });
  }

  reset() {
    const input = this.children.body as FormInput;
    input.setProps({ value: '', isInvalid: false });
  }

  private __handleApply(callback: VoidFunction) {
    const state = store.getState();
    const target = this.element!.querySelector('form');
    if (target) {
      const formData = new FormData(target);
      const login = formData.get('login')?.toString();
      const chatId = state.selectedDialog?.id;
      if (!login) {
        alert('Логин не может быть пустым');
        return;
      }
      if (!chatId) {
        alert('Не удалось добавить пользователя');
        return;
      }
      chatController
        .addUserToChat(login, chatId)
        .then(() => {
          alert('Пользователь добавлен в чат');
        })
        .catch((error: Error) => {
          alert(error.message);
        });
    }

    this.reset();
    callback();
  }

  private __handleClose(callback: VoidFunction) {
    this.reset();
    callback();
  }
}
