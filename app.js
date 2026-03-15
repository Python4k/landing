'use strict';

// ── FAB / Dialog ─────────────────────────────────────────────────────────────
const fab            = document.getElementById('fab');
const dialogBackdrop = document.getElementById('dialogBackdrop');
const dialogClose    = document.getElementById('dialogClose');

function openDialog() {
  dialogBackdrop.classList.add('is-open');
  dialogClose.focus();
}

function closeDialog() {
  dialogBackdrop.classList.remove('is-open');
  fab.focus();
}

fab.addEventListener('click', openDialog);
dialogClose.addEventListener('click', closeDialog);

dialogBackdrop.addEventListener('click', e => {
  if (e.target === dialogBackdrop) closeDialog();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && dialogBackdrop.classList.contains('is-open')) {
    closeDialog();
  }
});

// ── Ripple effect (lightweight MD3 ripple) ───────────────────────────────────
function createRipple(event) {
  const card = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(card.clientWidth, card.clientHeight);
  const radius   = diameter / 2;
  const rect     = card.getBoundingClientRect();

  circle.style.cssText = `
    position: absolute;
    width:  ${diameter}px;
    height: ${diameter}px;
    left:   ${event.clientX - rect.left - radius}px;
    top:    ${event.clientY - rect.top  - radius}px;
    background: radial-gradient(circle, rgba(206,147,216,.35) 0%, transparent 70%);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple .5s linear;
    pointer-events: none;
  `;

  // Ensure card is positioned
  card.style.position = 'relative';

  const existing = card.querySelector('.ripple-effect');
  if (existing) existing.remove();

  circle.classList.add('ripple-effect');
  card.appendChild(circle);
  circle.addEventListener('animationend', () => circle.remove());
}

// Inject ripple keyframe once
const style = document.createElement('style');
style.textContent = `@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(style);

document.querySelectorAll('.card').forEach(card => card.addEventListener('click', createRipple));
