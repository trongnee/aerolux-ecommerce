/**
 * Header & Footer shared components
 */

function updateHeaderCounts() {
  const cartBadge = document.querySelector('[data-cart-count]');
  const wishBadge = document.querySelector('[data-wishlist-count]');
  if (cartBadge) {
    const count = CartService.getCount();
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'flex' : 'none';
  }
  if (wishBadge) {
    const count = WishlistService.getCount();
    wishBadge.textContent = count;
    wishBadge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function getCategoryIcon(icon) {
  switch (icon) {
    case 'fan':
      return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 9C12 5 15 3 17 4s1 5-2 6M15 12c4 0 6 3 5 5s-5 1-6-2M12 15c0 4-3 6-5 5s-1-5 2-6M9 12c-4 0-6-3-5-5s5-1 6 2"/></svg>`;
    case 'lightbulb':
      return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>`;
    case 'chandelier':
      return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v5M6 7h12M6 7l-2 5h16l-2-5M8 12v3a4 4 0 0 0 8 0v-3M12 18v4"/></svg>`;
    case 'settings':
    default:
      return `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1 2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
  }
}

function renderHeader() {
  const cats = window.categories || [];

  const level1Html = cats.map((cat, idx) => `
    <li class="cat-level1-item ${idx === 0 ? 'active' : ''}" data-cat-id="${cat.id}">
      <a href="category.html?category=${cat.slug}" class="cat-level1-link">
        <span class="cat-level1-icon">${getCategoryIcon(cat.icon)}</span>
        <span class="cat-level1-name">${cat.name}</span>
        <svg class="cat-level1-arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </a>
    </li>
  `).join('');

  const level2Html = cats.map((cat, idx) => {
    const subs = cat.subcategories || [];
    return `
      <div class="cat-level2-panel ${idx === 0 ? 'active' : ''}" id="cat-panel-${cat.id}">
        <div class="cat-panel-header">
          <div class="cat-panel-title">
            <h3>${cat.name}</h3>
            <span class="cat-panel-count">${subs.length} danh mục con</span>
          </div>
          <a href="category.html?category=${cat.slug}" class="cat-panel-viewall">
            Xem tất cả
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
        <div class="cat-sub-grid">
          ${subs.map(s => `
            <a href="category.html?category=${cat.slug}&sub=${s.slug}" class="cat-sub-item">
              <span class="cat-sub-dot"></span>
              <span class="cat-sub-text">${s.name}</span>
            </a>
          `).join('')}
        </div>
        <div class="cat-panel-footer">
          <div class="cat-panel-benefit">
            <span class="benefit-icon">🛡️</span>
            <span>Bảo hành chính hãng 12-24 tháng</span>
          </div>
          <div class="cat-panel-benefit">
            <span class="benefit-icon">⚡</span>
            <span>Giao nhanh miễn phí từ 500k</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="announcement-bar" id="announcement">
      <span>🎉 Miễn phí vận chuyển đơn từ 500.000đ | Mã: <strong>FREESHIP</strong></span>
      <button class="close-btn" onclick="document.getElementById('announcement').style.display='none'" aria-label="Đóng">&times;</button>
    </div>
    <header class="site-header">
      <div class="container header-inner">
        <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
        </button>

        <a href="index.html" class="logo">
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="2"/>
            <path d="M12 22c0-4 3.5-8 8-8s8 4 8 8" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="20" cy="14" r="2" fill="currentColor"/>
            <path d="M20 16v10M16 20h8" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span class="logo-text">AEROLUX</span>
        </a>

        <nav class="main-nav">
          <div class="nav-item has-dropdown">
            <a href="category.html" class="nav-link">Danh mục
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <div class="mega-menu category-multilevel-menu">
              <div class="cat-multilevel-layout">
                <ul class="cat-level1-list">
                  ${level1Html}
                </ul>
                <div class="cat-level2-container">
                  ${level2Html}
                </div>
              </div>
            </div>
          </div>
          <div class="nav-item"><a href="category.html?category=quat-tran" class="nav-link">Quạt trần</a></div>
          <div class="nav-item"><a href="category.html?category=den-led" class="nav-link">Đèn LED</a></div>
          <div class="nav-item"><a href="category.html?category=den-led-am-tran" class="nav-link">Đèn âm trần</a></div>
          <div class="nav-item"><a href="category.html?category=den-trang-tri" class="nav-link">Đèn trang trí</a></div>
          <div class="nav-item"><a href="about.html" class="nav-link">Giới thiệu</a></div>
        </nav>

        <div class="header-actions">
          <form class="search-box" action="search.html" method="get">
            <input type="search" name="q" class="search-input" placeholder="Tìm sản phẩm..." aria-label="Tìm kiếm">
            <button type="submit" class="search-btn" aria-label="Tìm">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </button>
          </form>
          <a href="wishlist.html" class="header-action" title="Yêu thích" aria-label="Yêu thích">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="badge" data-wishlist-count style="display:none">0</span>
          </a>
          <a href="cart.html" class="header-action" title="Giỏ hàng" aria-label="Giỏ hàng">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="badge" data-cart-count style="display:none">0</span>
          </a>
        </div>
      </div>
    </header>

    <!-- Mobile nav -->
    <div class="mobile-nav-overlay" id="mobileNavOverlay"></div>
    <div class="mobile-nav" id="mobileNav">
      <div class="mobile-nav-header">
        <a href="index.html" class="logo"><span class="logo-text">AEROLUX</span></a>
        <button id="mobileNavClose" aria-label="Đóng">&times;</button>
      </div>
      <ul class="mobile-nav-list">
        ${cats.map(cat => `
          <li class="mobile-nav-item">
            <a href="category.html?category=${cat.slug}" class="mobile-nav-link">${cat.name}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </a>
            <div class="mobile-nav-submenu">
              ${(cat.subcategories || []).map(s => `<a href="category.html?category=${cat.slug}&sub=${s.slug}">${s.name}</a>`).join('')}
            </div>
          </li>
        `).join('')}
        <li class="mobile-nav-item"><a href="about.html" class="mobile-nav-link">Giới thiệu</a></li>
        <li class="mobile-nav-item"><a href="contact.html" class="mobile-nav-link">Liên hệ</a></li>
        <li class="mobile-nav-item"><a href="policy.html" class="mobile-nav-link">Chính sách</a></li>
      </ul>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo">
              <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
                <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="2"/>
                <path d="M12 22c0-4 3.5-8 8-8s8 4 8 8" stroke="currentColor" stroke-width="2" fill="none"/>
                <circle cx="20" cy="14" r="2" fill="currentColor"/>
              </svg>
              <span class="logo-text">AEROLUX</span>
            </a>
            <p>Chuyên cung cấp quạt điện và thiết bị chiếu sáng cao cấp. Mang đến không gian sống tiện nghi, hiện đại và tiết kiệm năng lượng.</p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
              <a href="#" aria-label="Youtube"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#0f172a"/></svg></a>
              <a href="#" aria-label="Zalo">Zalo</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Sản phẩm</h4>
            <ul>
              <li><a href="category.html?category=quat-tran">Quạt trần</a></li>
              <li><a href="category.html?category=quat-ban">Quạt bàn</a></li>
              <li><a href="category.html?category=den-led">Đèn LED</a></li>
              <li><a href="category.html?category=den-led-am-tran">Đèn âm trần</a></li>
              <li><a href="category.html?category=den-trang-tri">Đèn trang trí</a></li>
              <li><a href="category.html?category=phu-kien">Phụ kiện</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Hỗ trợ</h4>
            <ul>
              <li><a href="policy.html">Chính sách mua hàng</a></li>
              <li><a href="policy.html#shipping">Vận chuyển</a></li>
              <li><a href="policy.html#warranty">Bảo hành</a></li>
              <li><a href="policy.html#return">Đổi trả</a></li>
              <li><a href="contact.html">Liên hệ</a></li>
              <li><a href="about.html">Về chúng tôi</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Liên hệ</h4>
            <ul>
              <li>📍 123 Nguyễn Huệ, Q.1, TP.HCM</li>
              <li>📞 1900 1234</li>
              <li>✉️ support@aerolux.vn</li>
              <li>🕐 8:00 - 21:00 hàng ngày</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; 2026 AEROLUX. Tất cả quyền được bảo lưu.</span>
          <div class="footer-payment">
            <span>COD</span>
            <span>Chuyển khoản</span>
            <span>Visa/Master</span>
            <span>MoMo</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function initHeaderFooter() {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();

  updateHeaderCounts();

  // Mobile menu
  const toggle = document.getElementById('mobileMenuToggle');
  const nav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileNavOverlay');
  const closeBtn = document.getElementById('mobileNavClose');

  function openMobile() {
    nav?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobile() {
    nav?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggle?.addEventListener('click', openMobile);
  closeBtn?.addEventListener('click', closeMobile);
  overlay?.addEventListener('click', closeMobile);

  // Mobile submenu accordion
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    const submenu = link.nextElementSibling;
    if (submenu && submenu.classList.contains('mobile-nav-submenu')) {
      link.addEventListener('click', (e) => {
        if (submenu.children.length) {
          e.preventDefault();
          link.parentElement.classList.toggle('open');
        }
      });
    }
  });

  // Multi-level category menu interaction (desktop)
  const level1Items = document.querySelectorAll('.cat-level1-item');
  const level2Panels = document.querySelectorAll('.cat-level2-panel');

  level1Items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const catId = item.dataset.catId;
      level1Items.forEach(i => i.classList.remove('active'));
      level2Panels.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const targetPanel = document.getElementById(`cat-panel-${catId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Desktop category dropdown click toggle (in addition to hover)
  const catDropdownToggle = document.querySelector('.nav-item.has-dropdown');
  const catDropdownLink = catDropdownToggle?.querySelector('.nav-link');
  if (catDropdownLink && catDropdownToggle) {
    catDropdownLink.addEventListener('click', (e) => {
      if (window.innerWidth > 768) {
        e.preventDefault();
        catDropdownToggle.classList.toggle('open');
      }
    });

    document.addEventListener('click', (e) => {
      if (!catDropdownToggle.contains(e.target)) {
        catDropdownToggle.classList.remove('open');
      }
    });
  }

  // Close mobile drawer or category dropdown on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav?.classList.contains('open')) {
      closeMobile();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav?.classList.contains('open')) {
      closeMobile();
    }
  });

  window.addEventListener('cart:updated', updateHeaderCounts);
  window.addEventListener('wishlist:updated', updateHeaderCounts);
}

if (typeof window !== 'undefined') {
  window.renderHeader = renderHeader;
  window.renderFooter = renderFooter;
  window.initHeaderFooter = initHeaderFooter;
  window.updateHeaderCounts = updateHeaderCounts;
}