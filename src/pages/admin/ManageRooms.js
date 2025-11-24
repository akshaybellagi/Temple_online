import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import './AdminManage.css';

function ManageRooms() {
  const { rooms, setRooms } = useData();
  const [adminRooms, setAdminRooms] = useState([
    { id: 1, name: 'Dheerendra Vasathi Gruha', type: 'NON-AC | 2-Occupancy', floor: 'First Floor', price: 600, available: 25, total: 25, lift: true },
    { id: 2, name: 'Dheerendra Vasathi Gruha', type: 'NON-AC | 2-Occupancy', floor: 'Second Floor', price: 600, available: 20, total: 20, lift: true },
    { id: 3, name: 'Panchamuki Darshan', type: 'NON-AC | 2-Occupancy', floor: 'First Floor', price: 250, available: 10, total: 10, lift: false },
    { id: 4, name: 'Panchamuki Darshan', type: 'NON-AC | 2-Occupancy', floor: 'Ground Floor', price: 250, available: 10, total: 10, lift: false }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    floor: '',
    price: '',
    total: '',
    lift: false
  });

  const handleUpdatePrice = (id, newPrice) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, price: parseInt(newPrice) } : room
    ));
  };

  const handleEdit = (room) => {
    setCurrentRoom(room);
    setFormData({
      name: room.name,
      type: room.type,
      floor: room.floor,
      price: room.price,
      total: room.total,
      lift: room.lift
    });
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      setRooms(rooms.filter(room => room.id !== id));
      alert('Room deleted successfully!');
    }
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const newRoom = {
      id: rooms.length + 1,
      ...formData,
      price: parseInt(formData.price),
      total: parseInt(formData.total),
      available: parseInt(formData.total)
    };
    setRooms([...rooms, newRoom]);
    setShowAddModal(false);
    setFormData({ name: '', type: '', floor: '', price: '', total: '', lift: false });
    alert('Room added successfully!');
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    setRooms(rooms.map(room => 
      room.id === currentRoom.id 
        ? { ...room, ...formData, price: parseInt(formData.price), total: parseInt(formData.total) }
        : room
    ));
    setShowEditModal(false);
    alert('Room updated successfully!');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="admin-manage-page">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Manage Rooms</h1>
          <Link to="/admin/dashboard" className="btn-back">← Back to Dashboard</Link>
        </div>
      </div>

      <div className="manage-container">
        <div className="manage-actions">
          <input type="text" placeholder="Search rooms..." className="search-input" />
          <button className="btn-add" onClick={() => setShowAddModal(true)}>+ Add New Room</button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Room Name</th>
                <th>Type</th>
                <th>Floor</th>
                <th>Price (₹)</th>
                <th>Available</th>
                <th>Lift</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id}>
                  <td>#{room.id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
                  <td>{room.floor}</td>
                  <td>
                    <input 
                      type="number" 
                      value={room.price}
                      onChange={(e) => handleUpdatePrice(room.id, e.target.value)}
                      className="price-input"
                    />
                  </td>
                  <td>{room.available}/{room.total}</td>
                  <td>
                    <span className={`status-badge ${room.lift ? 'confirmed' : 'cancelled'}`}>
                      {room.lift ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action btn-edit" onClick={() => handleEdit(room)}>Edit</button>
                    <button className="btn-action btn-delete" onClick={() => handleDelete(room.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Room</h2>
            <form className="modal-form" onSubmit={handleSubmitAdd}>
              <input 
                type="text" 
                name="name"
                placeholder="Room Name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <input 
                type="text" 
                name="type"
                placeholder="Type (e.g., NON-AC | 2-Occupancy)" 
                value={formData.type}
                onChange={handleChange}
                required 
              />
              <input 
                type="text" 
                name="floor"
                placeholder="Floor" 
                value={formData.floor}
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
                type="number" 
                name="total"
                placeholder="Total Rooms" 
                value={formData.total}
                onChange={handleChange}
                required 
              />
              <label>
                <input 
                  type="checkbox" 
                  name="lift"
                  checked={formData.lift}
                  onChange={handleChange}
                /> Has Lift
              </label>
              <div className="modal-actions">
                <button type="submit" className="btn-action btn-view">Add Room</button>
                <button type="button" className="btn-action btn-delete" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Room</h2>
            <form className="modal-form" onSubmit={handleSubmitEdit}>
              <input 
                type="text" 
                name="name"
                placeholder="Room Name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <input 
                type="text" 
                name="type"
                placeholder="Type" 
                value={formData.type}
                onChange={handleChange}
                required 
              />
              <input 
                type="text" 
                name="floor"
                placeholder="Floor" 
                value={formData.floor}
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
                type="number" 
                name="total"
                placeholder="Total Rooms" 
                value={formData.total}
                onChange={handleChange}
                required 
              />
              <label>
                <input 
                  type="checkbox" 
                  name="lift"
                  checked={formData.lift}
                  onChange={handleChange}
                /> Has Lift
              </label>
              <div className="modal-actions">
                <button type="submit" className="btn-action btn-view">Update Room</button>
                <button type="button" className="btn-action btn-delete" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageRooms;
