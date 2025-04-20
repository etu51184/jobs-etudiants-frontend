import React from 'react';
import AddJobForm from '../components/AddJobForm/AddJobForm.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLang } from '../contexts/LanguageContext.jsx';
import '../App.css';

function PostJobPage() {
  const { user } = useAuth();
  const { t } = useLang();

  return (
    <div className="container">
      <h2>{t('postJob')}</h2>
      {user ? (
        <AddJobForm onAdd={() => alert(t('jobPosted'))} />
      ) : (
        <p>{t('mustLogin')}</p>
      )}
    </div>
  );
}

export default PostJobPage;
