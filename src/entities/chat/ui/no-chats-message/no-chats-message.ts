import './no-chats-message.scss';
import template from './no-chats-message.hbs?raw';
import { Block } from '../../../../shared/lib';
import { Button } from '../../../../shared/ui';

export class NoChatsMessage extends Block {
  constructor() {
    const createButton = new Button({
      text: 'Создайте диалог',
    });
    super({createButton});
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
