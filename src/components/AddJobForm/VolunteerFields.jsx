// src/components/AddJobForm/VolunteerFields.jsx
function VolunteerFields({ description, setDescription, contact, setContact, schedule, setSchedule }) {
  return (
    <>
      <input
        type="text"
        placeholder="Mission"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
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
