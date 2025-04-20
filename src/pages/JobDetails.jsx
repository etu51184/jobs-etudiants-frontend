import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import '../App.css';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLang();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(t('errorJobNotFound'));
        return res.json();
      })
      .then(setJob)
      .catch(err => setError(err.message));
  }, [id, t]);

  const handleDelete = async () => {
    if (!user) {
      alert(t('mustLogin'));
      return;
    }
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email })
        }
      );
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

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="back-button">
        ← {t('backToList')}
      </button>

      {canDelete && (
        <button onClick={handleDelete} className="delete-button">
          🗑 {t('delete')}
        </button>
      )}

      <div className="job-card">
        <h2>{job.title}</h2>
        <p><strong>{t('location')}:</strong> {job.location}</p>
        <p><strong>{t('type')}:</strong> {t(job.contract_type)}</p>
        {job.schedule && <p><strong>{t('schedule')}:</strong> {job.schedule}</p>}
        {job.days?.length > 0 && <p><strong>{t('days')}:</strong> {job.days.map(d => t(d)).join(', ')}</p>}
        {job.salary && <p><strong>{t('salary')}:</strong> {job.salary}</p>}
        {job.duration && <p><strong>{t('duration')}:</strong> {job.duration}</p>}
        {job.start_date && <p><strong>{t('startDate')}:</strong> {job.start_date}</p>}
        {job.end_date && <p><strong>{t('endDate')}:</strong> {job.end_date}</p>}
        {job.full_time !== undefined && job.contract_type === 'contract' && (
          <p><strong>{t('fullTime')}:</strong> {job.full_time ? t('yes') : t('no')}</p>
        )}
        <p><strong>{t('contact')}:</strong> {job.contact}</p>
        <p style={{ marginTop: '1rem' }}>{job.description}</p>
      </div>
    </div>
  );
}

export default JobDetails;
