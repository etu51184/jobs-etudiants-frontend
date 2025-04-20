// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import Job from '../components/Job';
import '../App.css';

function Home() {
  const [jobs, setJobs] = useState(null); // null pour distinguer chargement/erreur

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => {
        console.error('Error while fetching jobs:', err);
        setJobs([]); // Pour éviter un crash si le fetch échoue
      });
  }, []);

  return (
    <div className="container">
      <h2>Available Student Jobs</h2>
      {Array.isArray(jobs) ? (
        jobs.length > 0 ? (
          jobs.map((job, index) => <Job key={index} data={job} />)
        ) : (
          <p>No jobs available at the moment.</p>
        )
      ) : (
        <p>Impossible de charger les annonces.</p>
      )}
    </div>
  );
}

export default Home;
