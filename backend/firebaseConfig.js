const admin = require('firebase-admin');
require('dotenv').config();

// Check if we're in demo mode or have valid credentials
const isDemoMode = process.env.DEMO_MODE === 'true';
const hasValidCredentials = process.env.FIREBASE_PRIVATE_KEY && 
  !process.env.FIREBASE_PRIVATE_KEY.includes('your-') &&
  !process.env.FIREBASE_PRIVATE_KEY.includes('Demo key');

if (!hasValidCredentials && !isDemoMode) {
  console.error('❌ Missing Firebase configuration:');
  console.error('Please update the following environment variables in backend/.env:');
  console.error('   - FIREBASE_PRIVATE_KEY');
  console.error('   - FIREBASE_CLIENT_EMAIL');
  console.error('\n📋 To get these values:');
  console.error('1. Go to Firebase Console → Project Settings → Service Accounts');
  console.error('2. Click "Generate new private key"');
  console.error('3. Download the JSON file and extract the values');
  console.error('4. Update backend/.env with the actual values');
  console.error('\n📖 See FIREBASE_SETUP.md for detailed instructions');
  console.error('\n🔧 Or set DEMO_MODE=true in .env to run without Firebase');
  process.exit(1);
}

let db, bucket, auth;

if (isDemoMode) {
  console.log('🚧 Running in DEMO MODE - Firebase features disabled');
  console.log('📝 Data will be stored in memory only');
  
  // Create mock objects for demo mode with sample data
  const mockData = {
    users: new Map(),
    temples: new Map([
      ['1', {
        id: '1',
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
      }]
    ]),
    sevas: new Map([
      ['1', {
        id: '1',
        name: 'Abhishekam',
        description: 'Sacred ritual of bathing the deity',
        price: 500,
        duration: 30,
        templeId: '1',
        isActive: true,
        createdAt: new Date()
      }],
      ['2', {
        id: '2',
        name: 'Archana',
        description: 'Offering prayers with flowers and chanting',
        price: 100,
        duration: 15,
        templeId: '1',
        isActive: true,
        createdAt: new Date()
      }],
      ['3', {
        id: '3',
        name: 'Aarti',
        description: 'Evening prayer ceremony with lamps',
        price: 200,
        duration: 20,
        templeId: '1',
        isActive: true,
        createdAt: new Date()
      }]
    ]),
    bookings: new Map(),
    donations: new Map(),
    gallery: new Map(),
    settings: new Map([
      ['system', {
        id: 'system',
        siteName: 'Temple Online',
        contactEmail: 'admin@temple.com',
        contactPhone: '+1234567890',
        address: 'Temple Address, City, State, PIN',
        maintenanceMode: false,
        aboutText: 'Welcome to our sacred temple. We provide spiritual services and peaceful environment for worship.',
        servicesText: 'We offer various sevas including Abhishekam, Archana, and Aarti ceremonies.',
        contactText: 'Visit us or contact us for any spiritual guidance and temple services.',
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    ])
  };

  // Mock Firestore
  db = {
    collection: (name) => ({
      add: async (data) => {
        const id = Date.now().toString();
        mockData[name].set(id, { id, ...data });
        return { id };
      },
      doc: (id) => ({
        get: async () => ({
          exists: mockData[name].has(id),
          data: () => mockData[name].get(id),
          id
        }),
        set: async (data, options = {}) => {
          if (options.merge) {
            const existing = mockData[name].get(id) || {};
            mockData[name].set(id, { ...existing, ...data, id });
          } else {
            mockData[name].set(id, { ...data, id });
          }
        },
        update: async (data) => {
          const existing = mockData[name].get(id) || {};
          mockData[name].set(id, { ...existing, ...data, id });
        },
        delete: async () => {
          mockData[name].delete(id);
        }
      }),
      get: async () => ({
        forEach: (callback) => {
          mockData[name].forEach((doc, id) => {
            callback({ id, data: () => doc });
          });
        },
        size: mockData[name].size
      }),
      where: () => ({ get: async () => ({ forEach: () => {}, size: 0 }) }),
      orderBy: () => ({ get: async () => ({ forEach: () => {}, size: 0 }) }),
      limit: () => ({ get: async () => ({ forEach: () => {}, size: 0 }) })
    })
  };

  // Mock Storage
  bucket = {
    file: () => ({
      createWriteStream: () => ({
        on: (event, callback) => {
          if (event === 'finish') setTimeout(callback, 100);
        },
        end: () => {}
      }),
      makePublic: async () => {},
      delete: async () => {}
    })
  };

  // Mock Auth
  auth = {
    createUser: async (userData) => ({
      uid: Date.now().toString(),
      ...userData
    }),
    updateUser: async () => ({}),
    getUser: async (uid) => ({ uid })
  };

} else {
  // Initialize Firebase Admin SDK with real credentials
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  };

  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
      });
    }

    db = admin.firestore();
    bucket = admin.storage().bucket();
    auth = admin.auth();

    console.log('✅ Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
    console.error('\n📋 Please check your Firebase service account credentials in backend/.env');
    console.error('📖 See FIREBASE_SETUP.md for setup instructions');
    process.exit(1);
  }
}

module.exports = { admin: admin || {}, db, bucket, auth, isDemoMode };