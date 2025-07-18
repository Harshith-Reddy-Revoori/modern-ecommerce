export default function Hero(){
  return (
    <section className='hero'>
      <div className='container'>
        <h1 className='hero__title'>Discover Premium Products</h1>
        <p className='hero__subtitle'>
          Shop from our expanded catalog of 15+ premium products across Electronics, Fashion,
          Home &amp; Garden, Books, Sports, Travel &amp; Beauty.
        </p>
        <div className='hero__cta'>
          <a href='/products' className='btn btn--primary'>Shop Now</a>
        </div>
      </div>
    </section>
  );
}
