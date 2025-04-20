// src/pages/AdminUsersPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import '../App.css';

export default function AdminUsersPage() {
  const { user, token } = useAuth();       // ← on récupère le token et le user
  const { t } = useLang();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      setError(t('mustLogin'));
      return;
    }

    axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsers(res.data))
    .catch(err => {
      console.error('Erreur chargement utilisateurs :', err);
      if (err.response?.status === 403) {
        setError(t('serverError'));  // ou un message plus explicite
      } else {
        setError(t('errorLoadingUsers'));
      }
    });
  }, [user, token, t]);

  const handleDelete = (id) => {
    if (!window.confirm(t('confirmDeleteUser'))) return;

    axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setUsers(prev => prev.filter(u => u.id !== id)))
    .catch(err => {
      console.error('Erreur suppression :', err);
      alert(t('errorDeletingUser'));
    });
  };

  if (error) {
    return (
      <div className="container">
        <h2>{t('userList')}</h2>
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-page container">
      <h2>{t('userList')}</h2>
      <ul>
        {users.map(u => (
          <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
            <span>{u.email} ({u.role})</span>
            <button onClick={() => handleDelete(u.id)}>
              🗑 {t('removeUser')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
