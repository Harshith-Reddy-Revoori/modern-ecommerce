// src/components/Modals/CartModal.jsx
import { useCart } from '../../context/CartContext.jsx';
import { useUI } from '../../context/UIContext.jsx';
import { useModal } from '../../hooks/useModal.js';
import { formatCurrency } from '../../utils/formatCurrency.js';
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

export default function CartModal(){
  const { items, total, dispatch } = useCart();
  const { closeModal, openModal, pushToast } = useUI();
  useModal(true, closeModal);

  const empty = items.length === 0;

  const updateQty = (id, qty) => {
    dispatch({ type: 'SET', id, qty: Math.max(1, qty) });
  };
  const removeItem = (product) => {
    dispatch({ type:'REMOVE', id: product.id });
    pushToast(`${product.name} removed from cart.`, 'info');
  };

  return (
    <div className='modal active' role='dialog' aria-modal='true' aria-label='Shopping cart'>
      <div className='modal-content cart-modal cart-modal--revamp'>
        <button className='modal-close' onClick={closeModal} aria-label='Close'>×</button>
        <h2 className='cart-title'>Shopping Cart</h2>

        {empty && (
          <div className='cart-empty'>
            <FiShoppingCart className='cart-empty__icon' />
            <h3>Your cart is empty</h3>
            <p>Add some products to get started</p>
          </div>
        )}

        {!empty && (
          <ul className='cart-lines cart-lines--revamp'>
            {items.map(({ product, qty, subtotal }) => (
              <li key={product.id} className='cart-line cart-line--revamp'>
                <div className='cart-line__media'>
                  <img src={product.image} alt={product.name}/>
                </div>
                <div className='cart-line__info'>
                  <h4 className='cart-line__name'>{product.name}</h4>
                  <span className='cart-line__unit'>{formatCurrency(product.price)}</span>
                </div>

                <div className='qty-group'>
                  <button
                    className='qty-btn'
                    onClick={()=>updateQty(product.id, qty-1)}
                    aria-label='Decrease quantity'
                    disabled={qty<=1}
                  ><FiMinus/></button>
                  <input
                    type='number'
                    value={qty}
                    min='1'
                    onChange={e=>updateQty(product.id, +e.target.value || 1)}
                    aria-label='Quantity'
                  />
                  <button
                    className='qty-btn'
                    onClick={()=>updateQty(product.id, qty+1)}
                    aria-label='Increase quantity'
                  ><FiPlus/></button>
                </div>

                <div className='cart-line__subtotal'>{formatCurrency(subtotal)}</div>

                <button
                  className='btn btn--sm btn--danger cart-line__remove-btn'
                  onClick={()=>removeItem(product)}
                  aria-label='Remove item'
                >
                  <FiTrash2 /> <span className='hide-xs'>Remove</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <hr className='cart-divider'/>

        <div className='cart-total-row cart-total-row--revamp'>
          <span className='label'>Total:</span>
          <span className='value'>{formatCurrency(total)}</span>
        </div>

        <div className='cart-footer cart-footer--revamp'>
          <button
            className='btn btn--secondary cart-footer__continue'
            onClick={closeModal}
            disabled={empty}
          >
            Continue Shopping
          </button>
          <button
            className='btn btn--primary cart-footer__checkout'
            disabled={empty}
            onClick={()=>{ closeModal(); openModal('checkout'); }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
