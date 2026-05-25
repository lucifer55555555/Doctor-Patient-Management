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
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Patient</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Disease</label>
              <input
                type="text"
                name="disease"
                value={formData.disease}
                onChange={handleChange}
                placeholder="Enter disease/condition"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                disabled={loading}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
              >
                {loading ? 'Adding...' : 'Add Patient'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/patients')}
                className="flex-1 bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPatient;
