import { useUI } from '../context/UIContext.jsx';
export default function Toasts(){
  const { toasts } = useUI();
  return (
    <div className='toast-container' role='status' aria-live='polite'>
      {toasts.map(t => (
        <div key={t.id} className={`toast toast--${t.type}`}>{t.message}</div>
      ))}
    </div>
  );
}