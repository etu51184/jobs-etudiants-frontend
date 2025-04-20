// src/components/AddJobForm/VolunteerFields.jsx

import { useLang } from '../../contexts/LanguageContext.jsx';
function VolunteerFields({ schedule, setSchedule }) {
    const { t } = useLang();
  return (
    <>
      <input
        type="text"
        placeholder={t('availabilityPlaceholder')}
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />
    </>
  );
}

export default VolunteerFields;
