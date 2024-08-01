import './message-bubble.scss';
import template from './message-bubble.hbs?raw';
import { Block } from '../../../../shared/lib';
import { MessageAttachmentType } from '../../lib';

interface MessageBubbleProps extends CompileOptions {
  id: number;
  content?: string;
  time: string;
  type: 'message' | 'object';
  isRead?: boolean;
  class?: string;

  attachment?: { type: MessageAttachmentType; src: string };
  isOuter?: boolean;
}

interface InternalMessageBubbleProps extends MessageBubbleProps {
  file?: string;
  video?: string;
  img?: string;
  location?: string;
}

export class MessageBubble extends Block {
  constructor({ attachment, ...props }: MessageBubbleProps) {
    const bubbleProps: InternalMessageBubbleProps = { ...props };
    if (attachment) {
      bubbleProps[attachment.type] = attachment.src;
    }
    super({
      ...bubbleProps,
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
