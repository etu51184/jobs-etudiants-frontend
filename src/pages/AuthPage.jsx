// src/pages/AuthPage.jsx
import { useState } from 'react';
import '../App.css';
import { useAuth } from '../contexts/AuthContext';

function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  const handleAuth = (e) => {
    e.preventDefault();

    const url = isLoginMode
      ? `${import.meta.env.VITE_API_URL}/api/users/login`
      : `${import.meta.env.VITE_API_URL}/api/users`;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(data.message || 'Success');
          login(username); // mise à jour via le contexte
        }
      })
      .catch(() => setMessage('Une erreur s’est produite.'));
  };

  return (
    <div className="container">
      <h2>{isLoginMode ? 'Connexion' : 'Créer un compte'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLoginMode ? 'Connexion' : 'Créer un compte'}</button>
        <button type="button" onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? 'Créer un compte' : 'Retour à la connexion'}
        </button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default AuthPage;
