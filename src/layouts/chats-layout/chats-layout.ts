import {
  DIALOG_CARDS,
  DIALOG_MESSAGE,
} from "../../entities/chat/lib/constants";
import { ChatDialogShort } from "../../entities/chat/lib/models";
import {
  Dialog,
  DialogCard,
  DialogSearch,
  DialogNoLayout,
} from "../../entities/chat/ui";
import { APP_PATH } from "../../shared/constants";
import { Block } from "../../shared/lib";
import { Link } from "../../shared/ui";
import template from "./chats-layout.hbs?raw";
import "./chats-layout.scss";

interface ChatsLayoutProps extends CompileOptions {
  searchQuery?: string;
  dialogs?: ChatDialogShort[];
  selectedDialogId?: number;
}

export class ChatsLayout extends Block {
  constructor({
    searchQuery = "",
    dialogs = DIALOG_CARDS,
    selectedDialogId,
    ...props
  }: ChatsLayoutProps) {
    const linkProfile = new Link({
      text: "Профиль  >",
      href: APP_PATH.PROFILE,
      class: "text-secondary profile-link",
    });

    const dialogCards = dialogs.map(
      (card) =>
        new DialogCard({
          ...card,
          isActive: card.id === selectedDialogId,
          onClick: (id?: number) => this.handleDialogCardClick(id),
        })
    );

    const dialogSearch = new DialogSearch({
      onChange: (value: string) => this.handleDialogCardSearch(value),
    });

    super({
      ...props,
      searchQuery,
      selectedDialogId,
      dialogs,

      linkProfile,
      sidebarHeader: dialogSearch,
      sidebarBody: dialogCards,
      body: new DialogNoLayout({
        message: DIALOG_MESSAGE.NO_DIALOG_SELECTED,
      }),
    });
  }

  renderNoDataMessage() {
    return new DialogNoLayout({
      message: DIALOG_MESSAGE.NO_DIALOG_SELECTED,
    });
  }

  // TODO: Здесь будет API запрос с search (?), вместо фильтрации "руками"
  getFilteredChatDialogs(name: string) {
    return (this.props.dialogs as ChatDialogShort[]).filter((dialog) =>
      dialog.name.includes(name)
    );
  }

  renderDialogCards(dialogs: ChatDialogShort[], activeId: number | undefined) {
    this.setChildren({
      sidebarBody: dialogs.map(
        (card) =>
          new DialogCard({
            ...card,
            isActive: card.id === activeId,
            onClick: (id?: number) => this.handleDialogCardClick(id),
          })
      ),
    });
  }

  renderBody(id?: number) {
    let body;
    if (id) {
      const dialogs = this.props.dialogs as ChatDialogShort[];
      const shortDialog = dialogs.find((d) => d.id === id);
      if (shortDialog) {
        body = new Dialog({
          id,
          name: shortDialog.name,
          avatar: shortDialog.avatarSrc,
        });
      }
    } else {
      body = new DialogNoLayout({
        message: DIALOG_MESSAGE.NO_DIALOG_SELECTED,
      });
    }

    this.setChildren({ body });
  }
  handleDialogCardSearch(value: string) {
    const filteredDialogs = this.getFilteredChatDialogs(value);
    this.setProps({ searchQuery: value, dialogs: filteredDialogs });
    this.renderDialogCards(
      filteredDialogs,
      this.props.selectedDialogId as number | undefined
    );
  }

  handleDialogCardClick(id?: number) {
    this.setProps({ selectedDialogId: id });
    // TODO: Продумать как изменить пропсы ТОЛЬКО У ОДНОЙ КАРТОЧКИ. Перерисовка всех карточек - костыль.
    this.renderDialogCards(this.props.dialogs as ChatDialogShort[], id);
    this.renderBody(id);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
