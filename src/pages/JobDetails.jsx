// src/pages/JobDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import './JobDetails.css';
import '../App.css';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { t } = useLang();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`)
      .then(res => res.ok ? res.json() : Promise.reject(t('errorJobNotFound')))
      .then(setJob)
      .catch(err => setError(err));
  }, [id, t]);

  useEffect(() => {
    if (!user || !token) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/favorites/${id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setIsFav(Boolean(data.isFavorite)))
      .catch(() => setIsFav(false));
  }, [id, user, token]);

  const handleToggleFav = async () => {
    if (!user || !token) return alert(t('mustLogin'));
    const method = isFav ? 'DELETE' : 'POST';
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/favorites/${id}`, {
        method,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setIsFav(f => !f);
      else if (res.status === 401) alert(t('mustLogin'));
    } catch {
      alert(t('errorOccurred'));
    }
  };

  const handleDelete = async () => {
    if (!user) return alert(t('mustLogin'));
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      alert(t('deleteSuccess'));
      navigate('/');
    } catch {
      alert(t('deleteError'));
    }
  };

  if (error) return <div className="container"><p style={{ color: 'red' }}>{error}</p></div>;
  if (!job) return <div className="container"><p>{t('loading')}</p></div>;

  const isOwner = user && job.created_by === user.email;
  const isAdmin = user && user.role === 'admin';
  const canDelete = isOwner || isAdmin;

  const daysArray = Array.isArray(job.days) ? job.days : [];
  const cfArray   = Array.isArray(job.custom_fields) ? job.custom_fields : [];

  return (
    <div className="container job-details-page">
      <div className="details-header">
        <div className="header-left">
          <button onClick={() => navigate('/')} className="back-button">
            {t('backToList')}
          </button>
          {user && (
            <button onClick={handleToggleFav} className={`fav-btn ${isFav ? 'fav-on' : ''}`}>
              {isFav ? t('removeFavorite') : t('addFavorite')}
            </button>
          )}
        </div>
        {canDelete && (
          <button onClick={handleDelete} className="delete-button">
            {t('delete')}
          </button>
        )}
      </div>

      <div className="job-card">
        <h2>{job.title}</h2>

        <div className="meta-details-wrapper">
          <div className="meta-column">
            <p><strong>{t('type')}:</strong> {t(job.contract_type)}</p>
            <p><strong>{t('location')}:</strong> {job.location}</p>
            <p><strong>{t('contact')}:</strong> {job.contact}</p>
          </div>

          <div className="details-column">
            {job.schedule && <p><strong>{t('schedule')}:</strong> {job.schedule}</p>}
            {daysArray.length > 0 && <p><strong>{t('days')}:</strong> {daysArray.map(d => t(d)).join(', ')}</p>}
            {job.salary && <p><strong>{t('salary')}:</strong> {job.salary}</p>}
            {job.duration && <p><strong>{t('duration')}:</strong> {job.duration}</p>}
            {job.start_date && <p><strong>{t('startDate')}:</strong> {job.start_date}</p>}
            {job.end_date && <p><strong>{t('endDate')}:</strong> {job.end_date}</p>}
            {job.full_time !== undefined && job.contract_type === 'contract' && (
              <p><strong>{t('fullTime')}:</strong> {job.full_time ? t('yes') : t('no')}</p>
            )}
            {cfArray.map((f, i) => (
              <p key={i}><strong>{f.label}:</strong> {f.value}</p>
            ))}
          </div>
        </div>

        {job.description && (
          <div className="description">
            <h3>{t('description')}</h3>
            <p>{job.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
