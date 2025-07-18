import { FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';

export default function About(){
  const features = [
    { icon: <FiTruck/>, title:'Fast Delivery', desc:'Free shipping on orders over $50 with express options.' },
    { icon: <FiShield/>, title:'Secure Shopping', desc:'Protected transactions & industry standard encryption.' },
    { icon: <FiHeadphones/>, title:'24/7 Support', desc:'Always-on customer service for any questions.' }
  ];
  return (
    <div className='container about-page'>
      <h1>About ModernStore</h1>
      <p className='about-lead'>
        Welcome to ModernStore, your destination for high-quality electronics, fashion and lifestyle products.
        We offer 15+ premium items across multiple categories with a focus on reliability and value.
      </p>
      <div className='feature-row'>
        {features.map(f=>(
          <div className='feature-card' key={f.title}>
            <div className='feature-icon'>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
