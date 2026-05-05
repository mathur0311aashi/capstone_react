import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Gemini AI Service
 * Handles all interactions with Google's Generative AI API
 */

// Initialize the Gemini API client
const initializeGemini = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not set in environment variables');
  }
  
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Generate a detailed travel plan using Gemini AI
 * @param {string} destination - The travel destination
 * @param {number} days - Number of days for the trip
 * @param {string} budget - Budget level (Low, Medium, High)
 * @returns {Promise<Object>} Structured travel plan
 */
export const generateTravelPlan = async (destination, days, budget) => {
  try {
    const genAI = initializeGemini();
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Construct detailed prompt for travel planning
    const prompt = `Create a comprehensive and detailed travel plan for ${destination} for ${days} days with a ${budget} budget.

Please structure the response in the following format:

DAY-BY-DAY ITINERARY:
For each day (Day 1, Day 2, etc.), provide:
- Morning activities (with specific times and locations)
- Afternoon activities (with specific times and locations)
- Evening activities (with specific times and locations)
- Estimated costs for the day

HOTELS:
Recommend 3-4 hotels suitable for a ${budget} budget:
- Hotel name
- Brief description
- Approximate price per night
- Location/Area

CAFES & RESTAURANTS:
Recommend 5-6 popular cafes and restaurants:
- Name
- Type of cuisine
- Specialty dishes
- Approximate price range
- Location

TRANSPORTATION:
- Best ways to get around ${destination}
- Public transport options and costs
- Taxi/ride-sharing information
- Any transport passes or cards recommended

TRAVEL TIPS:
- Best time to visit
- Local customs and etiquette
- Safety tips
- Currency and payment methods
- Essential phrases (if applicable)
- Must-know information

Please be specific with names, locations, and practical details.`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response into structured data
    const parsedPlan = parseGeminiResponse(text, days);
    
    return {
      success: true,
      data: parsedPlan,
      rawText: text
    };

  } catch (error) {
    console.error('Error generating travel plan:', error);
    
    // Return structured error
    return {
      success: false,
      error: error.message || 'Failed to generate travel plan',
      data: null
    };
  }
};

/**
 * Parse Gemini's text response into structured data
 * @param {string} text - Raw text response from Gemini
 * @param {number} days - Number of days
 * @returns {Object} Structured travel plan object
 */
const parseGeminiResponse = (text, days) => {
  const plan = {
    itinerary: [],
    hotels: [],
    cafes: [],
    transportation: '',
    tips: []
  };

  // Split text into sections
  const sections = text.split(/\n(?=[A-Z\s]+:)/);

  sections.forEach(section => {
    const lines = section.split('\n').filter(line => line.trim());
    
    if (section.includes('DAY-BY-DAY') || section.includes('ITINERARY')) {
      // Parse day-by-day itinerary
      let currentDay = null;
      
      lines.forEach(line => {
        const dayMatch = line.match(/Day (\d+)/i);
        if (dayMatch) {
          if (currentDay) {
            plan.itinerary.push(currentDay);
          }
          currentDay = {
            day: parseInt(dayMatch[1]),
            activities: []
          };
        } else if (currentDay && line.trim() && !line.includes(':') || line.includes('Morning') || line.includes('Afternoon') || line.includes('Evening')) {
          currentDay.activities.push(line.replace(/^[-*]\s*/, '').trim());
        }
      });
      
      if (currentDay) {
        plan.itinerary.push(currentDay);
      }
    } 
    else if (section.includes('HOTEL')) {
      // Parse hotels
      let currentHotel = null;
      
      lines.forEach(line => {
        if (line.match(/^\d+\./) || line.match(/^[-*]/)) {
          if (currentHotel) {
            plan.hotels.push(currentHotel);
          }
          currentHotel = {
            name: line.replace(/^[\d\.\-*\s]+/, '').trim(),
            details: []
          };
        } else if (currentHotel && line.trim() && !line.includes('HOTEL')) {
          currentHotel.details.push(line.trim());
        }
      });
      
      if (currentHotel) {
        plan.hotels.push(currentHotel);
      }
    }
    else if (section.includes('CAFE') || section.includes('RESTAURANT')) {
      // Parse cafes and restaurants
      let currentCafe = null;
      
      lines.forEach(line => {
        if (line.match(/^\d+\./) || line.match(/^[-*]/)) {
          if (currentCafe) {
            plan.cafes.push(currentCafe);
          }
          currentCafe = {
            name: line.replace(/^[\d\.\-*\s]+/, '').trim(),
            details: []
          };
        } else if (currentCafe && line.trim() && !line.includes('CAFE') && !line.includes('RESTAURANT')) {
          currentCafe.details.push(line.trim());
        }
      });
      
      if (currentCafe) {
        plan.cafes.push(currentCafe);
      }
    }
    else if (section.includes('TRANSPORT')) {
      // Parse transportation info
      plan.transportation = lines
        .filter(line => !line.includes('TRANSPORT'))
        .map(line => line.replace(/^[-*]\s*/, '').trim())
        .join('\n');
    }
    else if (section.includes('TIPS') || section.includes('TRAVEL TIPS')) {
      // Parse travel tips
      plan.tips = lines
        .filter(line => !line.includes('TIPS') && line.trim())
        .map(line => line.replace(/^[-*]\s*/, '').trim());
    }
  });

  // Ensure we have at least the requested number of days
  if (plan.itinerary.length < days) {
    for (let i = plan.itinerary.length + 1; i <= days; i++) {
      plan.itinerary.push({
        day: i,
        activities: ['Explore local attractions', 'Try local cuisine', 'Relax and enjoy the destination']
      });
    }
  }

  return plan;
};

/**
 * Regenerate a specific part of the travel plan
 * @param {string} destination - The travel destination
 * @param {string} section - Section to regenerate (hotels, cafes, tips)
 * @returns {Promise<Object>} Regenerated section data
 */
export const regenerateSection = async (destination, section) => {
  try {
    const genAI = initializeGemini();
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    let prompt = '';
    
    switch(section) {
      case 'hotels':
        prompt = `Recommend 4 different hotels in ${destination} with varying price ranges. Include name, description, price, and location.`;
        break;
      case 'cafes':
        prompt = `Recommend 6 popular cafes and restaurants in ${destination}. Include name, cuisine type, specialty, price range, and location.`;
        break;
      case 'tips':
        prompt = `Provide 8-10 essential travel tips for visiting ${destination}, including best time to visit, local customs, safety, currency, and must-know information.`;
        break;
      default:
        throw new Error('Invalid section');
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      data: text
    };

  } catch (error) {
    console.error('Error regenerating section:', error);
    return {
      success: false,
      error: error.message
    };
  }
};