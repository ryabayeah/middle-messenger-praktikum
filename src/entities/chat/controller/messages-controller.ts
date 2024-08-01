import { Socket } from '../../../shared/lib';
import { store } from '../../../shared/lib/store';
import { chatApi } from '../api';
import { Message } from '../lib';
import { chatController } from './chat-controller';

export class MessageController {
  private socket: Socket | null = null;
  private _offset: number = 0;
  private _isAllMessage: boolean = false;
  private _ping: NodeJS.Timer | undefined;

  async connectToChat(chatId: number) {
    await chatApi
      .getChatToken(chatId)
      .then((resp) => {
        const { token } = resp as { token: string };
        if (token) {
          this.socket = new Socket({ chatId, token: token.toString() });

          this.socket.open(() => {
            this._offset = 0;
            this._isAllMessage = false;
            this.getMessages();

            setInterval(() => {
              this.socket?.send(
                JSON.stringify({
                  content: '',
                  type: '',
                }),
              );
            }, 20000);
          });
          this.socket.message(({ data }) => {
            const messages: Message[] = JSON.parse(data);
            messageController.setMessages(messages);
          });
          this.socket.close(() => {
            console.log('Connection closed');

            if (!this.socket) return;
            clearInterval(this._ping);
            this._isAllMessage = false;
            this._ping = undefined;
            this._offset = 0;
            this.socket = null;
          });
          this.socket.error(() => {
            console.log('Connection error');
          });
        }
      })
      .catch(() => {});
  }

  async setMessages(data: Message[] | Message) {
    const state = store.getState();

    if (Array.isArray(data) && data.length < 20) {
      this._isAllMessage = true;
      store.set('isLoading', false);
      store.set('isLoadingOldMsg', false);
    }

    if (Array.isArray(data) && data.length) {
      if (data[0].id === 1) {
        store.set('messages', [...data]);
        store.set('isLoading', false);
      } else {
        const oldMessages = state.messages || [];
        store.set('messages', [...oldMessages, ...data]);
        store.set('isLoadingOldMsg', false);
      }
    } else if (
      typeof data === 'object' &&
      (data as Message)?.type === 'message'
    ) {
      const oldMessages = state.messages || [];
      store.set('messages', [data, ...oldMessages]);
      this._offset += 1;
    }

    await chatController.getChats();
  }

  getMessages(): void {
    if (this._isAllMessage) {
      return;
    }
    if (this._offset) {
      store.set('isLoadingOldMsg', true);
    }
    this.socket!.send(
      JSON.stringify({
        content: this._offset,
        type: 'get old',
      }),
    );
    this._offset += 20;
  }

  async sendMessage(content: string) {
    this.socket!.send(
      JSON.stringify({
        content,
        type: 'message',
      }),
    );

    await chatController.getChats();
  }
}

export const messageController = new MessageController();
