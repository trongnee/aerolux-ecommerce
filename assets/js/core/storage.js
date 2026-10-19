/**
 * LocalStorage wrapper for cart, wishlist, reviews, recently viewed
 */

const Storage = {
  KEYS: {
    CART: 'aerolux_cart',
    WISHLIST: 'aerolux_wishlist',
    REVIEWS: 'aerolux_reviews',
    RECENT: 'aerolux_recent',
    COUPON: 'aerolux_coupon'
  },

  get(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  // Cart
  getCart() {
    return this.get(this.KEYS.CART) || [];
  },

  setCart(items) {
    this.set(this.KEYS.CART, items);
    this.dispatchCartUpdate();
  },

  dispatchCartUpdate() {
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: this.getCart() }));
  },

  // Wishlist
  getWishlist() {
    return this.get(this.KEYS.WISHLIST) || [];
  },

  setWishlist(ids) {
    this.set(this.KEYS.WISHLIST, ids);
    window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: ids }));
  },

  // Reviews (keyed by productId)
  getReviews(productId) {
    const all = this.get(this.KEYS.REVIEWS) || {};
    return all[productId] || [];
  },

  addReview(productId, review) {
    const all = this.get(this.KEYS.REVIEWS) || {};
    if (!all[productId]) all[productId] = [];
    all[productId].unshift(review);
    this.set(this.KEYS.REVIEWS, all);
  },

  // Recently viewed
  getRecent() {
    return this.get(this.KEYS.RECENT) || [];
  },

  addRecent(productId) {
    let list = this.getRecent().filter(id => id !== productId);
    list.unshift(productId);
    list = list.slice(0, 12);
    this.set(this.KEYS.RECENT, list);
  },

  // Coupon
  getCoupon() {
    return this.get(this.KEYS.COUPON);
  },

  setCoupon(code) {
    this.set(this.KEYS.COUPON, code);
  },

  clearCoupon() {
    this.remove(this.KEYS.COUPON);
  }
};

if (typeof window !== 'undefined') {
  window.Storage = Storage;
}