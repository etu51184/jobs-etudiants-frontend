// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Job from '../components/Job.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import '../App.css';

export default function Profile() {
  const { t } = useLang();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Rediriger si non connecté
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Récupérer mes annonces
  useEffect(() => {
    if (!user) return;
    const fetchMyJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jobs/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || t('errorLoadingJobs'));
        }
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, [user, token, t]);

  // Supprimer une de mes annonces
  const handleDelete = async (id) => {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || t('deleteError'));
      }
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>{t('profile')} – {user?.username}</h2>

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
