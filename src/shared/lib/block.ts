import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from './event-bus';

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

export const isBlock = <T>(value: T) => {
  return value instanceof Block;
};

export const isArrayOfBlock = <T>(value: T) => {
  return value instanceof Array && value.every(isBlock);
};

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CDR: 'flow:component-did-render',
  };

  private _element: HTMLElement | null = null;
  // private _meta: Meta | null = null;
  protected _id: string | null = null;
  protected props: Props = {};
  protected children: Children;
  private eventBus: () => EventBus;

  get element() {
    return this._element;
  }
  constructor(
    propsAndChildren: Props,
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

    this.children = this._makeChildrenProxy({
      ...children,
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
    eventBus.on(Block.EVENTS.FLOW_CDR, this._componentDidRender.bind(this));
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
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  private _componentDidMount() {
    this.componentDidMount();
    if (this.children) {
      Object.values(this.children).forEach((child) => {
        if (child instanceof Array) {
          child.forEach((ch) => {
            if (isBlock(ch)) {
              ch.dispatchComponentDidMount();
            }
          });
        } else {
          child.dispatchComponentDidMount();
        }
      });
    }
  }

  componentDidMount(_oldProps?: unknown) {}

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

  componentDidUpdate(_: unknown, __: unknown) {
    return true;
  }

  private _componentDidRender(_oldProps?: unknown) {
    // TODO: Оптимизировать ререндер
    this.componentDidRender(_oldProps);
  }

  componentDidRender(_oldProps?: unknown) {
    return true;
  }


  setProps = <T = Props >(newProps: T) => {
    if (!newProps) {
      return;
    }

    Object.assign(this.props, newProps);
  };

  setChildren = (newChildren: Props) => {
    if (!newChildren) {
      return;
    }

    Object.assign(this.children, newChildren);
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

  _render() {
    const block = this.render();
    if (!block?.firstElementChild) {
      throw new Error('No element available to render');
    }

    const newBlock = block.firstElementChild;
    this._removeEvents();
    this._element?.replaceWith(newBlock);
    this._element = newBlock as HTMLElement;
    this._addEvents();

    this.eventBus().emit(Block.EVENTS.FLOW_CDR);
  }

  render() {
    const fragment = new DocumentFragment();
    return fragment;
  }

  getContent() {
    if (this._element === null) {
      throw new Error('Element is not initialized');
    }
    return this._element;
  }

  _getChildren(propsAndChildren: PropsAndChildren) {
    const children: Children = {};
    const props: Props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (isBlock(value)) {
        children[key] = value as Block;
      } else if (isArrayOfBlock(value)) {
        children[key] = value as Block[];
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

        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: Record<string, unknown>, prop: string, value: string) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _makeChildrenProxy(chidren: Children) {
    const self = this;
    return new Proxy(chidren, {
      get(target, child: string) {
        const value = target[child];

        return value;
      },

      set(target: Record<string, unknown>, prop: string, value: string) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  compile(template: string, props: Props) {
    const propsAndStubs: Props = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (isArrayOfBlock(child)) {
        propsAndStubs[key] = '';
        (child as Block[]).forEach((c: Block) => {
          const data = `<div data-id="${c._id}"></div>`;
          propsAndStubs[key] += data;
        });
      } else {
        propsAndStubs[key] = `<div data-id="${(child as Block )._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement(
      'template',
    ) as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (isArrayOfBlock(child)) {
        const tmp = this._createDocumentElement(
          'template',
        ) as HTMLTemplateElement;

        (child as Block[]).forEach((c) => {
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
          `[data-id="${(child as Block)._id}"]`,
        );
        const content = (child as Block).getContent();
        if (stub !== null && content !== null) {
          stub.replaceWith(content);
        }
      }
    });

    return fragment.content;
  }

  show() {
    const element = this.getContent();
    if (element) {
      element.style.display = 'block';
    }
  }

  hide() {
    const element = this.getContent();
    if (element) {
      element.style.display = 'none';
    }
  }
}
