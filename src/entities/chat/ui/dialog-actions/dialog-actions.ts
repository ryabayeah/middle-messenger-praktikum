import "./dialog-actions.scss";
import template from "./dialog-actions.hbs?raw";
import { Block } from "../../../../shared/lib";
import { Button } from "../../../../shared/ui";
import { DIALOG_ICONS } from "../../lib/constants";

interface DialogActionsProps extends CompileOptions {
  onUserAdd: (e: Event) => void;
  onUserDelete: (e: Event) => void;
  onDialogDelete: (e: Event) => void;
}

// TODO: Сделать общим компонентом с DialogAttachments
export class DialogActions extends Block {
  constructor({ onUserAdd, onUserDelete, onDialogDelete }: DialogActionsProps) {
    const buttonAddUser = new Button({
      text: "Добавить пользователя",
      variant: "secondary",
      icon: DIALOG_ICONS.ADD,
      onClick: onUserAdd,
    });
    const buttonDeleteUser = new Button({
      text: "Удалить пользователя",
      variant: "secondary",
      icon: DIALOG_ICONS.DELETE,
      onClick: onUserDelete,
    });
    const buttonDeleteDialog = new Button({
      text: "Удалить диалог",
      variant: "error",
      icon: DIALOG_ICONS.DELETE,
      onClick: onDialogDelete,
    });

    super({
      buttonAddUser,
      buttonDeleteUser,
      buttonDeleteDialog,
    });
  }

  toggleVisibility() {
    this.element?.style.display === "none" ? this.show() : this.hide();
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
