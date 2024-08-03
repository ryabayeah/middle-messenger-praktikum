import { Modal } from '../../../../shared/ui/modal/modal';
import { Button } from '../../../../shared/ui/button';
import { FileUpload } from '../../../../shared/ui/file-upload';
import { userController } from '../../controller';

interface UserAvatarModalProps extends CompileOptions {
  isInvalid?: boolean;
  isLoading?: boolean;
  onClose: VoidFunction;
  onApply: VoidFunction;
}

// TODO: Подумать над уровнями доступа методов
export class UserAvatarModal extends Modal {
  constructor({ onClose, onApply, ...props }: UserAvatarModalProps) {
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
    const file = this.props.avatarFile as File | null;
    if (file) {
      this.setProps({ isLoading: true });
      const formData = new FormData();
      formData.append('avatar', file);
      userController
        .updateUserAvatar(formData)
        .then(() => {
          this.__resetModalBody();
          this.setProps({ isLoading: false });
          callback();
        })
        .catch((error: Error) => {
          this.setProps({ isLoading: false });
          alert(error.message);
        });
    } else {
      alert('Прикрепите файл');
      return;
    }
  }

  private __handleClose(callback: VoidFunction) {
    this.__resetModalBody();
    callback();
  }
}
