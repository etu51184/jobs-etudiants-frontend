import { useEffect, useState } from 'react';
import './App.css';
import AddJobForm from './components/AddJobForm';
import Job from './components/Job';
import AuthModal from './components/AuthModal';

function App() {
  const [jobs, setJobs] = useState([]);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    fetch('https://jobs-etudiants-backend.onrender.com/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error while fetching jobs:', err));
  }, []);

  return (
    <div className="container">
      {/* Barre du haut */}
      <div className="top-bar">
        <h1>Student Jobs in Namur</h1>
        <button className="auth-button" onClick={() => setShowAuth(true)}>Login / Sign up</button>
      </div>

      <p>Welcome to our job platform!</p>

      <AddJobForm onAdd={(job) => setJobs([...jobs, job])} />

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job, index) => (
          <Job key={index} data={job} />
        ))
      )}

      {/* Popup d'authentification */}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}

export default App;
