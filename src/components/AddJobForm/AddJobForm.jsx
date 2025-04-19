// src/components/AddJobForm/AddJobForm.jsx
import { useState } from 'react';
import './AddJobForm.css';
import '../../App.css';

import ContractSelector from './ContractSelector';
import StudentJobFields from './StudentJobFields';
import StageFields from './StageFields';
import CddFields from './CddFields';
import VolunteerFields from './VolunteerFields';
import JobPreview from './JobPreview';

function AddJobForm({ onAdd }) {
  const [contractType, setContractType] = useState('Job étudiant');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [days, setDays] = useState([]);
  const [schedule, setSchedule] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fullTime, setFullTime] = useState(false);
  const [expiresInDays, setExpiresInDays] = useState(30);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const clearForm = () => {
    setTitle('');
    setLocation('');
    setSalary('');
    setDescription('');
    setContact('');
    setDays([]);
    setSchedule('');
    setDuration('');
    setStartDate('');
    setEndDate('');
    setFullTime(false);
    setExpiresInDays(30);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const confirmed = window.confirm("Êtes-vous sûr de vouloir publier cette annonce ?");
    if (!confirmed) return;

    const username = localStorage.getItem('username');

    const newJob = {
      title,
      location,
      contractType,
      salary,
      contact,
      description,
      days,
      schedule,
      duration,
      startDate,
      endDate,
      fullTime,
      expiresInDays,
      createdBy: username
    };

    fetch('https://jobs-etudiants-backend.onrender.com/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })
      .then(res => res.json())
      .then(data => {
        onAdd?.(data);
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

        <ContractSelector contractType={contractType} setContractType={setContractType} />

        <input type="text" placeholder="Titre du job" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Lieu" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="text" placeholder="Description du poste" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} required />

        {contractType === 'Job étudiant' && (
          <StudentJobFields days={days} setDays={setDays} schedule={schedule} setSchedule={setSchedule} salary={salary} setSalary={setSalary} />
        )}

        {contractType === 'Stage' && (
          <StageFields duration={duration} setDuration={setDuration} schedule={schedule} setSchedule={setSchedule} />
        )}

        {contractType === 'CDD' && (
          <CddFields startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} fullTime={fullTime} setFullTime={setFullTime} />
        )}

        {contractType === 'Bénévolat' && (
          <VolunteerFields schedule={schedule} setSchedule={setSchedule} />
        )}

        <input type="number" min="1" max="30" placeholder="Durée de publication (en jours)" value={expiresInDays} onChange={(e) => setExpiresInDays(e.target.value)} required />

        <button type="submit">Ajouter l’annonce</button>

        {message && <p className="auth-message">{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>

      {(title || location || contractType || description) && (
        <JobPreview
          title={title}
          location={location}
          contractType={contractType}
          salary={salary}
          contact={contact}
          description={description}
          days={days}
          schedule={schedule}
          duration={duration}
          startDate={startDate}
          endDate={endDate}
          fullTime={fullTime}
        />
      )}
    </>
  );
}

export default AddJobForm;
