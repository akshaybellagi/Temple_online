import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import LatestNews from './pages/LatestNews';
import LiveStatus from './pages/LiveStatus';
import RoomsDonor from './pages/RoomsDonor';
import MyHistory from './pages/MyHistory';
import Panchanga from './pages/Panchanga';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageBookings from './pages/admin/ManageBookings';
import ManageRooms from './pages/admin/ManageRooms';
import ManageHalls from './pages/admin/ManageHalls';
import ManageDonations from './pages/admin/ManageDonations';
import ManageGallery from './pages/admin/ManageGallery';
import ManageContent from './pages/admin/ManageContent';
import ManageUsers from './pages/admin/ManageUsers';
import ManageTemples from './pages/admin/ManageTemples';
import ManageSevas from './pages/admin/ManageSevas';
import Settings from './pages/admin/Settings';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="App">
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/bookings" element={<ManageBookings />} />
            <Route path="/admin/rooms" element={<ManageRooms />} />
            <Route path="/admin/halls" element={<ManageHalls />} />
            <Route path="/admin/donations" element={<ManageDonations />} />
            <Route path="/admin/gallery" element={<ManageGallery />} />
            <Route path="/admin/content" element={<ManageContent />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/temples" element={<ManageTemples />} />
            <Route path="/admin/sevas" element={<ManageSevas />} />
            <Route path="/admin/settings" element={<Settings />} />
            
            {/* Public Routes with Layout */}
            <Route path="/" element={
              <>
                <Header />
                <main>
                  <Home />
                </main>
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Header />
                <main>
                  <About />
                </main>
                <Footer />
              </>
            } />
            <Route path="/services" element={
              <>
                <Header />
                <main>
                  <Services />
                </main>
                <Footer />
              </>
            } />
            <Route path="/booking" element={
              <>
                <Header />
                <main>
                  <Booking />
                </main>
                <Footer />
              </>
            } />
            <Route path="/gallery" element={
              <>
                <Header />
                <main>
                  <Gallery />
                </main>
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Header />
                <main>
                  <Contact />
                </main>
                <Footer />
              </>
            } />
            <Route path="/latest-news" element={
              <>
                <Header />
                <main>
                  <LatestNews />
                </main>
                <Footer />
              </>
            } />
            <Route path="/live-status" element={
              <>
                <Header />
                <main>
                  <LiveStatus />
                </main>
                <Footer />
              </>
            } />
            <Route path="/rooms-donor" element={
              <>
                <Header />
                <main>
                  <RoomsDonor />
                </main>
                <Footer />
              </>
            } />
            <Route path="/my-history" element={
              <>
                <Header />
                <main>
                  <MyHistory />
                </main>
                <Footer />
              </>
            } />
            <Route path="/panchanga" element={
              <>
                <Header />
                <main>
                  <Panchanga />
                </main>
                <Footer />
              </>
            } />
          </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
