import { testimonials } from '../data/testimonials.js';

export default function Testimonials(){
  return (
    <section className='testimonials'>
      <div className='container'>
        <h2 className='section-title'>What Customers Say</h2>
        <div className='testimonials-grid'>
          {testimonials.map(t => (
            <figure key={t.id} className='testimonial-card'>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}