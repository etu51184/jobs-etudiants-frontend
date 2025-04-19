// src/components/AddJobForm/CddFields.jsx
function CddFields({ startDate, setStartDate, endDate, setEndDate, fullTime, setFullTime }) {
  return (
    <>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={fullTime}
          onChange={() => setFullTime(!fullTime)}
        />
        Temps plein
      </label>
    </>
  );
}

export default CddFields;
