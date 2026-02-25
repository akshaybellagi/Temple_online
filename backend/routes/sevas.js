const express = require('express');
const { db } = require('../firebaseConfig');
const router = express.Router();

// Get all sevas
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('sevas').get();
    
    const sevas = [];
    snapshot.forEach(doc => {
      sevas.push({ id: doc.id, ...doc.data() });
    });

    res.json(sevas);
  } catch (error) {
    console.error('Sevas fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get sevas by temple
router.get('/temple/:templeId', async (req, res) => {
  try {
    const { templeId } = req.params;
    
    const snapshot = await db.collection('sevas')
      .where('templeId', '==', templeId)
      .get();

    const sevas = [];
    snapshot.forEach(doc => {
      sevas.push({ id: doc.id, ...doc.data() });
    });

    res.json(sevas);
  } catch (error) {
    console.error('Temple sevas fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create seva (admin)
router.post('/', async (req, res) => {
  try {
    const sevaData = {
      ...req.body,
      createdAt: new Date(),
      isActive: true
    };

    const docRef = await db.collection('sevas').add(sevaData);
    
    res.status(201).json({
      message: 'Seva created successfully',
      sevaId: docRef.id
    });
  } catch (error) {
    console.error('Seva creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update seva (admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    await db.collection('sevas').doc(id).update(updateData);
    
    res.json({ message: 'Seva updated successfully' });
  } catch (error) {
    console.error('Seva update error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete seva (admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.collection('sevas').doc(id).delete();
    
    res.json({ message: 'Seva deleted successfully' });
  } catch (error) {
    console.error('Seva deletion error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;