import axios from 'axios';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000' });
api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
