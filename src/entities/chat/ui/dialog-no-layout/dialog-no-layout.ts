import './dialog-no-layout.scss';
import template from './dialog-no-layout.hbs?raw';
import { Block } from '../../../../shared/lib';

interface DialogNoLayoutProps extends CompileOptions {
  message: string;
}

export class DialogNoLayout extends Block {
  constructor(props: DialogNoLayoutProps) {
    super({
      ...props,
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
