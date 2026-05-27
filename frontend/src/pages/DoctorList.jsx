import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as doctorService from '../services/doctorService';
import Navigation from '../components/Navigation';
import { useToast } from '../components/Toast';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, doctors]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await doctorService.getAllDoctors();
      setDoctors(data);
    } catch (err) {
      setError('Failed to load doctors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    if (!searchTerm) {
      setFilteredDoctors(doctors);
      return;
    }

    const filtered = doctors.filter(
      (doctor) =>
        doctor.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;

    try {
      await doctorService.deleteDoctor(id);
      setDoctors(doctors.filter((d) => d.id !== id));
      showToast('Doctor deleted successfully', 'success');
    } catch (err) {
      showToast('Failed to delete doctor', 'error');
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Doctors</h1>
          <Link
            to="/doctors/add"
            className="btn btn-primary"
          >
            Add New Doctor
          </Link>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>

        {loading ? (
          <div className="empty-state">Loading doctors...</div>
        ) : filteredDoctors.length === 0 ? (
          <div className="empty-state">No doctors found</div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.doctorName}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.email}</td>
                    <td>
                      <div className="action-group">
                        <Link
                          to={`/doctors/edit/${doctor.id}`}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(doctor.id)}
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

        {/* Toast notifications */}
        <div className="toast-container">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}
            >
              {toast.message}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DoctorList;
