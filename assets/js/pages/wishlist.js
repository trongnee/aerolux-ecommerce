document.addEventListener('DOMContentLoaded', () => {
  initHeaderFooter();
  renderWishlist();
});

function renderWishlist() {
  const ids = WishlistService.getIds();
  const empty = document.getElementById('wishlist-empty');
  const grid = document.getElementById('wishlist-grid');

  if (!ids.length) {
    empty.style.display = 'block';
    grid.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  grid.style.display = 'grid';

  const products = ProductService.getByIds(ids);
  ProductCard.renderGrid(products, grid);
}