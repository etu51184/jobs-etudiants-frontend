// src/components/AuthPanel.jsx
import { useState } from 'react';
import './AuthPanel.css';
import AddJobForm from './AddJobForm';

function AuthPanel({ onLogin, username: initialUsername, onAddJob }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState(initialUsername || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!initialUsername);
  const [showForm, setShowForm] = useState(false);

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
          setIsLoggedIn(true);
          onLogin && onLogin(username);
          setTimeout(() => setMessage(''), 1500);
        }
      })
      .catch(() => setMessage('Something went wrong.'));
  };

  return (
    <div className="auth-panel">
      <h2>{isLoggedIn ? `Welcome, ${username}` : isLoginMode ? 'Login' : 'Sign up'}</h2>

      {!isLoggedIn && (
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
      )}

      {message && <p className="auth-message">{message}</p>}

      {isLoggedIn && (
        <>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Hide job form' : 'Post a job'}
          </button>
          {showForm && <AddJobForm onAdd={(job) => {
            setShowForm(false);
            onAddJob && onAddJob(job);
          }} />}
        </>
      )}
    </div>
  );
}

export default AuthPanel;
