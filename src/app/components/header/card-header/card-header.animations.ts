import { style, animate, animation, keyframes } from '@angular/animations';

// =========================
// Scale
// =========================
export const translateIn = animation([
  style({ opacity: 1, transform: 'translateY(100%)' }), // start state
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 1, transform: 'translateY(0%)' })
  ),
]);

export const translateOut = animation([
  animate(
    '{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    style({ opacity: 0, transform: 'translateY(-100%)' })
  ),
]);

// =========================
// Fade
// =========================

export const fadeIn = animation([
  style({ opacity: 0 }), // start state
  animate('{{time}}', style({ opacity: 1 })),
]);

export const fadeOut = animation([animate('{{time}}', style({ opacity: 0 }))]);
