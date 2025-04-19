// src/components/Job.jsx
import './Job.css';
import { useNavigate } from 'react-router-dom';

function Job({ data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${data.id}`);
  };

  return (
    <div className="job-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h2>{data.title}</h2>
      <p><strong>Lieu :</strong> {data.location}</p>
      <p><strong>Heures :</strong> {data.hours}</p>
      <p><strong>Rémunération :</strong> {data.salary}</p>
      <p><strong>Type de contrat :</strong> {data.contractType}</p>
    </div>
  );
}

export default Job;
