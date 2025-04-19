// src/components/Layout.jsx
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../App.css';

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header className="nav-bar">
        <h1 className="logo">Student Jobs in Namur</h1>
        <button className="nav-toggle" onClick={toggleMenu}>
          &#x2630;
        </button>
        <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/auth" onClick={() => setMenuOpen(false)}>Login / Sign up</Link>
          <Link to="/post" onClick={() => setMenuOpen(false)}>Post a Job</Link>
        </nav>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
