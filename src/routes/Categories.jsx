import products from '../data/products.json';
import { useNavigate } from 'react-router-dom';

export default function Categories(){
  const navigate = useNavigate();
  const grouped = products.reduce((acc,p)=>{
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});
  const entries = Object.entries(grouped); // [category, products[]]

  const go = (cat) => navigate(`/products?category=${encodeURIComponent(cat)}`);

  return (
    <div className='container categories-page'>
      <h1>Shop by Category</h1>
      <div className='categories-grid'>
        {entries.map(([cat, list])=>{
          const img = list[0].image;
          return (
            <button key={cat} className='category-tile' onClick={()=>go(cat)} aria-label={`Open ${cat}`}>
              <div className='category-tile__media'>
                <img src={img} alt={cat} />
              </div>
              <div className='category-tile__label'>{cat} ({list.length})</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
