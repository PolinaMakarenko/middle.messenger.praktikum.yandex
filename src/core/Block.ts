/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-empty-function */
import EventBus from "./EventBus";
import { nanoid } from "nanoid";

// export interface BlockClass<P> extends Function {
//   new (props: P): Block<P>;
//   componentName?: string;
// }

class Block <P extends Record<string, any> = any>  {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    // FLOW_CWU: "flow:component-will-unmount",
    FLOW_RENDER: "flow:render",
  } as const;

  public id = nanoid(6);
  protected props: P;
  // const path = window.location.pathname
  public path = window.location.pathname
  protected children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  protected refs: { [key: string]: HTMLElement } = {};
  private _meta: Record<string, unknown> | null = null;
 
  /** JSDoc
  * @param {string} tagName
  * @param {Object} props
  *
  * @returns {void}
  * */

  constructor( childrenAndProps: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(childrenAndProps);

    this._meta = {
      props,
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }
  private _addEvents() {
    const { events = {} } = this.props as P &  {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }
  // для отрисовки страниц 
  // const path = window.location.pathname


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // public RoutePage(path) {
    // const path = window.location.pathname
  // }

  /**
   * Хелпер, который проверяет, находится ли элемент в DOM дереве
   * И есть нет, триггерит событие COMPONENT_WILL_UNMOUNT
   */
  //  _checkInDom() {
  //   const elementInDOM = document.body.contains(this._element);

  //   if (elementInDOM) {
  //     setTimeout(() => this._checkInDom(), 1000);
  //     return;
  //   }

  //   this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  // }

  private  _removeEvents() {
    const { events = {} } = this.props as P  & {
      events: Record<string, () => void>;
    };

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    // eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const tagName = "div";
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    // this._checkInDom();
    this.componentDidMount();
  }

  public componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount()
    );
  }
  

  // _componentWillUnmount() {
  //   this.eventBus().destroy();
  //   this.componentWillUnmount();
  // }

  // public componentWillUnmount() {}

  // protected componentDidUpdate(oldProps: any, newProps: any) {
  //   return true;
  // }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  public setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    this._removeEvents();
    
    // this._element!.innerHTML = "";
    const newElement = fragment.firstElementChild as HTMLElement;
    this._element?.replaceWith(newElement);
    this._element = newElement;

    this._addEvents();
  }

  protected compile(template: (props: any) => string, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([name, component]) => {
      propsAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(propsAndStubs);

    const temp = document.createElement("template");

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }
      component.getContent()?.append(...Array.from(stub.childNodes));
  
      stub.replaceWith(component.getContent()!);
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public getContent() {
    // return this.element;
          // Хак, чтобы вызвать CDM только после добавления в DOM
          if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
              if (
                this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
              ) {
                this.eventBus().emit(Block.EVENTS.FLOW_CDM);
              }
            }, 100);
          }
    
          return this.element!;
  }

  private _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  // public show() {
  //   this.getContent()!.style.display = "block";
  // }

  // public hide() {
  //   this.getContent()!.style.display = "none";
  // }

  // public destroy() {
  //   this._element!.remove();
  // }
}

export default Block;
