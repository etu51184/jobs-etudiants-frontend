import React from 'react';
import { useLang } from '../../contexts/LanguageContext.jsx';
import '../Job.css'; // reprend le style des cartes d'annonce

export default function JobPreview({
  title,
  location,
  contract_type,
  salary,
  contact,
  description,
  days,
  schedule,
  duration,
  startDate,
  endDate,
  fullTime
}) {
  const { t } = useLang();

  return (
    <div className="job-card">
      {title && <h2>{title}</h2>}
      {location && (
        <p><strong>{t('location')}:</strong> {location}</p>
      )}
      <p><strong>{t('type')}:</strong> {t(contract_type)}</p>

      {salary && (
        <p><strong>{t('salary')}:</strong> {salary}</p>
      )}
      {schedule && (
        <p><strong>{t('schedule')}:</strong> {schedule}</p>
      )}
      {days?.length > 0 && (
        <p><strong>{t('days')}:</strong> {days.map(d => t(d)).join(', ')}</p>
      )}
      {duration && (
        <p><strong>{t('duration')}:</strong> {duration}</p>
      )}
      {startDate && (
        <p><strong>{t('startDate')}:</strong> {startDate}</p>
      )}
      {endDate && (
        <p><strong>{t('endDate')}:</strong> {endDate}</p>
      )}
      {contract_type === 'contract' && typeof fullTime === 'boolean' && (
        <p><strong>{t('fullTime')}:</strong> {fullTime ? t('yes') : t('no')}</p>
      )}
      {contact && (
        <p><strong>{t('contact')}:</strong> {contact}</p>
      )}
      {description && (
        <p style={{ marginTop: '1rem' }}>{description}</p>
      )}
    </div>
  );
}