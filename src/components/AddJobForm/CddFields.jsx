import React from 'react';
import { useLang } from '../../contexts/LanguageContext.jsx';

function CddFields({ startDate, setStartDate, endDate, setEndDate, fullTime, setFullTime }) {
  const { t } = useLang();

  return (
    <div className="cdd-fields">
      <div className="date-fields">
        <label>{t('startDate')}:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="date-fields">
        <label>{t('endDate')}:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          checked={fullTime}
          onChange={() => setFullTime(!fullTime)}
        />
        {t('fullTime')}
      </label>
    </div>
  );
}

export default CddFields;
