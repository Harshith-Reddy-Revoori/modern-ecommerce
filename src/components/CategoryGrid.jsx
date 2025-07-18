import { Link } from 'react-router-dom';
export default function CategoryGrid({ categories }){
  return (
    <div className='category-grid'>
      {categories.map(c => (
        <Link to={`/products?category=${encodeURIComponent(c)}`} key={c} className='category-card'>
          <div className='category-card__icon'>📦</div>
          <div className='category-card__name'>{c}</div>
        </Link>
      ))}
    </div>
  );
}