# Spiritual Matha Website

A React-based website inspired by religious/spiritual organization websites, featuring room booking, seva services, gallery, and contact functionality with a comprehensive admin dashboard. Now powered by Supabase for cloud database storage.

## Features

### Public Features

#### Home Page
- Hero section with welcome message and call-to-action
- Featured services showcase
- Quick access to booking and donations
- Latest news and announcements section
- Responsive carousel/slider for highlights
- Direct navigation to key sections

#### About Page
- Organization history and background
- Mission and vision statements
- Spiritual lineage and traditions
- Leadership and management information
- Values and principles
- Photo gallery of the organization

#### Services Page
- **Daily Pooja Services**: Regular worship schedules and timings
- **Special Sevas**: Festival-specific and special occasion services
- **E-Services**: Online booking for various religious services
- Service descriptions with pricing
- Booking integration for each service
- Service categories and filtering

#### Booking Page
- **Room Booking**: 
  - Select check-in/check-out dates
  - Choose room type (AC/Non-AC, Single/Double)
  - Guest information form
  - Special requirements field
  - Real-time availability checking
- **Hall Booking**:
  - Event date and time selection
  - Hall capacity and amenities
  - Purpose of booking
  - Contact details
- **Seva Booking**:
  - Choose seva type
  - Select date and time slot
  - Devotee information
  - Special instructions
- Form validation and confirmation
- Receipt generation after booking

#### Gallery Page
- Filterable image gallery (All, Events, Temple, Activities)
- Lightbox view for full-size images
- Image categories and tags
- Responsive grid layout
- Lazy loading for performance
- Upload date and descriptions

#### Contact Page
- Contact form with validation
- Organization address and location
- Phone numbers and email
- Office hours
- Google Maps integration (ready)
- Social media links
- Quick inquiry form

#### Additional Pages
- **Latest News**: Recent announcements and updates
- **Live Status**: Real-time darshan and event status
- **My History**: User's booking and donation history
- **Panchanga**: Daily Hindu calendar and auspicious timings
- **Rooms/Donor**: Room availability and donor information

#### General Features
- Fully responsive design (320px - 1920px+)
- Mobile-first approach
- Touch-friendly interface
- Fast loading and optimized performance
- Cross-browser compatibility
- Accessibility features

### Admin Features

#### Admin Dashboard
- Overview statistics (bookings, donations, users)
- Recent activity feed
- Quick action buttons
- Revenue and analytics charts
- Pending approvals summary
- System health status

#### Manage Bookings
- View all room, hall, and seva bookings
- Filter by date, status, type
- Approve/reject booking requests
- Edit booking details
- Cancel bookings with reasons
- Export booking reports
- Send confirmation emails
- Check-in/check-out management

#### Manage Donations
- Track all donations
- Donor information management
- Payment status tracking
- Generate donation receipts
- Filter by amount, date, purpose
- Export donation reports
- Send thank you messages
- Tax exemption certificate generation

#### Manage Gallery
- Upload multiple images
- Add image descriptions and tags
- Categorize images (Events, Temple, Activities)
- Delete or archive images
- Reorder gallery items
- Bulk operations
- Image optimization

#### Manage Content
- Edit home page content
- Update about page information
- Modify service descriptions
- Change contact information
- Update news and announcements
- Manage featured content
- SEO settings

#### Manage Halls
- Add/edit/delete halls
- Set hall capacity and amenities
- Configure pricing
- Manage availability calendar
- Upload hall images
- Set booking rules

#### Manage Rooms
- Add/edit/delete rooms
- Room types and categories
- Pricing configuration
- Availability management
- Room amenities
- Occupancy settings

#### Manage Sevas
- Add/edit/delete seva services
- Set seva timings and schedules
- Configure pricing
- Manage seva categories
- Set booking limits
- Special requirements

#### Manage Temples
- Add multiple temple locations
- Temple information and history
- Deity details
- Darshan timings
- Festival calendar
- Temple images and videos

#### Manage Users
- View all registered users
- User role management (Admin, Staff, User)
- Activate/deactivate accounts
- Reset passwords
- View user activity logs
- Export user data

#### Settings
- General website settings
- Email configuration
- Payment gateway integration
- Notification preferences
- Backup and restore
- Security settings
- Theme customization

## Database

This application uses **Supabase** as its backend database, replacing the previous localStorage implementation. This provides:
- Persistent cloud storage
- Multi-user data sharing
- Real-time capabilities
- Scalable PostgreSQL database
- Built-in security with Row Level Security (RLS)

## Admin Access

Access the admin panel at: [http://localhost:3000/admin](http://localhost:3000/admin)

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

**Important:** Change these credentials in production by updating the admin user in Supabase database.

## Installation

1. **Clone the repository**

2. **Install dependencies:**
```bash
npm install
```

3. **Set up Supabase:**
   - Create a free account at [supabase.com](https://supabase.com)
   - Create a new project
   - Go to SQL Editor and run the schema from `supabase-schema.sql`
   - Get your API credentials from Settings > API

4. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your-project-url
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Start the app:**
```bash
npm start
```

6. **Open [http://localhost:3000](http://localhost:3000) in your browser**

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
- Customize Supabase database schema as needed

## Technologies Used

- React 18
- React Router DOM 6
- React Context API (for state management)
- Supabase (Backend & Database)
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
