const express = require('express');
const { db } = require('../firebaseConfig');
const router = express.Router();

// Get all temples
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('temples').get();
    
    const temples = [];
    snapshot.forEach(doc => {
      temples.push({ id: doc.id, ...doc.data() });
    });

    res.json(temples);
  } catch (error) {
    console.error('Temples fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get temple by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await db.collection('temples').doc(id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Temple not found' });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Temple fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create temple (admin)
router.post('/', async (req, res) => {
  try {
    const templeData = {
      ...req.body,
      createdAt: new Date(),
      isActive: true
    };

    // Handle timings - convert string to object if needed
    if (templeData.timings && typeof templeData.timings === 'string') {
      // If timings is a string like "6:00 AM - 12:00 PM | 4:00 PM - 9:00 PM"
      const timingParts = templeData.timings.split('|').map(t => t.trim());
      if (timingParts.length === 2) {
        templeData.timings = {
          morning: timingParts[0],
          evening: timingParts[1]
        };
      }
    }

    const docRef = await db.collection('temples').add(templeData);
    
    res.status(201).json({
      message: 'Temple created successfully',
      templeId: docRef.id
    });
  } catch (error) {
    console.error('Temple creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update temple (admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    // Handle timings - convert string to object if needed
    if (updateData.timings && typeof updateData.timings === 'string') {
      // If timings is a string like "6:00 AM - 12:00 PM | 4:00 PM - 9:00 PM"
      const timingParts = updateData.timings.split('|').map(t => t.trim());
      if (timingParts.length === 2) {
        updateData.timings = {
          morning: timingParts[0],
          evening: timingParts[1]
        };
      }
    }

    await db.collection('temples').doc(id).update(updateData);
    
    res.json({ message: 'Temple updated successfully' });
  } catch (error) {
    console.error('Temple update error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete temple (admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.collection('temples').doc(id).delete();
    
    res.json({ message: 'Temple deleted successfully' });
  } catch (error) {
    console.error('Temple deletion error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;