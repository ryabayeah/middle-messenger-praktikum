import './file-upload.scss';
import template from './file-upload.hbs?raw';
import { Block } from '../../lib';
import { Link, Input } from '..';

interface FileUploadProps extends CompileOptions {
  accept?: string;
  onUpload: (f: File) => void;
}

export class FileUpload extends Block {
  constructor({ accept = 'image/jpeg, image/png', onUpload }: FileUploadProps) {
    const link = new Link({
      text: 'Выбрать файл на компьютере',
      // href: '#',
      class: 'underline',
      onClick: () => {
        this.__handleClick();
      },
    });

    const uploadedFileLink = new Link({
      text: '',
      href: '#',
      onClick: () => {
        // TODO: Скачивать файл на клик
      },
    });

    const hiddenInput = new Input({
      type: 'file',
      id: 'hidden_input',
      name: 'avatar_data',
      multiple: false,
      accept,
      onChange: (e: Event) => this.__handleUpload(e, onUpload),
    });
    hiddenInput.hide();
    uploadedFileLink.hide();

    const uploadedFile: File | null = null;
    super({
      link,
      hiddenInput,
      uploadedFile,
      uploadedFileLink,
      onUpload,
    });
  }

  protected _hideUploadedFileLinkRef() {
    const uploadedFileLinkRef = this.children.uploadedFileLink as Link;
    if (uploadedFileLinkRef) {
      uploadedFileLinkRef.hide();
    }
  }

  protected _showUploadedFileLinkRef(text: string) {
    const uploadedFileLinkRef = this.children.uploadedFileLink as Link;
    if (uploadedFileLinkRef) {
      uploadedFileLinkRef.setProps({ text });
      uploadedFileLinkRef.show();
    }
  }

  private __resetHiddenInputValue() {
    const hiddenInputRef = this.children.hiddenInput as Input;
    if (hiddenInputRef) {
      hiddenInputRef.setProps({ value: undefined });
      // TODO: Это костыль. При сбросе пропсов сбрасывается значение display в styles.
      hiddenInputRef.hide();
    }
  }

  private __handleClick() {
    const hiddenInputRef = this.children.hiddenInput as Input;
    hiddenInputRef.click();
    this._hideUploadedFileLinkRef();
    // TODO: Сделать обработку того, что кликнули по Apply а файл не загрузили
    // TODO: Сделать обработку загрузки файла (isLoading)
    // TODO: Сделать обработку ошибки загрузки файла (isError)
  }

  reset() {
    this._hideUploadedFileLinkRef();
  }

  private __handleUpload(e: Event, callback: (f: File) => void) {
    const target = e.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    if (files.length > 0) {
      const file = files[0];
      callback(file);
      this._showUploadedFileLinkRef(`Загружен файл ${file.name}`);
      this.__resetHiddenInputValue();
      this.setProps({ uploadedFile: file });
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
