import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FaHome, FaDonate, FaChurch, FaBuilding, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import { GiTempleGate, GiOilDrum, GiWaterDrop, GiFireBowl, GiCarousel } from 'react-icons/gi';
import { GiPrayer } from 'react-icons/gi';
import { FaAppleAlt } from 'react-icons/fa';
import { GiFootprint } from 'react-icons/gi';
import { FaGlassMartini } from 'react-icons/fa';
import './Booking.css';

function Booking() {
  const { rooms, marriageHalls, addBooking } = useData();
  const [bookingType, setBookingType] = useState('rooms');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedSeva, setSelectedSeva] = useState(null);
  const [bookingStep, setBookingStep] = useState('service-selection'); // service-selection, calendar, availability, form, confirmation, seva-selection
  const [selectedMonth, setSelectedMonth] = useState(11); // December (0-indexed)
  const [selectedYear, setSelectedYear] = useState(2025);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    specialRequests: ''
  });

  const sevaList = [
    { 
      id: 1, 
      name: 'PANCHAMRUTHAM', 
      price: 100, 
      time: '07:30 AM Morning',
      description: 'Sevakartha to be present at Poojamandira in Prakara by 7:30am for sankalpa. Prasada to be collected in counter no 10.',
      icon: GiOilDrum
    },
    { 
      id: 2, 
      name: 'KSHEERABHI SHEKAM', 
      price: 100, 
      time: '07:30 AM Morning',
      description: 'Sevakartha to be present at Poojamandira in Prakara by 7:30am for sankalpa. Prasada to be collected in counter no 10.',
      icon: FaGlassMartini
    },
    { 
      id: 3, 
      name: 'ARCHANA SAHITA HASTODAKA', 
      price: 150, 
      time: '07:30 AM Morning',
      description: 'Sevakartha to be present at Poojamandira in Prakara by 7:30am for sankalpa. Prasada to be collected in counter no 10.',
      icon: GiPrayer
    },
    { 
      id: 4, 
      name: 'PHALA PANCHAMRUTHA', 
      price: 200, 
      time: '07:30 AM Morning',
      description: 'Sevakartha to be present at Poojamandira in Prakara by 7:30am for sankalpa. Prasada to be collected in counter no 10.',
      icon: FaAppleAlt
    },
    { 
      id: 5, 
      name: 'SARVA SEVA', 
      price: 300, 
      time: '07:30 AM Morning',
      description: 'Sevakartha to be present at Poojamandira in Prakara by 7:30am for sankalpa. Prasada to be collected in counter no 10.',
      icon: GiTempleGate
    },
    { 
      id: 6, 
      name: 'TAILA NANDA DEEPAM (1 MONTH)', 
      price: 300, 
      time: '07:30 AM Morning',
      description: 'Sevakartha to be present at Poojamandira in Prakara by 7:30am for sankalpa. Prasada to be collected in counter no 10.',
      icon: GiOilDrum
    },
    { 
      id: 7, 
      name: 'UTSAVARAYARA PADAPOOJA', 
      price: 300, 
      time: '07:30 AM Morning',
      description: 'Sevakartha to be present at Poojamandira in Prakara by 7:30am for sankalpa. Prasada to be collected in counter no 10.',
      icon: GiFootprint
    },
    { 
      id: 8, 
      name: 'MAHA POOJA', 
      price: 500, 
      time: '07:30 AM Morning',
      description: 'Sevakartha to be present at Poojamandira in Prakara by 7:30am for sankalpa. Prasada to be collected in counter no 10.',
      icon: GiTempleGate
    },
    { 
      id: 9, 
      name: 'UNJAL SEVA', 
      price: 500, 
      time: '06:45 PM Evening',
      description: 'Sevakartha to be present at Poojamandira in Prakara by 7:30am for sankalpa. Darshana can be had from Gate 6 or 7. Prasada to be collected in counter no 10.',
      icon: GiCarousel
    },
    { 
      id: 10, 
      name: 'ABHISHEK', 
      price: 1000, 
      time: '07:30 AM Morning',
      description: 'Sevakartha to be present at Poojamandira in Prakara by 7:30am for sankalpa. Prasada to be collected in counter no 10.',
      icon: GiWaterDrop
    },
    { 
      id: 11, 
      name: 'ARATI', 
      price: 500, 
      time: '06:45 PM Evening',
      description: 'Sevakartha to be present at Poojamandira in Prakara by 6:45pm for sankalpa. Prasada to be collected in counter no 10.',
      icon: GiFireBowl
    }
  ];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const tithiNames = ['Pratipada', 'Dwiteeya', 'Truteeya', 'Chaturthi', 'Panchami', 'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'];

  // Generate dates for selected month and year
  const generateCalendarDates = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const dates = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dateObj = new Date(selectedYear, selectedMonth, i);
      const dayName = dayNames[dateObj.getDay()];
      const tithiIndex = (i - 1) % tithiNames.length;
      
      dates.push({
        date: i,
        month: monthNames[selectedMonth],
        year: selectedYear,
        day: dayName,
        event: tithiNames[tithiIndex]
      });
    }
    
    return dates;
  };

  const calendarDates = generateCalendarDates();

  // Generate year options (current year to 5 years ahead)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear + i);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setBookingStep('availability');
  };

  const handleBookNow = (item) => {
    setSelectedRoom(item);
    setBookingStep('form');
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add booking to global state
    const bookingData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      type: bookingType === 'rooms' ? 'Room' : bookingType === 'seva' ? 'Seva' : 'Marriage Hall',
      date: `${selectedDate.month} ${selectedDate.date}, ${selectedDate.year}`,
      status: 'Pending',
      amount: bookingType === 'rooms' 
        ? `₹${selectedRoom.type?.price || selectedRoom.price}` 
        : bookingType === 'seva'
        ? `₹${selectedSeva.price}`
        : `₹${selectedRoom.price.toLocaleString()}`
    };
    addBooking(bookingData);
    setBookingStep('confirmation');
  };

  const handleServiceSelect = (service) => {
    setBookingType(service);
    if (service === 'seva') {
      setBookingStep('seva-selection');
    } else {
      setBookingStep('calendar');
    }
  };

  const handleSevaSelect = (seva) => {
    setSelectedSeva(seva);
    setBookingStep('calendar');
  };

  const handleBackToSevaSelection = () => {
    setSelectedSeva(null);
    setBookingStep('seva-selection');
  };

  const handleBackToCalendar = () => {
    setSelectedDate(null);
    setSelectedRoom(null);
    setBookingStep('calendar');
  };

  const handleBackToAvailability = () => {
    setSelectedRoom(null);
    setBookingStep('availability');
  };

  const handleBackToServices = () => {
    setBookingType('rooms');
    setSelectedDate(null);
    setSelectedRoom(null);
    setBookingStep('service-selection');
  };

  return (
    <div className="booking-page">
      {bookingStep === 'service-selection' && (
        <section className="service-selection-section">
          <div className="container">
            <h2 className="section-heading">ONLINE BOOKING SERVICES</h2>
            <div className="service-selection-grid">
              <div 
                className="service-selection-card"
                onClick={() => handleServiceSelect('rooms')}
              >
                <div className="service-icon"><FaHome /></div>
                <h3>ROOM BOOKING</h3>
              </div>
              <div 
                className="service-selection-card"
                onClick={() => handleServiceSelect('seva')}
              >
                <div className="service-icon"><GiTempleGate /></div>
                <h3>SEVA BOOKING</h3>
              </div>
              <a 
                href="/services"
                className="service-selection-card"
              >
                <div className="service-icon"><FaDonate /></div>
                <h3>E-HUNDI</h3>
              </a>
              <div 
                className="service-selection-card"
                onClick={() => handleServiceSelect('marriage')}
              >
                <div className="service-icon"><FaChurch /></div>
                <h3>MARRIAGE HALL</h3>
              </div>
              <a 
                href="/services"
                className="service-selection-card"
              >
                <div className="service-icon"><FaBuilding /></div>
                <h3>ROOM DONOR</h3>
              </a>
            </div>
          </div>
        </section>
      )}

      {bookingStep === 'seva-selection' && (
        <section className="seva-selection-section">
          <div className="container">
            <div className="calendar-header-with-back">
              <button className="btn-back" onClick={handleBackToServices}>
                ← Back to Services
              </button>
              <h2 className="section-heading">SELECT SEVA</h2>
            </div>
            <div className="seva-grid">
              {sevaList.map((seva) => (
                <div 
                  key={seva.id} 
                  className="seva-card"
                  onClick={() => handleSevaSelect(seva)}
                >
                  <div className="seva-icon"><seva.icon /></div>
                  <h3 className="seva-name">{seva.name}</h3>
                  <p className="seva-price">Rs. {seva.price}/-</p>
                  <p className="seva-time">Seva Sankalpa : {seva.time}</p>
                  <p className="seva-description">{seva.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {bookingStep === 'calendar' && (
        <section className="calendar-section">
          <div className="container">
            <div className="calendar-header-with-back">
              <button className="btn-back" onClick={bookingType === 'seva' ? handleBackToSevaSelection : handleBackToServices}>
                ← Back to {bookingType === 'seva' ? 'Seva Selection' : 'Services'}
              </button>
              <div className="calendar-header">
                <div className="calendar-controls">
                  <select 
                    className="month-selector"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  >
                    {monthNames.map((month, index) => (
                      <option key={index} value={index}>{month}</option>
                    ))}
                  </select>
                  <select 
                    className="year-selector"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="calendar-grid">
              {calendarDates.map((item, index) => (
                <div 
                  key={index} 
                  className="calendar-date"
                  onClick={() => handleDateSelect(item)}
                >
                  <div className="date-month">{item.month}</div>
                  <div className="date-number">{item.date}</div>
                  <div className="date-year">{item.year}</div>
                  <div className="date-event">{item.event}</div>
                  <div className="date-day">{item.day}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {bookingStep === 'availability' && bookingType === 'rooms' && (
        <section className="section">
          <div className="container">
            <div className="selected-date-header">
              <h2 className="availability-title">
                Available Rooms for {selectedDate.month} {selectedDate.date}, {selectedDate.year}
              </h2>
              <button className="btn-change-date" onClick={handleBackToCalendar}>
                Change Date
              </button>
            </div>
            {rooms.map(room => (
            <div key={room.id} className="room-card">
              <div className="room-image">
                <img src={room.image} alt={room.name} />
                {room.lift && <span className="lift-badge">Lift</span>}
                {!room.lift && <span className="no-lift-badge">No Lift</span>}
              </div>
              
              <div className="room-details">
                <h2 className="room-name">
                  {room.name} <span className="location-icon"><FaMapMarkerAlt /></span>
                </h2>
                
                <div className="room-types">
                  {room.types.map((type, index) => (
                    <div key={index} className="room-type-card">
                      <p className="room-type-name">{type.name}</p>
                      <p className="room-price">₹ {type.price}/-</p>
                      <div className="room-availability">
                        <span>{type.available} of {type.total}</span>
                        <span className="rooms-full-badge">ROOMS FULL</span>
                      </div>
                      <button 
                        className="btn book-room-btn" 
                        onClick={() => handleBookNow({ ...room, type })}
                        disabled={type.available === 0}
                      >
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          </div>
        </section>
      )}

      {bookingStep === 'availability' && bookingType === 'seva' && (
        <section className="section">
          <div className="container">
            <div className="selected-date-header">
              <h2 className="availability-title">
                Confirm Seva Booking for {selectedDate.month} {selectedDate.date}, {selectedDate.year}
              </h2>
              <button className="btn-change-date" onClick={handleBackToCalendar}>
                Change Date
              </button>
            </div>
            <div className="seva-confirmation-card">
              <div className="seva-icon-large"><selectedSeva.icon /></div>
              <h2 className="seva-name">{selectedSeva.name}</h2>
              <p className="seva-price">Rs. {selectedSeva.price}/-</p>
              <p className="seva-time">Seva Sankalpa : {selectedSeva.time}</p>
              <p className="seva-description">{selectedSeva.description}</p>
              <button 
                className="btn book-seva-btn" 
                onClick={() => handleBookNow(selectedSeva)}
              >
                Proceed to Book
              </button>
            </div>
          </div>
        </section>
      )}

      {bookingStep === 'availability' && bookingType === 'marriage' && (
        <section className="section">
          <div className="container">
            <div className="selected-date-header">
              <h2 className="availability-title">
                Available Marriage Halls for {selectedDate.month} {selectedDate.date}, {selectedDate.year}
              </h2>
              <button className="btn-change-date" onClick={handleBackToCalendar}>
                Change Date
              </button>
            </div>
            {marriageHalls.map(hall => (
              <div key={hall.id} className="room-card">
                <div className="room-image">
                  <img src={hall.image} alt={hall.name} />
                  {hall.available && <span className="lift-badge">Available</span>}
                </div>
                
                <div className="room-details">
                  <h2 className="room-name">
                    {hall.name} <span className="location-icon"><FaMapMarkerAlt /></span>
                  </h2>
                  
                  <div className="hall-info">
                    <p className="hall-capacity">
                      <strong>Capacity:</strong> {hall.capacity}
                    </p>
                    <p className="hall-amenities">
                      <strong>Amenities:</strong> {hall.amenities}
                    </p>
                    <p className="hall-price">₹ {hall.price.toLocaleString()}/-</p>
                    <button 
                      className="btn book-hall-btn" 
                      onClick={() => handleBookNow(hall)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {bookingStep === 'form' && (
        <section className="section">
          <div className="container">
            <div className="booking-form-container">
              <div className="form-header">
                <h2>Complete Your Booking</h2>
                <button className="btn-back" onClick={handleBackToAvailability}>
                  ← Back to Availability
                </button>
              </div>

              <div className="booking-summary">
                <h3>Booking Summary</h3>
                <p><strong>Date:</strong> {selectedDate.month} {selectedDate.date}, {selectedDate.year}</p>
                {bookingType === 'seva' ? (
                  <>
                    <p><strong>Seva:</strong> {selectedSeva.name}</p>
                    <p><strong>Time:</strong> {selectedSeva.time}</p>
                    <p><strong>Price:</strong> ₹{selectedSeva.price}/-</p>
                  </>
                ) : (
                  <>
                    <p><strong>{bookingType === 'rooms' ? 'Room' : 'Hall'}:</strong> {selectedRoom.name}</p>
                    {bookingType === 'rooms' && selectedRoom.type && (
                      <>
                        <p><strong>Type:</strong> {selectedRoom.type.name}</p>
                        <p><strong>Price:</strong> ₹{selectedRoom.type.price}/-</p>
                      </>
                    )}
                    {bookingType === 'marriage' && (
                      <>
                        <p><strong>Capacity:</strong> {selectedRoom.capacity}</p>
                        <p><strong>Price:</strong> ₹{selectedRoom.price.toLocaleString()}/-</p>
                      </>
                    )}
                  </>
                )}
              </div>

              <form className="booking-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Number of Guests *</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5+">5+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleFormChange}
                    rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-submit-booking">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {bookingStep === 'confirmation' && (
        <section className="section">
          <div className="container">
            <div className="confirmation-container">
              <div className="confirmation-icon"><FaCheckCircle /></div>
              <h2>Booking Confirmed!</h2>
              <p className="confirmation-message">
                Your booking has been successfully confirmed. A confirmation email has been sent to {formData.email}
              </p>
              
              <div className="confirmation-details">
                <h3>Booking Details</h3>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Date:</strong> {selectedDate.month} {selectedDate.date}, {selectedDate.year}</p>
                {bookingType === 'seva' ? (
                  <>
                    <p><strong>Seva:</strong> {selectedSeva.name}</p>
                    <p><strong>Time:</strong> {selectedSeva.time}</p>
                  </>
                ) : (
                  <>
                    <p><strong>{bookingType === 'rooms' ? 'Room' : 'Hall'}:</strong> {selectedRoom.name}</p>
                    <p><strong>Guests:</strong> {formData.guests}</p>
                  </>
                )}
                <p><strong>Booking ID:</strong> #{Math.random().toString(36).substring(2, 9).toUpperCase()}</p>
              </div>

              <button className="btn" onClick={handleBackToServices}>
                Make Another Booking
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Booking;
