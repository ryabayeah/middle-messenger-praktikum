import { Block } from '../../shared/lib';
import { Button } from '../../shared/ui';
import template from './error-layout.hbs?raw';
import './error-layout.scss';

interface ErrorLayoutProps extends CompileOptions {
  code: string;
  message: string;
  backPath: string;
  textBackPath: string;
}

export class ErrorLayout extends Block {
  constructor({ textBackPath, ...props }: ErrorLayoutProps) {
    const backButton = new Button({
      variant: 'secondary',
      text: textBackPath,
    });
    super({
      ...props,
      backButton,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
