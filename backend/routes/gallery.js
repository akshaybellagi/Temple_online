const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { db, bucket } = require('../firebaseConfig');
const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Upload image to Firebase Storage
const uploadImageToStorage = async (file) => {
  const fileName = `gallery/${uuidv4()}_${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', async () => {
      await fileUpload.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      resolve(publicUrl);
    });
    stream.end(file.buffer);
  });
};

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('gallery')
      .orderBy('createdAt', 'desc')
      .get();

    const images = [];
    snapshot.forEach(doc => {
      images.push({ id: doc.id, ...doc.data() });
    });

    res.json(images);
  } catch (error) {
    console.error('Gallery fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Upload new image (admin)
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageUrl = await uploadImageToStorage(req.file);
    
    const imageData = {
      url: imageUrl,
      title: req.body.title || '',
      description: req.body.description || '',
      category: req.body.category || 'general',
      createdAt: new Date(),
      isActive: true
    };

    const docRef = await db.collection('gallery').add(imageData);
    
    res.status(201).json({
      message: 'Image uploaded successfully',
      imageId: docRef.id,
      image: imageData
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update image details (admin)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    await db.collection('gallery').doc(id).update(updateData);
    
    res.json({ message: 'Image updated successfully' });
  } catch (error) {
    console.error('Image update error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete image (admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get image data to delete from storage
    const doc = await db.collection('gallery').doc(id).get();
    if (doc.exists) {
      const imageData = doc.data();
      if (imageData.url) {
        // Extract filename from URL and delete from storage
        const fileName = imageData.url.split('/').pop();
        try {
          await bucket.file(`gallery/${fileName}`).delete();
        } catch (storageError) {
          console.error('Storage deletion error:', storageError);
        }
      }
    }
    
    await db.collection('gallery').doc(id).delete();
    
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Image deletion error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;