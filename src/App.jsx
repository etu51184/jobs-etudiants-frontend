import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import PostJobPage from './pages/PostJobPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="post" element={<PostJobPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
