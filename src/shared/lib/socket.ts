import { store } from './store';

const URL = 'wss://ya-praktikum.tech/ws/chats';

enum Listeners {
  OPEN = 'open',
  CLOSE = 'close',
  MESSAGE = 'message',
  ERROR = 'error',
}

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

    // this._start();
  }

  private _createConnection() {
    return new WebSocket(
      `${URL}/${this._userId}/${this._chatId}/${this._token}`,
    );
  }

  open(callBack: () => void) {
    this.socket?.addEventListener(Listeners.OPEN, callBack);
  }

  close(callBack: (event: CloseEvent) => void) {
    const funk = (event: CloseEvent) => {
      callBack(event);
    };
    this.socket?.addEventListener(Listeners.CLOSE, funk);
  }

  message(callBack: (event: MessageEvent) => void) {
    const funk = (event: MessageEvent) => {
      callBack(event);
    };
    this.socket?.addEventListener(Listeners.MESSAGE, funk);
  }

  error(callBack: (event: Event) => void) {
    this.socket?.addEventListener(Listeners.ERROR, callBack);
  }


  send(json: string) {
    this.socket.send(json);
  }

  pingPong() {
    setInterval(
      () => this.socket.send(JSON.stringify({ type: 'ping' })),
      10000,
    );
  }
}
