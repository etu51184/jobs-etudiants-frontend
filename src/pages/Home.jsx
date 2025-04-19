// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import Job from '../components/Job';
import '../App.css';

function Home() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error while fetching jobs:', err));
  }, []);

  return (
    <div className="container">
      <h2>Available Student Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available at the moment.</p>
      ) : (
        jobs.map((job, index) => <Job key={index} data={job} />)
      )}
    </div>
  );
}

export default Home;
