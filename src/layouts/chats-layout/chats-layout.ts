import {
  DialogCard,
  DialogSearch,
  NoDialogMessage,
} from "../../entities/chat/ui";
import { APP_PATH } from "../../shared/constants";
import { Block } from "../../shared/lib";
import { Link } from "../../shared/ui";
import template from "./chats-layout.hbs?raw";
import "./chats-layout.scss";

const DIALOG_CARDS: ChatDialog[] = [
  {
    id: 1,
    avatarSrc: "",
    name: "Вадим",
    isLastMe: true,
    lastMessage: "Так круто!",
    lastMessageTime: "15:34",
  },
  {
    id: 2,
    avatarSrc: "",
    name: "Илья",
    isLastMe: false,
    lastMessage:
      "Друзья, у меня для вас большие новости! Мы смогли сделать первый в мире самолет на ядерном двигателе",
    lastMessageTime: "15:34",
  },
  {
    id: 33,
    avatarSrc: "",
    name: "Илья",
    isLastMe: false,
    lastMessage:
      "Друзья, у меня для вас большие новости! Мы смогли сделать первый в мире самолет на ядерном двигателе",
    lastMessageTime: "15:34",
  },
  {
    id: 1231,
    avatarSrc: "",
    name: "Илья",
    isLastMe: false,
    lastMessage:
      "Друзья, у меня для вас большие новости! Мы смогли сделать первый в мире самолет на ядерном двигателе",
    lastMessageTime: "15:34",
  },
  {
    id: 1323,
    avatarSrc: "",
    name: "Илья",
    isLastMe: false,
    lastMessage:
      "Друзья, у меня для вас большие новости! Мы смогли сделать первый в мире самолет на ядерном двигателе",
    lastMessageTime: "15:34",
  },
  {
    id: 14444,
    avatarSrc: "",
    name: "Илья",
    isLastMe: false,
    lastMessage:
      "Друзья, у меня для вас большие новости! Мы смогли сделать первый в мире самолет на ядерном двигателе",
    lastMessageTime: "15:34",
  },
  {
    id: 156,
    avatarSrc: "",
    name: "Илья",
    isLastMe: false,
    lastMessage:
      "Друзья, у меня для вас большие новости! Мы смогли сделать первый в мире самолет на ядерном двигателе",
    lastMessageTime: "15:34",
  },
  {
    id: 661,
    avatarSrc: "",
    name: "Илья",
    isLastMe: false,
    lastMessage:
      "Друзья, у меня для вас большие новости! Мы смогли сделать первый в мире самолет на ядерном двигателе",
    lastMessageTime: "15:34",
  },
  {
    id: 661,
    avatarSrc: "",
    name: "Илья",
    isLastMe: false,
    lastMessage:
      "Друзья, у меня для вас большие новости! Мы смогли сделать первый в мире самолет на ядерном двигателе",
    lastMessageTime: "15:34",
  },
  {
    id: 166,
    avatarSrc: "",
    name: "Илья",
    isLastMe: false,
    lastMessage:
      "Друзья, у меня для вас большие новости! Мы смогли сделать первый в мире самолет на ядерном двигателе",
    lastMessageTime: "15:34",
  },
];

type ChatDialog = {
  id: number;
  avatarSrc: string;
  name: string;
  isLastMe: boolean;
  lastMessage: string;
  lastMessageTime: string;
};

interface ChatsLayoutProps extends CompileOptions {
  searchQuery?: string;
  dialogs?: ChatDialog[];
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
      body: new NoDialogMessage(),
    });
  }

  renderNoDataMessage() {
    return new NoDialogMessage();
  }

  // TODO: Здесь будет API запрос с search (?), вместо фильтрации "руками"
  getFilteredChatDialogs(name: string) {
    return (this.props.dialogs as ChatDialog[]).filter((dialog) =>
      dialog.name.includes(name)
    );
  }

  renderDialogCards(dialogs: ChatDialog[], activeId: number | undefined){
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

  renderBody(id?: number){
    const body = new NoDialogMessage()
    if (id){
      // TODO: Рендер диалогового окна
    }
  
    this.setChildren({ body });
  }
  handleDialogCardSearch(value: string) {
    const filteredDialogs = this.getFilteredChatDialogs(value);
    this.setProps({ searchQuery: value, dialogs: filteredDialogs  });
    this.renderDialogCards(filteredDialogs, this.props.selectedDialogId as number | undefined)
  }

  handleDialogCardClick(id?: number) {
    this.setProps({ selectedDialogId: id });
    // TODO: Продумать как изменить пропсы ТОЛЬКО У ОДНОЙ КАРТОЧКИ. Перерисовка всех карточек - костыль.
    this.renderDialogCards(this.props.dialogs as ChatDialog[], id)
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
