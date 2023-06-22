// type CallBackFunction = (...args: unknown[]) => void;


// class EventBus {
//     // destroy() {
//     //   throw new Error("Method not implemented.");
//     // }
//     private listeners: Record<string, CallBackFunction[]>;
    
//     constructor() {
//       this.listeners = {};
//     }
  
//     on(event: string, callback: CallBackFunction): void {
//       if (!this.listeners[event]) {
//         this.listeners[event] = [];
//       }
//       this.listeners[event].push(callback);
//     }
  
//     off(event: string, callback: CallBackFunction): void {
//       if (!this.listeners[event]) {
//         throw new Error(`Нет события: ${event}`);
//       }
  
//       this.listeners[event] = this.listeners[event].filter(
//         (listener) => listener !== callback
//       );
//     }
  
//     emit(event: string, ...args: unknown[]): void {
//       if (!this.listeners[event]) {
//         throw new Error(`Нет события: ${event}`);
//       }
//       this.listeners[event].forEach((listener) => {
//         listener(...args);
//       });
//     }
//     destroy() {
//       this.listeners = {};
//     }
// }

// export default EventBus;

export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

export default class EventBus<
  E extends string = string,
  M extends { [K in E]: unknown[] } = Record<E, any[]>,
> {
  public listeners: { [key in E]?: Listener<M[E]>[] } = {};

  on(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(callback);
  }

  off(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event]?.filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      return;
      // throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event]?.forEach(function (listener) {
      listener(...args);
    });
  }

  // destroy() {
  //   this.listeners = {};
  // }
}
