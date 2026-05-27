import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="nav-logo">
          HealthCare
        </Link>
        
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/doctors" className="nav-link">
            Doctors
          </Link>
          <Link to="/patients" className="nav-link">
            Patients
          </Link>
        </div>

        <div className="nav-user">
          <span className="username">{user?.username}</span>
          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
