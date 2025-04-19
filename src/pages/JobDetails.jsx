import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://jobs-etudiants-backend.onrender.com/api/jobs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Annonce introuvable');
        return res.json();
      })
      .then(data => setJob(data))
      .catch(err => setError(err.message));
  }, [id]);

  const goBack = () => navigate('/');

  if (error) {
    return <div className="container"><p style={{ color: 'red' }}>{error}</p></div>;
  }

  if (!job) {
    return <div className="container"><p>Chargement...</p></div>;
  }

  return (
    <div className="container">
      <button
        onClick={goBack}
        style={{
          marginBottom: '1.5rem',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          padding: '0.6rem 1.2rem',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        ← Retour à la liste
      </button>

      <div className="job-card">
        <h2>{job.title}</h2>
        <p><strong>Lieu :</strong> {job.location}</p>
        <p><strong>Type :</strong> {job.contractType}</p>

        {job.contractType === 'Job étudiant' && (
          <>
            {job.schedule && <p><strong>Horaires :</strong> {job.schedule}</p>}
            {job.days?.length > 0 && <p><strong>Jours :</strong> {job.days.join(', ')}</p>}
            {job.salary && <p><strong>Rémunération :</strong> {job.salary}</p>}
          </>
        )}

        {job.contractType === 'Stage' && (
          <>
            {job.duration && <p><strong>Durée :</strong> {job.duration}</p>}
            {job.schedule && <p><strong>Horaires :</strong> {job.schedule}</p>}
            {job.contact && <p><strong>Contact :</strong> {job.contact}</p>}
          </>
        )}

        {job.contractType === 'CDD' && (
          <>
            {job.startDate && <p><strong>Début :</strong> {job.startDate}</p>}
            {job.endDate && <p><strong>Fin :</strong> {job.endDate}</p>}
            <p><strong>Temps plein :</strong> {job.fullTime ? 'Oui' : 'Non'}</p>
          </>
        )}

        {job.contractType === 'Bénévolat' && (
          <>
            {job.contact && <p><strong>Contact :</strong> {job.contact}</p>}
            {job.schedule && <p><strong>Disponibilités :</strong> {job.schedule}</p>}
          </>
        )}

        <p style={{ marginTop: '1rem' }}>{job.description}</p>
      </div>
    </div>
  );
}

export default JobDetails;
