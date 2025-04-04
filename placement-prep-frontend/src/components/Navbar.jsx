import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import './Navbar.css'; // Import CSS for additional styling

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [activePage, setActivePage] = useState(location.pathname);

  useEffect(() => {
    setActivePage(location.pathname); // Update activePage when location changes
  }, [location]);

  const handleNavClick = (path) => {
    if (path === '/home' && !isAuthenticated) {
      navigate('/login'); // Redirect to login if not authenticated
    } else if (path === '/login' && isAuthenticated) {
      navigate('/home'); // Redirect to home if already authenticated
    } else {
      navigate(path); // Navigate to the desired path
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        <Link
          className="navbar-brand fw-bold d-flex align-items-center"
          to={isAuthenticated ? "/home" : "/login"} // Adjust the link based on authentication
          onClick={() => handleNavClick('/home')}
        >
          <span className="brand-gradient">PlacementPrep</span>
        </Link>
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
            <li className="nav-item mx-2">
              <Link
                className={`nav-link ${activePage === '/home' ? 'active' : ''}`}
                to="/home"
                onClick={() => handleNavClick('/home')}
              >
                <i className="fas fa-home me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link
                className={`nav-link ${activePage === '/company' ? 'active' : ''}`}
                to="/company"
                onClick={() => handleNavClick('/company')}
              >
                <i className="fas fa-building me-1"></i> Companies
              </Link>
            </li>
            {!isAuthenticated ? (
              <li className="nav-item mx-2">
                <Link
                  className={`nav-link ${activePage === '/login' ? 'active' : ''}`}
                  to="/login"
                  onClick={() => handleNavClick('/login')}
                >
                  <i className="fas fa-sign-in-alt me-1"></i> Login
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-2">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;