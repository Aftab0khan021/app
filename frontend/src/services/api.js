import axios from 'axios';

const API_BASE_URL = (process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000').replace(/\/$/, '');

// Create axios instance
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth (future use)
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
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
export const api = {
  // Personal Information
  getPersonalInfo: () => apiClient.get('/personal'),
  
  // Projects
  getProjects: () => apiClient.get('/projects'),
  getProjectById: (id) => apiClient.get(`/projects/${id}`),
  getFeaturedProjects: () => apiClient.get('/projects/featured'),
  
  // Experience
  getExperience: () => apiClient.get('/experience'),
  
  // Skills
  getSkills: () => apiClient.get('/skills'),
  
  // Education
  getEducation: () => apiClient.get('/education'),
  
  // Certifications
  getCertifications: () => apiClient.get('/certifications'),
  
  // Blog
  getBlogPosts: (limit) => apiClient.get(`/blog${limit ? `?limit=${limit}` : ''}`),
  getBlogPostBySlug: (slug) => apiClient.get(`/blog/${slug}`),
  getFeaturedBlogPosts: () => apiClient.get('/blog/featured'),
  
  // Testimonials
  getTestimonials: () => apiClient.get('/testimonials'),
  
  // Contact
  submitContactMessage: (data) => apiClient.post('/contact', data),
  
  // Admin endpoints (future use)
  admin: {
    // Personal
    updatePersonalInfo: (data) => apiClient.put('/admin/personal', data),
    
    // Projects
    createProject: (data) => apiClient.post('/admin/projects', data),
    updateProject: (id, data) => apiClient.put(`/admin/projects/${id}`, data),
    deleteProject: (id) => apiClient.delete(`/admin/projects/${id}`),
    
    // Experience
    createExperience: (data) => apiClient.post('/admin/experience', data),
    updateExperience: (id, data) => apiClient.put(`/admin/experience/${id}`, data),
    deleteExperience: (id) => apiClient.delete(`/admin/experience/${id}`),
    
    // Skills
    createSkill: (data) => apiClient.post('/admin/skills', data),
    updateSkill: (id, data) => apiClient.put(`/admin/skills/${id}`, data),
    deleteSkill: (id) => apiClient.delete(`/admin/skills/${id}`),
    
    // Contact Messages
    getContactMessages: () => apiClient.get('/admin/messages'),
    updateMessageStatus: (id, status) => apiClient.put(`/admin/messages/${id}`, { status }),
  }
};

export default api;