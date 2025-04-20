import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import PostJobPage from './pages/PostJobPage';
import JobDetails from './pages/JobDetails';
import AdminUsersPage from './pages/AdminUsersPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { username } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="post" element={<PostJobPage />} />
        <Route path="job/:id" element={<JobDetails />} />
        <Route
          path="admin/users"
          element={username === "admin" ? <AdminUsersPage /> : <Navigate to="/" />}
        />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
