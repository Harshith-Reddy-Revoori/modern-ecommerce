import products from './products.json';
export const categories = [...new Set(products.map(p => p.category))].sort();