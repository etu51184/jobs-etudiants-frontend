import React, { useEffect, useState } from 'react';
import Job from '../components/Job.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import '../App.css';

function Home() {
  const { t } = useLang();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs`)
      .then(res => {
        if (!res.ok) throw new Error(t('errorLoadingJobs'));
        return res.json();
      })
      .then(data => setJobs(data))
      .catch(err => setError(err.message));
  }, [t]);

  return (
    <div className="container">
      <h2>{t('welcome')}</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        Array.isArray(jobs) ? (
          jobs.length > 0 ? (
            jobs.map((job) => <Job key={job.id} data={job} />)
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