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
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
          <div className="text-gray-600">Loading doctor data...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Doctor</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Doctor Name</label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                placeholder="Enter doctor name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={submitting}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Enter specialization"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={submitting}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                disabled={submitting}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {submitting ? 'Updating...' : 'Update Doctor'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/doctors')}
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

export default EditDoctor;
