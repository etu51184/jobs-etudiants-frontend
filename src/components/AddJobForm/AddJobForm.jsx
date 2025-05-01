// src/components/AddJobForm.jsx

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

  // États standards
  const [contractType, setContractType] = useState('studentJob');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [days, setDays] = useState([]);
  const [schedule, setSchedule] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fullTime, setFullTime] = useState(false);
  const [expiresInDays, setExpiresInDays] = useState(30);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Champs personnalisés dynamiques
  const [customFields, setCustomFields] = useState([]);

  // Affichage des champs facultatifs
  const [showOptional, setShowOptional] = useState(false);

  const addCustomField = () => {
    setCustomFields(prev => [...prev, { label: '', value: '' }]);
  };

  const updateCustomField = (index, key, val) => {
    setCustomFields(prev =>
      prev.map((field, i) =>
        i === index ? { ...field, [key]: val } : field
      )
    );
  };

  const removeCustomField = (index) => {
    setCustomFields(prev => prev.filter((_, i) => i !== index));
  };

  const clearForm = () => {
    setTitle(''); setLocation(''); setContact(''); setDescription('');
    setSalary(''); setDays([]); setSchedule(''); setDuration('');
    setStartDate(''); setEndDate(''); setFullTime(false);
    setExpiresInDays(30); setCustomFields([]);
    setMessage(''); setError(''); setShowOptional(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { setError(t('mustLogin')); return; }
    if (!window.confirm(t('confirmPost'))) return;

    const filteredCustom = customFields.filter(f => f.label.trim() && f.value.trim());
    const newJob = {
      title,
      description,
      contract_type: contractType,
      location,
      contact,
      expires_in_days: expiresInDays,
      custom_fields: filteredCustom,
      schedule: showOptional ? schedule : undefined,
      days: showOptional ? days : undefined,
      salary: showOptional ? salary : undefined,
      duration: showOptional ? duration : undefined,
      start_date: showOptional ? startDate : undefined,
      end_date: showOptional ? endDate : undefined,
      full_time: showOptional ? fullTime : undefined,
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

      if (res.status === 401) { setError(t('mustLogin')); return; }
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || t('postError'));
      }

      const data = await res.json();
      onAdd?.(data); setMessage(t('jobPosted')); clearForm();
    } catch (err) {
      console.error('Erreur création annonce :', err);
      setError(err.message || t('postError'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <h2>{t('postJob')}</h2>

      {/* Champs obligatoires */}
      <section className="required-fields">
        <h3>{t('requiredFields')}</h3>
        <ContractSelector contractType={contractType} setContractType={setContractType} />
        <input
          type="text"
          placeholder={t('jobTitle')}
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder={t('location')}
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder={t('contact')}
          value={contact}
          onChange={e => setContact(e.target.value)}
          required
        />
        <textarea
          placeholder={t('description')}
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          min="1" max="30"
          placeholder={t('expiresInDays')}
          value={expiresInDays}
          onChange={e => setExpiresInDays(Number(e.target.value))}
          required
        />
      </section>

      {/* Toggle section des champs facultatifs */}
      <button
        type="button"
        className="toggle-optional-btn"
        onClick={() => setShowOptional(o => !o)}
      >
        {showOptional ? t('hideOptional') : t('showOptional')}
      </button>

      {showOptional && (
        <section className="optional-fields">
          <h3>{t('optionalFields')}</h3>
          {contractType === 'studentJob' && (
            <StudentJobFields days={days} setDays={setDays}
                              schedule={schedule} setSchedule={setSchedule}
                              salary={salary} setSalary={setSalary} />
          )}
          {contractType === 'internship' && (
            <StageFields duration={duration} setDuration={setDuration}
                         schedule={schedule} setSchedule={setSchedule} />
          )}
          {contractType === 'contract' && (
            <CddFields startDate={startDate} setStartDate={setStartDate}
                       endDate={endDate} setEndDate={setEndDate}
                       fullTime={fullTime} setFullTime={setFullTime} />
          )}
          {contractType === 'volunteer' && (
            <VolunteerFields schedule={schedule} setSchedule={setSchedule} />
          )}

          {/* Champs personnalisés */}
          <div className="custom-fields">
            <h4>{t('customFields')}</h4>
            {customFields.map((f, i) => (
              <div key={i} className="field-row">
                <input
                  type="text"
                  placeholder={t('fieldLabel')}
                  value={f.label}
                  onChange={e => updateCustomField(i, 'label', e.target.value)}
                />
                <input
                  type="text"
                  placeholder={t('fieldValue')}
                  value={f.value}
                  onChange={e => updateCustomField(i, 'value', e.target.value)}
                />
                <button type="button" onClick={() => removeCustomField(i)}>×</button>
              </div>
            ))}
            <button type="button" className="btn-add-field" onClick={addCustomField}>
              + {t('addField')}
            </button>
          </div>
        </section>
      )}

      <button type="submit" className="submit-btn">{t('submitJob')}</button>
      {message && <p className="auth-message">{message}</p>}
      {error && <p className="error" style={{ marginTop: '1rem' }}>{error}</p>}

      {/* Aperçu live */}
      <JobPreview
        title={title}
        location={location}
        contract_type={contractType}
        contact={contact}
        description={description}
        salary={salary}
        days={days}
        schedule={schedule}
        duration={duration}
        startDate={startDate}
        endDate={endDate}
        fullTime={fullTime}
        custom_fields={customFields}
      />
    </form>
  );
}
