// src/pages/PostJobPage.jsx

import AddJobForm from '../components/AddJobForm/AddJobForm';
import '../App.css';
import { useAuth } from '../contexts/AuthContext';

function PostJobPage() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h2>Publier une nouvelle annonce</h2>
      {user ? (
        <AddJobForm onAdd={() => alert('Annonce publiée avec succès !')} />
      ) : (
        <p>Vous devez être connecté pour poster un job.</p>
      )}
    </div>
  );
}

export default PostJobPage;
