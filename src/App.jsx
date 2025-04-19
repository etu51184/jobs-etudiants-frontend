import { useEffect, useState } from 'react';
import './App.css';
import Job from './components/Job';
import AuthPanel from './components/AuthPanel';

function App() {
  const [jobs, setJobs] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showAccountPanel, setShowAccountPanel] = useState(false);

  useEffect(() => {
    // Load jobs
    fetch('https://jobs-etudiants-backend.onrender.com/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error while fetching jobs:', err));

    // Load user from localStorage
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleLogin = (username) => {
    setLoggedInUser(username);
    localStorage.setItem('username', username);
  };

  return (
    <>
      {/* Floating account button */}
      <button className="auth-button" onClick={() => setShowAccountPanel(!showAccountPanel)}>
        {showAccountPanel ? 'Close' : 'Account'}
      </button>

      <div className="container">
        <h1>Student Jobs in Namur</h1>
        <p>Welcome to our job platform!</p>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
          {/* Job list */}
          <div style={{ flex: 1 }}>
            {jobs.length === 0 ? (
              <p>No jobs available.</p>
            ) : (
              jobs.map((job, index) => (
                <Job key={index} data={job} />
              ))
            )}
          </div>

          {/* Auth panel */}
          {showAccountPanel && (
            <AuthPanel
              onLogin={handleLogin}
              username={loggedInUser}
              onAddJob={(job) => setJobs((prev) => [...prev, job])}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
