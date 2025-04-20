// src/components/AddJobForm/StageFields.jsx
import { useLang } from '../../contexts/LanguageContext.jsx';
function StageFields({ duration, setDuration, schedule, setSchedule }) {
    const { t } = useLang();


  return (
    <>
      <input
        type="text"
        placeholder={t('durationPlaceholder')}
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        type="text"
        placeholder={t('schedulePlaceholder')}
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />
    </>
  );
}

export default StageFields;
