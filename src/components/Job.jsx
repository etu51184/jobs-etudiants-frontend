// src/components/Job.jsx

import React, { forwardRef, useState, useEffect } from 'react';
import './Job.css';
import { useNavigate } from 'react-router-dom';
import { useLang }     from '../contexts/LanguageContext.jsx';
import { useAuth }     from '../contexts/AuthContext.jsx';

/**
 * Job card component: affiche uniquement les champs obligatoires,
 * avec possibilité d'afficher/masquer les détails optionnels.
 */
const Job = forwardRef(({ data, onDelete }, ref) => {
  const navigate = useNavigate();
  const { t }    = useLang();
  const { user, token } = useAuth();

  const [isFav, setIsFav] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Récupération du statut favori
  useEffect(() => {
    if (!user || !token) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/favorites/${data.id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(({ isFavorite }) => setIsFav(Boolean(isFavorite)))
      .catch(() => setIsFav(false));
  }, [user, token, data.id]);

  // Basculer favori
  const toggleFavorite = e => {
    e.stopPropagation();
    if (!user || !token) {
      alert(t('mustLogin'));
      return;
    }
    const method = isFav ? 'DELETE' : 'POST';
    fetch(
      `${import.meta.env.VITE_API_URL}/api/favorites/${data.id}`,
      { method, headers: { 'Authorization': `Bearer ${token}` } }
    ).then(res => {
      if (res.ok) setIsFav(f => !f);
      else if (res.status === 401) alert(t('mustLogin'));
    });
  };

  // Supprimer (admin)
  const handleAdminDelete = e => {
    e.stopPropagation();
    if (onDelete && window.confirm(t('confirmDelete'))) onDelete(data.id);
  };

  const handleToggleDetails = e => {
    e.stopPropagation();
    setShowDetails(show => !show);
  };

  return (
    <div
      ref={ref}
      className="job-card"
      onClick={() => navigate(`/job/${data.id}`)}
      style={{ position: 'relative', cursor: 'pointer' }}
    >
      {/* Favori */}
      {user && (
        <button
          onClick={toggleFavorite}
          className={`fav-btn ${isFav ? 'fav-on' : ''}`}
          title={isFav ? t('removeFavorite') : t('addFavorite')}
        >★</button>
      )}

      {/* Suppression admin */}
      {user?.role === 'admin' && onDelete && (
        <button
          onClick={handleAdminDelete}
          className="del-btn"
          title={t('delete')}
        >🗑</button>
      )}

      {/* Obligatoire */}
      <h2 className="job-title">{data.title}</h2>
      <p><strong>{t('type')}:</strong> {t(data.contract_type)}</p>
      <p><strong>{t('location')}:</strong> {data.location}</p>
      <p><strong>{t('contact')}:</strong> {data.contact}</p>

      {/* Toggle détails */}
      <button
        type="button"
        className="toggle-details-btn"
        onClick={handleToggleDetails}
      >
        {showDetails ? t('showLess') : t('showMore')}
      </button>

      {/* Détails optionnels */}
      {showDetails && (
        <div className="job-details">
          {data.schedule && <p><strong>{t('schedule')}:</strong> {data.schedule}</p>}
          {data.days?.length > 0 && (
            <p><strong>{t('days')}:</strong> {data.days.map(d => t(d)).join(', ')}</p>
          )}
          {data.salary && <p><strong>{t('salary')}:</strong> {data.salary}</p>}
          {data.duration && <p><strong>{t('duration')}:</strong> {data.duration}</p>}
          {data.start_date && <p><strong>{t('startDate')}:</strong> {data.start_date}</p>}
          {data.end_date && <p><strong>{t('endDate')}:</strong> {data.end_date}</p>}
          {data.full_time !== undefined && data.contract_type === 'contract' && (
            <p><strong>{t('fullTime')}:</strong> {data.full_time ? t('yes') : t('no')}</p>
          )}
          {data.description && <p><strong>{t('description')}:</strong> {data.description}</p>}
          {data.custom_fields?.map((f, i) => (
            <p key={i}><strong>{f.label}:</strong> {f.value}</p>
          ))}
        </div>
      )}
    </div>
  );
});

export default Job;
