import { Modal } from '../../../../shared/ui/modal/modal';
import { Button } from '../../../../shared/ui/button';
import { FileUpload } from '../../../../shared/ui/file-upload';
import { chatController } from '../../controller';
import { store } from '../../../../shared/lib';

interface ChatChangeAvatarModalProps extends CompileOptions {
  isInvalid?: boolean;
  isLoading?: boolean;
  onClose: VoidFunction;
  onApply: VoidFunction;
}

export class ChatChangeAvatarModal extends Modal {
  constructor({ onClose, onApply, ...props }: ChatChangeAvatarModalProps) {
    const avatarFile: File | null = null;
    const saveButton = new Button({
      text: 'Поменять',
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

    const modalBody = new FileUpload({
      onUpload: (f: File) => {
        this.__handleUploadAvatar(f);
      },
    });

    super({
      ...{ ...props, avatarFile },
      hide: false,
      title: 'Загрузите файл',
      body: modalBody,
      buttons: [saveButton, altButton],
    });
  }

  private __resetModalBody() {
    const modalBodyRef = this.children.modalBody as FileUpload;
    if (modalBodyRef) {
      modalBodyRef.reset();
    }
  }

  private __handleUploadAvatar(file: File) {
    this.setProps({ avatarFile: file });
  }

  private __handleApply(callback: VoidFunction) {
    const state = store.getState();

    const file = this.props.avatarFile as File | null;
    if (file) {
      this.setProps({ isLoading: true });
      const formData = new FormData();

      const chatId = state.selectedDialog?.id;
      if (!chatId) {
        alert('Не удалось изменить аватар');
        return;
      }
      formData.append('avatar', file);
      formData.append('chatId', chatId.toString());

      chatController
        .updateChatAvatar(formData)
        .then(() => {
          this.__resetModalBody();
          this.setProps({ isLoading: false });
          callback();
        })
        .catch((error: Error) => {
          alert(error.message);
          this.setProps({ isLoading: false });
        });
    } else {
      alert('Прикрепите файл');
    }
  }

  private __handleClose(callback: VoidFunction) {
    this.__resetModalBody();
    callback();
  }
}
