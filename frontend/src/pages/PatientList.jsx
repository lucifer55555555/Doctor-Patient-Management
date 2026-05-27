import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as patientService from '../services/patientService';
import Navigation from '../components/Navigation';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    filterPatients();
  }, [searchTerm, patients]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await patientService.getAllPatients();
      setPatients(data);
    } catch (err) {
      setError('Failed to load patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterPatients = () => {
    if (!searchTerm) {
      setFilteredPatients(patients);
      return;
    }

    const filtered = patients.filter(
      (patient) =>
        patient.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.disease?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;

    try {
      await patientService.deletePatient(id);
      setPatients(patients.filter((p) => p.id !== id));
      setSuccessMessage('Patient deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete patient');
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Patients</h1>
          <Link
            to="/patients/add"
            className="btn btn-secondary"
          >
            Add New Patient
          </Link>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="toast-container">
            <div className="toast toast-success">{successMessage}</div>
          </div>
        )}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or disease..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>

        {loading ? (
          <div className="empty-state">Loading patients...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="empty-state">No patients found</div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Disease</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.patientName}</td>
                    <td>{patient.age}</td>
                    <td>{patient.disease}</td>
                    <td>
                      <div className="action-group">
                        <Link
                          to={`/patients/edit/${patient.id}`}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientList;
