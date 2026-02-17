import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [marriageHalls, setMarriageHalls] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [donations, setDonations] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [temples, setTemples] = useState([]);
  const [siteContent, setSiteContent] = useState({
    about: '',
    services: '',
    contact: ''
  });
  const [loading, setLoading] = useState(true);

  // Fetch rooms
  const fetchRooms = async () => {
    try {
      const { data: roomsData, error: roomsError } = await supabase
        .from('rooms')
        .select('*')
        .order('name', { ascending: true })
        .order('id', { ascending: true });

      if (roomsError) throw roomsError;

      // Group rooms by name and create types array
      const roomsMap = {};
      
      roomsData.forEach(room => {
        if (!roomsMap[room.name]) {
          roomsMap[room.name] = {
            id: room.id,
            name: room.name,
            image: room.image || 'https://via.placeholder.com/300x200/3498db/ffffff?text=Room',
            lift: room.lift,
            types: []
          };
        }
        
        // Add this room as a type
        roomsMap[room.name].types.push({
          id: room.id,
          name: room.type,
          price: room.price,
          available: room.available || 0,
          total: room.total || 0,
          floor: room.floor,
          occupancy: room.occupancy,
          commode_type: room.commode_type,
          ac: room.ac
        });
      });

      const roomsWithTypes = Object.values(roomsMap);
      setRooms(roomsWithTypes);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      // Set empty array on error so UI doesn't break
      setRooms([]);
    }
  };

  // Fetch marriage halls
  const fetchMarriageHalls = async () => {
    try {
      const { data, error } = await supabase
        .from('marriage_halls')
        .select('*')
        .order('id');

      if (error) throw error;
      setMarriageHalls(data);
    } catch (error) {
      console.error('Error fetching marriage halls:', error);
    }
  };

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Fetch donations
  const fetchDonations = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDonations(data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  // Fetch gallery images
  const fetchGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('id');

      if (error) throw error;
      setGalleryImages(data);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    }
  };

  // Fetch site content
  const fetchSiteContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error) throw error;

      const contentObj = {};
      data.forEach(item => {
        contentObj[item.key] = item.value;
      });
      setSiteContent(contentObj);
    } catch (error) {
      console.error('Error fetching site content:', error);
    }
  };

  // Fetch temples
  const fetchTemples = async () => {
    try {
      const { data, error } = await supabase
        .from('temples')
        .select('*')
        .order('id');

      if (error) throw error;
      setTemples(data || []);
    } catch (error) {
      console.error('Error fetching temples:', error);
      setTemples([]);
    }
  };

  // Initial data fetch
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchRooms(),
        fetchMarriageHalls(),
        fetchBookings(),
        fetchDonations(),
        fetchGalleryImages(),
        fetchSiteContent(),
        fetchTemples()
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  // Add booking function
  const addBooking = async (booking) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select()
        .single();

      if (error) throw error;

      setBookings([data, ...bookings]);
      return data;
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error;
    }
  };

  // Update booking function
  const updateBooking = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setBookings(bookings.map(b => b.id === id ? data : b));
      return data;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  };

  // Delete booking function
  const deleteBooking = async (id) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBookings(bookings.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  };

  // Add donation function
  const addDonation = async (donation) => {
    try {
      // Transform the donation data to match database schema
      const donationData = {
        donor: donation.name,
        category: donation.purpose,
        amount: parseInt(donation.amount.replace(/[₹,]/g, '').trim()) || 0,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Completed'
      };

      const { data, error } = await supabase
        .from('donations')
        .insert([donationData])
        .select()
        .single();

      if (error) throw error;

      setDonations([data, ...donations]);
      return data;
    } catch (error) {
      console.error('Error adding donation:', error);
      throw error;
    }
  };

  // Update donation function
  const updateDonation = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setDonations(donations.map(d => d.id === id ? data : d));
      return data;
    } catch (error) {
      console.error('Error updating donation:', error);
      throw error;
    }
  };

  // Delete donation function
  const deleteDonation = async (id) => {
    try {
      const { error } = await supabase
        .from('donations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDonations(donations.filter(d => d.id !== id));
    } catch (error) {
      console.error('Error deleting donation:', error);
      throw error;
    }
  };

  // Update room function
  const updateRoom = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      await fetchRooms(); // Refresh rooms data
      return data;
    } catch (error) {
      console.error('Error updating room:', error);
      throw error;
    }
  };

  // Update room type function (now updates the room directly)
  const updateRoomType = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      await fetchRooms(); // Refresh rooms data
      return data;
    } catch (error) {
      console.error('Error updating room type:', error);
      throw error;
    }
  };

  // Update marriage hall function
  const updateMarriageHall = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('marriage_halls')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setMarriageHalls(marriageHalls.map(h => h.id === id ? data : h));
      return data;
    } catch (error) {
      console.error('Error updating marriage hall:', error);
      throw error;
    }
  };

  // Add gallery image function
  const addGalleryImage = async (image) => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .insert([image])
        .select()
        .single();

      if (error) throw error;

      setGalleryImages([...galleryImages, data]);
      return data;
    } catch (error) {
      console.error('Error adding gallery image:', error);
      throw error;
    }
  };

  // Update gallery image function
  const updateGalleryImage = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setGalleryImages(galleryImages.map(img => img.id === id ? data : img));
      return data;
    } catch (error) {
      console.error('Error updating gallery image:', error);
      throw error;
    }
  };

  // Delete gallery image function
  const deleteGalleryImage = async (id) => {
    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setGalleryImages(galleryImages.filter(img => img.id !== id));
    } catch (error) {
      console.error('Error deleting gallery image:', error);
      throw error;
    }
  };

  // Update site content function
  const updateSiteContent = async (key, value) => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .upsert({ key, value })
        .select()
        .single();

      if (error) throw error;

      setSiteContent({ ...siteContent, [key]: value });
      return data;
    } catch (error) {
      console.error('Error updating site content:', error);
      throw error;
    }
  };

  // Add temple function
  const addTemple = async (temple) => {
    try {
      const { data, error } = await supabase
        .from('temples')
        .insert([temple])
        .select()
        .single();

      if (error) throw error;

      setTemples([...temples, data]);
      return data;
    } catch (error) {
      console.error('Error adding temple:', error);
      throw error;
    }
  };

  // Update temple function
  const updateTemple = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('temples')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setTemples(temples.map(t => t.id === id ? data : t));
      return data;
    } catch (error) {
      console.error('Error updating temple:', error);
      throw error;
    }
  };

  // Delete temple function
  const deleteTemple = async (id) => {
    try {
      const { error } = await supabase
        .from('temples')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTemples(temples.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting temple:', error);
      throw error;
    }
  };

  const value = {
    rooms,
    setRooms,
    marriageHalls,
    setMarriageHalls,
    bookings,
    setBookings,
    addBooking,
    updateBooking,
    deleteBooking,
    donations,
    setDonations,
    addDonation,
    updateDonation,
    deleteDonation,
    galleryImages,
    setGalleryImages,
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
    temples,
    setTemples,
    addTemple,
    updateTemple,
    deleteTemple,
    siteContent,
    setSiteContent,
    updateSiteContent,
    updateRoom,
    updateRoomType,
    updateMarriageHall,
    loading,
    refreshData: async () => {
      await Promise.all([
        fetchRooms(),
        fetchMarriageHalls(),
        fetchBookings(),
        fetchDonations(),
        fetchGalleryImages(),
        fetchSiteContent(),
        fetchTemples()
      ]);
    }
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
