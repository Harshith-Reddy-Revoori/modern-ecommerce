import ProductCard from './ProductCard.jsx';
export default function ProductGrid({ products, onSelect }){
  if(!products.length) return <div className='empty-grid'>No products found.</div>;
  return (
    <div className='products-grid'>
      {products.map(p => <ProductCard key={p.id} product={p} onSelect={onSelect} />)}
    </div>
  );
}