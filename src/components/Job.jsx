// src/components/Job.jsx

import React, { forwardRef, useState, useEffect } from 'react';
import './Job.css';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Job card component that shows job details, allows users to favorite jobs,
 * and—for admins—a delete button to remove any job directly from the list.
 * Supports forwarding ref for infinite scroll observer.
 */
const Job = forwardRef(({ data, onDelete }, ref) => {
  const navigate = useNavigate();
  const { t } = useLang();
  const { user, token } = useAuth();
  const [isFav, setIsFav] = useState(false);

  // Navigate to job detail
  const handleClick = () => {
    navigate(`/job/${data.id}`);
  };

  // Admin delete
  const handleAdminDelete = (e) => {
    e.stopPropagation();
    if (onDelete && window.confirm(t('confirmDelete'))) {
      onDelete(data.id);
    }
  };

  // Fetch favorite status for this job
  useEffect(() => {
    if (user && token) {
      fetch(`${import.meta.env.VITE_API_URL}/api/favorites/${data.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error('Not authorized');
          return res.json();
        })
        .then(({ isFavorite }) => {
          setIsFav(Boolean(isFavorite));
        })
        .catch(() => {
          setIsFav(false);
        });
    }
  }, [user, token, data.id]);

  // Toggle favorite
  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!user || !token) {
      alert(t('mustLogin'));
      return;
    }
    const method = isFav ? 'DELETE' : 'POST';
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favorites/${data.id}`,
        {
          method,
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (res.ok) {
        setIsFav(prev => !prev);
      } else if (res.status === 401) {
        alert(t('mustLogin'));
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  return (
    <div
      ref={ref}
      className="job-card"
      onClick={handleClick}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {/* Favorite toggle */}
      {user && (
        <button
          onClick={toggleFavorite}
          style={{
            position: 'absolute',
            top: '0.5rem',
            left: '0.5rem',
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            color: isFav ? '#FFD700' : '#ccc'
          }}
          title={isFav ? t('removeFavorite') : t('addFavorite')}
        >
          {isFav ? '★' : '☆'}
        </button>
      )}

      {/* Admin delete button */}
      {user?.role === 'admin' && onDelete && (
        <button
          onClick={handleAdminDelete}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            background: 'none',
            border: 'none',
            color: '#ff4d4f',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
          title={t('delete')}
        >
          🗑
        </button>
      )}

      <h2>{data.title}</h2>
      <p><strong>{t('location')}:</strong> {data.location}</p>
      <p className="job-type"><strong>{t('type')}:</strong> {t(data.contract_type)}</p>

      {data.contract_type === 'studentJob' && (
        <>
          {data.schedule && <p><strong>{t('schedule')}:</strong> {data.schedule}</p>}
          {data.days?.length > 0 && (
            <p><strong>{t('days')}:</strong> {data.days.map(day => t(day)).join(', ')}</p>
          )}
          {data.salary && <p><strong>{t('salary')}:</strong> {data.salary}</p>}
        </>
      )}

      {data.contract_type === 'internship' && (
        <>
          {data.duration && <p><strong>{t('duration')}:</strong> {data.duration}</p>}
          {data.schedule && <p><strong>{t('schedule')}:</strong> {data.schedule}</p>}
          {data.contact && <p><strong>{t('contact')}:</strong> {data.contact}</p>}
        </>
      )}

      {data.contract_type === 'contract' && (
        <>
          {data.start_date && <p><strong>{t('startDate')}:</strong> {data.start_date}</p>}
          {data.end_date && <p><strong>{t('endDate')}:</strong> {data.end_date}</p>}
          <p><strong>{t('fullTime')}:</strong> {data.full_time ? t('yes') : t('no')}</p>}
        </>
      )}

      {data.contract_type === 'volunteer' && (
        <>
          {data.contact && <p><strong>{t('contact')}:</strong> {data.contact}</p>}
          {data.schedule && <p><strong>{t('schedule')}:</strong> {data.schedule}</p>}
        </>
      )}
    </div>
  );
});

export default Job;
