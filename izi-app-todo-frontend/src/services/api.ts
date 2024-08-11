import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log(window.location.href)
      localStorage.removeItem('token'); 

      if(window.location.href !== 'http://localhost:5173/login')
      window.location.href = '/login'; 
    }
    return Promise.reject(error); 
  }
);