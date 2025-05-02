// src/components/Job.jsx

import React, { forwardRef, useState, useEffect } from 'react';
import './Job.css';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Job card component: affiche les champs obligatoires, permet favoris,
 * toggle des détails optionnels et suppression admin.
 */
const Job = forwardRef(({ data, onDelete }, ref) => {
  const navigate = useNavigate();
  const { t } = useLang();
  const { user, token } = useAuth();

  const [isFav, setIsFav] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Garantir tableaux pour map
  const daysArray = Array.isArray(data.days) ? data.days : [];
  const customFields = Array.isArray(data.custom_fields) ? data.custom_fields : [];

  // Charger statut favori
  useEffect(() => {
    if (!user || !token) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/favorites/${data.id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(json => setIsFav(Boolean(json.isFavorite)))
      .catch(() => setIsFav(false));
  }, [data.id, user, token]);

  // Basculer favori
  const toggleFavorite = e => {
    e.stopPropagation();
    if (!user || !token) return alert(t('mustLogin'));
    const method = isFav ? 'DELETE' : 'POST';
    fetch(`${import.meta.env.VITE_API_URL}/api/favorites/${data.id}`, {
      method,
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => {
      if (res.ok) setIsFav(f => !f);
      else if (res.status === 401) alert(t('mustLogin'));
    });
  };

  // Toggle détails facultatifs
  const handleToggleDetails = e => {
    e.stopPropagation();
    setShowDetails(s => !s);
  };

  // Suppression admin
  const handleAdminDelete = e => {
    e.stopPropagation();
    if (onDelete && window.confirm(t('confirmDelete'))) onDelete(data.id);
  };

  return (
    <div
      ref={ref}
      className="job-card"
      onClick={() => navigate(`/job/${data.id}`)}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {user && (
        <button
          onClick={toggleFavorite}
          className={`fav-btn ${isFav ? 'fav-on' : ''}`}
          title={isFav ? t('removeFavorite') : t('addFavorite')}
        >
          ★
        </button>
      )}

      {user?.role === 'admin' && onDelete && (
        <button
          onClick={handleAdminDelete}
          className="del-btn"
          title={t('delete')}
        >
          🗑
        </button>
      )}

      <h2 className="job-title">{data.title}</h2>
      <p><strong>{t('type')}:</strong> {t(data.contract_type)}</p>
      <p><strong>{t('location')}:</strong> {data.location}</p>
      <p><strong>{t('contact')}:</strong> {data.contact}</p>

      <button
        type="button"
        className="toggle-details-btn"
        onClick={handleToggleDetails}
      >
        {showDetails ? t('showLess') : t('showMore')}
      </button>

      {showDetails && (
        <div className="job-details">
          {data.schedule && <p><strong>{t('schedule')}:</strong> {data.schedule}</p>}
          {daysArray.length > 0 && (
            <p><strong>{t('days')}:</strong> {daysArray.map(d => t(d)).join(', ')}</p>
          )}
          {data.salary && <p><strong>{t('salary')}:</strong> {data.salary}</p>}
          {data.duration && <p><strong>{t('duration')}:</strong> {data.duration}</p>}
          {data.start_date && <p><strong>{t('startDate')}:</strong> {data.start_date}</p>}
          {data.end_date && <p><strong>{t('endDate')}:</strong> {data.end_date}</p>}
          {data.full_time !== undefined && data.contract_type === 'contract' && (
            <p><strong>{t('fullTime')}:</strong> {data.full_time ? t('yes') : t('no')}</p>
          )}
          {data.description && <p><strong>{t('description')}:</strong> {data.description}</p>}
          {customFields.map((f, idx) => (
            <p key={idx}><strong>{f.label}:</strong> {f.value}</p>
          ))}
        </div>
      )}
    </div>
  );
});

export default Job;
