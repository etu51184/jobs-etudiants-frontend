import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * AuthContext: fournit les fonctions et états d'authentification.
 * stocke { token, user } dans localStorage pour persistance.
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Charger le token et l'utilisateur depuis localStorage
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Synchroniser localStorage à chaque changement de token ou user
  useEffect(() => {
    if (token && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, [token, user]);

  /**
   * login : reçoit un objet { token, email, role }
   * stocke le JWT et les infos utilisateur
   */
  const login = ({ token: newToken, email, role }) => {
    setToken(newToken);
    setUser({ email, role });
    navigate('/');
  };

  /** logout : nettoie le contexte et redirige vers /login */
  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
