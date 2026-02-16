import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Receipt from '../../components/Receipt';
import './AdminManage.css';

function ManageRooms() {
  const { rooms, setRooms, bookings } = useData();
  
  // Flatten rooms structure for admin table view
  const flattenRooms = () => {
    const flattened = [];
    rooms.forEach(room => {
      if (room.types && Array.isArray(room.types)) {
        room.types.forEach((type, index) => {
          flattened.push({
            id: `${room.id}-${index}`,
            parentId: room.id,
            name: room.name,
            type: type.name,
            floor: type.name.includes('First Floor') ? 'First Floor' : 
                   type.name.includes('Second Floor') ? 'Second Floor' : 
                   type.name.includes('Ground Floor') ? 'Ground Floor' : 'N/A',
            price: type.price,
            available: type.available,
            total: type.total,
            lift: room.lift,
            checkInTime: room.checkInTime || '',
            checkOutTime: room.checkOutTime || '',
            imageUrl: room.imageUrl || room.image || ''
          });
        });
      }
    });
    return flattened;
  };

  const [adminRooms, setAdminRooms] = useState(flattenRooms());

  // Sync adminRooms when rooms from DataContext changes
  useEffect(() => {
    setAdminRooms(flattenRooms());
  }, [rooms]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    total: '',
    imageUrl: '',
    lift: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleUpdatePrice = (id, newPrice) => {
    // Update adminRooms display
    setAdminRooms(adminRooms.map(room => 
      room.id === id ? { ...room, price: parseInt(newPrice) } : room
    ));
    
    // Update DataContext rooms structure
    const updatedRooms = rooms.map(room => {
      if (room.types && Array.isArray(room.types)) {
        return {
          ...room,
          types: room.types.map((type, index) => {
            if (`${room.id}-${index}` === id) {
              return { ...type, price: parseInt(newPrice) };
            }
            return type;
          })
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  const handleEdit = (room) => {
    setCurrentRoom(room);
    setFormData({
      name: room.name,
      description: room.type,
      price: room.price,
      total: room.total,
      imageUrl: room.imageUrl || room.image || '',
      lift: room.lift
    });
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      // Remove from admin display
      setAdminRooms(adminRooms.filter(room => room.id !== id));
      
      // Update DataContext - remove the specific type or entire room if it's the last type
      const updatedRooms = rooms.map(room => {
        if (room.types && Array.isArray(room.types)) {
          const filteredTypes = room.types.filter((type, index) => `${room.id}-${index}` !== id);
          if (filteredTypes.length === 0) {
            return null; // Mark for removal
          }
          return { ...room, types: filteredTypes };
        }
        return room;
      }).filter(room => room !== null);
      
      setRooms(updatedRooms);
      alert('Room deleted successfully!');
    }
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    
    // Create new room in DataContext structure
    const newRoom = {
      id: rooms.length + 1,
      name: formData.name,
      image: formData.imageUrl || 'https://via.placeholder.com/300x200/3498db/ffffff?text=Room',
      imageUrl: formData.imageUrl,
      lift: formData.lift,
      types: [{
        name: formData.description,
        price: parseInt(formData.price),
        available: parseInt(formData.total),
        total: parseInt(formData.total)
      }]
    };
    
    setRooms([...rooms, newRoom]);
    
    // Update admin display
    setAdminRooms([...adminRooms, {
      id: `${newRoom.id}-0`,
      parentId: newRoom.id,
      name: formData.name,
      type: formData.description,
      floor: 'N/A',
      price: parseInt(formData.price),
      available: parseInt(formData.total),
      total: parseInt(formData.total),
      lift: formData.lift,
      imageUrl: formData.imageUrl
    }]);
    
    setShowAddModal(false);
    setFormData({ name: '', description: '', price: '', total: '', imageUrl: '', lift: false });
    alert('Room added successfully!');
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    
    // Update adminRooms display
    setAdminRooms(adminRooms.map(room => 
      room.id === currentRoom.id 
        ? { 
            ...room, 
            name: formData.name,
            type: formData.description,
            price: parseInt(formData.price), 
            total: parseInt(formData.total),
            imageUrl: formData.imageUrl,
            lift: formData.lift
          }
        : room
    ));
    
    // Find the parent room and type index
    let parentRoomId = null;
    let typeIndex = null;
    
    rooms.forEach(room => {
      if (room.types && Array.isArray(room.types)) {
        room.types.forEach((type, index) => {
          if (`${room.id}-${index}` === currentRoom.id) {
            parentRoomId = room.id;
            typeIndex = index;
          }
        });
      }
    });
    
    if (parentRoomId !== null && typeIndex !== null) {
      // Create a new separate room for this edited entry
      const newRoomId = Math.max(...rooms.map(r => r.id)) + 1;
      const newRoom = {
        id: newRoomId,
        name: formData.name,
        image: formData.imageUrl || 'https://via.placeholder.com/300x200/3498db/ffffff?text=Room',
        imageUrl: formData.imageUrl,
        lift: formData.lift,
        types: [{
          name: formData.description,
          price: parseInt(formData.price),
          available: parseInt(formData.total),
          total: parseInt(formData.total)
        }]
      };
      
      // Remove the old type from parent room and add new room
      const updatedRooms = rooms.map(room => {
        if (room.id === parentRoomId) {
          const filteredTypes = room.types.filter((_, index) => index !== typeIndex);
          if (filteredTypes.length === 0) {
            return null; // Mark for removal if no types left
          }
          return { ...room, types: filteredTypes };
        }
        return room;
      }).filter(room => room !== null);
      
      setRooms([...updatedRooms, newRoom]);
      
      // Update adminRooms with new ID
      setAdminRooms(adminRooms.map(room => 
        room.id === currentRoom.id 
          ? { 
              ...room,
              id: `${newRoomId}-0`,
              parentId: newRoomId,
              name: formData.name,
              type: formData.description,
              price: parseInt(formData.price), 
              total: parseInt(formData.total),
              available: parseInt(formData.total),
              imageUrl: formData.imageUrl,
              lift: formData.lift
            }
          : room
      ));
    }
    
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

  // Filter room bookings
  const roomBookings = bookings.filter(booking => booking.type === 'Room');

  const filteredBookings = roomBookings.filter(booking => {
    const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  const handleGenerateReceipt = (booking) => {
    setSelectedBooking(booking);
    setShowReceipt(true);
  };

  const handleStatusChange = (bookingId, newStatus) => {
    console.log(`Updating booking ${bookingId} to ${newStatus}`);
    setShowBookingModal(false);
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
        <div className="stats-row">
          <div className="stat-box">
            <h3>Total Rooms</h3>
            <p className="stat-value">{adminRooms.reduce((sum, room) => sum + room.total, 0)}</p>
          </div>
          <div className="stat-box">
            <h3>Available</h3>
            <p className="stat-value">{adminRooms.reduce((sum, room) => sum + room.available, 0)}</p>
          </div>
          <div className="stat-box">
            <h3>Total Bookings</h3>
            <p className="stat-value">{roomBookings.length}</p>
          </div>
          <div className="stat-box">
            <h3>Pending</h3>
            <p className="stat-value">{roomBookings.filter(b => b.status === 'Pending').length}</p>
          </div>
        </div>

        <div className="management-section">
          <h2>Room Inventory</h2>
          <button className="btn-add" onClick={() => setShowAddModal(true)}>+ Add New Room</button>
        </div>

        <div className="manage-actions">
          <input type="text" placeholder="Search rooms..." className="search-input" />
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Room Name</th>
                <th>Type/Description</th>
                <th>Price (₹)</th>
                <th>Available</th>
                <th>Lift</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminRooms.map(room => (
                <tr key={room.id}>
                  <td>#{room.id}</td>
                  <td>{room.name}</td>
                  <td>{room.type}</td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="management-section" style={{ marginTop: '3rem' }}>
          <h2>Room Bookings</h2>
        </div>

        <div className="manage-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
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
                <th>Check-in Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking, index) => (
                  <tr key={index}>
                    <td>#{index + 1}</td>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.date}</td>
                    <td>{booking.amount}</td>
                    <td>
                      <span className={`status-badge ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn-action btn-view"
                        onClick={() => handleViewBooking(booking)}
                      >
                        View
                      </button>
                      <button 
                        className="btn-action btn-edit"
                        onClick={() => handleGenerateReceipt(booking)}
                        style={{ marginLeft: '5px' }}
                      >
                        Receipt
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>
                    No room bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showBookingModal && selectedBooking && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Room Booking Details</h2>
            <div className="booking-details">
              <p><strong>Booking ID:</strong> #{Math.random().toString(36).substring(2, 9).toUpperCase()}</p>
              <p><strong>Guest Name:</strong> {selectedBooking.name}</p>
              <p><strong>Email:</strong> {selectedBooking.email}</p>
              <p><strong>Phone:</strong> {selectedBooking.phone}</p>
              <p><strong>Room Name:</strong> {selectedBooking.roomName || 'Dheerendra Vasathi Gruha'}</p>
              <p><strong>Room Number:</strong> {selectedBooking.roomNumber || Math.floor(Math.random() * 100) + 101}</p>
              <p><strong>Room Type:</strong> {selectedBooking.roomType || 'NON-AC | 2-Occupancy'}</p>
              <p><strong>Check-in Date:</strong> {selectedBooking.date}</p>
              <p><strong>Number of Guests:</strong> {selectedBooking.guests || '2'}</p>
              <p><strong>Amount:</strong> {selectedBooking.amount}</p>
              <p><strong>Status:</strong> <span className={`status-badge ${selectedBooking.status.toLowerCase()}`}>{selectedBooking.status}</span></p>
              {selectedBooking.specialRequests && (
                <p><strong>Special Requests:</strong> {selectedBooking.specialRequests}</p>
              )}
            </div>

            <div className="status-buttons">
              <button 
                className="btn-action btn-view"
                onClick={() => handleStatusChange(selectedBooking.id, 'Confirmed')}
              >
                Confirm Booking
              </button>
              <button 
                className="btn-action btn-edit"
                onClick={() => handleStatusChange(selectedBooking.id, 'Completed')}
              >
                Check-out
              </button>
              <button 
                className="btn-action btn-delete"
                onClick={() => handleStatusChange(selectedBooking.id, 'Cancelled')}
              >
                Cancel Booking
              </button>
            </div>

            <div className="modal-actions">
              <button className="btn-action" onClick={() => setShowBookingModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
              <textarea 
                name="description"
                placeholder="Type/Description (e.g., NON-AC | 2-Occupancy | First Floor)" 
                value={formData.description}
                onChange={handleChange}
                rows="2"
                required 
              />
              <input 
                type="number" 
                name="price"
                placeholder="Price per night" 
                value={formData.price}
                onChange={handleChange}
                required 
              />
              <input 
                type="number" 
                name="total"
                placeholder="Total Rooms Available" 
                value={formData.total}
                onChange={handleChange}
                required 
              />
              <input 
                type="url" 
                name="imageUrl"
                placeholder="Image URL (optional)" 
                value={formData.imageUrl}
                onChange={handleChange}
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
              <textarea 
                name="description"
                placeholder="Type/Description" 
                value={formData.description}
                onChange={handleChange}
                rows="2"
                required 
              />
              <input 
                type="number" 
                name="price"
                placeholder="Price per night" 
                value={formData.price}
                onChange={handleChange}
                required 
              />
              <input 
                type="number" 
                name="total"
                placeholder="Total Rooms Available" 
                value={formData.total}
                onChange={handleChange}
                required 
              />
              <input 
                type="url" 
                name="imageUrl"
                placeholder="Image URL (optional)" 
                value={formData.imageUrl}
                onChange={handleChange}
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
      {showReceipt && selectedBooking && (
        <Receipt booking={selectedBooking} onClose={() => setShowReceipt(false)} />
      )}
    </div>
  );
}

export default ManageRooms;
