import { useEffect, useState } from 'react';
import './App.css';
import AddJobForm from './components/AddJobForm';
import Job from './components/Job';

{jobs.length === 0 ? (
  <p>No jobs available.</p>
) : (
  jobs.map((job, index) => (
    <Job key={index} data={job} />
  ))
)}


function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('https://jobs-etudiants-backend.onrender.com/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error while fetching jobs:', err));
  }, []);

  return (
    <div className="container">
      <h1>Student Jobs in Namur</h1>
      <p>Welcome to our job platform!</p>

      <AddJobForm onAdd={(job) => setJobs([...jobs, job])} />

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h2>{job.title}</h2>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Hours:</strong> {job.hours}</p>
            <p>{job.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
