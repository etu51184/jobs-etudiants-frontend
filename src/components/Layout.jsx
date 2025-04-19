// src/components/Layout.jsx
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../App.css';

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <header className="nav-bar">
        <div className="logo">Student Jobs in Namur</div>
        
        <nav className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/auth" onClick={closeMenu}>Login / Sign up</Link>
          <Link to="/post" onClick={closeMenu}>Post a Job</Link>
        </nav>

        <button className="nav-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          &#x2630;
        </button>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
