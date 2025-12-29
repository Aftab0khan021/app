import axios from 'axios';

// FIX: Point production URL to your actual Render Backend
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://portfolio-k4cd.onrender.com/api' 
  : 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;