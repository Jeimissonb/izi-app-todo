import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
});

function showLoading() {
  const loadingElement = document.createElement('div');
  loadingElement.id = 'loading-overlay';
  loadingElement.style.position = 'fixed';
  loadingElement.style.top = '0';
  loadingElement.style.left = '0';
  loadingElement.style.width = '100%';
  loadingElement.style.height = '100%';
  loadingElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  loadingElement.style.display = 'flex';
  loadingElement.style.justifyContent = 'center';
  loadingElement.style.alignItems = 'center';
  loadingElement.style.zIndex = '1000';
  loadingElement.innerHTML = '<div style="color: white; font-size: 24px;">Loading...</div>';
  
  document.body.appendChild(loadingElement);
}

function hideLoading() {
  const loadingElement = document.getElementById('loading-overlay');
  if (loadingElement) {
    document.body.removeChild(loadingElement);
  }
}

api.interceptors.request.use((config) => {
  showLoading();  
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  hideLoading();  
  return Promise.reject(error);
});


api.interceptors.response.use(
  (response) => {
    hideLoading();  
    return response;
  },
  (error) => {
    hideLoading();  

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); 
      if (window.location.href !== 'http://localhost:5173/login') {
        window.location.href = '/login'; 
      }
    }
    return Promise.reject(error); 
  }
);
