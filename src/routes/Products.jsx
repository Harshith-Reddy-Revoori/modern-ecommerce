import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useProducts } from '../context/ProductsContext.jsx';
import { useUI } from '../context/UIContext.jsx';

import ProductGrid from '../components/ProductGrid.jsx';
import { comparators } from '../utils/sorting.js';

/**
 * Products Page
 *  - Syncs category & search with query parameters
 *  - Applies sorting using comparators map
 *  - Opens product modal on selection
 */
export default function Products() {
  const { products, loading, error } = useProducts();
  const { openModal, setSelectedProduct } = useUI();

  const location = useLocation();
  const navigate = useNavigate();

  /* ---------- Query Param Helpers ---------- */
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const searchParam = (params.get('search') || '').trim().toLowerCase();
  const paramCategory = params.get('category') || '';

  /* ---------- Local UI State ---------- */
  const [category, setCategory] = useState(paramCategory);
  const [sort, setSort] = useState('featured');

  // Sync local category if URL param changes externally (e.g., via link)
  useEffect(() => {
    setCategory(paramCategory);
  }, [paramCategory]);

  // When user changes category locally, push to URL
  useEffect(() => {
    const current = new URLSearchParams(location.search);
    if (category) current.set('category', category); else current.delete('category');
    // Preserve search param
    if (searchParam) current.set('search', searchParam); else current.delete('search');
    const next = current.toString();
    const nextURL = next ? `?${next}` : '';
    // Only update if different
    if (`?${current.toString()}` !== location.search) {
      navigate(`/products${nextURL}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  /* ---------- Derived Data ---------- */
  const categories = useMemo(
    () => Array.from(new Set(products.map(p => p.category))).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    if (!products.length) return [];
    let list = category
      ? products.filter(p => p.category === category)
      : [...products];

    if (searchParam) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(searchParam) ||
        p.description.toLowerCase().includes(searchParam)
      );
    }

    // Apply sort
    const cmp = comparators[sort];
    if (cmp) {
      // Create shallow copy to avoid mutating context array
      list = [...list].sort(cmp);
    }

    return list;
  }, [products, category, searchParam, sort]);

  /* ---------- Handlers ---------- */
  const onSelectProduct = (product) => {
    setSelectedProduct(product);
    openModal('product');
  };

  const onCategoryChange = (e) => setCategory(e.target.value);
  const onSortChange = (e) => setSort(e.target.value);

  /* ---------- Render Helpers ---------- */
  const heading = category ? category : 'Products';
  const showEmpty = !loading && !error && filtered.length === 0;

  return (
    <main className="container products-page" aria-labelledby="products-heading">
      <header className="products-header">
        <h1 id="products-heading">{heading === 'Products' ? 'All Products' : heading}</h1>

        <div className="filters" role="group" aria-label="Product filters">
          {/* Category Select Pill */}
            <div className="select-pill">
              <select
                value={category}
                onChange={onCategoryChange}
                aria-label="Filter products by category"
              >
                <option value="">All Categories</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Sort Select Pill */}
            <div className="select-pill">
              <select
                value={sort}
                onChange={onSortChange}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
        </div>
      </header>

      {loading && (
        <div className="spinner" aria-live="polite">
          <div className="spinner__circle" />
          <span>Loading products…</span>
        </div>
      )}

      {error && (
        <div role="alert" className="empty-grid">
          Failed to load products. Please try again.
        </div>
      )}

      {showEmpty && (
        <div className="empty-grid" role="status">
          No products match your filters{searchParam ? ` for “${searchParam}”` : ''}.
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <ProductGrid
          products={filtered}
          onSelect={onSelectProduct}
        />
      )}
    </main>
  );
}
