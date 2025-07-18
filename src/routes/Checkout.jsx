import { useCart } from '../context/CartContext.jsx';
import { useUI } from '../context/UIContext.jsx';
import { formatCurrency } from '../utils/formatCurrency.js';

export default function Checkout(){
  const { items, total } = useCart();
  const { openModal } = useUI();
  if(!items.length) return (
    <div className='container'>
      <h1>Checkout</h1>
      <p>Your cart is empty.</p>
    </div>
  );
  return (
    <div className='container'>
      <h1>Checkout</h1>
      <ul className='review-items'>
        {items.map(i=> <li key={i.product.id}>{i.qty} × {i.product.name}</li>)}
      </ul>
      <p>Total: {formatCurrency(total)}</p>
      <button className='btn btn--primary' onClick={()=>openModal('checkout')}>Continue in Modal</button>
    </div>
  );
}