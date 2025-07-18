import { useUI } from '../../context/UIContext.jsx';
import ProductModal from './ProductModal.jsx';
import CartModal from './CartModal.jsx';
import AuthModal from './AuthModal.jsx';
import CheckoutModal from './CheckoutModal.jsx';
import WishlistModal from './WishlistModal.jsx';

export default function ModalsRoot(){
  const { modal } = useUI();
  return (
    <>
      {modal === 'product' && <ProductModal />}
      {modal === 'cart' && <CartModal />}
      {modal === 'auth' && <AuthModal />}
      {modal === 'checkout' && <CheckoutModal />}
      {modal === 'wishlist' && <WishlistModal />}
    </>
  );
}