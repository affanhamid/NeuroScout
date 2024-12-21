export class GameObserver {
  private element: Element | null;
  private listeners: { type: string; listener: EventListener }[];

  constructor(element: Element | null) {
    this.element = element;
    this.listeners = [];
  }

  // Register an event listener
  addListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (evt: HTMLElementEventMap[K]) => void
  ): void {
    if (!this.element) return;

    const boundListener = listener as EventListener;
    this.element.addEventListener(type, boundListener);
    this.listeners.push({ type, listener: boundListener });
  }

  // Remove a specific event listener
  removeListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (evt: HTMLElementEventMap[K]) => void
  ): void {
    if (!this.element) return;

    const boundListener = listener as EventListener;
    this.element.removeEventListener(type, boundListener);
    this.listeners = this.listeners.filter(
      (l) => l.type !== type || l.listener !== boundListener
    );
  }

  // Remove all event listeners
  removeAllListeners(): void {
    if (!this.element) return;

    this.listeners.forEach(({ type, listener }) => {
      this.element!.removeEventListener(type, listener);
    });
    this.listeners = [];
  }
}
