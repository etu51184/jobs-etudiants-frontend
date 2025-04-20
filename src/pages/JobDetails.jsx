// src/pages/JobDetails.jsx

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Annonce introuvable');
        return res.json();
      })
      .then(setJob)
      .catch(err => setError(err.message));
  }, [id]);

  const handleDelete = async () => {
    if (!user) return alert('Vous devez être connecté pour supprimer.');
    if (!window.confirm('Supprimer cette annonce ?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      alert('Annonce supprimée');
      navigate('/');
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  if (error) return <div className="container"><p style={{ color: 'red' }}>{error}</p></div>;
  if (!job) return <div className="container"><p>Chargement...</p></div>;

  const isOwner = user && job.created_by === user.email;
  const isAdmin = user && user.role === 'admin';
  const canDelete = isOwner || isAdmin;

  return (
    <div className="container">
      <button onClick={() => navigate('/')} style={{ marginBottom: '1.5rem' }}>
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
