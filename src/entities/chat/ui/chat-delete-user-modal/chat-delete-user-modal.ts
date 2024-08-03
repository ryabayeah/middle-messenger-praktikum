import { FIELDS } from '../../../../shared/constants';
import { store } from '../../../../shared/lib';
import { Button, FormInput, Modal } from '../../../../shared/ui';
import { chatController } from '../../controller';
import './chat-delete-user-modal.scss';

interface ChatDeleteUserModalProps extends CompileOptions {
  onClose: VoidFunction;
  onApply: VoidFunction;
}

// TODO: Выводить список пользователей чата и удалять из этого списка
export class ChatDeleteUserModal extends Modal {
  constructor({ onClose, onApply }: ChatDeleteUserModalProps) {
    const saveButton = new Button({
      text: 'Удалить',
      variant: 'primary',
      class: 'w-full',
      type: 'button',
      onClick: () => this.__handleApply(onApply),
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

  private async __handleApply(callback: VoidFunction) {
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
        alert('Не удалось удалить пользователя');
        return;
      }
      await chatController
        .deleteUserFromChat(login, chatId)
        .then(() => {
          alert('Пользователь удален');
        })
        .catch((error: Error) => {
          alert(error.message);
        });
    }

    this.reset();
    callback();
  }

  private __handleClose(callback: VoidFunction) {
    callback();
  }
}
