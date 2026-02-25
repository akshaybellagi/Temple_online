const express = require('express');
const { db } = require('../firebaseConfig');
const router = express.Router();

// Create booking
router.post('/', async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      createdAt: new Date(),
      status: 'pending',
      bookingId: `BK${Date.now()}`
    };

    const docRef = await db.collection('bookings').add(bookingData);
    
    res.status(201).json({
      message: 'Booking created successfully',
      bookingId: docRef.id,
      booking: bookingData
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user bookings
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const snapshot = await db.collection('bookings')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const bookings = [];
    snapshot.forEach(doc => {
      bookings.push({ id: doc.id, ...doc.data() });
    });

    res.json(bookings);
  } catch (error) {
    console.error('Bookings fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('bookings')
      .orderBy('createdAt', 'desc')
      .get();

    const bookings = [];
    snapshot.forEach(doc => {
      bookings.push({ id: doc.id, ...doc.data() });
    });

    res.json(bookings);
  } catch (error) {
    console.error('All bookings fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update booking status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.collection('bookings').doc(id).update({
      status,
      updatedAt: new Date()
    });

    res.json({ message: 'Booking status updated successfully' });
  } catch (error) {
    console.error('Booking status update error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.collection('bookings').doc(id).delete();
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Booking deletion error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;