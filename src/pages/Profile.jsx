// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import Job from '../components/Job.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import '../App.css';

/**
 * Page Profil: liste les annonces que l'utilisateur a publiées,
 * avec possibilité de suppression.
 */
export default function Profile() {
  const { t } = useLang();
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchMyJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/me/jobs`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error(t('errorLoadingJobs'));
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, [user, token, t]);

  const handleDelete = async id => {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ email: user.email })
        }
      );
      if (!res.ok) throw new Error(t('deleteError'));
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <p className="error">{t('mustLogin')}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{t('home')} - {user.email}</h2>
      {loading && <p>{t('loading')}</p>}
      {error && <p className="error">{error}</p>}
      {!loading && jobs.length === 0 && <p>{t('noJobs')}</p>}
      {jobs.map(job => (
        <Job
          key={job.id}
          data={job}
          onDelete={() => handleDelete(job.id)}
        />
      ))}
    </div>
  );
}