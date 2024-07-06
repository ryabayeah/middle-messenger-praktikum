import { ChatDialog, ChatDialogShort } from "../models";

export const CURRENT_USER_ID = 1;


export const DIALOG_CARDS: ChatDialogShort[] = [
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
      id: 1231,
      avatarSrc: "",
      name: "Кузьма",
      isLastMe: false,
      lastMessage:
        "Тыкни на меня, что бы увидеть сообщение об ошибке",
      lastMessageTime: "15:34",
    },
    {
      id: 1323,
      avatarSrc: "",
      name: "Чат, где нет сообщений",
      isLastMe: false,
      lastMessage:
        "",
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
      messageCount: 4,
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

export const DIALOGS: ChatDialog[] = [
  {
    id: 1,
    avatar: "",
    name: "Вадим",
    messages: [
      {
        senderId: 2,
        message: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
        timestamp: 0,
        type: "text",
      },
      {
        senderId: 2,
        src: "https://i08.fotocdn.net/s131/1641425b569167cc/public_pin_l/2958360175.jpg",
        timestamp: 0,
      },
      {
        senderId: CURRENT_USER_ID,
        message: "Так круто!",
        type: "text",
        timestamp: 0,
        isRead: true,
      },

    ],
  },
  {
    id: 2,
    avatar: "",
    name: "Илья",
    messages: [
      {
        senderId: 2,
        message: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
        timestamp: 0,
        type: "text",
      },
      {
        senderId: CURRENT_USER_ID,
        message: "Так круто!",
        type: "text",
        timestamp: 0,
        isRead: true,
      },

    ],
  },
];
