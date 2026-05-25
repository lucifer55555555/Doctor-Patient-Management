import apiClient from './apiClient';

export const getAllDoctors = async () => {
  try {
    const response = await apiClient.get('/doctors');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getDoctorById = async (id) => {
  try {
    const response = await apiClient.get(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createDoctor = async (doctorData) => {
  try {
    const response = await apiClient.post('/doctors', doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateDoctor = async (id, doctorData) => {
  try {
    const response = await apiClient.put(`/doctors/${id}`, doctorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteDoctor = async (id) => {
  try {
    const response = await apiClient.delete(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
