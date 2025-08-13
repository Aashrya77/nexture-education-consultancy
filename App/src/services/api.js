// API Configuration and Service Layer
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Client class
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Create API client instance
const apiClient = new ApiClient();

// Contact API
export const contactAPI = {
  // Submit contact form
  submitContact: (contactData) => {
    return apiClient.post('/contact', contactData);
  },

  // Get all contacts (admin only)
  getContacts: (params = {}) => {
    return apiClient.get('/contact', params);
  },

  // Get contact statistics
  getContactStats: () => {
    return apiClient.get('/contact/stats');
  },

  // Update contact
  updateContact: (id, data) => {
    return apiClient.put(`/contact/${id}`, data);
  },

  // Delete contact
  deleteContact: (id) => {
    return apiClient.delete(`/contact/${id}`);
  },
};

// Consultation API
export const consultationAPI = {
  // Book consultation
  bookConsultation: (consultationData) => {
    return apiClient.post('/consultation', consultationData);
  },

  // Get all consultations (admin only)
  getConsultations: (params = {}) => {
    return apiClient.get('/consultation', params);
  },

  // Get upcoming consultations
  getUpcomingConsultations: (days = 7) => {
    return apiClient.get('/consultation/upcoming', { days });
  },

  // Get consultation statistics
  getConsultationStats: () => {
    return apiClient.get('/consultation/stats');
  },

  // Update consultation
  updateConsultation: (id, data) => {
    return apiClient.put(`/consultation/${id}`, data);
  },

  // Cancel consultation
  cancelConsultation: (id) => {
    return apiClient.delete(`/consultation/${id}`);
  },

  // Send reminder
  sendReminder: (id) => {
    return apiClient.post(`/consultation/${id}/reminder`);
  },
};

// Blog API
export const blogAPI = {
  // Get published blog posts
  getBlogPosts: (params = {}) => {
    return apiClient.get('/blog', params);
  },

  // Get featured blog posts
  getFeaturedPosts: (limit = 3) => {
    return apiClient.get('/blog/featured', { limit });
  },

  // Get blog categories
  getCategories: () => {
    return apiClient.get('/blog/categories');
  },

  // Get single blog post by slug
  getBlogPost: (slug) => {
    return apiClient.get(`/blog/${slug}`);
  },

  // Like a blog post
  likeBlogPost: (id) => {
    return apiClient.post(`/blog/${id}/like`);
  },

  // Admin: Create blog post
  createBlogPost: (postData) => {
    return apiClient.post('/blog', postData);
  },

  // Admin: Get all blog posts
  getAllBlogPosts: (params = {}) => {
    return apiClient.get('/blog/admin/all', params);
  },

  // Admin: Update blog post
  updateBlogPost: (id, data) => {
    return apiClient.put(`/blog/${id}`, data);
  },

  // Admin: Delete blog post
  deleteBlogPost: (id) => {
    return apiClient.delete(`/blog/${id}`);
  },
};

// Authentication API
export const authAPI = {
  // Register user
  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  // Login user
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.success && response.data.token) {
      apiClient.setToken(response.data.token);
    }
    return response;
  },

  // Get current user profile
  getProfile: () => {
    return apiClient.get('/auth/me');
  },

  // Update user profile
  updateProfile: (profileData) => {
    return apiClient.put('/auth/profile', profileData);
  },

  // Change password
  changePassword: (passwordData) => {
    return apiClient.put('/auth/password', passwordData);
  },

  // Logout user
  logout: () => {
    apiClient.setToken(null);
    return apiClient.post('/auth/logout');
  },
};

// Admin API
export const adminAPI = {
  // Get dashboard statistics
  getDashboardStats: () => {
    return apiClient.get('/admin/dashboard');
  },

  // User management
  getUsers: (params = {}) => {
    return apiClient.get('/admin/users', params);
  },

  createUser: (userData) => {
    return apiClient.post('/admin/users', userData);
  },

  updateUser: (id, data) => {
    return apiClient.put(`/admin/users/${id}`, data);
  },

  deleteUser: (id) => {
    return apiClient.delete(`/admin/users/${id}`);
  },

  // Analytics
  getAnalytics: (period = '30') => {
    return apiClient.get('/admin/analytics', { period });
  },

  // Reports
  generateReport: (type, startDate, endDate) => {
    return apiClient.get('/admin/reports', { type, startDate, endDate });
  },
};

// Health check
export const healthAPI = {
  checkHealth: () => {
    return apiClient.get('/health');
  },
};

// Export API client for direct use if needed
export { apiClient };

// Default export
const api = {
  contact: contactAPI,
  consultation: consultationAPI,
  blog: blogAPI,
  auth: authAPI,
  admin: adminAPI,
  health: healthAPI,
};

export default api;
