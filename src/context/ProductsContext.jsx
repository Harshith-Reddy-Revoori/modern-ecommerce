import { createContext, useContext } from 'react';
import products from '../data/products.json';

const ProductsContext = createContext();
export const ProductsProvider = ({ children }) => (
  <ProductsContext.Provider value={{ products }}>
    {children}
  </ProductsContext.Provider>
);
export const useProducts = () => useContext(ProductsContext);