import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{
    try { return JSON.parse(localStorage.getItem('user')||'null'); } catch { return null; }
  });
  useEffect(()=> localStorage.setItem('user', JSON.stringify(user)), [user]);

  const signIn = (email, _pwd) => setUser({ email });
  const register = (email, _pwd) => setUser({ email });
  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);