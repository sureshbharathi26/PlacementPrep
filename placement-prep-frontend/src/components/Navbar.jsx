import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import CSS for additional styling

const Navbar = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);

  const handleNavClick = (path) => {
    setActivePage(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">PlacementPrep</Link>  
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${activePage === '/' ? 'active-link' : ''}`}
                to="/"
                onClick={() => handleNavClick('/')}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activePage === '/company' ? 'active-link' : ''}`}
                to="/company"
                onClick={() => handleNavClick('/company')}
              >
                Companies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activePage === '/login' ? 'active-link' : ''}`}
                to="/login"
                onClick={() => handleNavClick('/login')}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;