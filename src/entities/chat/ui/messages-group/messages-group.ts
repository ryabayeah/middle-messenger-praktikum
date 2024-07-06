import "./messages-group.scss";
import template from "./messages-group.hbs?raw";
import { MessageBubble } from "../message-bubble";
import { Block } from "../../../../shared/lib";

interface MessagesGroupProps extends CompileOptions {
  date: string; // TODO: сделать таймстампом?
  messages: MessageBubble[];
}

export class MessagesGroup extends Block {
  constructor(props: MessagesGroupProps) {
    super({
      ...props,
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
