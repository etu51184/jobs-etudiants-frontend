import React, { useEffect, useState } from 'react';
import Job from '../components/Job.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../App.css';

function Home() {
  const { t } = useLang();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  // Fetch jobs on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs`)
      .then(res => {
        if (!res.ok) throw new Error(t('errorLoadingJobs'));
        return res.json();
      })
      .then(data => setJobs(data))
      .catch(err => setError(err.message));
  }, [t]);

  // Delete a job by id (owner or admin)
  const deleteJob = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email })
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t('deleteError'));
      }
      // Remove from local list
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <h2>{t('welcome')}</h2>

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        Array.isArray(jobs) ? (
          jobs.length > 0 ? (
            jobs.map((job) => (
              <Job key={job.id} data={job} onDelete={deleteJob} />
            ))
          ) : (
            <p>{t('noJobs')}</p>
          )
        ) : (
          <p>{t('errorLoadingJobs')}</p>
        )
      )}
    </div>
  );
}

export default Home;
