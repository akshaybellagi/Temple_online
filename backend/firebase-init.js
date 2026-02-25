const { db } = require('./firebaseConfig');

// Initialize default data for the application
async function initializeFirebaseData() {
  try {
    console.log('🔥 Initializing Firebase data...');

    // Create default system settings
    await db.collection('settings').doc('system').set({
      siteName: 'Temple Online',
      contactEmail: 'admin@temple.com',
      contactPhone: '+1234567890',
      address: 'Temple Address, City, State, PIN',
      maintenanceMode: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { merge: true });

    // Create sample temple
    const templeRef = await db.collection('temples').add({
      name: 'Sample Temple',
      description: 'A beautiful temple for worship and spiritual activities',
      address: 'Temple Street, City, State, PIN',
      phone: '+1234567890',
      email: 'temple@example.com',
      timings: {
        morning: '6:00 AM - 12:00 PM',
        evening: '4:00 PM - 9:00 PM'
      },
      isActive: true,
      createdAt: new Date()
    });

    // Create sample sevas for the temple
    await db.collection('sevas').add({
      name: 'Abhishekam',
      description: 'Sacred ritual of bathing the deity',
      price: 500,
      duration: 30,
      templeId: templeRef.id,
      isActive: true,
      createdAt: new Date()
    });

    await db.collection('sevas').add({
      name: 'Archana',
      description: 'Offering prayers with flowers and chanting',
      price: 100,
      duration: 15,
      templeId: templeRef.id,
      isActive: true,
      createdAt: new Date()
    });

    await db.collection('sevas').add({
      name: 'Aarti',
      description: 'Evening prayer ceremony with lamps',
      price: 200,
      duration: 20,
      templeId: templeRef.id,
      isActive: true,
      createdAt: new Date()
    });

    console.log('✅ Firebase data initialized successfully!');
    console.log('📍 Sample temple created with ID:', templeRef.id);
    console.log('🙏 Sample sevas created');
    console.log('⚙️  System settings configured');
    
  } catch (error) {
    console.error('❌ Error initializing Firebase data:', error);
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeFirebaseData()
    .then(() => {
      console.log('🎉 Initialization complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Initialization failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeFirebaseData };