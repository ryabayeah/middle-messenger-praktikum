import "./dialog-attachments.scss";
import template from "./dialog-attachments.hbs?raw";
import { Block } from "../../../../shared/lib";
import { Button, Input } from "../../../../shared/ui";
import { DIALOG_ICONS } from "../../lib/constants";

interface DialogAttachmentsProps extends CompileOptions {
  // TODO: Узнать в каком формате Location
  onAttach: (file: File) => void;
}

// TODO: Сделать общим компонентом с DialogActions
export class DialogAttachments extends Block {
  constructor({ onAttach }: DialogAttachmentsProps) {
    const buttonAddPhotoVideo = new Button({
      text: "Фото или видео",
      variant: "secondary",
      icon: DIALOG_ICONS.ATTACH_PHOTO_VIDEO,
      onClick: () => this._callFileAttach("image/*, video/*"),
    });
    const buttonAddFile = new Button({
      text: "Файл",
      variant: "secondary",
      icon: DIALOG_ICONS.ATTACH_FILE,
      onClick: () => this._callFileAttach(".pdf, .doc, .docx"),
    });
    const buttonAddLocation = new Button({
      text: "Локация",
      variant: "secondary",
      icon: DIALOG_ICONS.ATTACH_LOCATION,
      onClick: () => this.__handleAddLocationClick(),
    });

    const hiddenInput = new Input({
      id: "hiddenInput",
      name: "hiddenInput",
      type: "file",
      class: "hidden",
      onChange: (e: Event) => this.handleAttachUpload(e, onAttach),
    });

    super({
      buttonAddPhotoVideo,
      buttonAddFile,
      buttonAddLocation,
      hiddenInput,
    });
  }

  protected _resetHiddenInputValue() {
    const hiddenInputRef = this.children.hiddenInput as Input;
    if (hiddenInputRef) {
      hiddenInputRef.setProps({ value: undefined });
      // TODO: Это костыль. При сбросе пропсов сбрасывается значение display в styles.
      hiddenInputRef.hide();
    }
  }

  handleAttachUpload(e: Event, callback: (f: File) => void) {
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    if (files.length > 0) {
      const file = files[0];
      callback(file);
      this._resetHiddenInputValue();
    }
  }

  protected _callFileAttach(accept: string) {
    const hiddenInput = this.children.hiddenInput as Input;
    if (hiddenInput) {
      hiddenInput.setProps({ accept });
      hiddenInput.click();
    }
  }

  private __handleAddLocationClick() {
    // TODO: Какой формат Location?
    // callback()
  }
  toggleVisibility() {
    this.element?.style.display === "none" ? this.show() : this.hide();
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
