// src/pages/Home.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Job from '../components/Job.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../App.css';

function Home() {
  const { t } = useLang();
  const { user, token } = useAuth();

  // Pagination state
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('');

  // Intersection Observer for infinite scroll
  const observer = useRef();
  const lastJobRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && page < pages) {
          setPage(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, page, pages]
  );

  // Fetch jobs page
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jobs?page=${page}&limit=10`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        if (!res.ok) throw new Error(t('errorLoadingJobs'));
        const { jobs: newJobs, pages: totalPages } = await res.json();
        setJobs(prev => [...prev, ...newJobs]);
        setPages(totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [page, t, token]);

  // Delete handler for admin
  const deleteJob = async id => {
    try {
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
      if (res.ok) {
        setJobs(prev => prev.filter(job => job.id !== id));
      }
    } catch {}
  };

  // Apply search & filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = [job.title, job.description]
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || job.contract_type === filterType;
    const matchesLocation = job.location
      .toLowerCase()
      .includes(filterLocation.toLowerCase());
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="container">
      <h2>{t('welcome')}</h2>

      {/* Search & Filters */}
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

      {/* Job List with Infinite Scroll */}
      {filteredJobs.map((job, idx) => {
        if (idx === filteredJobs.length - 1) {
          return (
            <Job
              ref={lastJobRef}
              key={job.id}
              data={job}
              onDelete={user?.role === 'admin' ? deleteJob : undefined}
            />
          );
        } else {
          return (
            <Job
              key={job.id}
              data={job}
              onDelete={user?.role === 'admin' ? deleteJob : undefined}
            />
          );
        }
      })}

      {loading && <p>{t('loading')}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Home;
