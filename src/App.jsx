// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import PostJobPage from './pages/PostJobPage';

function App() {
  return (
    <Router>
      <div className="nav-bar">
        <h1>Student Jobs in Namur</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/auth">Login / Sign up</Link>
          <Link to="/post">Post a Job</Link>
        </nav>
      </div>

      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/post" element={<PostJobPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
