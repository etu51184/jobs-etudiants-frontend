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

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs`)
      .then(res => {
        if (!res.ok) throw new Error(t('errorLoadingJobs'));
        return res.json();
      })
      .then(data => setJobs(data))
      .catch(err => setError(err.message));
  }, [t]);

  // Filter and search logic
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = [job.title, job.description]
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || job.contract_type === filterType;
    const matchesLocation = job.location.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="container">
      <h2>{t('welcome')}</h2>

      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder={t('searchPlaceholder') || 'Search...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: '1', padding: '0.5rem' }}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: '0.5rem' }}
        >
          <option value="all">{t('allTypes') || 'All Types'}</option>
          <option value="studentJob">{t('studentJob')}</option>
          <option value="internship">{t('internship')}</option>
          <option value="contract">{t('contract')}</option>
          <option value="volunteer">{t('volunteer')}</option>
        </select>

        <input
          type="text"
          placeholder={t('locationPlaceholder') || 'Filter by location'}
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          style={{ flex: '1', padding: '0.5rem' }}
        />
      </div>

      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        Array.isArray(filteredJobs) ? (
          filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Job key={job.id} data={job} onDelete={user?.role === 'admin' ? async (id) => {
                // Admin delete logic
                const res = await fetch(
                  `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
                  { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: user.email }) }
                );
                if (res.ok) setJobs(prev => prev.filter(j => j.id !== id));
              } : null} />
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
