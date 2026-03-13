// Firebase API client - Direct Firebase operations
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebaseConfig';

class ApiClient {
  // Helper method to convert Firestore document to object
  docToObject(doc) {
    return { id: doc.id, ...doc.data() };
  }

  // Auth - User profiles
  async getUserProfile(uid) {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return this.docToObject(docSnap);
      } else {
        throw new Error('User profile not found');
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  async updateUserProfile(uid, updates) {
    try {
      const docRef = doc(db, 'users', uid);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  async register(userData) {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...userData };
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  // Temples
  async getTemples() {
    try {
      const querySnapshot = await getDocs(collection(db, 'temples'));
      return querySnapshot.docs.map(doc => this.docToObject(doc));
    } catch (error) {
      console.error('Error getting temples:', error);
      throw error;
    }
  }

  async getTemple(id) {
    try {
      const docRef = doc(db, 'temples', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return this.docToObject(docSnap);
      } else {
        throw new Error('Temple not found');
      }
    } catch (error) {
      console.error('Error getting temple:', error);
      throw error;
    }
  }

  async createTemple(temple) {
    try {
      const docRef = await addDoc(collection(db, 'temples'), {
        ...temple,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...temple };
    } catch (error) {
      console.error('Error creating temple:', error);
      throw error;
    }
  }

  async updateTemple(id, updates) {
    try {
      const docRef = doc(db, 'temples', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating temple:', error);
      throw error;
    }
  }

  async deleteTemple(id) {
    try {
      await deleteDoc(doc(db, 'temples', id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting temple:', error);
      throw error;
    }
  }

  // Sevas
  async getSevas() {
    try {
      const querySnapshot = await getDocs(collection(db, 'sevas'));
      return querySnapshot.docs.map(doc => this.docToObject(doc));
    } catch (error) {
      console.error('Error getting sevas:', error);
      throw error;
    }
  }

  async getSevasByTemple(templeId) {
    try {
      const q = query(collection(db, 'sevas'), where('templeId', '==', templeId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.docToObject(doc));
    } catch (error) {
      console.error('Error getting sevas by temple:', error);
      throw error;
    }
  }

  async createSeva(seva) {
    try {
      const docRef = await addDoc(collection(db, 'sevas'), {
        ...seva,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...seva };
    } catch (error) {
      console.error('Error creating seva:', error);
      throw error;
    }
  }

  async updateSeva(id, updates) {
    try {
      const docRef = doc(db, 'sevas', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating seva:', error);
      throw error;
    }
  }

  async deleteSeva(id) {
    try {
      await deleteDoc(doc(db, 'sevas', id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting seva:', error);
      throw error;
    }
  }

  // Bookings
  async getBookings() {
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.docToObject(doc));
    } catch (error) {
      console.error('Error getting bookings:', error);
      throw error;
    }
  }

  async getUserBookings(userId) {
    try {
      const q = query(
        collection(db, 'bookings'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.docToObject(doc));
    } catch (error) {
      console.error('Error getting user bookings:', error);
      throw error;
    }
  }

  async createBooking(booking) {
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...booking,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...booking };
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  async updateBookingStatus(id, status) {
    try {
      const docRef = doc(db, 'bookings', id);
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  }

  async updateBooking(id, updates) {
    try {
      const docRef = doc(db, 'bookings', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }

  async deleteBooking(id) {
    try {
      await deleteDoc(doc(db, 'bookings', id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  }

  // Donations
  async getDonations() {
    try {
      const q = query(collection(db, 'donations'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.docToObject(doc));
    } catch (error) {
      console.error('Error getting donations:', error);
      throw error;
    }
  }

  async getUserDonations(userId) {
    try {
      const q = query(
        collection(db, 'donations'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.docToObject(doc));
    } catch (error) {
      console.error('Error getting user donations:', error);
      throw error;
    }
  }

  async createDonation(donation) {
    try {
      const docRef = await addDoc(collection(db, 'donations'), {
        ...donation,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...donation };
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  }

  async updateDonationStatus(id, status) {
    try {
      const docRef = doc(db, 'donations', id);
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating donation status:', error);
      throw error;
    }
  }

  async updateDonation(id, updates) {
    try {
      const docRef = doc(db, 'donations', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating donation:', error);
      throw error;
    }
  }

  // Gallery
  async getGalleryImages() {
    try {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.docToObject(doc));
    } catch (error) {
      console.error('Error getting gallery images:', error);
      throw error;
    }
  }

  async uploadGalleryImage(formData) {
    try {
      const file = formData.get('image');
      const title = formData.get('title') || '';
      const description = formData.get('description') || '';
      const category = formData.get('category') || 'general';

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Save metadata to Firestore
      const docRef = await addDoc(collection(db, 'gallery'), {
        title,
        description,
        category,
        imageUrl: downloadURL,
        storagePath: snapshot.ref.fullPath,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return { 
        id: docRef.id, 
        title, 
        description, 
        category, 
        imageUrl: downloadURL 
      };
    } catch (error) {
      console.error('Error uploading gallery image:', error);
      throw error;
    }
  }

  async createGalleryImage(image) {
    // Convert to FormData format for consistency
    const formData = new FormData();
    if (image.file) {
      formData.append('image', image.file);
    }
    if (image.title) formData.append('title', image.title);
    if (image.description) formData.append('description', image.description);
    if (image.category) formData.append('category', image.category);
    
    return this.uploadGalleryImage(formData);
  }

  async updateGalleryImage(id, updates) {
    try {
      const docRef = doc(db, 'gallery', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating gallery image:', error);
      throw error;
    }
  }

  async deleteGalleryImage(id) {
    try {
      // Get the document to find the storage path
      const docRef = doc(db, 'gallery', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Delete from storage if path exists
        if (data.storagePath) {
          const storageRef = ref(storage, data.storagePath);
          await deleteObject(storageRef);
        }
      }
      
      // Delete from Firestore
      await deleteDoc(docRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      throw error;
    }
  }

  // Marriage Halls
  async getMarriageHalls() {
    try {
      const querySnapshot = await getDocs(collection(db, 'halls'));
      return querySnapshot.docs.map(doc => this.docToObject(doc));
    } catch (error) {
      console.error('Error getting marriage halls:', error);
      throw error;
    }
  }

  async createMarriageHall(hall) {
    try {
      const docRef = await addDoc(collection(db, 'halls'), {
        ...hall,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...hall };
    } catch (error) {
      console.error('Error creating marriage hall:', error);
      throw error;
    }
  }

  async updateMarriageHall(id, updates) {
    try {
      const docRef = doc(db, 'halls', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating marriage hall:', error);
      throw error;
    }
  }

  async deleteMarriageHall(id) {
    try {
      await deleteDoc(doc(db, 'halls', id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting marriage hall:', error);
      throw error;
    }
  }

  // Rooms (backward compatibility - map to temples)
  async getRooms() {
    return this.getTemples();
  }

  async createRoom(room) {
    return this.createTemple(room);
  }

  async updateRoom(id, updates) {
    return this.updateTemple(id, updates);
  }

  async deleteRoom(id) {
    return this.deleteTemple(id);
  }

  // Site Content
  async getSiteContent() {
    try {
      const querySnapshot = await getDocs(collection(db, 'siteContent'));
      return querySnapshot.docs.map(doc => ({
        key: doc.id,
        value: doc.data().content || ''
      }));
    } catch (error) {
      console.error('Error getting site content:', error);
      return [
        { key: 'about', value: '' },
        { key: 'services', value: '' },
        { key: 'contact', value: '' }
      ];
    }
  }

  async upsertSiteContent(key, value) {
    try {
      const docRef = doc(db, 'siteContent', key);
      await updateDoc(docRef, {
        content: value,
        updatedAt: serverTimestamp()
      }).catch(async () => {
        // Document doesn't exist, create it
        await addDoc(collection(db, 'siteContent'), {
          content: value,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      });
      return { success: true };
    } catch (error) {
      console.error('Error upserting site content:', error);
      throw error;
    }
  }

  // Admin functions
  async getDashboardStats() {
    try {
      const [temples, sevas, bookings, donations] = await Promise.all([
        this.getTemples(),
        this.getSevas(),
        this.getBookings(),
        this.getDonations()
      ]);

      return {
        temples: temples.length,
        sevas: sevas.length,
        bookings: bookings.length,
        donations: donations.length,
        totalDonations: donations.reduce((sum, d) => sum + (d.amount || 0), 0)
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      return {
        temples: 0,
        sevas: 0,
        bookings: 0,
        donations: 0,
        totalDonations: 0
      };
    }
  }

  async getUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      return querySnapshot.docs.map(doc => this.docToObject(doc));
    } catch (error) {
      console.error('Error getting users:', error);
      throw error;
    }
  }

  async updateUserRole(id, role) {
    try {
      const docRef = doc(db, 'users', id);
      await updateDoc(docRef, {
        role,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }

  async deactivateUser(id) {
    try {
      const docRef = doc(db, 'users', id);
      await updateDoc(docRef, {
        active: false,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error deactivating user:', error);
      throw error;
    }
  }

  async getSettings() {
    try {
      const docRef = doc(db, 'settings', 'general');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // Return default settings
        return {
          siteName: 'Temple Management System',
          aboutText: '',
          servicesText: '',
          contactText: ''
        };
      }
    } catch (error) {
      console.error('Error getting settings:', error);
      throw error;
    }
  }

  async updateSettings(settings) {
    try {
      const docRef = doc(db, 'settings', 'general');
      await updateDoc(docRef, {
        ...settings,
        updatedAt: serverTimestamp()
      }).catch(async () => {
        // Document doesn't exist, create it
        await addDoc(collection(db, 'settings'), {
          ...settings,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }

  // Admin Login (Firebase Auth based)
  async adminLogin(username, password) {
    // This should be handled by Firebase Auth in the AuthContext
    // For backward compatibility, return a demo response
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
          token: 'firebase-auth-token'
        });
      }, 500);
    });
  }
}

export const apiClient = new ApiClient();