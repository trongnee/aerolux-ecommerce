document.addEventListener('DOMContentLoaded', () => {
  initHeaderFooter();

  const items = CartService.getItems();
  if (!items.length) {
    document.getElementById('checkout-form-wrap').style.display = 'none';
    document.getElementById('checkout-empty').style.display = 'block';
    return;
  }

  renderSummary();

  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      opt.querySelector('input').checked = true;
    });
  });

  document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('c-name').value.trim();
    const phone = document.getElementById('c-phone').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const address = document.getElementById('c-address').value.trim();
    const city = document.getElementById('c-city').value.trim();

    if (!name || !phone || !address || !city) {
      Toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    if (!/^0\d{9}$/.test(phone)) {
      Toast.error('Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)');
      return;
    }

    const orderCode = 'AL' + Date.now().toString().slice(-8);
    CartService.clear();
    Storage.clearCoupon();
    updateHeaderCounts();

    document.getElementById('checkout-form-wrap').style.display = 'none';
    document.getElementById('order-success').style.display = 'block';
    document.getElementById('order-code').textContent = orderCode;
  });
});

function renderSummary() {
  const items = CartService.getItems();
  const el = document.getElementById('checkout-items');
  el.innerHTML = items.map(item => {
    const p = ProductService.getById(item.productId);
    if (!p) return '';
    return `
      <div class="checkout-summary-item">
        <img src="${p.thumbnail}" alt="">
        <div class="checkout-summary-item-info">
          <div class="checkout-summary-item-name">${Utils.escapeHtml(p.name)}</div>
          <div class="checkout-summary-item-qty">x${item.qty}</div>
        </div>
        <div>${Utils.formatPrice(p.price * item.qty)}</div>
      </div>
    `;
  }).join('');

  document.getElementById('c-subtotal').textContent = Utils.formatPrice(CartService.getSubtotal());
  document.getElementById('c-discount').textContent = CartService.getDiscount() ? `-${Utils.formatPrice(CartService.getDiscount())}` : '0₫';
  document.getElementById('c-shipping').textContent = Utils.formatPrice(CartService.getShipping());
  document.getElementById('c-total').textContent = Utils.formatPrice(CartService.getTotal());
}