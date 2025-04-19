import { useEffect, useState } from 'react';
import './App.css';
import Job from './components/Job';
import AuthPanel from './components/AuthPanel';

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

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
        {/* Job list (left side) */}
        <div style={{ flex: 1 }}>
          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            jobs.map((job, index) => (
              <Job key={index} data={job} />
            ))
          )}
        </div>

        {/* Auth panel (right side) */}
        <AuthPanel onLogin={(username) => console.log('Logged in as:', username)} />
      </div>
    </div>
  );
}

export default App;
