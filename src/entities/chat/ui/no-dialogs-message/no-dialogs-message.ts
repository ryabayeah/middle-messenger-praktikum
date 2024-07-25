import './no-dialogs-message.scss';
import template from './no-dialogs-message.hbs?raw';
import { Block } from '../../../../shared/lib';
import { Button } from '../../../../shared/ui';

interface NoDialogsMessageProps extends CompileOptions {}

export class NoDialogsMessage extends Block {
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
