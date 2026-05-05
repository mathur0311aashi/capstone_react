/**
 * Helper to extract a single keyword for video searching
 */
export const getDestinationKeyword = (destination) => {
  if (!destination) return 'default';
  const city = destination.split(',')[0].trim();
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
};

/**
 * Form Validation Logic
 */
export const validateTripForm = (formData) => {
  const errors = {};

  if (!formData.destination || formData.destination.trim().length < 2) {
    errors.destination = "Please enter a valid destination";
  }

  const dayCount = parseInt(formData.days);
  if (!formData.days || dayCount < 1 || dayCount > 30) {
    errors.days = "Please enter a duration between 1 and 30 days";
  }

  if (!formData.budget) {
    errors.budget = "Please select a budget range";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Formats the raw AI text into a cleaner format
 */
export const formatItinerary = (text) => {
  if (!text) return "";
  return text.replace(/\*\*/g, "").trim();
};

/**
 * Formats a date string into a readable format
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Saves a trip to local storage
 */
export const saveTripToStorage = (tripData) => {
  try {
    const existingTrips = JSON.parse(localStorage.getItem('my_trips') || '[]');
    const updatedTrips = [tripData, ...existingTrips];
    localStorage.setItem('my_trips', JSON.stringify(updatedTrips));
    return true;
  } catch (error) {
    console.error("Error saving to storage:", error);
    return false;
  }
};

/**
 * Loads the most recent trip from storage
 */
export const loadCurrentTrip = () => {
  try {
    const trips = JSON.parse(localStorage.getItem('my_trips') || '[]');
    return trips.length > 0 ? trips[0] : null;
  } catch (error) {
    console.error("Error loading from storage:", error);
    return null;
  }
};

/**
 * Utility to copy text to the user's clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};