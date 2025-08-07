export type Direction = 'up' | 'down' | 'left' | 'right' | null;

export class Input {
  private pressed = new Set<string>();

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  attach() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  detach() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    if (['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].includes(key)) {
      e.preventDefault();
    }
    this.pressed.add(key);
  }

  private handleKeyUp(e: KeyboardEvent) {
    this.pressed.delete(e.key.toLowerCase());
  }

  getDirection(): Direction {
    const up = this.pressed.has('arrowup') || this.pressed.has('w');
    const down = this.pressed.has('arrowdown') || this.pressed.has('s');
    const left = this.pressed.has('arrowleft') || this.pressed.has('a');
    const right = this.pressed.has('arrowright') || this.pressed.has('d');

    if (up && !down && !left && !right) return 'up';
    if (down && !up && !left && !right) return 'down';
    if (left && !right && !up && !down) return 'left';
    if (right && !left && !up && !down) return 'right';
    return null;
  }
}
