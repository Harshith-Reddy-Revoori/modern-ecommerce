import { createContext, useContext, useReducer, useEffect } from 'react';
import products from '../data/products.json';

const CartContext = createContext();

function reducer(state, action){
  switch(action.type){
    case 'ADD': {
      const { id, qty = 1 } = action; return { ...state, [id]: (state[id]||0)+qty };
    }
    case 'SET': {
      const { id, qty } = action; const next = { ...state }; if(qty<=0) delete next[id]; else next[id]=qty; return next;
    }
    case 'REMOVE': {
      const next = { ...state }; delete next[action.id]; return next;
    }
    case 'CLEAR': return {};
    default: return state;
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, {}, () => {
    try { return JSON.parse(localStorage.getItem('cart')||'{}'); } catch { return {}; }
  });
  useEffect(()=> localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const items = Object.entries(cart).map(([id, qty]) => {
    const product = products.find(p => p.id === Number(id));
    return { product, qty, subtotal: product.price * qty };
  });
  const total = items.reduce((s,i)=>s+i.subtotal,0);
  return (
    <CartContext.Provider value={{ cart, items, total, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);