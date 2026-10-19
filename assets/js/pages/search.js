document.addEventListener('DOMContentLoaded', () => {
  initHeaderFooter();
  const params = Utils.getQueryParams();
  const q = params.q || '';
  document.getElementById('search-query').textContent = q ? `"${q}"` : '';
  document.getElementById('search-input-page').value = q;

  if (!q.trim()) {
    document.getElementById('search-results').innerHTML = '<div class="empty-state"><h3>Nhập từ khóa để tìm kiếm</h3></div>';
    return;
  }

  const results = ProductService.search(q);
  document.getElementById('search-count').textContent = `${results.length} kết quả`;
  ProductCard.renderGrid(results, document.getElementById('search-results'));

  document.getElementById('search-form-page')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newQ = document.getElementById('search-input-page').value.trim();
    if (newQ) window.location.href = `search.html?q=${encodeURIComponent(newQ)}`;
  });
});