import { useState } from 'react';
import '../App.css';
import { useAuth } from '../contexts/AuthContext';

function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  const handleAuth = (e) => {
    e.preventDefault();

    const url = isLoginMode
      ? `${import.meta.env.VITE_API_URL}/api/users/login`
      : `${import.meta.env.VITE_API_URL}/api/users/register`;

    const body = { email, password };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error || data.message) {
          setMessage(data.error || data.message);
        } else {
          login(data.email);
          setMessage("Connecté avec succès !");
        }
      })
      .catch(() => setMessage('Une erreur s’est produite.'));
  };

  return (
    <div className="container">
      <h2>{isLoginMode ? 'Connexion' : 'Créer un compte'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {isLoginMode ? 'Connexion' : 'Créer un compte'}
        </button>

        <button type="button" onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? 'Créer un compte' : 'Retour à la connexion'}
        </button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default AuthPage;