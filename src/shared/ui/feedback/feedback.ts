import { Block } from '../../lib';
import './feedback.scss';
import template from './feedback.hbs?raw';

interface FeedbackProps extends CompileOptions {
  class?: string;
  isInvalid?: boolean;
  value: string;
}

export class Feedback extends Block {
  constructor({ ...props }: FeedbackProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
