import { useState } from 'react';
import { useUI } from '../../context/UIContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useModal } from '../../hooks/useModal.js';

export default function AuthModal(){
  const { closeModal } = useUI();
  const { signIn, register } = useAuth();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  useModal(true, closeModal);
  const submit = e => { e.preventDefault(); mode==='signin' ? signIn(email, pwd) : register(email, pwd); closeModal(); };
  return (
    <div className='modal active' role='dialog' aria-modal='true' aria-label='Authentication'>
      <div className='modal-content auth-modal'>
        <button className='modal-close' onClick={closeModal} aria-label='Close'>×</button>
        <div className='tabs'>
          <button className={mode==='signin'?'active':''} onClick={()=>setMode('signin')}>Sign In</button>
          <button className={mode==='signup'?'active':''} onClick={()=>setMode('signup')}>Sign Up</button>
        </div>
        <form onSubmit={submit} className='auth-form'>
          <label>Email
            <input type='email' value={email} onChange={e=>setEmail(e.target.value)} required />
          </label>
          <label>Password
            <input type='password' value={pwd} onChange={e=>setPwd(e.target.value)} required />
          </label>
          <button className='btn btn--primary' type='submit'>{mode==='signin'?'Sign In':'Create Account'}</button>
        </form>
      </div>
    </div>
  );
}