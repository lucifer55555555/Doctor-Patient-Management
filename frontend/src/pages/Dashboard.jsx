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
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center text-gray-600">Loading dashboard data...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Doctors Card */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctors</h2>
                <p className="text-4xl font-bold text-blue-600 mb-6">{doctorCount}</p>
                <p className="text-gray-600 mb-6">Total registered doctors</p>
                <Link
                  to="/doctors"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View All Doctors
                </Link>
              </div>

              {/* Patients Card */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Patients</h2>
                <p className="text-4xl font-bold text-green-600 mb-6">{patientCount}</p>
                <p className="text-gray-600 mb-6">Total registered patients</p>
                <Link
                  to="/patients"
                  className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  View All Patients
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
