/**
 * Utility functions for AEROLUX e-commerce
 */

const Utils = {
  /**
   * Format number as Vietnamese currency
   */
  formatPrice(amount) {
    if (amount == null) return '';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount);
  },

  /**
   * Calculate discount percentage
   */
  discountPercent(price, originalPrice) {
    if (!originalPrice || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  },

  /**
   * Get URL query parameters
   */
  getQueryParams() {
    const params = {};
    const search = window.location.search.slice(1);
    if (!search) return params;
    search.split('&').forEach(pair => {
      const [key, value] = pair.split('=').map(decodeURIComponent);
      if (key) params[key] = value || '';
    });
    return params;
  },

  /**
   * Update URL query parameters without reload
   */
  updateQueryParams(params, replace = false) {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '') {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    if (replace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
  },

  /**
   * Debounce function
   */
  debounce(fn, delay = 300) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  /**
   * Remove Vietnamese diacritics for search
   */
  removeDiacritics(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  },

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Generate star rating HTML
   */
  renderStars(rating, max = 5) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let html = '';
    for (let i = 1; i <= max; i++) {
      if (i <= full) {
        html += `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
      } else if (i === full + 1 && half) {
        html += `<svg viewBox="0 0 24 24" fill="currentColor"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="#e2e8f0"/></linearGradient></defs><path fill="url(#half)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
      } else {
        html += `<svg viewBox="0 0 24 24" fill="#e2e8f0"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
      }
    }
    return html;
  },

  /**
   * Image fallback
   */
  imgFallback(img, category = 'product') {
    img.onerror = function () {
      this.onerror = null;
      const colors = {
        fan: '1a365d',
        light: '2f855a',
        default: '4a5568'
      };
      const c = colors[category] || colors.default;
      this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23${c}' width='400' height='400'/%3E%3Ctext fill='white' font-family='sans-serif' font-size='24' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EAEROLUX%3C/text%3E%3C/svg%3E`;
    };
  },

  /**
   * Generate unique ID
   */
  uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  },

  /**
   * Scroll to top
   */
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

if (typeof window !== 'undefined') {
  window.Utils = Utils;
}