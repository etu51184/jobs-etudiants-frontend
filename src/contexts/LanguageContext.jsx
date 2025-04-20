import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    welcome: "Available Student Jobs",
    home: "Home",
    postJob: "Post Job",
    login: "Login",
    logout: "Logout",
    createAccount: "Sign Up",
    backToLogin: "Back to Login",
    emailPlaceholder: "Email address",
    passwordPlaceholder: "Password",
    signUp: "Sign Up",
    submitJob: "Submit Job",
    jobPosted: "Job posted successfully!",
    postError: "Error posting job.",
    jobTitle: "Job Title",
    location: "Location",
    description: "Job Description",
    contact: "Contact Information",
    expiresInDays: "Expires in days",
    days: "Days",
    weekDays: "Week Days",
    schedulePlaceholder: "Schedule (e.g. 9am - 5pm)",
    schedule: "Schedule",
    salaryPlaceholder: "Salary (e.g. $12/hour)",
    salary: "Salary",
    durationPlaceholder: "Duration (e.g. 2 months)",
    duration: "Duration",
    startDate: "Start Date",
    endDate: "End Date",
    fullTime: "Full Time",
    availabilityPlaceholder: "Availability (optional)",
    removeUser: "Delete User",
    userList: "User List",
    errorLoadingJobs: "Failed to load jobs",
    noJobs: "No jobs available at the moment.",
    errorJobNotFound: "Job not found",
    loading: "Loading...",
    mustLogin: "You must be logged in",
    confirmDelete: "Are you sure you want to delete this job?",
    deleteSuccess: "Job deleted successfully.",
    deleteError: "Error deleting job.",
    backToList: "Back to list",
    delete: "Delete",
    yes: "Yes",
    no: "No",
    errorLoadingUsers: "Failed to load users.",
    errorDeletingUser: "Error deleting user.",
    confirmDeleteUser: "Are you sure you want to delete this user?",
    serverError: "Server error",
    errorOccurred: "An error occurred.",
    confirmPost: "Are you sure you want to post this job?",
    // Contract types
    studentJob: "Student Job",
    internship: "Internship",
    contract: "Contract",
    volunteer: "Volunteer"
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
    signUp: "S'inscrire",
    submitJob: "Ajouter l’annonce",
    jobPosted: "Annonce publiée avec succès !",
    postError: "Erreur lors de la publication de l'annonce.",
    jobTitle: "Titre du job",
    location: "Lieu",
    description: "Description du poste",
    contact: "Contact",
    expiresInDays: "Durée de publication (en jours)",
    days: "Jours",
    weekDays: "Jours de la semaine",
    schedulePlaceholder: "Horaires (ex : 9h-17h)",
    schedule: "Horaires",
    salaryPlaceholder: "Rémunération (ex : 12€/h)",
    salary: "Rémunération",
    durationPlaceholder: "Durée (ex : 2 mois)",
    duration: "Durée",
    startDate: "Début",
    endDate: "Fin",
    fullTime: "Temps plein",
    availabilityPlaceholder: "Disponibilités (facultatif)",
    removeUser: "Supprimer l'utilisateur",
    userList: "Liste des utilisateurs",
    errorLoadingJobs: "Impossible de charger les annonces",
    noJobs: "Aucune annonce disponible pour le moment.",
    errorJobNotFound: "Annonce introuvable",
    loading: "Chargement...",
    mustLogin: "Vous devez être connecté",
    confirmDelete: "Êtes-vous sûr de vouloir supprimer cette annonce ?",
    deleteSuccess: "Annonce supprimée avec succès.",
    deleteError: "Erreur lors de la suppression de l'annonce.",
    backToList: "Retour à la liste",
    delete: "Supprimer",
    yes: "Oui",
    no: "Non",
    errorLoadingUsers: "Impossible de charger les utilisateurs.",
    errorDeletingUser: "Erreur lors de la suppression de l'utilisateur.",
    confirmDeleteUser: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
    serverError: "Erreur serveur",
    errorOccurred: "Une erreur s'est produite.",
    confirmPost: "Êtes-vous sûr de vouloir publier cette annonce ?",
    // Contract types
    studentJob: "Job étudiant",
    internship: "Stage",
    contract: "CDD",
    volunteer: "Bénévolat"
  }
};

const LanguageContext = createContext({ lang: 'en', setLang: () => {}, t: (key) => key });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr');
  const t = (key) => translations[lang][key] || key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
