import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Création du contexte d'authentification
const AuthContext = createContext(null);

// Fournisseur d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, role = 'user') => {
    setUser({ email, role });
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
