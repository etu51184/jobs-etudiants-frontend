import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    fetch('https://jobs-etudiants-backend.onrender.com')
      .then(res => res.json())
      .then(data => setOffres(data))
      .catch(err => console.error('Erreur lors du chargement des offres', err));
  }, []);

  return (
    <div className="container">
      <h1>Jobs étudiants à Namur</h1>
      <p>Bienvenue sur notre plateforme !</p>

      {offres.length === 0 ? (
        <p>Aucune offre disponible.</p>
      ) : (
        offres.map((offre, index) => (
          <div key={index} className="annonce">
            <h2>{offre.titre}</h2>
            <p><strong>Lieu :</strong> {offre.lieu}</p>
            <p><strong>Horaires :</strong> {offre.horaires}</p>
            <p>{offre.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;

