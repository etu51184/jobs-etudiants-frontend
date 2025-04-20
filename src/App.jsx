import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import AddJobForm from './components/AddJobForm/AddJobForm';
import AdminUsersPage from "./pages/AdminUsersPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/add-job" element={<AddJobForm />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
