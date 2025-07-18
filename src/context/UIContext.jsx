import { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext();
export const UIProvider = ({ children }) => {
  const [modal, setModal] = useState(null); // 'product'|'cart'|'auth'|'checkout'|null
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  const openModal = name => setModal(name);
  const closeModal = () => { setModal(null); setSelectedProduct(null); };

  const pushToast = useCallback((message, type='info') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(()=> setToasts(t => t.filter(x=>x.id!==id)), 3500);
  }, []);

  return (
    <UIContext.Provider value={{ modal, openModal, closeModal, selectedProduct, setSelectedProduct, toasts, pushToast }}>
      {children}
    </UIContext.Provider>
  );
};
export const useUI = () => useContext(UIContext);