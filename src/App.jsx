import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './routes/Home.jsx';
import Products from './routes/Products.jsx';
import Categories from './routes/Categories.jsx';
import About from './routes/About.jsx';
import Checkout from './routes/Checkout.jsx';
import ModalsRoot from './components/Modals/ModalsRoot.jsx';
import Toasts from './components/Toasts.jsx';

export default function App(){
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/about' element={<About />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
      <ModalsRoot />
      <Toasts />
    </>
  );
}