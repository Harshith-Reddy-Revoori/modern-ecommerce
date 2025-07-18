import RatingStars from './RatingStars.jsx';
import { formatCurrency } from '../utils/formatCurrency.js';
import { useCart } from '../context/CartContext.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useUI } from '../context/UIContext.jsx';
import { FiHeart, FiShoppingCart, FiCheck } from 'react-icons/fi';

export default function ProductCard({ product, onOpenDetails }) {
  const { dispatch, cart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { pushToast } = useUI();
  const fav = isFavorite(product.id);
  const inCart = !!cart[product.id];

  const addToCart = e => {
    e.stopPropagation();
    dispatch({ type: 'ADD', id: product.id, qty: 1 });
    pushToast(`${product.name} added to cart!`, 'success');
  };

  const toggleFav = e => {
    e.stopPropagation();
    toggleFavorite(product.id);
    pushToast(
      fav ? `${product.name} removed from wishlist.` : `${product.name} saved to wishlist.`,
      fav ? 'info' : 'success'
    );
  };

  return (
    <div
      className='product-card product-card--actions'
      role='button'
      tabIndex={0}
      onClick={()=>onOpenDetails(product)}
      onKeyDown={e=>e.key==='Enter' && onOpenDetails(product)}
    >
      <div className='product-card__media'>
        <img src={product.image} alt={product.name}/>
      </div>
      <div className='product-card__body'>
        <h3 className='product-card__title'>{product.name}</h3>
        <p className='product-card__desc'>{product.description}</p>
        <RatingStars value={product.rating} count={product.reviews}/>
        <div className='product-card__price-row'>
          <span className='product-card__price'>{formatCurrency(product.price)}</span>
        </div>
      </div>
      <div className='product-card__actions'>
        <button
          className={`btn btn--sm btn--primary add-btn${inCart ? ' in-cart':''}`}
          onClick={addToCart}
          aria-label='Add to cart'
        >
          {inCart ? <><FiCheck/> In Cart</> : <><FiShoppingCart/> Add to Cart</>}
        </button>
        <button
          className={`heart-btn${fav ? ' active':''}`}
          aria-label={fav ? 'Remove from wishlist':'Add to wishlist'}
          onClick={toggleFav}
        >
          <FiHeart />
        </button>
      </div>
    </div>
  );
}
