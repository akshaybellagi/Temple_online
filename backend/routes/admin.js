const express = require('express');
const { db, auth } = require('../firebaseConfig');
const router = express.Router();

// Get dashboard stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    const [usersSnapshot, bookingsSnapshot, donationsSnapshot, templesSnapshot] = await Promise.all([
      db.collection('users').get(),
      db.collection('bookings').get(),
      db.collection('donations').get(),
      db.collection('temples').get()
    ]);

    const stats = {
      totalUsers: usersSnapshot.size,
      totalBookings: bookingsSnapshot.size,
      totalDonations: donationsSnapshot.size,
      totalTemples: templesSnapshot.size,
      recentBookings: [],
      recentDonations: []
    };

    // Get recent bookings
    const recentBookingsSnapshot = await db.collection('bookings')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();
    
    recentBookingsSnapshot.forEach(doc => {
      stats.recentBookings.push({ id: doc.id, ...doc.data() });
    });

    // Get recent donations
    const recentDonationsSnapshot = await db.collection('donations')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();
    
    recentDonationsSnapshot.forEach(doc => {
      stats.recentDonations.push({ id: doc.id, ...doc.data() });
    });

    res.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all users (admin)
router.get('/users', async (req, res) => {
  try {
    const snapshot = await db.collection('users')
      .orderBy('createdAt', 'desc')
      .get();

    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.json(users);
  } catch (error) {
    console.error('Users fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update user role (admin)
router.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    await db.collection('users').doc(id).update({
      role,
      updatedAt: new Date()
    });

    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('User role update error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Deactivate user (admin)
router.put('/users/:id/deactivate', async (req, res) => {
  try {
    const { id } = req.params;

    // Disable user in Firebase Auth
    await auth.updateUser(id, { disabled: true });

    // Update user status in Firestore
    await db.collection('users').doc(id).update({
      isActive: false,
      updatedAt: new Date()
    });

    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('User deactivation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get system settings
router.get('/settings', async (req, res) => {
  try {
    const doc = await db.collection('settings').doc('system').get();
    
    if (!doc.exists) {
      // Return default settings if none exist
      const defaultSettings = {
        siteName: 'Temple Online',
        contactEmail: 'admin@temple.com',
        contactPhone: '+1234567890',
        address: 'Temple Address',
        maintenanceMode: false
      };
      return res.json(defaultSettings);
    }

    res.json(doc.data());
  } catch (error) {
    console.error('Settings fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update system settings
router.put('/settings', async (req, res) => {
  try {
    const settingsData = {
      ...req.body,
      updatedAt: new Date()
    };

    await db.collection('settings').doc('system').set(settingsData, { merge: true });
    
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Settings update error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;