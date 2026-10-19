/**
 * Category page with dynamic filters
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderFooter();

  const params = Utils.getQueryParams();
  const categorySlug = params.category || 'quat-tran';
  const subSlug = params.sub || null;
  let currentPage = parseInt(params.page) || 1;
  let currentSort = params.sort || 'default';
  let filters = {};

  // Parse existing filter params
  Object.keys(params).forEach(k => {
    if (!['category', 'sub', 'page', 'sort'].includes(k)) {
      filters[k] = params[k].includes(',') ? params[k].split(',') : params[k];
    }
  });
  if (subSlug) filters.subcategory = subSlug;

  const category = (window.categories || []).find(c => c.slug === categorySlug);
  if (!category) {
    window.location.href = '404.html';
    return;
  }

  // Render header info
  document.getElementById('category-title').textContent = category.name;
  document.getElementById('category-desc').textContent = category.description;
  document.title = `${category.name} — AEROLUX`;

  // Breadcrumb
  const bc = document.getElementById('breadcrumb');
  if (bc) {
    let html = `<a href="index.html">Trang chủ</a><span class="separator">/</span>`;
    html += `<span class="current">${category.name}</span>`;
    bc.innerHTML = html;
  }

  // Subcategories
  const subEl = document.getElementById('subcategory-tags');
  if (subEl) {
    subEl.innerHTML = `
      <a href="category.html?category=${category.slug}" class="subcategory-tag ${!subSlug ? 'active' : ''}">Tất cả</a>
      ${(category.subcategories || []).map(s =>
        `<a href="category.html?category=${category.slug}&sub=${s.slug}" class="subcategory-tag ${subSlug === s.slug ? 'active' : ''}">${s.name}</a>`
      ).join('')}
    `;
  }

  // Build filters UI
  function renderFilters() {
    const sidebar = document.getElementById('filter-sidebar');
    if (!sidebar) return;

    const brands = ProductService.getBrandsInCategory(category.id);
    let html = '';

    // Price
    html += `
      <div class="filter-group">
        <div class="filter-group-title">Khoảng giá</div>
        <div class="filter-price-inputs">
          <input type="number" id="minPrice" placeholder="Từ" value="${filters.minPrice || ''}">
          <span>-</span>
          <input type="number" id="maxPrice" placeholder="Đến" value="${filters.maxPrice || ''}">
        </div>
        <button class="btn btn-sm btn-secondary mt-2" id="applyPrice">Áp dụng</button>
      </div>
    `;

    // Brands
    if (brands.length) {
      html += `<div class="filter-group"><div class="filter-group-title">Thương hiệu</div><div class="filter-options">`;
      brands.forEach(b => {
        const checked = (Array.isArray(filters.brands) ? filters.brands : [filters.brands]).includes(b.id);
        html += `<label class="filter-option"><input type="checkbox" name="brand" value="${b.id}" ${checked ? 'checked' : ''}> ${b.name}</label>`;
      });
      html += `</div></div>`;
    }

    // On sale
    html += `
      <div class="filter-group">
        <label class="filter-option">
          <input type="checkbox" id="onSale" ${filters.onSale ? 'checked' : ''}>
          Đang giảm giá
        </label>
      </div>
    `;

    // Dynamic attribute filters
    (category.filters || []).forEach(f => {
      if (f.key === 'brand' || f.key === 'price') return;
      if (f.type === 'boolean') {
        html += `
          <div class="filter-group">
            <label class="filter-option">
              <input type="checkbox" name="${f.key}" value="true" ${filters[f.key] === 'true' || filters[f.key] === true ? 'checked' : ''}>
              ${f.label}
            </label>
          </div>
        `;
      } else if (f.options) {
        html += `<div class="filter-group"><div class="filter-group-title">${f.label}</div><div class="filter-options">`;
        f.options.forEach(opt => {
          const vals = Array.isArray(filters[f.key]) ? filters[f.key] : (filters[f.key] ? [filters[f.key]] : []);
          const checked = vals.includes(opt);
          html += `<label class="filter-option"><input type="checkbox" name="${f.key}" value="${opt}" ${checked ? 'checked' : ''}> ${opt}</label>`;
        });
        html += `</div></div>`;
      }
    });

    html += `<button class="btn btn-secondary btn-block mt-4" id="clearFilters">Xóa tất cả bộ lọc</button>`;
    sidebar.innerHTML = html;

    // Events
    sidebar.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', collectAndApply);
    });
    document.getElementById('applyPrice')?.addEventListener('click', collectAndApply);
    document.getElementById('clearFilters')?.addEventListener('click', () => {
      filters = subSlug ? { subcategory: subSlug } : {};
      currentPage = 1;
      applyFilters();
    });
  }

  function collectAndApply() {
    filters = {};
    if (subSlug) filters.subcategory = subSlug;

    const minP = document.getElementById('minPrice')?.value;
    const maxP = document.getElementById('maxPrice')?.value;
    if (minP) filters.minPrice = minP;
    if (maxP) filters.maxPrice = maxP;
    if (document.getElementById('onSale')?.checked) filters.onSale = true;

    const brandChecks = document.querySelectorAll('input[name="brand"]:checked');
    if (brandChecks.length) filters.brands = [...brandChecks].map(c => c.value);

    document.querySelectorAll('#filter-sidebar input[type="checkbox"]:checked').forEach(cb => {
      if (cb.name === 'brand' || cb.id === 'onSale') return;
      if (!filters[cb.name]) filters[cb.name] = [];
      if (Array.isArray(filters[cb.name])) filters[cb.name].push(cb.value);
      else filters[cb.name] = cb.value;
    });

    currentPage = 1;
    applyFilters();
  }

  function applyFilters() {
    let products = ProductService.getByCategory(category.id);
    products = ProductService.filter(products, filters);
    products = ProductService.sort(products, currentSort);
    const paginated = ProductService.paginate(products, currentPage, 12);

    document.getElementById('product-count').textContent = `${paginated.total} sản phẩm`;
    ProductCard.renderGrid(paginated.items, document.getElementById('product-grid'));
    renderPagination(paginated);

    // Sync URL
    const urlParams = { category: categorySlug, page: currentPage > 1 ? currentPage : null, sort: currentSort !== 'default' ? currentSort : null };
    if (subSlug) urlParams.sub = subSlug;
    Object.entries(filters).forEach(([k, v]) => {
      if (k === 'subcategory') return;
      urlParams[k] = Array.isArray(v) ? v.join(',') : v;
    });
    Utils.updateQueryParams(urlParams, true);
  }

  function renderPagination(paginated) {
    const el = document.getElementById('pagination');
    if (!el || paginated.totalPages <= 1) { el.innerHTML = ''; return; }
    let html = `<button class="pagination-btn" data-page="${paginated.page - 1}" ${paginated.page <= 1 ? 'disabled' : ''}>‹</button>`;
    for (let i = 1; i <= paginated.totalPages; i++) {
      if (i === 1 || i === paginated.totalPages || Math.abs(i - paginated.page) <= 1) {
        html += `<button class="pagination-btn ${i === paginated.page ? 'active' : ''}" data-page="${i}">${i}</button>`;
      } else if (Math.abs(i - paginated.page) === 2) {
        html += `<span class="pagination-btn" style="border:none">…</span>`;
      }
    }
    html += `<button class="pagination-btn" data-page="${paginated.page + 1}" ${paginated.page >= paginated.totalPages ? 'disabled' : ''}>›</button>`;
    el.innerHTML = html;
    el.querySelectorAll('[data-page]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.dataset.page);
        applyFilters();
        Utils.scrollToTop();
      });
    });
  }

  // Sort
  document.getElementById('sort-select')?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    currentPage = 1;
    applyFilters();
  });

  // Mobile filter toggle
  document.getElementById('mobileFilterBtn')?.addEventListener('click', () => {
    document.getElementById('filter-sidebar')?.classList.add('open');
  });

  renderFilters();
  applyFilters();
});