# 🏛️ Temple Online - Firebase Edition

A modern, comprehensive temple management system built with React frontend and Firebase backend. This application provides a complete solution for managing temple operations, services, bookings, donations, and administrative tasks.

![Temple Online](https://img.shields.io/badge/Temple-Online-red?style=for-the-badge&logo=firebase)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange?style=flat-square&logo=firebase)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)

## 🌟 Features

### 🔐 **Authentication & User Management**
- Firebase Authentication with email/password
- User registration and profile management
- Role-based access control (Admin/User)
- Secure session management

### 🏛️ **Temple Management**
- Multiple temple support
- Temple information and timings
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
- Firebase account (optional for demo mode)

### 1. Clone Repository
```bash
git clone https://github.com/akshaybellagi/Temple_online.git
cd Temple_online
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Start in Demo Mode
```bash
npm start
```

The application will start in demo mode with:
- **Backend**: http://localhost:5001
- **Frontend**: http://localhost:3000
- **Sample Data**: Pre-loaded temples and sevas

### 4. Access Admin Panel
- **URL**: http://localhost:3000/admin/login
- **Demo Credentials**: Any username/password works in demo mode

## 🔧 Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **React Icons** - Icon library
- **CSS3** - Custom styling with responsive design
- **Firebase SDK** - Client-side Firebase integration

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Firebase Admin SDK** - Server-side Firebase
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### **Database & Storage**
- **Firestore** - NoSQL document database
- **Firebase Storage** - File storage service
- **Firebase Auth** - Authentication service

### **Development Tools**
- **Nodemon** - Development server
- **Concurrently** - Run multiple scripts
- **ESLint** - Code linting
- **Git** - Version control

## 📁 Project Structure

```
temple-online/
├── 📁 backend/                 # Firebase backend
│   ├── 📁 routes/             # API routes
│   │   ├── auth.js           # Authentication routes
│   │   ├── temples.js        # Temple management
│   │   ├── sevas.js          # Seva management
│   │   ├── bookings.js       # Booking system
│   │   ├── donations.js      # Donation handling
│   │   ├── gallery.js        # Image management
│   │   └── admin.js          # Admin operations
│   ├── firebaseConfig.js     # Firebase configuration
│   ├── server.js             # Express server
│   ├── firebase.json         # Firebase project config
│   ├── firestore.rules       # Database security rules
│   └── storage.rules         # Storage security rules
├── 📁 frontend/               # React frontend
│   ├── 📁 src/
│   │   ├── 📁 components/    # Reusable components
│   │   ├── 📁 pages/         # Page components
│   │   │   ├── 📁 admin/     # Admin panel pages
│   │   │   └── ...           # Public pages
│   │   ├── 📁 context/       # React contexts
│   │   │   ├── AuthContext.js    # Authentication
│   │   │   └── DataContext.js    # Data management
│   │   ├── firebaseConfig.js # Firebase client config
│   │   └── apiClient.js      # API communication
│   └── 📁 public/            # Static assets
├── 📄 README.md              # This file
├── 📄 FIREBASE_SETUP.md      # Firebase setup guide
└── 📄 package.json           # Root package configuration
```

## 🔥 Firebase Setup (Production)

For production deployment with real Firebase:

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Authentication, Firestore, and Storage

### 2. Configure Environment
```bash
# Backend (.env)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-client-email
# ... other Firebase credentials

# Frontend (.env)
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
# ... other Firebase config
```

### 3. Deploy Security Rules
```bash
cd backend
firebase login
firebase use your-project-id
firebase deploy --only firestore:rules,storage
```

### 4. Initialize Sample Data
```bash
cd backend
npm run init-data
```

Detailed setup instructions: [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

## 🎯 Demo Mode

The application includes a comprehensive demo mode that works without Firebase setup:

### Features
- ✅ **In-memory data storage** - No external dependencies
- ✅ **Sample data** - Pre-loaded temples, sevas, and settings
- ✅ **Mock authentication** - Any credentials work
- ✅ **Full functionality** - All features available
- ✅ **Fast development** - Instant setup and testing

### Sample Data Included
- **Temple**: "Sample Temple" with complete information
- **Sevas**: Abhishekam (₹500), Archana (₹100), Aarti (₹200)
- **Settings**: Site content and configuration
- **Admin Access**: Use any username/password

## 📚 API Documentation

### Authentication Endpoints
```
POST /api/auth/register          # Register new user
GET  /api/auth/profile/:uid      # Get user profile
PUT  /api/auth/profile/:uid      # Update user profile
```

### Temple Management
```
GET    /api/temples              # Get all temples
GET    /api/temples/:id          # Get temple by ID
POST   /api/temples              # Create temple (admin)
PUT    /api/temples/:id          # Update temple (admin)
DELETE /api/temples/:id          # Delete temple (admin)
```

### Seva Management
```
GET    /api/sevas                # Get all sevas
GET    /api/sevas/temple/:id     # Get sevas by temple
POST   /api/sevas                # Create seva (admin)
PUT    /api/sevas/:id            # Update seva (admin)
DELETE /api/sevas/:id            # Delete seva (admin)
```

### Booking System
```
GET    /api/bookings             # Get all bookings (admin)
GET    /api/bookings/user/:uid   # Get user bookings
POST   /api/bookings             # Create booking
PUT    /api/bookings/:id/status  # Update booking status
DELETE /api/bookings/:id         # Delete booking
```

### Donation Management
```
GET    /api/donations            # Get all donations (admin)
GET    /api/donations/user/:uid  # Get user donations
POST   /api/donations            # Create donation
PUT    /api/donations/:id/status # Update donation status
```

### Gallery Management
```
GET    /api/gallery              # Get all images
POST   /api/gallery/upload       # Upload image (admin)
PUT    /api/gallery/:id          # Update image (admin)
DELETE /api/gallery/:id          # Delete image (admin)
```

### Admin Operations
```
GET /api/admin/dashboard/stats   # Dashboard statistics
GET /api/admin/users             # Get all users
PUT /api/admin/users/:id/role    # Update user role
GET /api/admin/settings          # Get system settings
PUT /api/admin/settings          # Update system settings
```

## 🛡️ Security Features

### Database Security
- **Firestore Rules** - Role-based data access
- **Input Validation** - Server-side validation
- **Authentication Required** - Protected endpoints
- **Admin Verification** - Admin-only operations

### File Upload Security
- **Storage Rules** - Secure file access
- **File Type Validation** - Image uploads only
- **Size Limits** - 5MB maximum file size
- **Public URL Generation** - Secure file serving

### Authentication Security
- **Firebase Auth** - Industry-standard security
- **Session Management** - Secure token handling
- **Role-based Access** - User/Admin permissions
- **Password Security** - Firebase password policies

## 🚀 Deployment

### Firebase Hosting
```bash
# Build frontend
cd frontend
npm run build

# Deploy to Firebase
cd ../backend
firebase deploy
```

### Custom Server
```bash
# Build frontend
npm run build:frontend

# Start production server
cd backend
npm start
```

### Environment Variables
Ensure all environment variables are configured for production deployment.

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Akshay Bellagi** - *Initial work* - [@akshaybellagi](https://github.com/akshaybellagi)

## 🙏 Acknowledgments

- Firebase team for excellent backend services
- React community for amazing frontend framework
- Open source contributors for various libraries used
- Temple management community for feature insights

## 📞 Support

For support, email [support@temple-online.com](mailto:support@temple-online.com) or create an issue on GitHub.

## 🔗 Links

- **Repository**: [https://github.com/akshaybellagi/Temple_online](https://github.com/akshaybellagi/Temple_online)
- **Demo**: [Live Demo](https://temple-online-demo.web.app) *(Coming Soon)*
- **Documentation**: [Firebase Setup Guide](FIREBASE_SETUP.md)

---

**Built with ❤️ for the temple community**