// src/components/Job.jsx
import './Job.css';

function Job({ data }) {
  return (
    <div className="job-card">
      <h2>{data.title}</h2>
      <p><strong>Lieu :</strong> {data.location}</p>
      <p><strong>Heures :</strong> {data.hours}</p>
      <p><strong>Rémunération :</strong> {data.salary}</p>
      <p><strong>Type de contrat :</strong> {data.contractType}</p>
      {data.contact && <p><strong>Contact :</strong> {data.contact}</p>}
      {data.expiresInDays && <p><strong>Expire dans :</strong> {data.expiresInDays} jours</p>}
      <p>{data.description}</p>
    </div>
  );
}

export default Job;
