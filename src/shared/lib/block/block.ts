import Handlebars from "handlebars";
import { v4 as makeUUID } from "uuid";
import { EventBus } from "../event-bus";

export type PropsAndChildren = Record<string, unknown>;

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

export class Block<Props extends Record<string, any> = PropsAndChildren> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  private _element: HTMLElement | null = null;
  private _meta: Meta | null = null;
  protected _id: string | null = null;
  protected props: Record<string, unknown> | null = null;
  protected children: Children;
  protected propsAndChildren: Props;
  private eventBus: () => EventBus;

  constructor(propsAndChildren: Props, tagName: string = "div") {
    const { children, props } = this._getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this._id = makeUUID();
    this._meta = { tagName, props };
    this.children = children;
    this.props = props;

    this.propsAndChildren = this._makePropsProxy({
      ...propsAndChildren,
      _id: this._id,
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
    Object.values(this.children).forEach(child => {
      if (Array.isArray(child)) {
        child.forEach(ch => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });


    // if (this.children) {
    //   Object.values(this.children).forEach((child) => {
    //     child.dispatchComponentDidMount();
    //   });
    // }
  
    // this._render();
  }

  componentDidMount(_oldProps?: unknown[]) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: unknown, newProps: unknown) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._render();
    }
  }

  componentDidUpdate(_oldProps: unknown, _newProps: unknown) {
    return true;
  }

  setProps = (newProps: Props) => {
    if (!newProps) {
      return;
    }

    Object.assign(this.propsAndChildren, newProps);
  };

  get element() {
    return this._element;
  }

  _addEvents() {
    const { events = {} } = this.propsAndChildren;
    if (!events) return;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  _removeEvents() {
    const { events = {} } = this.propsAndChildren;

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

  _getChildren(propsAndChildren: Props) {
    const children: Children = {};
    const props: Record<string, unknown> = {};


    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (value instanceof Array) {
        children[key] = value
      } else {
        props[key] = value;
      }
    });
    
    // Object.entries(propsAndChildren).forEach(([key, value]) => {
    //   // if (value instanceof Array){
    //   //   value.forEach((v)=> {
    //   //     if (v instanceof Block){
    //   //       console.log(v.props?.name, v)
    //   //       children[v._id as string] = v
    //   //     }
    //   //   })
    //   // }
    //   if (value instanceof Block) {
    //     children[key] = value;
    //   } else {
    //     props[key] = value;
    //   }
    // });

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

  //   show() {
  //     if (this._element) {
  //       this._element.style.display = "block";
  //     }
  //   }

  //   hide() {
  //     if (this._element) {
  //       this._element.style.display = "none";
  //     }
  //   }

  compile(template: string, props: Props) {
    const propsAndStubs: Record<string, unknown> = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (child instanceof Array) {
        propsAndStubs[key] = ``
        child.forEach((c) => {
          const data = `<div data-id="${c._id}"></div>`;
          propsAndStubs[key] += data
        })
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

    
    // Object.values(this.children).forEach((child) => {
      
    // const stub = fragment.content.querySelector<HTMLElement>(
    //     `[data-id="${child._id}"]`
    // );
    // const content = child.getContent();
    // if (stub !== null && content !== null) {
    //     stub.replaceWith(content);
    // }
    // });

    Object.values(this.children).forEach((child) => {
      if (child instanceof Array){
        const tmp = this._createDocumentElement('template') as HTMLTemplateElement;

        child.forEach((c)=>{
          if (c instanceof Block){
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
        })
      }
      else {
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
