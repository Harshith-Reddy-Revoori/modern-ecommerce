import { useState } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { useUI } from '../../context/UIContext.jsx';
import { useModal } from '../../hooks/useModal.js';
import { formatCurrency } from '../../utils/formatCurrency.js';

export default function CheckoutModal(){
  const { items, total, dispatch } = useCart();
  const { closeModal } = useUI();
  const [step, setStep] = useState(0); // 0 Shipping, 1 Payment, 2 Review
  const [shipping, setShipping] = useState({ name:'', address:'', city:'', zip:'' });
  const [payment, setPayment] = useState({ card:'', exp:'', cvc:'' });
  useModal(true, closeModal);
  const next = ()=> setStep(s=>Math.min(s+1,2));
  const back = ()=> setStep(s=>Math.max(s-1,0));
  const placeOrder = ()=> { dispatch({type:'CLEAR'}); alert('Order placed!'); closeModal(); };
  return (
    <div className='modal active' role='dialog' aria-modal='true' aria-label='Checkout'>
      <div className='modal-content checkout-modal'>
        <button className='modal-close' onClick={closeModal} aria-label='Close'>×</button>
        <div className='stepper' role='tablist'>
          {['Shipping','Payment','Review'].map((label,i)=>(
            <div key={label} className={'step'+(i===step?' active': i<step?' complete':'')}>{label}</div>
          ))}
        </div>
        {step===0 && (
          <form className='form-grid' onSubmit={e=>{e.preventDefault(); next();}}>
            <input placeholder='Full Name' value={shipping.name} onChange={e=>setShipping({...shipping,name:e.target.value})} required />
            <input placeholder='Address' value={shipping.address} onChange={e=>setShipping({...shipping,address:e.target.value})} required />
            <input placeholder='City' value={shipping.city} onChange={e=>setShipping({...shipping,city:e.target.value})} required />
            <input placeholder='ZIP' value={shipping.zip} onChange={e=>setShipping({...shipping,zip:e.target.value})} required />
            <button className='btn btn--primary'>Continue</button>
          </form>
        )}
        {step===1 && (
          <form className='form-grid' onSubmit={e=>{e.preventDefault(); next();}}>
            <input placeholder='Card Number' value={payment.card} onChange={e=>setPayment({...payment,card:e.target.value})} required />
            <input placeholder='MM/YY' value={payment.exp} onChange={e=>setPayment({...payment,exp:e.target.value})} required />
            <input placeholder='CVC' value={payment.cvc} onChange={e=>setPayment({...payment,cvc:e.target.value})} required />
            <div className='actions'>
              <button type='button' className='btn' onClick={back}>Back</button>
              <button className='btn btn--primary'>Review</button>
            </div>
          </form>
        )}
        {step===2 && (
          <div className='review'>
            <h3>Order Summary</h3>
            <ul className='review-items'>
              {items.map(i=> <li key={i.product.id}>{i.qty} × {i.product.name}</li>)}
            </ul>
            <p>Total: {formatCurrency(total)}</p>
            <div className='actions'>
              <button className='btn' onClick={back}>Back</button>
              <button className='btn btn--primary' onClick={placeOrder}>Place Order</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}