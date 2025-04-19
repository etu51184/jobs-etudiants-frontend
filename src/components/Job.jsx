import './Job.css';
import { useNavigate } from 'react-router-dom';

function Job({ data }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/job/${data.id}`);

  return (
    <div className="job-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h2>{data.title}</h2>
      <p><strong>Lieu :</strong> {data.location}</p>
      <p><strong>Type :</strong> {data.contractType}</p>

      {data.contractType === 'Job étudiant' && (
        <>
          {data.schedule && <p><strong>Horaires :</strong> {data.schedule}</p>}
          {data.days?.length > 0 && <p><strong>Jours :</strong> {data.days.join(', ')}</p>}
          {data.salary && <p><strong>Rémunération :</strong> {data.salary}</p>}
        </>
      )}

      {data.contractType === 'Stage' && (
        <>
          {data.duration && <p><strong>Durée :</strong> {data.duration}</p>}
          {data.schedule && <p><strong>Horaires :</strong> {data.schedule}</p>}
          {data.contact && <p><strong>Contact :</strong> {data.contact}</p>}
        </>
      )}

      {data.contractType === 'CDD' && (
        <>
          {data.startDate && <p><strong>Début :</strong> {data.startDate}</p>}
          {data.endDate && <p><strong>Fin :</strong> {data.endDate}</p>}
          <p><strong>Temps plein :</strong> {data.fullTime ? 'Oui' : 'Non'}</p>
        </>
      )}

      {data.contractType === 'Bénévolat' && (
        <>
          {data.contact && <p><strong>Contact :</strong> {data.contact}</p>}
          {data.schedule && <p><strong>Disponibilités :</strong> {data.schedule}</p>}
        </>
      )}
    </div>
  );
}

export default Job;
