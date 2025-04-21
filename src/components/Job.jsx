import React, { forwardRef } from 'react';
import './Job.css';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

/**
 * Job card component that shows job details and, for admins,
 * a delete button to remove any job directly from the list.
 * Supports forwarding ref for infinite scroll observer.
 */
const Job = forwardRef(({ data, onDelete }, ref) => {
  const navigate = useNavigate();
  const { t } = useLang();
  const { user } = useAuth();

  const handleClick = () => {
    navigate(`/job/${data.id}`);
  };

  const handleAdminDelete = (e) => {
    e.stopPropagation();
    if (onDelete && window.confirm(t('confirmDelete'))) {
      onDelete(data.id);
    }
  };

  return (
    <div
      ref={ref}
      className="job-card"
      onClick={handleClick}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {/* Admin-only delete button on job cards */}
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
          {data.days?.length > 0 && <p><strong>{t('days')}:</strong> {data.days.map(day => t(day)).join(', ')}</p>}
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
          <p><strong>{t('fullTime')}:</strong> {data.full_time ? t('yes') : t('no')}</p>
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
