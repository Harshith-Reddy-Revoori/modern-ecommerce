import { useUI } from '../../context/UIContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useModal } from '../../hooks/useModal.js';
import { formatCurrency } from '../../utils/formatCurrency.js';

export default function ProductModal(){
  const { selectedProduct, closeModal } = useUI();
  const { dispatch } = useCart();
  useModal(!!selectedProduct, closeModal);
  if(!selectedProduct) return null;
  return (
    <div className='modal active' role='dialog' aria-modal='true' aria-label='Product details'>
      <div className='modal-content product-details'>
        <button className='modal-close' onClick={closeModal} aria-label='Close'>×</button>
        <div className='product-details__layout'>
          <div className='product-details__image'>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
          </div>
          <div className='product-details__info'>
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <div className='product-details__meta'>
              <span>Rating: {selectedProduct.rating}</span>
              <span>Stock: {selectedProduct.stock}</span>
            </div>
            <p className='product-details__price'>{formatCurrency(selectedProduct.price)}</p>
            <button className='btn btn--primary' onClick={()=>{dispatch({type:'ADD', id:selectedProduct.id}); closeModal();}}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}