import React from 'react';
import { useLang } from '../../contexts/LanguageContext.jsx';

function StudentJobFields({ days, setDays, schedule, setSchedule, salary, setSalary }) {
  const { t } = useLang();

  const toggleDay = (day) => {
    setDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  // Liste des jours utilisable pour mapping, clés en anglais correspondant au backend/storage
  const weekDays = [
    { key: 'monday', label: t('monday') },
    { key: 'tuesday', label: t('tuesday') },
    { key: 'wednesday', label: t('wednesday') },
    { key: 'thursday', label: t('thursday') },
    { key: 'friday', label: t('friday') },
    { key: 'saturday', label: t('saturday') },
    { key: 'sunday', label: t('sunday') }
  ];

  return (
    <div className="student-job-fields">
      <div className="day-selector">
        <label>{t('weekDays')}:</label>
        <div className="days-list">
          {weekDays.map(({ key, label }) => (
            <label key={key} style={{ marginRight: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={days.includes(key)}
                onChange={() => toggleDay(key)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder={t('schedulePlaceholder')}
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />

      <input
        type="text"
        placeholder={t('salaryPlaceholder')}
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
    </div>
  );
}

export default StudentJobFields;