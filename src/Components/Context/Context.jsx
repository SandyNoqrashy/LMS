import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

  const login = (token) => {
    try {
      const userData = jwtDecode(token); 
      setUser(userData);
      setLogged(true);
      localStorage.setItem('tc', token); 
    } catch (e) {
      console.error("توكن غير صالح:", e);
      logout();
    }
  };

  const logout = () => {
    setLogged(false);
    localStorage.removeItem('tc');
    setUser(null);
  };

  // تشغيل مرة واحدة عند فتح الصفحة للتحقق من التوكن المخزن
  useEffect(() => {
    const savedToken = localStorage.getItem('tc');
    if (savedToken) {
      try {
        const userData = jwtDecode(savedToken);
        setUser(userData);
        setLogged(true);
      } catch (e) {
        localStorage.removeItem('tc'); // مسح التوكن التالف
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ logged, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);