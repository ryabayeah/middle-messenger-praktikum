import Handlebars from "handlebars";
import { v4 as makeUUID } from "uuid";
import { EventBus } from "../event-bus";

export type PropsAndChildren = Record<string, unknown>;
export type Props = {
  // Record<string, unknown>
  [key: string]: unknown;
  _id?: string | null;
  events?: Record<string, (e: Event) => void>;
};
export type Meta = {
  props: PropsAndChildren;
  tagName: string;
};

// export type Props = {
//   [key: string]: unknown;
// };

export type Children = {
  [key: string]: Block | Block[];
};

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  private _element: HTMLElement | null = null;
  // private _meta: Meta | null = null;
  protected _id: string | null = null;
  protected props: Props = {};
  protected children: Children;
  private eventBus: () => EventBus;

  constructor(
    propsAndChildren: Props
    // , tagName: string = "div"
  ) {
    const { children, props } = this._getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this._id = makeUUID();
    // this._meta = { tagName, props };
    this.children = children;

    this.props = this._makePropsProxy({
      ...props,
    });

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    // this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  //   private _createResources() {
  //     if (this._meta !== null) {
  //       const { tagName } = this._meta;
  //       this._element = this._createDocumentElement(tagName);
  //     }
  //   }

  private _createDocumentElement(tag: string) {
    const element = document.createElement(tag);
    if (this._id) {
      element.setAttribute("data-id", this._id);
    }
    return element;
  }

  private _componentDidMount() {
    this.componentDidMount();
    if (this.children) {
      Object.values(this.children).forEach((child) => {
        if (child instanceof Array) {
          child.forEach((ch) => {
            if (ch instanceof Block) {
              ch.dispatchComponentDidMount();
            }
          });
        } else {
          child.dispatchComponentDidMount();
        }
      });
    }
  }

  componentDidMount(_oldProps?: unknown[]) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    // TODO: Оптимизировать ререндер
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._render();
    }
  }

  componentDidUpdate(_oldProps: unknown, _newProps: unknown) {
    return true;
  }

  setProps = (newProps: Record<string, unknown>) => {
    if (!newProps) {
      return;
    }

    Object.assign(this.props, newProps);
  };

  _addEvents() {
    const { events = {} } = this.props;
    if (!events) return;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    if (!events) return;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  private _render() {
    const block = this.render();
    if (!block?.firstElementChild) {
      throw new Error("No element available to render");
    }

    const newBlock = block.firstElementChild;
    this._removeEvents();
    this._element?.replaceWith(newBlock);
    this._element = newBlock as HTMLElement;
    this._addEvents();
  }

  render() {
    const fragment = new DocumentFragment();
    return fragment;
  }

  getContent() {
    if (this._element === null) {
      throw new Error("Element is not initialized");
    }
    return this._element;
  }

  _getChildren(propsAndChildren: PropsAndChildren) {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (value instanceof Array) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  private _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target: Record<any, unknown>, prop: string, value: string) {
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },

      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  compile(template: string, props: Props) {
    const propsAndStubs: Record<string, unknown> = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (child instanceof Array) {
        propsAndStubs[key] = ``;
        child.forEach((c) => {
          const data = `<div data-id="${c._id}"></div>`;
          propsAndStubs[key] += data;
        });
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    // Object.entries(this.children).forEach(([key, child]) => {
    //   propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    // });

    const fragment = this._createDocumentElement(
      "template"
    ) as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (child instanceof Array) {
        const tmp = this._createDocumentElement(
          "template"
        ) as HTMLTemplateElement;

        child.forEach((c) => {
          if (c instanceof Block) {
            const content = c.getContent();
            if (content) {
              tmp.content.append(content);
            }
          } else {
            tmp.content.append(`${c}`);
          }
          const stub = fragment.content.querySelector(`[data-id="${c._id}"]`);
          if (stub) {
            stub.replaceWith(tmp.content);
          }
        });
      } else {
        const stub = fragment.content.querySelector<HTMLElement>(
          `[data-id="${child._id}"]`
        );
        const content = child.getContent();
        if (stub !== null && content !== null) {
          stub.replaceWith(content);
        }
      }
    });

    return fragment.content;
  }
}
