import { useEffect } from 'react';
export function useModal(active, onClose){
  useEffect(()=>{
    if(!active) return;
    const onKey = e => { if(e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, onClose]);
}