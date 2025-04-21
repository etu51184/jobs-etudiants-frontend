// src/pages/Home.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Job from '../components/Job.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../App.css';

/**
 * Home page with infinite scroll, server-side search & filters
 */
export default function Home() {
  const { t } = useLang();
  const { user, token } = useAuth();

  // Pagination and data state
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('');

  // Reset list when filters change
  useEffect(() => {
    setJobs([]);
    setPage(1);
  }, [searchTerm, filterType, filterLocation]);

  // IntersectionObserver for infinite scroll
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

  // Fetch jobs when page or filters change
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({
          page,
          limit: 10,
          search: searchTerm,
          type: filterType,
          location: filterLocation
        });
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jobs?${params.toString()}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        if (!res.ok) throw new Error(t('errorLoadingJobs'));
        const data = await res.json();
        // Handle response shape: { jobs: [], pages } or direct array
        const newJobs = Array.isArray(data.jobs)
          ? data.jobs
          : Array.isArray(data)
            ? data
            : [];
        setJobs(prev => (page === 1 ? newJobs : [...prev, ...newJobs]));
        setPages(typeof data.pages === 'number' ? data.pages : 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [page, searchTerm, filterType, filterLocation, t, token]);

  // Delete handler for admin
  const deleteJob = async id => {
    if (!window.confirm(t('confirmDelete'))) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!res.ok) {
        const err = await res.json();
        setError(err.message || t('deleteError'));
        return;
      }
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch {
      setError(t('deleteError'));
    }
  };

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
      {jobs.length === 0 && !loading && <p>{t('noJobs')}</p>}
      {jobs.map((job, idx) => {
        const isLast = idx === jobs.length - 1;
        return (
          <Job
            ref={isLast ? lastJobRef : null}
            key={job.id}
            data={job}
            onDelete={user?.role === 'admin' ? deleteJob : undefined}
          />
        );
      })}

      {loading && <p>{t('loading')}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
