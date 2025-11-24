# Admin Dashboard Documentation

## Access Admin Panel

**URL:** `http://localhost:3000/admin/login`

**Demo Credentials:**
- Username: `admin`
- Password: `admin123`

## Admin Features

### 1. Dashboard (`/admin/dashboard`)
- Overview statistics (bookings, donations, users)
- Quick access to all management sections
- Recent activity feed
- Real-time data visualization

### 2. Management Sections

#### Room Management (`/admin/rooms`)
- View all rooms and availability
- Update room pricing
- Manage room types and amenities
- Block/unblock dates

#### Marriage Hall Management (`/admin/halls`)
- Manage hall bookings
- Update pricing and capacity
- View booking calendar
- Approve/reject bookings

#### Donations Management (`/admin/donations`)
- View all donations
- Track donation categories
- Generate reports
- Export donation data

#### Bookings Management (`/admin/bookings`)
- View all bookings (rooms + halls)
- Filter by status, date, type
- Approve/reject bookings
- Send confirmation emails
- Manage cancellations

#### Gallery Management (`/admin/gallery`)
- Upload new images
- Organize by categories
- Delete images
- Update captions

#### Content Management (`/admin/content`)
- Edit About page content
- Update service descriptions
- Manage homepage sections
- Edit contact information

#### User Management (`/admin/users`)
- View all registered users
- Manage user roles
- Block/unblock users
- View user activity

#### Settings (`/admin/settings`)
- System configuration
- Email settings
- Payment gateway settings
- Backup and restore

## Security Features

- Protected routes (requires login)
- Session management
- Logout functionality
- Password encryption (in production)

## Future Enhancements

- Email notifications
- SMS integration
- Payment gateway integration
- Advanced analytics
- Export to PDF/Excel
- Multi-language support
- Role-based access control

## Development Notes

Current implementation uses localStorage for demo purposes.
In production, implement:
- Backend API with proper authentication
- JWT tokens
- Database integration
- Secure password hashing
- HTTPS only
