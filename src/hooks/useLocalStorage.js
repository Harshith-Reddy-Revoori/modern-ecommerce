import { useState, useEffect } from 'react';
export function useLocalStorage(key, initial){
  const [value, setValue] = useState(()=>{
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; } catch { return initial; }
  });
  useEffect(()=> { localStorage.setItem(key, JSON.stringify(value)); }, [value, key]);
  return [value, setValue];
}