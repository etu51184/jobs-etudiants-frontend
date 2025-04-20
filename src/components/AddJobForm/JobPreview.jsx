// src/components/AddJobForm/JobPreview.jsx
function JobPreview({
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
  return (
    <div className="job-card">
      <h2>{title}</h2>
      <p><strong>{t('location')}:</strong> {location}</p>
      <p><strong>{t('type')}:</strong> {contract_type}</p>
      {salary && <p><strong>Rémunération :</strong> {salary}</p>}
      {schedule && <p><strong>Horaires :</strong> {schedule}</p>}
      {days?.length > 0 && <p><strong>Jours :</strong> {days.join(', ')}</p>}
      {duration && <p><strong>Durée :</strong> {duration}</p>}
      {startDate && <p><strong>Début :</strong> {startDate}</p>}
      {endDate && <p><strong>Fin :</strong> {endDate}</p>}
      {contractType === 'CDD' && typeof fullTime === 'boolean' && (
        <p><strong>Temps plein :</strong> {fullTime ? 'Oui' : 'Non'}</p>
        )}
      {contact && <p><strong>Contact :</strong> {contact}</p>}
      <p>{description}</p>
    </div>
  );
}

export default JobPreview;
