import './chat-actions.scss';
import template from './chat-actions.hbs?raw';
import { Block } from '../../../../shared/lib';
import { Button } from '../../../../shared/ui';
import { DIALOG_ICONS } from '../../lib/constants';

interface ChatActionsProps extends CompileOptions {
  onUserAdd: (e: Event) => void;
  onUserDelete: (e: Event) => void;
  onDialogDelete: (e: Event) => void;
}

// TODO: Сделать общим компонентом с DialogAttachments
export class ChatActions extends Block {
  constructor({ onUserAdd, onUserDelete, onDialogDelete }: ChatActionsProps) {
    const buttonAddUser = new Button({
      text: 'Добавить пользователя',
      variant: 'secondary',
      icon: DIALOG_ICONS.ADD,
      onClick: onUserAdd,
    });
    const buttonDeleteUser = new Button({
      text: 'Удалить пользователя',
      variant: 'secondary',
      icon: DIALOG_ICONS.DELETE,
      onClick: onUserDelete,
    });
    const buttonDeleteDialog = new Button({
      text: 'Удалить диалог',
      variant: 'secondary',
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
    this.element?.style.display === 'none' ? this.show() : this.hide();
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
