/**
 * Toast notification component
 */

const Toast = {
  container: null,

  init() {
    if (this.container) return;
    this.container = document.createElement('div');
    this.container.className = 'toast-container';
    this.container.setAttribute('aria-live', 'polite');
    document.body.appendChild(this.container);
  },

  show(message, type = 'info', duration = 3000) {
    this.init();
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `
      <span>${Utils.escapeHtml(message)}</span>
      <button class="toast-close" aria-label="Đóng">&times;</button>
    `;
    this.container.appendChild(el);

    const close = () => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => el.remove(), 200);
    };

    el.querySelector('.toast-close').addEventListener('click', close);
    if (duration > 0) setTimeout(close, duration);
  },

  success(msg) { this.show(msg, 'success'); },
  error(msg) { this.show(msg, 'error'); },
  info(msg) { this.show(msg, 'info'); }
};

if (typeof window !== 'undefined') {
  window.Toast = Toast;
}