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
    this.subscribers = new Set();

    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  init() {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    if (this.isTouch) return;

    let prevX = this.targetX;
    let prevY = this.targetY;
    let prevTime = performance.now();

    const handlePointerMove = (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;

      if (!this.initialized) {
        this.currentX = this.targetX;
        this.currentY = this.targetY;
        this.initialized = true;
      }

      const now = performance.now();
      const dt = Math.max(1, now - prevTime);
      this.velocityX = (this.targetX - prevX) / dt;
      this.velocityY = (this.targetY - prevY) / dt;
      prevX = this.targetX;
      prevY = this.targetY;
      prevTime = now;

      // Detect if pointer is directly over active interactive controls
      const target = e.target;
      if (target && target !== document.body && target !== document.documentElement) {
        const isUI = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], dialog, [data-modal]') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT'
        );
        this.isOverUI = isUI;
      } else {
        this.isOverUI = false;
      }

      // Notify subscribers if needed
      for (const sub of this.subscribers) {
        try { sub(this); } catch (_) {}
      }
    };

    const handlePointerDown = () => {
      this.isDown = true;
    };

    const handlePointerUp = () => {
      this.isDown = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
  }

  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
}

export const globalPointer = new PointerCoordinator();
