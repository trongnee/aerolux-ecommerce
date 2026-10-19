/**
 * Product detail page
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderFooter();

  const params = Utils.getQueryParams();
  const product = ProductService.getById(params.id);
  if (!product) {
    window.location.href = '404.html';
    return;
  }

  Storage.addRecent(product.id);
  document.title = `${product.name} — AEROLUX`;

  const brandName = ProductService.getBrandName(product.brand);
  const category = ProductService.getCategory(product.categoryId);
  const discount = Utils.discountPercent(product.price, product.originalPrice);
  let selectedVariant = product.variants?.[0] || null;
  let qty = 1;

  // Breadcrumb
  const bc = document.getElementById('breadcrumb');
  if (bc) {
    bc.innerHTML = `
      <a href="index.html">Trang chủ</a><span class="separator">/</span>
      <a href="category.html?category=${category?.slug}">${category?.name || ''}</a><span class="separator">/</span>
      <span class="current">${Utils.escapeHtml(product.name)}</span>
    `;
  }

  // Gallery
  const mainImg = document.getElementById('gallery-main-img');
  const thumbs = document.getElementById('gallery-thumbs');
  const images = product.images?.length ? product.images : [product.thumbnail];
  if (mainImg) {
    mainImg.src = images[0];
    mainImg.alt = product.name;
  }
  if (thumbs) {
    thumbs.innerHTML = images.map((src, i) =>
      `<button class="gallery-thumb ${i === 0 ? 'active' : ''}" data-src="${src}">
        <img src="${src}" alt="" loading="lazy">
      </button>`
    ).join('');
    thumbs.querySelectorAll('.gallery-thumb').forEach(t => {
      t.addEventListener('click', () => {
        mainImg.src = t.dataset.src;
        thumbs.querySelectorAll('.gallery-thumb').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
      });
    });
  }

  // Info
  document.getElementById('product-brand').textContent = brandName;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-sku').textContent = product.sku;
  const ratingEl = document.getElementById('product-rating');
  if (ratingEl) {
    ratingEl.innerHTML = `
      <span class="stars">${Utils.renderStars(product.rating)}</span>
      <span style="font-weight:700">${product.rating}</span>
      <span style="opacity:0.85">(${product.reviewCount} đánh giá)</span>
    `;
    ratingEl.title = 'Xem đánh giá';
    ratingEl.addEventListener('click', () => {
      const reviewTab = document.querySelector('[data-tab="tab-reviews"]');
      if (reviewTab) reviewTab.click();
      document.querySelector('.product-tabs-section')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const priceEl = document.getElementById('product-price');
  priceEl.innerHTML = `
    <span class="price ${discount ? 'price-sale' : ''}">${Utils.formatPrice(product.price)}</span>
    ${discount ? `<span class="price-original">${Utils.formatPrice(product.originalPrice)}</span>
    <span class="discount-badge">-${discount}%</span>` : ''}
  `;

  // Stock
  const stockEl = document.getElementById('product-stock');
  if (product.stock > 10) {
    stockEl.className = 'product-stock in-stock';
    stockEl.textContent = '✓ Còn hàng';
  } else if (product.stock > 0) {
    stockEl.className = 'product-stock low-stock';
    stockEl.textContent = `⚠ Chỉ còn ${product.stock} sản phẩm`;
  } else {
    stockEl.className = 'product-stock out-of-stock';
    stockEl.textContent = '✗ Hết hàng';
  }

  document.getElementById('product-warranty').textContent = `Bảo hành ${product.warranty}`;

  // Variants
  const varEl = document.getElementById('product-variants');
  if (product.variants?.length > 1) {
    varEl.innerHTML = `
      <div class="variant-label">Phiên bản / Màu sắc</div>
      <div class="variant-options">
        ${product.variants.map(v =>
          `<button class="variant-option ${v.id === selectedVariant?.id ? 'active' : ''}" data-vid="${v.id}">${v.name}</button>`
        ).join('')}
      </div>
    `;
    varEl.querySelectorAll('.variant-option').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedVariant = product.variants.find(v => v.id === btn.dataset.vid);
        varEl.querySelectorAll('.variant-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  // Qty
  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    qtyInput.value = qty;
  });
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    qty = Math.min(product.stock, qty + 1);
    qtyInput.value = qty;
  });
  qtyInput?.addEventListener('change', () => {
    qty = Math.max(1, Math.min(product.stock, parseInt(qtyInput.value) || 1));
    qtyInput.value = qty;
  });

  // Actions
  document.getElementById('btn-add-cart')?.addEventListener('click', () => {
    const r = CartService.add(product.id, qty, selectedVariant?.id);
    r.success ? (Toast.success(r.message), updateHeaderCounts()) : Toast.error(r.message);
  });
  document.getElementById('btn-buy-now')?.addEventListener('click', () => {
    const r = CartService.add(product.id, qty, selectedVariant?.id);
    if (r.success) window.location.href = 'checkout.html';
    else Toast.error(r.message);
  });
  document.getElementById('btn-wishlist')?.addEventListener('click', () => {
    const r = WishlistService.toggle(product.id);
    Toast.success(r.message);
    updateHeaderCounts();
    const btn = document.getElementById('btn-wishlist');
    btn.classList.toggle('active', r.added);
  });
  if (WishlistService.has(product.id)) {
    document.getElementById('btn-wishlist')?.classList.add('active');
  }

  // Description
  document.getElementById('tab-description').innerHTML = `<div class="product-description"><p>${Utils.escapeHtml(product.description)}</p><p>${Utils.escapeHtml(product.shortDescription)}</p></div>`;

  // Specs - dynamic
  const specs = product.specifications || {};
  document.getElementById('tab-specs').innerHTML = `
    <table class="specs-table">
      ${Object.entries(specs).map(([k, v]) => `<tr><th>${Utils.escapeHtml(k)}</th><td>${Utils.escapeHtml(String(v))}</td></tr>`).join('')}
    </table>
  `;

  // Reviews
  renderReviews(product);

  // Related
  const related = ProductService.getRelated(product, 4);
  ProductCard.renderGrid(related, document.getElementById('related-products'));

  // Recent
  const recentIds = Storage.getRecent().filter(id => id !== product.id).slice(0, 4);
  const recent = ProductService.getByIds(recentIds);
  if (recent.length) {
    document.getElementById('recent-section').style.display = 'block';
    ProductCard.renderGrid(recent, document.getElementById('recent-products'));
  }

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab)?.classList.add('active');
    });
  });
});

function renderReviews(product) {
  const stored = Storage.getReviews(product.id);
  const demoReviews = [
    { name: 'Nguyễn Văn A', rating: 5, content: 'Sản phẩm hoàn thiện rất cao cấp, quạt chạy êm ru không nghe tiếng động. Lắp đặt nhanh chóng, đóng gói cẩn thận.', date: '2026-09-15' },
    { name: 'Trần Thị B', rating: 5, content: 'Đèn sáng đều, màu sắc tự nhiên không gây mỏi mắt. Xứng đáng với giá tiền, giao hàng đúng hẹn!', date: '2026-08-22' },
    { name: 'Lê Minh C', rating: 4, content: 'Chất lượng rất tốt, điều khiển từ xa nhạy. Rất hài lòng với chính sách bảo hành 24 tháng.', date: '2026-07-10' }
  ];
  const all = [...stored, ...demoReviews];

  const listEl = document.getElementById('reviews-list');
  if (!listEl) return;

  const summaryHtml = `
    <div class="review-summary-box">
      <div class="review-summary-left">
        <div class="review-big-number">${product.rating}</div>
        <div class="review-summary-details">
          <div class="stars">${Utils.renderStars(product.rating)}</div>
          <div class="review-summary-text">Dựa trên ${all.length} đánh giá thực tế từ khách hàng</div>
        </div>
      </div>
      <a href="#review-form" class="btn btn-outline btn-sm" onclick="document.getElementById('review-name')?.focus()">
        ✍️ Viết đánh giá
      </a>
    </div>
  `;

  const reviewsHtml = all.map(r => {
    const initial = (r.name || 'K').trim().charAt(0).toUpperCase();
    return `
      <div class="review-card">
        <div class="review-header">
          <div class="review-author-info">
            <div class="review-avatar-circle">${initial}</div>
            <div>
              <div class="review-author">
                ${Utils.escapeHtml(r.name)}
                <span class="review-verified-badge">✓ Đã mua hàng</span>
              </div>
              <div class="review-date">${r.date}</div>
            </div>
          </div>
          <div class="review-stars">${Utils.renderStars(r.rating)}</div>
        </div>
        <div class="review-content">${Utils.escapeHtml(r.content)}</div>
      </div>
    `;
  }).join('');

  listEl.innerHTML = summaryHtml + reviewsHtml;

  // Form submit handling (bind only once)
  const form = document.getElementById('review-form');
  if (form && !form.dataset.bound) {
    form.dataset.bound = 'true';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('review-name').value.trim();
      const content = document.getElementById('review-content').value.trim();
      const rating = parseInt(document.querySelector('input[name="rating"]:checked')?.value || 0);
      if (!name || !content || !rating) {
        Toast.error('Vui lòng điền đầy đủ thông tin và chọn số sao');
        return;
      }
      Storage.addReview(product.id, {
        name, content, rating,
        date: new Date().toISOString().slice(0, 10)
      });
      Toast.success('Cảm ơn bạn đã gửi đánh giá thành công!');
      form.reset();
      renderReviews(product);
    });
  }
}