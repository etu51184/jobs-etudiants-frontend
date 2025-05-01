import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import '../App.css';
import './Profile.css';

export default function Profile() {
  const { t } = useLang();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingFavs, setLoadingFavs] = useState(false);
  const [error, setError] = useState('');

  // Redirection si non connecté
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Charger mes annonces
  useEffect(() => {
    if (!user) return;
    setLoadingJobs(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) throw new Error(t('mustLogin'));
        if (!res.ok) return res.json().then(e => Promise.reject(e.error));
        return res.json();
      })
      .then(setJobs)
      .catch(err => setError(err.message || t('errorLoadingJobs')))
      .finally(() => setLoadingJobs(false));
  }, [user, token, t, navigate]);

  // Charger mes favoris
  useEffect(() => {
    if (!user) return;
    setLoadingFavs(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/favorites`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) throw new Error(t('mustLogin'));
        if (!res.ok) return res.json().then(e => Promise.reject(e.error));
        return res.json();
      })
      .then(setFavorites)
      .catch(err => setError(err.message || t('errorOccurred')))
      .finally(() => setLoadingFavs(false));
  }, [user, token, t, navigate]);

  // Supprimer une annonce
  const handleDelete = id => {
    if (!window.confirm(t('confirmDelete'))) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) throw new Error(t('mustLogin'));
        if (!res.ok) return res.json().then(e => Promise.reject(e.error));
        setJobs(js => js.filter(j => j.id !== id));
      })
      .catch(err => setError(err.message || t('deleteError')));
  };

  return (
    <div className="container">
      <h2>{t('profile')}</h2>

      {/* Historique des annonces */}
      <section>
        <h3>{t('history')}</h3>
        {loadingJobs ? (
          <p>{t('loading')}</p>
        ) : jobs.length === 0 ? (
          <p>{t('noJobs')}</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>{t('jobTitle')}</th>
                <th>{t('type')}</th>
                <th>{t('location')}</th>
                <th>{t('postedAt')}</th>
                <th>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{t(job.contract_type)}</td>
                  <td>{job.location}</td>
                  <td>
                    {job.posted_at
                      ? new Date(job.posted_at).toLocaleDateString('fr-FR')
                      : '--'}
                  </td>
                  <td>
                    <button onClick={() => navigate(`/job/${job.id}`)}>
                      {t('view')}
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="btn-delete"
                    >
                      {t('delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Favoris */}
      <section style={{ marginTop: '2rem' }}>
        <h3>{t('favorites')}</h3>
        {loadingFavs ? (
          <p>{t('loading')}</p>
        ) : favorites.length === 0 ? (
          <p>{t('noFavorites')}</p>
        ) : (
          <ul className="fav-list">
            {favorites.map(job => (
              <li key={job.job_id}>
                <a href={`/job/${job.job_id}`}>
                  {job.title} ({job.location})
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {error && <p className="error" style={{ marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}
