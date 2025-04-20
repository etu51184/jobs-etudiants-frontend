import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(null);

  const login = (newUsername) => {
    setUsername(newUsername);
  };

  const logout = () => {
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
