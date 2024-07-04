import { Block } from "../../../../shared/lib";
import { Inputt } from "../../../../shared/ui/input";
import { Linkk } from "../../../../shared/ui/link/link";
import "./user-avatar-upload.scss";
import template from "./user-avatar-upload.hbs?raw";

interface UserAvatarUploadProps extends CompileOptions {
  onUploadAvatar: (f: File) => void;
}

export class UserAvatarUpload extends Block {
  constructor({ onUploadAvatar }: UserAvatarUploadProps) {
    const link = new Linkk({
      text: "Выбрать файл на компьютере",
      href: "#",
      class: "underline",
      onClick: () => {
        this.handleClick();
      },
    });

    const uploadedFileLink = new Linkk({
      text: "",
      href: "#",
      onClick: () => {
        // TODO: Скачивать файл на клик
      },
    });

    const hiddenInput = new Inputt({
      type: "file",
      id: "hidden_input",
      name: "avatar_data",
      multiple: false,
      accept: 'image/jpeg, image/png',
      onChange: (e: Event) => this.handleAvatarUpload(e, onUploadAvatar),
    });
    hiddenInput.hide();
    uploadedFileLink.hide();

    const avatarFile: File | null = null;
    super({
      link,
      hiddenInput,
      avatarFile,
      uploadedFileLink,
      onUploadAvatar,
    });
  }


  protected _hideUploadedFileLinkRef(){
    const uploadedFileLinkRef = this.children.uploadedFileLink as Linkk;
    if (uploadedFileLinkRef) {
      uploadedFileLinkRef.hide();
    }
  }

  protected _showUploadedFileLinkRef(text: string){
    const uploadedFileLinkRef = this.children.uploadedFileLink as Linkk;
    if (uploadedFileLinkRef) {
      uploadedFileLinkRef.setProps({ text });
      uploadedFileLinkRef.show();
    }
  }

  protected _resetHiddenInputValue(){
    const hiddenInputRef = this.children.hiddenInput as Inputt;
    if (hiddenInputRef) {
        hiddenInputRef.setProps({ value: undefined });
        // TODO: Это костыль. При сбросе пропсов сбрасывается значение display в styles.
        hiddenInputRef.hide()
    }
  }


  handleClick() {
    const hiddenInputRef = this.children.hiddenInput as Inputt;
    hiddenInputRef.click();
    this._hideUploadedFileLinkRef()
    // TODO: Сделать обработку загрузки файла (isLoading)
    // TODO: Сделать обработку ошибки загрузки файла (isError)
  }

  reset(){
    this._hideUploadedFileLinkRef()
  }

  handleAvatarUpload(e: Event, callback: (f: File) => void) {
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    if (files.length > 0) {
      const file = files[0];
      callback(file);
      this._showUploadedFileLinkRef(`Загружен файл ${file.name}`)
      this._resetHiddenInputValue()
      this.setProps({ avatarFile: file });
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
