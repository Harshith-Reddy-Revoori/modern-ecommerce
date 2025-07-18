import { useProducts } from '../context/ProductsContext.jsx';
import { useUI } from '../context/UIContext.jsx';
import Hero from '../components/Hero.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import StatsStrip from '../components/StatsStrip.jsx';
import Testimonials from '../components/Testimonials.jsx';

export default function Home(){
  const { products } = useProducts();
  const { openModal, setSelectedProduct } = useUI();
  const featured = products.slice(0,6);
  const select = p => { setSelectedProduct(p); openModal('product'); };
  return (
    <>
      <Hero />
      <section className='section'>
        <div className='container'>
          <h2 className='section-title'>Featured Products</h2>
          <ProductGrid products={featured} onSelect={select} />
        </div>
      </section>
      <StatsStrip />
      <Testimonials />
    </>
  );
}