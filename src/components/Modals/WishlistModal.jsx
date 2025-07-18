import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useProducts } from '../../context/ProductsContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useUI } from '../../context/UIContext.jsx';
import { useModal } from '../../hooks/useModal.js';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { formatCurrency } from '../../utils/formatCurrency.js';

export default function WishlistModal(){
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { products } = useProducts();
  const { dispatch } = useCart();
  const { closeModal, pushToast } = useUI();

  useModal(true, closeModal);

  const favProducts = products.filter(p => favorites.includes(p.id));

  const add = (p) => {
    dispatch({ type:'ADD', id:p.id });
    pushToast(`${p.name} added to cart`, 'success');
  };

  const removeFav = (p) => {
    toggleFavorite(p.id);
    pushToast(`${p.name} removed from wishlist`, 'info');
  };

  return (
    <div className='modal active' role='dialog' aria-modal='true' aria-label='Wishlist'>
      <div className='modal-content wishlist-modal'>
        <button className='modal-close' onClick={closeModal} aria-label='Close'>×</button>
        <h2>Wishlist</h2>
        {!favProducts.length && (
          <div className='wishlist-empty'>
            <FiHeart className='wishlist-empty__icon'/>
            <p>Your wishlist is empty.</p>
          </div>
        )}
        {favProducts.length > 0 && (
          <ul className='wishlist-list'>
            {favProducts.map(p => (
              <li key={p.id} className='wishlist-item'>
                <img src={p.image} alt={p.name}/>
                <div className='wishlist-item__info'>
                  <strong>{p.name}</strong>
                  <span>{formatCurrency(p.price)}</span>
                </div>
                <div className='wishlist-item__actions'>
                  <button className='btn btn--sm btn--primary' onClick={()=>add(p)}>
                    <FiShoppingCart/> Add
                  </button>
                  <button
                    className='btn btn--sm btn--danger'
                    onClick={()=>removeFav(p)}
                    aria-label='Remove from wishlist'
                    title='Remove from wishlist'
                    >
                    <FiTrash2 />
                </button>

                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
