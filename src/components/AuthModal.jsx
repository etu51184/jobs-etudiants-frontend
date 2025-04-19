import { useState } from 'react';
import './AuthModal.css';

function AuthModal({ onClose }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
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
          setMessage(data.message || (isLoginMode ? 'Login successful' : 'Account created'));
          setTimeout(() => {
            onClose(); // Ferme la popup
          }, 1000);
        }
      })
      .catch(err => {
        console.error('Auth error:', err);
        setMessage('Something went wrong.');
      });
  };

  return (
    <div className="auth-modal-backdrop">
      <div className="auth-modal">
        <h2>{isLoginMode ? 'Login' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit}>
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
        </form>
        {message && <p className="message">{message}</p>}
        <div className="auth-modal-footer">
          <button onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? 'Create an account' : 'Already have an account? Login'}
          </button>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
