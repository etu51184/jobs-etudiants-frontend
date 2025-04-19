// src/components/AddJobForm/StudentJobFields.jsx
function StudentJobFields({ days, setDays, schedule, setSchedule, salary, setSalary }) {
  const toggleDay = (day) => {
    setDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <>
      <div>
        <label>Jours de la semaine :</label><br />
        {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(day => (
          <label key={day} style={{ marginRight: '1rem' }}>
            <input
              type="checkbox"
              checked={days.includes(day)}
              onChange={() => toggleDay(day)}
            /> {day}
          </label>
        ))}
      </div>
      <input
        type="text"
        placeholder="Horaire (ex: 10h-14h)"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />
      <input
        type="text"
        placeholder="Rémunération (ex: 12€/h)"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />
    </>
  );
}

export default StudentJobFields;
