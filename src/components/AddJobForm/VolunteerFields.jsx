// src/components/AddJobForm/VolunteerFields.jsx
function VolunteerFields({ schedule, setSchedule }) {
  return (
    <>
      <input
        type="text"
        placeholder="Disponibilités (facultatif)"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />
    </>
  );
}

export default VolunteerFields;
