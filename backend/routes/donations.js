const express = require('express');
const { db } = require('../firebaseConfig');
const router = express.Router();

// Create donation
router.post('/', async (req, res) => {
  try {
    const donationData = {
      ...req.body,
      createdAt: new Date(),
      status: 'pending',
      donationId: `DN${Date.now()}`
    };

    const docRef = await db.collection('donations').add(donationData);
    
    res.status(201).json({
      message: 'Donation created successfully',
      donationId: docRef.id,
      donation: donationData
    });
  } catch (error) {
    console.error('Donation creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user donations
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const snapshot = await db.collection('donations')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const donations = [];
    snapshot.forEach(doc => {
      donations.push({ id: doc.id, ...doc.data() });
    });

    res.json(donations);
  } catch (error) {
    console.error('User donations fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all donations (admin)
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('donations')
      .orderBy('createdAt', 'desc')
      .get();

    const donations = [];
    snapshot.forEach(doc => {
      donations.push({ id: doc.id, ...doc.data() });
    });

    res.json(donations);
  } catch (error) {
    console.error('All donations fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update donation status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.collection('donations').doc(id).update({
      status,
      updatedAt: new Date()
    });

    res.json({ message: 'Donation status updated successfully' });
  } catch (error) {
    console.error('Donation status update error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;