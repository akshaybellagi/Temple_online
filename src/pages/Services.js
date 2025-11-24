import React, { useState } from 'react';
import { MdRestaurant } from 'react-icons/md';
import { GiCow } from 'react-icons/gi';
import { FaHome, FaHardHat, FaBook, FaHeart } from 'react-icons/fa';
import { GiWheat } from 'react-icons/gi';
import './Services.css';

function Services() {
  const [donations, setDonations] = useState({
    annadhana: '',
    godana: '',
    goshala: '',
    constructions: '',
    vidhyadhana: '',
    goGrasa: '',
    others: ''
  });

  const donationItems = [
    { id: 'annadhana', name: 'Annadhana', icon: MdRestaurant },
    { id: 'godana', name: 'Godana', icon: GiCow },
    { id: 'goshala', name: 'Goshala', icon: FaHome },
    { id: 'constructions', name: 'Constructions', icon: FaHardHat },
    { id: 'vidhyadhana', name: 'Vidhyadhana', icon: FaBook },
    { id: 'goGrasa', name: 'Go-Grasa', icon: GiWheat },
    { id: 'others', name: 'Others', icon: FaHeart }
  ];

  const handleChange = (id, value) => {
    setDonations({
      ...donations,
      [id]: value
    });
  };

  const calculateTotal = () => {
    return Object.values(donations).reduce((sum, val) => {
      const num = parseFloat(val) || 0;
      return sum + num;
    }, 0);
  };

  const handleProceed = () => {
    const total = calculateTotal();
    if (total > 0) {
      alert(`Total Donation: ₹${total}/-\nThank you for your contribution!`);
    } else {
      alert('Please enter donation amount');
    }
  };

  return (
    <div className="services-page">
      <section className="page-header">
        <div className="container">
          <h1>Donations</h1>
          <p>Support our spiritual and charitable activities</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="donations-list">
            {donationItems.map(item => (
              <div key={item.id} className="donation-item">
                <div className="donation-name">
                  <span className="donation-icon"><item.icon /></span>
                  <span className="donation-title">{item.name}</span>
                </div>
                <div className="donation-input">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={donations[item.id]}
                    onChange={(e) => handleChange(item.id, e.target.value)}
                    min="0"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="donation-total">
            <div className="total-display">
              <span className="total-label">Total:</span>
              <span className="total-amount">₹ {calculateTotal()}/-</span>
            </div>
            <button className="btn btn-proceed" onClick={handleProceed}>
              Proceed
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
