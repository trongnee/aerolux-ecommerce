/**
 * Product Service - centralized data access
 * Designed to be replaceable with API calls later
 */

const ProductService = {
  getAll() {
    return window.products || [];
  },

  getById(id) {
    return this.getAll().find(p => p.id === id) || null;
  },

  getBySlug(slug) {
    return this.getAll().find(p => p.slug === slug) || null;
  },

  getByCategory(categoryId, subcategoryId = null) {
    return this.getAll().filter(p => {
      if (p.categoryId !== categoryId) return false;
      if (subcategoryId && p.subcategoryId !== subcategoryId) return false;
      return p.status === 'active';
    });
  },

  getFeatured(limit = 8) {
    return this.getAll().filter(p => p.featured && p.status === 'active').slice(0, limit);
  },

  getBestSellers(limit = 8) {
    return this.getAll()
      .filter(p => p.bestSeller && p.status === 'active')
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  },

  getNew(limit = 8) {
    return this.getAll().filter(p => p.isNew && p.status === 'active').slice(0, limit);
  },

  getOnSale(limit = 8) {
    return this.getAll()
      .filter(p => p.originalPrice && p.originalPrice > p.price && p.status === 'active')
      .slice(0, limit);
  },

  getRelated(product, limit = 4) {
    return this.getAll()
      .filter(p => p.categoryId === product.categoryId && p.id !== product.id && p.status === 'active')
      .slice(0, limit);
  },

  getByIds(ids) {
    const map = {};
    this.getAll().forEach(p => { map[p.id] = p; });
    return ids.map(id => map[id]).filter(Boolean);
  },

  /**
   * Search with Vietnamese diacritic support
   */
  search(query, options = {}) {
    if (!query || !query.trim()) return [];
    const q = Utils.removeDiacritics(query.trim());
    const tokens = q.split(/\s+/).filter(Boolean);

    let results = this.getAll().filter(p => {
      if (p.status !== 'active') return false;
      const searchable = Utils.removeDiacritics(
        [p.name, p.sku, p.brand, p.shortDescription, ...(p.tags || [])].join(' ')
      );
      return tokens.every(t => searchable.includes(t));
    });

    if (options.categoryId) {
      results = results.filter(p => p.categoryId === options.categoryId);
    }
    if (options.brand) {
      results = results.filter(p => p.brand === options.brand);
    }
    if (options.minPrice != null) {
      results = results.filter(p => p.price >= options.minPrice);
    }
    if (options.maxPrice != null) {
      results = results.filter(p => p.price <= options.maxPrice);
    }

    return this.sort(results, options.sort || 'relevance');
  },

  /**
   * Filter products by multiple criteria
   */
  filter(products, filters = {}) {
    let result = [...products];

    if (filters.brands && filters.brands.length) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }
    if (filters.minPrice != null && filters.minPrice !== '') {
      result = result.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice != null && filters.maxPrice !== '') {
      result = result.filter(p => p.price <= Number(filters.maxPrice));
    }
    if (filters.onSale) {
      result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
    }
    if (filters.subcategory) {
      result = result.filter(p => p.subcategoryId === filters.subcategory);
    }

    // Attribute filters
    Object.keys(filters).forEach(key => {
      if (['brands', 'minPrice', 'maxPrice', 'onSale', 'subcategory', 'sort', 'page'].includes(key)) return;
      const val = filters[key];
      if (val === undefined || val === null || val === '' || (Array.isArray(val) && !val.length)) return;

      result = result.filter(p => {
        const attr = p.attributes || {};
        if (typeof val === 'boolean' || val === 'true' || val === 'false') {
          const boolVal = val === true || val === 'true';
          return !!attr[key] === boolVal;
        }
        if (Array.isArray(val)) {
          return val.includes(String(attr[key]));
        }
        return String(attr[key]) === String(val);
      });
    });

    return result;
  },

  sort(products, sortBy = 'default') {
    const arr = [...products];
    switch (sortBy) {
      case 'price-asc':
        return arr.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return arr.sort((a, b) => b.price - a.price);
      case 'newest':
        return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'bestseller':
        return arr.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0) || b.reviewCount - a.reviewCount);
      case 'rating':
        return arr.sort((a, b) => b.rating - a.rating);
      default:
        return arr;
    }
  },

  paginate(products, page = 1, perPage = 12) {
    const total = products.length;
    const totalPages = Math.ceil(total / perPage) || 1;
    const current = Math.min(Math.max(1, page), totalPages);
    const start = (current - 1) * perPage;
    return {
      items: products.slice(start, start + perPage),
      page: current,
      perPage,
      total,
      totalPages
    };
  },

  getBrandName(brandId) {
    const b = (window.brands || []).find(x => x.id === brandId);
    return b ? b.name : brandId;
  },

  getCategory(categoryId) {
    return (window.categories || []).find(c => c.id === categoryId) || null;
  },

  getSubcategory(categoryId, subcategoryId) {
    const cat = this.getCategory(categoryId);
    if (!cat) return null;
    return (cat.subcategories || []).find(s => s.id === subcategoryId) || null;
  },

  getBrandsInCategory(categoryId) {
    const brandIds = [...new Set(
      this.getByCategory(categoryId).map(p => p.brand)
    )];
    return (window.brands || []).filter(b => brandIds.includes(b.id));
  }
};

if (typeof window !== 'undefined') {
  window.ProductService = ProductService;
}