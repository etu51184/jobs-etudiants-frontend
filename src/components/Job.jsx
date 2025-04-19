import './Job.css';

function Job({ data }) {
  return (
    <div className="job-card">
      <h2>{data.title}</h2>
      <p><strong>Location:</strong> {data.location}</p>
      <p><strong>Hours:</strong> {data.hours}</p>
      <p>{data.description}</p>
    </div>
  );
}

export default Job;
