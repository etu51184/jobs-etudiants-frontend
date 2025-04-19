// src/pages/JobDetails.jsx
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

  const goBack = () => {
    navigate('/');
  };

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
        <p><strong>Heures :</strong> {job.hours}</p>
        <p><strong>Rémunération :</strong> {job.salary}</p>
        <p><strong>Type de contrat :</strong> {job.contractType}</p>
        <p><strong>Contact :</strong> {job.contact}</p>
        <p><strong>Expire dans :</strong> {job.expiresInDays} jours</p>
        <p style={{ marginTop: '1rem' }}>{job.description}</p>
      </div>
    </div>
  );
}

export default JobDetails;
