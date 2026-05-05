import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadCurrentTrip, formatDate } from '../utils/Helpers';
import TravelCard from '../components/TravelCard';

/**
 * Dashboard Page
 * Displays saved trip with clean summary view
 */
const Dashboard = () => {
  const [currentTrip, setCurrentTrip] = useState(null);
  const [expandedDays, setExpandedDays] = useState(new Set([1])); // First day expanded by default

  useEffect(() => {
    const trip = loadCurrentTrip();
    setCurrentTrip(trip);
  }, []);

  const toggleDay = (dayNumber) => {
    setExpandedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(dayNumber)) {
        newSet.delete(dayNumber);
      } else {
        newSet.add(dayNumber);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    if (currentTrip?.plan?.itinerary) {
      setExpandedDays(new Set(currentTrip.plan.itinerary.map(day => day.day)));
    }
  };

  const collapseAll = () => {
    setExpandedDays(new Set());
  };

  // Empty state
  if (!currentTrip) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center page-transition">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-surface border border-border rounded-lg p-8">
            <div className="w-20 h-20 bg-accent bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-text-primary mb-2">
              No Saved Trip Yet
            </h2>
            <p className="text-text-secondary mb-6">
              Create your first travel plan to see it here
            </p>
            <Link
              to="/plan"
              className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-md font-medium hover:bg-accent-dark transition-colors shadow-medium focus-ring"
            >
              Plan Your Trip
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { destination, days, budget, plan, createdAt } = currentTrip;

  return (
    <div className="min-h-screen bg-background page-transition">
      {/* Header */}
      <section className="bg-gradient-to-br from-surface to-background border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center mb-2">
                <span className="inline-flex items-center px-3 py-1 bg-accent bg-opacity-10 text-accent text-sm font-medium rounded-full mr-3">
                  Saved Trip
                </span>
                {createdAt && (
                  <span className="text-text-secondary text-sm">
                    Created {formatDate(createdAt)}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl text-text-primary mb-2">
                {destination}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {days} Days
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {budget} Budget
                </span>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <Link
                to="/plan"
                className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-md font-medium hover:bg-accent-dark transition-colors shadow-medium focus-ring"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Plan New Trip
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collapsible Itinerary */}
      {plan?.itinerary && plan.itinerary.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-3xl text-text-primary">
                Your Itinerary
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={expandAll}
                  className="px-4 py-2 text-sm bg-background border border-border text-text-primary rounded-md hover:bg-surface transition-colors focus-ring"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="px-4 py-2 text-sm bg-background border border-border text-text-primary rounded-md hover:bg-surface transition-colors focus-ring"
                >
                  Collapse All
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {plan.itinerary.map((day) => {
                const isExpanded = expandedDays.has(day.day);
                return (
                  <div
                    key={day.day}
                    className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-medium transition-shadow"
                  >
                    <button
                      onClick={() => toggleDay(day.day)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-background transition-colors focus-ring"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center">
                        <div className="w-1 h-8 bg-accent rounded-full mr-4"></div>
                        <h3 className="font-serif text-xl text-text-primary">
                          Day {day.day}
                        </h3>
                      </div>
                      <svg
                        className={`w-6 h-6 text-text-secondary transition-transform ${
                          isExpanded ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-border animate-fade-in">
                        <ul className="space-y-2 pt-4">
                          {day.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg 
                                className="w-5 h-5 text-accent mt-0.5 mr-2 flex-shrink-0" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                              <span className="text-text-secondary text-sm leading-relaxed">
                                {activity}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Quick Summary Grid */}
      <section className="py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-text-primary mb-8">
            Quick Summary
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Hotels Count */}
            {plan?.hotels && (
              <div className="bg-background border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg text-text-primary">Hotels</h3>
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-accent">{plan.hotels.length}</p>
                <p className="text-text-secondary text-sm mt-1">Recommended options</p>
              </div>
            )}

            {/* Cafes Count */}
            {plan?.cafes && (
              <div className="bg-background border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg text-text-primary">Dining</h3>
                  <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-warning">{plan.cafes.length}</p>
                <p className="text-text-secondary text-sm mt-1">Cafes & restaurants</p>
              </div>
            )}

            {/* Tips Count */}
            {plan?.tips && (
              <div className="bg-background border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg text-text-primary">Tips</h3>
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-3xl font-bold text-success">{plan.tips.length}</p>
                <p className="text-text-secondary text-sm mt-1">Essential travel tips</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;