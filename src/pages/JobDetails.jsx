import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../App.css';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Annonce introuvable');
        return res.json();
      })
      .then(data => setJob(data))
      .catch(err => setError(err.message));
  }, [id]);

  const handleDelete = () => {
    const confirm = window.confirm('Supprimer cette annonce ?');
    if (!confirm) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    })
      .then(res => res.json())
      .then(() => {
        alert('Annonce supprimée');
        navigate('/');
      })
      .catch(() => {
        alert('Erreur lors de la suppression');
      });
  };

  const goBack = () => navigate('/');
  if (error) return <div className="container"><p style={{ color: 'red' }}>{error}</p></div>;
  if (!job) return <div className="container"><p>Chargement...</p></div>;

  const canDelete = username === job.created_by || username === 'Florian';

  return (
    <div className="container">
      <button onClick={goBack} style={{ marginBottom: '1.5rem' }}>
        ← Retour à la liste
      </button>

      {canDelete && (
        <button onClick={handleDelete} style={{
          backgroundColor: 'red', color: 'white', padding: '0.5rem 1rem',
          border: 'none', borderRadius: '5px', marginBottom: '1rem'
        }}>
          🗑️ Supprimer
        </button>
      )}

      <div className="job-card">
        <h2>{job.title}</h2>
        <p><strong>Lieu :</strong> {job.location}</p>
        <p><strong>Type :</strong> {job.contract_type}</p>
        {job.schedule && <p><strong>Horaires :</strong> {job.schedule}</p>}
        {job.days?.length > 0 && <p><strong>Jours :</strong> {job.days.join(', ')}</p>}
        {job.salary && <p><strong>Rémunération :</strong> {job.salary}</p>}
        {job.duration && <p><strong>Durée :</strong> {job.duration}</p>}
        {job.start_date && <p><strong>Début :</strong> {job.start_date}</p>}
        {job.end_date && <p><strong>Fin :</strong> {job.end_date}</p>}
        {job.full_time !== null && job.contract_type === 'CDD' && (
          <p><strong>Temps plein :</strong> {job.full_time ? 'Oui' : 'Non'}</p>
        )}
        <p><strong>Contact :</strong> {job.contact}</p>
        <p style={{ marginTop: '1rem' }}>{job.description}</p>
      </div>
    </div>
  );
}

export default JobDetails;
