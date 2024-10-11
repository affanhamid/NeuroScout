export {};

declare global {
  interface Window {
    __PHASER_GAME__: Phaser.Game | null;
  }
}
