import { useState, useEffect } from 'react';
import { api } from '../services/api';

// Generic hook for API calls
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall();
        setData(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'An error occurred');
        console.error('API call failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

// Specific hooks for different data types
export const usePersonalInfo = () => {
  return useApi(() => api.getPersonalInfo());
};

export const useProjects = () => {
  return useApi(() => api.getProjects());
};

export const useProject = (id) => {
  return useApi(() => api.getProjectById(id), [id]);
};

export const useExperience = () => {
  return useApi(() => api.getExperience());
};

export const useSkills = () => {
  return useApi(() => api.getSkills());
};

export const useEducation = () => {
  return useApi(() => api.getEducation());
};

export const useCertifications = () => {
  return useApi(() => api.getCertifications());
};

export const useBlogPosts = (limit) => {
  return useApi(() => api.getBlogPosts(limit), [limit]);
};

export const useBlogPost = (slug) => {
  return useApi(() => api.getBlogPostBySlug(slug), [slug]);
};

export const useTestimonials = () => {
  return useApi(() => api.getTestimonials());
};

// Hook for contact form submission
export const useContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitMessage = async (data) => {
    try {
      setSubmitting(true);
      setError(null);
      await api.submitContactMessage(data);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send message');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setError(null);
  };

  return { submitMessage, submitting, success, error, reset };
};