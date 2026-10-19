/**
 * Home page logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderFooter();

  // Featured categories
  const catGrid = document.getElementById('featured-categories');
  if (catGrid) {
    const cats = (window.categories || []).slice(0, 4);
    catGrid.innerHTML = cats.map(c => `
      <a href="category.html?category=${c.slug}" class="category-card">
        <img src="${c.image}" alt="${c.name}" loading="lazy" onerror="this.style.background='#edf2f7'">
        <div class="category-card-overlay">
          <div class="category-card-title">${c.name}</div>
          <div class="category-card-count">${ProductService.getByCategory(c.id).length} sản phẩm</div>
        </div>
      </a>
    `).join('');
  }

  // Best seller fans
  const fanEl = document.getElementById('bestsellers-fans');
  if (fanEl) {
    const fans = ProductService.getAll()
      .filter(p => p.categoryId.startsWith('quat') && p.bestSeller)
      .slice(0, 4);
    ProductCard.renderGrid(fans.length ? fans : ProductService.getByCategory('quat-tran').slice(0, 4), fanEl);
  }

  // Featured LEDs
  const ledEl = document.getElementById('featured-leds');
  if (ledEl) {
    const leds = ProductService.getAll()
      .filter(p => p.categoryId === 'den-led' && (p.featured || p.bestSeller))
      .slice(0, 4);
    ProductCard.renderGrid(leds.length ? leds : ProductService.getByCategory('den-led').slice(0, 4), ledEl);
  }

  // Downlights
  const dlEl = document.getElementById('featured-downlights');
  if (dlEl) {
    ProductCard.renderGrid(ProductService.getByCategory('den-led-am-tran').slice(0, 4), dlEl);
  }

  // Decorative
  const decEl = document.getElementById('featured-decorative');
  if (decEl) {
    ProductCard.renderGrid(ProductService.getByCategory('den-trang-tri').slice(0, 4), decEl);
  }

  // New products
  const newEl = document.getElementById('new-products');
  if (newEl) {
    ProductCard.renderGrid(ProductService.getNew(8), newEl);
  }

  // On sale
  const saleEl = document.getElementById('sale-products');
  if (saleEl) {
    ProductCard.renderGrid(ProductService.getOnSale(8), saleEl);
  }

  // Brands
  const brandEl = document.getElementById('brand-logos');
  if (brandEl) {
    brandEl.innerHTML = (window.brands || []).slice(0, 10).map(b =>
      `<span class="brand-logo">${b.name}</span>`
    ).join('');
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Newsletter
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = nlForm.querySelector('input[type="email"]').value;
      if (email) {
        Toast.success('Cảm ơn bạn đã đăng ký nhận tin!');
        nlForm.reset();
      }
    });
  }
});