import axios from 'axios';

// FIX: Points to your Render Backend in production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://portfolio-k4cd.onrender.com/api' 
  : 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// FIX: Ensure this named export exists for your hooks
export const api = {
  // Public Routes
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
  
  // Admin Routes
  admin: {
    updatePersonalInfo: (data) => apiClient.put('/admin/personal', data),
    
    getProjects: () => apiClient.get('/admin/projects'),
    createProject: (data) => apiClient.post('/admin/projects', data),
    updateProject: (id, data) => apiClient.put(`/admin/projects/${id}`, data),
    deleteProject: (id) => apiClient.delete(`/admin/projects/${id}`),

    createExperience: (data) => apiClient.post('/admin/experience', data),
    updateExperience: (id, data) => apiClient.put(`/admin/experience/${id}`, data),
    deleteExperience: (id) => apiClient.delete(`/admin/experience/${id}`),

    getSkills: () => apiClient.get('/admin/skills'),
    createSkill: (data) => apiClient.post('/admin/skills', data),
    updateSkill: (id, data) => apiClient.put(`/admin/skills/${id}`, data),
    deleteSkill: (id) => apiClient.delete(`/admin/skills/${id}`),

    getContactMessages: () => apiClient.get('/admin/messages'),
    updateMessageStatus: (id, status) => apiClient.put(`/admin/messages/${id}`, { status }),
  },
};

export default api;