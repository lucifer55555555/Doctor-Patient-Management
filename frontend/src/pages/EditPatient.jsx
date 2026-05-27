import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as patientService from '../services/patientService';
import Navigation from '../components/Navigation';

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    disease: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      setError('');
      const patient = await patientService.getPatientById(id);
      setFormData(patient);
    } catch (err) {
      setError('Failed to load patient data');
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

    if (!formData.patientName || !formData.age || !formData.disease) {
      setError('All fields are required');
      return;
    }

    if (isNaN(formData.age) || formData.age < 0) {
      setError('Age must be a valid number');
      return;
    }

    try {
      setSubmitting(true);
      await patientService.updatePatient(id, {
        ...formData,
        age: parseInt(formData.age),
      });
      navigate('/patients');
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to update patient');
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
          <div className="empty-state">Loading patient data...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <div className="page-header">
          <h1 className="page-title">Edit Patient</h1>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card">
          <div className="form-group">
            <label className="form-label">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
              className="form-input"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="form-input"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Disease</label>
            <input
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              placeholder="Enter disease/condition"
              className="form-input"
              disabled={submitting}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-secondary"
            >
              {submitting ? 'Updating...' : 'Update Patient'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/patients')}
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

export default EditPatient;
