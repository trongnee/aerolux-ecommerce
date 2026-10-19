document.addEventListener('DOMContentLoaded', () => {
  initHeaderFooter();
  renderCart();

  document.getElementById('apply-coupon')?.addEventListener('click', () => {
    const code = document.getElementById('coupon-input').value.trim();
    if (!code) return;
    const r = CartService.applyCoupon(code);
    r.success ? (Toast.success(r.message), renderCart()) : Toast.error(r.message);
  });
});

function renderCart() {
  const items = CartService.getItems();
  const container = document.getElementById('cart-items');
  const empty = document.getElementById('cart-empty');
  const layout = document.getElementById('cart-layout');

  if (!items.length) {
    empty.style.display = 'block';
    layout.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  layout.style.display = 'grid';

  container.innerHTML = items.map(item => {
    const p = ProductService.getById(item.productId);
    if (!p) return '';
    const variant = p.variants?.find(v => v.id === item.variantId);
    return `
      <div class="cart-item" data-id="${item.productId}" data-vid="${item.variantId || ''}">
        <div class="cart-item-image">
          <a href="product.html?id=${p.id}"><img src="${p.thumbnail}" alt="${Utils.escapeHtml(p.name)}"></a>
        </div>
        <div class="cart-item-info">
          <h3><a href="product.html?id=${p.id}">${Utils.escapeHtml(p.name)}</a></h3>
          ${variant ? `<div class="cart-item-variant">${variant.name}</div>` : ''}
          <div class="cart-item-price">${Utils.formatPrice(p.price)}</div>
        </div>
        <div class="cart-item-actions">
          <div class="qty-selector">
            <button class="qty-btn" data-action="minus">−</button>
            <input type="number" class="qty-input" value="${item.qty}" min="1" max="${p.stock}">
            <button class="qty-btn" data-action="plus">+</button>
          </div>
          <div class="cart-item-total">${Utils.formatPrice(p.price * item.qty)}</div>
          <button class="cart-item-remove" data-action="remove">Xóa</button>
        </div>
      </div>
    `;
  }).join('');

  // Events
  container.querySelectorAll('.cart-item').forEach(el => {
    const id = el.dataset.id;
    const vid = el.dataset.vid || null;
    el.querySelector('[data-action="minus"]')?.addEventListener('click', () => {
      const item = CartService.findItem(id, vid);
      if (item) { CartService.updateQty(id, item.qty - 1, vid); renderCart(); updateHeaderCounts(); }
    });
    el.querySelector('[data-action="plus"]')?.addEventListener('click', () => {
      const item = CartService.findItem(id, vid);
      if (item) {
        const r = CartService.updateQty(id, item.qty + 1, vid);
        if (!r.success) Toast.error(r.message);
        renderCart(); updateHeaderCounts();
      }
    });
    el.querySelector('.qty-input')?.addEventListener('change', (e) => {
      const r = CartService.updateQty(id, parseInt(e.target.value) || 1, vid);
      if (!r.success) Toast.error(r.message);
      renderCart(); updateHeaderCounts();
    });
    el.querySelector('[data-action="remove"]')?.addEventListener('click', () => {
      CartService.remove(id, vid);
      Toast.info('Đã xóa khỏi giỏ');
      renderCart(); updateHeaderCounts();
    });
  });

  // Summary
  const subtotal = CartService.getSubtotal();
  const discount = CartService.getDiscount();
  const shipping = CartService.getShipping();
  const total = CartService.getTotal();
  document.getElementById('summary-subtotal').textContent = Utils.formatPrice(subtotal);
  document.getElementById('summary-discount').textContent = discount ? `-${Utils.formatPrice(discount)}` : '0₫';
  document.getElementById('summary-shipping').textContent = shipping ? Utils.formatPrice(shipping) : 'Miễn phí';
  document.getElementById('summary-total').textContent = Utils.formatPrice(total);
}