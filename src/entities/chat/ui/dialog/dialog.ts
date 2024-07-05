import "./dialog.scss";
import template from "./dialog.hbs?raw";
import { Block } from "../../../../shared/lib";
import { Avatar, Button, Input } from "../../../../shared/ui";
import { DialogNoLayout } from "../dialog-no-layout";
import { DIALOG_ICONS, DIALOG_MESSAGE } from "../../lib/contsants";
import { DialogActions } from "../dialog-actions";

interface DialogProps extends CompileOptions {
  id: number;
  name: string;
  avatar?: string;
}

export type ChatDialog = {
  id: number;
  name: string;
  avatar?: string;
  messages?: any[];
};

// TODO: Запрос на получение диалога
export const getDialogData = (id: number): ChatDialog | undefined => {
  const DIALOGS: ChatDialog[] = [
    {
      id: 1,
      avatar: "",
      name: "Вадим",
      messages: [{
        // TODO: Пока не стала подставлять какую то структуру, как появится больше инфы - подставить
      }],
    },
  ];

  const dialog = DIALOGS.find((dialog) => dialog.id === id);
  return dialog;
};

export class Dialog extends Block {
  constructor({ id, name, avatar }: DialogProps) {
    const dialogData = getDialogData(id);

    const dialogAvatar = new Avatar({
      src: avatar,
      class: "user-avatar",
    });
    const messageInput = new Input({
      id: "message",
      name: "message",
      placeholder: "Введите сообщение",
    });

    const actionsButton = new Button({
        class: 'burger',
        icon: DIALOG_ICONS.ACTION,
        text: '',
        onClick: () => this.handleDialogSettingsClick()
    })
    const attachButton = new Button({
      text: "",
      variant: "secondary",
      icon: DIALOG_ICONS.ATTACH,
      class: "buttons",
    });

    const sendButton = new Button({
      text: "",
      variant: "primary",
      icon: DIALOG_ICONS.SEND,
      class: "buttons send",
    });

    const actions =  new DialogActions({
        onUserAdd: (e: Event) => this.__handleAddUserClick(e),
        onUserDelete: (e: Event) => this.__handleDeleteUserClick(e),
    })

    let body;
    if (!dialogData) {
      body = new DialogNoLayout({
        message: DIALOG_MESSAGE.NO_DIALOG_DATA,
      });
    } else if (!dialogData?.messages?.length) {
      body = new DialogNoLayout({
        message: DIALOG_MESSAGE.NO_DIALOG_MESSAGES,
      });
    } else {

    }


    super({
      id,
      name: dialogData?.name || name,
      avatar: dialogAvatar,
      actionsButton,
      actions,

      messageInput,
      attachButton,
      sendButton,
      body
    });
  }

  handleDialogSettingsClick(){
    (this.children.actions as DialogActions).toggleVisibility()
  }

  private __handleAddUserClick(e: Event){
    (this.children.actions as DialogActions).hide()
  }

  private __handleDeleteUserClick(e: Event){
    (this.children.actions as DialogActions).hide()
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
