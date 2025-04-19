import { useState } from 'react';
import './AddJobForm.css';
import '../App.css';

function AddJobForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [hours, setHours] = useState('');
  const [salary, setSalary] = useState('');
  const [contractType, setContractType] = useState('Job étudiant');
  const [expiresInDays, setExpiresInDays] = useState(30);
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const clearForm = () => {
    setTitle('');
    setLocation('');
    setHours('');
    setSalary('');
    setContractType('Job étudiant');
    setExpiresInDays(30);
    setContact('');
    setDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmed = window.confirm("Êtes-vous sûr de vouloir publier cette annonce ?");
    if (!confirmed) return;

    const newJob = {
      title,
      location,
      hours,
      salary,
      contractType,
      expiresInDays,
      contact,
      description
    };

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

        <input
          type="number"
          min="1"
          max="30"
          placeholder="Durée de publication (en jours)"
          value={expiresInDays}
          onChange={(e) => setExpiresInDays(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Moyen de contact (email, téléphone, sur place...)"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <textarea placeholder="Description du poste" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <button type="submit">Ajouter l’annonce</button>

        {message && <p className="auth-message">{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>

      {/* LIVE PREVIEW */}
      {(title || location || hours || salary || description || contact) && (
        <div className="job-card">
          <h2>{title || 'Titre du job'}</h2>
          <p><strong>Lieu :</strong> {location || 'Non spécifié'}</p>
          <p><strong>Heures :</strong> {hours || 'Non spécifié'}</p>
          <p><strong>Rémunération :</strong> {salary || 'Non spécifié'}</p>
          <p><strong>Type :</strong> {contractType}</p>
          <p><strong>Contact :</strong> {contact || 'Non spécifié'}</p>
          <p><strong>Expire dans :</strong> {expiresInDays} jours</p>
          <p>{description || 'Description du poste...'}</p>
        </div>
      )}
    </>
  );
}

export default AddJobForm;
