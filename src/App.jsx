import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import AddJobForm from './components/AddJobForm/AddJobForm';
import AdminUsersPage from "./pages/AdminUsersPage";
import JobDetails from "./pages/JobDetails";
import Layout from "./components/Layout";
import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}> 
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/add-job" element={<AddJobForm />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/job/:id" element={<JobDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
