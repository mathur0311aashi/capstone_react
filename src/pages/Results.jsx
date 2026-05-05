import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { generateTravelPlan } from '../services/GeminiService';
import { copyToClipboard, formatItinerary, saveTripToStorage } from '../utils/Helpers';
import { SpinnerLoader, SkeletonResults } from '../components/Loader';
import TravelCard from '../components/TravelCard';
import VideoSection from '../components/VideoSection';

/**
 * Results Page
 * Displays AI-generated travel plan with all sections
 */
const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [travelPlan, setTravelPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const tripData = location.state?.tripData;

  useEffect(() => {
    // Redirect if no trip data
    if (!tripData) {
      navigate('/plan');
      return;
    }

    // Generate travel plan
    fetchTravelPlan();
  }, [tripData]);

  const fetchTravelPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await generateTravelPlan(
        tripData.destination,
        parseInt(tripData.days),
        tripData.budget
      );

      if (result.success) {
        setTravelPlan(result.data);
        
        // Save to storage
        saveTripToStorage({
          ...tripData,
          plan: result.data
        });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to generate travel plan. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setRegenerating(true);
    await fetchTravelPlan();
    setRegenerating(false);
  };

  const handleCopyToClipboard = async () => {
    if (!travelPlan) return;

    const formattedText = formatItinerary(travelPlan, tripData);
    const success = await copyToClipboard(formattedText);

    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  // Loading state
  if (loading) {
    return <SkeletonResults />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background page-transition">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-surface border border-danger rounded-lg p-8">
            <div className="w-16 h-16 bg-danger bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-text-primary mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-text-secondary mb-6">
              {error}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRegenerate}
                className="px-6 py-2 bg-accent text-white rounded-md font-medium hover:bg-accent-dark transition-colors focus-ring"
              >
                Try Again
              </button>
              <Link
                to="/plan"
                className="px-6 py-2 bg-background border border-border text-text-primary rounded-md font-medium hover:bg-surface transition-colors focus-ring"
              >
                Back to Form
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen bg-background page-transition">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-surface to-background border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl text-text-primary mb-2">
                {tripData.destination}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {tripData.days} Days
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tripData.budget} Budget
                </span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
              <button
                onClick={handleCopyToClipboard}
                className="flex items-center px-4 py-2 bg-background border border-border text-text-primary rounded-md font-medium hover:bg-surface transition-colors focus-ring"
              >
                {copySuccess ? (
                  <>
                    <svg className="w-5 h-5 mr-2 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Plan
                  </>
                )}
              </button>
              <button
                onClick={handleRegenerate}
                disabled={regenerating}
                className="flex items-center px-4 py-2 bg-accent text-white rounded-md font-medium hover:bg-accent-dark transition-colors focus-ring disabled:opacity-50"
              >
                {regenerating ? (
                  <>
                    <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Regenerating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Regenerate
                  </>
                )}
              </button>
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 bg-success text-white rounded-md font-medium hover:bg-opacity-90 transition-colors focus-ring"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Day-by-Day Itinerary */}
      {travelPlan.itinerary.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-text-primary mb-8">
              Day-by-Day Itinerary
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {travelPlan.itinerary.map((day, index) => (
                <TravelCard key={index} type="day" data={day} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hotels */}
      {travelPlan.hotels.length > 0 && (
        <section className="py-12 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-text-primary mb-8">
              Recommended Hotels
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {travelPlan.hotels.map((hotel, index) => (
                <TravelCard key={index} type="hotel" data={hotel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cafes & Restaurants */}
      {travelPlan.cafes.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-text-primary mb-8">
              Cafes & Restaurants
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {travelPlan.cafes.map((cafe, index) => (
                <TravelCard key={index} type="cafe" data={cafe} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Transportation */}
      {travelPlan.transportation && (
        <section className="py-12 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TravelCard type="transport" data={travelPlan.transportation} />
          </div>
        </section>
      )}

      {/* Travel Tips */}
      {travelPlan.tips.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl text-text-primary mb-8">
              Travel Tips
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {travelPlan.tips.map((tip, index) => (
                <TravelCard key={index} type="tip" data={tip} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      <VideoSection destination={tripData.destination} />
    </div>
  );
};

export default Results;