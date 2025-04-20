import { useEffect, useState } from "react";
import axios from "axios";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error("Erreur chargement utilisateurs :", err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => setUsers(users.filter(u => u.id !== id)))
      .catch(err => console.error("Erreur suppression :", err));
    }
  };

  return (
    <div className="admin-page">
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.email}
            <button onClick={() => handleDelete(user.id)}>🗑 Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsersPage;
