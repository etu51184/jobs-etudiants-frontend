// src/pages/AuthPage.jsx
import { useState } from 'react';
import '../App.css';

function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();

    const url = isLoginMode
      ? 'https://jobs-etudiants-backend.onrender.com/api/login'
      : 'https://jobs-etudiants-backend.onrender.com/api/users';

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
          localStorage.setItem('username', username);
        }
      })
      .catch(() => setMessage('Something went wrong.'));
  };

  return (
    <div className="container">
      <h2>{isLoginMode ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLoginMode ? 'Login' : 'Sign up'}</button>
        <button type="button" onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? 'Create account' : 'Back to login'}
        </button>
      </form>
      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default AuthPage;