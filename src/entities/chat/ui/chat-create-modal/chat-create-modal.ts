import { Button, FormInput, Modal } from '../../../../shared/ui';
import { chatController } from '../../controller';

interface ChatCreateModalProps extends CompileOptions {
  onClose: VoidFunction;
  onApply: VoidFunction;
}

export class ChatCreateModal extends Modal {
  constructor({ onClose, onApply }: ChatCreateModalProps) {
    const createButton = new Button({
      text: 'Создать',
      variant: 'primary',
      class: 'w-full',
      type: 'submit',
      // onClick: (e: Event) => this.__handleApply(e, onApply),
    });
    const altButton = new Button({
      text: 'Отмена',
      variant: 'secondary',
      class: 'w-full',
      type: 'button',
      onClick: () => this.__handleClose(onClose),
    });

    const loginInput = new FormInput({
      id: 'dialog_name',
      name: 'dialog_name',
      placeholder: 'Введите название нового диалога',
      validateOn: ['blur'],
    });

    super({
      hide: false,
      title: 'Создание диалога',
      body: loginInput,
      buttons: [createButton, altButton],
      class: 'dialog-delete-user-modal',
      onSubmit: (e: Event) => this.__handleApply(e, onApply),
    });
  }

  reset() {
    const input = this.children.body as FormInput;
    input.setProps({ value: '', isInvalid: false });
  }

  private __handleApply(_: Event, callback: VoidFunction) {
    const target = this.element!.querySelector('form');
    if (target) {
      const formData = new FormData(target);
      const title = formData.get('dialog_name')?.toString();
      if (!title) {
        alert('Название чата не может быть пустым');
        return;
      }
      chatController
        .createChat(title || '')
        .then(() => {
          callback();
        })
        .catch((error: Error) => {
          alert(error.message);
        });
    }
  }

  private __handleClose(callback: VoidFunction) {
    callback();
  }
}
