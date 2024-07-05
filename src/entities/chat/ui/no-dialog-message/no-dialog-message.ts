import "./no-dialog-message.scss";
import template from "./no-dialog-message.hbs?raw";
import { Block } from "../../../../shared/lib";

export class NoDialogMessage extends Block {
  constructor() {
    super({
    });
  }
  render() {
    return this.compile(template, { ...this.props });
  }
}
