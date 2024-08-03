import './chat-error-layout.scss';
import template from './chat-error-layout.hbs?raw';
import { Block } from '../../../../shared/lib';

interface ChatErrorLayoutProps extends CompileOptions {
  message: string;
}

export class ChatErrorLayout extends Block {
  constructor(props: ChatErrorLayoutProps) {
    super({
      ...props,
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
