export default function LoadingSpinner({ label='Loading...' }){
    return (
      <div className='spinner' role='status' aria-live='polite'>
        <div className='spinner__circle' />
        <span className='visually-hidden'>{label}</span>
      </div>
    );
  }