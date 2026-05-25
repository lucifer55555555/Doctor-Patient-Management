import apiClient from './apiClient';

export const getAllPatients = async () => {
  try {
    const response = await apiClient.get('/patients');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPatientById = async (id) => {
  try {
    const response = await apiClient.get(`/patients/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createPatient = async (patientData) => {
  try {
    const response = await apiClient.post('/patients', patientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updatePatient = async (id, patientData) => {
  try {
    const response = await apiClient.put(`/patients/${id}`, patientData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deletePatient = async (id) => {
  try {
    const response = await apiClient.delete(`/patients/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
