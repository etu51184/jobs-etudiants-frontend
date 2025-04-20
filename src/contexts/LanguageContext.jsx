import React, { createContext, useContext, useState } from 'react';

// Traductions disponibles
const translations = {
  en: {
    welcome: "Available Student Jobs",
    home: "Home",
    postJob: "Post Job",
    login: "Login",
    logout: "Logout",
    createAccount: "Create Account",
    backToLogin: "Back to Login",
    emailPlaceholder: "Email address",
    passwordPlaceholder: "Password",
    submitJob: "Submit Job",
    jobTitle: "Job Title",
    location: "Location",
    description: "Job Description",
    contact: "Contact Information",
    expiresInDays: "Expires in days",
    days: "Days",
    schedule: "Schedule",
    salary: "Salary",
    duration: "Duration",
    startDate: "Start Date",
    endDate: "End Date",
    fullTime: "Full Time",
    removeUser: "Delete User",
    userList: "User List"
  },
  fr: {
    welcome: "Annonces étudiantes disponibles",
    home: "Accueil",
    postJob: "Publier un job",
    login: "Connexion",
    logout: "Déconnexion",
    createAccount: "Créer un compte",
    backToLogin: "Retour à la connexion",
    emailPlaceholder: "Adresse email",
    passwordPlaceholder: "Mot de passe",
    submitJob: "Ajouter l’annonce",
    jobTitle: "Titre du job",
    location: "Lieu",
    description: "Description du poste",
    contact: "Contact",
    expiresInDays: "Durée de publication (en jours)",
    days: "Jours",
    schedule: "Horaires",
    salary: "Rémunération",
    duration: "Durée",
    startDate: "Début",
    endDate: "Fin",
    fullTime: "Temps plein",
    removeUser: "Supprimer",
    userList: "Liste des utilisateurs"
  }
};

// Création du contexte langue
const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: (key) => key
});

// Fournisseur de contexte
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = (key) => translations[lang][key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useLang() {
  return useContext(LanguageContext);
}
