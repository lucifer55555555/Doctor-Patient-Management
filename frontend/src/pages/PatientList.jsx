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
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Patients</h1>
            <Link
              to="/patients/add"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add New Patient
            </Link>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name or disease..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          {loading ? (
            <div className="text-center text-gray-600">Loading patients...</div>
          ) : filteredPatients.length === 0 ? (
            <div className="text-center text-gray-600">No patients found</div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Age</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Disease</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{patient.patientName}</td>
                      <td className="px-6 py-4">{patient.age}</td>
                      <td className="px-6 py-4">{patient.disease}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/patients/edit/${patient.id}`}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(patient.id)}
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
        </div>
      </div>
    </>
  );
};

export default PatientList;
