# 🏛️ Temple Online - Firebase Edition

A modern, comprehensive temple management system built with React frontend and Firebase backend. This application provides a complete solution for managing temple operations, services, bookings, donations, and administrative tasks.

![Temple Online](https://img.shields.io/badge/Temple-Online-red?style=for-the-badge&logo=firebase)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange?style=flat-square&logo=firebase)

## 🌟 Features

### 🔐 **Authentication & User Management**
- Firebase Authentication with email/password
- User registration and profile management
- Role-based access control (Admin/User)
- Secure session management

### 🏛️ **Temple Management**
- Multiple temple support
- Temple information and timings management
- Service scheduling and management
- Real-time updates with Firestore

### 🙏 **Seva (Religious Services) Management**
- Create and manage various sevas
- Pricing and duration configuration
- Temple-specific seva assignments
- Booking and scheduling system

### 📅 **Booking System**
- Room and hall reservations
- Real-time availability checking
- Booking status management
- User booking history

### 💰 **Donation Management (E-Hundi)**
- Online donation processing
- Multiple donation categories
- Donation tracking and receipts
- Admin donation oversight

### 🖼️ **Gallery Management**
- Image upload to Firebase Storage
- Gallery categorization
- Admin image management
- Responsive image display

### 📊 **Admin Dashboard**
- Comprehensive analytics
- User management
- Content management
- System settings configuration
- Real-time statistics

### 🎨 **Modern UI/UX**
- Responsive design for all devices
- Clean and intuitive interface
- Accessibility compliant
- Fast loading and smooth navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- Firebase account

### 1. Clone Repository
```bash
git clone https://github.com/akshaybellagi/Temple_online.git
cd Temple_online
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Start Application
```bash
npm start
```

The application will start at:
- **Frontend**: http://localhost:3000

### 4. Access Admin Panel
- **URL**: http://localhost:3000/admin/login

## 🔧 Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library
- **CSS3** - Custom styling with responsive design
- **Firebase SDK** - Client-side Firebase integration

### **Database & Storage**
- **Firestore** - NoSQL document database
- **Firebase Storage** - File storage service
- **Firebase Auth** - Authentication service

## 📁 Project Structure

```
temple-online/
├── 📁 frontend/               # React frontend
│   ├── 📁 src/
│   │   ├── 📁 components/    # Reusable components
│   │   ├── 📁 pages/         # Page components
│   │   │   ├── 📁 admin/     # Admin panel pages
│   │   │   └── ...           # Public pages
│   │   ├── 📁 context/       # React contexts
│   │   │   ├── AuthContext.js    # Authentication
│   │   │   └── DataContext.js    # Data management
│   │   ├── 📁 utils/         # Utility functions
│   │   ├── firebaseConfig.js # Firebase client config
│   │   └── apiClient.js      # Firebase API client
│   └── 📁 public/            # Static assets
├── 📄 README.md              # This file
└── 📄 package.json           # Root package configuration
```

## 🔥 Firebase Configuration

Your Firebase configuration is now set up with the following credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbK2WpPQEonNZa4C3Vkl_gbbc7tQ53Hi4",
  authDomain: "helmets-store-eaaea.firebaseapp.com",
  projectId: "helmets-store-eaaea",
  storageBucket: "helmets-store-eaaea.firebasestorage.app",
  messagingSenderId: "32286703885",
  appId: "1:32286703885:web:c57d3096d07d6baecef044",
  measurementId: "G-H6NMQX65Y8"
};
```

### Firebase Services Enabled
- **Authentication** - User login/registration
- **Firestore Database** - Data storage
- **Storage** - File uploads
- **Analytics** - Usage tracking

## 📚 Firebase Collections Structure

The application uses the following Firestore collections:

### Users Collection (`users`)
```javascript
{
  id: "user-id",
  email: "user@example.com",
  displayName: "User Name",
  role: "user" | "admin",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Temples Collection (`temples`)
```javascript
{
  id: "temple-id",
  name: "Temple Name",
  location: "Temple Location",
  description: "Temple Description",
  timings: "6:00 AM - 9:00 PM",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Sevas Collection (`sevas`)
```javascript
{
  id: "seva-id",
  name: "Seva Name",
  description: "Seva Description",
  price: 500,
  duration: "30 minutes",
  templeId: "temple-id",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Bookings Collection (`bookings`)
```javascript
{
  id: "booking-id",
  userId: "user-id",
  sevaId: "seva-id",
  templeId: "temple-id",
  date: "2026-03-15",
  time: "10:00 AM",
  status: "pending" | "confirmed" | "cancelled",
  amount: 500,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Donations Collection (`donations`)
```javascript
{
  id: "donation-id",
  userId: "user-id",
  amount: 1000,
  purpose: "General Donation",
  status: "pending" | "completed",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Gallery Collection (`gallery`)
```javascript
{
  id: "image-id",
  title: "Image Title",
  description: "Image Description",
  category: "festival" | "temple" | "general",
  imageUrl: "https://storage.googleapis.com/...",
  storagePath: "gallery/image.jpg",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🛡️ Security Features

### Firestore Security Rules
Configure these rules in your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Public read access for temples and sevas
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
    
    // Users can read their own bookings/donations
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
    
    // Gallery - public read, admin write
    match /gallery/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Storage Security Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 🚀 Deployment

### Firebase Hosting
```bash
# Build frontend
cd frontend
npm run build

# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy
```

### Vercel Deployment
The project includes `vercel.json` for easy Vercel deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 🔧 Development

### Start Development Server
```bash
# Start frontend only
npm start

# Or use the shell script (macOS/Linux)
./start-dev.sh

# Or use the batch file (Windows)
start-dev.bat
```

### Available Scripts
```bash
npm run install:all      # Install frontend dependencies
npm start               # Start development server
npm run build          # Build for production
npm test               # Run tests
```

## 📱 Features Overview

### Public Features
- **Home Page** - Temple information and services
- **About** - Temple history and information
- **Services** - Available sevas and pricing
- **Gallery** - Temple photos and events
- **Contact** - Contact information and location
- **Booking** - Service booking system
- **User Registration/Login** - Account management

### Admin Features
- **Dashboard** - Statistics and overview
- **Manage Temples** - Add/edit temple information
- **Manage Sevas** - Service management
- **Manage Bookings** - Booking oversight
- **Manage Donations** - Donation tracking
- **Manage Gallery** - Image management
- **Manage Users** - User administration
- **Settings** - System configuration

## 🔧 Troubleshooting

### Common Issues

#### Firebase Connection
- Ensure Firebase project is properly configured
- Check that Authentication, Firestore, and Storage are enabled
- Verify security rules are set up correctly

#### Build Errors
- Clear node_modules and reinstall: `rm -rf frontend/node_modules && cd frontend && npm install`
- Check for any missing dependencies

#### Authentication Issues
- Verify Firebase Auth is enabled in console
- Check that email/password provider is enabled
- Ensure proper error handling in AuthContext

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the **MIT License**.

## 👥 Authors

- **Akshay Bellagi** - *Initial work* - [@akshaybellagi](https://github.com/akshaybellagi)

## 📞 Support

For support, create an issue on GitHub.

---

**Built with ❤️ for the temple community using Firebase**