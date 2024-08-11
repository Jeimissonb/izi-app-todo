import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // Ajustado para usar o caminho do proxy
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});