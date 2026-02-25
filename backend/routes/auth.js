const express = require('express');
const { auth, db } = require('../firebaseConfig');
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
      phoneNumber: phone
    });

    // Store additional user data in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name,
      email,
      phone,
      role: 'user',
      createdAt: new Date(),
      isActive: true
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: userRecord.uid
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get user profile
router.get('/profile/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    
    const userDoc = await db.collection('users').doc(uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userDoc.data());
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const updateData = req.body;
    
    await db.collection('users').doc(uid).update({
      ...updateData,
      updatedAt: new Date()
    });

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;