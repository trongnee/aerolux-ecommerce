/**
 * Cart Service
 */

const CartService = {
  getItems() {
    return Storage.getCart();
  },

  getCount() {
    return this.getItems().reduce((sum, item) => sum + item.qty, 0);
  },

  getSubtotal() {
    return this.getItems().reduce((sum, item) => {
      const product = ProductService.getById(item.productId);
      if (!product) return sum;
      return sum + product.price * item.qty;
    }, 0);
  },

  findItem(productId, variantId = null) {
    return this.getItems().find(
      i => i.productId === productId && (i.variantId || null) === (variantId || null)
    );
  },

  add(productId, qty = 1, variantId = null) {
    const product = ProductService.getById(productId);
    if (!product) return { success: false, message: 'Sản phẩm không tồn tại' };
    if (product.stock <= 0) return { success: false, message: 'Sản phẩm hết hàng' };

    const items = this.getItems();
    const existing = items.find(
      i => i.productId === productId && (i.variantId || null) === (variantId || null)
    );

    if (existing) {
      const newQty = existing.qty + qty;
      if (newQty > product.stock) {
        return { success: false, message: `Chỉ còn ${product.stock} sản phẩm` };
      }
      existing.qty = newQty;
    } else {
      if (qty > product.stock) {
        return { success: false, message: `Chỉ còn ${product.stock} sản phẩm` };
      }
      items.push({ productId, variantId, qty });
    }

    Storage.setCart(items);
    return { success: true, message: 'Đã thêm vào giỏ hàng' };
  },

  updateQty(productId, qty, variantId = null) {
    const product = ProductService.getById(productId);
    if (!product) return { success: false, message: 'Sản phẩm không tồn tại' };

    const items = this.getItems();
    const item = items.find(
      i => i.productId === productId && (i.variantId || null) === (variantId || null)
    );
    if (!item) return { success: false, message: 'Không tìm thấy sản phẩm trong giỏ' };

    if (qty <= 0) {
      return this.remove(productId, variantId);
    }
    if (qty > product.stock) {
      return { success: false, message: `Chỉ còn ${product.stock} sản phẩm` };
    }

    item.qty = qty;
    Storage.setCart(items);
    return { success: true };
  },

  remove(productId, variantId = null) {
    const items = this.getItems().filter(
      i => !(i.productId === productId && (i.variantId || null) === (variantId || null))
    );
    Storage.setCart(items);
    return { success: true, message: 'Đã xóa khỏi giỏ hàng' };
  },

  clear() {
    Storage.setCart([]);
  },

  // Coupon demo
  applyCoupon(code) {
    const coupons = {
      'AEROLUX10': { type: 'percent', value: 10, minOrder: 500000 },
      'AEROLUX50K': { type: 'fixed', value: 50000, minOrder: 1000000 },
      'FREESHIP': { type: 'shipping', value: 0, minOrder: 300000 }
    };
    const coupon = coupons[code.toUpperCase()];
    if (!coupon) return { success: false, message: 'Mã giảm giá không hợp lệ' };
    const subtotal = this.getSubtotal();
    if (subtotal < coupon.minOrder) {
      return {
        success: false,
        message: `Đơn hàng tối thiểu ${Utils.formatPrice(coupon.minOrder)} để dùng mã này`
      };
    }
    Storage.setCoupon(code.toUpperCase());
    return { success: true, message: 'Áp dụng mã thành công', coupon };
  },

  getDiscount() {
    const code = Storage.getCoupon();
    if (!code) return 0;
    const result = this.applyCoupon(code);
    if (!result.success) return 0;
    const subtotal = this.getSubtotal();
    const c = result.coupon;
    if (c.type === 'percent') return Math.round(subtotal * c.value / 100);
    if (c.type === 'fixed') return c.value;
    return 0;
  },

  getShipping(method = 'standard') {
    const code = Storage.getCoupon();
    if (code === 'FREESHIP') return 0;
    const rates = { standard: 30000, express: 50000, pickup: 0 };
    return rates[method] || 30000;
  },

  getTotal(shippingMethod = 'standard') {
    return this.getSubtotal() - this.getDiscount() + this.getShipping(shippingMethod);
  }
};

// Wishlist helpers
const WishlistService = {
  getIds() {
    return Storage.getWishlist();
  },

  has(productId) {
    return this.getIds().includes(productId);
  },

  toggle(productId) {
    let ids = this.getIds();
    if (ids.includes(productId)) {
      ids = ids.filter(id => id !== productId);
      Storage.setWishlist(ids);
      return { added: false, message: 'Đã xóa khỏi yêu thích' };
    } else {
      ids.push(productId);
      Storage.setWishlist(ids);
      return { added: true, message: 'Đã thêm vào yêu thích' };
    }
  },

  remove(productId) {
    const ids = this.getIds().filter(id => id !== productId);
    Storage.setWishlist(ids);
  },

  getCount() {
    return this.getIds().length;
  }
};

if (typeof window !== 'undefined') {
  window.CartService = CartService;
  window.WishlistService = WishlistService;
}