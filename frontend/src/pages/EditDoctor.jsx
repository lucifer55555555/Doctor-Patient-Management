import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as doctorService from '../services/doctorService';
import Navigation from '../components/Navigation';

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorName: '',
    specialization: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      setError('');
      const doctor = await doctorService.getDoctorById(id);
      setFormData(doctor);
    } catch (err) {
      setError('Failed to load doctor data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.doctorName || !formData.specialization || !formData.email) {
      setError('All fields are required');
      return;
    }

    try {
      setSubmitting(true);
      await doctorService.updateDoctor(id, formData);
      navigate('/doctors');
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to update doctor');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <Navigation />
        <main className="main-content flex items-center justify-center">
          <div className="empty-state">Loading doctor data...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Edit Doctor</h1>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card">
          <div className="form-group">
            <label className="form-label">Doctor Name</label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              placeholder="Enter doctor name"
              className="form-input"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Enter specialization"
              className="form-input"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="form-input"
              disabled={submitting}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? 'Updating...' : 'Update Doctor'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/doctors')}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditDoctor;
