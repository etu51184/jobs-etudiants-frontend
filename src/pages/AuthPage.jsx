// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import '../App.css';

/** 
 * AuthPage : gère connexion et inscription 
 */
export default function AuthPage() {
  const { login } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLoginMode ? 'login' : 'register';
    const url = `${import.meta.env.VITE_API_URL}/api/users/${endpoint}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || t('serverError'));
        return;
      }

      if (isLoginMode) {
        // data = { token, email, role }
        login({ token: data.token, email: data.email, role: data.role });
        navigate('/');
      } else {
        // inscription réussie : passer en mode login
        setMessage(t('jobPosted') /* ou un message dédié */);
        setIsLoginMode(true);
      }
    } catch {
      setMessage(t('errorOccurred'));
    }
  };

  return (
    <div className="container">
      <h2>{isLoginMode ? t('login') : t('createAccount')}</h2>
      <form
        onSubmit={handleAuth}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}
      >
        <input
          type="email"
          placeholder={t('emailPlaceholder')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('passwordPlaceholder')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLoginMode ? t('login') : t('signUp')}</button>
      </form>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button
          type="button"
          onClick={() => { setIsLoginMode(!isLoginMode); setMessage(''); }}
          style={{ background: 'none', border: 'none', color: '#00cc66', cursor: 'pointer' }}
        >
          {isLoginMode ? t('createAccount') : t('backToLogin')}
        </button>
      </div>
      {message && <p className="auth-message" style={{ textAlign: 'center', marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}
