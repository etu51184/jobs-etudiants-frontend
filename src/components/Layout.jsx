// src/components/Layout.jsx
import { Link, Outlet } from 'react-router-dom';
import '../App.css';

function Layout() {
  return (
    <>
      <header className="nav-bar">
        <div className="nav-left">
          <h1 className="logo">Student Jobs in Namur</h1>
        </div>

        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/auth">Login / Sign up</Link>
          <Link to="/post">Post a Job</Link>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
