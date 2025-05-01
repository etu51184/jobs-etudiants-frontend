// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import './Profile.css';

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
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
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

  // Supprimer une annonce
  const handleDelete = async (id) => {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
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
      <h2>{t('profile')}</h2>

      <h3>Historique de mes annonces</h3>

      {loading && <p>{t('loading')}</p>}
      {error && <p className="error">{error}</p>}

      {!loading && jobs.length === 0 && <p>Aucune annonce publiée.</p>}

      {!loading && jobs.length > 0 && (
        <table className="history-table">
          <thead>
            <tr>
              <th>{t('jobTitle')}</th>
              <th>{t('type')}</th>
              <th>{t('location')}</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{t(job.contract_type)}</td>
                <td>{job.location}</td>
                <td>
                  {job.created_at
                    ? new Date(job.created_at).toLocaleDateString('fr-FR', {
                        year: 'numeric', month: '2-digit', day: '2-digit'
                      })
                    : '--'}
                </td>
                <td>
                  <button onClick={() => navigate(`/job/${job.id}`)}>Voir</button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    style={{ marginLeft: '0.5rem', color: '#ff4d4f' }}
                  >
                    {t('delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}