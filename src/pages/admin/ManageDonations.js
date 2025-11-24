import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './AdminManage.css';

function ManageDonations() {
  const { donations, setDonations } = useData();
  const [localDonations, setLocalDonations] = useState([
    { id: 1, donor: 'Rajesh Kumar', category: 'Annadhana', amount: 5000, date: 'Dec 10, 2025', status: 'Completed' },
    { id: 2, donor: 'Priya Sharma', category: 'Goshala', amount: 10000, date: 'Dec 12, 2025', status: 'Completed' },
    { id: 3, donor: 'Amit Patel', category: 'Constructions', amount: 25000, date: 'Dec 13, 2025', status: 'Pending' },
    { id: 4, donor: 'Sunita Reddy', category: 'Vidhyadhana', amount: 15000, date: 'Dec 14, 2025', status: 'Completed' }
  ]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentDonation, setCurrentDonation] = useState(null);

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

  const handleView = (donation) => {
    setCurrentDonation(donation);
    setShowViewModal(true);
  };

  const handleReceipt = (donation) => {
    alert(`Generating receipt for ${donation.donor}\nAmount: ₹${donation.amount}\nCategory: ${donation.category}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this donation record?')) {
      setDonations(donations.filter(d => d.id !== id));
      alert('Donation record deleted successfully!');
    }
  };

  return (
    <div className="admin-manage-page">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Manage Donations</h1>
          <Link to="/admin/dashboard" className="btn-back">← Back to Dashboard</Link>
        </div>
      </div>

      <div className="manage-container">
        <div className="stats-row">
          <div className="stat-box">
            <h3>Total Donations</h3>
            <p className="stat-value">₹{totalDonations.toLocaleString()}</p>
          </div>
          <div className="stat-box">
            <h3>This Month</h3>
            <p className="stat-value">₹55,000</p>
          </div>
          <div className="stat-box">
            <h3>Total Donors</h3>
            <p className="stat-value">156</p>
          </div>
        </div>

        <div className="manage-actions">
          <input type="text" placeholder="Search donations..." className="search-input" />
          <select className="filter-select">
            <option>All Categories</option>
            <option>Annadhana</option>
            <option>Goshala</option>
            <option>Constructions</option>
            <option>Vidhyadhana</option>
          </select>
          <button className="btn-add">Export Report</button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Donor Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(donation => (
                <tr key={donation.id}>
                  <td>#{donation.id}</td>
                  <td>{donation.donor}</td>
                  <td>{donation.category}</td>
                  <td>₹{donation.amount.toLocaleString()}</td>
                  <td>{donation.date}</td>
                  <td>
                    <span className={`status-badge ${donation.status.toLowerCase()}`}>
                      {donation.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action btn-view" onClick={() => handleView(donation)}>View</button>
                    <button className="btn-action btn-edit" onClick={() => handleReceipt(donation)}>Receipt</button>
                    <button className="btn-action btn-delete" onClick={() => handleDelete(donation.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && currentDonation && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Donation Details</h2>
            <div className="booking-details">
              <p><strong>ID:</strong> #{currentDonation.id}</p>
              <p><strong>Donor:</strong> {currentDonation.donor}</p>
              <p><strong>Category:</strong> {currentDonation.category}</p>
              <p><strong>Amount:</strong> ₹{currentDonation.amount.toLocaleString()}</p>
              <p><strong>Date:</strong> {currentDonation.date}</p>
              <p><strong>Status:</strong> <span className={`status-badge ${currentDonation.status.toLowerCase()}`}>{currentDonation.status}</span></p>
            </div>
            <div className="modal-actions">
              <button className="btn-action btn-view" onClick={() => setShowViewModal(false)}>Close</button>
              <button className="btn-action btn-edit" onClick={() => handleReceipt(currentDonation)}>Generate Receipt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageDonations;
