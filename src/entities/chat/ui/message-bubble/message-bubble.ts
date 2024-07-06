import "./message-bubble.scss";
import template from "./message-bubble.hbs?raw";
import { Block } from "../../../../shared/lib";

interface MessageBubbleProps extends CompileOptions {
    message?: string
    attachmentSrc?: string
    time: string
    isOuter?: boolean
    isRead?: boolean
}

export class MessageBubble extends Block {
  constructor(props: MessageBubbleProps ) {
    super({
        ...props
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
