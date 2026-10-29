/**
 * CENTRALIZED GLOBAL POINTER COORDINATOR
 * Single source of truth for cursor position, velocity, and UI hover state.
 * Prevents multiple independent pointermove listeners and eliminates background string interference.
 */

class PointerCoordinator {
  constructor() {
    this.targetX = typeof window !== 'undefined' ? window.innerWidth * 0.5 : 0;
    this.targetY = typeof window !== 'undefined' ? window.innerHeight * 0.5 : 0;
    this.currentX = this.targetX;
    this.currentY = this.targetY;
    this.velocityX = 0;
    this.velocityY = 0;
    this.isOverUI = false; // TRUE when cursor is hovering ANY card, button, nav, form, or UI panel
    this.isDown = false;
    this.isTouch = false;
    this.initialized = false;
    this.cursorShape = 'default';
    this.cursorSubscribers = new Set();

    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  setCursorShape(shape) {
    if (this.cursorShape === shape) return;
    this.cursorShape = shape;
    for (const sub of this.cursorSubscribers) {
      try { sub(shape); } catch (_) {}
    }
  }

  onCursorShapeChange(fn) {
    this.cursorSubscribers.add(fn);
    fn(this.cursorShape);
    return () => this.cursorSubscribers.delete(fn);
  }

  init() {
    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch') return;
      this.targetX = e.clientX;
      this.targetY = e.clientY;

      if (!this.initialized) {
        this.currentX = this.targetX;
        this.currentY = this.targetY;
        this.initialized = true;
      }
    };

    const handlePointerDown = (e) => {
      if (e.pointerType === 'touch') return;
      this.isDown = true;
    };

    const handlePointerUp = (e) => {
      if (e.pointerType === 'touch') return;
      this.isDown = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
  }
}

export const globalPointer = new PointerCoordinator();
