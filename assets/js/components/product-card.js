/**
 * Product Card renderer
 */

const ProductCard = {
  render(product, options = {}) {
    if (!product) return '';
    const brandName = ProductService.getBrandName(product.brand);
    const discount = Utils.discountPercent(product.price, product.originalPrice);
    const isWishlisted = WishlistService.has(product.id);

    let badges = '';
    if (discount > 0) {
      badges += `<span class="badge-tag badge-sale"><svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><path d="M12 2c-4 4-6 7.5-6 10.5 0 3.5 2.5 6.5 6 6.5s6-3 6-6.5C18 9.5 16 6 12 2z"/></svg>-${discount}%</span>`;
    }
    if (product.bestSeller) {
      badges += `<span class="badge-tag badge-bestseller"><svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>Bán chạy</span>`;
    }
    if (product.isNew) {
      badges += `<span class="badge-tag badge-new"><svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>Mới</span>`;
    }

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-card-image">
          <a href="product.html?id=${product.id}">
            <img src="${product.thumbnail || product.images[0]}" alt="${Utils.escapeHtml(product.name)}" loading="lazy"
              onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27400%27%3E%3Crect fill=%27%23eff6ff%27 width=%27400%27 height=%27400%27/%3E%3Ctext fill=%27%232563eb%27 font-family=%27sans-serif%27 font-size=%2722%27 font-weight=%27bold%27 x=%2750%25%27 y=%2750%25%27 text-anchor=%27middle%27 dy=%27.3em%27%3EAEROLUX%3C/text%3E%3C/svg%3E'">
          </a>
          ${badges ? `<div class="product-card-badges">${badges}</div>` : ''}
          <div class="product-card-actions">
            <button class="product-card-action ${isWishlisted ? 'active' : ''}" data-action="wishlist" data-id="${product.id}" title="Yêu thích" aria-label="Yêu thích">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button class="product-card-action" data-action="quick-add" data-id="${product.id}" title="Thêm vào giỏ" aria-label="Thêm vào giỏ">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="product-card-body">
          <div class="product-card-brand">${Utils.escapeHtml(brandName)}</div>
          <h3 class="product-card-title">
            <a href="product.html?id=${product.id}">${Utils.escapeHtml(product.name)}</a>
          </h3>
          <div class="product-card-rating">
            <span class="stars">${Utils.renderStars(product.rating)}</span>
            <span>(${product.reviewCount})</span>
          </div>
          <div class="product-card-price">
            <span class="price ${discount > 0 ? 'price-sale' : ''}">${Utils.formatPrice(product.price)}</span>
            ${discount > 0 ? `<span class="price-original">${Utils.formatPrice(product.originalPrice)}</span>` : ''}
          </div>
        </div>
        <div class="product-card-footer">
          <button class="btn btn-primary btn-sm" data-action="add-cart" data-id="${product.id}">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            Thêm vào giỏ
          </button>
        </div>
      </article>
    `;
  },

  renderGrid(products, container) {
    if (!container) return;
    if (!products.length) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M8 11h6"/></svg>
          <h3>Không tìm thấy sản phẩm</h3>
          <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      `;
      return;
    }
    container.innerHTML = products.map(p => this.render(p)).join('');
    this.bindEvents(container);
  },

  bindEvents(container) {
    container.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const action = btn.dataset.action;
        const id = btn.dataset.id;

        if (action === 'wishlist') {
          const result = WishlistService.toggle(id);
          Toast.success(result.message);
          // Update icon
          const svg = btn.querySelector('svg');
          if (result.added) {
            btn.classList.add('active');
            svg.setAttribute('fill', 'currentColor');
          } else {
            btn.classList.remove('active');
            svg.setAttribute('fill', 'none');
          }
          updateHeaderCounts();
        }

        if (action === 'add-cart' || action === 'quick-add') {
          const result = CartService.add(id, 1);
          if (result.success) {
            Toast.success(result.message);
            updateHeaderCounts();
          } else {
            Toast.error(result.message);
          }
        }
      });
    });
  }
};

if (typeof window !== 'undefined') {
  window.ProductCard = ProductCard;
}