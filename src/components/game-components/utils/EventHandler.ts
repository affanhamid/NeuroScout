type EventCallback<E extends Event> = (event: E) => void;

class EventHandler {
  private target: EventTarget;
  private listeners: Map<string, EventCallback<Event>[]>;

  constructor(target: EventTarget) {
    this.target = target;
    this.listeners = new Map();
  }

  add<E extends Event>(eventType: string, callback: EventCallback<E>) {
    const listener = callback as EventCallback<Event>; // Generic casting
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)!.push(listener);
    this.target.addEventListener(eventType, listener);
  }

  remove<E extends Event>(eventType: string, callback: EventCallback<E>) {
    const listener = callback as EventCallback<Event>;
    if (this.listeners.has(eventType)) {
      const callbacks = this.listeners.get(eventType)!;
      const index = callbacks.indexOf(listener);
      if (index !== -1) {
        callbacks.splice(index, 1);
        this.target.removeEventListener(eventType, listener);
      }
    }
  }

  removeAll() {
    this.listeners.forEach((callbacks, eventType) => {
      callbacks.forEach((callback) => {
        this.target.removeEventListener(eventType, callback);
      });
    });
    this.listeners.clear();
  }
}

export default EventHandler;
