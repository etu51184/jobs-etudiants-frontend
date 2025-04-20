import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import '../App.css';

const AdminUsersPage = () => {
  const { user } = useAuth();
  const { t } = useLang();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') return;
    const token = localStorage.getItem('token');

    axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error(t('errorLoadingUsers'), err));
  }, [user, t]);

  const handleDelete = (id) => {
    if (!window.confirm(t('confirmDeleteUser'))) return;
    const token = localStorage.getItem('token');

    axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setUsers(users.filter(u => u.id !== id)))
    .catch(err => console.error(t('errorDeletingUser'), err));
  };

  return (
    <div className="admin-page container">
      <h2>{t('userList')}</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
            <span>{u.email}</span>
            <button onClick={() => handleDelete(u.id)}>
              🗑 {t('removeUser')}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsersPage;
