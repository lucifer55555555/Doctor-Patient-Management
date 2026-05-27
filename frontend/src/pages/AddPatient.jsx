import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as patientService from '../services/patientService';
import Navigation from '../components/Navigation';

const AddPatient = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    disease: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

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
      setLoading(true);
      await patientService.createPatient({
        ...formData,
        age: parseInt(formData.age),
      });
      navigate('/patients');
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to add patient');
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
          <h1 className="page-title">Add New Patient</h1>
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-secondary"
            >
              {loading ? 'Adding...' : 'Add Patient'}
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

export default AddPatient;
