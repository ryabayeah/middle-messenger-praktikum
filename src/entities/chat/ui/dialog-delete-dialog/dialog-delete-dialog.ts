import { Button, FormInput, Modal } from '../../../../shared/ui';
import './dialog-delete-dialog-modal.scss';

interface DialogDeleteDialogModalProps extends CompileOptions {
  onClose: VoidFunction;
  onApply: () => void;
}

export class DialogDeleteDialogModal extends Modal {
  constructor({ onClose, onApply }: DialogDeleteDialogModalProps) {
    const saveButton = new Button({
      text: 'Удалить',
      variant: 'primary',
      class: 'w-full',
      type: 'button',
      onClick: (e: Event) => this.__handleApply(onApply),
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

  private __handleApply(callback: VoidFunction) {
    callback();
  }

  private __handleClose(callback: VoidFunction) {
    callback();
  }
}
