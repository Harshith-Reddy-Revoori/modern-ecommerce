export default function StatsStrip(){
    const stats = [
      { value: '15+', label: 'Premium Products' },
      { value: '7', label: 'Categories' },
      { value: '24/7', label: 'Support' },
      { value: 'Free', label: 'Shipping > $50' }
    ];
    return (
      <section className='stats'>
        <div className='container stats-grid'>
          {stats.map(s => (
            <div className='stat-card' key={s.label}>
              <h3>{s.value}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }