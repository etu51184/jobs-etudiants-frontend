// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import Job from '../components/Job.jsx';
import '../App.css';

export default function Profile() {
  const { t } = useLang();
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/users/me/jobs`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error(t('errorLoadingJobs'));
        return res.json();
      })
      .then(setJobs)
      .catch(err => setError(err.message));
  }, [user, token, t]);

  const handleDelete = async (id) => {
    if (!window.confirm(t('confirmDelete'))) return;
    await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email: user.email })
    });
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  if (!user) {
    return <p className="container">{t('mustLogin')}</p>;
  }

  return (
    <div className="container">
      <h2>{t('home')} – {user.email}</h2>
      {error && <p className="error">{error}</p>}
      {jobs.length === 0
        ? <p>{t('noJobs')}</p>
        : jobs.map(job => (
            <Job
              key={job.id}
              data={job}
              onDelete={() => handleDelete(job.id)}
            />
          ))
      }
    </div>
  );
}
