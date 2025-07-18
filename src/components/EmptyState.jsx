export default function EmptyState({ title='Nothing here', message='No data available.' }){
    return (
      <div className='empty-state'>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    );
  }