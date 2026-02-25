# Firebase Setup Guide for Temple Online

Your Firebase project `chatapp-ed2d3` is already configured in the environment files. Follow these steps to complete the setup:

## 1. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `chatapp-ed2d3`

## 2. Enable Required Services

### Authentication
1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** provider
3. Click **Save**

### Firestore Database
1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (we'll update rules later)
4. Select your preferred location
5. Click **Done**

### Storage
1. Go to **Storage**
2. Click **Get started**
3. Choose **Start in test mode**
4. Select the same location as Firestore
5. Click **Done**

## 3. Service Account Setup

1. Go to **Project Settings** (gear icon) > **Service accounts**
2. Click **Generate new private key**
3. Download the JSON file
4. Extract the following values and update `backend/.env`:

```env
FIREBASE_PRIVATE_KEY_ID=<private_key_id from JSON>
FIREBASE_PRIVATE_KEY="<private_key from JSON (keep the quotes and newlines)>"
FIREBASE_CLIENT_EMAIL=<client_email from JSON>
FIREBASE_CLIENT_ID=<client_id from JSON>
FIREBASE_CLIENT_X509_CERT_URL=<client_x509_cert_url from JSON>
```

## 4. Deploy Security Rules

After setting up the service account:

```bash
cd backend
npm install -g firebase-tools
firebase login
firebase use chatapp-ed2d3
firebase deploy --only firestore:rules
firebase deploy --only storage
```

## 5. Initialize Sample Data

```bash
cd backend
npm run init-data
```

## 6. Start the Application

```bash
# From root directory
npm start
```

## 7. Test the Setup

1. Backend should start on http://localhost:5000
2. Frontend should start on http://localhost:3000
3. Visit http://localhost:5000/api/health to verify backend
4. Try registering a new user to test Firebase Auth

## Current Configuration

- **Project ID**: chatapp-ed2d3
- **Auth Domain**: chatapp-ed2d3.firebaseapp.com
- **Storage Bucket**: chatapp-ed2d3.firebasestorage.app
- **API Key**: AIzaSyA-E0lHbw4cd5elwmco29Aoxy69k4r2Tn4

## Troubleshooting

### Common Issues:

1. **"Permission denied" errors**: Make sure Firestore and Storage rules are deployed
2. **"Service account" errors**: Verify the service account JSON values in backend/.env
3. **"Auth domain" errors**: Ensure the auth domain is added to authorized domains in Firebase Console

### Verify Setup:

```bash
# Test backend connection
curl http://localhost:5000/api/health

# Check Firebase connection
cd backend
node -e "require('./firebaseConfig'); console.log('Firebase connected successfully!');"
```

## Next Steps

1. Complete the service account setup
2. Deploy the security rules
3. Initialize sample data
4. Start developing your temple management features!

The application includes:
- User authentication and registration
- Temple and seva management
- Booking system
- Donation tracking
- Image gallery
- Admin dashboard

All configured to work with your Firebase project `chatapp-ed2d3`.