// src/components/AddJobForm.jsx
import { useState } from 'react';
import './AddJobForm.css';
import '../App.css'; // pour le style de job-card

function AddJobForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [hours, setHours] = useState('');
  const [salary, setSalary] = useState('');
  const [contractType, setContractType] = useState('Job étudiant');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const clearForm = () => {
    setTitle('');
    setLocation('');
    setHours('');
    setSalary('');
    setContractType('Job étudiant');
    setDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmed = window.confirm("Êtes-vous sûr de vouloir publier cette annonce ?");
    if (!confirmed) return;

    const newJob = { title, location, hours, salary, contractType, description };

    fetch('https://jobs-etudiants-backend.onrender.com/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })
      .then(res => res.json())
      .then(data => {
        onAdd(data);
        setMessage('Job publié avec succès !');
        setError('');
        clearForm();
      })
      .catch(() => {
        setError('Erreur lors de la publication du job.');
        setMessage('');
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="job-form">
        <h2>Publier une annonce</h2>

        <input type="text" placeholder="Titre du job" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Lieu" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="text" placeholder="Heures de travail" value={hours} onChange={(e) => setHours(e.target.value)} required />
        <input type="text" placeholder="Rémunération (ex: 12€/h)" value={salary} onChange={(e) => setSalary(e.target.value)} required />
        
        <select value={contractType} onChange={(e) => setContractType(e.target.value)} required>
          <option value="Job étudiant">Job étudiant</option>
          <option value="Stage">Stage</option>
          <option value="CDD">CDD</option>
          <option value="Bénévolat">Bénévolat</option>
        </select>

        <textarea placeholder="Description du poste" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <button type="submit">Ajouter l’annonce</button>

        {message && <p className="auth-message">{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>

      {/* LIVE PREVIEW */}
      {(title || location || hours || salary || description) && (
        <div className="job-card">
          <h2>{title || 'Titre du job'}</h2>
          <p><strong>Lieu :</strong> {location || 'Non spécifié'}</p>
          <p><strong>Heures :</strong> {hours || 'Non spécifié'}</p>
          <p><strong>Rémunération :</strong> {salary || 'Non spécifié'}</p>
          <p><strong>Type :</strong> {contractType}</p>
          <p>{description || 'Description du poste...'}</p>
        </div>
      )}
    </>
  );
}

export default AddJobForm;
