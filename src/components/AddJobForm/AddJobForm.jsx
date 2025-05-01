import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLang } from '../../contexts/LanguageContext.jsx';
import ContractSelector from './ContractSelector.jsx';
import StudentJobFields from './StudentJobFields.jsx';
import StageFields from './StageFields.jsx';
import CddFields from './CddFields.jsx';
import VolunteerFields from './VolunteerFields.jsx';
import JobPreview from './JobPreview.jsx';
import './AddJobForm.css';

export default function AddJobForm({ onAdd }) {
  const { user, token } = useAuth();
  const { t } = useLang();

  const [contractType, setContractType] = useState('studentJob');
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
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError(t('mustLogin'));
      return;
    }
    if (!window.confirm(t('confirmPost'))) return;

    const newJob = {
      title,
      description,
      contract_type: contractType,
      location,
      schedule,
      days,
      salary,
      contact,
      duration,
      start_date: startDate,
      end_date: endDate,
      full_time: fullTime,
      expires_in_days: expiresInDays,
      email: user.email
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newJob)
      });

      if (res.status === 401) {
        // non autorisé, redirection vers login
        setError(t('mustLogin'));
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || t('postError'));
      }

      const data = await res.json();
      onAdd?.(data);
      setMessage(t('jobPosted'));
      clearForm();
    } catch (err) {
      console.error('Erreur création annonce :', err);
      setError(err.message || t('postError'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <h2>{t('postJob')}</h2>

      <ContractSelector contractType={contractType} setContractType={setContractType} />

      <input
        type="text"
        placeholder={t('jobTitle')}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder={t('location')}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <textarea
        placeholder={t('description')}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder={t('contact')}
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />

      {contractType === 'studentJob' && (
        <StudentJobFields
          days={days} setDays={setDays}
          schedule={schedule} setSchedule={setSchedule}
          salary={salary} setSalary={setSalary}
        />
      )}
      {contractType === 'internship' && (
        <StageFields
          duration={duration} setDuration={setDuration}
          schedule={schedule} setSchedule={setSchedule}
        />
      )}
      {contractType === 'contract' && (
        <CddFields
          startDate={startDate} setStartDate={setStartDate}
          endDate={endDate} setEndDate={setEndDate}
          fullTime={fullTime} setFullTime={setFullTime}
        />
      )}
      {contractType === 'volunteer' && (
        <VolunteerFields schedule={schedule} setSchedule={setSchedule} />
      )}

      <input
        type="number"
        min="1"
        max="30"
        placeholder={t('expiresInDays')}
        value={expiresInDays}
        onChange={(e) => setExpiresInDays(Number(e.target.value))}
        required
      />

      <button type="submit">{t('submitJob')}</button>
      {message && <p className="auth-message">{message}</p>}
      {error && <p className="error" style={{ marginTop: '1rem' }}>{error}</p>}

      {/* Aperçu de l'annonce en direct */}
      <JobPreview
        title={title}
        location={location}
        contract_type={contractType}
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
    </form>
  );
}