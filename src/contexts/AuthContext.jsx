// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * AuthContext: gère la session utilisateur (token + infos)
 * Persiste le token et l’objet user (email + role) dans localStorage.
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Charger token & user en initial
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Sync localStorage quand token ou user change
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
   * login : reçoit { token, email, role }
   * stocke ces valeurs et redirige sur la home
   */
  const login = ({ token: newToken, email, role }) => {
    setToken(newToken);
    setUser({ email, role });
    navigate('/');
  };

  /** logout : supprime session et redirige sur /login */
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
