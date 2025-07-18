export const comparators = {
    'featured': () => 0,
    'price-low': (a,b)=>a.price-b.price,
    'price-high': (a,b)=>b.price-a.price,
    'rating': (a,b)=>b.rating-a.rating
  };