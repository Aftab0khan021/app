import axios from 'axios';

// FIX: Point production URL to your actual Render Backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://portfolio-k4cd.onrender.com/api' 
  : 'http://localhost:8000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor for auth (future use)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoints
// FIX: This named export 'api' was missing, causing the build failure
export const api = {
  // Public
  getPersonalInfo: () => apiClient.get('/personal'),
  getProjects: () => apiClient.get('/projects'),
  getProjectById: (id) => apiClient.get(`/projects/${id}`),
  getFeaturedProjects: () => apiClient.get('/projects/featured'),
  getExperience: () => apiClient.get('/experience'),
  getSkills: () => apiClient.get('/skills'),
  getEducation: () => apiClient.get('/education'),
  getCertifications: () => apiClient.get('/certifications'),
  getBlogPosts: (limit) => apiClient.get(`/blog${limit ? `?limit=${limit}` : ''}`),
  getBlogPostBySlug: (slug) => apiClient.get(`/blog/${slug}`),
  getFeaturedBlogPosts: () => apiClient.get('/blog/featured'),
  getTestimonials: () => apiClient.get('/testimonials'),
  submitContactMessage: (data) => apiClient.post('/contact', data),
  
  // Admin endpoints
  admin: {
    // Personal
    updatePersonalInfo: (data) => apiClient.put('/admin/personal', data),

    // Projects
    getProjects: () => apiClient.get('/admin/projects'),
    createProject: (data) => apiClient.post('/admin/projects', data),
    updateProject: (id, data) => apiClient.put(`/admin/projects/${id}`, data),
    deleteProject: (id) => apiClient.delete(`/admin/projects/${id}`),

    // Experience
    createExperience: (data) => apiClient.post('/admin/experience', data),
    updateExperience: (id, data) => apiClient.put(`/admin/experience/${id}`, data),
    deleteExperience: (id) => apiClient.delete(`/admin/experience/${id}`),

    // Skills
    getSkills: () => apiClient.get('/admin/skills'),
    createSkill: (data) => apiClient.post('/admin/skills', data),
    updateSkill: (id, data) => apiClient.put(`/admin/skills/${id}`, data),
    deleteSkill: (id) => apiClient.delete(`/admin/skills/${id}`),

    // Contact Messages
    getContactMessages: () => apiClient.get('/admin/messages'),
    updateMessageStatus: (id, status) => apiClient.put(`/admin/messages/${id}`, { status }),
  },
};

export default api;