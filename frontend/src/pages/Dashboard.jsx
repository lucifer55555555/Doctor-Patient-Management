import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as doctorService from '../services/doctorService';
import * as patientService from '../services/patientService';
import Navigation from '../components/Navigation';

const Dashboard = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      const doctors = await doctorService.getAllDoctors();
      const patients = await patientService.getAllPatients();
      
      setDoctorCount(doctors.length);
      setPatientCount(patients.length);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="empty-state">Loading dashboard data...</div>
        ) : (
          <div className="dashboard-grid">
            {/* Doctors Card */}
            <div className="card stat-card">
              <h2 className="stat-card-title">Doctors</h2>
              <div className="stat-card-value primary">{doctorCount}</div>
              <p className="stat-card-desc">Total registered doctors</p>
              <Link to="/doctors" className="btn btn-primary">
                View All Doctors
              </Link>
            </div>

            {/* Patients Card */}
            <div className="card stat-card">
              <h2 className="stat-card-title">Patients</h2>
              <div className="stat-card-value secondary">{patientCount}</div>
              <p className="stat-card-desc">Total registered patients</p>
              <Link to="/patients" className="btn btn-secondary">
                View All Patients
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
