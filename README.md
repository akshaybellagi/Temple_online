# Spiritual Matha Website

A React-based website inspired by religious/spiritual organization websites, featuring room booking, seva services, gallery, and contact functionality with a comprehensive admin dashboard.

## Features

### Public Features
- **Home Page**: Hero section with featured services
- **About Page**: History, mission, and spiritual lineage
- **Services Page**: Daily pooja, special sevas, and e-services
- **Booking Page**: Room and seva booking forms
- **Gallery Page**: Filterable image gallery
- **Contact Page**: Contact form and location information
- **Responsive Design**: Fully mobile-responsive across all devices (320px - 1920px+)

### Admin Features
- **Admin Dashboard**: Comprehensive management interface
- **Booking Management**: View and manage room and hall bookings
- **Donation Management**: Track and manage donations
- **Gallery Management**: Upload and organize gallery images
- **Content Management**: Update website content dynamically
- **User Management**: Manage user accounts and permissions
- **Settings**: Configure website settings and preferences

## Admin Access

Access the admin panel at: [http://localhost:3000/admin](http://localhost:3000/admin)

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

For more details about admin features, see [README_ADMIN.md](README_ADMIN.md)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
```

## Mobile Responsive

The entire application is fully mobile responsive with:
- Touch-friendly buttons (minimum 44-48px touch targets)
- Adaptive layouts for all screen sizes
- iOS zoom prevention (16px minimum font size on inputs)
- Smooth scrolling and optimized performance
- Hamburger menu navigation on mobile
- Responsive grids and flexible layouts

Tested on devices from 320px to 1920px+ width.

## Customization

- Replace placeholder images with actual images
- Update content in page components
- Modify colors in CSS files (primary color: #dc143c)
- Add your contact information in Contact page
- Integrate payment gateway for bookings
- Add Google Maps integration
- Configure admin credentials in production
- Update admin dashboard statistics with real data

## Technologies Used

- React 18
- React Router DOM 6
- React Context API (for state management)
- CSS3 with Grid and Flexbox
- Responsive Design (Mobile-First Approach)
- Modern JavaScript (ES6+)

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── Header.css
│   ├── Footer.js
│   └── Footer.css
├── pages/
│   ├── Home.js
│   ├── Home.css
│   ├── About.js
│   ├── About.css
│   ├── Services.js
│   ├── Services.css
│   ├── Booking.js
│   ├── Booking.css
│   ├── Gallery.js
│   ├── Gallery.css
│   ├── Contact.js
│   ├── Contact.css
│   ├── LatestNews.js
│   ├── LiveStatus.js
│   ├── MyHistory.js
│   ├── Panchanga.js
│   ├── RoomsDonor.js
│   └── admin/
│       ├── AdminLogin.js
│       ├── AdminLogin.css
│       ├── AdminDashboard.js
│       ├── AdminDashboard.css
│       ├── AdminManage.css
│       ├── ManageBookings.js
│       ├── ManageDonations.js
│       ├── ManageGallery.js
│       ├── ManageContent.js
│       ├── ManageHalls.js
│       ├── ManageRooms.js
│       ├── ManageUsers.js
│       └── Settings.js
├── context/
│   └── DataContext.js
├── App.js
├── App.css
├── index.js
└── index.css
```

## License

This is a template project for educational purposes.
