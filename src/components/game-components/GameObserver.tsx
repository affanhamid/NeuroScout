class GameObserver {
  constructor(window: Window) {
    window.addEventListener("click", this.clickEvent);
    window.addEventListener("keydown", this.keyboardEvent);
  }

  clickEvent(e: MouseEvent) {
    console.log(e);
    return { mouseX: e.clientX, mouseY: e.clientY };
  }
  keyboardEvent(e: KeyboardEvent) {
    return { key: e.key };
  }
}

export default GameObserver;
