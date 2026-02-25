# Temple Online - Firebase Backend

A modern temple management system built with React frontend and Firebase backend.

## Features

- **Authentication**: Firebase Auth with user registration and login
- **Temple Management**: Create and manage multiple temples
- **Seva Management**: Manage religious services and offerings
- **Booking System**: Handle room and hall bookings
- **Donation Management**: Track and manage donations
- **Gallery**: Image gallery with Firebase Storage
- **Admin Dashboard**: Complete admin panel for management
- **Real-time Data**: Firebase Firestore for real-time updates

## Tech Stack

### Backend
- Node.js with Express
- Firebase Admin SDK
- Firebase Firestore (Database)
- Firebase Storage (File uploads)
- Firebase Authentication

### Frontend
- React 18
- React Router DOM
- Firebase SDK
- Context API for state management

## Setup Instructions

### 1. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage
3. Generate a service account key:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Download the JSON file

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-client-cert-url
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend directory:
```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Firebase Rules Setup

Deploy Firestore rules:
```bash
cd backend
firebase init firestore
firebase deploy --only firestore:rules
```

Deploy Storage rules:
```bash
firebase deploy --only storage
```

## Running the Application

### Development Mode

Start both frontend and backend:
```bash
# Root directory
npm start
```

Or start individually:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

### Production Deployment

Build frontend:
```bash
cd frontend
npm run build
```

Deploy to Firebase Hosting:
```bash
cd backend
firebase deploy
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile/:uid` - Get user profile
- `PUT /api/auth/profile/:uid` - Update user profile

### Temples
- `GET /api/temples` - Get all temples
- `GET /api/temples/:id` - Get temple by ID
- `POST /api/temples` - Create temple (admin)
- `PUT /api/temples/:id` - Update temple (admin)
- `DELETE /api/temples/:id` - Delete temple (admin)

### Sevas
- `GET /api/sevas` - Get all sevas
- `GET /api/sevas/temple/:templeId` - Get sevas by temple
- `POST /api/sevas` - Create seva (admin)
- `PUT /api/sevas/:id` - Update seva (admin)
- `DELETE /api/sevas/:id` - Delete seva (admin)

### Bookings
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/user/:userId` - Get user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/status` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

### Donations
- `GET /api/donations` - Get all donations (admin)
- `GET /api/donations/user/:userId` - Get user donations
- `POST /api/donations` - Create donation
- `PUT /api/donations/:id/status` - Update donation status

### Gallery
- `GET /api/gallery` - Get all images
- `POST /api/gallery/upload` - Upload image (admin)
- `PUT /api/gallery/:id` - Update image details (admin)
- `DELETE /api/gallery/:id` - Delete image (admin)

### Admin
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/deactivate` - Deactivate user
- `GET /api/admin/settings` - Get system settings
- `PUT /api/admin/settings` - Update system settings

## Project Structure

```
temple-online/
├── backend/
│   ├── routes/          # API routes
│   ├── firebaseConfig.js # Firebase configuration
│   ├── server.js        # Express server
│   ├── firebase.json    # Firebase config
│   ├── firestore.rules  # Firestore security rules
│   └── storage.rules    # Storage security rules
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React contexts
│   │   ├── firebaseConfig.js # Firebase client config
│   │   └── apiClient.js # API client
│   └── public/
└── package.json         # Root package.json
```

## Security

- Firebase Authentication handles user authentication
- Firestore security rules control data access
- Storage rules protect file uploads
- Admin routes require admin role verification
- Input validation on both client and server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.