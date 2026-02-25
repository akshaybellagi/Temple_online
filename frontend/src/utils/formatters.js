// Utility functions for formatting data

/**
 * Format temple timings for display
 * @param {Object|string} timings - Timings object or string
 * @returns {string} Formatted timings string
 */
export const formatTimings = (timings) => {
  if (!timings) return 'N/A';
  
  if (typeof timings === 'string') {
    return timings;
  }
  
  if (typeof timings === 'object') {
    const morning = timings.morning || '';
    const evening = timings.evening || '';
    
    if (morning && evening) {
      return `${morning} | ${evening}`;
    } else if (morning) {
      return morning;
    } else if (evening) {
      return evening;
    }
  }
  
  return 'N/A';
};

/**
 * Parse timings string to object
 * @param {string} timingsString - Timings string like "6:00 AM - 12:00 PM | 4:00 PM - 9:00 PM"
 * @returns {Object} Timings object with morning and evening
 */
export const parseTimings = (timingsString) => {
  if (!timingsString || typeof timingsString !== 'string') {
    return { morning: '', evening: '' };
  }
  
  const parts = timingsString.split('|').map(t => t.trim());
  
  if (parts.length === 2) {
    return {
      morning: parts[0],
      evening: parts[1]
    };
  } else if (parts.length === 1) {
    return {
      morning: parts[0],
      evening: ''
    };
  }
  
  return { morning: '', evening: '' };
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  if (!amount || isNaN(amount)) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  return dateObj.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format time for display
 * @param {Date|string} time - Time to format
 * @returns {string} Formatted time string
 */
export const formatTime = (time) => {
  if (!time) return 'N/A';
  
  const timeObj = time instanceof Date ? time : new Date(time);
  
  if (isNaN(timeObj.getTime())) return 'Invalid Time';
  
  return timeObj.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};