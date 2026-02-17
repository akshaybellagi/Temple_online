# Temples Management Setup Guide

## Problem
Admin added a temple but it's not showing in the database or website because the temples feature didn't exist.

## Solution
I've added a complete temples management system to your application.

## What Was Added

### 1. Database Table
- Created `temples` table with fields:
  - id (auto-increment)
  - name (required)
  - location (required)
  - description
  - image URL
  - contact
  - timings
  - created_at, updated_at

### 2. Admin Interface
- New "Manage Temples" page at `/admin/temples`
- Add, edit, and delete temples
- View all temples in a table format

### 3. Integration
- Added temples to DataContext for state management
- Connected to Supabase for database operations
- Added route in App.js
- Added link in Admin Dashboard

## Setup Instructions

### Step 1: Run Database Migration
1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `temples-table-migration.sql`
4. Click "Run" to create the temples table

### Step 2: Test the Feature
1. Start your React app: `npm start`
2. Login to admin panel: http://localhost:3000/admin/login
3. Click on "Temples" card in the dashboard
4. Click "Add Temple" button
5. Fill in the temple details:
   - Name: e.g., "Main Temple"
   - Location: e.g., "Temple Street, City"
   - Description: Optional details about the temple
   - Image URL: Optional image link
   - Contact: Phone number
   - Timings: e.g., "6:00 AM - 9:00 PM"
6. Click "Add Temple"

### Step 3: Verify
- The temple should now appear in the table
- Check Supabase dashboard to confirm it's in the database
- The data will persist across page refreshes

## Files Modified/Created

### New Files:
- `src/pages/admin/ManageTemples.js` - Admin interface for temples
- `temples-table-migration.sql` - Database migration script
- `TEMPLES_SETUP_GUIDE.md` - This guide

### Modified Files:
- `src/context/DataContext.js` - Added temples state and CRUD functions
- `src/App.js` - Added temples route
- `src/pages/admin/AdminDashboard.js` - Added temples card
- `supabase-schema.sql` - Updated with temples table

## Features

### Admin Can:
- ✅ Add new temples
- ✅ Edit existing temples
- ✅ Delete temples
- ✅ View all temples in a table
- ✅ Search temples (UI ready, can be implemented)

### Data Persists:
- ✅ All data saved to Supabase
- ✅ Automatic timestamps
- ✅ Public read access (for future public display)
- ✅ Admin full access

## Next Steps (Optional)

If you want to display temples on the public website:

1. Create a public temples page
2. Use the `temples` data from DataContext
3. Display temple cards with images, location, timings
4. Add to navigation menu

Example usage in any component:
```javascript
import { useData } from '../context/DataContext';

function TemplesPage() {
  const { temples } = useData();
  
  return (
    <div>
      {temples.map(temple => (
        <div key={temple.id}>
          <h2>{temple.name}</h2>
          <p>{temple.location}</p>
          <p>{temple.timings}</p>
        </div>
      ))}
    </div>
  );
}
```

## Troubleshooting

### Temple not appearing after adding?
- Check browser console for errors
- Verify Supabase connection in `.env` file
- Check if RLS policies are enabled in Supabase

### Can't access admin page?
- Make sure you're logged in as admin
- Check localStorage has 'adminLoggedIn' set to 'true'

### Database errors?
- Verify the migration script ran successfully
- Check Supabase logs for detailed error messages
- Ensure your Supabase project is active

## Support
If you encounter any issues, check:
1. Browser console for JavaScript errors
2. Supabase dashboard logs
3. Network tab for API call failures
