import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminManage.css';

function ManageUsers() {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', bookings: 3, status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 9876543211', bookings: 5, status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+91 9876543212', bookings: 2, status: 'Blocked' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+91 9876543213', bookings: 7, status: 'Active' }
  ]);

  return (
    <div className="admin-manage-page">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Manage Users</h1>
          <Link to="/admin/dashboard" className="btn-back">← Back to Dashboard</Link>
        </div>
      </div>

      <div className="manage-container">
        <div className="manage-actions">
          <input type="text" placeholder="Search users..." className="search-input" />
          <select className="filter-select">
            <option>All Users</option>
            <option>Active</option>
            <option>Blocked</option>
          </select>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bookings</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.bookings}</td>
                  <td>
                    <span className={`status-badge ${user.status === 'Active' ? 'confirmed' : 'cancelled'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action btn-view">View</button>
                    <button className="btn-action btn-edit">
                      {user.status === 'Active' ? 'Block' : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
