import React, { useState, useEffect } from 'react';
import { apiClient } from '../../apiClient';
import './AdminManage.css';

const ManageSevas = () => {
  const [sevas, setSevas] = useState([]);
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSeva, setEditingSeva] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    templeId: '',
    isActive: true
  });

  useEffect(() => {
    fetchSevas();
    fetchTemples();
  }, []);

  const fetchSevas = async () => {
    try {
      const data = await apiClient.getSevas();
      setSevas(data);
    } catch (error) {
      console.error('Error fetching sevas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemples = async () => {
    try {
      const data = await apiClient.getTemples();
      setTemples(data);
    } catch (error) {
      console.error('Error fetching temples:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSeva) {
        await apiClient.updateSeva(editingSeva.id, formData);
      } else {
        await apiClient.createSeva(formData);
      }
      
      fetchSevas();
      resetForm();
    } catch (error) {
      console.error('Error saving seva:', error);
      alert('Error saving seva: ' + error.message);
    }
  };

  const handleEdit = (seva) => {
    setEditingSeva(seva);
    setFormData({
      name: seva.name,
      description: seva.description,
      price: seva.price,
      duration: seva.duration,
      templeId: seva.templeId,
      isActive: seva.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this seva?')) {
      try {
        await apiClient.deleteSeva(id);
        fetchSevas();
      } catch (error) {
        console.error('Error deleting seva:', error);
        alert('Error deleting seva: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      templeId: '',
      isActive: true
    });
    setEditingSeva(null);
    setShowForm(false);
  };

  const getTempleName = (templeId) => {
    const temple = temples.find(t => t.id === templeId);
    return temple ? temple.name : 'Unknown Temple';
  };

  if (loading) {
    return <div className="loading">Loading sevas...</div>;
  }

  return (
    <div className="admin-manage">
      <div className="admin-header">
        <h1>Manage Sevas</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          Add New Seva
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingSeva ? 'Edit Seva' : 'Add New Seva'}</h2>
              <button className="close-btn" onClick={resetForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Seva Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Price (₹):</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration (minutes):</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  min="1"
                />
              </div>

              <div className="form-group">
                <label>Temple:</label>
                <select
                  value={formData.templeId}
                  onChange={(e) => setFormData({...formData, templeId: e.target.value})}
                  required
                >
                  <option value="">Select Temple</option>
                  {temples.map(temple => (
                    <option key={temple.id} value={temple.id}>
                      {temple.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  />
                  Active
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingSeva ? 'Update' : 'Create'} Seva
                </button>
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Temple</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sevas.map(seva => (
              <tr key={seva.id}>
                <td>
                  <div>
                    <strong>{seva.name}</strong>
                    {seva.description && (
                      <div className="description">{seva.description}</div>
                    )}
                  </div>
                </td>
                <td>{getTempleName(seva.templeId)}</td>
                <td>₹{seva.price}</td>
                <td>{seva.duration} min</td>
                <td>
                  <span className={`status ${seva.isActive ? 'active' : 'inactive'}`}>
                    {seva.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-edit"
                      onClick={() => handleEdit(seva)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(seva.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sevas.length === 0 && (
          <div className="no-data">
            <p>No sevas found. Add your first seva to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSevas;