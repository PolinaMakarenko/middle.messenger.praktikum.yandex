type CallBackFunction = (...args: unknown[]) => void;


class EventBus {
    private listeners: Record<string, CallBackFunction[]>;
    
    constructor() {
      this.listeners = {};
    }
  
    on(event: string, callback: CallBackFunction): void {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }
  
    off(event: string, callback: CallBackFunction): void {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
  
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== callback
      );
    }
  
    emit(event: string, ...args: unknown[]): void {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
      this.listeners[event].forEach((listener) => {
        listener(...args);
      });
    }
}

export default EventBus;
