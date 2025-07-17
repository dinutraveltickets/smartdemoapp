const API_BASE_URL = '';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}/api${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(credentials) {
    return this.request('/login', {
      method: 'POST',
      body: credentials,
    });
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  async getRecentActivity() {
    return this.request('/dashboard/activity');
  }

  // Rate Matrix
  async getRates(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const queryString = params.toString();
    const endpoint = queryString ? `/rates?${queryString}` : '/rates';
    
    return this.request(endpoint);
  }

  async getRate(id) {
    return this.request(`/rates/${id}`);
  }

  async createRate(rateData) {
    return this.request('/rates', {
      method: 'POST',
      body: rateData,
    });
  }

  async updateRate(id, rateData) {
    return this.request(`/rates/${id}`, {
      method: 'PUT',
      body: rateData,
    });
  }

  async deleteRate(id) {
    return this.request(`/rates/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiService();
export default api;
