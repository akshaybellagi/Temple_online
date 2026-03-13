# 🔥 Firebase Setup Guide

Your Temple Online application is now connected to Firebase! Follow these steps to complete the setup.

## ✅ What's Already Done

- ✅ Firebase configuration added to the app
- ✅ API client updated to use Firestore directly
- ✅ Backend removed (no longer needed)
- ✅ React app running at http://localhost:3000

## 🚀 Next Steps in Firebase Console

### 1. Enable Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **helmets-store-eaaea**
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Email/Password** provider
5. Click **Save**

### 2. Create Firestore Database
1. Navigate to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for now)
4. Select your preferred location
5. Click **Done**

### 3. Enable Storage
1. Navigate to **Storage**
2. Click **Get started**
3. Choose **Start in test mode** (for now)
4. Select your preferred location
5. Click **Done**

### 4. Set Up Security Rules

#### Firestore Rules
Go to **Firestore Database** → **Rules** and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all users for now (development mode)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

#### Storage Rules
Go to **Storage** → **Rules** and replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

**Note**: These are permissive rules for development. For production, implement proper security rules.

## 🧪 Test Your Setup

1. **Open the app**: http://localhost:3000
2. **Check browser console** for Firebase connection messages
3. **Try creating an account** on the registration page
4. **Test admin login** at http://localhost:3000/admin/login

## 📊 Firebase Collections Structure

Your app will automatically create these collections:

### Core Collections
- **users** - User profiles and authentication data
- **temples** - Temple information and details
- **sevas** - Religious services and offerings
- **bookings** - Service bookings and reservations
- **donations** - Donation records and tracking
- **gallery** - Image gallery with metadata
- **halls** - Marriage hall information
- **siteContent** - Website content management
- **settings** - Application settings

## 🔧 Development Features

### Admin Panel
- **URL**: http://localhost:3000/admin/login
- **Test Credentials**: Any username/password (development mode)

### Available Features
- ✅ User registration and authentication
- ✅ Temple management
- ✅ Service (Seva) management
- ✅ Booking system
- ✅ Donation tracking
- ✅ Gallery management
- ✅ Admin dashboard
- ✅ Content management

## 🛡️ Security (Production)

For production deployment, update security rules:

### Secure Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read for temples and sevas
    match /temples/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /sevas/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users can manage their own bookings/donations
    match /bookings/{document} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    match /donations/{document} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

## 🚀 Deployment

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

## 🔍 Troubleshooting

### Common Issues

1. **"Firebase not initialized"**
   - Check that all Firebase services are enabled in console
   - Verify project ID matches in firebaseConfig.js

2. **"Permission denied"**
   - Check Firestore security rules
   - Ensure user is authenticated for protected operations

3. **"Storage upload failed"**
   - Check Storage security rules
   - Verify file size limits

4. **"Authentication failed"**
   - Ensure Email/Password provider is enabled
   - Check for typos in email/password

### Debug Mode
Open browser console to see detailed Firebase logs and connection status.

## 📞 Support

If you encounter issues:
1. Check browser console for error messages
2. Verify Firebase console settings
3. Test with simple operations first
4. Check network connectivity

---

**Your Temple Online application is now powered by Firebase! 🎉**