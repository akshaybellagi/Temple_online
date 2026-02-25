// API client for Firebase backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Auth
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUserProfile(uid) {
    return this.request(`/auth/profile/${uid}`);
  }

  async updateUserProfile(uid, updates) {
    return this.request(`/auth/profile/${uid}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Temples
  async getTemples() {
    return this.request('/temples');
  }

  async getTemple(id) {
    return this.request(`/temples/${id}`);
  }

  async createTemple(temple) {
    return this.request('/temples', {
      method: 'POST',
      body: JSON.stringify(temple),
    });
  }

  async updateTemple(id, updates) {
    return this.request(`/temples/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteTemple(id) {
    return this.request(`/temples/${id}`, {
      method: 'DELETE',
    });
  }

  // Sevas
  async getSevas() {
    return this.request('/sevas');
  }

  async getSevasByTemple(templeId) {
    return this.request(`/sevas/temple/${templeId}`);
  }

  async createSeva(seva) {
    return this.request('/sevas', {
      method: 'POST',
      body: JSON.stringify(seva),
    });
  }

  async updateSeva(id, updates) {
    return this.request(`/sevas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteSeva(id) {
    return this.request(`/sevas/${id}`, {
      method: 'DELETE',
    });
  }

  // Bookings
  async getBookings() {
    return this.request('/bookings');
  }

  async getUserBookings(userId) {
    return this.request(`/bookings/user/${userId}`);
  }

  async createBooking(booking) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    });
  }

  async updateBookingStatus(id, status) {
    return this.request(`/bookings/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteBooking(id) {
    return this.request(`/bookings/${id}`, {
      method: 'DELETE',
    });
  }

  // Donations
  async getDonations() {
    return this.request('/donations');
  }

  async getUserDonations(userId) {
    return this.request(`/donations/user/${userId}`);
  }

  async createDonation(donation) {
    return this.request('/donations', {
      method: 'POST',
      body: JSON.stringify(donation),
    });
  }

  async updateDonationStatus(id, status) {
    return this.request(`/donations/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Gallery
  async getGalleryImages() {
    return this.request('/gallery');
  }

  async uploadGalleryImage(formData) {
    return this.request('/gallery/upload', {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
  }

  async updateGalleryImage(id, updates) {
    return this.request(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteGalleryImage(id) {
    return this.request(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }

  // Rooms (for backward compatibility - map to temples/sevas)
  async getRooms() {
    // In Firebase version, rooms are managed as temple accommodations
    // Return empty array for now, can be implemented later if needed
    return [];
  }

  async createRoom(room) {
    // Map to temple creation if needed
    return this.createTemple(room);
  }

  async updateRoom(id, updates) {
    // Map to temple update if needed
    return this.updateTemple(id, updates);
  }

  async deleteRoom(id) {
    // Map to temple deletion if needed
    return this.deleteTemple(id);
  }

  // Marriage Halls (for backward compatibility - map to temples)
  async getMarriageHalls() {
    // In Firebase version, marriage halls are managed as temples
    const temples = await this.getTemples();
    return temples.filter(temple => temple.type === 'hall' || temple.category === 'marriage_hall');
  }

  async createMarriageHall(hall) {
    return this.createTemple({ ...hall, type: 'hall', category: 'marriage_hall' });
  }

  async updateMarriageHall(id, updates) {
    return this.updateTemple(id, updates);
  }

  async deleteMarriageHall(id) {
    return this.deleteTemple(id);
  }

  // Site Content (for backward compatibility - map to settings)
  async getSiteContent() {
    try {
      const settings = await this.getSettings();
      // Convert settings to site content format
      return [
        { key: 'about', value: settings.aboutText || '' },
        { key: 'services', value: settings.servicesText || '' },
        { key: 'contact', value: settings.contactText || '' }
      ];
    } catch (error) {
      return [
        { key: 'about', value: '' },
        { key: 'services', value: '' },
        { key: 'contact', value: '' }
      ];
    }
  }

  // Admin
  async getDashboardStats() {
    return this.request('/admin/dashboard/stats');
  }

  async getUsers() {
    return this.request('/admin/users');
  }

  async updateUserRole(id, role) {
    return this.request(`/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async deactivateUser(id) {
    return this.request(`/admin/users/${id}/deactivate`, {
      method: 'PUT',
    });
  }

  async getSettings() {
    return this.request('/admin/settings');
  }

  async updateSettings(settings) {
    return this.request('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Admin Login (for backward compatibility)
  async adminLogin(username, password) {
    // In Firebase version, this could be mapped to Firebase Auth
    // For demo mode, always return success for any credentials
    console.log('Admin login attempt:', { username, password });
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: {
            id: 'admin',
            username: username || 'admin',
            role: 'admin'
          },
          token: 'demo-admin-token'
        });
      }, 500); // Simulate API delay
    });
  }

  async upsertSiteContent(key, value) {
    // Map to settings update
    const updateData = {};
    updateData[`${key}Text`] = value;
    return this.updateSettings(updateData);
  }

  // Update booking (for backward compatibility)
  async updateBooking(id, updates) {
    return this.updateBookingStatus(id, updates.status || 'confirmed');
  }

  // Update donation (for backward compatibility)  
  async updateDonation(id, updates) {
    return this.updateDonationStatus(id, updates.status || 'completed');
  }

  // Create gallery image (for backward compatibility)
  async createGalleryImage(image) {
    // Convert to FormData if needed
    const formData = new FormData();
    if (image.file) {
      formData.append('image', image.file);
    }
    if (image.title) formData.append('title', image.title);
    if (image.description) formData.append('description', image.description);
    if (image.category) formData.append('category', image.category);
    
    return this.uploadGalleryImage(formData);
  }
}

export const apiClient = new ApiClient();
