import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true); // State to manage navbar collapse

  const handleNavClick = (path) => {
    setActivePage(path);
    setIsNavbarCollapsed(true); // Collapse the navbar after clicking a link
  };

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed); // Toggle the navbar state
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/home">
          PlacementPrep
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar} // Toggle the navbar on click
          aria-controls="navbarNav"
          aria-expanded={!isNavbarCollapsed} // Dynamically set aria-expanded
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} // Dynamically add 'show' class
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${activePage === '/home' ? 'active-link' : ''}`}
                to="/home"
                onClick={() => handleNavClick('/home')}
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