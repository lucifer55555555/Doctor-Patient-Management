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
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Doctors</h1>
            <Link
              to="/doctors/add"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add New Doctor
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {loading ? (
            <div className="text-center text-gray-600">Loading doctors...</div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center text-gray-600">No doctors found</div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Specialization</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{doctor.doctorName}</td>
                      <td className="px-6 py-4">{doctor.specialization}</td>
                      <td className="px-6 py-4">{doctor.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/doctors/edit/${doctor.id}`}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(doctor.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
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
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`${
                toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white px-6 py-3 rounded-lg shadow-lg fixed top-4 right-4 z-50`}
            >
              {toast.message}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DoctorList;
