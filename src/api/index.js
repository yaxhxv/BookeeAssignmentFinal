

// api/index.js
import axios from 'axios';

//const API_BASE_URL = 'http://localhost:8080';
export const API_BASE_URL = "http://127.0.0.1:8080";

export const getShifts = async () => {
  const response = await axios.get(`${API_BASE_URL}/shifts`);
  return response.data;
};

export const getShiftById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/shifts/${id}`);
  return response.data;
};

export const bookShift = async (id) => {
  const response = await axios.post(`${API_BASE_URL}/shifts/${id}/book`);
  return response.data;
};

export const cancelShift = async (id) => {
  const response = await axios.post(`${API_BASE_URL}/shifts/${id}/cancel`);
  return response.data;
};

