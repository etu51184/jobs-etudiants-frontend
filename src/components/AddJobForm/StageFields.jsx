// src/components/AddJobForm/StageFields.jsx
function StageFields({ duration, setDuration, schedule, setSchedule, contact, setContact }) {
  return (
    <>
      <input
        type="text"
        placeholder="Durée du stage (ex: 2 mois)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        type="text"
        placeholder="Horaire (ex: 9h-17h)"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
    </>
  );
}

export default StageFields;
