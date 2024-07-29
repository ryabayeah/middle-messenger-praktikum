import { Button, FormInput, Modal } from '../../../../shared/ui';
import { chatController } from '../../controller';
import './chat-delete-modal.scss';

interface ChatDeleteModalProps extends CompileOptions {
  chatId: number
  onClose: VoidFunction;
  onApply: () => void;
}

export class ChatDeleteModal extends Modal {
  constructor({ chatId, onClose, onApply }: ChatDeleteModalProps) {
    const saveButton = new Button({
      text: 'Удалить',
      variant: 'primary',
      class: 'w-full',
      type: 'button',
      onClick: () => this.__handleApply(chatId, onApply),
    });
    const altButton = new Button({
      text: 'Отмена',
      variant: 'secondary',
      class: 'w-full',
      type: 'button',
      onClick: () => this.__handleClose(onClose),
    });

    super({
      hide: false,
      title: 'Вы уверены, что хотите удалить этот диалог?',
      buttons: [saveButton, altButton],
      class: 'dialog-delete-dialog-modal',
    });
  }

  reset() {
    const input = this.children.body as FormInput;
    input.setProps({ value: '', isInvalid: false });
  }

  private __handleApply(id: number, callback: VoidFunction) {
    chatController.deleteChat(id).then(() => {
      chatController.selectChat();
      callback();
    });
  }

  private __handleClose(callback: VoidFunction) {
    callback();
  }
}
