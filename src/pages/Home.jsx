// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Job from '../components/Job.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../App.css';

function Home() {
  const { t } = useLang();
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  // États recherche & filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs`)
      .then(res => {
        if (!res.ok) throw new Error(t('errorLoadingJobs'));
        return res.json();
      })
      .then(setJobs)
      .catch(err => setError(err.message));
  }, [t]);

  const deleteJob = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: user.email })
      }
    );
    if (res.ok) setJobs(prev => prev.filter(j => j.id !== id));
  };

  // Application des filtres
  const filtered = jobs.filter(job => {
    const matchesSearch = [job.title, job.description]
      .some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || job.contract_type === filterType;
    const matchesLocation = job.location
      .toLowerCase()
      .includes(filterLocation.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="container">
      <h2>{t('welcome')}</h2>

      {/* Barre de recherche & filtres */}
      <div className="filter-bar">
        <input
          className="filter-input"
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
        >
          <option value="all">{t('allTypes')}</option>
          <option value="studentJob">{t('studentJob')}</option>
          <option value="internship">{t('internship')}</option>
          <option value="contract">{t('contract')}</option>
          <option value="volunteer">{t('volunteer')}</option>
        </select>
        <input
          className="filter-input"
          type="text"
          placeholder={t('locationPlaceholder')}
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
        />
      </div>

      {error
        ? <p className="error">{error}</p>
        : filtered.length > 0
          ? filtered.map(job => (
              <Job
                key={job.id}
                data={job}
                onDelete={user?.role === 'admin' ? deleteJob : undefined}
              />
            ))
          : <p>{t('noJobs')}</p>
      }
    </div>
  );
}

export default Home;
