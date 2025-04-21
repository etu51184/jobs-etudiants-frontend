import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import PostJobPage from "./pages/PostJobPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import './App.css';

// Requires user to be authenticated
function RequireAuth({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// Requires user to be an admin
function RequireAdmin({ children }) {
  const { user } = useAuth();
  return user?.role === 'admin' ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/add-job"
          element={
            <RequireAuth>
              <PostJobPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireAdmin>
              <AdminUsersPage />
            </RequireAdmin>
          }
        />
        <Route path="/job/:id" element={<JobDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
