import { useState } from 'react';
import './AddJobForm.css';


function AddJobForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = { title, location, hours, description };

    fetch('https://jobs-etudiants-backend.onrender.com/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })
      .then(res => res.json())
      .then(data => {
        onAdd(data);
        setTitle('');
        setLocation('');
        setHours('');
        setDescription('');
      })
      .catch(err => console.error('Error while adding the job:', err));
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <h2>Add a Job</h2>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="text" placeholder="Hours" value={hours} onChange={(e) => setHours(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Add Job</button>
    </form>
  );
}

export default AddJobForm;
