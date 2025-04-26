// src/pages/Home.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Job from '../components/Job.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../App.css';

export default function Home() {
  const { t } = useLang();
  const { user, token } = useAuth();

  // --- pagination & data ---
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const limit = 10;
  const observer = useRef();

  // --- recherche & filtres ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('');

  // Quand on change de filtre/recherche, on repart de la page 1
  useEffect(() => {
    setPage(1);
    setJobs([]);
  }, [searchTerm, filterType, filterLocation]);

  // Observer sur la dernière carte pour déclencher la page suivante
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

  // Fetch serveur à chaque changement de page ou de filtres
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({
          page,
          limit,
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
        let fetched = [];
        let total = 1;

        // si on reçoit { jobs: [...], pages: N }
        if (Array.isArray(data.jobs)) {
          fetched = data.jobs;
          total = typeof data.pages === 'number' ? data.pages : 1;
        }
        // si l'API renvoie juste un tableau
        else if (Array.isArray(data)) {
          if (page === 1) fetched = data.slice(0, limit);
          else fetched = []; // plus de pages dispo
          total = 1;
        }

        setJobs(prev => (page === 1 ? fetched : [...prev, ...fetched]));
        setPages(total);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [page, searchTerm, filterType, filterLocation, token, t]);

  // Handler de suppression (admin)
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
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch {
      setError(t('deleteError'));
    }
  };

  return (
    <div className="container">
      <h2>{t('welcome')}</h2>

      {/* Recherche & filtres */}
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

      {/* Liste d'annonces */}
      {jobs.length === 0 && !loading && <p>{t('noJobs')}</p>}
      {jobs.map((job, idx) => {
        const isLast = idx === jobs.length - 1;
        return (
          <div ref={isLast ? lastJobRef : null} key={job.id}>
            <Job
              data={job}
              onDelete={user?.role === 'admin' ? deleteJob : undefined}
            />
          </div>
        );
      })}

      {loading && <p>{t('loading')}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
