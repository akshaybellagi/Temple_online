import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './AdminManage.css';

function ManageHalls() {
  const { marriageHalls, setMarriageHalls } = useData();
  const [halls, setHalls] = useState([
    { id: 1, name: 'Kalyana Mandapa - Main Hall', capacity: '500 Guests', price: 25000, amenities: 'AC, Stage, Dining, Parking', bookings: 12 },
    { id: 2, name: 'Kalyana Mandapa - Mini Hall', capacity: '200 Guests', price: 15000, amenities: 'AC, Stage, Dining', bookings: 8 }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentHall, setCurrentHall] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    price: '',
    amenities: ''
  });

  const handleAdd = () => {
    setFormData({ name: '', capacity: '', price: '', amenities: '' });
    setShowAddModal(true);
  };

  const handleEdit = (hall) => {
    setCurrentHall(hall);
    setFormData({
      name: hall.name,
      capacity: hall.capacity,
      price: hall.price,
      amenities: hall.amenities
    });
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this hall?')) {
      setHalls(halls.filter(hall => hall.id !== id));
      setMarriageHalls(marriageHalls.filter(hall => hall.id !== id));
      alert('Hall deleted successfully!');
    }
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const newHall = {
      id: marriageHalls.length + 1,
      name: formData.name,
      image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=Hall',
      capacity: formData.capacity,
      amenities: formData.amenities,
      price: parseInt(formData.price),
      available: true,
      bookings: 0
    };
    setMarriageHalls([...marriageHalls, newHall]);
    setHalls([...halls, newHall]);
    setShowAddModal(false);
    alert('Hall added successfully and will appear on booking page!');
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const updatedHalls = halls.map(hall => 
      hall.id === currentHall.id 
        ? { ...hall, ...formData, price: parseInt(formData.price) }
        : hall
    );
    setHalls(updatedHalls);
    setMarriageHalls(marriageHalls.map(hall => 
      hall.id === currentHall.id 
        ? { ...hall, name: formData.name, capacity: formData.capacity, amenities: formData.amenities, price: parseInt(formData.price) }
        : hall
    ));
    setShowEditModal(false);
    alert('Hall updated successfully!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-manage-page">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Manage Marriage Halls</h1>
          <Link to="/admin/dashboard" className="btn-back">← Back to Dashboard</Link>
        </div>
      </div>

      <div className="manage-container">
        <div className="manage-actions">
          <input type="text" placeholder="Search halls..." className="search-input" />
          <button className="btn-add" onClick={handleAdd}>+ Add New Hall</button>
        </div>

        <div className="cards-grid">
          {halls.map(hall => (
            <div key={hall.id} className="info-card">
              <div className="card-header">
                <h3>{hall.name}</h3>
                <span className="badge">💒</span>
              </div>
              <div className="card-body">
                <p><strong>Capacity:</strong> {hall.capacity}</p>
                <p><strong>Price:</strong> ₹{hall.price.toLocaleString()}/-</p>
                <p><strong>Amenities:</strong> {hall.amenities}</p>
                <p><strong>Total Bookings:</strong> {hall.bookings}</p>
              </div>
              <div className="card-actions">
                <button className="btn-action btn-view" onClick={() => alert('Calendar view coming soon!')}>View Calendar</button>
                <button className="btn-action btn-edit" onClick={() => handleEdit(hall)}>Edit Details</button>
                <button className="btn-action btn-delete" onClick={() => handleDelete(hall.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Hall</h2>
            <form className="modal-form" onSubmit={handleSubmitAdd}>
              <input 
                type="text" 
                name="name"
                placeholder="Hall Name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <input 
                type="text" 
                name="capacity"
                placeholder="Capacity (e.g., 500 Guests)" 
                value={formData.capacity}
                onChange={handleChange}
                required 
              />
              <input 
                type="number" 
                name="price"
                placeholder="Price" 
                value={formData.price}
                onChange={handleChange}
                required 
              />
              <input 
                type="text" 
                name="amenities"
                placeholder="Amenities (comma separated)" 
                value={formData.amenities}
                onChange={handleChange}
                required 
              />
              <div className="modal-actions">
                <button type="submit" className="btn-action btn-view">Add Hall</button>
                <button type="button" className="btn-action btn-delete" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Hall</h2>
            <form className="modal-form" onSubmit={handleSubmitEdit}>
              <input 
                type="text" 
                name="name"
                placeholder="Hall Name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <input 
                type="text" 
                name="capacity"
                placeholder="Capacity" 
                value={formData.capacity}
                onChange={handleChange}
                required 
              />
              <input 
                type="number" 
                name="price"
                placeholder="Price" 
                value={formData.price}
                onChange={handleChange}
                required 
              />
              <input 
                type="text" 
                name="amenities"
                placeholder="Amenities" 
                value={formData.amenities}
                onChange={handleChange}
                required 
              />
              <div className="modal-actions">
                <button type="submit" className="btn-action btn-view">Update Hall</button>
                <button type="button" className="btn-action btn-delete" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageHalls;
