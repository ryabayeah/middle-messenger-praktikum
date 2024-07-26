import { chatController } from '../../entities/chat/controller';
import { store } from '../store/store';

const URL = 'wss://ya-praktikum.tech/ws/chats';

export class Socket {
  socket: WebSocket;
  private readonly _token: string;
  private readonly _chatId: number;
  private readonly _userId: number;

  constructor({ chatId, token }: { chatId: number; token: string }) {
    this._userId = store.getState().user?.id || 0;
    this._chatId = chatId;
    this._token = token;
    this.socket = this._createConnection();

    console.log(this._userId)
    this._start();
  }

  private _createConnection() {
    return new WebSocket(
      `${URL}/${this._userId}/${this._chatId}/${this._token}`,
    );
  }

  private _start() {
    this.socket.addEventListener('open', () => {
      console.log(`${this._chatId}: Соединение установлено`);

      this._pingPong.bind(this);
    });

    this.socket.addEventListener('close', (event: CloseEvent) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');

        this.socket = this._createConnection();
        this._start();
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('message', async (event: MessageEvent) => {
      try {
        console.log('NEW', JSON.parse(event.data));
        // await chatController.setMessages(JSON.parse(event.data));
      } catch (error) {
        // handleError(error);
      }
    });

    this.socket.addEventListener('error', (event) =>
      console.error('Ошибка', event),
    );
  }

  async sendMessage(content: string) {
    this.socket.send(
      JSON.stringify({
        content,
        type: 'message',
      }),
    );

    // await chatsController.getAllChats();
    store.set('chat.last_message', {
      user: store.getState().user,
      time: new Date(),
      content,
    });
  }

  getOldMessages() {
    this.socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      }),
    );
  }

  private _pingPong() {
    setInterval(
      () => this.socket.send(JSON.stringify({ type: 'ping' })),
      10000,
    );
  }
}
