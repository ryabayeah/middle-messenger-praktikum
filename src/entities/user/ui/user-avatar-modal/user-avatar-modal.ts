import template from "./user-avatar-modal.hbs?raw";
import { Block } from "../../../../shared/lib";
import { Modal } from "../../../../shared/ui/modal/modal";
import { Button } from "../../../../shared/ui/button";
import { UserAvatarUpload } from "../user-avatar-upload";

interface UserAvatarModalProps extends CompileOptions {
  isInvalid?: boolean;
  onClose: VoidFunction;
  onApply: (file: File) => void;
}


export class UserAvatarModal extends Block {
  constructor({ onClose, onApply, ...props }: UserAvatarModalProps) {
    const avatarFile: File | null = null;
    const saveButton = new Button({
      text: "Поменять",
      variant: "primary",
      class: "w-full",
      type: 'button',
      onClick: () => this.handleApply(onApply),
    });
    const altButton = new Button({
      text: "Отмена",
      variant: "secondary",
      class: "w-full",
      type: 'button',
      onClick: ()=> this.handleClose(onClose),
    });

    const modalBody = new UserAvatarUpload({
      onUploadAvatar: (f: File) => {
        this.handleUploadAvatar(f)
      },
    });

    const modal = new Modal({
      ...props,
      hide: false,
      title: "Загрузите файл",
      body: modalBody,
      buttons: [saveButton, altButton],
    });

    super({
      modal,
      modalBody,
      altButton,
      saveButton,
      avatarFile,
    });
  }

  handleUploadAvatar(file: File) {
    this.setProps({ avatarFile: file });
  }

  handleApply(callback: (file: File)=> void) {
    const file = this.props.avatarFile as File | null
    if (file){
      callback(file)
    }
    // При закрытии модалки сбрасываем все примененые значения
    this.__resetModalBody()
  }

  private __resetModalBody(){
    const modalBodyRef = this.children.modalBody as UserAvatarUpload
    if (modalBodyRef){
      modalBodyRef.reset()
    }
  }

  handleClose(callback: VoidFunction) {
    callback()
    // При закрытии модалки сбрасываем все примененые значения
    this.__resetModalBody()

  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
