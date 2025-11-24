import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Initialize from localStorage or use defaults
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('rooms');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'DHEERENDRA VASATHI GRUHA', image: 'https://via.placeholder.com/300x200/4a90e2/ffffff?text=Dheerendra+Vasathi', lift: true, types: [
        { name: 'NON-AC | 2-Occupancy | First Floor | Western Commode', price: 600, available: 0, total: 25 },
        { name: 'NON-AC | 2-Occupancy | Second Floor | Western Commode', price: 600, available: 0, total: 20 }
      ]},
      { id: 2, name: 'PANCHAMUKI DARSHAN', image: 'https://via.placeholder.com/300x200/5cb85c/ffffff?text=Panchamuki+Darshan', lift: false, types: [
        { name: 'NON-AC | 2-Occupancy | First Floor | Western Commode', price: 250, available: 0, total: 10 },
        { name: 'NON-AC | 2-Occupancy | Ground Floor | Indian Commode', price: 250, available: 0, total: 10 }
      ]}
    ];
  });

  const [marriageHalls, setMarriageHalls] = useState(() => {
    const saved = localStorage.getItem('marriageHalls');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'KALYANA MANDAPA - MAIN HALL', image: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=Main+Hall', capacity: '500 Guests', amenities: 'AC | Stage | Dining Area | Parking', price: 25000, available: true },
      { id: 2, name: 'KALYANA MANDAPA - MINI HALL', image: 'https://via.placeholder.com/300x200/f39c12/ffffff?text=Mini+Hall', capacity: '200 Guests', amenities: 'AC | Stage | Dining Area', price: 15000, available: true }
    ];
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'John Doe', type: 'Room', date: 'Dec 15, 2025', status: 'Confirmed', amount: '₹600', email: 'john@example.com', phone: '+91 9876543210' },
      { id: 2, name: 'Jane Smith', type: 'Marriage Hall', date: 'Dec 20, 2025', status: 'Pending', amount: '₹25,000', email: 'jane@example.com', phone: '+91 9876543211' }
    ];
  });

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('donations');
    return saved ? JSON.parse(saved) : [
      { id: 1, donor: 'Rajesh Kumar', category: 'Annadhana', amount: 5000, date: 'Dec 10, 2025', status: 'Completed' },
      { id: 2, donor: 'Priya Sharma', category: 'Goshala', amount: 10000, date: 'Dec 12, 2025', status: 'Completed' }
    ];
  });

  const [galleryImages, setGalleryImages] = useState(() => {
    const saved = localStorage.getItem('galleryImages');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Main Temple', category: 'temple', url: 'https://via.placeholder.com/300x200' },
      { id: 2, title: 'Festival Celebration', category: 'events', url: 'https://via.placeholder.com/300x200' },
      { id: 3, title: 'Prayer Hall', category: 'temple', url: 'https://via.placeholder.com/300x200' },
      { id: 4, title: 'Annual Event', category: 'events', url: 'https://via.placeholder.com/300x200' },
      { id: 5, title: 'Guest Rooms', category: 'facilities', url: 'https://via.placeholder.com/300x200' },
      { id: 6, title: 'Dining Hall', category: 'facilities', url: 'https://via.placeholder.com/300x200' }
    ];
  });

  const [siteContent, setSiteContent] = useState(() => {
    const saved = localStorage.getItem('siteContent');
    return saved ? JSON.parse(saved) : {
      about: 'Our matha has a rich spiritual heritage spanning many generations...',
      services: 'We offer various spiritual services including daily pooja, special sevas...',
      contact: 'Email: info@srsmatha.org\nPhone: +91 XXXXXXXXXX'
    };
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('marriageHalls', JSON.stringify(marriageHalls));
  }, [marriageHalls]);

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
  }, [galleryImages]);

  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(siteContent));
  }, [siteContent]);

  // Add booking function
  const addBooking = (booking) => {
    const newBooking = {
      id: bookings.length + 1,
      ...booking,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setBookings([...bookings, newBooking]);
    return newBooking;
  };

  // Add donation function
  const addDonation = (donation) => {
    const newDonation = {
      id: donations.length + 1,
      ...donation,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Completed'
    };
    setDonations([...donations, newDonation]);
    return newDonation;
  };

  const value = {
    rooms,
    setRooms,
    marriageHalls,
    setMarriageHalls,
    bookings,
    setBookings,
    addBooking,
    donations,
    setDonations,
    addDonation,
    galleryImages,
    setGalleryImages,
    siteContent,
    setSiteContent
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
