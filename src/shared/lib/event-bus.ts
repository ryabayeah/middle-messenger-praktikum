export class EventBus {
  private listeners: Record<string, Array<() => unknown>>;

  constructor() {
    this.listeners = {};
  }
  // Подписка
  on(event: string, callback: (...args: unknown[]) => unknown) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  // Отписка
  off(event: string, callback: (...args: unknown[]) => unknown) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  // Вызов действия
  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...(args as []));
    });
  }
}
