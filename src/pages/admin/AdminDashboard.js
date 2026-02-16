import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaCalendarAlt, FaHourglassHalf, FaDonate, FaUsers, FaHome, FaChurch, FaImage, FaUser } from 'react-icons/fa';
import { GiTempleGate } from 'react-icons/gi';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin/login');
  };

  const stats = [
    { title: 'Total Bookings', value: '156', icon: FaCalendarAlt, color: '#4CAF50' },
    { title: 'Pending Approvals', value: '12', icon: FaHourglassHalf, color: '#FF9800' },
    { title: 'E-Hundi Collections', value: '₹2.5L', icon: FaDonate, color: '#2196F3' },
    { title: 'Active Users', value: '89', icon: FaUsers, color: '#9C27B0' }
  ];

  const managementSections = [
    { title: 'Room Management', icon: FaHome, link: '/admin/rooms', description: 'Manage room availability and pricing' },
    { title: 'Marriage Hall', icon: FaChurch, link: '/admin/halls', description: 'Manage marriage hall bookings' },
    { title: 'Seva Bookings', icon: GiTempleGate, link: '/admin/sevas', description: 'Manage seva bookings and schedules' },
    { title: 'E-Hundi', icon: FaDonate, link: '/admin/donations', description: 'Manage online donations and E-Hundi' },
    { title: 'Gallery', icon: FaImage, link: '/admin/gallery', description: 'Manage gallery images' },
    { title: 'Users', icon: FaUser, link: '/admin/users', description: 'Manage user accounts' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
              <div className="stat-icon"><stat.icon /></div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="management-section">
          <h2>Management</h2>
          <div className="management-grid">
            {managementSections.map((section, index) => (
              <Link key={index} to={section.link} className="management-card">
                <div className="management-icon"><section.icon /></div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon"><FaCalendarAlt /></span>
              <div className="activity-content">
                <p><strong>New Booking</strong></p>
                <p>Room booking for Dec 15, 2025</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon"><FaDonate /></span>
              <div className="activity-content">
                <p><strong>E-Hundi Received</strong></p>
                <p>₹5,000 for Annadhana</p>
                <span className="activity-time">5 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon"><FaChurch /></span>
              <div className="activity-content">
                <p><strong>Hall Booking</strong></p>
                <p>Main Hall for Dec 20, 2025</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
