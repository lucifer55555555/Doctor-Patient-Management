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
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-2xl font-bold">
            HealthCare
          </Link>
          
          <div className="flex gap-6">
            <Link to="/dashboard" className="hover:text-blue-200 transition">
              Dashboard
            </Link>
            <Link to="/doctors" className="hover:text-blue-200 transition">
              Doctors
            </Link>
            <Link to="/patients" className="hover:text-blue-200 transition">
              Patients
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm">{user?.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
